import React from 'react';
import { ArrowUpRight, Sparkles, MapPin, Briefcase, CheckCircle2 } from 'lucide-react';

export const Hero = ({ settings = {} }) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Background Subtle Orange Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Intro */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{settings.professionalTitle || 'UI/UX DESIGNER & GRAPHIC DESIGNER'}</span>
            </div>

            {/* Client Name */}
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-light-muted dark:text-dark-muted">
              Hello, I'm <span className="text-light-text dark:text-dark-text">{settings.brandName || 'Abdur Rahman Khan'}</span>
            </h2>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-light-text dark:text-dark-text leading-[1.15]">
              Designing meaningful{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#FF763D]">
                digital experiences
              </span>{' '}
              through creativity and strategy.
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-light-muted dark:text-dark-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {settings.heroDescription ||
                'Creating user-centered UI/UX interfaces, impactful graphic visual systems, and structured digital marketing & SEO strategies tailored for growing businesses.'}
            </p>

            {/* Service Tags Quick Glance */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-1">
              {['UI/UX Design', 'Graphic Design', 'Digital Marketing', 'SEO Strategy'].map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 rounded-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-text font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 shadow-glow-orange hover:scale-105 active:scale-95"
              >
                <span>View My Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-accent dark:hover:border-accent text-light-text dark:text-dark-text px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <span>Let's Talk</span>
              </a>
            </div>

            {/* Fast Stats / Verified Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-light-border dark:border-dark-border max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-light-text dark:text-dark-text">1–3 Years</div>
                  <div className="text-xs text-light-muted dark:text-dark-muted">Experience Level</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-light-text dark:text-dark-text">Peshawar</div>
                  <div className="text-xs text-light-muted dark:text-dark-muted">Pakistan</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-light-text dark:text-dark-text">Available</div>
                  <div className="text-xs text-light-muted dark:text-dark-muted">For Projects</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual / Profile Section */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px]">
              {/* Outer decorative glowing ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-accent/50 to-transparent blur-lg opacity-40 group-hover:opacity-100 transition duration-1000 -z-10" />

              {/* Main Image Card */}
              <div className="relative rounded-3xl p-3 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-2xl">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-dark-secondary">
                  <img
                    src={settings.profileImage || '/images/profile.jpeg'}
                    alt="Abdur Rahman Khan - UI/UX Designer & Graphic Designer"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/profile.jpeg';
                    }}
                  />
                  {/* Subtle inner dark vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent opacity-50" />
                </div>

                {/* Floating Info Pill Bottom Left */}
                <div className="absolute bottom-6 left-6 right-6 bg-dark-bg/90 backdrop-blur-md border border-dark-border rounded-xl p-3 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <div>
                      <div className="text-xs font-semibold text-white">Creative Designer</div>
                      <div className="text-[11px] text-gray-400">UI/UX • Branding • SEO</div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-accent/20 text-accent border border-accent/30">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

