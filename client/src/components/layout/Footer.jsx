import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, MessageCircle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = ({ settings = {} }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-secondary dark:bg-dark-secondary border-t border-light-border dark:border-dark-border text-light-text dark:text-dark-text pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-light-border dark:border-dark-border">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-1.5 text-2xl font-bold tracking-tight">
              <span>{settings.brandName || 'Abdur Rahman Khan'}</span>
              <span className="w-2 h-2 rounded-full bg-accent inline-block" />
            </Link>
            <p className="text-light-muted dark:text-dark-muted text-sm max-w-md leading-relaxed">
              {settings.professionalTitle || 'UI/UX Designer & Graphic Designer'} specializing in user-centered digital interfaces, cohesive visual branding, digital marketing, and SEO strategies based in {settings.location || 'Peshawar, Pakistan'}.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={`mailto:${settings.contactEmail || 'abdurrahman94700@gmail.com'}`}
                className="inline-flex items-center gap-2 text-xs font-medium text-light-muted dark:text-dark-muted hover:text-accent dark:hover:text-accent transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-accent" />
                <span>{settings.contactEmail || 'abdurrahman94700@gmail.com'}</span>
              </a>
              <a
                href={`tel:${settings.contactPhone || '+923139470097'}`}
                className="inline-flex items-center gap-2 text-xs font-medium text-light-muted dark:text-dark-muted hover:text-accent dark:hover:text-accent transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-accent" />
                <span>{settings.contactPhone || '+923139470097'}</span>
              </a>
              <a
                href={`https://wa.me/${(settings.whatsappNumber || '923139470097').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-light-muted dark:text-dark-muted hover:text-accent dark:hover:text-accent transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-accent" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-light-text dark:text-dark-text mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/#about" className="text-light-muted dark:text-dark-muted hover:text-accent dark:hover:text-accent transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="/#services" className="text-light-muted dark:text-dark-muted hover:text-accent dark:hover:text-accent transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/#skills" className="text-light-muted dark:text-dark-muted hover:text-accent dark:hover:text-accent transition-colors">
                  Skills &amp; Tools
                </a>
              </li>
              <li>
                <Link to="/projects" className="text-light-muted dark:text-dark-muted hover:text-accent dark:hover:text-accent transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <a href="/#contact" className="text-light-muted dark:text-dark-muted hover:text-accent dark:hover:text-accent transition-colors">
                  Get in Touch
                </a>
              </li>
            </ul>
          </div>

          {/* Services Offered */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-light-text dark:text-dark-text mb-4">
              Core Offerings
            </h3>
            <ul className="space-y-2.5 text-sm text-light-muted dark:text-dark-muted">
              <li>Logo Designing</li>
              <li>Poster Designing</li>
              <li>Website Images</li>
              <li>Image Editing</li>
              <li>Marketing Designing</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-light-muted dark:text-dark-muted">
          <div>
            &copy; {currentYear} {settings.brandName || 'Abdur Rahman Khan'}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 hover:text-accent dark:hover:text-accent transition-colors"
              title="Admin Portal"
            >
              <Lock className="w-3.5 h-3.5 text-accent" />
              <span>Admin Portal</span>
            </Link>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-accent dark:hover:text-accent transition-colors"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

