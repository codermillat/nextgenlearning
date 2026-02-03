import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from '../Home';
import UniversityDetail from '../UniversityDetail';
import CourseDetail from '../CourseDetail';
import { DataProvider } from '../../context/DataContext';

// Mock the DataContext
vi.mock('../../context/DataContext', async () => {
  const actual = await vi.importActual('../../context/DataContext');
  return {
    ...actual,
    useData: () => ({
      getUniversityBySlug: (slug) => {
        if (slug === 'sharda-university') {
          return {
            id: 'sharda',
            name: 'Sharda University',
            shortName: 'Sharda',
            slug: 'sharda-university',
            location: 'Greater Noida, NCR',
            established: '2009',
            profile: {
              rankings: {
                nirf: '101-150',
                naac: 'A+',
              },
              highlights: ['Modern campus', 'Industry partnerships'],
            },
          };
        }
        return null;
      },
      getProgramByUniversityAndCourse: (uniSlug, courseSlug) => {
        if (uniSlug === 'sharda-university' && courseSlug === 'btech-cse') {
          return {
            id: 'btech-cse-sharda',
            name: 'B.Tech Computer Science Engineering',
            slug: 'btech-cse',
            degree: 'B.Tech',
            duration: 4,
            field: 'Engineering',
            fees: {
              tuition: 300000,
              oneTime: 50000,
              other: 10000,
            },
            scholarships: [
              { gpa: 3.5, percent: 50 },
              { gpa: 3.0, percent: 30 },
              { gpa: 2.5, percent: 20 },
            ],
          };
        }
        return null;
      },
      getProgramsByUniversity: () => [],
      loading: false,
    }),
  };
});

// Mock calculateTotalFees utility
vi.mock('../../utils/rankings', () => ({
  calculateTotalFees: () => ({
    baseTotal: 1200000,
    totalAfterScholarship: 600000,
    grandTotal: 650000,
    oneTimeFees: 50000,
    scholarshipPercent: 50,
  }),
}));

// Mock DetailedFeeBreakdown to avoid complex fee calculation issues
vi.mock('../../components/Course/DetailedFeeBreakdown', () => ({
  default: () => <div data-testid="fee-breakdown">Fee Breakdown</div>,
}));

// Mock CourseReview
vi.mock('../../components/Course/CourseReview', () => ({
  default: () => <div data-testid="course-review">Course Review</div>,
}));

// Mock CurriculumStructure
vi.mock('../../components/Course/CurriculumStructure', () => ({
  default: () => <div data-testid="curriculum">Curriculum</div>,
}));

// Helper to render with router
const renderWithRouter = (component) => {
  return render(
    <MemoryRouter>
      <DataProvider>{component}</DataProvider>
    </MemoryRouter>
  );
};

