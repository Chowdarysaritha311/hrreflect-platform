import express from 'express';
import { body, validationResult } from 'express-validator';
import Job from '../models/Job.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/jobs  — public, returns open jobs
router.get('/', async (req, res, next) => {
  try {
    const { industry, search } = req.query;
    const filter = { status: 'open' };
    if (industry && industry !== 'All') filter.industry = industry;
    if (search) {
      filter.$or = [
        { title:  { $regex: search, $options: 'i' } },
        { skills: { $elemMatch: { $regex: search, $options: 'i' } } },
      ];
    }
    const jobs = await Job.find(filter).sort({ urgent: -1, createdAt: -1 });
    res.json({ success: true, data: jobs });
  } catch (err) { next(err); }
});

// GET /api/jobs/all  — admin, all jobs
router.get('/all', protect, async (req, res, next) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ success: true, data: jobs });
  } catch (err) { next(err); }
});

// GET /api/jobs/:id
router.get('/:id', async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found.' });
    res.json({ success: true, data: job });
  } catch (err) { next(err); }
});

// POST /api/jobs  — admin only
router.post(
  '/',
  protect,
  [
    body('title').notEmpty().withMessage('Job title required.'),
    body('company').notEmpty().withMessage('Company required.'),
    body('experience').notEmpty().withMessage('Experience required.'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
      }
      const job = await Job.create(req.body);
      res.status(201).json({ success: true, data: job });
    } catch (err) { next(err); }
  }
);

// PUT /api/jobs/:id  — admin only
router.put('/:id', protect, async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!job) return res.status(404).json({ success: false, message: 'Job not found.' });
    res.json({ success: true, data: job });
  } catch (err) { next(err); }
});

// PATCH /api/jobs/:id/toggle  — open/close
router.patch('/:id/toggle', protect, async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found.' });
    job.status = job.status === 'open' ? 'closed' : 'open';
    await job.save();
    res.json({ success: true, data: job });
  } catch (err) { next(err); }
});

// DELETE /api/jobs/:id  — admin only
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found.' });
    res.json({ success: true, message: 'Job deleted.' });
  } catch (err) { next(err); }
});

export default router;
