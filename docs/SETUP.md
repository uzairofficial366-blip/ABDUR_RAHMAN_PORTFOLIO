# Local Development & Installation Setup

Welcome to the **Abdur Rahman Khan Portfolio & CMS** application. This guide walks you through setting up and running the full-stack project locally.

---

## 1. Prerequisites

- **Node.js**: Node LTS v18.x, v20.x, or v22+ (tested and verified with Node v24 LTS).
- **npm**: v9+ or higher (installed with Node).
- **MongoDB** *(Optional for local dev)*:
  - You can use a local MongoDB daemon (`mongodb://localhost:27017/abdur_rahman_portfolio`) or **MongoDB Atlas**.
  - **Zero-Config Dev Support**: If MongoDB is not installed locally, the server automatically starts an embedded in-memory MongoDB instance so you can run and test the website immediately without configuring external databases.

---

## 2. Directory Structure Overview

```text
abdur-rahman/
├── client/          # React + Vite + Tailwind CSS frontend
├── server/          # Node.js + Express + Mongoose backend
├── docs/            # Comprehensive documentation
├── package.json     # Root orchestration package
├── protfolio.jpeg   # Provided client photo
└── README.md
```

---

## 3. Step-by-Step Installation

### Step A: Install Dependencies
Run the installation command from the repository root:
```bash
npm run install:all
```
*(Or navigate to `server/` and `client/` separately and run `npm install` in each).*

---

### Step B: Environment Variables Configuration

#### Backend Environment (`server/.env`)
Copy the provided `.env.example` file to `.env`:
```bash
cp server/.env.example server/.env
```
Key configuration variables in `server/.env`:
```ini
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/abdur_rahman_portfolio
JWT_SECRET=super_secret_jwt_key_abdur_rahman_portfolio_dev_2026_change_in_prod
FRONTEND_URL=http://localhost:5173
PUBLIC_SITE_URL=http://localhost:5173
ADMIN_EMAIL=admin@abdurrahmankhan.com
ADMIN_PASSWORD=AdminSecurePass2026!

# SMTP Configuration (Optional locally)
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
CONTACT_RECIPIENT_EMAIL=abdurrahman94700@gmail.com
```

#### Frontend Environment (`client/.env`)
Copy `client/.env.example` to `client/.env`:
```bash
cp client/.env.example client/.env
```
Default values:
```ini
VITE_API_BASE_URL=/api
VITE_SITE_URL=http://localhost:5173
VITE_GA_MEASUREMENT_ID=
```

---

### Step C: Seed Initial Data & Create Administrator

1. **Seed Verified Content and Sample Concept Templates**:
   ```bash
   npm run seed
   ```
   This populates:
   - Abdur Rahman Khan's confirmed details (Peshawar, Pakistan; email; phone; services; headline)
   - Initial 6 core service offerings
   - Grouped skills and tool stack
   - Initial demonstration case study templates (marked transparently as concepts)

2. **Create the First Administrator Account**:
   ```bash
   npm run create-admin
   ```
   Default credentials:
   - **Email**: `admin@abdurrahmankhan.com`
   - **Password**: `AdminSecurePass2026!`
   *(You can also pass custom credentials: `node server/scripts/create-admin.js myemail@example.com MyPass123!`)*

---

### Step D: Start Development Servers

From the root directory, start both the client and server concurrently:
```bash
npm run dev
```

- **Public Website URL**: [http://localhost:5173](http://localhost:5173)
- **Backend API URL**: [http://localhost:5000/api/health](http://localhost:5000/api/health)
- **Admin Portal**: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)

---

## 4. Running Tests & Quality Checks

Run all automated tests across frontend and backend:
```bash
npm test
```
Or run individually:
- Client tests: `npm test --prefix client`
- Server tests: `npm test --prefix server`

---

## 5. Contact Form & Email Testing

- When the contact form is submitted at [http://localhost:5173/#contact](http://localhost:5173/#contact), the submission is validated and stored directly in the MongoDB `ContactEnquiry` collection.
- If SMTP credentials are not configured in `server/.env`, the enquiry is safely saved and marked with `emailStatus: not_configured` without throwing errors to the client.
- To enable live email dispatch, configure standard SMTP credentials (such as Gmail App Password, SendGrid, or Mailgun) in `server/.env`.

