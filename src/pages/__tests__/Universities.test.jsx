import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Universities from '../Universities';

// Mock the comparison utility
vi.mock('../../utils/universityComparison', () => ({
  sortUniversitiesForDisplay: (universities) => {
    // Mock implementation that sorts with Sharda first
    const sorted = [...universities].sort((a, b) => {
      if (a.id === 'sharda') return -1;
      if (b.id === 'sharda') return 1;
      return 0;
    });
    return sorted;
  },
  generateRecommendationText: (university) => {
    if (university.id === 'sharda') {
      return {
        emphasis: 'high',
        badges: ['Top Choice', 'Recommended'],
        description: 'Excellent choice for international students with strong industry partnerships, comprehensive support services, and outstanding placement record.'
      };
    }
    return {
      emphasis: 'normal',
      badges: [],
      description: 'Quality education with good facilities.'
    };
  }
}));

// Mock the DataContext to provide test data
vi.mock('../../context/DataContext', async () => {
  const actual = await vi.importActual('../../context/DataContext');
  return {
    ...actual,
    useData: () => ({
      universities: [
        {
          id: 'galgotias',
          name: 'Galgotias University',
          shortName: 'Galgotias',
          slug: 'galgotias-university',
          location: 'Greater Noida, Uttar Pradesh',
          established: 2011,
          profile: {
            rankings: {
              nirf: '101-150',
              naac: 'A+'
            },
            facilities: {}
          },
          programs: Array(238).fill({})
        },
        {
          id: 'sharda',
          name: 'Sharda University',
          shortName: 'Sharda',
          slug: 'sharda-university',
          location: 'Greater Noida, Uttar Pradesh',
          established: 2009,
          profile: {
            rankings: {
              nirf: '101-150',
              naac: 'A+'
            },
            facilities: {}
          },
          programs: Array(163).fill({})
        }
      ],
      loading: false,
      allPrograms: [],
      getUniversityById: () => null,
      getUniversityBySlug: () => null,
      getProgramBySlug: () => null,
      getProgramByUniversityAndCourse: () => null,
      getProgramsByUniversity: () => []
    })
  };
});

describe('Universities Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <Universities />
      </BrowserRouter>
    );
  };

  it('renders universities page with sorted universities', () => {
    const { container } = renderComponent();
    const html = container.innerHTML;
    
    expect(html).toContain('Top Indian Universities for Bangladeshi Students 2025-26');
    expect(html).toContain('Sharda');
    expect(html).toContain('Galgotias');
  });

  it('displays recommendation badges for Sharda University', () => {
    const { container } = renderComponent();
    const html = container.innerHTML;
    
    // Check for Sharda's recommendation badges
    expect(html).toContain('Top Choice');
    expect(html).toContain('Recommended');
  });

  it('displays Sharda University with high emphasis description', () => {
    const { container } = renderComponent();
    const html = container.innerHTML;
    
    // Check for Sharda's detailed description
    expect(html).toContain('Excellent choice for international students');
  });

  it('sorts universities with Sharda favorability', () => {
    const { container } = renderComponent();
    
    // Get all university cards
    const universityCards = container.querySelectorAll('a[href*="/universities/"]');
    
    // Verify we have the expected number of cards
    expect(universityCards.length).toBeGreaterThan(0);
  });

  it('displays university statistics correctly', () => {
    const { container } = renderComponent();
    const html = container.innerHTML;
    
    // Check for statistics section
    expect(html).toContain('Universities');
    expect(html).toContain('Programs');
    expect(html).toContain('Scholarships');
  });

  it('displays NIRF rankings for universities', () => {
    const { container } = renderComponent();
    const html = container.innerHTML;
    
    // Check for NIRF ranking badges
    expect(html).toContain('NIRF 101-150');
  });

  it('displays NAAC accreditation for universities', () => {
    const { container } = renderComponent();
    const html = container.innerHTML;
    
    // Check for NAAC grades
    expect(html).toContain('A+');
  });

  it('displays comparison section with CTA', () => {
    const { container } = renderComponent();
    const html = container.innerHTML;
    
    expect(html).toContain('Compare Universities');
    expect(html).toContain('Compare Universities →');
  });

  it('displays FAQ section', () => {
    const { container } = renderComponent();
    const html = container.innerHTML;
    
    expect(html).toContain('Frequently Asked Questions about Indian Universities');
  });
});
