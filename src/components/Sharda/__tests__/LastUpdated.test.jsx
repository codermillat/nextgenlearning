import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import LastUpdated from '../LastUpdated';

describe('LastUpdated Component', () => {
  describe('Rendering', () => {
    it('renders with date and admission cycle', () => {
      render(<LastUpdated date="2026-01-15" admissionCycle="2026-27" />);
      
      expect(screen.getByText(/Last Updated:/)).toBeInTheDocument();
      expect(screen.getByText(/January 15, 2026/)).toBeInTheDocument();
      expect(screen.getByText(/Admission Cycle:/)).toBeInTheDocument();
      expect(screen.getByText(/2026-27/)).toBeInTheDocument();
    });

    it('renders with only date when showAdmissionCycle is false', () => {
      render(
        <LastUpdated 
          date="2026-01-15" 
          showAdmissionCycle={false} 
        />
      );
      
      expect(screen.getByText(/Last Updated:/)).toBeInTheDocument();
      expect(screen.getByText(/January 15, 2026/)).toBeInTheDocument();
      expect(screen.queryByText(/Admission Cycle:/)).not.toBeInTheDocument();
    });

    it('renders with auto-calculated admission cycle', () => {
      // Mock date to January 2026
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-01-15'));
      
      render(<LastUpdated date="2026-01-15" />);
      
      expect(screen.getByText(/2026-27/)).toBeInTheDocument();
      
      vi.useRealTimers();
    });

    it('calculates admission cycle correctly for July-December', () => {
      // Mock date to August 2026
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-08-15'));
      
      // Pass a date in August to trigger July-Dec calculation
      render(<LastUpdated date="2026-08-15" />);
      
      expect(screen.getByText(/2027-28/)).toBeInTheDocument();
      
      vi.useRealTimers();
    });

    it('returns null when no date and showAdmissionCycle is false', () => {
      const { container } = render(
        <LastUpdated showAdmissionCycle={false} />
      );
      
      expect(container.firstChild).toBeNull();
    });

    it('renders admission cycle even without date', () => {
      render(<LastUpdated showAdmissionCycle={true} />);
      
      expect(screen.getByText(/Admission Cycle:/)).toBeInTheDocument();
    });
  });

  describe('Date Formatting', () => {
    it('formats Date object correctly', () => {
      const date = new Date('2026-01-15T10:30:00Z');
      render(<LastUpdated date={date} />);
      
      expect(screen.getByText(/January 15, 2026/)).toBeInTheDocument();
    });

    it('formats ISO string correctly', () => {
      render(<LastUpdated date="2026-01-15T10:30:00Z" />);
      
      expect(screen.getByText(/January 15, 2026/)).toBeInTheDocument();
    });

    it('formats date string correctly', () => {
      render(<LastUpdated date="2026-01-15" />);
      
      expect(screen.getByText(/January 15, 2026/)).toBeInTheDocument();
    });

    it('handles invalid date gracefully', () => {
      const { container } = render(
        <LastUpdated date="invalid-date" showAdmissionCycle={false} />
      );
      
      expect(container.firstChild).toBeNull();
    });

    it('formats different months correctly', () => {
      render(<LastUpdated date="2026-12-25" />);
      
      expect(screen.getByText(/December 25, 2026/)).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant with correct styles', () => {
      render(<LastUpdated date="2026-01-15" variant="default" />);
      
      const container = screen.getByTestId('last-updated');
      expect(container).toHaveClass('bg-blue-50', 'border', 'border-blue-200', 'rounded-lg', 'p-4');
    });

    it('renders compact variant with correct styles', () => {
      render(<LastUpdated date="2026-01-15" variant="compact" />);
      
      const container = screen.getByTestId('last-updated');
      expect(container).toHaveClass('bg-gray-50', 'border-l-4', 'border-blue-500');
    });

    it('renders inline variant with correct styles', () => {
      render(<LastUpdated date="2026-01-15" variant="inline" />);
      
      const container = screen.getByTestId('last-updated');
      expect(container).toHaveClass('inline-flex', 'items-center', 'gap-2');
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', () => {
      render(
        <LastUpdated 
          date="2026-01-15" 
          className="custom-class" 
        />
      );
      
      const container = screen.getByTestId('last-updated');
      expect(container).toHaveClass('custom-class');
    });

    it('uses custom admission cycle', () => {
      render(
        <LastUpdated 
          date="2026-01-15" 
          admissionCycle="2025-26" 
        />
      );
      
      expect(screen.getByText(/2025-26/)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has contentinfo role', () => {
      render(<LastUpdated date="2026-01-15" />);
      
      const container = screen.getByTestId('last-updated');
      expect(container).toHaveAttribute('role', 'contentinfo');
    });

    it('has aria-label', () => {
      render(<LastUpdated date="2026-01-15" />);
      
      const container = screen.getByTestId('last-updated');
      expect(container).toHaveAttribute('aria-label', 'Content freshness information');
    });

    it('uses time element with datetime attribute', () => {
      render(<LastUpdated date="2026-01-15" />);
      
      const timeElement = screen.getByText(/January 15, 2026/).closest('time');
      expect(timeElement).toHaveAttribute('datetime', '2026-01-15');
    });

    it('marks icons as aria-hidden', () => {
      const { container } = render(<LastUpdated date="2026-01-15" />);
      
      const icons = container.querySelectorAll('svg');
      icons.forEach(icon => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles null date', () => {
      const { container } = render(
        <LastUpdated date={null} showAdmissionCycle={false} />
      );
      
      expect(container.firstChild).toBeNull();
    });

    it('handles undefined date', () => {
      const { container } = render(
        <LastUpdated date={undefined} showAdmissionCycle={false} />
      );
      
      expect(container.firstChild).toBeNull();
    });

    it('handles empty string date', () => {
      const { container } = render(
        <LastUpdated date="" showAdmissionCycle={false} />
      );
      
      expect(container.firstChild).toBeNull();
    });

    it('handles leap year dates', () => {
      render(<LastUpdated date="2024-02-29" />);
      
      expect(screen.getByText(/February 29, 2024/)).toBeInTheDocument();
    });

    it('handles year boundary dates', () => {
      render(<LastUpdated date="2025-12-31" />);
      
      expect(screen.getByText(/December 31, 2025/)).toBeInTheDocument();
    });
  });

  describe('Admission Cycle Calculation', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('calculates cycle for January', () => {
      vi.setSystemTime(new Date('2026-01-15'));
      render(<LastUpdated date="2026-01-15" />);
      expect(screen.getByText(/2026-27/)).toBeInTheDocument();
    });

    it('calculates cycle for June', () => {
      vi.setSystemTime(new Date('2026-06-15'));
      render(<LastUpdated date="2026-01-15" />);
      expect(screen.getByText(/2026-27/)).toBeInTheDocument();
    });

    it('calculates cycle for July', () => {
      vi.setSystemTime(new Date('2026-07-15'));
      render(<LastUpdated date="2026-07-15" />);
      expect(screen.getByText(/2027-28/)).toBeInTheDocument();
    });

    it('calculates cycle for December', () => {
      vi.setSystemTime(new Date('2026-12-15'));
      render(<LastUpdated date="2026-12-15" />);
      expect(screen.getByText(/2027-28/)).toBeInTheDocument();
    });
  });

  describe('Visual Elements', () => {
    it('renders clock icon for last updated', () => {
      const { container } = render(<LastUpdated date="2026-01-15" />);
      
      const icons = container.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('renders check icon for admission cycle', () => {
      const { container } = render(<LastUpdated date="2026-01-15" />);
      
      const icons = container.querySelectorAll('svg');
      expect(icons.length).toBe(2); // Clock and check icons
    });

    it('renders only one icon when admission cycle is hidden', () => {
      const { container } = render(
        <LastUpdated date="2026-01-15" showAdmissionCycle={false} />
      );
      
      const icons = container.querySelectorAll('svg');
      expect(icons.length).toBe(1); // Only clock icon
    });
  });

  describe('Property 62: Last Updated Timestamp', () => {
    // Feature: sharda-university-content-enhancement, Property 62
    it('validates Property 62: displays last updated timestamp on key pages', () => {
      render(<LastUpdated date="2026-01-15" />);
      
      // Should display "Last Updated" label
      expect(screen.getByText(/Last Updated:/)).toBeInTheDocument();
      
      // Should display formatted date
      expect(screen.getByText(/January 15, 2026/)).toBeInTheDocument();
      
      // Should have proper semantic markup
      const timeElement = screen.getByText(/January 15, 2026/).closest('time');
      expect(timeElement).toHaveAttribute('datetime');
    });

    it('validates Property 62: displays current admission cycle year', () => {
      render(<LastUpdated date="2026-01-15" admissionCycle="2026-27" />);
      
      // Should display "Admission Cycle" label
      expect(screen.getByText(/Admission Cycle:/)).toBeInTheDocument();
      
      // Should display admission cycle year
      expect(screen.getByText(/2026-27/)).toBeInTheDocument();
    });
  });
});
