import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title:          { type: String, required: true, trim: true },
  company:        { type: String, required: true, trim: true },
  location:       { type: String, required: true, default: 'Bangalore' },
  experience:     { type: String, required: true },
  salary:         { type: String },
  skills:         [{ type: String }],
  description:    { type: String },
  industry:       { type: String, enum: ['IT','Healthcare','Finance','Manufacturing','BPO','Logistics','Corporate','Startups','Other'], default: 'IT' },
  employmentType: { type: String, enum: ['Full Time','Part Time','Contract','Internship','Remote'], default: 'Full Time' },
  status:         { type: String, enum: ['open','closed'], default: 'open' },
  urgent:         { type: Boolean, default: false },
  // Future AI fields — architecture ready
  aiKeywords:     [{ type: String }],
  requiredScore:  { type: Number, default: 0 },
}, { timestamps: true });

// Virtual: active alias (open = active)
jobSchema.virtual('active').get(function () { return this.status === 'open'; });
jobSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Job', jobSchema);
