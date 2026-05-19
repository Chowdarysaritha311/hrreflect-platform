import express from 'express';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import Contact from '../models/Contact.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/admin/stats
router.get('/stats', protect, async (req, res, next) => {
  try {
    const [
      totalJobs, activeJobs,
      totalApps, newApps, shortlisted, hired,
      totalContacts, newContacts,
      recentApps,
    ] = await Promise.all([
      Job.countDocuments(),
      Job.countDocuments({ status: 'open' }),
      Application.countDocuments(),
      Application.countDocuments({ status: 'Applied' }),
      Application.countDocuments({ status: 'Shortlisted' }),
      Application.countDocuments({ status: 'Hired' }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'New' }),
      Application.find().sort({ createdAt: -1 }).limit(5).select('name jobTitle status createdAt'),
    ]);

    res.json({
      success: true,
      data: {
        jobs:         { total: totalJobs, active: activeJobs },
        applications: { total: totalApps, new: newApps, shortlisted, hired },
        contacts:     { total: totalContacts, new: newContacts },
        recentApplications: recentApps,
      },
    });
  } catch (err) { next(err); }
});

export default router;
