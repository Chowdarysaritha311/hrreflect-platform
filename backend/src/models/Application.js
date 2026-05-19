import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  // Candidate info
  name:        { type: String, required: true, trim: true },
  email:       { type: String, required: true, lowercase: true, trim: true },
  phone:       { type: String, required: true },
  location:    { type: String },
  experience:  { type: String, required: true },
  skills:      { type: String },
  coverLetter: { type: String },
  // Resume file
  resumeFile: {
    originalName: String,
    filename:     String,
    path:         String,
    mimetype:     String,
    size:         Number,
  },
  // Job reference (only for job applicants)
  jobId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  jobTitle: { type: String },
  company:  { type: String },
  // Type: 'application' = applied to a specific job, 'jobseeker' = general profile registration
  type: { type: String, enum: ['application', 'jobseeker'], default: 'application' },
  // Extra jobseeker fields
  currentRole:  { type: String },
  desiredRole:  { type: String },
  noticePeriod: { type: String },
  message:      { type: String },
  // Application management
  status: {
    type: String,
    enum: ['Applied','Shortlisted','Interview Scheduled','Rejected','Hired'],
    default: 'Applied',
  },
  notes: { type: String },
  // Future AI fields — architecture ready
  aiScore:          { type: Number },
  aiSkillsExtracted:[{ type: String }],
  aiMatchReason:    { type: String },
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);
