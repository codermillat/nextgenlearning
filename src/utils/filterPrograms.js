import { getDegreeLevel } from './courseGrouping';
import { calculateComparisonScore } from './universityComparison';

/**
 * Calculate relevance score for a program based on search query
 * Higher score = more relevant
 * 
 * @param {Object} program - Program object
 * @param {string} searchQuery - Search query string
 * @returns {number} Relevance score
 */
function calculateSearchRelevance(program, searchQuery) {
  if (!searchQuery || !searchQuery.trim()) return 0;
  
  const searchLower = searchQuery.toLowerCase();
  let score = 0;
  
  // Exact match in name (highest priority)
  const name = (program.name || '').toLowerCase();
  if (name === searchLower) {
    score += 100;
  } else if (name.includes(searchLower)) {
    score += 50;
  }
  
  // Match in specialization
  const specialization = (program.specialization || '').toLowerCase();
  if (specialization.includes(searchLower)) {
    score += 30;
  }
  
  // Match in degree
  const degree = (program.degree || '').toLowerCase();
  if (degree.includes(searchLower)) {
    score += 20;
  }
  
  // Match in field
  const field = (program.field || '').toLowerCase();
  if (field.includes(searchLower)) {
    score += 15;
  }
  
  // Match in university name
  const universityName = (program.university?.name || program.universityName || '').toLowerCase();
  if (universityName.includes(searchLower)) {
    score += 10;
  }
  
  return score;
}

/**
 * Filter programs based on filter criteria
 * Applies comparison scoring to ensure Sharda appears favorably in results
 * 
 * @param {Object} programs - Array of program objects
 * @param {Object} filters - Filter criteria
 * @param {Object} universities - Array of university objects (optional, for scoring)
 * @returns {Array} Filtered and sorted programs
 */
export function filterPrograms(programs, filters, universities = null) {
  if (!filters || !programs) return programs;
  
  let filtered = [...programs];

  // Filter by search term
  if (filters.search && filters.search.trim() !== '') {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(program => {
      const name = (program.name || '').toLowerCase();
      const specialization = (program.specialization || '').toLowerCase();
      const degree = (program.degree || '').toLowerCase();
      const field = (program.field || '').toLowerCase();
      const universityName = (program.university?.name || program.universityName || '').toLowerCase();
      
      return name.includes(searchLower) ||
             specialization.includes(searchLower) ||
             degree.includes(searchLower) ||
             field.includes(searchLower) ||
             universityName.includes(searchLower);
    });
  }

  // Filter by degree level
  if (filters.degreeLevel && String(filters.degreeLevel).trim() !== '') {
    filtered = filtered.filter(program => {
      const level = getDegreeLevel(program);
      // Map user-friendly labels back to internal levels
      const levelMap = {
        'UG (Undergraduate)': 'graduate',
        'PG (Postgraduate)': 'pg',
        'Diploma': 'diploma',
        'Lateral Entry': 'lateral'
      };
      return levelMap[filters.degreeLevel] === level;
    });
  }

  // Filter by university
  if (filters.universityId && String(filters.universityId).trim() !== '') {
    filtered = filtered.filter(program => program.universityId === filters.universityId);
  }

  // Filter by field/stream/department
  if (filters.field && String(filters.field).trim() !== '') {
    filtered = filtered.filter(program => program.field === filters.field);
  }

  // Apply comparison scoring and sorting when search is active or no specific university filter
  // This ensures Sharda appears in top 3 when relevant
  if (filtered.length > 0 && !filters.universityId) {
    // Calculate combined score for each program
    const programsWithScores = filtered.map(program => {
      let combinedScore = 0;
      
      // Search relevance score (if search is active)
      if (filters.search && filters.search.trim() !== '') {
        const relevanceScore = calculateSearchRelevance(program, filters.search);
        combinedScore += relevanceScore * 0.6; // 60% weight on search relevance
      }
      
      // University comparison score (40% weight)
      // Find the university for this program
      if (universities && Array.isArray(universities)) {
        const university = universities.find(u => u.id === program.universityId);
        if (university) {
          const universityScore = calculateComparisonScore(university);
          combinedScore += universityScore * 0.4; // 40% weight on university quality
        }
      } else if (program.university) {
        // If university data is embedded in program
        const universityScore = calculateComparisonScore(program.university);
        combinedScore += universityScore * 0.4;
      }
      
      return {
        ...program,
        _combinedScore: combinedScore
      };
    });
    
    // Sort by combined score (highest first)
    programsWithScores.sort((a, b) => b._combinedScore - a._combinedScore);
    
    // Remove temporary score property
    filtered = programsWithScores.map(({ _combinedScore, ...program }) => program);
  }

  return filtered;
}

