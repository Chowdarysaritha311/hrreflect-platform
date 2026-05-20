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

  // Resume — stored directly in MongoDB (survives server restarts/redeploys)
  resumeFile: {
    originalName: String,
    mimetype:     String,
    size:         Number,
    data:         Buffer,   // ← actual file bytes stored in DB
  },

  // Job reference
  jobId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  jobTitle: { type: String },
  company:  { type: String },

  // Type
  type: { type: String, enum: ['application', 'jobseeker'], default: 'application' },

  // Job seeker extra fields
  currentRole:  { type: String },
  desiredRole:  { type: String },
  noticePeriod: { type: String },
  message:      { type: String },

  // Status
  status: {
    type: String,
    enum: ['Applied','Shortlisted','Interview Scheduled','Rejected','Hired'],
    default: 'Applied',
  },
  notes: { type: String },

  // AI-ready fields
  aiScore:           { type: Number },
  aiSkillsExtracted: [{ type: String }],
  aiMatchReason:     { type: String },

}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);
