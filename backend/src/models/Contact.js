import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, lowercase: true, trim: true },
  phone:     { type: String },
  company:   { type: String },
  service:   { type: String },
  positions: { type: String },
  message:   { type: String },
  status: {
    type: String,
    enum: ['New','In Progress','Closed'],
    default: 'New',
  },
  notes: { type: String },
}, { timestamps: true });

export default mongoose.model('Contact', contactSchema);
