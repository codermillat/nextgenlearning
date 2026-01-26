import { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { logProgramView } from '../../utils/conversionEventLogger';

/**
 * ProgramFinder Component
 * Feature: sharda-university-content-enhancement
 * 
 * Interactive program finder with multi-filter search functionality.
 * Allows filtering by discipline, degree level, fee range, and keyword search.
 * Implements debounced search and displays filtered results with program details.
 * 
 * Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7
 * 
 * @param {Object} props - Component props
 * @param {Array} props.programs - Array of program objects
 * @param {Object} props.filters - Filter configuration with disciplines, levels, and fee ranges
 * @param {string} [props.className] - Additional CSS classes
 */
const ProgramFinder = ({ programs = [], filters = {}, className = '' }) => {
  const navigate = useNavigate();

  // Default filter configuration
  const defaultFilters = {
    disciplines: ['Engineering', 'Management', 'Medical', 'Arts', 'Commerce', 'Science'],
    levels: ['undergraduate', 'postgraduate', 'doctoral'],
    feeRanges: [
      { label: 'Under 5 Lakhs', min: 0, max: 500000 },
      { label: '5-10 Lakhs', min: 500000, max: 1000000 },
      { label: '10-15 Lakhs', min: 1000000, max: 1500000 },
      { label: 'Above 15 Lakhs', min: 1500000, max: Infinity },
    ],
  };

  const filterConfig = { ...defaultFilters, ...filters };

  // State management
  const [selectedDisciplines, setSelectedDisciplines] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedFeeRange, setSelectedFeeRange] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search keyword (500ms delay)
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedKeyword(searchKeyword);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchKeyword]);

  // Filter programs based on all criteria (AND operation)
  const filteredPrograms = useMemo(() => {
    let results = [...programs];

    // Filter by disciplines
    if (selectedDisciplines.length > 0) {
      results = results.filter(program =>
        selectedDisciplines.includes(program.discipline)
      );
    }

    // Filter by degree levels
    if (selectedLevels.length > 0) {
      results = results.filter(program =>
        selectedLevels.includes(program.level)
      );
    }

    // Filter by fee range
    if (selectedFeeRange) {
      const feeRange = filterConfig.feeRanges.find(range => range.label === selectedFeeRange);
      if (feeRange) {
        results = results.filter(program => {
          const totalFee = program.fees.total;
          return totalFee >= feeRange.min && totalFee < feeRange.max;
        });
      }
    }

    // Filter by keyword search (searches in name, code, and curriculum)
    if (debouncedKeyword.trim()) {
      const keyword = debouncedKeyword.toLowerCase().trim();
      results = results.filter(program => {
        const nameMatch = program.name.toLowerCase().includes(keyword);
        const codeMatch = program.code.toLowerCase().includes(keyword);
        const curriculumMatch = program.curriculum?.some(item =>
          item.toLowerCase().includes(keyword)
        );
        const disciplineMatch = program.discipline.toLowerCase().includes(keyword);
        
        return nameMatch || codeMatch || curriculumMatch || disciplineMatch;
      });
    }

    return results;
  }, [programs, selectedDisciplines, selectedLevels, selectedFeeRange, debouncedKeyword, filterConfig.feeRanges]);

  // Handle discipline filter toggle
  const handleDisciplineToggle = useCallback((discipline) => {
    setSelectedDisciplines(prev =>
      prev.includes(discipline)
        ? prev.filter(d => d !== discipline)
        : [...prev, discipline]
    );
  }, []);

  // Handle level filter toggle
  const handleLevelToggle = useCallback((level) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  }, []);

  // Handle fee range selection
  const handleFeeRangeChange = useCallback((e) => {
    setSelectedFeeRange(e.target.value);
  }, []);

  // Handle search input
  const handleSearchChange = useCallback((e) => {
    setSearchKeyword(e.target.value);
  }, []);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setSelectedDisciplines([]);
    setSelectedLevels([]);
    setSelectedFeeRange('');
    setSearchKeyword('');
    setDebouncedKeyword('');
  }, []);

  // Handle program selection
  const handleProgramClick = useCallback((program) => {
    // Log program view
    logProgramView({
      programId: program.id,
      programName: program.name,
      discipline: program.discipline,
      level: program.level,
      source: 'program-finder',
    });

    // Navigate to program detail page
    navigate(`/sharda/programs/${program.id}`);
  }, [navigate]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format level for display
  const formatLevel = (level) => {
    const levelMap = {
      undergraduate: 'Undergraduate',
      postgraduate: 'Postgraduate',
      doctoral: 'Doctoral',
    };
    return levelMap[level] || level;
  };

  // Check if any filters are active
  const hasActiveFilters = selectedDisciplines.length > 0 || 
                          selectedLevels.length > 0 || 
                          selectedFeeRange || 
                          debouncedKeyword.trim();

  return (
    <div className={`bg-white rounded-xl shadow-2xl overflow-hidden ${className}`} data-testid="program-finder">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Find Your Perfect Program
        </h2>
        <p className="text-blue-100">
          Filter programs by discipline, level, fees, or search by keyword
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {/* Search Box */}
        <div className="mb-6">
          <label htmlFor="program-search" className="block text-sm font-semibold text-gray-700 mb-2">
            Search Programs
          </label>
          <div className="relative">
            <input
              id="program-search"
              type="text"
              value={searchKeyword}
              onChange={handleSearchChange}
              placeholder="Search by program name, code, or subject..."
              className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              data-testid="search-input"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {isSearching && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>
        </div>

        {/* Filters Section */}
        <div className="space-y-6 mb-6">
          {/* Discipline Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Discipline</h3>
            <div className="flex flex-wrap gap-2" data-testid="discipline-filters">
              {filterConfig.disciplines.map(discipline => (
                <button
                  key={discipline}
                  onClick={() => handleDisciplineToggle(discipline)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedDisciplines.includes(discipline)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid={`discipline-${discipline.toLowerCase()}`}
                >
                  {discipline}
                </button>
              ))}
            </div>
          </div>

          {/* Degree Level Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Degree Level</h3>
            <div className="flex flex-wrap gap-2" data-testid="level-filters">
              {filterConfig.levels.map(level => (
                <button
                  key={level}
                  onClick={() => handleLevelToggle(level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedLevels.includes(level)
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid={`level-${level}`}
                >
                  {formatLevel(level)}
                </button>
              ))}
            </div>
          </div>

          {/* Fee Range Filter */}
          <div>
            <label htmlFor="fee-range-select" className="block text-sm font-semibold text-gray-700 mb-2">
              Fee Range
            </label>
            <select
              id="fee-range-select"
              value={selectedFeeRange}
              onChange={handleFeeRangeChange}
              className="w-full sm:w-auto px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-900"
              data-testid="fee-range-select"
            >
              <option value="">All Fee Ranges</option>
              {filterConfig.feeRanges.map(range => (
                <option key={range.label} value={range.label}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div>
              <button
                onClick={handleClearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                data-testid="clear-filters"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 pb-4 border-b-2 border-gray-200">
          <p className="text-gray-700 font-medium" data-testid="results-count">
            {filteredPrograms.length} {filteredPrograms.length === 1 ? 'program' : 'programs'} found
          </p>
        </div>

        {/* Results Section */}
        <div className="space-y-4" data-testid="program-results">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map(program => (
              <div
                key={program.id}
                onClick={() => handleProgramClick(program)}
                className="border-2 border-gray-200 rounded-lg p-4 sm:p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                data-testid={`program-card-${program.id}`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  {/* Program Info */}
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {program.name}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {program.discipline}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {formatLevel(program.level)}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {program.duration}
                      </span>
                    </div>

                    {/* Key Highlights */}
                    {program.curriculum && program.curriculum.length > 0 && (
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Key Subjects:</span>{' '}
                          {program.curriculum.slice(0, 3).join(', ')}
                          {program.curriculum.length > 3 && '...'}
                        </p>
                      </div>
                    )}

                    {/* Specializations */}
                    {program.specializations && program.specializations.length > 0 && (
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Specializations:</span>{' '}
                          {program.specializations.join(', ')}
                        </p>
                      </div>
                    )}

                    {/* Accreditation */}
                    {program.accreditation && (
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{program.accreditation}</span>
                      </div>
                    )}
                  </div>

                  {/* Fee Info */}
                  <div className="sm:text-right">
                    <p className="text-sm text-gray-600 mb-1">Total Program Fee</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(program.fees.total)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatCurrency(program.fees.tuitionPerYear)}/year
                    </p>
                  </div>
                </div>

                {/* View Details Arrow */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Click to view full details</span>
                  <svg
                    className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))
          ) : (
            /* No Results State */
            <div className="text-center py-12" data-testid="no-results">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No programs found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search terms
              </p>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ProgramFinder.propTypes = {
  programs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    discipline: PropTypes.string.isRequired,
    level: PropTypes.oneOf(['undergraduate', 'postgraduate', 'doctoral']).isRequired,
    duration: PropTypes.string.isRequired,
    fees: PropTypes.shape({
      tuitionPerYear: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    }).isRequired,
    curriculum: PropTypes.arrayOf(PropTypes.string),
    specializations: PropTypes.arrayOf(PropTypes.string),
    accreditation: PropTypes.string,
  })).isRequired,
  filters: PropTypes.shape({
    disciplines: PropTypes.arrayOf(PropTypes.string),
    levels: PropTypes.arrayOf(PropTypes.string),
    feeRanges: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
    })),
  }),
  className: PropTypes.string,
};

export default ProgramFinder;
