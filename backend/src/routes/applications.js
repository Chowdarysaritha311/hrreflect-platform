import express from 'express';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { protect } from '../middleware/auth.js';
import { uploadResume } from '../middleware/upload.js';
import { sendCandidateConfirmation, sendAdminNotification } from '../utils/email.js';

const router = express.Router();

// Helper to build resumeFile from req.file (memoryStorage)
const buildResumeFile = (file) => {
  if (!file) return null;
  return {
    originalName: file.originalname,
    mimetype:     file.mimetype,
    size:         file.size,
    data:         file.buffer,   // Buffer stored in MongoDB
  };
};

// ── POST /api/applications  — candidate applies to a job ──────────────────
router.post('/', (req, res, next) => {
  uploadResume(req, res, async (err) => {
    if (err) return next(err);
    try {
      const { name, email, phone, location, experience, skills,
              coverLetter, jobId, jobTitle, company } = req.body;

      if (!name || !email || !phone || !experience) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, phone and experience are required.',
        });
      }

      let resolvedTitle   = jobTitle;
      let resolvedCompany = company;
      if (jobId) {
        const job = await Job.findById(jobId).catch(() => null);
        if (job) { resolvedTitle = job.title; resolvedCompany = job.company; }
      }

      const application = await Application.create({
        name, email, phone, location, experience, skills, coverLetter,
        jobId:    jobId || undefined,
        jobTitle: resolvedTitle,
        company:  resolvedCompany,
        type:     'application',
        status:   'Applied',
        resumeFile: buildResumeFile(req.file),
      });

      sendCandidateConfirmation({ name, email, jobTitle: resolvedTitle || 'the position' });
      sendAdminNotification({ application, jobTitle: resolvedTitle || 'General Application' });

      res.status(201).json({
        success: true,
        message: 'Application submitted successfully. We will contact you within 24 hours.',
        data: { id: application._id },
      });
    } catch (err) { next(err); }
  });
});

// ── POST /api/applications/jobseeker  — job seeker profile ───────────────
router.post('/jobseeker', (req, res, next) => {
  uploadResume(req, res, async (err) => {
    if (err) return next(err);
    try {
      const { name, email, phone, city, experience, skills,
              currentRole, desiredRole, noticePeriod, message } = req.body;

      if (!name || !email || !phone || !experience) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, phone and experience are required.',
        });
      }

      const application = await Application.create({
        name, email, phone,
        location:     city,
        experience,
        skills,
        currentRole:  currentRole  || '',
        desiredRole:  desiredRole  || '',
        noticePeriod: noticePeriod || '',
        message:      message      || '',
        jobTitle:     desiredRole  || 'Open to Opportunities',
        type:         'jobseeker',
        status:       'Applied',
        resumeFile:   buildResumeFile(req.file),
      });

      sendCandidateConfirmation({ name, email, jobTitle: desiredRole || 'matching opportunities' });
      sendAdminNotification({ application, jobTitle: `Job Seeker: ${desiredRole || name}` });

      res.status(201).json({
        success: true,
        message: 'Profile submitted! Our recruiter will contact you within 24–48 hours.',
        data: { id: application._id },
      });
    } catch (err) { next(err); }
  });
});

// ── GET /api/applications  — admin list ──────────────────────────────────
router.get('/', protect, async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 20, type } = req.query;
    const filter = {};
    if (type   && type   !== 'all') filter.type   = type;
    if (status && status !== 'All') filter.status  = status;
    if (search) {
      filter.$or = [
        { name:        { $regex: search, $options: 'i' } },
        { email:       { $regex: search, $options: 'i' } },
        { jobTitle:    { $regex: search, $options: 'i' } },
        { skills:      { $regex: search, $options: 'i' } },
        { desiredRole: { $regex: search, $options: 'i' } },
      ];
    }
    const skip  = (parseInt(page) - 1) * parseInt(limit);
    const total = await Application.countDocuments(filter);

    // Exclude binary data field from list (for performance)
    const apps = await Application.find(filter)
      .select('-resumeFile.data')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: apps,
      pagination: {
        total,
        page:  parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (err) { next(err); }
});

// ── GET /api/applications/:id  — single application ──────────────────────
router.get('/:id', protect, async (req, res, next) => {
  try {
    const app = await Application.findById(req.params.id).select('-resumeFile.data');
    if (!app) return res.status(404).json({ success: false, message: 'Application not found.' });
    res.json({ success: true, data: app });
  } catch (err) { next(err); }
});

// ── GET /api/applications/:id/resume  — download resume ──────────────────
router.get('/:id/resume', protect, async (req, res, next) => {
  try {
    // Fetch WITH the data field for download
    const app = await Application.findById(req.params.id).select('+resumeFile.data');
    if (!app) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }
    if (!app.resumeFile?.data || app.resumeFile.data.length === 0) {
      return res.status(404).json({ success: false, message: 'No resume uploaded for this application.' });
    }

    const mime         = app.resumeFile.mimetype || 'application/octet-stream';
    const originalName = app.resumeFile.originalName || 'resume.pdf';

    res.setHeader('Content-Type', mime);
    res.setHeader('Content-Disposition', `attachment; filename="${originalName}"`);
    res.setHeader('Content-Length', app.resumeFile.data.length);
    res.setHeader('Cache-Control', 'no-cache');
    res.end(app.resumeFile.data); // Send Buffer directly
  } catch (err) { next(err); }
});

// ── PATCH /api/applications/:id/status  — update status ──────────────────
router.patch('/:id/status', protect, async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const allowed = ['Applied','Shortlisted','Interview Scheduled','Rejected','Hired'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }
    const app = await Application.findByIdAndUpdate(
      req.params.id,
      { status, ...(notes !== undefined && { notes }) },
      { new: true }
    ).select('-resumeFile.data');
    if (!app) return res.status(404).json({ success: false, message: 'Application not found.' });
    res.json({ success: true, data: app });
  } catch (err) { next(err); }
});

// ── DELETE /api/applications/:id ─────────────────────────────────────────
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const app = await Application.findByIdAndDelete(req.params.id);
    if (!app) return res.status(404).json({ success: false, message: 'Application not found.' });
    res.json({ success: true, message: 'Application deleted.' });
  } catch (err) { next(err); }
});

export default router;
