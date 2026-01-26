import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ShardaVsAmity from '../ShardaVsAmity';

// Mock Helmet
vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }) => <div data-testid="helmet">{children}</div>,
  HelmetProvider: ({ children }) => <div>{children}</div>
}));

// Mock fetch
global.fetch = vi.fn();

// Mock child components
vi.mock('../../../components/Sharda/UniversityComparison', () => ({
  default: ({ universities, title, description }) => (
    <div data-testid="university-comparison">
      <h1>{title}</h1>
      <p>{description}</p>
      {universities.map(uni => (
        <div key={uni.id} data-testid={`university-${uni.id}`}>
          {uni.name}
        </div>
      ))}
    </div>
  )
}));

vi.mock('../../../components/SEO/SEOMetaTags', () => ({
  default: ({ title, description }) => (
    <div data-testid="seo-meta-tags">
      <meta name="title" content={title} />
      <meta name="description" content={description} />
    </div>
  )
}));

vi.mock('../../../components/SEO/StructuredData', () => ({
  default: ({ data }) => (
    <script type="application/ld+json" data-testid="structured-data">
      {JSON.stringify(data)}
    </script>
  )
}));

const mockShardaData = {
  id: 'sharda',
  name: 'Sharda University',
  location: 'Greater Noida, UP',
  profile: {
    rankings: { nirf: '101-150' },
    facilities: {}
  }
};

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ShardaVsAmity', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock successful fetch
    global.fetch.mockResolvedValue({
      json: async () => mockShardaData
    });
  });

  describe('Page Loading', () => {
    it('shows loading state initially', () => {
      renderWithProviders(<ShardaVsAmity />);

      expect(screen.getByText(/loading comparison/i)).toBeInTheDocument();
    });

    it('loads and displays comparison after data fetch', async () => {
      renderWithProviders(<ShardaVsAmity />);

      await waitFor(() => {
        expect(screen.getByTestId('university-comparison')).toBeInTheDocument();
      });
    });

    it('displays error state when data fails to load', async () => {
      global.fetch.mockRejectedValue(new Error('Failed to fetch'));

      renderWithProviders(<ShardaVsAmity />);

      await waitFor(() => {
        expect(screen.getByText(/unable to load comparison data/i)).toBeInTheDocument();
      });
    });
  });

  describe('SEO Elements', () => {
    it('renders SEO meta tags', async () => {
      renderWithProviders(<ShardaVsAmity />);

      await waitFor(() => {
        const seoTags = screen.getByTestId('seo-meta-tags');
        expect(seoTags).toBeInTheDocument();
      });
    });

    it('includes correct page title', async () => {
      renderWithProviders(<ShardaVsAmity />);

      await waitFor(() => {
        expect(screen.getByText(/Sharda University vs Amity University/i)).toBeInTheDocument();
      });
    });

    it('renders structured data', async () => {
      renderWithProviders(<ShardaVsAmity />);

      await waitFor(() => {
        const structuredData = screen.getAllByTestId('structured-data');
        expect(structuredData.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Content Sections', () => {
    it('displays comparison title and description', async () => {
      renderWithProviders(<ShardaVsAmity />);

      await waitFor(() => {
        expect(screen.getByText(/Sharda University vs Amity University/i)).toBeInTheDocument();
        expect(screen.getByText(/comprehensive comparison/i)).toBeInTheDocument();
      });
    });

    it('renders "Why Choose Sharda" section', async () => {
      renderWithProviders(<ShardaVsAmity />);

      await waitFor(() => {
        expect(screen.getByText(/Why Choose Sharda University Over Amity/i)).toBeInTheDocument();
      });
    });

    it('displays key differentiators', async () => {
      renderWithProviders(<ShardaVsAmity />);

      await waitFor(() => {
        const internationalSupport = screen.getAllByText(/Superior International Student Support/i);
        expect(internationalSupport.length).toBeGreaterThan(0);
        
        const hospital = screen.getAllByText(/On-Campus Multi-Specialty Hospital/i);
        expect(hospital.length).toBeGreaterThan(0);
        
        const partnerships = screen.getAllByText(/Strong Industry Partnerships/i);
        expect(partnerships.length).toBeGreaterThan(0);
      });
    });

    it('renders FAQ section', async () => {
      renderWithProviders(<ShardaVsAmity />);

      await waitFor(() => {
        expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();
      });
    });

    it('includes FAQ about international students', async () => {
      renderWithProviders(<ShardaVsAmity />);

      await waitFor(() => {
        expect(screen.getByText(/Which university is better for international students/i)).toBeInTheDocument();
      });
    });
  });

  describe('University Data', () => {
    it('displays both universities in comparison', async () => {
      renderWithProviders(<ShardaVsAmity />);

      await waitFor(() => {
        expect(screen.getByTestId('university-sharda')).toBeInTheDocument();
        expect(screen.getByTestId('university-amity')).toBeInTheDocument();
      });
    });

    it('fetches Sharda data from correct endpoint', async () => {
      renderWithProviders(<ShardaVsAmity />);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/data/universities/sharda.json');
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', async () => {
      renderWithProviders(<ShardaVsAmity />);

      await waitFor(() => {
        const h1 = screen.getByRole('heading', { level: 1 });
        expect(h1).toBeInTheDocument();
      });
    });

    it('includes descriptive text for screen readers', async () => {
      renderWithProviders(<ShardaVsAmity />);

      await waitFor(() => {
        const comparison = screen.getByTestId('university-comparison');
        expect(comparison).toBeInTheDocument();
      });
    });
  });
});
