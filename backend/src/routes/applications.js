import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { body, validationResult } from 'express-validator';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { protect } from '../middleware/auth.js';
import { uploadResume } from '../middleware/upload.js';
import { sendCandidateConfirmation, sendAdminNotification } from '../utils/email.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const router = express.Router();

// POST /api/applications  — public (candidate applies to a job)
router.post('/', (req, res, next) => {
  uploadResume(req, res, async (err) => {
    if (err) return next(err);
    try {
      const { name, email, phone, location, experience, skills, coverLetter, jobId, jobTitle, company } = req.body;
      if (!name || !email || !phone || !experience) {
        return res.status(400).json({ success: false, message: 'Name, email, phone and experience are required.' });
      }
      let resolvedTitle   = jobTitle;
      let resolvedCompany = company;
      if (jobId) {
        const job = await Job.findById(jobId);
        if (job) { resolvedTitle = job.title; resolvedCompany = job.company; }
      }
      const applicationData = {
        name, email, phone, location, experience, skills, coverLetter,
        jobId: jobId || undefined,
        jobTitle: resolvedTitle,
        company:  resolvedCompany,
        type:   'application',
        status: 'Applied',
      };
      if (req.file) {
        applicationData.resumeFile = {
          originalName: req.file.originalname,
          filename:     req.file.filename,
          path:         req.file.path,
          mimetype:     req.file.mimetype,
          size:         req.file.size,
        };
      }
      const application = await Application.create(applicationData);
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

// POST /api/applications/jobseeker  — public (candidate registers profile)
router.post('/jobseeker', (req, res, next) => {
  uploadResume(req, res, async (err) => {
    if (err) return next(err);
    try {
      const { name, email, phone, city, experience, skills, currentRole, desiredRole, noticePeriod, message } = req.body;
      if (!name || !email || !phone || !experience) {
        return res.status(400).json({ success: false, message: 'Name, email, phone and experience are required.' });
      }
      const applicationData = {
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
      };
      if (req.file) {
        applicationData.resumeFile = {
          originalName: req.file.originalname,
          filename:     req.file.filename,
          path:         req.file.path,
          mimetype:     req.file.mimetype,
          size:         req.file.size,
        };
      }
      const application = await Application.create(applicationData);
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

// GET /api/applications  — admin only
router.get('/', protect, async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 20, type } = req.query;
    const filter = {};
    if (type && type !== 'all') filter.type = type;
    if (status && status !== 'All') filter.status = status;
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
    const apps  = await Application.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    res.json({
      success: true,
      data: apps,
      pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / parseInt(limit)) },
    });
  } catch (err) { next(err); }
});

// GET /api/applications/:id  — admin only
router.get('/:id', protect, async (req, res, next) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ success: false, message: 'Application not found.' });
    res.json({ success: true, data: app });
  } catch (err) { next(err); }
});

// PATCH /api/applications/:id/status  — admin only
router.patch('/:id/status', protect, async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const allowed = ['Applied', 'Shortlisted', 'Interview Scheduled', 'Rejected', 'Hired'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }
    const app = await Application.findByIdAndUpdate(
      req.params.id,
      { status, ...(notes !== undefined && { notes }) },
      { new: true }
    );
    if (!app) return res.status(404).json({ success: false, message: 'Application not found.' });
    res.json({ success: true, data: app });
  } catch (err) { next(err); }
});

// GET /api/applications/:id/resume  — admin download
router.get('/:id/resume', protect, async (req, res, next) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app || !app.resumeFile?.filename) {
      return res.status(404).json({ success: false, message: 'Resume not found.' });
    }
    const filePath = path.join(__dirname, '../../uploads', app.resumeFile.filename);
    res.download(filePath, app.resumeFile.originalName);
  } catch (err) { next(err); }
});

// DELETE /api/applications/:id  — admin only
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const app = await Application.findByIdAndDelete(req.params.id);
    if (!app) return res.status(404).json({ success: false, message: 'Application not found.' });
    res.json({ success: true, message: 'Application deleted.' });
  } catch (err) { next(err); }
});

export default router;
