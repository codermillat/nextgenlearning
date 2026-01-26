/**
 * Unit tests for ShardaBTechCSEFees page
 * Feature: sharda-university-content-enhancement
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ShardaBTechCSEFees from '../ShardaBTechCSEFees';

// Mock data
vi.mock('../../../data/shardaData', () => ({
  shardaPrograms: [
    {
      id: 'btech-cse',
      name: 'B.Tech in Computer Science and Engineering',
      code: 'CSE',
      discipline: 'Engineering',
      level: 'undergraduate',
      duration: '4 years',
      fees: {
        tuitionPerYear: 220000,
        totalTuition: 880000,
        hostel: 80000,
        mess: 60000,
        registration: 25000,
        other: 15000,
        total: 1060000,
      },
      eligibility: [
        {
          type: 'Academic',
          description: 'Minimum 60% in 10+2 with Physics, Chemistry, and Mathematics',
        },
      ],
      curriculum: [
        'Data Structures and Algorithms',
        'Database Management Systems',
      ],
      specializations: ['Artificial Intelligence', 'Data Science', 'Cyber Security', 'IoT'],
      accreditation: 'NBA Accredited',
    },
  ],
  scholarshipRules: [
    {
      country: 'Bangladesh',
      gpaMin: 3.5,
      gpaMax: 5.0,
      percentage: 50,
    },
    {
      country: 'Bangladesh',
      gpaMin: 3.0,
      gpaMax: 3.49,
      percentage: 20,
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

vi.mock('../../../components/Sharda/FeeCalculator', () => ({
  default: () => <div data-testid="fee-calculator">Fee Calculator</div>,
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ShardaBTechCSEFees Page', () => {
  afterEach(() => {
    document.querySelectorAll('meta[data-test]').forEach(el => el.remove());
    document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
  });

  describe('Page Structure', () => {
    it('renders the page without crashing', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
    });

    it('displays the main heading', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByRole('heading', { name: /Sharda University B\.Tech CSE Fees 2026-27/i, level: 1 })).toBeTruthy();
    });

    it('includes breadcrumb navigation', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeTruthy();
      expect(screen.getByRole('link', { name: /^home$/i })).toBeTruthy();
      const shardaLinks = screen.getAllByRole('link', { name: /sharda university/i });
      expect(shardaLinks.length).toBeGreaterThan(0);
    });
  });

  describe('SEO Components', () => {
    it('renders SEO meta tags', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getAllByTestId('seo-meta-tags')).toHaveLength(1);
    });

    it('renders structured data', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      const structuredDataElements = screen.getAllByTestId('structured-data');
      expect(structuredDataElements.length).toBeGreaterThanOrEqual(2); // Course and Breadcrumb schemas
    });
  });

  describe('Fee Information Display', () => {
    it('displays quick fee overview', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getAllByText(/Annual Tuition/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Total 4-Year Cost/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Max Scholarship/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Program Duration/i).length).toBeGreaterThan(0);
    });

    it('displays annual tuition fee', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getAllByText(/₹2\.2L/i).length).toBeGreaterThan(0);
    });

    it('displays total 4-year cost', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getAllByText(/₹10\.6L/i).length).toBeGreaterThan(0);
    });

    it('displays complete fee breakdown section', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByRole('heading', { name: /Complete Fee Breakdown/i })).toBeTruthy();
    });

    it('displays all fee components', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getAllByText(/Tuition Fee/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Hostel Fee/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Mess Fee/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Registration Fee/i).length).toBeGreaterThan(0);
    });

    it('displays what is included in fees', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByText(/What's Included in the Fees\?/i)).toBeTruthy();
      expect(screen.getByText(/State-of-the-art computer labs/i)).toBeTruthy();
      expect(screen.getByText(/Placement assistance and training/i)).toBeTruthy();
    });
  });

  describe('Scholarship Information', () => {
    it('displays scholarship opportunities section', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByRole('heading', { name: /Scholarship Opportunities/i })).toBeTruthy();
    });

    it('displays Bangladesh scholarship information', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByText(/For Bangladeshi Students/i)).toBeTruthy();
      expect(screen.getByText(/GPA 3\.5 - 5\.0/i)).toBeTruthy();
      expect(screen.getByText(/GPA 3\.0 - 3\.49/i)).toBeTruthy();
    });

    it('displays 50% scholarship for high GPA', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getAllByText(/50% OFF/i).length).toBeGreaterThan(0);
    });

    it('displays 20% scholarship for medium GPA', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getAllByText(/20% OFF/i).length).toBeGreaterThan(0);
    });

    it('displays other scholarship options', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByText(/Other Scholarship Options/i)).toBeTruthy();
      expect(screen.getByText(/Merit-Based Scholarships/i)).toBeTruthy();
      expect(screen.getByText(/Sports Scholarships/i)).toBeTruthy();
    });

    it('explains scholarship application process', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByText(/Scholarship Application Process/i)).toBeTruthy();
      expect(screen.getAllByText(/automatically applied/i).length).toBeGreaterThan(0);
    });
  });

  describe('Fee Calculator Integration', () => {
    it('displays fee calculator section', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByRole('heading', { name: /Calculate Your Fees/i })).toBeTruthy();
    });

    it('renders fee calculator component', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByTestId('fee-calculator')).toBeTruthy();
    });
  });

  describe('Program Highlights', () => {
    it('displays program highlights section', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByRole('heading', { name: /Why Choose B\.Tech CSE at Sharda\?/i })).toBeTruthy();
    });

    it('displays NBA accreditation', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByText(/NBA Accredited/i)).toBeTruthy();
    });

    it('displays placement information', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByText(/Excellent Placements/i)).toBeTruthy();
      expect(screen.getAllByText(/Microsoft, Amazon, Google/i).length).toBeGreaterThan(0);
    });

    it('displays modern curriculum', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByText(/Modern Curriculum/i)).toBeTruthy();
      expect(screen.getByText(/AI, ML, Cloud Computing/i)).toBeTruthy();
    });
  });

  describe('FAQ Section', () => {
    it('displays FAQ section', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeTruthy();
    });

    it('includes FAQ about total fees', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByText(/What is the total fee for B\.Tech CSE at Sharda University\?/i)).toBeTruthy();
    });

    it('includes FAQ about scholarships', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByText(/How much scholarship can Bangladeshi students get\?/i)).toBeTruthy();
    });

    it('includes FAQ about hostel', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByText(/Is hostel accommodation mandatory\?/i)).toBeTruthy();
    });

    it('includes FAQ about placements', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByText(/What are the placement opportunities after B\.Tech CSE\?/i)).toBeTruthy();
    });
  });

  describe('Conversion Elements', () => {
    it('displays application CTAs', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      const ctaButtons = screen.getAllByTestId('application-cta');
      expect(ctaButtons.length).toBeGreaterThanOrEqual(3); // Hero, scholarship, and bottom CTAs
    });

    it('displays WhatsApp CTAs', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      const whatsappButtons = screen.getAllByTestId('whatsapp-cta');
      expect(whatsappButtons.length).toBeGreaterThanOrEqual(3); // Hero, scholarship, and bottom CTAs
    });

    it('displays final CTA section', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByRole('heading', { name: /Ready to Start Your B\.Tech CSE Journey\?/i })).toBeTruthy();
    });

    it('displays admissions open banner', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getAllByText(/Admissions Open 2026-27/i).length).toBeGreaterThan(0);
    });
  });

  describe('Internal Links', () => {
    it('includes link to main Sharda page', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      expect(screen.getByRole('link', { name: /Learn more about Sharda University/i })).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeTruthy();
      
      const h2s = screen.getAllByRole('heading', { level: 2 });
      expect(h2s.length).toBeGreaterThan(0);
    });

    it('has accessible navigation', () => {
      renderWithRouter(<ShardaBTechCSEFees />);
      const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
      expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
    });
  });
});
