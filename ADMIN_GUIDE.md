# 🔐 HRReflect Admin Panel Guide

## Admin Login Details

| Field    | Value                        |
|----------|------------------------------|
| URL      | https://hrreflect.com/admin  |
| Email    | info@hrreflect.com           |
| Password | hrreflect@admin2024          |

---

## What Admin Can Do

### 1. 📋 Manage Vacancies
- Add / Edit / Delete job listings
- Activate or Deactivate jobs (controls visibility on website)
- Mark jobs as Urgent (shows 🔥 badge)
- Changes appear **live instantly** on /vacancies page

### 2. 👥 View Applications
All candidates who applied via:
- Job Seekers registration form (/job-seekers)
- Vacancy Apply Now button (/vacancies)

Admin can update status: New → Reviewed → Shortlisted → Rejected

### 3. 📬 Contact Enquiries
All messages submitted via Contact Us page (/contact)

Admin can update status: New → In Progress → Closed

---

## To Change Admin Password
Open `src/pages/Admin.jsx` and update:
```
const ADMIN_EMAIL    = 'info@hrreflect.com';
const ADMIN_PASSWORD = 'hrreflect@admin2024';
```
Then rebuild and redeploy.
