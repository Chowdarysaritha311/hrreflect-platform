import express from 'express';
import { body, validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// POST /api/contacts  — public
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name required.'),
    body('email').isEmail().withMessage('Valid email required.'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
      }
      const contact = await Contact.create(req.body);
      res.status(201).json({ success: true, message: 'Enquiry submitted. We will be in touch soon.', data: { id: contact._id } });
    } catch (err) { next(err); }
  }
);

// GET /api/contacts  — admin
router.get('/', protect, async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status && status !== 'All') filter.status = status;
    const skip  = (parseInt(page) - 1) * parseInt(limit);
    const total = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
    res.json({ success: true, data: contacts, pagination: { total, page: parseInt(page), limit: parseInt(limit) } });
  } catch (err) { next(err); }
});

// PATCH /api/contacts/:id/status  — admin
router.patch('/:id/status', protect, async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const allowed = ['New', 'In Progress', 'Closed'];
    if (!allowed.includes(status)) return res.status(400).json({ success: false, message: 'Invalid status.' });
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status, ...(notes && { notes }) }, { new: true });
    if (!contact) return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    res.json({ success: true, data: contact });
  } catch (err) { next(err); }
});

// DELETE /api/contacts/:id  — admin
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    res.json({ success: true, message: 'Enquiry deleted.' });
  } catch (err) { next(err); }
});

export default router;
