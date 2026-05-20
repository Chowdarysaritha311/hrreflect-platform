import multer from 'multer';

// Use memoryStorage — file stored in RAM as Buffer, then saved to MongoDB
// This prevents files from being lost on server restarts/redeploys

const fileFilter = (req, file, cb) => {
  const allowed = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, and DOCX files are allowed.'), false);
  }
};

const MAX_MB = parseInt(process.env.MAX_FILE_SIZE_MB || '5');

export const uploadResume = multer({
  storage: multer.memoryStorage(), // Store in memory as Buffer
  fileFilter,
  limits: { fileSize: MAX_MB * 1024 * 1024 },
}).single('resume');
