import React, { useState, useEffect } from 'react';
import {
  getAdminSkills,
  createAdminSkill,
  updateAdminSkill,
  deleteAdminSkill,
} from '../../services/api';
import { Plus, Edit2, Trash2, X, Sparkles } from 'lucide-react';

export const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const initialForm = {
    name: '',
    category: 'Design',
    icon: 'Sparkles',
    displayOrder: 1,
    isPublished: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchSkills = async () => {
    try {
      const res = await getAdminSkills();
      if (res.skills) setSkills(res.skills);
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenCreate = () => {
    setEditingSkill(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (sk) => {
    setEditingSkill(sk);
    setFormData({
      name: sk.name,
      category: sk.category,
      icon: sk.icon || 'Sparkles',
      displayOrder: sk.displayOrder || 1,
      isPublished: sk.isPublished ?? true,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingSkill) {
        await updateAdminSkill(editingSkill._id, formData);
        setAlert({ type: 'success', message: 'Skill updated!' });
      } else {
        await createAdminSkill(formData);
        setAlert({ type: 'success', message: 'Skill created!' });
      }
      setModalOpen(false);
      await fetchSkills();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete skill "${name}"?`)) return;
    try {
      await deleteAdminSkill(id);
      setAlert({ type: 'success', message: 'Skill deleted.' });
      await fetchSkills();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Skills &amp; Tools Management</h1>
          <p className="text-xs text-light-muted dark:text-dark-muted mt-1">
            Manage your design software, marketing competencies, and category groups.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-glow-orange cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skills.map((sk) => (
          <div
            key={sk._id}
            className="p-5 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border flex flex-col justify-between items-center text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-xs">{sk.name}</h3>
            <span className="text-[10px] text-light-muted dark:text-dark-muted mb-4">{sk.category}</span>
            <div className="flex items-center gap-2 pt-2 border-t border-light-border dark:border-dark-border w-full justify-center">
              <button
                onClick={() => handleOpenEdit(sk)}
                className="p-1 text-light-muted dark:text-dark-muted hover:text-accent"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(sk._id, sk.name)}
                className="p-1 text-light-muted dark:text-dark-muted hover:text-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-light-border dark:border-dark-border pb-3">
              <h3 className="text-base font-bold">{editingSkill ? 'Edit Skill' : 'Add Skill'}</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase font-semibold mb-1">Skill / Tool Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Figma, Adobe Photoshop"
                  className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
                />
              </div>
              <div>
                <label className="block uppercase font-semibold mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
                >
                  <option value="Design">Design</option>
                  <option value="Tools">Tools</option>
                  <option value="Marketing & SEO">Marketing &amp; SEO</option>
                  <option value="Media">Media</option>
                </select>
              </div>
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

