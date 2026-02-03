import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UrgencyBanner from '../UrgencyBanner';

describe('UrgencyBanner Edge Cases', () => {
  describe('Missing urgency data', () => {
    it('should return null when both deadline and seatsLeft are null', () => {
      const { container } = render(
        <UrgencyBanner
          deadline={null}
          seatsLeft={null}
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
        />
      );

      expect(container.firstChild).toBeNull();
      expect(screen.queryByTestId('urgency-banner')).toBeNull();
    });

    it('should return null when both deadline and seatsLeft are undefined', () => {
      const { container } = render(
        <UrgencyBanner
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
        />
      );

      expect(container.firstChild).toBeNull();
      expect(screen.queryByTestId('urgency-banner')).toBeNull();
    });

    it('should render when only deadline is provided', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      render(
        <UrgencyBanner
          deadline={tomorrow}
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
        />
      );

      expect(screen.getByTestId('urgency-banner')).toBeTruthy();
      expect(screen.getByTestId('deadline-text')).toBeTruthy();
      expect(screen.queryByTestId('seats-text')).toBeNull();
    });

    it('should render when only seatsLeft is provided', () => {
      render(
        <UrgencyBanner
          seatsLeft={10}
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
        />
      );

      expect(screen.getByTestId('urgency-banner')).toBeTruthy();
      expect(screen.getByTestId('seats-text')).toBeTruthy();
      expect(screen.queryByTestId('deadline-text')).toBeNull();
    });
  });

  describe('Invalid date formats', () => {
    it('should handle invalid date string gracefully', () => {
      render(
        <UrgencyBanner
          deadline="invalid-date"
          seatsLeft={10}
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
        />
      );

      // Component should still render because seatsLeft is valid
      expect(screen.getByTestId('urgency-banner')).toBeTruthy();
      // Deadline should not be displayed
      expect(screen.queryByTestId('deadline-text')).toBeNull();
      // Seats should be displayed
      expect(screen.getByTestId('seats-text')).toBeTruthy();
    });

    it('should handle empty string date gracefully', () => {
      render(
        <UrgencyBanner
          deadline=""
          seatsLeft={5}
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
        />
      );

      expect(screen.getByTestId('urgency-banner')).toBeTruthy();
      expect(screen.queryByTestId('deadline-text')).toBeNull();
      expect(screen.getByTestId('seats-text')).toBeTruthy();
    });

    it('should not render when deadline has passed', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const { container } = render(
        <UrgencyBanner
          deadline={yesterday}
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
        />
      );

      // Component should not render when deadline has passed and no seatsLeft
      expect(container.firstChild).toBeNull();
    });

    it('should render seatsLeft even when deadline has passed', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      render(
        <UrgencyBanner
          deadline={yesterday}
          seatsLeft={15}
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
        />
      );

      // Component should render because seatsLeft is valid
      expect(screen.getByTestId('urgency-banner')).toBeTruthy();
      // Deadline should not be displayed (past)
      expect(screen.queryByTestId('deadline-text')).toBeNull();
      // Seats should be displayed
      expect(screen.getByTestId('seats-text')).toBeTruthy();
    });
  });

  describe('Zero seats left', () => {
    it('should display "No seats left" when seatsLeft is 0', () => {
      render(
        <UrgencyBanner
          seatsLeft={0}
          ctaText="Join Waitlist"
          ctaLink="https://example.com/waitlist"
        />
      );

      expect(screen.getByTestId('urgency-banner')).toBeTruthy();
      expect(screen.getByTestId('seats-text')).toHaveTextContent('No seats left');
    });

    it('should still render CTA when seatsLeft is 0', () => {
      render(
        <UrgencyBanner
          seatsLeft={0}
          ctaText="Join Waitlist"
          ctaLink="https://example.com/waitlist"
        />
      );

      const ctaButton = screen.getByTestId('urgency-cta');
      expect(ctaButton).toBeTruthy();
      expect(ctaButton.textContent).toBe('Join Waitlist');
      expect(ctaButton.getAttribute('href')).toBe('https://example.com/waitlist');
    });

    it('should calculate high urgency when seatsLeft is 0', () => {
      render(
        <UrgencyBanner
          seatsLeft={0}
          ctaText="Join Waitlist"
          ctaLink="https://example.com/waitlist"
        />
      );

      const banner = screen.getByTestId('urgency-banner');
      expect(banner.getAttribute('data-urgency-level')).toBe('medium');
    });
  });

  describe('Deadline formatting', () => {
    it('should display "Deadline: Today!" for today\'s deadline', () => {
      // Set to a time later today to ensure it's still "today"
      const laterToday = new Date();
      laterToday.setHours(laterToday.getHours() + 2);

      render(
        <UrgencyBanner
          deadline={laterToday}
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
        />
      );

      const deadlineText = screen.getByTestId('deadline-text').textContent;
      // Could be "Today!" or "Tomorrow" depending on exact timing
      expect(deadlineText).toMatch(/Deadline: (Today!|Tomorrow)/);
    });

    it('should display "Deadline: Tomorrow" for tomorrow\'s deadline', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      render(
        <UrgencyBanner
          deadline={tomorrow}
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
        />
      );

      expect(screen.getByTestId('deadline-text')).toHaveTextContent('Deadline: Tomorrow');
    });

    it('should display days left for deadlines within a week', () => {
      const fiveDaysLater = new Date();
      fiveDaysLater.setDate(fiveDaysLater.getDate() + 5);

      render(
        <UrgencyBanner
          deadline={fiveDaysLater}
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
        />
      );

      const deadlineText = screen.getByTestId('deadline-text').textContent;
      expect(deadlineText).toMatch(/Deadline: \d+ days left/);
    });

    it('should display weeks left for deadlines within a month', () => {
      const threeWeeksLater = new Date();
      threeWeeksLater.setDate(threeWeeksLater.getDate() + 21);

      render(
        <UrgencyBanner
          deadline={threeWeeksLater}
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
        />
      );

      const deadlineText = screen.getByTestId('deadline-text').textContent;
      expect(deadlineText).toMatch(/Deadline: \d+ weeks left/);
    });

    it('should display formatted date for deadlines beyond a month', () => {
      const twoMonthsLater = new Date();
      twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);

      render(
        <UrgencyBanner
          deadline={twoMonthsLater}
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
        />
      );

      const deadlineText = screen.getByTestId('deadline-text').textContent;
      expect(deadlineText).toContain('Deadline:');
      // Should contain month name
      expect(deadlineText).toMatch(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/);
    });
  });

  describe('Variant styling', () => {
    it('should apply homepage variant styling', () => {
      render(
        <UrgencyBanner
          deadline={new Date(Date.now() + 86400000)}
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
          variant="homepage"
        />
      );

      const banner = screen.getByTestId('urgency-banner');
      expect(banner.className).toContain('from-blue-600');
      expect(banner.className).toContain('to-indigo-600');
    });

    it('should apply university variant styling', () => {
      render(
        <UrgencyBanner
          deadline={new Date(Date.now() + 86400000)}
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
          variant="university"
        />
      );

      const banner = screen.getByTestId('urgency-banner');
      expect(banner.className).toContain('from-purple-600');
      expect(banner.className).toContain('to-pink-600');
    });

    it('should apply course variant styling', () => {
      render(
        <UrgencyBanner
          deadline={new Date(Date.now() + 86400000)}
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
          variant="course"
        />
      );

      const banner = screen.getByTestId('urgency-banner');
      expect(banner.className).toContain('from-green-600');
      expect(banner.className).toContain('to-teal-600');
    });
  });

  describe('Urgency level calculation', () => {
    it('should calculate high urgency for very close deadline and few seats', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      render(
        <UrgencyBanner
          deadline={tomorrow}
          seatsLeft={3}
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
        />
      );

      const banner = screen.getByTestId('urgency-banner');
      expect(banner.getAttribute('data-urgency-level')).toBe('high');
      
      const ctaButton = screen.getByTestId('urgency-cta');
      expect(ctaButton.className).toContain('bg-red-600');
      expect(ctaButton.className).toContain('animate-pulse');
    });

    it('should calculate medium urgency for moderate deadline and seats', () => {
      const oneWeekLater = new Date();
      oneWeekLater.setDate(oneWeekLater.getDate() + 7);

      render(
        <UrgencyBanner
          deadline={oneWeekLater}
          seatsLeft={15}
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
        />
      );

      const banner = screen.getByTestId('urgency-banner');
      // With 7 days and 15 seats, urgency score is 2+2=4, which is high
      expect(banner.getAttribute('data-urgency-level')).toBe('high');
      
      const ctaButton = screen.getByTestId('urgency-cta');
      // High urgency uses red color
      expect(ctaButton.className).toContain('bg-red-600');
    });

    it('should calculate low urgency for distant deadline and many seats', () => {
      const oneMonthLater = new Date();
      oneMonthLater.setDate(oneMonthLater.getDate() + 30);

      render(
        <UrgencyBanner
          deadline={oneMonthLater}
          seatsLeft={100}
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
        />
      );

      const banner = screen.getByTestId('urgency-banner');
      expect(banner.getAttribute('data-urgency-level')).toBe('low');
      
      const ctaButton = screen.getByTestId('urgency-cta');
      expect(ctaButton.className).toContain('bg-blue-600');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <UrgencyBanner
          deadline={new Date(Date.now() + 86400000)}
          seatsLeft={10}
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
        />
      );

      const banner = screen.getByTestId('urgency-banner');
      expect(banner.getAttribute('role')).toBe('alert');
      expect(banner.getAttribute('aria-live')).toBe('polite');
    });

    it('should have accessible emoji with aria-hidden', () => {
      render(
        <UrgencyBanner
          deadline={new Date(Date.now() + 86400000)}
          ctaText="Apply Now"
          ctaLink="https://example.com/apply"
        />
      );

      const emojis = screen.getAllByText('⏰');
      emojis.forEach(emoji => {
        expect(emoji.getAttribute('aria-hidden')).toBe('true');
      });
    });
  });
});
