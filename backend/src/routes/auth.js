import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import AdminUser from '../models/AdminUser.js';
import { protect } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// POST /api/auth/login
router.post(
  '/login',
  authLimiter,
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email required.'),
    body('password').notEmpty().withMessage('Password required.'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
      }

      const { email, password } = req.body;
      const admin = await AdminUser.findOne({ email }).select('+password');

      if (!admin || !admin.isActive) {
        return res.status(401).json({ success: false, message: 'Invalid credentials.' });
      }

      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials.' });
      }

      admin.lastLogin = new Date();
      await admin.save({ validateBeforeSave: false });

      const token = signToken(admin._id);

      res.json({
        success: true,
        token,
        admin: admin.toJSON(),
      });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/auth/me  — validate token & return current admin
router.get('/me', protect, (req, res) => {
  res.json({ success: true, admin: req.admin });
});

// POST /api/auth/logout  — client-side token removal; kept for completeness
router.post('/logout', protect, (req, res) => {
  res.json({ success: true, message: 'Logged out successfully.' });
});

export default router;
