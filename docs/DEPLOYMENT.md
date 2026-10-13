# Production Deployment & Hosting Architecture Guide

This guide describes how to deploy the full-stack portfolio website and API to production environments.

---

## 1. Architecture Overview

The system consists of three main components:
1. **Frontend**: Static React single-page application built via Vite (`client/dist`). Can be hosted on Vercel, Netlify, Cloudflare Pages, or static web servers.
2. **Backend API**: Node.js & Express REST API (`server/src/server.js`). Can be hosted on Render, Railway, DigitalOcean App Platform, Fly.io, or an Ubuntu VPS.
3. **Database**: Managed MongoDB Atlas cluster.
4. **Persistent File Storage**: For production image/CV uploads, use AWS S3, Cloudinary, or Supabase Storage instead of local server disk.

---

## 2. MongoDB Atlas Setup

1. Create a free M0 or shared cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a Database User with read/write privileges (e.g. `portfolio_user`).
3. Under **Network Access**, add the IP address of your backend server or `0.0.0.0/0` (with strong user credentials).
4. Copy the connection string:
   ```text
   mongodb+srv://portfolio_user:<password>@cluster0.mongodb.net/abdur_rahman_portfolio?retryWrites=true&w=majority
   ```

---

## 3. Backend Deployment (Render / Railway / VPS)

### Production Environment Variables on Server
Set these environment variables in your server hosting dashboard:
```ini
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://portfolio_user:YourStrongPassword@cluster0.mongodb.net/abdur_rahman_portfolio?retryWrites=true&w=majority
JWT_SECRET=generate_a_random_64_character_hex_string_for_production
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-custom-domain.com
PUBLIC_SITE_URL=https://your-custom-domain.com

ADMIN_EMAIL=your-real-admin-email@domain.com
ADMIN_PASSWORD=YourSuperStrongAdminPassword2026!

# Production SMTP Configuration
SMTP_HOST=smtp.sendgrid.net (or smtp.gmail.com)
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-smtp-api-key
CONTACT_RECIPIENT_EMAIL=abdurrahman94700@gmail.com
FROM_EMAIL=notifications@your-custom-domain.com
```

### Build & Start Commands
- **Build Command**: `npm install`
- **Start Command**: `node src/server.js`

---

## 4. Frontend Deployment (Vercel / Netlify / Cloudflare Pages)

1. Connect your Git repository.
2. Set Root Directory to `client`.
3. Build Settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Set Environment Variables:
   - `VITE_API_BASE_URL`: `https://api.your-custom-domain.com/api` (or `/api` if using reverse proxy)
   - `VITE_SITE_URL`: `https://your-custom-domain.com`
   - `VITE_GA_MEASUREMENT_ID`: `G-XXXXXXXXXX` (Optional Google Analytics 4)

### Single Page Application Rewrite Rule
For client-side routing on Netlify/Vercel:
- **Netlify**: Create `client/public/_redirects`:
  ```text
  /*    /index.html   200
  ```
- **Vercel**: `vercel.json`:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```

---

## 5. Domain Name, DNS & SSL Configuration

When a custom domain (e.g. `abdurrahmankhan.com`) is purchased:
1. Add an `A` record pointing to your frontend hosting IP, or a `CNAME` pointing to your Vercel/Netlify host.
2. For the API subdomain (e.g. `api.abdurrahmankhan.com`), add a `CNAME` pointing to your backend host.
3. Both Vercel and Render automatically issue free, auto-renewing Let's Encrypt SSL/TLS certificates.
4. Verify HTTPS redirection is active.

---

## 6. Search Engine Optimization & Post-Launch Checklist

1. Update `client/public/robots.txt` and `client/public/sitemap.xml` with your production domain.
2. Submit your sitemap in [Google Search Console](https://search.google.com/search-console).
3. Test contact form submission to confirm email receipt at `abdurrahman94700@gmail.com`.
4. Run Lighthouse audit in Chrome DevTools to verify Performance, Accessibility, Best Practices, and SEO.

