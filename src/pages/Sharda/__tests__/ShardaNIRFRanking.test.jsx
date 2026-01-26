/**
 * Unit tests for ShardaNIRFRanking page
 * Feature: sharda-university-content-enhancement
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ShardaNIRFRanking from '../ShardaNIRFRanking';

// Mock data
vi.mock('../../../data/shardaData', () => ({
  shardaRankings: [
    {
      organization: 'NIRF',
      year: 2024,
      rank: '151-200',
      category: 'University',
      scope: 'national',
    },
    {
      organization: 'NIRF',
      year: 2024,
      rank: '201-250',
      category: 'Engineering',
      scope: 'national',
    },
    {
      organization: 'QS Asia',
      year: 2024,
      rank: '651-700',
      scope: 'international',
    },
  ],
  shardaProfile: {
    name: 'Sharda University',
    keyHighlights: [
      'Students from 95+ countries',
      '1600+ bed multi-specialty hospital',
      '600+ recruiting companies',
      'INR 1.7 Crore highest package',
    ],
  },
  shardaAccreditations: [
    {
      name: 'NAAC A+ Grade',
      body: 'National Assessment and Accreditation Council',
      year: 2023,
    },
    {
      name: 'UGC Recognition',
      body: 'University Grants Commission',
      year: 2009,
    },
  ],
}));

// Mock components
vi.mock('../../../components/SEO/SEOMetaTags', () => ({
  default: () => <div data-testid="seo-meta-tags" />,
}));

vi.mock('../../../components/SEO/StructuredData', () => ({
  default: () => <div data-testid="structured-data" />,
}));

vi.mock('../../../components/Sharda/ApplicationCTA', () => ({
  default: () => <button data-testid="application-cta">Apply Now</button>,
}));

vi.mock('../../../components/Sharda/WhatsAppCTA', () => ({
  default: () => <button data-testid="whatsapp-cta">WhatsApp</button>,
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ShardaNIRFRanking Page', () => {
  afterEach(() => {
    // Clean up any meta tags or scripts added during tests
    document.querySelectorAll('meta[data-test]').forEach(el => el.remove());
    document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
  });
  describe('Page Structure', () => {
    it('renders the page without crashing', () => {
      renderWithRouter(<ShardaNIRFRanking />);
    });

    it('displays the main heading', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      expect(screen.getByRole('heading', { name: /Sharda University NIRF Ranking 2024/i, level: 1 })).toBeTruthy();
    });

    it('includes breadcrumb navigation', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeTruthy();
      expect(screen.getByRole('link', { name: /^home$/i })).toBeTruthy();
      const shardaLinks = screen.getAllByRole('link', { name: /sharda university/i });
      expect(shardaLinks.length).toBeGreaterThan(0);
    });
  });

  describe('SEO Components', () => {
    it('renders SEO meta tags', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      expect(screen.getAllByTestId('seo-meta-tags')).toHaveLength(1);
    });

    it('renders structured data', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      const structuredDataElements = screen.getAllByTestId('structured-data');
      expect(structuredDataElements.length).toBeGreaterThanOrEqual(2); // Organization and Breadcrumb schemas
    });
  });

  describe('NIRF Rankings Display', () => {
    it('displays NIRF rankings section', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      expect(screen.getByRole('heading', { name: /NIRF Rankings 2024/i })).toBeTruthy();
    });

    it('displays University category ranking', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      expect(screen.getByText(/University Category/i)).toBeTruthy();
      expect(screen.getAllByText('151-200').length).toBeGreaterThan(0);
    });

    it('displays Engineering category ranking', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      expect(screen.getByText(/Engineering Category/i)).toBeTruthy();
      expect(screen.getAllByText('201-250').length).toBeGreaterThan(0);
    });

    it('explains what NIRF ranking is', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      expect(screen.getByRole('heading', { name: /What is NIRF Ranking\?/i })).toBeTruthy();
      expect(screen.getAllByText(/National Institutional Ranking Framework/i).length).toBeGreaterThan(0);
    });
  });

  describe('Accreditations Section', () => {
    it('displays accreditations section', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      expect(screen.getByRole('heading', { name: /Accreditations & Recognition/i })).toBeTruthy();
    });

    it('displays NAAC A+ accreditation', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      expect(screen.getByText(/NAAC A\+ Grade/i)).toBeTruthy();
      expect(screen.getByText(/National Assessment and Accreditation Council/i)).toBeTruthy();
    });

    it('displays UGC recognition', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      expect(screen.getByText(/UGC Recognition/i)).toBeTruthy();
      expect(screen.getByText(/University Grants Commission/i)).toBeTruthy();
    });
  });

  describe('Key Highlights', () => {
    it('displays key highlights section', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      expect(screen.getByRole('heading', { name: /What Makes Sharda University Stand Out/i })).toBeTruthy();
    });

    it('displays all key highlights', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      expect(screen.getByText(/Students from 95\+ countries/i)).toBeTruthy();
      expect(screen.getByText(/1600\+ bed multi-specialty hospital/i)).toBeTruthy();
      expect(screen.getByText(/600\+ recruiting companies/i)).toBeTruthy();
      expect(screen.getByText(/INR 1\.7 Crore highest package/i)).toBeTruthy();
    });
  });

  describe('International Rankings', () => {
    it('displays international rankings section', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      expect(screen.getByRole('heading', { name: /International Rankings/i })).toBeTruthy();
    });

    it('displays QS Asia ranking', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      expect(screen.getByText(/QS Asia/i)).toBeTruthy();
      expect(screen.getByText('651-700')).toBeTruthy();
    });
  });

  describe('Conversion Elements', () => {
    it('displays application CTAs', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      const ctaButtons = screen.getAllByTestId('application-cta');
      expect(ctaButtons.length).toBeGreaterThanOrEqual(2); // Hero and bottom CTAs
    });

    it('displays WhatsApp CTAs', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      const whatsappButtons = screen.getAllByTestId('whatsapp-cta');
      expect(whatsappButtons.length).toBeGreaterThanOrEqual(2); // Hero and bottom CTAs
    });

    it('displays final CTA section', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      expect(screen.getByRole('heading', { name: /Join a NIRF Ranked University/i })).toBeTruthy();
    });
  });

  describe('Content Quality', () => {
    it('includes information about why rankings matter', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      expect(screen.getByRole('heading', { name: /Why Choose a NIRF Ranked University\?/i })).toBeTruthy();
      expect(screen.getAllByText(/Academic Excellence/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Better Career Prospects/i)).toBeTruthy();
    });

    it('includes link to main Sharda page', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      expect(screen.getByRole('link', { name: /Learn more about Sharda University/i })).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeTruthy();
      
      const h2s = screen.getAllByRole('heading', { level: 2 });
      expect(h2s.length).toBeGreaterThan(0);
    });

    it('has accessible navigation', () => {
      renderWithRouter(<ShardaNIRFRanking />);
      const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
      expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
    });
  });
});
