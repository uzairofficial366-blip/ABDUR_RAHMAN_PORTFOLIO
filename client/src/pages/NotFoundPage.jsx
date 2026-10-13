import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text flex flex-col justify-between">
      <Navbar />
      <main className="max-w-md mx-auto px-4 py-44 text-center space-y-4">
        <div className="text-7xl font-extrabold text-accent">404</div>
        <h1 className="text-2xl font-bold">Page Not Found</h1>
        <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed">
          The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-glow-orange"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

