# Administrator & Content Management Guide

This document describes how to access and use the administrative dashboard to manage portfolio case studies, service cards, skills, client testimonials, incoming enquiries, and website settings.

---

## 1. Accessing the Admin Dashboard

- **URL**: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
- **Default Email**: `admin@abdurrahmankhan.com`
- **Default Password**: `AdminSecurePass2026!`
- **Security Features**:
  - Passwords hashed using bcrypt.
  - JWT tokens issued upon authentication.
  - Brute-force rate limiting on `/api/admin/auth/login`.
  - Admin endpoints strictly protected by authentication middleware.

---

## 2. Managing Projects & Case Studies (`/admin/projects`)

### Creating or Editing a Project
Click **"Add New Project"** or the **Edit icon** on an existing project:
- **Title**: The project's public name.
- **Slug**: URL identifier (e.g. `website-ui-ux-concept`).
- **Category**: Select from UI/UX Website Design, Mobile App Design, Branding and Logo Design, Social Media Designs, SEO Projects, or Other.
- **Tools**: Comma-separated list (e.g., `Figma, Adobe Photoshop`).
- **Cover Image**: Upload an image file directly (saved to `/uploads/` and linked) or paste an image URL.
- **Short Description**: Displayed on portfolio cards and search engines.
- **Full Case Study Overview**: In-depth description for the project page.
- **Key Objectives**: Enter one objective per line.
- **Design Process Steps**: Enter one phase per line.
- **Final Solution**: Impact and delivery details.
- **Status (Draft / Published)**:
  - `Draft`: Project is only visible to logged-in administrators. Public requests return 404.
  - `Published`: Project is visible to all visitors and included in `sitemap.xml`.
- **Sample Concept Placeholder Toggle**: Keep checked for demonstration concept templates. Uncheck for real completed projects.

---

## 3. Managing Services (`/admin/services`)

- Create or update the 6 core services.
- Choose icon styles: `Layout`, `Palette`, `Sparkles`, `TrendingUp`, `Search`, `Share2`.
- Add feature bullet points (one per line).
- Control display order and visibility.

---

## 4. Managing Skills & Tools (`/admin/skills`)

- Manage tools in your stack (e.g., Figma, Adobe Photoshop, Canva, SEO, etc.).
- Assign categories: `Design`, `Tools`, `Marketing & SEO`, `Media`.
- No artificial percentage progress bars are displayed, maintaining genuine presentation.

---

## 5. Reviewing & Publishing Testimonials (`/admin/testimonials`)

### Strict Verification Rules
- Testimonials must only be published once verified genuine client feedback is provided.
- Two controls govern visibility:
  1. **Verified Genuine Client** checkbox.
  2. **Publish on Website** checkbox.
- If either checkbox is unchecked, the testimonial remains hidden from public visitors.

---

## 6. Managing Contact Enquiries (`/admin/messages`)

When prospective clients submit inquiries via the website contact form:
- Enquiries appear chronologically with sender name, email, project type, and submission date.
- Unread messages are highlighted. Clicking a row marks the message as read.
- **Status Workflow**:
  - `New`: Unprocessed enquiry.
  - `In Progress`: Consultation initiated.
  - `Responded`: Follow-up or quote delivered.
  - `Archived`: Project concluded or inactive.
- **Internal Notes**: Record client estimates, call notes, or follow-up timelines.
- **Email Delivery Status**: Displays whether the instant email notification was `sent`, `failed`, or `not_configured`.

---

## 7. Site Settings & Profile Photo (`/admin/settings`)

- **Profile Picture**: Upload portrait photo (automatically updates hero section).
- **CV Document**: Upload PDF resume and toggle public "Download CV" button.
- **Headline & Bio**: Update verified biography and confirmed contact handles.
- **SEO Defaults**: Configure default page titles, meta descriptions, and OpenGraph tags.

