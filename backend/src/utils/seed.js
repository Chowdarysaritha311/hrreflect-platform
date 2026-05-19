/**
 * Seed script — creates default admin and sample jobs.
 * Run: npm run seed
 */
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import AdminUser from '../models/AdminUser.js';
import Job from '../models/Job.js';

dotenv.config();

const sampleJobs = [
  {
    title: 'Senior Software Engineer',
    company: 'Leading FinTech Company',
    location: 'Bangalore',
    experience: '4–7 years',
    salary: '18–28 LPA',
    skills: ['React', 'Node.js', 'AWS', 'MongoDB'],
    industry: 'IT',
    employmentType: 'Full Time',
    urgent: true,
    status: 'open',
    description: 'We are looking for a skilled full-stack engineer to join our growing FinTech platform team.',
  },
  {
    title: 'HR Business Partner',
    company: 'MNC Corporation',
    location: 'Bangalore',
    experience: '5–8 years',
    salary: '12–18 LPA',
    skills: ['HR Strategy', 'Talent Management', 'HRBP', 'Compliance'],
    industry: 'Corporate',
    employmentType: 'Full Time',
    urgent: false,
    status: 'open',
    description: 'Strategic HRBP role partnering with business leaders across multiple verticals.',
  },
  {
    title: 'Sales Manager — B2B',
    company: 'Logistics Startup',
    location: 'Bangalore',
    experience: '3–6 years',
    salary: '10–16 LPA',
    skills: ['B2B Sales', 'CRM', 'Negotiation', 'Team Leadership'],
    industry: 'Logistics',
    employmentType: 'Full Time',
    urgent: true,
    status: 'open',
    description: 'Lead B2B sales for a fast-growing logistics startup with pan-India operations.',
  },
  {
    title: 'Data Scientist',
    company: 'Healthcare Analytics Firm',
    location: 'Bangalore',
    experience: '3–5 years',
    salary: '15–22 LPA',
    skills: ['Python', 'Machine Learning', 'SQL', 'Power BI'],
    industry: 'Healthcare',
    employmentType: 'Full Time',
    status: 'open',
    description: 'Build ML models for healthcare analytics and patient outcome prediction.',
  },
  {
    title: 'DevOps Engineer',
    company: 'SaaS Product Company',
    location: 'Bangalore',
    experience: '3–6 years',
    salary: '16–24 LPA',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'],
    industry: 'IT',
    employmentType: 'Full Time',
    status: 'open',
    description: 'Own infrastructure, CI/CD pipelines and cloud operations for a SaaS product.',
  },
];

const seed = async () => {
  await connectDB();

  // ── Admin accounts ─────────────────────────────────────────
  const admins = [
    {
      name:     process.env.ADMIN_NAME     || 'HRReflect Admin',
      email:    (process.env.ADMIN_EMAIL   || 'info@hrreflect.com').toLowerCase(),
      password: process.env.ADMIN_PASSWORD || 'hrreflect@admin2024',
      role:     'superadmin',
    },
    {
      name:     'Lekkala Bhaskar',
      email:    (process.env.ADMIN2_EMAIL    || 'bhaskar@hrreflect.com').toLowerCase(),
      password: process.env.ADMIN2_PASSWORD  || 'Bhaskar@HRR2024',
      role:     'admin',
    },
  ];

  for (const adminData of admins) {
    const existing = await AdminUser.findOne({ email: adminData.email });
    if (!existing) {
      await AdminUser.create(adminData);
      console.log(`✅ Admin created: ${adminData.email} (${adminData.role})`);
    } else {
      console.log(`ℹ️  Admin already exists: ${adminData.email}`);
    }
  }

  // Create sample jobs
  const jobCount = await Job.countDocuments();
  if (jobCount === 0) {
    await Job.insertMany(sampleJobs);
    console.log(`✅ ${sampleJobs.length} sample jobs created.`);
  } else {
    console.log(`ℹ️  Jobs already seeded (${jobCount} found).`);
  }

  console.log('\n🎉 Seed complete!\n');
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });
