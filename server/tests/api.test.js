import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { connectDB, disconnectDB } from '../src/config/db.js';
import { AdminUser } from '../src/models/AdminUser.js';
import { Project } from '../src/models/Project.js';
import { Testimonial } from '../src/models/Testimonial.js';
import { ContactEnquiry } from '../src/models/ContactEnquiry.js';

let authToken = '';

beforeAll(async () => {
  await connectDB();

  // Create test admin
  const passwordHash = await AdminUser.hashPassword('AdminTest123!');
  const admin = await AdminUser.create({
    email: 'testadmin@abdurrahmankhan.com',
    passwordHash,
    name: 'Test Administrator',
    role: 'superadmin',
  });

  // Login to get token
  const res = await request(app).post('/api/admin/auth/login').send({
    email: 'testadmin@abdurrahmankhan.com',
    password: 'AdminTest123!',
  });
  authToken = res.body.token;
}, 300000);

afterAll(async () => {
  await disconnectDB();
});

describe('Public API Endpoints', () => {
  it('GET /api/health returns 200 and healthy status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  it('GET /api/settings returns brand details', async () => {
    const res = await request(app).get('/api/settings');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.settings.brandName).toBeDefined();
  });

  it('POST /api/contact validates input and creates enquiry even when email is unconfigured', async () => {
    const res = await request(app).post('/api/contact').send({
      name: 'Client Tester',
      email: 'client@example.com',
      projectType: 'UI/UX Design',
      message: 'Hello, this is a test project enquiry to verify database persistence.',
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.enquiryId).toBeDefined();

    // Verify it is in database
    const saved = await ContactEnquiry.findById(res.body.enquiryId);
    expect(saved).not.toBeNull();
    expect(saved.email).toBe('client@example.com');
  });

  it('POST /api/contact rejects invalid payloads', async () => {
    const res = await request(app).post('/api/contact').send({
      name: 'A',
      email: 'invalid-email',
      message: 'Short',
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe('Admin Authentication & Security', () => {
  it('rejects access to protected admin route without token', async () => {
    const res = await request(app).get('/api/admin/dashboard');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('allows access with valid admin token', async () => {
    const res = await request(app)
      .get('/api/admin/dashboard')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.metrics).toBeDefined();
  });
});

describe('Projects Visibility & Publication Rules', () => {
  let createdProjectId = '';

  it('admin can create draft project, which is hidden from public', async () => {
    // 1. Create a draft project
    const createRes = await request(app)
      .post('/api/admin/projects')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Confidential Internal Draft',
        slug: 'confidential-internal-draft',
        category: 'UI/UX Website Design',
        shortDescription: 'This is a private draft project description.',
        status: 'draft',
      });

    expect(createRes.status).toBe(201);
    createdProjectId = createRes.body.project._id;

    // 2. Public /api/projects must NOT include it
    const publicList = await request(app).get('/api/projects');
    const slugs = publicList.body.projects.map((p) => p.slug);
    expect(slugs).not.toContain('confidential-internal-draft');

    // 3. Public slug lookup must return 404
    const slugRes = await request(app).get('/api/projects/confidential-internal-draft');
    expect(slugRes.status).toBe(404);
  });

  it('publishing the draft makes it visible to public', async () => {
    // Publish it
    const updateRes = await request(app)
      .put(`/api/admin/projects/${createdProjectId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ status: 'published' });

    expect(updateRes.status).toBe(200);

    // Public lookup now succeeds
    const slugRes = await request(app).get('/api/projects/confidential-internal-draft');
    expect(slugRes.status).toBe(200);
    expect(slugRes.body.project.title).toBe('Confidential Internal Draft');

    // Clean up
    await request(app)
      .delete(`/api/admin/projects/${createdProjectId}`)
      .set('Authorization', `Bearer ${authToken}`);
  });
});

describe('Testimonial Publication Rules', () => {
  it('unverified or unpublished testimonials are never exposed on public endpoint', async () => {
    // Create an unverified testimonial
    await Testimonial.create({
      authorName: 'Unverified Reviewer',
      quote: 'Great service test quote',
      isVerified: false,
      isPublished: true,
    });

    const res = await request(app).get('/api/testimonials');
    const authors = res.body.testimonials.map((t) => t.authorName);
    expect(authors).not.toContain('Unverified Reviewer');
  });
});
