import { useState, useMemo } from 'react';
import { getDegreeLevel } from '../../utils/courseGrouping';

/**
 * Course Filters Component
 * Allows filtering by degree level, university, stream/department, and search
 */
export default function CourseFilters({ 
  allPrograms, 
  universities, 
  filters, 
  onFiltersChange 
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get unique values for filters
  const filterOptions = useMemo(() => {
    const degreeLevels = new Set();
    const fields = new Set();
    const universityIds = new Set();

    allPrograms.forEach(program => {
      const level = getDegreeLevel(program);
      // Map to user-friendly labels
      if (level === 'graduate') degreeLevels.add('UG (Undergraduate)');
      else if (level === 'pg') degreeLevels.add('PG (Postgraduate)');
      else if (level === 'diploma') degreeLevels.add('Diploma');
      else if (level === 'lateral') degreeLevels.add('Lateral Entry');
      
      if (program.field) fields.add(program.field);
      if (program.universityId) universityIds.add(program.universityId);
    });

    return {
      degreeLevels: Array.from(degreeLevels).sort(),
      fields: Array.from(fields).sort(),
      universityIds: Array.from(universityIds)
    };
  }, [allPrograms]);

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters };
    
    if (filterType === 'degreeLevel') {
      newFilters.degreeLevel = value === 'all' ? '' : value;
    } else if (filterType === 'university') {
      newFilters.universityId = value === 'all' ? '' : value;
    } else if (filterType === 'field') {
      newFilters.field = value === 'all' ? '' : value;
    } else if (filterType === 'search') {
      newFilters.search = value;
    }
    
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    onFiltersChange({
      degreeLevel: '',
      universityId: '',
      field: '',
      search: ''
    });
  };

  const activeFiltersCount = Object.values(filters).filter(v => v !== '').length;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filter Courses</h3>
        <div className="flex items-center gap-3">
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear All ({activeFiltersCount})
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-gray-600 hover:text-gray-800 md:hidden"
            aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
          >
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${isExpanded ? 'grid' : 'hidden md:grid'}`}>
        {/* Search */}
        <div className="lg:col-span-4">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Course
          </label>
          <input
            type="text"
            id="search"
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search by course name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
          />
        </div>

        {/* Degree Level Filter */}
        <div>
          <label htmlFor="degreeLevel" className="block text-sm font-medium text-gray-700 mb-2">
            Degree Level
          </label>
          <select
            id="degreeLevel"
            value={filters.degreeLevel || 'all'}
            onChange={(e) => handleFilterChange('degreeLevel', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
          >
            <option value="all">All Levels</option>
            {filterOptions.degreeLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* University Filter */}
        <div>
          <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-2">
            University
          </label>
          <select
            id="university"
            value={filters.universityId || 'all'}
            onChange={(e) => handleFilterChange('university', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
          >
            <option value="all">All Universities</option>
            {filterOptions.universityIds.map(uniId => {
              const uni = universities.find(u => u.id === uniId);
              return uni ? (
                <option key={uniId} value={uniId}>{uni.shortName || uni.name}</option>
              ) : null;
            })}
          </select>
        </div>

        {/* Stream/Department Filter */}
        <div>
          <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-2">
            Stream/Department
          </label>
          <select
            id="field"
            value={filters.field || 'all'}
            onChange={(e) => handleFilterChange('field', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
          >
            <option value="all">All Streams</option>
            {filterOptions.fields.map(field => (
              <option key={field} value={field}>{field}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

