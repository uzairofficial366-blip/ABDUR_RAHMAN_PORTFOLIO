import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { SeoHelmet } from '../components/common/SeoHelmet';
import { getPublicProjectBySlug, getPublicSettings } from '../services/api';
import { defaultProjects } from '../data/defaultProjects';
import { ArrowLeft, ExternalLink, Sparkles, CheckCircle2, Layers, Calendar, ChevronRight } from 'lucide-react';

export const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProject = async () => {
      try {
        const [projRes, settRes] = await Promise.all([
          getPublicProjectBySlug(slug),
          getPublicSettings().catch(() => ({ settings: {} })),
        ]);

        let foundProject = projRes?.project || null;

        if (!foundProject) {
          foundProject = defaultProjects.find((p) => p.slug === slug);
        }

        if (foundProject) {
          setProject(foundProject);
        } else {
          setNotFound(true);
        }
        if (settRes?.settings) setSettings(settRes.settings);
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center text-light-muted dark:text-dark-muted">
        Loading case study...
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex flex-col justify-between">
        <Navbar />
        <main className="max-w-xl mx-auto px-4 py-40 text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-light-text dark:text-dark-text">Project Not Found</h1>
          <p className="text-light-muted dark:text-dark-muted text-sm leading-relaxed">
            The project or case study you're looking for doesn't exist or is currently in draft mode.
          </p>
          <div className="pt-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-full text-sm font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Projects</span>
            </Link>
          </div>
        </main>
        <Footer settings={settings} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors flex flex-col justify-between">
      <SeoHelmet
        title={project.seoTitle || `${project.title} | Abdur Rahman Khan`}
        description={project.seoDescription || project.shortDescription}
      />

      <Navbar />

      <main className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        {/* Breadcrumb & Back */}
        <div className="flex items-center gap-2 text-xs text-light-muted dark:text-dark-muted mb-8">
          <Link to="/" className="hover:text-accent">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/projects" className="hover:text-accent">Projects</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-light-text dark:text-dark-text truncate">{project.title}</span>
        </div>

        {/* Notice for Sample Concept */}
        {project.isSamplePlaceholder && (
          <div className="mb-8 p-4 rounded-2xl bg-accent/10 border border-accent/20 flex items-start sm:items-center gap-3 text-xs text-accent">
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <strong>Demonstration Concept:</strong> This case study serves as an editable template showcasing layout, workflow, and objectives structure. Real client work can be managed via the admin portal.
            </div>
          </div>
        )}

        {/* Title and Meta Header */}
        <div className="space-y-4 mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-xs font-semibold text-accent">
            {project.category}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {project.title}
          </h1>
          <p className="text-lg text-light-muted dark:text-dark-muted max-w-3xl leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Cover Image */}
        <div className="relative rounded-3xl overflow-hidden aspect-[16/9] border border-light-border dark:border-dark-border mb-12 shadow-2xl bg-dark-secondary">
          <img
            src={project.coverImage || '/images/project-placeholder.svg'}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overview Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border mb-12">
          <div>
            <div className="text-xs uppercase font-semibold text-light-muted dark:text-dark-muted mb-1">Category</div>
            <div className="text-sm font-bold">{project.category}</div>
          </div>

          <div>
            <div className="text-xs uppercase font-semibold text-light-muted dark:text-dark-muted mb-1">Tools &amp; Stack</div>
            <div className="flex flex-wrap gap-1">
              {project.tools?.map((tool, idx) => (
                <span key={idx} className="text-xs px-2 py-0.5 rounded bg-light-bg dark:bg-dark-secondary font-medium">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase font-semibold text-light-muted dark:text-dark-muted mb-1">Live Preview</div>
            {project.externalUrl ? (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
              >
                <span>Visit Project URL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-xs text-light-muted dark:text-dark-muted">Design Prototype</span>
            )}
          </div>
        </div>

        {/* Case Study Content Sections */}
        <div className="space-y-12">
          {/* Detailed Description */}
          {project.fullDescription && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Project Overview</h2>
              <p className="text-light-muted dark:text-dark-muted leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {project.fullDescription}
              </p>
            </section>
          )}

          {/* Objectives */}
          {project.objectives && project.objectives.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Key Objectives &amp; Requirements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.objectives.map((obj, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-light-muted dark:text-dark-muted">{obj}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Design Process */}
          {project.process && project.process.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Design &amp; Execution Process</h2>
              <div className="space-y-3">
                {project.process.map((step, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent text-white font-bold text-xs flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </div>
                    <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed pt-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Solution */}
          {project.solution && (
            <section className="p-8 rounded-3xl bg-light-card dark:bg-dark-card border border-accent/30 space-y-3">
              <h2 className="text-2xl font-bold text-accent">Final Solution &amp; Impact</h2>
              <p className="text-light-muted dark:text-dark-muted leading-relaxed text-sm sm:text-base">
                {project.solution}
              </p>
            </section>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Visual Showcase</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.gallery.map((imgUrl, idx) => (
                  <div key={idx} className="rounded-2xl overflow-hidden border border-light-border dark:border-dark-border aspect-video bg-dark-secondary">
                    <img src={imgUrl} alt={`Showcase ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-16 pt-8 border-t border-light-border dark:border-dark-border flex justify-between items-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>

          <a
            href="/#contact"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-glow-orange"
          >
            <span>Start a Similar Project</span>
          </a>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
};

