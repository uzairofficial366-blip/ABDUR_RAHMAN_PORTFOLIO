import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const ProjectCard = ({ project }) => {
  return (
    <article className="group relative rounded-2xl overflow-hidden bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-accent dark:hover:border-accent transition-all duration-300 hover:shadow-card-dark flex flex-col h-full">
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-dark-secondary">
        <img
          src={project.coverImage || '/images/project-placeholder.svg'}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/project-placeholder.svg';
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="inline-block bg-dark-bg/80 backdrop-blur-md border border-dark-border text-white text-xs px-2.5 py-1 rounded-full font-medium">
            {project.category}
          </span>

          {project.isSamplePlaceholder && (
            <span className="inline-flex items-center gap-1 bg-accent/90 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span>Sample Concept</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text group-hover:text-accent transition-colors line-clamp-1">
              {project.title}
            </h3>
            <div className="w-8 h-8 rounded-full border border-light-border dark:border-dark-border flex items-center justify-center text-light-muted dark:text-dark-muted group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all duration-200 shrink-0">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <p className="text-light-muted dark:text-dark-muted text-sm line-clamp-2 mb-4 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        <div>
          {/* Tools Tags */}
          {project.tools && project.tools.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-light-border dark:border-dark-border">
              {project.tools.slice(0, 3).map((tool, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 rounded-md bg-light-bg dark:bg-dark-secondary text-light-muted dark:text-dark-muted font-medium"
                >
                  {tool}
                </span>
              ))}
              {project.tools.length > 3 && (
                <span className="text-xs px-1.5 py-0.5 rounded-md bg-light-bg dark:bg-dark-secondary text-light-muted dark:text-dark-muted">
                  +{project.tools.length - 3}
                </span>
              )}
            </div>
          )}

          <Link
            to={`/projects/${project.slug}`}
            className="absolute inset-0 z-10"
            aria-label={`View details of ${project.title}`}
          >
            <span className="sr-only">View Case Study</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

