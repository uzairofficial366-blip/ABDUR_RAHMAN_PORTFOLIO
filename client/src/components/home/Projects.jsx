import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectCard } from '../common/ProjectCard';
import { defaultProjects } from '../../data/defaultProjects';

export const Projects = ({ projects = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Logo Designing',
    'Poster Designing',
    'Website Images',
    'Image Editing',
    'Marketing Designing',
    'UI/UX Website Design',
  ];

  const activeProjectsList = projects && projects.length > 0 ? projects : defaultProjects;

  const filteredProjects =
    selectedCategory === 'All'
      ? activeProjectsList
      : activeProjectsList.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FEATURED PROJECTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-light-text dark:text-dark-text tracking-tight">
              Selected Work &amp; Concepts
            </h2>
            <p className="text-light-muted dark:text-dark-muted text-base leading-relaxed">
              Explore design demonstrations across custom logos, event posters, web images, professional photo editing, marketing carousels, and UI/UX layouts.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover self-start md:self-auto group"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2">
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

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id || project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-light-card dark:bg-dark-card rounded-2xl border border-light-border dark:border-dark-border p-8">
            <p className="text-light-muted dark:text-dark-muted text-sm">
              No projects found in this category. More case studies will be uploaded soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
