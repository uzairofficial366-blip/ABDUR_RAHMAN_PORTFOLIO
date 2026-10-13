import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`p-2 rounded-full transition-colors duration-200 border border-dark-border dark:border-dark-border dark:bg-dark-card dark:text-dark-text hover:border-accent dark:hover:border-accent text-light-text bg-light-card hover:text-accent dark:hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent ${className}`}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-accent transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 text-dark-bg transition-transform hover:-rotate-12" />
      )}
    </button>
  );
};

