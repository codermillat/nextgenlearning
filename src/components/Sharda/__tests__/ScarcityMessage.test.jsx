import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ScarcityMessage from '../ScarcityMessage';

/**
 * ScarcityMessage Component Unit Tests
 * Feature: sharda-university-content-enhancement
 * 
 * Tests specific examples, edge cases, and truthfulness validation.
 */

describe('ScarcityMessage', () => {
  describe('Basic Rendering', () => {
    it('renders limited-seats message with seats remaining', () => {
      render(
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={15}
        />
      );
      
      const message = screen.getByTestId('scarcity-message');
      expect(message).toBeInTheDocument();
      expect(message).toHaveAttribute('data-type', 'limited-seats');
      expect(message).toHaveAttribute('data-seats-remaining', '15');
      expect(screen.getByText(/15 seats remaining/i)).toBeInTheDocument();
    });

    it('renders early-bird message', () => {
      render(<ScarcityMessage type="early-bird" />);
      
      expect(screen.getByTestId('scarcity-message')).toBeInTheDocument();
      expect(screen.getByText(/apply early/i)).toBeInTheDocument();
    });

    it('renders scholarship-priority message', () => {
      render(<ScarcityMessage type="scholarship-priority" />);
      
      expect(screen.getByTestId('scarcity-message')).toBeInTheDocument();
      expect(screen.getByText(/scholarship/i)).toBeInTheDocument();
    });

    it('renders hostel-priority message', () => {
      render(<ScarcityMessage type="hostel-priority" />);
      
      expect(screen.getByTestId('scarcity-message')).toBeInTheDocument();
      expect(screen.getByText(/hostel/i)).toBeInTheDocument();
    });

    it('renders with custom message', () => {
      const customMessage = 'Special limited offer - Act now!';
      render(
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={10}
          message={customMessage}
        />
      );
      
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-scarcity-class';
      render(
        <ScarcityMessage
          type="early-bird"
          className={customClass}
        />
      );
      
      const message = screen.getByTestId('scarcity-message');
      expect(message).toHaveClass(customClass);
    });
  });

  describe('Message Types', () => {
    it('includes program name in limited-seats message', () => {
      render(
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={10}
          program="B.Tech CSE"
        />
      );
      
      expect(screen.getByText(/B\.Tech CSE/i)).toBeInTheDocument();
    });

    it('uses singular "seat" for 1 remaining', () => {
      render(
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={1}
        />
      );
      
      expect(screen.getByText(/1 seat remaining/i)).toBeInTheDocument();
      expect(screen.queryByText(/1 seats/i)).not.toBeInTheDocument();
    });

    it('uses plural "seats" for multiple remaining', () => {
      render(
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={5}
        />
      );
      
      expect(screen.getByText(/5 seats remaining/i)).toBeInTheDocument();
    });

    it('shows high demand message for 10 or fewer seats', () => {
      render(
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={8}
        />
      );
      
      expect(screen.getByText(/high demand/i)).toBeInTheDocument();
    });

    it('does not show high demand message for more than 10 seats', () => {
      render(
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={15}
        />
      );
      
      expect(screen.queryByText(/high demand/i)).not.toBeInTheDocument();
    });

    it('shows early bird benefits list', () => {
      render(<ScarcityMessage type="early-bird" />);
      
      expect(screen.getByText(/priority scholarship/i)).toBeInTheDocument();
      expect(screen.getByText(/hostel room/i)).toBeInTheDocument();
      expect(screen.getByText(/course registration/i)).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders with info variant', () => {
      render(
        <ScarcityMessage
          type="early-bird"
          variant="info"
        />
      );
      
      const message = screen.getByTestId('scarcity-message');
      expect(message).toHaveAttribute('data-variant', 'info');
    });

    it('renders with warning variant', () => {
      render(
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={20}
          variant="warning"
        />
      );
      
      const message = screen.getByTestId('scarcity-message');
      expect(message).toHaveAttribute('data-variant', 'warning');
    });

    it('renders with urgent variant', () => {
      render(
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={5}
          variant="urgent"
        />
      );
      
      const message = screen.getByTestId('scarcity-message');
      expect(message).toHaveAttribute('data-variant', 'urgent');
    });
  });

  describe('Icon Display', () => {
    it('shows icon by default', () => {
      render(
        <ScarcityMessage
          type="early-bird"
        />
      );
      
      const message = screen.getByTestId('scarcity-message');
      const icon = message.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });

    it('hides icon when showIcon is false', () => {
      render(
        <ScarcityMessage
          type="early-bird"
          showIcon={false}
        />
      );
      
      const message = screen.getByTestId('scarcity-message');
      const icon = message.querySelector('[aria-hidden="true"]');
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe('Truthfulness Validation (Property 43, Requirement 11.5)', () => {
    it('does not render limited-seats without seatsRemaining', () => {
      render(
        <ScarcityMessage
          type="limited-seats"
        />
      );
      
      expect(screen.queryByTestId('scarcity-message')).not.toBeInTheDocument();
    });

    it('does not render limited-seats with zero seats', () => {
      render(
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={0}
        />
      );
      
      expect(screen.queryByTestId('scarcity-message')).not.toBeInTheDocument();
    });

    it('does not render limited-seats with negative seats', () => {
      render(
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={-5}
        />
      );
      
      expect(screen.queryByTestId('scarcity-message')).not.toBeInTheDocument();
    });

    it('does not render limited-seats with null seats', () => {
      render(
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={null}
        />
      );
      
      expect(screen.queryByTestId('scarcity-message')).not.toBeInTheDocument();
    });

    it('does not render limited-seats with undefined seats', () => {
      render(
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={undefined}
        />
      );
      
      expect(screen.queryByTestId('scarcity-message')).not.toBeInTheDocument();
    });

    it('does not render limited-seats with non-numeric seats', () => {
      render(
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining="10"
        />
      );
      
      expect(screen.queryByTestId('scarcity-message')).not.toBeInTheDocument();
    });

    it('renders limited-seats with valid positive number', () => {
      render(
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={10}
        />
      );
      
      expect(screen.getByTestId('scarcity-message')).toBeInTheDocument();
    });

    it('renders other types without seats validation', () => {
      const { rerender } = render(<ScarcityMessage type="early-bird" />);
      expect(screen.getByTestId('scarcity-message')).toBeInTheDocument();
      
      rerender(<ScarcityMessage type="scholarship-priority" />);
      expect(screen.getByTestId('scarcity-message')).toBeInTheDocument();
      
      rerender(<ScarcityMessage type="hostel-priority" />);
      expect(screen.getByTestId('scarcity-message')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA role', () => {
      render(
        <ScarcityMessage
          type="early-bird"
        />
      );
      
      const message = screen.getByTestId('scarcity-message');
      expect(message).toHaveAttribute('role', 'status');
    });

    it('has aria-live attribute', () => {
      render(
        <ScarcityMessage
          type="early-bird"
        />
      );
      
      const message = screen.getByTestId('scarcity-message');
      expect(message).toHaveAttribute('aria-live', 'polite');
    });

    it('icons are hidden from screen readers', () => {
      render(
        <ScarcityMessage
          type="early-bird"
        />
      );
      
      const message = screen.getByTestId('scarcity-message');
      const icon = message.querySelector('[aria-hidden="true"]');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Edge Cases', () => {
    it('handles very large seat numbers', () => {
      render(
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={999}
        />
      );
      
      expect(screen.getByText(/999 seats/i)).toBeInTheDocument();
    });

    it('handles empty custom message gracefully', () => {
      render(
        <ScarcityMessage
          type="early-bird"
          message=""
        />
      );
      
      // Should use default message
      const message = screen.getByTestId('scarcity-message');
      expect(message).toBeInTheDocument();
      expect(message.textContent.length).toBeGreaterThan(0);
    });

    it('handles very long program names', () => {
      const longProgramName = 'Bachelor of Technology in Computer Science and Engineering with Specialization in Artificial Intelligence and Machine Learning';
      render(
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={10}
          program={longProgramName}
        />
      );
      
      expect(screen.getByText(new RegExp(longProgramName))).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('renders with responsive classes', () => {
      render(
        <ScarcityMessage
          type="early-bird"
        />
      );
      
      const message = screen.getByTestId('scarcity-message');
      const textElement = message.querySelector('.text-sm');
      expect(textElement).toBeInTheDocument();
    });
  });
});
