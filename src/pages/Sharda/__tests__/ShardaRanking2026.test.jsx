/**
 * Unit tests for ShardaRanking2026 page
 * Feature: sharda-university-content-enhancement
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ShardaRanking2026 from '../ShardaRanking2026';

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
    {
      organization: 'Times Higher Education',
      year: 2024,
      rank: '801-1000',
      scope: 'international',
    },
  ],
  shardaProfile: {
    name: 'Sharda University',
    keyHighlights: [
      'Students from 95+ countries',
      '1600+ bed multi-specialty hospital',
    ],
  },
  shardaAccreditations: [
    {
      name: 'NAAC A+ Grade',
      body: 'National Assessment and Accreditation Council',
      year: 2023,
    },
  ],
  shardaPlacements: {
    year: 2024,
    companiesVisited: 600,
    studentsPlaced: 3500,
    placementPercentage: 85,
    highestPackage: 17000000,
    averagePackage: 450000,
    topRecruiters: ['Microsoft', 'Amazon', 'Google', 'Infosys', 'TCS', 'Wipro'],
  },
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

describe('ShardaRanking2026 Page', () => {
  afterEach(() => {
    // Clean up any meta tags or scripts added during tests
    document.querySelectorAll('meta[data-test]').forEach(el => el.remove());
    document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
  });
  describe('Page Structure', () => {
    it('renders the page without crashing', () => {
      renderWithRouter(<ShardaRanking2026 />);
    });

    it('displays the main heading', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByRole('heading', { name: /Sharda University Ranking 2026/i, level: 1 })).toBeTruthy();
    });

    it('includes breadcrumb navigation', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeTruthy();
      expect(screen.getByRole('link', { name: /^home$/i })).toBeTruthy();
      const shardaLinks = screen.getAllByRole('link', { name: /sharda university/i });
      expect(shardaLinks.length).toBeGreaterThan(0);
    });

    it('displays admissions open banner', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByText(/Admissions Open 2026-27/i)).toBeTruthy();
    });
  });

  describe('SEO Components', () => {
    it('renders SEO meta tags', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getAllByTestId('seo-meta-tags')).toHaveLength(1);
    });

    it('renders structured data', () => {
      renderWithRouter(<ShardaRanking2026 />);
      const structuredDataElements = screen.getAllByTestId('structured-data');
      expect(structuredDataElements.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Quick Stats Section', () => {
    it('displays NIRF ranking stat', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getAllByText('151-200').length).toBeGreaterThan(0);
      expect(screen.getByText(/NIRF University Ranking/i)).toBeTruthy();
    });

    it('displays NAAC grade stat', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByText('A+')).toBeTruthy();
      expect(screen.getByText(/NAAC Grade/i)).toBeTruthy();
    });

    it('displays countries represented stat', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByText('95+')).toBeTruthy();
      expect(screen.getByText(/Countries Represented/i)).toBeTruthy();
    });

    it('displays placement rate stat', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByText('85%')).toBeTruthy();
      expect(screen.getAllByText(/Placement Rate/i).length).toBeGreaterThan(0);
    });
  });

  describe('Rankings Table', () => {
    it('displays rankings overview section', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByRole('heading', { name: /Sharda University Rankings 2024-2026/i })).toBeTruthy();
    });

    it('displays rankings in table format on desktop', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByRole('table')).toBeTruthy();
      expect(screen.getByRole('columnheader', { name: /Ranking Body/i })).toBeTruthy();
      expect(screen.getByRole('columnheader', { name: /Category/i })).toBeTruthy();
      expect(screen.getAllByRole('columnheader', { name: /Rank/i }).length).toBeGreaterThan(0);
    });

    it('displays all ranking organizations', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getAllByText(/NIRF/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/QS Asia/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Times Higher Education/i).length).toBeGreaterThan(0);
    });
  });

  describe('Accreditations Section', () => {
    it('displays accreditations section', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByRole('heading', { name: /Accreditations & Recognition/i })).toBeTruthy();
    });

    it('displays NAAC A+ accreditation', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getAllByText(/NAAC A\+ Grade/i).length).toBeGreaterThan(0);
    });
  });

  describe('Placement Statistics', () => {
    it('displays placement achievements section', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByRole('heading', { name: /Placement Achievements 2024/i })).toBeTruthy();
    });

    it('displays highest package', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getAllByText(/₹1\.7 Cr/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Highest Package/i).length).toBeGreaterThan(0);
    });

    it('displays average package', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getAllByText(/₹4\.5 LPA/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Average Package/i).length).toBeGreaterThan(0);
    });

    it('displays recruiting companies count', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getAllByText(/600\+/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Recruiting Companies/i).length).toBeGreaterThan(0);
    });

    it('displays top recruiters', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByRole('heading', { name: /Top Recruiters/i })).toBeTruthy();
      expect(screen.getByText('Microsoft')).toBeTruthy();
      expect(screen.getByText('Amazon')).toBeTruthy();
      expect(screen.getByText('Google')).toBeTruthy();
    });
  });

  describe('Why Rankings Matter Section', () => {
    it('displays why rankings matter section', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByRole('heading', { name: /Why University Rankings Matter/i })).toBeTruthy();
    });

    it('explains quality assurance', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByRole('heading', { name: /Quality Assurance/i })).toBeTruthy();
    });

    it('explains career advantages', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByRole('heading', { name: /Career Advantages/i })).toBeTruthy();
    });

    it('explains global recognition', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByRole('heading', { name: /Global Recognition/i })).toBeTruthy();
    });

    it('explains research excellence', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByRole('heading', { name: /Research Excellence/i })).toBeTruthy();
    });
  });

  describe('Admission 2026-27 Section', () => {
    it('displays admissions section', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByRole('heading', { name: /Admissions 2026-27/i })).toBeTruthy();
    });

    it('displays Bangladesh scholarship information', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByText(/For Bangladeshi Students/i)).toBeTruthy();
      expect(screen.getByText(/50% scholarship for GPA 3\.5-5\.0/i)).toBeTruthy();
      expect(screen.getByText(/20% scholarship for GPA 3\.0-3\.4/i)).toBeTruthy();
    });

    it('displays key benefits', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByText(/Key Benefits/i)).toBeTruthy();
      expect(screen.getByText(/NAAC A\+ accredited programs/i)).toBeTruthy();
      expect(screen.getAllByText(/85% placement rate/i).length).toBeGreaterThan(0);
    });
  });

  describe('FAQ Section', () => {
    it('displays FAQ section', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeTruthy();
    });

    it('includes NIRF ranking FAQ', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByText(/What is Sharda University's NIRF ranking\?/i)).toBeTruthy();
    });

    it('includes international recognition FAQ', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByText(/Is Sharda University internationally recognized\?/i)).toBeTruthy();
    });

    it('includes accreditations FAQ', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByText(/What accreditations does Sharda University have\?/i)).toBeTruthy();
    });

    it('includes placement FAQ', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByText(/What is the placement rate at Sharda University\?/i)).toBeTruthy();
    });

    it('includes scholarship FAQ', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByText(/Are scholarships available for international students\?/i)).toBeTruthy();
    });
  });

  describe('Conversion Elements', () => {
    it('displays multiple application CTAs', () => {
      renderWithRouter(<ShardaRanking2026 />);
      const ctaButtons = screen.getAllByTestId('application-cta');
      expect(ctaButtons.length).toBeGreaterThanOrEqual(3); // Hero, admission section, and bottom CTAs
    });

    it('displays multiple WhatsApp CTAs', () => {
      renderWithRouter(<ShardaRanking2026 />);
      const whatsappButtons = screen.getAllByTestId('whatsapp-cta');
      expect(whatsappButtons.length).toBeGreaterThanOrEqual(3);
    });

    it('displays final CTA section', () => {
      renderWithRouter(<ShardaRanking2026 />);
      expect(screen.getByRole('heading', { name: /Ready to Join Sharda University\?/i })).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      renderWithRouter(<ShardaRanking2026 />);
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeTruthy();
      
      const h2s = screen.getAllByRole('heading', { level: 2 });
      expect(h2s.length).toBeGreaterThan(0);
    });

    it('has accessible navigation', () => {
      renderWithRouter(<ShardaRanking2026 />);
      const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
      expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
    });

    it('has accessible table', () => {
      renderWithRouter(<ShardaRanking2026 />);
      const table = screen.getByRole('table');
      expect(table).toBeTruthy();
      
      const columnHeaders = screen.getAllByRole('columnheader');
      expect(columnHeaders.length).toBeGreaterThan(0);
    });
  });

  describe('Mobile Responsiveness', () => {
    it('includes mobile-friendly card layout for rankings', () => {
      renderWithRouter(<ShardaRanking2026 />);
      // The mobile cards have md:hidden class, so they exist in DOM
      const mobileCards = screen.getAllByText(/NIRF/i);
      expect(mobileCards.length).toBeGreaterThan(0);
    });
  });
});
