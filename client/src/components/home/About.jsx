import React, { useState } from 'react';
import { Download, Sparkles, GraduationCap, Award, Compass, FileText, CheckCircle, Info } from 'lucide-react';

export const About = ({ settings = {} }) => {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  const handleCvClick = (e) => {
    if (!settings.isCvAvailable || !settings.cvUrl) {
      e.preventDefault();
      setCvModalOpen(true);
    }
  };

  return (
    <section id="about" className="py-24 bg-light-secondary dark:bg-dark-secondary transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-light-text dark:text-dark-text tracking-tight">
            Designing thoughtful digital experiences with purpose and precision.
          </h2>
          <p className="text-light-muted dark:text-dark-muted text-base sm:text-lg leading-relaxed">
            {settings.biography ||
              'Based in Peshawar, Pakistan, I specialize in building user-friendly UI/UX designs, memorable brand visual systems, and structured digital marketing and SEO solutions.'}
          </p>
        </div>

        {/* 4 Feature/Discipline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-accent dark:hover:border-accent transition-all duration-300">
            <div className="text-accent font-bold text-lg mb-2">01. UI/UX Design</div>
            <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed">
              Researching user journeys, structuring wireframes, and designing intuitive, responsive interfaces for mobile and web platforms.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-accent dark:hover:border-accent transition-all duration-300">
            <div className="text-accent font-bold text-lg mb-2">02. Graphic Design</div>
            <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed">
              Developing cohesive typography, brand visuals, vector graphics, and advertising assets tailored to client goals.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-accent dark:hover:border-accent transition-all duration-300">
            <div className="text-accent font-bold text-lg mb-2">03. Digital Marketing</div>
            <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed">
              Designing promotional campaigns, ad creative assets, and social media media formats to expand brand awareness.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-accent dark:hover:border-accent transition-all duration-300">
            <div className="text-accent font-bold text-lg mb-2">04. SEO Strategy</div>
            <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed">
              Implementing on-page meta structures, schema guidelines, and content keyword alignment for strong organic search visibility.
            </p>
          </div>
        </div>

        {/* Editable Information Fields (Transparently marked per prompt requirements) */}
        <div className="bg-light-card dark:bg-dark-card rounded-3xl p-8 sm:p-10 border border-light-border dark:border-dark-border shadow-xl">
          <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-6 flex items-center gap-2">
            <span>Professional Profile &amp; Focus</span>
            <span className="text-xs font-normal px-2.5 py-0.5 rounded-full bg-light-bg dark:bg-dark-secondary text-light-muted dark:text-dark-muted">
              Editable from Admin
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Experience */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                <CheckCircle className="w-4 h-4" />
                <span>Professional Experience</span>
              </div>
              <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed pl-6">
                {settings.experiencePlaceholder || '1–3 years of hands-on practice in digital design, interface prototyping, and visual brand identity.'}
              </p>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </div>
              <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed pl-6">
                {settings.educationPlaceholder || 'Formal educational degrees and academic background will be updated here.'}
              </p>
            </div>

            {/* Certifications */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                <Award className="w-4 h-4" />
                <span>Certifications</span>
              </div>
              <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed pl-6">
                {settings.certificationsPlaceholder || 'Verified design and SEO industry certifications will be listed here.'}
              </p>
            </div>

            {/* Career Goals */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                <Compass className="w-4 h-4" />
                <span>Career Goals</span>
              </div>
              <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed pl-6">
                {settings.careerGoalsPlaceholder || 'Collaborating with forward-thinking tech companies and creative agencies to craft high-impact user experiences.'}
              </p>
            </div>
          </div>

          {/* CV Action */}
          <div className="mt-10 pt-8 border-t border-light-border dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-light-muted dark:text-dark-muted text-center sm:text-left">
              Looking for a comprehensive resume or design portfolio PDF?
            </div>

            {settings.isCvAvailable && settings.cvUrl ? (
              <a
                href={settings.cvUrl}
                download
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-full font-semibold text-sm transition-all shadow-glow-orange"
              >
                <Download className="w-4 h-4" />
                <span>Download Official CV</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={handleCvClick}
                className="inline-flex items-center gap-2 bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:border-accent dark:hover:border-accent px-6 py-3 rounded-full font-semibold text-sm transition-all"
              >
                <FileText className="w-4 h-4 text-accent" />
                <span>Download CV (Coming Soon)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CV Placeholder Modal */}
      {cvModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border max-w-md w-full rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-accent">
              <Info className="w-6 h-6" />
              <h4 className="text-lg font-bold text-light-text dark:text-dark-text">CV Under Preparation</h4>
            </div>
            <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed">
              Abdur Rahman Khan's official CV document is currently being finalized and will be uploaded directly through the admin portal. In the meantime, you can get in touch via email or WhatsApp!
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCvModalOpen(false)}
                className="px-5 py-2 rounded-full bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

