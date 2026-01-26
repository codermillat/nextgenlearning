/**
 * Unit tests for ShardaMBAFees page
 * Feature: sharda-university-content-enhancement
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ShardaMBAFees from '../ShardaMBAFees';

// Mock data
vi.mock('../../../data/shardaData', () => ({
  shardaPrograms: [
    {
      id: 'mba',
      name: 'Master of Business Administration',
      code: 'MBA',
      discipline: 'Management',
      level: 'postgraduate',
      duration: '2 years',
      fees: {
        tuitionPerYear: 300000,
        totalTuition: 600000,
        hostel: 80000,
        mess: 60000,
        registration: 25000,
        other: 15000,
        total: 780000,
      },
      eligibility: [
        {
          type: 'Academic',
          description: 'Bachelor degree with minimum 50% marks',
        },
      ],
      curriculum: [
        'Marketing Management',
        'Financial Management',
      ],
      specializations: ['Marketing', 'Finance', 'HR', 'Operations', 'International Business'],
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

describe('ShardaMBAFees Page', () => {
  afterEach(() => {
    document.querySelectorAll('meta[data-test]').forEach(el => el.remove());
    document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
  });

  describe('Page Structure', () => {
    it('renders the page without crashing', () => {
      renderWithRouter(<ShardaMBAFees />);
    });

    it('displays the main heading', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByRole('heading', { name: /Sharda University MBA Fees 2026-27/i, level: 1 })).toBeTruthy();
    });

    it('includes breadcrumb navigation', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeTruthy();
      expect(screen.getByRole('link', { name: /^home$/i })).toBeTruthy();
      const shardaLinks = screen.getAllByRole('link', { name: /sharda university/i });
      expect(shardaLinks.length).toBeGreaterThan(0);
    });
  });

  describe('SEO Components', () => {
    it('renders SEO meta tags', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getAllByTestId('seo-meta-tags')).toHaveLength(1);
    });

    it('renders structured data', () => {
      renderWithRouter(<ShardaMBAFees />);
      const structuredDataElements = screen.getAllByTestId('structured-data');
      expect(structuredDataElements.length).toBeGreaterThanOrEqual(2); // Course and Breadcrumb schemas
    });
  });

  describe('Fee Information Display', () => {
    it('displays quick fee overview', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getAllByText(/Annual Tuition/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Total 2-Year Cost/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Max Scholarship/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Program Duration/i).length).toBeGreaterThan(0);
    });

    it('displays annual tuition fee', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getAllByText(/₹3\.0L/i).length).toBeGreaterThan(0);
    });

    it('displays total 2-year cost', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getAllByText(/₹7\.8L/i).length).toBeGreaterThan(0);
    });

    it('displays complete fee breakdown section', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByRole('heading', { name: /Complete Fee Breakdown/i })).toBeTruthy();
    });

    it('displays all fee components', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getAllByText(/Tuition Fee/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Hostel Fee/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Mess Fee/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Registration Fee/i).length).toBeGreaterThan(0);
    });

    it('displays what is included in fees', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByText(/What's Included in the Fees\?/i)).toBeTruthy();
      expect(screen.getByText(/Case study based learning methodology/i)).toBeTruthy();
      expect(screen.getByText(/Placement assistance and training/i)).toBeTruthy();
    });
  });

  describe('MBA Specializations', () => {
    it('displays specializations section', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByRole('heading', { name: /MBA Specializations Available/i })).toBeTruthy();
    });

    it('displays all specializations', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByText(/^Marketing$/)).toBeTruthy();
      expect(screen.getByText(/^Finance$/)).toBeTruthy();
      expect(screen.getByText(/^HR$/)).toBeTruthy();
      expect(screen.getByText(/^Operations$/)).toBeTruthy();
      expect(screen.getAllByText(/International Business/).length).toBeGreaterThan(0);
    });

    it('explains specialization selection', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByText(/All specializations have the same fee structure/i)).toBeTruthy();
      expect(screen.getAllByText(/choose their specialization at the end of the first semester/i).length).toBeGreaterThan(0);
    });
  });

  describe('Scholarship Information', () => {
    it('displays scholarship opportunities section', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByRole('heading', { name: /Scholarship Opportunities/i })).toBeTruthy();
    });

    it('displays Bangladesh scholarship information', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByText(/For Bangladeshi Students/i)).toBeTruthy();
      expect(screen.getByText(/GPA 3\.5 - 5\.0/i)).toBeTruthy();
      expect(screen.getByText(/GPA 3\.0 - 3\.49/i)).toBeTruthy();
    });

    it('displays 50% scholarship for high GPA', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getAllByText(/50% OFF/i).length).toBeGreaterThan(0);
    });

    it('displays 20% scholarship for medium GPA', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getAllByText(/20% OFF/i).length).toBeGreaterThan(0);
    });

    it('displays other scholarship options', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByText(/Other Scholarship Options/i)).toBeTruthy();
      expect(screen.getByText(/Merit-Based Scholarships/i)).toBeTruthy();
      expect(screen.getByText(/Work Experience Scholarships/i)).toBeTruthy();
      expect(screen.getByText(/Women in Business Scholarships/i)).toBeTruthy();
    });

    it('explains scholarship application process', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByText(/Scholarship Application Process/i)).toBeTruthy();
      expect(screen.getAllByText(/automatically applied/i).length).toBeGreaterThan(0);
    });
  });

  describe('Fee Calculator Integration', () => {
    it('displays fee calculator section', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByRole('heading', { name: /Calculate Your MBA Fees/i })).toBeTruthy();
    });

    it('renders fee calculator component', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByTestId('fee-calculator')).toBeTruthy();
    });
  });

  describe('Program Highlights', () => {
    it('displays program highlights section', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByRole('heading', { name: /Why Choose MBA at Sharda\?/i })).toBeTruthy();
    });

    it('displays industry-aligned curriculum', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByText(/Industry-Aligned Curriculum/i)).toBeTruthy();
    });

    it('displays placement information', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByText(/Excellent Placements/i)).toBeTruthy();
    });

    it('displays expert faculty', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getAllByText(/Expert Faculty/i).length).toBeGreaterThan(0);
    });

    it('displays industry exposure', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByText(/Industry Exposure/i)).toBeTruthy();
    });
  });

  describe('FAQ Section', () => {
    it('displays FAQ section', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeTruthy();
    });

    it('includes FAQ about total fees', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByText(/What is the total fee for MBA at Sharda University\?/i)).toBeTruthy();
    });

    it('includes FAQ about specializations', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByText(/What specializations are available in MBA\?/i)).toBeTruthy();
    });

    it('includes FAQ about eligibility', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByText(/What are the eligibility criteria for MBA admission\?/i)).toBeTruthy();
    });

    it('includes FAQ about scholarships', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByText(/How much scholarship can Bangladeshi students get for MBA\?/i)).toBeTruthy();
    });

    it('includes FAQ about placements', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByText(/What are the placement opportunities after MBA\?/i)).toBeTruthy();
    });

    it('includes FAQ about work experience', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByText(/Is work experience required for MBA admission\?/i)).toBeTruthy();
    });
  });

  describe('Conversion Elements', () => {
    it('displays application CTAs', () => {
      renderWithRouter(<ShardaMBAFees />);
      const ctaButtons = screen.getAllByTestId('application-cta');
      expect(ctaButtons.length).toBeGreaterThanOrEqual(3); // Hero, scholarship, and bottom CTAs
    });

    it('displays WhatsApp CTAs', () => {
      renderWithRouter(<ShardaMBAFees />);
      const whatsappButtons = screen.getAllByTestId('whatsapp-cta');
      expect(whatsappButtons.length).toBeGreaterThanOrEqual(3); // Hero, scholarship, and bottom CTAs
    });

    it('displays final CTA section', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByRole('heading', { name: /Ready to Start Your MBA Journey\?/i })).toBeTruthy();
    });

    it('displays admissions open banner', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getAllByText(/Admissions Open 2026-27/i).length).toBeGreaterThan(0);
    });
  });

  describe('Internal Links', () => {
    it('includes link to main Sharda page', () => {
      renderWithRouter(<ShardaMBAFees />);
      expect(screen.getByRole('link', { name: /Learn more about Sharda University/i })).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      renderWithRouter(<ShardaMBAFees />);
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeTruthy();
      
      const h2s = screen.getAllByRole('heading', { level: 2 });
      expect(h2s.length).toBeGreaterThan(0);
    });

    it('has accessible navigation', () => {
      renderWithRouter(<ShardaMBAFees />);
      const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
      expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
    });
  });
});
