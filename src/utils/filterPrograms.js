import { getDegreeLevel } from './courseGrouping';

/**
 * Filter programs based on filter criteria
 */
export function filterPrograms(programs, filters) {
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
      const universityName = (program.university?.name || '').toLowerCase();
      
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

  return filtered;
}

