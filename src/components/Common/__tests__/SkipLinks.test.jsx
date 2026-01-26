/**
 * Tests for SkipLinks Component
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkipLinks from '../SkipLinks';

describe('SkipLinks Component', () => {
  it('should render skip to main content link', () => {
    render(<SkipLinks />);
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('should render skip to navigation link', () => {
    render(<SkipLinks />);
    const skipLink = screen.getByText('Skip to navigation');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-navigation');
  });

  it('should have sr-only class by default', () => {
    render(<SkipLinks />);
    const skipLinks = screen.getAllByRole('link');
    skipLinks.forEach(link => {
      expect(link.className).toContain('sr-only');
    });
  });

  it('should have focus styles', () => {
    render(<SkipLinks />);
    const skipLinks = screen.getAllByRole('link');
    skipLinks.forEach(link => {
      expect(link.className).toContain('focus:not-sr-only');
      expect(link.className).toContain('focus:absolute');
      expect(link.className).toContain('focus:bg-blue-600');
      expect(link.className).toContain('focus:text-white');
    });
  });

  it('should have proper accessibility attributes', () => {
    render(<SkipLinks />);
    const skipLinks = screen.getAllByRole('link');
    skipLinks.forEach(link => {
      expect(link).toHaveAttribute('href');
      expect(link.getAttribute('href')).toMatch(/^#/);
    });
  });
});
