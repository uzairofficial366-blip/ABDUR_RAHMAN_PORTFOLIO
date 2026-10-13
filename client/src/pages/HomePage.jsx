import React, { useState, useEffect } from 'react';
import { SeoHelmet } from '../components/common/SeoHelmet';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/home/Hero';
import { About } from '../components/home/About';
import { Services } from '../components/home/Services';
import { Skills } from '../components/home/Skills';
import { Projects } from '../components/home/Projects';
import { Testimonials } from '../components/home/Testimonials';
import { Contact } from '../components/home/Contact';
import {
  getPublicSettings,
  getPublicServices,
  getPublicSkills,
  getPublicProjects,
  getPublicTestimonials,
} from '../services/api';

export const HomePage = () => {
  const [settings, setSettings] = useState({});
  const [services, setServices] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settRes, servRes, skillRes, projRes, testRes] = await Promise.all([
          getPublicSettings().catch(() => ({ settings: {} })),
          getPublicServices().catch(() => ({ services: [] })),
          getPublicSkills().catch(() => ({ skills: [] })),
          getPublicProjects().catch(() => ({ projects: [] })),
          getPublicTestimonials().catch(() => ({ testimonials: [] })),
        ]);

        if (settRes.settings) setSettings(settRes.settings);
        if (servRes.services) setServices(servRes.services);
        if (skillRes.skills) setSkills(skillRes.skills);
        if (projRes.projects) setProjects(projRes.projects);
        if (testRes.testimonials) setTestimonials(testRes.testimonials);
      } catch (err) {
        console.error('Failed to load portfolio content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // JSON-LD Structured Data Schema for Search Engines
  const personStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: settings.brandName || 'Abdur Rahman Khan',
    jobTitle: settings.professionalTitle || 'UI/UX Designer & Graphic Designer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Peshawar',
      addressCountry: 'Pakistan',
    },
    email: settings.contactEmail || 'abdurrahman94700@gmail.com',
    telephone: settings.contactPhone || '+923139470097',
    knowsAbout: [
      'UI/UX Design',
      'Graphic Design',
      'Digital Marketing',
      'Search Engine Optimization',
      'Figma',
      'Adobe Photoshop',
      'Adobe Illustrator'
    ],
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors">
      <SeoHelmet
        title={`${settings.brandName || 'Abdur Rahman Khan'} | ${settings.professionalTitle || 'UI/UX Designer & Graphic Designer'}`}
        description={settings.heroDescription || 'Portfolio of Abdur Rahman Khan, UI/UX Designer & Graphic Designer offering digital marketing and SEO services in Peshawar, Pakistan.'}
        structuredData={personStructuredData}
      />

      <Navbar />

      <main>
        <Hero settings={settings} />
        <About settings={settings} />
        <Services services={services} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Testimonials testimonials={testimonials} />
        <Contact settings={settings} />
      </main>

      <Footer settings={settings} />
    </div>
  );
};