describe('UrgencyBanner Integration Tests', () => {
  describe('Homepage Integration', () => {
    it('should display urgency banner on homepage', () => {
      renderWithRouter(<Home />);
      
      // Check for urgency banner presence
      const urgencyBanner = screen.queryByTestId('urgency-banner');
      expect(urgencyBanner).toBeInTheDocument();
    });

    it('should display homepage variant urgency banner', () => {
      renderWithRouter(<Home />);
      
      const urgencyBanner = screen.queryByTestId('urgency-banner');
      expect(urgencyBanner).toHaveAttribute('data-variant', 'homepage');
    });

    it('should display deadline information on homepage', () => {
      renderWithRouter(<Home />);
      
      // Check for deadline text
      const deadlineText = screen.queryByTestId('deadline-text');
      expect(deadlineText).toBeInTheDocument();
    });

    it('should display CTA button on homepage urgency banner', () => {
      renderWithRouter(<Home />);
      
      const ctaButton = screen.queryByTestId('urgency-cta');
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveTextContent(/apply/i);
    });
  });

  describe('University Detail Page Integration', () => {
    it('should display urgency banner on university detail page', () => {
      render(
        <MemoryRouter initialEntries={['/universities/sharda-university']}>
          <DataProvider>
            <Routes>
              <Route path="/universities/:universitySlug" element={<UniversityDetail />} />
            </Routes>
          </DataProvider>
        </MemoryRouter>
      );
      
      const urgencyBanner = screen.queryByTestId('urgency-banner');
      expect(urgencyBanner).toBeInTheDocument();
    });

    it('should display university variant urgency banner', () => {
      render(
        <MemoryRouter initialEntries={['/universities/sharda-university']}>
          <DataProvider>
            <Routes>
              <Route path="/universities/:universitySlug" element={<UniversityDetail />} />
            </Routes>
          </DataProvider>
        </MemoryRouter>
      );
      
      const urgencyBanner = screen.queryByTestId('urgency-banner');
      expect(urgencyBanner).toHaveAttribute('data-variant', 'university');
    });

    it('should display relevant urgency information for university', () => {
      render(
        <MemoryRouter initialEntries={['/universities/sharda-university']}>
          <DataProvider>
            <Routes>
              <Route path="/universities/:universitySlug" element={<UniversityDetail />} />
            </Routes>
          </DataProvider>
        </MemoryRouter>
      );
      
      // Check that urgency banner has either deadline or seats info
      const urgencyBanner = screen.queryByTestId('urgency-banner');
      expect(urgencyBanner).toBeInTheDocument();
      
      // Should have either deadline or seats text
      const hasDeadline = screen.queryByTestId('deadline-text');
      const hasSeats = screen.queryByTestId('seats-text');
      
      expect(hasDeadline || hasSeats).toBeTruthy();
    });

    it('should display CTA button on university urgency banner', () => {
      render(
        <MemoryRouter initialEntries={['/universities/sharda-university']}>
          <DataProvider>
            <Routes>
              <Route path="/universities/:universitySlug" element={<UniversityDetail />} />
            </Routes>
          </DataProvider>
        </MemoryRouter>
      );
      
      const ctaButton = screen.queryByTestId('urgency-cta');
      expect(ctaButton).toBeInTheDocument();
    });
  });

  describe('Course Detail Page Integration', () => {
    it('should display urgency banner on course detail page', () => {
      render(
        <MemoryRouter initialEntries={['/universities/sharda-university/courses/btech-cse']}>
          <DataProvider>
            <Routes>
              <Route path="/universities/:universitySlug/courses/:courseSlug" element={<CourseDetail />} />
            </Routes>
          </DataProvider>
        </MemoryRouter>
      );
      
      const urgencyBanner = screen.queryByTestId('urgency-banner');
      expect(urgencyBanner).toBeInTheDocument();
    });

    it('should display course variant urgency banner', () => {
      render(
        <MemoryRouter initialEntries={['/universities/sharda-university/courses/btech-cse']}>
          <DataProvider>
            <Routes>
              <Route path="/universities/:universitySlug/courses/:courseSlug" element={<CourseDetail />} />
            </Routes>
          </DataProvider>
        </MemoryRouter>
      );
      
      const urgencyBanner = screen.queryByTestId('urgency-banner');
      expect(urgencyBanner).toHaveAttribute('data-variant', 'course');
    });

    it('should display relevant urgency information for course', () => {
      render(
        <MemoryRouter initialEntries={['/universities/sharda-university/courses/btech-cse']}>
          <DataProvider>
            <Routes>
              <Route path="/universities/:universitySlug/courses/:courseSlug" element={<CourseDetail />} />
            </Routes>
          </DataProvider>
        </MemoryRouter>
      );
      
      // Check that urgency banner has either deadline or seats info
      const urgencyBanner = screen.queryByTestId('urgency-banner');
      expect(urgencyBanner).toBeInTheDocument();
      
      // Should have either deadline or seats text
      const hasDeadline = screen.queryByTestId('deadline-text');
      const hasSeats = screen.queryByTestId('seats-text');
      
      expect(hasDeadline || hasSeats).toBeTruthy();
    });

    it('should display CTA button on course urgency banner', () => {
      render(
        <MemoryRouter initialEntries={['/universities/sharda-university/courses/btech-cse']}>
          <DataProvider>
            <Routes>
              <Route path="/universities/:universitySlug/courses/:courseSlug" element={<CourseDetail />} />
            </Routes>
          </DataProvider>
        </MemoryRouter>
      );
      
      const ctaButton = screen.queryByTestId('urgency-cta');
      expect(ctaButton).toBeInTheDocument();
    });
  });
});
