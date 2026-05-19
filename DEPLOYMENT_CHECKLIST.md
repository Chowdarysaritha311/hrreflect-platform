# HRReflect Deployment Checklist

## Why "Save Changes" is Not Working

The most common reason admin cannot save jobs is:
**The backend `.env` file is missing or MongoDB is not connected.**

---

## Step-by-Step Fix

### 1. Create Backend `.env` File

On your server, go to the `backend/` folder and create a `.env` file:

```bash
cd backend
cp .env.example .env
nano .env   # or use any text editor
```

Fill in these values:

```
MONGODB_URI=mongodb+srv://youruser:yourpassword@cluster.mongodb.net/hrreflect
JWT_SECRET=any-long-random-string-here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@hrreflect.com
SMTP_PASS=your-gmail-app-password
ADMIN_EMAIL=info@hrreflect.com
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://hrreflect.com
```

---

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

### 3. Seed the Database (First Time Only)

This creates admin accounts and sample jobs:

```bash
npm run seed
```

You should see:
```
✅ Admin created: info@hrreflect.com (superadmin)
✅ Admin created: bhaskar@hrreflect.com (admin)
✅ 5 sample jobs created.
```

---

### 4. Start the Backend

```bash
npm start
```

Or with PM2 (recommended for production):
```bash
pm2 start src/server.js --name hrreflect-api
pm2 save
```

---

### 5. Set Frontend API URL

In the `frontend/` folder, create a `.env` file:

```bash
cd frontend
cp .env.example .env
```

Edit it:
```
VITE_API_URL=https://your-backend-url.com/api
```

Then rebuild frontend:
```bash
npm run build
```

---

## Admin Login Credentials

| Name | Email | Password | Role |
|------|-------|----------|------|
| HRReflect Admin | info@hrreflect.com | hrreflect@admin2024 | Superadmin |
| Lekkala Bhaskar | bhaskar@hrreflect.com | Bhaskar@HRR2024 | Admin |

> ⚠️ Change passwords after first login!

---

## Quick Diagnosis

To check if the backend is running, open in browser:
```
https://your-backend-url.com/api/health
```

You should see:
```json
{ "status": "ok", "timestamp": "...", "version": "1.0.0" }
```

If you see an error or the page doesn't load — the backend is not running.

