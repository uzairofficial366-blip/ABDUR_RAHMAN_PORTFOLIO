import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { contactLimiter, loginLimiter } from '../middleware/rateLimiter.js';
import { upload } from '../middleware/upload.js';

import { login, logout, getMe } from '../controllers/authController.js';
import {
  getPublicProjects,
  getPublicProjectBySlug,
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import {
  getPublicServices,
  getAdminServices,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import {
  getPublicSkills,
  getAdminSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../controllers/skillController.js';
import {
  getPublicTestimonials,
  getAdminTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import {
  submitContactForm,
  getAdminEnquiries,
  getAdminEnquiryById,
  updateAdminEnquiry,
  deleteAdminEnquiry,
} from '../controllers/contactController.js';
import {
  getPublicSettings,
  getAdminSettings,
  updateAdminSettings,
  getAdminDashboardMetrics,
} from '../controllers/settingsController.js';

const router = express.Router();

// ==========================================
// 1. PUBLIC ENDPOINTS
// ==========================================
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Abdur Rahman Khan Portfolio API',
  });
});

router.get('/settings', getPublicSettings);
router.get('/services', getPublicServices);
router.get('/skills', getPublicSkills);
router.get('/projects', getPublicProjects);
router.get('/projects/:slug', getPublicProjectBySlug);
router.get('/testimonials', getPublicTestimonials);
router.post('/contact', contactLimiter, submitContactForm);

// ==========================================
// 2. ADMIN AUTHENTICATION
// ==========================================
router.post('/admin/auth/login', loginLimiter, login);
router.post('/admin/auth/logout', logout);
router.get('/admin/auth/me', requireAuth, getMe);

// ==========================================
// 3. ADMIN FILE UPLOAD
// ==========================================
router.post('/admin/upload', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded or file was rejected.' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  return res.status(200).json({
    success: true,
    message: 'File uploaded successfully',
    url: fileUrl,
    filename: req.file.filename,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });
});

// ==========================================
// 4. ADMIN PROTECTED ROUTES
// ==========================================
router.get('/admin/dashboard', requireAuth, getAdminDashboardMetrics);

// Projects CRUD
router.get('/admin/projects', requireAuth, getAdminProjects);
router.post('/admin/projects', requireAuth, createProject);
router.put('/admin/projects/:id', requireAuth, updateProject);
router.delete('/admin/projects/:id', requireAuth, deleteProject);

// Services CRUD
router.get('/admin/services', requireAuth, getAdminServices);
router.post('/admin/services', requireAuth, createService);
router.put('/admin/services/:id', requireAuth, updateService);
router.delete('/admin/services/:id', requireAuth, deleteService);

// Skills CRUD
router.get('/admin/skills', requireAuth, getAdminSkills);
router.post('/admin/skills', requireAuth, createSkill);
router.put('/admin/skills/:id', requireAuth, updateSkill);
router.delete('/admin/skills/:id', requireAuth, deleteSkill);

// Testimonials CRUD
router.get('/admin/testimonials', requireAuth, getAdminTestimonials);
router.post('/admin/testimonials', requireAuth, createTestimonial);
router.put('/admin/testimonials/:id', requireAuth, updateTestimonial);
router.delete('/admin/testimonials/:id', requireAuth, deleteTestimonial);

// Messages / Enquiries Management
router.get('/admin/messages', requireAuth, getAdminEnquiries);
router.get('/admin/messages/:id', requireAuth, getAdminEnquiryById);
router.patch('/admin/messages/:id', requireAuth, updateAdminEnquiry);
router.delete('/admin/messages/:id', requireAuth, deleteAdminEnquiry);

// Settings Management
router.get('/admin/settings', requireAuth, getAdminSettings);
router.patch('/admin/settings', requireAuth, updateAdminSettings);

export default router;

