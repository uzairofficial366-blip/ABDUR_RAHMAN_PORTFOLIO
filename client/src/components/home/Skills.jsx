import React, { useState } from 'react';
import { Sparkles, Layers, Palette, TrendingUp, Video, PenTool, Image, Search, Share2, Layout } from 'lucide-react';

const iconLookup = {
  Layout: Layout,
  Palette: Palette,
  Figma: Layers,
  Image: Image,
  PenTool: PenTool,
  Layers: Layers,
  TrendingUp: TrendingUp,
  Search: Search,
  Share2: Share2,
  Video: Video,
  Sparkles: Sparkles,
};

const defaultSkills = [
  { name: 'UI/UX Design', category: 'Design', icon: 'Layout' },
  { name: 'Graphic Design', category: 'Design', icon: 'Palette' },
  { name: 'Logo & Brand Design', category: 'Design', icon: 'Sparkles' },
  { name: 'Poster & Layout Design', category: 'Design', icon: 'Layers' },
  { name: 'Figma', category: 'Tools', icon: 'Figma' },
  { name: 'Adobe Photoshop', category: 'Tools', icon: 'Image' },
  { name: 'Adobe Illustrator', category: 'Tools', icon: 'PenTool' },
  { name: 'Canva', category: 'Tools', icon: 'Layers' },
  { name: 'Digital Marketing', category: 'Marketing & SEO', icon: 'TrendingUp' },
  { name: 'SEO', category: 'Marketing & SEO', icon: 'Search' },
  { name: 'Social Media Marketing', category: 'Marketing & SEO', icon: 'Share2' },
  { name: 'Video Editing', category: 'Media', icon: 'Video' },
];

export const Skills = ({ skills = [] }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Design', 'Tools', 'Marketing & SEO', 'Media'];

  const displaySkills = skills && skills.length > 0 ? skills : defaultSkills;

  const filteredSkills =
    activeCategory === 'All'
      ? displaySkills
      : displaySkills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="py-24 bg-light-secondary dark:bg-dark-secondary transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SKILLS &amp; TOOLS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-light-text dark:text-dark-text tracking-tight">
            Design Stack &amp; Digital Toolkit
          </h2>
          <p className="text-light-muted dark:text-dark-muted text-base sm:text-lg leading-relaxed">
            Proficiencies across interface design software, visual creation suites, digital marketing channels, and search engine optimization.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-accent text-white border-accent shadow-glow-orange scale-105'
                  : 'bg-light-card dark:bg-dark-card text-light-muted dark:text-dark-muted border-light-border dark:border-dark-border hover:border-accent hover:text-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredSkills.map((skill) => {
            const Icon = iconLookup[skill.icon] || Sparkles;

            return (
              <div
                key={skill._id || skill.name}
                className="group p-5 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-accent dark:hover:border-accent transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-3 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-light-text dark:text-dark-text group-hover:text-accent transition-colors">
                  {skill.name}
                </h3>
                <span className="text-[11px] text-light-muted dark:text-dark-muted mt-1">
                  {skill.category}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

