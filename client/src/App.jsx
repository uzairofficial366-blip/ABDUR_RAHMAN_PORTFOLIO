import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProjects } from './pages/admin/AdminProjects';
import { AdminServices } from './pages/admin/AdminServices';
import { AdminSkills } from './pages/admin/AdminSkills';
import { AdminTestimonials } from './pages/admin/AdminTestimonials';
import { AdminMessages } from './pages/admin/AdminMessages';
import { AdminSettings } from './pages/admin/AdminSettings';

export function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />

      {/* Admin Authentication */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="skills" element={<AdminSkills />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

