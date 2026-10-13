// Unified API request helper

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('admin_token');
  const headers = {
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

// Public API
export const getPublicSettings = () => request('/settings');
export const getPublicServices = () => request('/services');
export const getPublicSkills = () => request('/skills');
export const getPublicProjects = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/projects${query ? `?${query}` : ''}`);
};
export const getPublicProjectBySlug = (slug) => request(`/projects/${slug}`);
export const getPublicTestimonials = () => request('/testimonials');
export const submitContactForm = (formData) =>
  request('/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });

// Admin API
export const adminLogin = (credentials) =>
  request('/admin/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
export const getAdminDashboardMetrics = () => request('/admin/dashboard');

// Projects
export const getAdminProjects = () => request('/admin/projects');
export const createAdminProject = (projectData) =>
  request('/admin/projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  });
export const updateAdminProject = (id, projectData) =>
  request(`/admin/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(projectData),
  });
export const deleteAdminProject = (id) =>
  request(`/admin/projects/${id}`, {
    method: 'DELETE',
  });

// Services
export const getAdminServices = () => request('/admin/services');
export const createAdminService = (serviceData) =>
  request('/admin/services', {
    method: 'POST',
    body: JSON.stringify(serviceData),
  });
export const updateAdminService = (id, serviceData) =>
  request(`/admin/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(serviceData),
  });
export const deleteAdminService = (id) =>
  request(`/admin/services/${id}`, {
    method: 'DELETE',
  });

// Skills
export const getAdminSkills = () => request('/admin/skills');
export const createAdminSkill = (skillData) =>
  request('/admin/skills', {
    method: 'POST',
    body: JSON.stringify(skillData),
  });
export const updateAdminSkill = (id, skillData) =>
  request(`/admin/skills/${id}`, {
    method: 'PUT',
    body: JSON.stringify(skillData),
  });
export const deleteAdminSkill = (id) =>
  request(`/admin/skills/${id}`, {
    method: 'DELETE',
  });

// Testimonials
export const getAdminTestimonials = () => request('/admin/testimonials');
export const createAdminTestimonial = (data) =>
  request('/admin/testimonials', {
    method: 'POST',
    body: JSON.stringify(data),
  });
export const updateAdminTestimonial = (id, data) =>
  request(`/admin/testimonials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
export const deleteAdminTestimonial = (id) =>
  request(`/admin/testimonials/${id}`, {
    method: 'DELETE',
  });

// Messages
export const getAdminMessages = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/admin/messages${query ? `?${query}` : ''}`);
};
export const getAdminMessageById = (id) => request(`/admin/messages/${id}`);
export const updateAdminMessage = (id, data) =>
  request(`/admin/messages/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
export const deleteAdminMessage = (id) =>
  request(`/admin/messages/${id}`, {
    method: 'DELETE',
  });

// Settings
export const getAdminSettings = () => request('/admin/settings');
export const updateAdminSettings = (data) =>
  request('/admin/settings', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

// File Upload
export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return request('/admin/upload', {
    method: 'POST',
    body: formData,
  });
};

