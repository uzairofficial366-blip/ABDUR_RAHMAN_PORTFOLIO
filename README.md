# Abdur Rahman Khan — Professional Portfolio & CMS Website

[![Node.js Version](https://img.shields.io/badge/Node.js-v18%2B%20%7C%20v20%2B%20%7C%20v22%2B%20%7C%20v24%2B-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%208.9-green)](https://www.mongodb.com/)
[![Tests](https://img.shields.io/badge/Tests-12%20Passed%20(100%25)-success)](https://vitest.dev/)

A production-ready full-stack portfolio website and content management system for **Abdur Rahman Khan**, a UI/UX Designer and Graphic Designer based in Peshawar, Pakistan, who also offers Digital Marketing and SEO services.

The design is built with a reference aesthetic featuring a **premium black background (`#080808`)**, **bright orange accents (`#FF5B1B`, `#FF763D`)**, **crisp white typography (`#F5F5F5`)**, modern responsive cards, sophisticated spacing, and a dark/light mode toggle.

---

## 🌟 Key Features

1. **Brand Identity & Hero Section**:
   - Features Abdur Rahman Khan's confirmed name, title (*UI/UX Designer & Graphic Designer*), location (*Peshawar, Pakistan*), 1–3 years experience badge, and hero headline: *"Designing meaningful digital experiences through creativity and strategy."*
   - Displays Abdur Rahman's portrait from `protfolio.jpeg` with glowing orange accents and active availability status.

2. **Core Public Sections**:
   - **Navigation**: Sticky, accessible navigation with brand text logo, smooth scrolling, theme toggle, and mobile drawer.
   - **About Me**: Verified background with editable placeholder blocks for education, certifications, and career goals; includes CV download handler.
   - **Services**: 6 interactive cards covering *UI/UX Design*, *Graphic Design*, *Branding & Visual Identity*, *Digital Marketing*, *Search Engine Optimization (SEO)*, and *Social Media Design*.
   - **Skills & Tools**: Clean grouped toolkit featuring Figma, Adobe Photoshop, Adobe Illustrator, Canva, SEO, Video Editing, etc.
   - **Featured Projects & Case Studies**: Filterable project gallery and detailed case-study pages (`/projects/:slug`) with objectives, process steps, and solutions. Sample demonstration placeholders are transparently labeled.
   - **Testimonials**: Clean layout adhering strictly to truthful review guidelines (no fake testimonials).
   - **Contact Section**: Prominent contact card with confirmed email (`abdurrahman94700@gmail.com`), phone (`+923139470097`), direct WhatsApp chat link (`https://wa.me/923139470097`), and validated MongoDB contact form.
   - **Footer**: Brand statement, quick links, confirmed handles, and back-to-top button.

3. **Secure Admin Dashboard (`/admin`)**:
   - Protected by email/password authentication using bcrypt and JWT.
   - Real-time statistics calculated from database records (published vs draft projects, unread inquiries, testimonials).
   - Full CRUD for projects, services, skills, and testimonials.
   - Project image and CV document uploading.
   - Inquiry management: read/unread toggles, workflow statuses (`New`, `In Progress`, `Responded`, `Archived`), and internal notes.
   - Site settings manager for headline, bio, contact details, social links, and SEO defaults.

4. **Technical SEO & Accessibility**:
   - Dynamic meta tags, Open Graph, and Twitter Cards.
   - Valid JSON-LD structured data (`Person` schema for Peshawar, Pakistan).
   - `robots.txt` and `sitemap.xml`.
   - WCAG 2.2 AA compliant contrast and `prefers-reduced-motion` support.
   - Working dark / light mode toggle persisted in `localStorage`.

5. **Zero-Config Developer Experience**:
   - Automatic fallback to in-memory MongoDB when running locally without a standalone MongoDB server installed.
   - Graceful email handling: inquiries are saved to MongoDB even if SMTP is unconfigured.

---

## 🚀 Quick Start Guide

### 1. Installation
Install all dependencies for root, server, and client:
```bash
npm run install:all
```

### 2. Seed Initial Content & Create Admin
```bash
# Seed verified defaults, services, skills, and sample concepts
npm run seed

# Create the initial administrator account
npm run create-admin
```
Default administrator credentials:
- **Email**: `admin@abdurrahmankhan.com`
- **Password**: `AdminSecurePass2026!`

### 3. Launch Development Servers
```bash
npm run dev
```
- **Public Website**: [http://localhost:5173](http://localhost:5173)
- **Admin Login**: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
- **Backend Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🧪 Automated Tests & Build

Run the test suite across both frontend and backend:
```bash
npm test
```
- **Frontend Tests**: 3/3 passed (Theme context toggle, ProjectCard rendering, Contact form validation).
- **Backend Tests**: 9/9 passed (Health check, Settings, Contact creation, Error handling, Auth security, Draft project visibility, Testimonials publication rules).

To create a production build of the frontend:
```bash
npm run build
```

---

## 📁 Repository Structure

```text
abdur-rahman/
├── client/                      # Frontend Application (React + Vite + Tailwind)
│   ├── public/
│   │   ├── images/              # Profile photo & project SVG mockups
│   │   ├── favicon.svg          # Custom orange AK monogram favicon
│   │   ├── robots.txt           # Search engine directives
│   │   └── sitemap.xml          # XML sitemap for Google indexing
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # ProjectCard, ThemeToggle, SeoHelmet
│   │   │   ├── layout/          # Navbar, Footer
│   │   │   ├── home/            # Hero, About, Services, Skills, Projects, Testimonials, Contact
│   │   │   └── admin/           # AdminLayout
│   │   ├── context/             # ThemeContext, AuthContext
│   │   ├── pages/               # HomePage, ProjectsPage, ProjectDetailPage, NotFoundPage, Admin pages
│   │   ├── services/            # API client service
│   │   ├── styles/              # Tailwind directives and CSS variables
│   │   ├── test/                # Client test suite
│   │   ├── App.jsx              # Main router
│   │   └── main.jsx             # React entry point
│   └── package.json
├── server/                      # Backend REST API (Node.js + Express + Mongoose)
│   ├── scripts/
│   │   ├── create-admin.js      # Secure admin creation script
│   │   └── seed.js              # Database seed script
│   ├── src/
│   │   ├── config/              # MongoDB connection with memory fallback
│   │   ├── controllers/         # Auth, Projects, Services, Skills, Testimonials, Contact, Settings
│   │   ├── middleware/          # JWT auth, Rate limiters, Multer file upload
│   │   ├── models/              # Mongoose schemas
│   │   ├── routes/              # Express API endpoints
│   │   ├── services/            # Nodemailer notification service
│   │   ├── validators/          # Zod input validation schemas
│   │   ├── app.js               # Express application setup & security middleware
│   │   └── server.js            # Server entry point
│   ├── tests/                   # Backend integration tests with Supertest
│   └── uploads/                 # Uploaded images and CV documents
├── docs/                        # Complete Documentation Guides
│   ├── SETUP.md                 # Local setup & prerequisites
│   ├── ADMIN_GUIDE.md           # Admin portal instructions & workflows
│   ├── DEPLOYMENT.md            # Production deployment (Vercel, Render, Atlas, DNS, SSL)
│   └── CONTENT_GUIDE.md         # Content customization & placeholder replacement checklist
├── protfolio.jpeg               # Client source photo
├── package.json                 # Root script runner (dev, build, test)
└── README.md
```

---

## 🔒 Security Measures

- **No Hardcoded Secrets**: Secrets are loaded from `.env` files.
- **Password Security**: Passwords hashed with `bcryptjs` salt rounds.
- **Brute Force Protection**: Express rate limiting on login attempts and form submissions.
- **Access Control**: Administrative routes protected by JWT verification.
- **Data Privacy**: Private inquiries and draft projects are never exposed to public endpoints.
- **File Upload Protection**: Multer checks file types, sizes (10MB limit), and uses random filenames to prevent path traversal.

---

## 📖 Additional Documentation

- [Setup Guide](docs/SETUP.md)
- [Admin User Guide](docs/ADMIN_GUIDE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Client Content Replacement Guide](docs/CONTENT_GUIDE.md)

