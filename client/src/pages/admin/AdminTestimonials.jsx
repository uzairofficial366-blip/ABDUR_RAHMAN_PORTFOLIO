import React, { useState, useEffect } from 'react';
import {
  getAdminTestimonials,
  createAdminTestimonial,
  updateAdminTestimonial,
  deleteAdminTestimonial,
} from '../../services/api';
import { Plus, Edit2, Trash2, X, AlertTriangle, CheckCircle, ShieldCheck } from 'lucide-react';

export const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const initialForm = {
    authorName: '',
    authorTitle: '',
    company: '',
    quote: '',
    photo: '',
    isVerified: false,
    isPublished: false,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchTestimonials = async () => {
    try {
      const res = await getAdminTestimonials();
      if (res.testimonials) setTestimonials(res.testimonials);
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenCreate = () => {
    setEditingTestimonial(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingTestimonial(t);
    setFormData({
      authorName: t.authorName,
      authorTitle: t.authorTitle || '',
      company: t.company || '',
      quote: t.quote,
      photo: t.photo || '',
      isVerified: t.isVerified || false,
      isPublished: t.isPublished || false,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingTestimonial) {
        await updateAdminTestimonial(editingTestimonial._id, formData);
        setAlert({ type: 'success', message: 'Testimonial updated!' });
      } else {
        await createAdminTestimonial(formData);
        setAlert({ type: 'success', message: 'Testimonial created!' });
      }
      setModalOpen(false);
      await fetchTestimonials();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete review from "${name}"?`)) return;
    try {
      await deleteAdminTestimonial(id);
      setAlert({ type: 'success', message: 'Testimonial deleted.' });
      await fetchTestimonials();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Testimonials &amp; Reviews</h1>
          <p className="text-xs text-light-muted dark:text-dark-muted mt-1">
            Manage genuine client reviews and publication status.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-glow-orange cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Strict Ethical Warning Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
        <div>
          <strong>Strict Ethical Policy:</strong> Never fabricate testimonials or publish unverified reviews. Reviews will only appear on the public website when both <em>Verified</em> and <em>Published</em> toggles are active.
        </div>
      </div>

      {alert.message && (
        <div className={`p-4 rounded-xl text-xs flex items-center justify-between ${
          alert.type === 'error' ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
        }`}>
          <span>{alert.message}</span>
          <button onClick={() => setAlert({ type: '', message: '' })}><X className="w-4 h-4" /></button>
        </div>
      )}

      {testimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      t.isVerified ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {t.isVerified ? 'Verified' : 'Unverified'}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      t.isPublished ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {t.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-light-text dark:text-dark-text italic mb-4 leading-relaxed line-clamp-4">
                  "{t.quote}"
                </p>

                <div className="text-xs font-bold">{t.authorName}</div>
                <div className="text-[11px] text-light-muted dark:text-dark-muted">
                  {t.authorTitle} {t.company && `• ${t.company}`}
                </div>
              </div>

              <div className="pt-4 border-t border-light-border dark:border-dark-border flex justify-end gap-2 mt-4">
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="p-1.5 rounded hover:bg-light-bg dark:hover:bg-dark-secondary text-light-muted dark:text-dark-muted hover:text-accent"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(t._id, t.authorName)}
                  className="p-1.5 rounded hover:bg-rose-500/10 text-light-muted dark:text-dark-muted hover:text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 rounded-2xl border border-light-border dark:border-dark-border p-6 text-xs text-light-muted dark:text-dark-muted">
          No testimonials registered in database yet. Add client reviews once received and confirmed.
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-light-border dark:border-dark-border pb-3">
              <h3 className="text-base font-bold">{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-semibold mb-1">Author Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
                  />
                </div>
                <div>
                  <label className="block uppercase font-semibold mb-1">Title / Role</label>
                  <input
                    type="text"
                    value={formData.authorTitle}
                    onChange={(e) => setFormData({ ...formData, authorTitle: e.target.value })}
                    placeholder="e.g. Founder, Marketing Director"
                    className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
                  />
                </div>
              </div>
              <div>
                <label className="block uppercase font-semibold mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
                />
              </div>
              <div>
                <label className="block uppercase font-semibold mb-1">Testimonial Quote *</label>
                <textarea
                  rows="4"
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
                />
              </div>
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVerified}
                    onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                    className="accent-accent"
                  />
                  <span>Verified Genuine Client</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="accent-accent"
                  />
                  <span>Publish on Website</span>
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-light-border dark:border-dark-border">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-lg bg-accent text-white font-bold">Save Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

