import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Authorization header (standard API calls)
    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 2. Query param (used for file download links)
    if (!token && req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorised — no token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin   = await AdminUser.findById(decoded.id);

    if (!admin || !admin.isActive) {
      return res.status(401).json({ success: false, message: 'Admin account not found or deactivated.' });
    }

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token invalid or expired.' });
  }
};

export const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.admin?.role)) {
    return res.status(403).json({ success: false, message: 'Insufficient permissions.' });
  }
  next();
};
