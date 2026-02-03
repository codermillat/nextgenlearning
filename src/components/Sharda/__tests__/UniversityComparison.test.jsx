import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UniversityComparison from '../UniversityComparison';

// Mock child components
vi.mock('../ApplicationCTA', () => ({
  default: ({ source, context }) => (
    <button data-testid="application-cta" data-source={source} data-context={context}>
      Apply Now
    </button>
  )
}));

vi.mock('../WhatsAppCTA', () => ({
  default: ({ context }) => (
    <button data-testid="whatsapp-cta" data-context={context}>
      WhatsApp
    </button>
  )
}));

const mockUniversities = [
  {
    id: 'sharda',
    name: 'Sharda University',
    shortName: 'Sharda',
    location: 'Greater Noida, UP',
    established: 2009,
    profile: {
      rankings: {
        nirf: '101-150',
        nirf2025: '101-150',
        naac: 'A+',
        naacScore: '3.5/4'
      },
      facilities: {
        campus: { size: '63 acres' },
        international: {
          students: '2000+',
          countriesRepresented: '85+'
        },
        healthcare: {
          hospital: '1,200-bed multi-specialty hospital'
        },
        placement: {
          rate: '91%',
          recruiters: '600+',
          packages: {
            highestInternational: '₹1 crore per annum'
          }
        },
        academic: {
          industryPartnerships: ['Microsoft', 'Oracle', 'AWS']
        }
      }
    }
  },
  {
    id: 'chandigarh',
    name: 'Chandigarh University',
    shortName: 'CU',
    location: 'Mohali, Punjab',
    established: 2012,
    profile: {
      rankings: {
        nirf: '32',
        nirf2025: '32',
        naac: 'A+',
        naacScore: '3.28/4'
      },
      facilities: {
        campus: { size: '200+ acres' },
        international: {
          students: '1000+',
          countriesRepresented: '40+'
        },
        healthcare: {
          hospital: 'No'
        },
        placement: {
          recruiters: '300+',
          packages: {
            highestDomestic: '₹25 lakh per annum'
          }
        },
        academic: {
          industryPartnerships: ['Google', 'Microsoft', 'Amazon']
        }
      }
    }
  }
];

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('UniversityComparison', () => {
  beforeEach(() => {
    // Reset window size
    global.innerWidth = 1024;
  });

  describe('Basic Rendering', () => {
    it('renders comparison table with universities', () => {
      renderWithRouter(
        <UniversityComparison universities={mockUniversities} />
      );

      expect(screen.getByText('Sharda University')).toBeInTheDocument();
      expect(screen.getByText('Chandigarh University')).toBeInTheDocument();
    });

    it('renders title and description when provided', () => {
      const title = 'University Comparison';
      const description = 'Compare top universities';

      renderWithRouter(
        <UniversityComparison
          universities={mockUniversities}
          title={title}
          description={description}
        />
      );

      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    });

    it('renders empty state when no universities provided', () => {
      renderWithRouter(<UniversityComparison universities={[]} />);

      expect(screen.getByText(/no universities available/i)).toBeInTheDocument();
    });

    it('renders empty state when universities is null', () => {
      renderWithRouter(<UniversityComparison universities={null} />);

      expect(screen.getByText(/no universities available/i)).toBeInTheDocument();
    });
  });

  describe('Highlighted University', () => {
    it('highlights Sharda University by default', () => {
      renderWithRouter(
        <UniversityComparison universities={mockUniversities} />
      );

      const recommendedBadges = screen.getAllByText('Recommended');
      expect(recommendedBadges.length).toBeGreaterThan(0);
    });

    it('highlights specified university', () => {
      renderWithRouter(
        <UniversityComparison
          universities={mockUniversities}
          highlightUniversity="chandigarh"
        />
      );

      const recommendedBadges = screen.getAllByText('Recommended');
      expect(recommendedBadges.length).toBeGreaterThan(0);
    });
  });

  describe('Comparison Metrics', () => {
    it('displays NIRF ranking', () => {
      renderWithRouter(
        <UniversityComparison universities={mockUniversities} />
      );

      expect(screen.getByText('NIRF Ranking 2025')).toBeInTheDocument();
      expect(screen.getByText('101-150')).toBeInTheDocument();
      expect(screen.getByText('32')).toBeInTheDocument();
    });

    it('displays NAAC accreditation', () => {
      renderWithRouter(
        <UniversityComparison universities={mockUniversities} />
      );

      expect(screen.getByText('NAAC Accreditation')).toBeInTheDocument();
      expect(screen.getByText('A+ (3.5/4)')).toBeInTheDocument();
      expect(screen.getByText('A+ (3.28/4)')).toBeInTheDocument();
    });

    it('displays campus size', () => {
      renderWithRouter(
        <UniversityComparison universities={mockUniversities} />
      );

      expect(screen.getByText('Campus Size')).toBeInTheDocument();
      expect(screen.getByText('63 acres')).toBeInTheDocument();
      expect(screen.getByText('200+ acres')).toBeInTheDocument();
    });

    it('displays international students', () => {
      renderWithRouter(
        <UniversityComparison universities={mockUniversities} />
      );

      expect(screen.getByText('International Students')).toBeInTheDocument();
      expect(screen.getByText('2000+ from 85+ countries')).toBeInTheDocument();
      expect(screen.getByText('1000+ from 40+ countries')).toBeInTheDocument();
    });

    it('displays on-campus hospital information', () => {
      renderWithRouter(
        <UniversityComparison universities={mockUniversities} />
      );

      expect(screen.getByText('On-Campus Hospital')).toBeInTheDocument();
      expect(screen.getByText('1,200-bed multi-specialty hospital')).toBeInTheDocument();
      expect(screen.getByText('No')).toBeInTheDocument();
    });

    it('displays placement information', () => {
      renderWithRouter(
        <UniversityComparison universities={mockUniversities} />
      );

      expect(screen.getByText('Placement Rate')).toBeInTheDocument();
      expect(screen.getByText('91%')).toBeInTheDocument();
      
      expect(screen.getByText('Recruiting Companies')).toBeInTheDocument();
      expect(screen.getByText('600+')).toBeInTheDocument();
      expect(screen.getByText('300+')).toBeInTheDocument();
    });

    it('displays highest package', () => {
      renderWithRouter(
        <UniversityComparison universities={mockUniversities} />
      );

      expect(screen.getByText('Highest Package')).toBeInTheDocument();
      expect(screen.getByText('₹1 crore per annum')).toBeInTheDocument();
      expect(screen.getByText('₹25 lakh per annum')).toBeInTheDocument();
    });

    it('displays industry partnerships', () => {
      renderWithRouter(
        <UniversityComparison universities={mockUniversities} />
      );

      expect(screen.getByText('Industry Partnerships')).toBeInTheDocument();
      expect(screen.getByText(/Microsoft, Oracle, AWS/)).toBeInTheDocument();
      expect(screen.getByText(/Google, Microsoft, Amazon/)).toBeInTheDocument();
    });
  });

  describe('CTAs', () => {
    it('renders Application CTAs', () => {
      renderWithRouter(
        <UniversityComparison universities={mockUniversities} />
      );

      const applicationCTAs = screen.getAllByTestId('application-cta');
      expect(applicationCTAs.length).toBeGreaterThan(0);
    });

    it('renders WhatsApp CTAs', () => {
      renderWithRouter(
        <UniversityComparison universities={mockUniversities} />
      );

      const whatsappCTAs = screen.getAllByTestId('whatsapp-cta');
      expect(whatsappCTAs.length).toBeGreaterThan(0);
    });

    it('passes correct source to Application CTA', () => {
      renderWithRouter(
        <UniversityComparison universities={mockUniversities} />
      );

      const applicationCTA = screen.getAllByTestId('application-cta')[0];
      expect(applicationCTA.getAttribute('data-source')).toBe('comparison-page-footer');
    });

    it('passes correct context to WhatsApp CTA', () => {
      renderWithRouter(
        <UniversityComparison universities={mockUniversities} />
      );

      const whatsappCTA = screen.getAllByTestId('whatsapp-cta')[0];
      expect(whatsappCTA.getAttribute('data-context')).toContain('Comparison Page');
    });
  });

  describe('Additional Information', () => {
    it('renders help section', () => {
      renderWithRouter(
        <UniversityComparison universities={mockUniversities} />
      );

      expect(screen.getByText('Need Help Choosing?')).toBeInTheDocument();
    });

    it('renders links to individual university pages', () => {
      renderWithRouter(
        <UniversityComparison universities={mockUniversities} />
      );

      const shardaLink = screen.getByRole('link', { name: /learn more about sharda/i });
      expect(shardaLink).toHaveAttribute('href', '/universities/sharda');

      const chandigarhLink = screen.getByRole('link', { name: /learn more about cu/i });
      expect(chandigarhLink).toHaveAttribute('href', '/universities/chandigarh');
    });
  });

  describe('Responsive Behavior', () => {
    it('renders desktop table view on large screens', () => {
      global.innerWidth = 1024;
      
      renderWithRouter(
        <UniversityComparison universities={mockUniversities} />
      );

      // Desktop view should have table structure
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles missing profile data gracefully', () => {
      const universitiesWithMissingData = [
        {
          id: 'test-uni',
          name: 'Test University',
          location: 'Test Location',
          established: 2020
        }
      ];

      renderWithRouter(
        <UniversityComparison universities={universitiesWithMissingData} />
      );

      expect(screen.getByText('Test University')).toBeInTheDocument();
      expect(screen.getAllByText('N/A').length).toBeGreaterThan(0);
    });

    it('handles missing rankings gracefully', () => {
      const universitiesWithoutRankings = [
        {
          id: 'test-uni',
          name: 'Test University',
          profile: {
            facilities: {}
          }
        }
      ];

      renderWithRouter(
        <UniversityComparison universities={universitiesWithoutRankings} />
      );

      expect(screen.getByText('Not Ranked')).toBeInTheDocument();
    });

    it('handles missing facilities gracefully', () => {
      const universitiesWithoutFacilities = [
        {
          id: 'test-uni',
          name: 'Test University',
          profile: {
            rankings: { nirf: '100' }
          }
        }
      ];

      renderWithRouter(
        <UniversityComparison universities={universitiesWithoutFacilities} />
      );

      expect(screen.getByText('Test University')).toBeInTheDocument();
    });
  });
});
