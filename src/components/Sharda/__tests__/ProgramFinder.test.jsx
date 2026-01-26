/**
 * Unit Tests for ProgramFinder Component
 * Feature: sharda-university-content-enhancement
 * 
 * Tests specific examples, edge cases, and user interactions
 * for the ProgramFinder component.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ProgramFinder from '../ProgramFinder';
import { shardaPrograms } from '../../../data/shardaData';

// Mock the conversion event logger
vi.mock('../../../utils/conversionEventLogger', () => ({
  logProgramView: vi.fn(),
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Helper to render component with router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ProgramFinder Component - Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the component with header', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      expect(screen.getByText('Find Your Perfect Program')).toBeInTheDocument();
      expect(screen.getByText(/Filter programs by discipline/i)).toBeInTheDocument();
    });

    it('renders search input', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const searchInput = screen.getByTestId('search-input');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('placeholder', expect.stringContaining('Search'));
    });

    it('renders all filter sections', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      expect(screen.getByText('Discipline')).toBeInTheDocument();
      expect(screen.getByText('Degree Level')).toBeInTheDocument();
      expect(screen.getByText('Fee Range')).toBeInTheDocument();
    });

    it('displays all programs initially', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      expect(screen.getByTestId('results-count')).toHaveTextContent(`${shardaPrograms.length} programs found`);
    });

    it('renders program cards with all required information', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const firstProgram = shardaPrograms[0];
      expect(screen.getByText(firstProgram.name)).toBeInTheDocument();
      expect(screen.getAllByText(firstProgram.discipline).length).toBeGreaterThan(0);
      expect(screen.getAllByText(firstProgram.duration).length).toBeGreaterThan(0);
    });
  });

  describe('Discipline Filter', () => {
    it('filters programs by single discipline', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const engineeringButton = screen.getByTestId('discipline-engineering');
      fireEvent.click(engineeringButton);
      
      const engineeringPrograms = shardaPrograms.filter(p => p.discipline === 'Engineering');
      expect(screen.getByTestId('results-count')).toHaveTextContent(`${engineeringPrograms.length} programs found`);
    });

    it('filters programs by multiple disciplines (OR operation)', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const engineeringButton = screen.getByTestId('discipline-engineering');
      const managementButton = screen.getByTestId('discipline-management');
      
      fireEvent.click(engineeringButton);
      fireEvent.click(managementButton);
      
      const filteredPrograms = shardaPrograms.filter(
        p => p.discipline === 'Engineering' || p.discipline === 'Management'
      );
      expect(screen.getByTestId('results-count')).toHaveTextContent(`${filteredPrograms.length} programs found`);
    });

    it('toggles discipline filter on/off', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const engineeringButton = screen.getByTestId('discipline-engineering');
      
      // Click to select
      fireEvent.click(engineeringButton);
      expect(engineeringButton).toHaveClass('bg-blue-600');
      
      // Click again to deselect
      fireEvent.click(engineeringButton);
      expect(engineeringButton).toHaveClass('bg-gray-100');
      expect(screen.getByTestId('results-count')).toHaveTextContent(`${shardaPrograms.length} programs found`);
    });
  });

  describe('Degree Level Filter', () => {
    it('filters programs by undergraduate level', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const undergraduateButton = screen.getByTestId('level-undergraduate');
      fireEvent.click(undergraduateButton);
      
      const undergraduatePrograms = shardaPrograms.filter(p => p.level === 'undergraduate');
      expect(screen.getByTestId('results-count')).toHaveTextContent(`${undergraduatePrograms.length} programs found`);
    });

    it('filters programs by postgraduate level', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const postgraduateButton = screen.getByTestId('level-postgraduate');
      fireEvent.click(postgraduateButton);
      
      const postgraduatePrograms = shardaPrograms.filter(p => p.level === 'postgraduate');
      const expectedText = postgraduatePrograms.length === 1 ? '1 program found' : `${postgraduatePrograms.length} programs found`;
      expect(screen.getByTestId('results-count')).toHaveTextContent(expectedText);
    });

    it('filters programs by multiple levels', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const undergraduateButton = screen.getByTestId('level-undergraduate');
      const postgraduateButton = screen.getByTestId('level-postgraduate');
      
      fireEvent.click(undergraduateButton);
      fireEvent.click(postgraduateButton);
      
      const filteredPrograms = shardaPrograms.filter(
        p => p.level === 'undergraduate' || p.level === 'postgraduate'
      );
      expect(screen.getByTestId('results-count')).toHaveTextContent(`${filteredPrograms.length} programs found`);
    });
  });

  describe('Fee Range Filter', () => {
    it('filters programs by fee range', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const feeRangeSelect = screen.getByTestId('fee-range-select');
      fireEvent.change(feeRangeSelect, { target: { value: 'Under 5 Lakhs' } });
      
      const filteredPrograms = shardaPrograms.filter(p => p.fees.total < 500000);
      expect(screen.getByTestId('results-count')).toHaveTextContent(`${filteredPrograms.length} program`);
    });

    it('filters programs by high fee range', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const feeRangeSelect = screen.getByTestId('fee-range-select');
      fireEvent.change(feeRangeSelect, { target: { value: '10-15 Lakhs' } });
      
      const filteredPrograms = shardaPrograms.filter(
        p => p.fees.total >= 1000000 && p.fees.total < 1500000
      );
      expect(screen.getByTestId('results-count')).toHaveTextContent(`${filteredPrograms.length} program`);
    });

    it('resets fee filter when selecting "All Fee Ranges"', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const feeRangeSelect = screen.getByTestId('fee-range-select');
      
      // Select a range
      fireEvent.change(feeRangeSelect, { target: { value: 'Under 5 Lakhs' } });
      
      // Reset to all
      fireEvent.change(feeRangeSelect, { target: { value: '' } });
      
      expect(screen.getByTestId('results-count')).toHaveTextContent(`${shardaPrograms.length} programs found`);
    });
  });

  describe('Keyword Search', () => {
    it('searches programs by name', async () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'Computer Science' } });
      
      await waitFor(() => {
        const csePrograms = shardaPrograms.filter(p => 
          p.name.toLowerCase().includes('computer science')
        );
        expect(screen.getByTestId('results-count')).toHaveTextContent(`${csePrograms.length} program`);
      }, { timeout: 600 });
    });

    it('searches programs by code', async () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'MBA' } });
      
      await waitFor(() => {
        const mbaPrograms = shardaPrograms.filter(p => 
          p.code.toLowerCase().includes('mba')
        );
        expect(screen.getByTestId('results-count')).toHaveTextContent(`${mbaPrograms.length} program`);
      }, { timeout: 600 });
    });

    it('searches programs by curriculum', async () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'Machine Learning' } });
      
      await waitFor(() => {
        const mlPrograms = shardaPrograms.filter(p => 
          p.curriculum?.some(item => item.toLowerCase().includes('machine learning'))
        );
        expect(screen.getByTestId('results-count')).toHaveTextContent(`${mlPrograms.length} program`);
      }, { timeout: 600 });
    });

    it('is case-insensitive', async () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'CSE' } });
      
      await waitFor(() => {
        const csePrograms = shardaPrograms.filter(p => 
          p.name.toLowerCase().includes('cse') ||
          p.code.toLowerCase().includes('cse') ||
          p.discipline.toLowerCase().includes('cse')
        );
        const expectedText = csePrograms.length === 1 ? '1 program found' : `${csePrograms.length} programs found`;
        expect(screen.getByTestId('results-count')).toHaveTextContent(expectedText);
      }, { timeout: 600 });
    });

    it('debounces search input', async () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const searchInput = screen.getByTestId('search-input');
      
      // Type multiple characters quickly
      fireEvent.change(searchInput, { target: { value: 'C' } });
      fireEvent.change(searchInput, { target: { value: 'CS' } });
      fireEvent.change(searchInput, { target: { value: 'CSE' } });
      
      // Should still show all programs immediately (debouncing)
      expect(screen.getByTestId('results-count')).toHaveTextContent(`${shardaPrograms.length} programs found`);
      
      // After debounce delay, should show filtered results
      await waitFor(() => {
        const filteredCount = shardaPrograms.filter(p => 
          p.name.toLowerCase().includes('cse') ||
          p.code.toLowerCase().includes('cse') ||
          p.discipline.toLowerCase().includes('cse')
        ).length;
        const expectedText = filteredCount === 1 ? '1 program found' : `${filteredCount} programs found`;
        expect(screen.getByTestId('results-count')).toHaveTextContent(expectedText);
      }, { timeout: 600 });
    });
  });

  describe('Multi-Filter Logic (AND Operation)', () => {
    it('applies discipline AND level filters together', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const engineeringButton = screen.getByTestId('discipline-engineering');
      const undergraduateButton = screen.getByTestId('level-undergraduate');
      
      fireEvent.click(engineeringButton);
      fireEvent.click(undergraduateButton);
      
      const filteredPrograms = shardaPrograms.filter(
        p => p.discipline === 'Engineering' && p.level === 'undergraduate'
      );
      expect(screen.getByTestId('results-count')).toHaveTextContent(`${filteredPrograms.length} program`);
    });

    it('applies discipline AND fee range filters together', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const engineeringButton = screen.getByTestId('discipline-engineering');
      const feeRangeSelect = screen.getByTestId('fee-range-select');
      
      fireEvent.click(engineeringButton);
      fireEvent.change(feeRangeSelect, { target: { value: '10-15 Lakhs' } });
      
      const filteredPrograms = shardaPrograms.filter(
        p => p.discipline === 'Engineering' && 
             p.fees.total >= 1000000 && 
             p.fees.total < 1500000
      );
      expect(screen.getByTestId('results-count')).toHaveTextContent(`${filteredPrograms.length} program`);
    });

    it('applies all filters together (discipline, level, fee, search)', async () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const engineeringButton = screen.getByTestId('discipline-engineering');
      const undergraduateButton = screen.getByTestId('level-undergraduate');
      const feeRangeSelect = screen.getByTestId('fee-range-select');
      const searchInput = screen.getByTestId('search-input');
      
      fireEvent.click(engineeringButton);
      fireEvent.click(undergraduateButton);
      fireEvent.change(feeRangeSelect, { target: { value: '10-15 Lakhs' } });
      fireEvent.change(searchInput, { target: { value: 'CSE' } });
      
      await waitFor(() => {
        const filteredPrograms = shardaPrograms.filter(p => {
          const disciplineMatch = p.discipline === 'Engineering';
          const levelMatch = p.level === 'undergraduate';
          const feeMatch = p.fees.total >= 1000000 && p.fees.total < 1500000;
          const searchMatch = p.name.toLowerCase().includes('cse') || 
                            p.code.toLowerCase().includes('cse');
          return disciplineMatch && levelMatch && feeMatch && searchMatch;
        });
        expect(screen.getByTestId('results-count')).toHaveTextContent(`${filteredPrograms.length} program`);
      }, { timeout: 600 });
    });
  });

  describe('Clear Filters', () => {
    it('shows clear filters button when filters are active', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      // Initially no clear button
      expect(screen.queryByTestId('clear-filters')).not.toBeInTheDocument();
      
      // Apply a filter
      const engineeringButton = screen.getByTestId('discipline-engineering');
      fireEvent.click(engineeringButton);
      
      // Clear button should appear
      expect(screen.getByTestId('clear-filters')).toBeInTheDocument();
    });

    it('clears all filters when clicked', async () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      // Apply multiple filters
      const engineeringButton = screen.getByTestId('discipline-engineering');
      const undergraduateButton = screen.getByTestId('level-undergraduate');
      const feeRangeSelect = screen.getByTestId('fee-range-select');
      const searchInput = screen.getByTestId('search-input');
      
      fireEvent.click(engineeringButton);
      fireEvent.click(undergraduateButton);
      fireEvent.change(feeRangeSelect, { target: { value: '10-15 Lakhs' } });
      fireEvent.change(searchInput, { target: { value: 'Computer' } });
      
      // Clear all filters
      const clearButton = screen.getByTestId('clear-filters');
      fireEvent.click(clearButton);
      
      // Should show all programs
      await waitFor(() => {
        expect(screen.getByTestId('results-count')).toHaveTextContent(`${shardaPrograms.length} programs found`);
      });
      
      // All filter buttons should be deselected
      expect(engineeringButton).toHaveClass('bg-gray-100');
      expect(undergraduateButton).toHaveClass('bg-gray-100');
      expect(feeRangeSelect).toHaveValue('');
      expect(searchInput).toHaveValue('');
    });
  });

  describe('No Results State', () => {
    it('shows no results message when no programs match filters', async () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'NonExistentProgram12345' } });
      
      await waitFor(() => {
        expect(screen.getByTestId('no-results')).toBeInTheDocument();
        expect(screen.getByText('No programs found')).toBeInTheDocument();
        expect(screen.getByText(/Try adjusting your filters/i)).toBeInTheDocument();
      }, { timeout: 600 });
    });

    it('shows clear filters button in no results state', async () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'NonExistentProgram' } });
      
      await waitFor(() => {
        expect(screen.getByTestId('no-results')).toBeInTheDocument();
        const clearButtons = screen.getAllByText(/Clear all filters/i);
        expect(clearButtons.length).toBeGreaterThan(0);
      }, { timeout: 600 });
    });
  });

  describe('Program Selection and Navigation', () => {
    it('navigates to program detail page when program is clicked', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const firstProgram = shardaPrograms[0];
      const programCard = screen.getByTestId(`program-card-${firstProgram.id}`);
      
      fireEvent.click(programCard);
      
      expect(mockNavigate).toHaveBeenCalledWith(`/sharda/programs/${firstProgram.id}`);
    });
  });

  describe('Program Card Display', () => {
    it('displays program name, discipline, level, and duration', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const firstProgram = shardaPrograms[0];
      expect(screen.getByText(firstProgram.name)).toBeInTheDocument();
      expect(screen.getAllByText(firstProgram.discipline).length).toBeGreaterThan(0);
      expect(screen.getAllByText(firstProgram.duration).length).toBeGreaterThan(0);
    });

    it('displays fee information', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      // Check that fee information is displayed (formatted as currency)
      expect(screen.getAllByText('Total Program Fee').length).toBeGreaterThan(0);
    });

    it('displays key subjects from curriculum', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const programWithCurriculum = shardaPrograms.find(p => p.curriculum && p.curriculum.length > 0);
      if (programWithCurriculum) {
        expect(screen.getAllByText('Key Subjects:').length).toBeGreaterThan(0);
      }
    });

    it('displays specializations if available', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const programWithSpecializations = shardaPrograms.find(p => p.specializations && p.specializations.length > 0);
      if (programWithSpecializations) {
        expect(screen.getAllByText('Specializations:').length).toBeGreaterThan(0);
      }
    });

    it('displays accreditation badge if available', () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const programWithAccreditation = shardaPrograms.find(p => p.accreditation);
      if (programWithAccreditation) {
        expect(screen.getAllByText(programWithAccreditation.accreditation).length).toBeGreaterThan(0);
      }
    });
  });

  describe('Edge Cases', () => {
    it('handles empty programs array', () => {
      renderWithRouter(<ProgramFinder programs={[]} />);
      
      expect(screen.getByTestId('results-count')).toHaveTextContent('0 programs found');
      expect(screen.getByTestId('no-results')).toBeInTheDocument();
    });

    it('handles programs without curriculum', () => {
      const programsWithoutCurriculum = shardaPrograms.map(p => ({
        ...p,
        curriculum: undefined,
      }));
      
      renderWithRouter(<ProgramFinder programs={programsWithoutCurriculum} />);
      
      expect(screen.getByTestId('results-count')).toHaveTextContent(`${programsWithoutCurriculum.length} programs found`);
    });

    it('handles programs without specializations', () => {
      const programsWithoutSpecializations = shardaPrograms.map(p => ({
        ...p,
        specializations: undefined,
      }));
      
      renderWithRouter(<ProgramFinder programs={programsWithoutSpecializations} />);
      
      expect(screen.getByTestId('results-count')).toHaveTextContent(`${programsWithoutSpecializations.length} programs found`);
    });

    it('handles programs without accreditation', () => {
      const programsWithoutAccreditation = shardaPrograms.map(p => ({
        ...p,
        accreditation: undefined,
      }));
      
      renderWithRouter(<ProgramFinder programs={programsWithoutAccreditation} />);
      
      expect(screen.getByTestId('results-count')).toHaveTextContent(`${programsWithoutAccreditation.length} programs found`);
    });

    it('handles whitespace-only search input', async () => {
      renderWithRouter(<ProgramFinder programs={shardaPrograms} />);
      
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: '   ' } });
      
      await waitFor(() => {
        expect(screen.getByTestId('results-count')).toHaveTextContent(`${shardaPrograms.length} programs found`);
      }, { timeout: 600 });
    });
  });

  describe('Custom Filter Configuration', () => {
    it('uses custom disciplines from filter config', () => {
      const customFilters = {
        disciplines: ['Custom1', 'Custom2'],
        levels: ['undergraduate'],
        feeRanges: [{ label: 'Test Range', min: 0, max: 1000000 }],
      };
      
      renderWithRouter(<ProgramFinder programs={shardaPrograms} filters={customFilters} />);
      
      expect(screen.getByText('Custom1')).toBeInTheDocument();
      expect(screen.getByText('Custom2')).toBeInTheDocument();
    });

    it('uses custom fee ranges from filter config', () => {
      const customFilters = {
        feeRanges: [
          { label: 'Budget', min: 0, max: 300000 },
          { label: 'Premium', min: 300000, max: Infinity },
        ],
      };
      
      renderWithRouter(<ProgramFinder programs={shardaPrograms} filters={customFilters} />);
      
      const feeRangeSelect = screen.getByTestId('fee-range-select');
      expect(feeRangeSelect).toBeInTheDocument();
      
      // Check that custom options are present
      fireEvent.click(feeRangeSelect);
      expect(screen.getByText('Budget')).toBeInTheDocument();
      expect(screen.getByText('Premium')).toBeInTheDocument();
    });
  });
});
