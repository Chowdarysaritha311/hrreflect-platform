# 🚀 HOW TO DEPLOY — HRReflect Platform

## Why Changes Are Not Showing on Live Site

Even though code is pushed to GitHub, the **live server needs to be updated manually**
until auto-deploy is configured.

---

## ✅ OPTION 1 — Manual Deploy (Quickest Fix Right Now)

SSH into your server and run these commands:

```bash
# 1. Go to project folder
cd /var/www/hrreflect   # or wherever the project is hosted

# 2. Pull latest code from GitHub
git pull origin main

# 3. Rebuild the frontend
cd frontend
npm install
npm run build

# 4. Restart the backend
cd ../backend
npm install
pm2 restart hrreflect-api
# OR if not using PM2:
# node src/server.js

echo "✅ Done! Live site is now updated."
```

---

## ✅ OPTION 2 — If Hosted on cPanel / Shared Hosting

1. Login to cPanel
2. Go to **File Manager** → navigate to your project folder
3. Open **Terminal** (if available) and run:
   ```bash
   git pull origin main
   cd frontend && npm install && npm run build
   ```
4. If no terminal — download the `frontend/dist` folder from GitHub
   and upload it to `public_html` via File Manager

---

## ✅ OPTION 3 — Auto Deploy with GitHub Actions (Recommended)

Once set up, every push to `main` will **automatically deploy** to live server.

### Setup Steps:

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**

2. Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `SSH_HOST` | Your server IP (e.g. `123.456.789.0`) |
| `SSH_USER` | Your server username (e.g. `root` or `ubuntu`) |
| `SSH_KEY` | Your private SSH key (contents of `~/.ssh/id_rsa`) |
| `VITE_API_URL` | Your backend URL (e.g. `https://api.hrreflect.com/api`) |

3. The file `.github/workflows/deploy.yml` is already created in the repo.
   Every push to `main` will now auto-deploy! ✅

---

## ✅ OPTION 4 — Vercel (Easiest for Frontend)

If frontend is on Vercel:
1. Go to [vercel.com](https://vercel.com) → Your Project → **Settings** → **Git**
2. Make sure it's connected to `main` branch
3. Every push auto-deploys in ~2 minutes

Set environment variable in Vercel:
```
VITE_API_URL = https://your-backend-url.com/api
```

---

## Changes Already in GitHub (Just Need Deployment)

| Change | Status |
|--------|--------|
| ✅ Logo visible on homepage | In GitHub |
| ✅ Karnal + type-any-city in location | In GitHub |
| ✅ Job Description textarea expanded | In GitHub |
| ✅ JD visible to candidates (View Details) | In GitHub |
| ✅ Job Seekers form saves to database | In GitHub |
| ✅ Admin panel — Job Seekers tab | In GitHub |
| ✅ Custom location (type Puducherry, Salem, Trichy etc.) | In GitHub |

All code is correct and ready. **Just needs to be deployed to live server.**

---

## Need Help?

Share which hosting provider/platform the site is on and we'll give exact steps.
