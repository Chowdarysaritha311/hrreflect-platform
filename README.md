# HRReflect.com — Premium HR Consultancy Website

A modern, full-featured HR consultancy website built with React + Vite + Tailwind CSS + Framer Motion.

---

## 🚀 Tech Stack

- **React 18** + **Vite 8**
- **Tailwind CSS 3**
- **Framer Motion** (animations)
- **React Router DOM** (multi-page routing)
- **Lucide React** (icons)

---

## 📁 Project Structure

```
hrreflect/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Sticky glass navbar + mobile menu
│   │   │   └── Footer.jsx          # Full footer with links & CTA
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx     # Animated hero + stats bar
│   │   │   ├── ServicesSection.jsx # 9 animated service cards
│   │   │   ├── IndustriesSection.jsx # 8 industry grid cards
│   │   │   ├── WhyChooseUs.jsx     # Bento grid layout
│   │   │   ├── ProcessTimeline.jsx # 5-step recruitment process
│   │   │   ├── TestimonialsSection.jsx # Client testimonials
│   │   │   ├── CTABanner.jsx       # High-converting CTA
│   │   │   └── ContactSection.jsx  # Contact form
│   │   └── ui/
│   │       └── ScrollProgress.jsx  # Scroll progress bar
│   ├── hooks/
│   │   └── useCounter.js           # Animated counter + InView hook
│   ├── pages/
│   │   ├── Home.jsx                # Full homepage
│   │   ├── About.jsx               # Company story, team, values
│   │   ├── Services.jsx            # Detailed services page
│   │   ├── Industries.jsx          # 8 industry deep-dives
│   │   └── Contact.jsx             # Full contact page
│   ├── App.jsx                     # Router + layout wrapper
│   ├── main.jsx
│   └── index.css                   # Tailwind + global styles
├── index.html
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- npm 9+

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
http://localhost:5173
```

### Build for Production

```bash
npm run build
```
The production build will be in `/dist`.

---

## 🖥️ VPS Deployment

### Option 1: Nginx (Recommended)

```bash
# Build the project
npm run build

# Copy dist/ to your server
scp -r dist/ user@your-server:/var/www/hrreflect/

# Nginx config
server {
    listen 80;
    server_name hrreflect.com www.hrreflect.com;
    root /var/www/hrreflect/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/css application/javascript application/json;
}
```

### Option 2: PM2 + serve

```bash
npm install -g pm2 serve
pm2 start "serve -s dist -l 3000" --name hrreflect
```

---

## 🎨 Design Features

- ✅ Glassmorphism navbar with scroll detection
- ✅ Animated hero with floating UI cards
- ✅ Scroll-triggered animated counters
- ✅ Bento grid "Why Choose Us" section
- ✅ Full-screen mobile navigation
- ✅ Scroll progress bar (red)
- ✅ Page transition animations
- ✅ Hover micro-interactions on all cards
- ✅ Animated gradient blobs
- ✅ Grid background texture overlay
- ✅ Responsive on all screen sizes

---

## 📞 Brand Info

- **Company:** HRReflect.com
- **Primary Color:** #E8192C (Brand Red)
- **Font:** Syne (Display) + DM Sans (Body)
- **Offices:** Bangalore (Kanakapura Road) & Gurgaon

---

## 📝 Customization

Update company info in:
- `src/components/layout/Footer.jsx` — contact details, social links
- `src/pages/Contact.jsx` — office addresses, phone, email
- `index.html` — meta title, description, keywords

To connect a real form backend, update `handleSubmit` in:
- `src/components/sections/ContactSection.jsx`
- `src/pages/Contact.jsx`

---

*Built with ❤️ for HRReflect.com*
