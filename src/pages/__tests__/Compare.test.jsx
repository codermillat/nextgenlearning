import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Compare from '../Compare';
import { DataProvider } from '../../context/DataContext';

// Mock the analytics module
vi.mock('../../utils/analytics', () => ({
  trackComparison: vi.fn(),
  trackFilter: vi.fn(),
}));

// Mock the whatsappRedirect module
vi.mock('../../utils/whatsappRedirect', () => ({
  redirectToWhatsApp: vi.fn(),
  generateApplicationMessage: vi.fn(() => 'Test message'),
}));

// Mock university data
const mockUniversities = [
  {
    id: 'sharda',
    name: 'Sharda University',
    shortName: 'Sharda',
    profile: {
      rankings: {
        nirf: '101-150',
        naac: 'A+',
      },
      facilities: {
        campus: { size: '63 acres' },
        academic: { labs: true, library: true, industryPartnerships: true },
        placement: {
          rate: '91%',
          recruiters: '500+',
          packages: {
            highestDomestic: '45 LPA',
          },
          companies: ['Microsoft', 'Google', 'Amazon'],
        },
        international: {
          students: '2000+',
          support: ['Visa assistance', 'Airport pickup'],
        },
      },
    },
  },
  {
    id: 'niu',
    name: 'Noida International University',
    shortName: 'NIU',
    profile: {
      rankings: {
        nirf: '151-200',
        naac: 'A',
      },
      facilities: {
        campus: { size: '75 acres' },
        academic: { labs: true, library: true },
        placement: {
          rate: '85%',
          recruiters: '300+',
        },
        international: {
          students: '500+',
        },
      },
    },
  },
];

// Mock programs
const mockPrograms = [
  {
    id: 'sharda-btech-cse',
    name: 'B.Tech',
    specialization: 'Computer Science & Engineering',
    universityId: 'sharda',
    duration: 4,
    annualFees: [250000],
    degreeLevel: 'UG',
  },
  {
    id: 'niu-btech-cse',
    name: 'B.Tech',
    specialization: 'Computer Science & Engineering',
    universityId: 'niu',
    duration: 4,
    annualFees: [220000],
    degreeLevel: 'UG',
  },
];

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <DataProvider
        value={{
          universities: mockUniversities,
          allPrograms: mockPrograms,
          loading: false,
        }}
      >
        {component}
      </DataProvider>
    </BrowserRouter>
  );
};

describe('Compare Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the compare page with header', () => {
    const { container } = renderWithProviders(<Compare />);
    const html = container.innerHTML;
    
    expect(html).toContain('Compare Courses');
  });

  it('displays program selection dropdown', () => {
    const { container } = renderWithProviders(<Compare />);
    
    const selectElement = container.querySelector('select#program-select');
    expect(selectElement).toBeTruthy();
  });

  it('shows empty state when no programs selected', () => {
    const { container } = renderWithProviders(<Compare />);
    const html = container.innerHTML;
    
    expect(html).toContain('Select programs from the dropdown above to start comparing');
  });

  it('displays FAQ section', () => {
    const { container } = renderWithProviders(<Compare />);
    const html = container.innerHTML;
    
    expect(html).toContain('Frequently Asked Questions');
  });

  it('renders course filters', () => {
    const { container } = renderWithProviders(<Compare />);
    
    // The CourseFilters component should be rendered
    const selectElement = container.querySelector('select#program-select');
    expect(selectElement).toBeTruthy();
  });
});
