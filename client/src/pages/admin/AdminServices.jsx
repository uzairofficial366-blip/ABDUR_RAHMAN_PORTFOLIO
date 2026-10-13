import React, { useState, useEffect } from 'react';
import {
  getAdminServices,
  createAdminService,
  updateAdminService,
  deleteAdminService,
} from '../../services/api';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

export const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const initialForm = {
    title: '',
    slug: '',
    description: '',
    icon: 'Layout',
    features: '',
    displayOrder: 1,
    isPublished: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchServices = async () => {
    try {
      const res = await getAdminServices();
      if (res.services) setServices(res.services);
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenCreate = () => {
    setEditingService(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (srv) => {
    setEditingService(srv);
    setFormData({
      title: srv.title,
      slug: srv.slug,
      description: srv.description,
      icon: srv.icon || 'Layout',
      features: srv.features?.join('\n') || '',
      displayOrder: srv.displayOrder || 1,
      isPublished: srv.isPublished ?? true,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      features: formData.features.split('\n').map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingService) {
        await updateAdminService(editingService._id, payload);
        setAlert({ type: 'success', message: 'Service updated!' });
      } else {
        await createAdminService(payload);
        setAlert({ type: 'success', message: 'Service created!' });
      }
      setModalOpen(false);
      await fetchServices();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete service "${title}"?`)) return;
    try {
      await deleteAdminService(id);
      setAlert({ type: 'success', message: 'Service removed.' });
      await fetchServices();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services Management</h1>
          <p className="text-xs text-light-muted dark:text-dark-muted mt-1">
            Configure offered service cards, icons, and feature bullet points.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-glow-orange cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {alert.message && (
        <div className={`p-4 rounded-xl text-xs flex items-center justify-between ${
          alert.type === 'error' ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
        }`}>
          <span>{alert.message}</span>
          <button onClick={() => setAlert({ type: '', message: '' })}><X className="w-4 h-4" /></button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <div
            key={srv._id}
            className="p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-bold text-accent px-2 py-0.5 rounded bg-accent/10">
                  {srv.icon}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  srv.isPublished ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {srv.isPublished ? 'Published' : 'Hidden'}
                </span>
              </div>
              <h3 className="text-base font-bold mb-2">{srv.title}</h3>
              <p className="text-xs text-light-muted dark:text-dark-muted line-clamp-3 mb-4">
                {srv.description}
              </p>
            </div>

            <div className="pt-4 border-t border-light-border dark:border-dark-border flex justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(srv)}
                className="p-1.5 rounded hover:bg-light-bg dark:hover:bg-dark-secondary text-light-muted dark:text-dark-muted hover:text-accent"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(srv._id, srv.title)}
                className="p-1.5 rounded hover:bg-rose-500/10 text-light-muted dark:text-dark-muted hover:text-rose-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-light-border dark:border-dark-border pb-3">
              <h3 className="text-base font-bold">{editingService ? 'Edit Service' : 'Add Service'}</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase font-semibold mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
                />
              </div>
              <div>
                <label className="block uppercase font-semibold mb-1">Description</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-semibold mb-1">Icon Name</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
                  >
                    <option value="Sparkles">Sparkles (Logo / Branding)</option>
                    <option value="Palette">Palette (Poster / Graphic)</option>
                    <option value="Layout">Layout (Website Images)</option>
                    <option value="Wand2">Wand2 (Image Editing)</option>
                    <option value="TrendingUp">TrendingUp (Marketing)</option>
                    <option value="Search">Search (SEO)</option>
                    <option value="Share2">Share2 (Social)</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase font-semibold mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
                  />
                </div>
              </div>
              <div>
                <label className="block uppercase font-semibold mb-1">Feature Bullets (One per line)</label>
                <textarea
                  rows="3"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="accent-accent"
                />
                <span>Published on website</span>
              </label>
              <div className="flex justify-end gap-2 pt-3 border-t border-light-border dark:border-dark-border">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-lg bg-accent text-white font-bold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

