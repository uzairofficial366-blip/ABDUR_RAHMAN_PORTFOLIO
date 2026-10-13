import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', href: '/#hero' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/projects' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-bg/90 dark:bg-dark-bg/90 bg-light-bg/90 backdrop-blur-md border-b border-dark-border dark:border-dark-border border-light-border py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xl font-bold tracking-tight text-light-text dark:text-dark-text group focus:outline-none focus:ring-2 focus:ring-accent rounded-md p-1"
          >
            <span>Abdur Rahman</span>
            <span className="text-accent">Khan</span>          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-light-muted dark:text-dark-muted hover:text-accent dark:hover:text-accent transition-colors duration-150 px-2 py-1 rounded-md"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions: Theme Toggle & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 shadow-glow-orange hover:scale-105 active:scale-95"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg text-light-text dark:text-dark-text hover:text-accent dark:hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-dark-border dark:border-dark-border border-light-border bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur-xl px-4 pt-3 pb-6 transition-all duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-light-text dark:text-dark-text hover:text-accent dark:hover:text-accent text-base font-medium py-2 px-3 rounded-lg hover:bg-accent/10 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-hover text-white py-3 rounded-full font-semibold text-sm transition-all shadow-glow-orange"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

