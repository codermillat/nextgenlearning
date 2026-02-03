import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CourseDetail from '../CourseDetail';

// Mock the DataContext
const mockGetProgramByUniversityAndCourse = vi.fn();
const mockGetUniversityBySlug = vi.fn();
const mockGetProgramsByUniversity = vi.fn();

vi.mock('../../context/DataContext', async () => {
  const actual = await vi.importActual('../../context/DataContext');
  return {
    ...actual,
    useData: () => ({
      getProgramByUniversityAndCourse: mockGetProgramByUniversityAndCourse,
      getUniversityBySlug: mockGetUniversityBySlug,
      getProgramsByUniversity: mockGetProgramsByUniversity,
      loading: false,
    }),
  };
});

// Mock analytics
vi.mock('../../utils/analytics', () => ({
  trackCourseView: vi.fn(),
}));

describe('CourseDetail - Meta Descriptions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display optimized meta description for B.Tech CSE at Sharda', async () => {
    const shardaUniversity = {
      id: 'sharda',
      name: 'Sharda University',
      shortName: 'Sharda',
      slug: 'sharda',
      location: 'Greater Noida, Uttar Pradesh, India',
      established: 2009,
      profile: {
        rankings: {
          nirf: '101-150',
          naac: 'A+',
        },
      },
      additionalFees: {
        oneTime: {
          amount: 35000,
        },
        recurring: {},
      },
    };

    const btechCSE = {
      id: 'btech-cse',
      name: 'B.Tech Computer Science and Engineering',
      degree: 'B.Tech',
      field: 'Engineering',
      duration: 4,
      slug: 'btech-cse',
      annualFees: [200000, 200000, 200000, 200000],
      scholarshipTiers: [
        { minGPA: 3.5, scholarship: 50 },
        { minGPA: 3.0, scholarship: 30 },
        { minGPA: 0, scholarship: 20 },
      ],
    };

    mockGetUniversityBySlug.mockReturnValue(shardaUniversity);
    mockGetProgramByUniversityAndCourse.mockReturnValue(btechCSE);
    mockGetProgramsByUniversity.mockReturnValue([btechCSE]);

    render(
      <MemoryRouter initialEntries={['/universities/sharda/courses/btech-cse']}>
        <Routes>
          <Route path="/universities/:universitySlug/courses/:courseSlug" element={<CourseDetail />} />
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
      expect(description).toMatch(/B\.Tech|CSE|Computer Science/i); // Course benefit
      expect(description).toMatch(/NIRF|ranking|Sharda/i); // Social proof
      expect(description).toMatch(/₹|fees/i); // Price
      expect(description).toMatch(/scholarship|apply|2026/i); // Urgency
      expect(description).toMatch(/apply|enroll/i); // CTA
      
      // Verify length constraint
      expect(description.length).toBeGreaterThan(0);
      expect(description.length).toBeLessThanOrEqual(160);
    });
  });

  it('should display optimized meta description for MBA at Galgotias', async () => {
    const galgotiasUniversity = {
      id: 'galgotias',
      name: 'Galgotias University',
      shortName: 'Galgotias',
      slug: 'galgotias',
      location: 'Greater Noida, Uttar Pradesh, India',
      established: 2011,
      profile: {
        rankings: {
          nirf: '151-200',
          naac: 'A+',
        },
      },
      additionalFees: {
        oneTime: {
          amount: 28000,
        },
        recurring: {},
      },
    };

    const mba = {
      id: 'mba',
      name: 'Master of Business Administration',
      degree: 'MBA',
      field: 'Management',
      duration: 2,
      slug: 'mba',
      annualFees: [150000, 150000],
      scholarshipTiers: [
        { minGPA: 0, scholarship: 50 },
      ],
    };

    mockGetUniversityBySlug.mockReturnValue(galgotiasUniversity);
    mockGetProgramByUniversityAndCourse.mockReturnValue(mba);
    mockGetProgramsByUniversity.mockReturnValue([mba]);

    render(
      <MemoryRouter initialEntries={['/universities/galgotias/courses/mba']}>
        <Routes>
          <Route path="/universities/:universitySlug/courses/:courseSlug" element={<CourseDetail />} />
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
      expect(description).toMatch(/MBA|Business|Management/i); // Course benefit
      expect(description).toMatch(/NIRF|ranking|Galgotias/i); // Social proof
      expect(description).toMatch(/₹|fees/i); // Price
      expect(description).toMatch(/scholarship|apply|2026/i); // Urgency
      expect(description).toMatch(/apply|enroll/i); // CTA
      
      // Verify length constraint
      expect(description.length).toBeGreaterThan(0);
      expect(description.length).toBeLessThanOrEqual(160);
    });
  });

  it('should display optimized meta description for BBA at NIU', async () => {
    const niuUniversity = {
      id: 'niu',
      name: 'Noida International University',
      shortName: 'NIU',
      slug: 'niu',
      location: 'Greater Noida, Uttar Pradesh, India',
      established: 2010,
      profile: {
        rankings: {
          nirf: '201-250',
          naac: 'A',
        },
      },
      additionalFees: {
        oneTime: {
          amount: 22000,
        },
        recurring: {},
      },
    };

    const bba = {
      id: 'bba',
      name: 'Bachelor of Business Administration',
      degree: 'BBA',
      field: 'Management',
      duration: 3,
      slug: 'bba',
      annualFees: [120000, 120000, 120000],
      scholarshipTiers: [
        { minGPA: 0, scholarship: 50 },
      ],
    };

    mockGetUniversityBySlug.mockReturnValue(niuUniversity);
    mockGetProgramByUniversityAndCourse.mockReturnValue(bba);
    mockGetProgramsByUniversity.mockReturnValue([bba]);

    render(
      <MemoryRouter initialEntries={['/universities/niu/courses/bba']}>
        <Routes>
          <Route path="/universities/:universitySlug/courses/:courseSlug" element={<CourseDetail />} />
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
      expect(description).toMatch(/BBA|Business/i); // Course benefit
      expect(description).toMatch(/NIRF|ranking|NIU|50%/i); // Social proof (NIU has 50% scholarship)
      expect(description).toMatch(/₹|fees/i); // Price
      expect(description).toMatch(/scholarship|apply|2026/i); // Urgency
      expect(description).toMatch(/apply|enroll/i); // CTA
      
      // Verify length constraint
      expect(description.length).toBeGreaterThan(0);
      expect(description.length).toBeLessThanOrEqual(160);
    });
  });
});
