/**
 * Accessibility Tests for Sharda Components
 * 
 * Tests WCAG 2.1 AA compliance using axe-core
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { BrowserRouter } from 'react-router-dom';

// Import components
import ShardaLandingPage from '../../../pages/Sharda/ShardaLandingPage';
import ApplicationCTA from '../ApplicationCTA';
import WhatsAppCTA from '../WhatsAppCTA';
import FeeCalculator from '../FeeCalculator';
import ProgramFinder from '../ProgramFinder';
import BangladeshSection from '../BangladeshSection';
import TestimonialCarousel from '../TestimonialCarousel';
import UrgencyBanner from '../UrgencyBanner';
import ScarcityMessage from '../ScarcityMessage';
import LastUpdated from '../LastUpdated';
import UniversityComparison from '../UniversityComparison';

// Helper to render with router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Accessibility Tests - WCAG 2.1 AA Compliance', () => {
  describe('ApplicationCTA Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = renderWithRouter(
        <ApplicationCTA 
          variant="primary" 
          source="test" 
          context="landing-page" 
        />
      );
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });

    it('should have accessible button with proper label', async () => {
      const { container } = renderWithRouter(
        <ApplicationCTA 
          variant="secondary" 
          program="B.Tech CSE"
          source="test" 
          context="program-page" 
        />
      );
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });
  });

  describe('WhatsAppCTA Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = renderWithRouter(
        <WhatsAppCTA 
          context="landing-page" 
          variant="button" 
        />
      );
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });

    it('should have accessible floating variant', async () => {
      const { container } = renderWithRouter(
        <WhatsAppCTA 
          context="program-page" 
          variant="floating" 
        />
      );
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });
  });

  describe('FeeCalculator Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = renderWithRouter(
        <FeeCalculator />
      );
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });
  });

  describe('ProgramFinder Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = renderWithRouter(
        <ProgramFinder />
      );
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });
  });

  describe('BangladeshSection Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = renderWithRouter(
        <BangladeshSection />
      );
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });
  });

  describe('TestimonialCarousel Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = renderWithRouter(
        <TestimonialCarousel />
      );
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });
  });

  describe('UrgencyBanner Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = renderWithRouter(
        <UrgencyBanner 
          deadline={new Date('2026-06-30')}
          message="Applications closing soon"
        />
      );
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });
  });

  describe('ScarcityMessage Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = renderWithRouter(
        <ScarcityMessage 
          seatsRemaining={50}
          program="B.Tech CSE"
        />
      );
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });
  });

  describe('LastUpdated Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = renderWithRouter(
        <LastUpdated 
          date={new Date('2026-01-15')}
          contentType="fees"
        />
      );
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });
  });

  describe('UniversityComparison Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = renderWithRouter(
        <UniversityComparison 
          university1="Sharda University"
          university2="Amity University"
        />
      );
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });
  });
});
