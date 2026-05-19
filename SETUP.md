# 🚀 HRReflect Platform — Setup Guide

## Folder Structure

```
hrreflect-platform/
├── frontend/                   # React + Vite frontend
│   ├── public/
│   │   ├── hrr-logo.jpg        # HRReflect logo
│   │   └── favicon.svg
│   ├── src/
│   │   ├── api/index.js        # All API calls
│   │   ├── context/AuthContext.jsx
│   │   ├── hooks/
│   │   ├── components/
│   │   │   ├── admin/          # AdminLayout, ProtectedRoute
│   │   │   ├── layout/         # Navbar, Footer
│   │   │   ├── sections/       # Home page sections
│   │   │   └── ui/             # Toast, ScrollProgress
│   │   └── pages/
│   │       ├── admin/          # AdminLogin, Dashboard, Jobs, Applications, Contacts
│   │       ├── Home.jsx
│   │       ├── About.jsx
│   │       ├── Services.jsx
│   │       ├── Industries.jsx
│   │       ├── Vacancies.jsx
│   │       ├── JobSeekers.jsx
│   │       └── Contact.jsx
│   ├── .env.example
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                    # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── config/db.js        # MongoDB connection
│   │   ├── models/             # AdminUser, Job, Application, Contact
│   │   ├── routes/             # auth, jobs, applications, contacts, admin
│   │   ├── middleware/         # auth (JWT), upload (Multer), rateLimiter, errorHandler
│   │   └── utils/
│   │       ├── email.js        # Nodemailer email notifications
│   │       └── seed.js         # DB seeder
│   ├── uploads/                # Resume files (auto-created, git-ignored)
│   ├── .env.example
│   └── package.json
│
├── package.json                # Root scripts (run both with one command)
├── SETUP.md
├── ADMIN_GUIDE.md
└── README.md
```

---

## Quick Start (Both Frontend + Backend)

```bash
# Step 1: Install all dependencies
npm run install:all

# Step 2: Setup backend .env
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, email credentials

# Step 3: Seed the database
npm run seed
# Creates admin account + 5 sample jobs

# Step 4: Go back to root and start both servers
cd ..
npm run dev
# Frontend → http://localhost:5173
# Backend  → http://localhost:5000
```

---

## Manual Setup (Step by Step)

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env
cp .env.example .env
```

**Fill in `backend/.env`:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/hrreflect

JWT_SECRET=your-long-random-secret-key-change-this
JWT_EXPIRES_IN=7d

ADMIN_EMAIL=info@hrreflect.com
ADMIN_PASSWORD=hrreflect@admin2024
ADMIN_NAME=HRReflect Admin

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password
EMAIL_FROM=HRReflect <info@hrreflect.com>

FRONTEND_URL=http://localhost:5173
MAX_FILE_SIZE_MB=5
```

```bash
# Seed database (run ONCE — creates admin + sample jobs)
npm run seed

# Start backend
npm run dev
# Runs on http://localhost:5000
# Health check: http://localhost:5000/api/health
```

---

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# (Optional) Create .env
cp .env.example .env
# Default proxy handles API calls automatically in dev

# Start frontend
npm run dev
# Runs on http://localhost:5173
```

---

## MongoDB — Answer to "Is there existing data?"

**No** — The database starts completely empty.

After running `npm run seed` inside the `backend/` folder:
- ✅ 1 admin account created (`info@hrreflect.com`)
- ✅ 5 sample job listings created

All other data (applications, contacts, enquiries) comes from real form submissions on the website.

### MongoDB URI Options:

**Local MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/hrreflect
```

**MongoDB Atlas (Cloud — recommended for production):**
1. Create free account at https://cloud.mongodb.com
2. Create a cluster → Connect → Drivers
3. Copy connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hrreflect
```

---

## Admin Panel

| URL | Page |
|-----|------|
| `/admin/login` | Login page |
| `/admin/dashboard` | Overview & stats |
| `/admin/jobs` | Add/Edit/Delete/Toggle jobs |
| `/admin/applications` | View candidates, update status, download resume |
| `/admin/contacts` | View contact enquiries |

**Credentials:**
- Email: `info@hrreflect.com`
- Password: `hrreflect@admin2024`

---

## VPS Deployment

### 1. Server Setup
```bash
# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

### 2. Deploy
```bash
git clone https://github.com/Chowdarysaritha311/hrreflect-platform.git
cd hrreflect-platform

# Backend
cd backend
npm install --production
cp .env.example .env
nano .env  # Fill in production values
npm run seed
pm2 start src/server.js --name hrreflect-api
pm2 save && pm2 startup

# Frontend
cd ../frontend
npm install
npm run build
# Copies built files to frontend/dist/
```

### 3. Nginx Config
```nginx
server {
    listen 80;
    server_name hrreflect.com www.hrreflect.com;

    # Serve frontend
    root /var/www/hrreflect;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API to backend
    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Resume downloads
    location /uploads {
        proxy_pass http://localhost:5000;
    }
}
```

```bash
# Copy frontend build
sudo mkdir -p /var/www/hrreflect
sudo cp -r frontend/dist/* /var/www/hrreflect/

# Enable nginx site
sudo ln -s /etc/nginx/sites-available/hrreflect /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# SSL
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d hrreflect.com -d www.hrreflect.com
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | ❌ | Admin login |
| GET | /api/auth/me | ✅ | Get current admin |
| GET | /api/jobs | ❌ | Open jobs (public) |
| GET | /api/jobs/all | ✅ | All jobs (admin) |
| POST | /api/jobs | ✅ | Create job |
| PUT | /api/jobs/:id | ✅ | Update job |
| PATCH | /api/jobs/:id/toggle | ✅ | Open/close job |
| DELETE | /api/jobs/:id | ✅ | Delete job |
| POST | /api/applications | ❌ | Submit application |
| GET | /api/applications | ✅ | All applications |
| PATCH | /api/applications/:id/status | ✅ | Update status |
| GET | /api/applications/:id/resume | ✅ | Download resume |
| POST | /api/contacts | ❌ | Submit enquiry |
| GET | /api/contacts | ✅ | All enquiries |
| GET | /api/admin/stats | ✅ | Dashboard stats |
| GET | /api/health | ❌ | Health check |
