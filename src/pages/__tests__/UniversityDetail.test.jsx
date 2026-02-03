import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import UniversityDetail from '../UniversityDetail';
import { DataProvider } from '../../context/DataContext';

// Mock the DataContext
const mockGetUniversityBySlug = vi.fn();
const mockGetProgramsByUniversity = vi.fn();

vi.mock('../../context/DataContext', async () => {
  const actual = await vi.importActual('../../context/DataContext');
  return {
    ...actual,
    useData: () => ({
      getUniversityBySlug: mockGetUniversityBySlug,
      getProgramsByUniversity: mockGetProgramsByUniversity,
      loading: false,
    }),
  };
});

describe('UniversityDetail - Meta Descriptions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display optimized meta description for Sharda University', async () => {
    const shardaUniversity = {
      id: 'sharda',
      name: 'Sharda University',
      shortName: 'Sharda',
      location: 'Greater Noida, Uttar Pradesh, India',
      established: 2009,
      profile: {
        rankings: {
          nirf: '101-150',
          naac: 'A+',
        },
        highlights: [
          '63-acre modern campus',
          'NIRF 2025 Rank: 87th in Universities Category',
        ],
      },
    };

    const programs = [
      { id: 'btech-cse', name: 'B.Tech CSE', degree: 'B.Tech', duration: 4, slug: 'btech-cse' },
      { id: 'btech-aiml', name: 'B.Tech AI/ML', degree: 'B.Tech', duration: 4, slug: 'btech-aiml' },
    ];

    mockGetUniversityBySlug.mockReturnValue(shardaUniversity);
    mockGetProgramsByUniversity.mockReturnValue(programs);

    render(
      <MemoryRouter initialEntries={['/universities/sharda']}>
        <Routes>
          <Route path="/universities/:universitySlug" element={<UniversityDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      // Check that meta description is set in the document
      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription).toBeTruthy();
      
      const description = metaDescription?.getAttribute('content');
      expect(description).toBeTruthy();
      
      // Verify meta description contains key elements for Sharda
      expect(description).toContain('🎓'); // Emoji
      expect(description).toMatch(/NIRF|ranking|101-150/i); // Social proof
      expect(description).toMatch(/₹|fees/i); // Price
      expect(description).toMatch(/scholarship|20-50%/i); // Urgency/benefit
      expect(description).toMatch(/apply|enroll/i); // CTA
      
      // Verify length constraint (should be optimized, typically 155-160 but can be shorter if all elements fit)
      expect(description.length).toBeGreaterThan(0);
      expect(description.length).toBeLessThanOrEqual(160);
    });
  });

  it('should display optimized meta description for Galgotias University', async () => {
    const galgotiasUniversity = {
      id: 'galgotias',
      name: 'Galgotias University',
      shortName: 'Galgotias',
      location: 'Greater Noida, Uttar Pradesh, India',
      established: 2011,
      profile: {
        rankings: {
          nirf: '151-200',
          naac: 'A+',
        },
        highlights: ['Modern campus', 'Industry partnerships'],
      },
    };

    const programs = [
      { id: 'btech-cse', name: 'B.Tech CSE', degree: 'B.Tech', duration: 4, slug: 'btech-cse' },
    ];

    mockGetUniversityBySlug.mockReturnValue(galgotiasUniversity);
    mockGetProgramsByUniversity.mockReturnValue(programs);

    render(
      <MemoryRouter initialEntries={['/universities/galgotias']}>
        <Routes>
          <Route path="/universities/:universitySlug" element={<UniversityDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription).toBeTruthy();
      
      const description = metaDescription?.getAttribute('content');
      expect(description).toBeTruthy();
      
      // Verify meta description contains key elements
      expect(description).toContain('🎓'); // Emoji
      expect(description).toMatch(/NIRF|ranking|151-200/i); // Social proof
      expect(description).toMatch(/₹|fees/i); // Price
      expect(description).toMatch(/scholarship/i); // Benefit
      expect(description).toMatch(/apply|enroll/i); // CTA
      
      // Verify length constraint
      expect(description.length).toBeGreaterThan(0);
      expect(description.length).toBeLessThanOrEqual(160);
    });
  });

  it('should display optimized meta description for NIU', async () => {
    const niuUniversity = {
      id: 'niu',
      name: 'Noida International University',
      shortName: 'NIU',
      location: 'Greater Noida, Uttar Pradesh, India',
      established: 2010,
      profile: {
        rankings: {
          nirf: '201-250',
          naac: 'A',
        },
        highlights: ['75-acre campus', 'International collaborations'],
      },
    };

    const programs = [
      { id: 'btech-cse', name: 'B.Tech CSE', degree: 'B.Tech', duration: 4, slug: 'btech-cse' },
    ];

    mockGetUniversityBySlug.mockReturnValue(niuUniversity);
    mockGetProgramsByUniversity.mockReturnValue(programs);

    render(
      <MemoryRouter initialEntries={['/universities/niu']}>
        <Routes>
          <Route path="/universities/:universitySlug" element={<UniversityDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription).toBeTruthy();
      
      const description = metaDescription?.getAttribute('content');
      expect(description).toBeTruthy();
      
      // Verify meta description contains key elements
      expect(description).toContain('🎓'); // Emoji
      expect(description).toMatch(/NIRF|ranking|201-250/i); // Social proof
      expect(description).toMatch(/₹|fees|50%/i); // Price/scholarship
      expect(description).toMatch(/scholarship/i); // Benefit
      expect(description).toMatch(/apply|enroll/i); // CTA
      
      // Verify length constraint
      expect(description.length).toBeGreaterThan(0);
      expect(description.length).toBeLessThanOrEqual(160);
    });
  });

  it('should display optimized meta description for Chandigarh University', async () => {
    const chandigarhUniversity = {
      id: 'chandigarh',
      name: 'Chandigarh University',
      shortName: 'CU',
      location: 'Mohali, Punjab, India',
      established: 2012,
      profile: {
        rankings: {
          nirf: '101-150',
          naac: 'A+',
        },
        highlights: ['200-acre campus', 'QS ranked'],
      },
    };

    const programs = [
      { id: 'btech-cse', name: 'B.Tech CSE', degree: 'B.Tech', duration: 4, slug: 'btech-cse' },
    ];

    mockGetUniversityBySlug.mockReturnValue(chandigarhUniversity);
    mockGetProgramsByUniversity.mockReturnValue(programs);

    render(
      <MemoryRouter initialEntries={['/universities/chandigarh']}>
        <Routes>
          <Route path="/universities/:universitySlug" element={<UniversityDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription).toBeTruthy();
      
      const description = metaDescription?.getAttribute('content');
      expect(description).toBeTruthy();
      
      // Verify meta description contains key elements
      expect(description).toContain('🎓'); // Emoji
      expect(description).toMatch(/NIRF|ranking|101-150/i); // Social proof
      expect(description).toMatch(/₹|fees/i); // Price
      expect(description).toMatch(/scholarship|35-50%/i); // Benefit
      expect(description).toMatch(/apply|enroll/i); // CTA
      
      // Verify length constraint
      expect(description.length).toBeGreaterThan(0);
      expect(description.length).toBeLessThanOrEqual(160);
    });
  });
});
