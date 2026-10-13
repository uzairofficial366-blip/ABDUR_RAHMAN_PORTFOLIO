import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactForm } from '../../services/api';

export const Contact = ({ settings = {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Logo Designing',
    budget: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    message: '',
    error: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.error) {
      setStatus((prev) => ({ ...prev, error: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus({ submitting: false, success: false, message: '', error: 'Please enter your full name.' });
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setStatus({ submitting: false, success: false, message: '', error: 'Please enter a valid email address.' });
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus({ submitting: false, success: false, message: '', error: 'Message should be at least 10 characters long.' });
      return;
    }

    setStatus({ submitting: true, success: false, message: '', error: '' });

    try {
      const response = await submitContactForm(formData);
      if (response.success) {
        setStatus({
          submitting: false,
          success: true,
          message: response.message || 'Thank you! Your message has been sent successfully.',
          error: '',
        });
        setFormData({
          name: '',
          email: '',
          projectType: 'UI/UX Design',
          budget: '',
          message: '',
        });
      }
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        message: '',
        error: err.message || 'Failed to submit enquiry. Please try again or reach out directly via WhatsApp.',
      });
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold tracking-wider uppercase">
                <span>GET IN TOUCH</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-light-text dark:text-dark-text tracking-tight">
                Have a project in mind? Let's create something meaningful.
              </h2>
              <p className="text-light-muted dark:text-dark-muted text-base leading-relaxed">
                Whether you need a full product UI/UX design, visual branding, or targeted digital marketing and SEO solutions, feel free to drop a message.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <a
                href={`mailto:${settings.contactEmail || 'abdurrahman94700@gmail.com'}`}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-accent dark:hover:border-accent transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-light-muted dark:text-dark-muted font-medium">Send an Email</div>
                  <div className="text-sm font-bold text-light-text dark:text-dark-text group-hover:text-accent transition-colors">
                    {settings.contactEmail || 'abdurrahman94700@gmail.com'}
                  </div>
                </div>
              </a>

              <a
                href={`https://wa.me/${(settings.whatsappNumber || '923139470097').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-accent dark:hover:border-accent transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-light-muted dark:text-dark-muted font-medium">Chat on WhatsApp</div>
                  <div className="text-sm font-bold text-light-text dark:text-dark-text group-hover:text-accent transition-colors">
                    {settings.whatsappNumber || '+923139470097'}
                  </div>
                </div>
              </a>

              <a
                href={`tel:${settings.contactPhone || '+923139470097'}`}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-accent dark:hover:border-accent transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-light-muted dark:text-dark-muted font-medium">Direct Call</div>
                  <div className="text-sm font-bold text-light-text dark:text-dark-text group-hover:text-accent transition-colors">
                    {settings.contactPhone || '+923139470097'}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-light-muted dark:text-dark-muted font-medium">Location</div>
                  <div className="text-sm font-bold text-light-text dark:text-dark-text">
                    {settings.location || 'Peshawar, Pakistan'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-xl">
              <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">
                Send a Message
              </h3>

              {status.success && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>{status.message}</span>
                </div>
              )}

              {status.error && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-3 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{status.error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-2 uppercase tracking-wider">
                      Your Name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:outline-none focus:border-accent dark:focus:border-accent text-sm transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-2 uppercase tracking-wider">
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. john@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:outline-none focus:border-accent dark:focus:border-accent text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Project Type */}
                  <div>
                    <label htmlFor="projectType" className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-2 uppercase tracking-wider">
                      Service / Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:outline-none focus:border-accent dark:focus:border-accent text-sm transition-colors"
                    >
                      <option value="Logo Designing">Logo Designing</option>
                      <option value="Poster Designing">Poster Designing</option>
                      <option value="Website Images">Website Images</option>
                      <option value="Image Editing">Image Editing</option>
                      <option value="Marketing Designing">Marketing Designing</option>
                      <option value="Other">Other / Custom</option>
                    </select>
                  </div>

                  {/* Budget (Optional) */}
                  <div>
                    <label htmlFor="budget" className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-2 uppercase tracking-wider">
                      Estimated Budget (Optional)
                    </label>
                    <input
                      type="text"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="e.g. $500 - $1,500 / Negotiable"
                      className="w-full px-4 py-3 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:outline-none focus:border-accent dark:focus:border-accent text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-2 uppercase tracking-wider">
                    Project Details &amp; Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your goals, timelines, and any design or marketing requirements..."
                    className="w-full px-4 py-3 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:outline-none focus:border-accent dark:focus:border-accent text-sm transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-60 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all duration-200 shadow-glow-orange hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {status.submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Project Enquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

