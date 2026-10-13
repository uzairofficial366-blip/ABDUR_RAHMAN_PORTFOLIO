import React, { useState, useEffect } from 'react';
import { getAdminSettings, updateAdminSettings, uploadFile } from '../../services/api';
import { Save, Upload, X, Check, Loader2, Sparkles, FileText } from 'lucide-react';

export const AdminSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getAdminSettings();
        if (res.settings) setSettings(res.settings);
      } catch (err) {
        setAlert({ type: 'error', message: err.message });
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value },
    }));
  };

  const handleSeoChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      seoDefaults: { ...prev.seoDefaults, [name]: value },
    }));
  };

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await uploadFile(file);
      if (res.url) {
        setSettings((prev) => ({ ...prev, profileImage: res.url }));
        setAlert({ type: 'success', message: 'Profile photo uploaded! Remember to save changes.' });
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Image upload failed: ' + err.message });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCvUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCv(true);
    try {
      const res = await uploadFile(file);
      if (res.url) {
        setSettings((prev) => ({ ...prev, cvUrl: res.url, isCvAvailable: true }));
        setAlert({ type: 'success', message: 'CV document uploaded! Remember to save changes.' });
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'CV upload failed: ' + err.message });
    } finally {
      setUploadingCv(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateAdminSettings(settings);
      setAlert({ type: 'success', message: 'Portfolio settings successfully saved!' });
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-xs text-light-muted dark:text-dark-muted">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Website Settings &amp; Brand Profile</h1>
          <p className="text-xs text-light-muted dark:text-dark-muted mt-1">
            Configure confirmed bio details, profile picture, contact handles, and SEO defaults.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-glow-orange cursor-pointer disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {alert.message && (
        <div className={`p-4 rounded-xl text-xs flex items-center justify-between ${
          alert.type === 'error' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
        }`}>
          <span>{alert.message}</span>
          <button onClick={() => setAlert({ type: '', message: '' })}><X className="w-4 h-4" /></button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 text-xs">
        {/* Profile Image & Brand Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border space-y-6">
          <h2 className="text-base font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Profile Photo &amp; Visual Identity</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-accent shrink-0 bg-dark-secondary">
              <img
                src={settings.profileImage || '/images/profile.jpg'}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <div className="font-semibold text-sm">Replace Profile Photo</div>
              <p className="text-light-muted dark:text-dark-muted max-w-md">
                Upload a professional portrait or creative photo to be displayed in the hero section.
              </p>
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border hover:border-accent cursor-pointer font-bold">
                <Upload className="w-3.5 h-3.5 text-accent" />
                <span>{uploadingImage ? 'Uploading...' : 'Upload Image File'}</span>
                <input type="file" accept="image/*" onChange={handleProfileImageUpload} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Hero & Headlines */}
        <div className="p-6 sm:p-8 rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border space-y-4">
          <h2 className="text-base font-bold">Hero Section Content</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Brand Name</label>
              <input
                type="text"
                name="brandName"
                value={settings.brandName || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Professional Title</label>
              <input
                type="text"
                name="professionalTitle"
                value={settings.professionalTitle || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Main Hero Headline</label>
            <input
              type="text"
              name="heroHeadline"
              value={settings.heroHeadline || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
            />
          </div>

          <div>
            <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Hero Supporting Description</label>
            <textarea
              rows="3"
              name="heroDescription"
              value={settings.heroDescription || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
            />
          </div>
        </div>

        {/* Biography & Editable Placeholders */}
        <div className="p-6 sm:p-8 rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border space-y-4">
          <h2 className="text-base font-bold">About Section &amp; Background Information</h2>

          <div>
            <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Biography</label>
            <textarea
              rows="3"
              name="biography"
              value={settings.biography || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Professional Experience Text</label>
              <textarea
                rows="2"
                name="experiencePlaceholder"
                value={settings.experiencePlaceholder || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
              />
            </div>

            <div>
              <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Education Text</label>
              <textarea
                rows="2"
                name="educationPlaceholder"
                value={settings.educationPlaceholder || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
              />
            </div>

            <div>
              <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Certifications Text</label>
              <textarea
                rows="2"
                name="certificationsPlaceholder"
                value={settings.certificationsPlaceholder || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
              />
            </div>

            <div>
              <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Career Goals Text</label>
              <textarea
                rows="2"
                name="careerGoalsPlaceholder"
                value={settings.careerGoalsPlaceholder || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
              />
            </div>
          </div>

          {/* CV Document Upload */}
          <div className="pt-4 border-t border-light-border dark:border-dark-border">
            <div className="flex items-center justify-between mb-2">
              <label className="uppercase font-semibold text-light-muted dark:text-dark-muted">Official CV Document (PDF)</label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.isCvAvailable || false}
                  onChange={(e) => setSettings({ ...settings, isCvAvailable: e.target.checked })}
                  className="accent-accent"
                />
                <span>Enable CV Download for visitors</span>
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={settings.cvUrl || ''}
                onChange={(e) => setSettings({ ...settings, cvUrl: e.target.value })}
                placeholder="Upload PDF or paste document URL"
                className="flex-1 px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
              />
              <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border hover:border-accent cursor-pointer font-bold">
                <FileText className="w-3.5 h-3.5 text-accent" />
                <span>{uploadingCv ? 'Uploading...' : 'Upload PDF'}</span>
                <input type="file" accept=".pdf" onChange={handleCvUpload} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="p-6 sm:p-8 rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border space-y-4">
          <h2 className="text-base font-bold">Confirmed Contact Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={settings.contactEmail || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Phone Number</label>
              <input
                type="text"
                name="contactPhone"
                value={settings.contactPhone || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">WhatsApp Number</label>
              <input
                type="text"
                name="whatsappNumber"
                value={settings.whatsappNumber || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Location</label>
              <input
                type="text"
                name="location"
                value={settings.location || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links (Only populate when real URLs exist per prompt instructions) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border space-y-4">
          <h2 className="text-base font-bold">Social Media Profiles (Optional)</h2>
          <p className="text-light-muted dark:text-dark-muted">
            Leave blank if not yet registered. Social icons will only appear when genuine URLs are provided.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Behance URL</label>
              <input
                type="url"
                name="behance"
                value={settings.socialLinks?.behance || ''}
                onChange={handleSocialChange}
                placeholder="https://behance.net/..."
                className="w-full px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Dribbble URL</label>
              <input
                type="url"
                name="dribbble"
                value={settings.socialLinks?.dribbble || ''}
                onChange={handleSocialChange}
                placeholder="https://dribbble.com/..."
                className="w-full px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">LinkedIn URL</label>
              <input
                type="url"
                name="linkedin"
                value={settings.socialLinks?.linkedin || ''}
                onChange={handleSocialChange}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Instagram URL</label>
              <input
                type="url"
                name="instagram"
                value={settings.socialLinks?.instagram || ''}
                onChange={handleSocialChange}
                placeholder="https://instagram.com/..."
                className="w-full px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
              />
            </div>
          </div>
        </div>

        {/* SEO Defaults */}
        <div className="p-6 sm:p-8 rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border space-y-4">
          <h2 className="text-base font-bold">SEO &amp; Metadata Configuration</h2>

          <div>
            <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Default Meta Title</label>
            <input
              type="text"
              name="metaTitle"
              value={settings.seoDefaults?.metaTitle || ''}
              onChange={handleSeoChange}
              className="w-full px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
            />
          </div>

          <div>
            <label className="block uppercase font-semibold mb-1 text-light-muted dark:text-dark-muted">Default Meta Description</label>
            <textarea
              rows="2"
              name="metaDescription"
              value={settings.seoDefaults?.metaDescription || ''}
              onChange={handleSeoChange}
              className="w-full px-3 py-2 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-full text-xs font-semibold shadow-glow-orange cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save All Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};

