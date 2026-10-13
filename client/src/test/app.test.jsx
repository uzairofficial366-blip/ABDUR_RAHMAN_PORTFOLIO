import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { Contact } from '../components/home/Contact';
import { ProjectCard } from '../components/common/ProjectCard';

// Test Theme Toggle
const TestThemeComponent = () => {
  const { theme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <ThemeToggle />
    </div>
  );
};

describe('Theme Context and Toggle', () => {
  it('defaults to dark mode and toggles to light mode', () => {
    render(
      <ThemeProvider>
        <TestThemeComponent />
      </ThemeProvider>
    );

    const themeDisplay = screen.getByTestId('theme-value');
    expect(themeDisplay.textContent).toBe('dark');

    const toggleButton = screen.getByRole('button', { name: /switch to light mode/i });
    fireEvent.click(toggleButton);

    expect(themeDisplay.textContent).toBe('light');
  });
});

describe('ProjectCard Component', () => {
  const sampleProject = {
    title: 'Website UI/UX Concept — Sample',
    slug: 'website-ui-ux-concept-sample',
    category: 'UI/UX Website Design',
    shortDescription: 'Modern dark theme design showcase.',
    tools: ['Figma', 'Photoshop'],
    coverImage: '/images/project-1.svg',
    isSamplePlaceholder: true,
  };

  it('renders project information and sample concept badge', () => {
    render(
      <MemoryRouter>
        <ProjectCard project={sampleProject} />
      </MemoryRouter>
    );

    expect(screen.getByText('Website UI/UX Concept — Sample')).toBeInTheDocument();
    expect(screen.getByText('UI/UX Website Design')).toBeInTheDocument();
    expect(screen.getByText(/Sample Concept/i)).toBeInTheDocument();
    expect(screen.getByText('Figma')).toBeInTheDocument();
  });
});

describe('Contact Form Validation', () => {
  it('validates empty inputs and alerts user before submission', async () => {
    render(<Contact settings={{}} />);

    const submitBtn = screen.getByRole('button', { name: /send project enquiry/i });
    fireEvent.click(submitBtn);

    // Form should prevent or alert
    expect(screen.getByLabelText(/your name/i)).toBeRequired();
    expect(screen.getByLabelText(/email address/i)).toBeRequired();
    expect(screen.getByLabelText(/project details/i)).toBeRequired();
  });
});

