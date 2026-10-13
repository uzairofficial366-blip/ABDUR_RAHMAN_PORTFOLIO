import React, { useState, useEffect } from 'react';
import {
  getAdminProjects,
  createAdminProject,
  updateAdminProject,
  deleteAdminProject,
  uploadFile,
} from '../../services/api';
import {
  Plus,
  Edit2,
  Trash2,
  Upload,
  CheckCircle,
  X,
  ExternalLink,
  Loader2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const initialForm = {
    title: '',
    slug: '',
    category: 'Logo Designing',
    shortDescription: '',
    fullDescription: '',
    objectives: '',
    process: '',
    solution: '',
    tools: 'Figma, Adobe Photoshop',
    externalUrl: '',
    coverImage: '/images/project-placeholder.svg',
    featured: false,
    status: 'published',
    isSamplePlaceholder: false,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchProjects = async () => {
    try {
      const res = await getAdminProjects();
      if (res.projects) {
        setProjects(res.projects);
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Failed to load projects: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      category: project.category,
      shortDescription: project.shortDescription,
      fullDescription: project.fullDescription || '',
      objectives: project.objectives?.join('\n') || '',
      process: project.process?.join('\n') || '',
      solution: project.solution || '',
      tools: project.tools?.join(', ') || '',
      externalUrl: project.externalUrl || '',
      coverImage: project.coverImage || '/images/project-placeholder.svg',
      featured: project.featured || false,
      status: project.status || 'published',
      isSamplePlaceholder: project.isSamplePlaceholder || false,
    });
    setModalOpen(true);
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const update = { title };
    if (!editingProject) {
      update.slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
    setFormData((prev) => ({ ...prev, ...update }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await uploadFile(file);
      if (res.url) {
        setFormData((prev) => ({ ...prev, coverImage: res.url }));
        setAlert({ type: 'success', message: 'Cover image uploaded!' });
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Image upload failed: ' + err.message });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      objectives: formData.objectives.split('\n').map((s) => s.trim()).filter(Boolean),
      process: formData.process.split('\n').map((s) => s.trim()).filter(Boolean),
      tools: formData.tools.split(',').map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingProject) {
        await updateAdminProject(editingProject._id, payload);
        setAlert({ type: 'success', message: 'Project updated successfully!' });
      } else {
        await createAdminProject(payload);
        setAlert({ type: 'success', message: 'Project created successfully!' });
      }
      setModalOpen(false);
      await fetchProjects();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await deleteAdminProject(id);
      setAlert({ type: 'success', message: 'Project deleted successfully!' });
      await fetchProjects();
    } catch (err) {
      setAlert({ type: 'error', message: 'Delete failed: ' + err.message });
    }
  };

  const handleToggleStatus = async (project) => {
    const newStatus = project.status === 'published' ? 'draft' : 'published';
    try {
      await updateAdminProject(project._id, { status: newStatus });
      await fetchProjects();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Project Management</h1>
          <p className="text-xs text-light-muted dark:text-dark-muted mt-1">
            Manage your design case studies, concept templates, and portfolio entries.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-glow-orange cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Alert Banner */}
      {alert.message && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center justify-between ${
            alert.type === 'error'
              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
          }`}
        >
          <span>{alert.message}</span>
          <button onClick={() => setAlert({ type: '', message: '' })}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Projects Table */}
      <div className="bg-light-card dark:bg-dark-card rounded-2xl border border-light-border dark:border-dark-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-light-bg dark:bg-dark-secondary border-b border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border dark:divide-dark-border">
              {projects.map((proj) => (
                <tr key={proj._id} className="hover:bg-light-bg/50 dark:hover:bg-dark-secondary/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={proj.coverImage}
                        alt=""
                        className="w-10 h-8 rounded object-cover border border-light-border dark:border-dark-border"
                      />
                      <div>
                        <div className="font-bold text-light-text dark:text-dark-text">{proj.title}</div>
                        <div className="text-[11px] text-light-muted dark:text-dark-muted">/{proj.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{proj.category}</td>
                  <td className="py-3 px-4">
                    {proj.isSamplePlaceholder ? (
                      <span className="text-[10px] bg-accent/10 text-accent border border-accent/20 px-2 py-0.5 rounded-full">
                        Sample Concept
                      </span>
                    ) : (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        Real Project
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(proj)}
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full cursor-pointer ${
                        proj.status === 'published'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {proj.status}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    {proj.featured ? (
                      <span className="text-accent font-bold">Yes</span>
                    ) : (
                      <span className="text-light-muted dark:text-dark-muted">No</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 rounded-lg hover:bg-light-bg dark:hover:bg-dark-secondary text-light-muted dark:text-dark-muted hover:text-accent"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj._id, proj.title)}
                        className="p-1.5 rounded-lg hover:bg-rose-500/10 text-light-muted dark:text-dark-muted hover:text-rose-400"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border w-full max-w-2xl rounded-3xl p-6 sm:p-8 my-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-light-border dark:border-dark-border pb-4">
              <h3 className="text-lg font-bold">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h3>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                  />
                </div>

                <div>
                  <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
                    className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                  >
                    <option value="Logo Designing">Logo Designing</option>
                    <option value="Poster Designing">Poster Designing</option>
                    <option value="Website Images">Website Images</option>
                    <option value="Image Editing">Image Editing</option>
                    <option value="Marketing Designing">Marketing Designing</option>
                    <option value="UI/UX Website Design">UI/UX Website Design</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Tools Used (comma separated)</label>
                  <input
                    type="text"
                    value={formData.tools}
                    onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                    placeholder="Figma, Adobe Photoshop, Illustrator"
                    className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                  />
                </div>
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Cover Image</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border hover:border-accent cursor-pointer text-xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Short Description *</label>
                <textarea
                  rows="2"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Full Case Study Overview</label>
                <textarea
                  rows="3"
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Objectives (One per line)</label>
                <textarea
                  rows="2"
                  value={formData.objectives}
                  onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Design Process Steps (One per line)</label>
                <textarea
                  rows="2"
                  value={formData.process}
                  onChange={(e) => setFormData({ ...formData, process: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Final Solution &amp; Outcome</label>
                <textarea
                  rows="2"
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="accent-accent"
                  />
                  <span>Featured on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isSamplePlaceholder}
                    onChange={(e) => setFormData({ ...formData, isSamplePlaceholder: e.target.checked })}
                    className="accent-accent"
                  />
                  <span>Mark as Sample Concept Placeholder</span>
                </label>

                <div className="flex items-center gap-2">
                  <span>Status:</span>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="px-2 py-1 rounded bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-light-border dark:border-dark-border">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-light-border dark:border-dark-border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || uploadingImage}
                  className="px-6 py-2 rounded-xl bg-accent text-white font-bold hover:bg-accent-hover shadow-glow-orange cursor-pointer"
                >
                  {loading ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

