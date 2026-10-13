import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ProjectCard } from '../components/common/ProjectCard';
import { SeoHelmet } from '../components/common/SeoHelmet';
import { getPublicProjects, getPublicSettings } from '../services/api';
import { defaultProjects } from '../data/defaultProjects';
import { Search, Sparkles } from 'lucide-react';

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const [projRes, settRes] = await Promise.all([
          getPublicProjects().catch(() => ({ projects: [] })),
          getPublicSettings().catch(() => ({ settings: {} })),
        ]);
        if (projRes?.projects && projRes.projects.length > 0) {
          setProjects(projRes.projects);
        } else {
          setProjects(defaultProjects);
        }
        if (settRes?.settings) setSettings(settRes.settings);
      } catch (err) {
        console.error('Failed to load projects:', err);
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = [
    'All',
    'Logo Designing',
    'Poster Designing',
    'Website Images',
    'Image Editing',
    'Marketing Designing',
    'UI/UX Website Design',
  ];

  const activeProjects = projects && projects.length > 0 ? projects : defaultProjects;

  const filtered = activeProjects.filter((project) => {
    const matchesCat = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors flex flex-col justify-between">
      <SeoHelmet
        title="Portfolio Projects & Concepts | Abdur Rahman Khan"
        description="Browse UI/UX design case studies, mobile prototypes, graphic design, and SEO projects by Abdur Rahman Khan."
      />

      <Navbar />

      <main className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Selected Work &amp; Case Studies
          </h1>
          <p className="text-light-muted dark:text-dark-muted text-base sm:text-lg leading-relaxed">
            A comprehensive catalog of design demonstrations, user-centered interface layouts, visual identities, and technical SEO frameworks.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-accent text-white border-accent shadow-glow-orange scale-105'
                    : 'bg-light-card dark:bg-dark-card text-light-muted dark:text-dark-muted border-light-border dark:border-dark-border hover:border-accent hover:text-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-light-muted dark:text-dark-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-sm text-light-text dark:text-dark-text focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-20 text-light-muted dark:text-dark-muted">
            Loading projects...
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => (
              <ProjectCard key={project._id || project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-light-card dark:bg-dark-card rounded-3xl border border-light-border dark:border-dark-border p-8">
            <h3 className="text-lg font-bold mb-2">No Matching Projects Found</h3>
            <p className="text-sm text-light-muted dark:text-dark-muted">
              Try adjusting your search criteria or selecting a different category.
            </p>
          </div>
        )}
      </main>

      <Footer settings={settings} />
    </div>
  );
};

