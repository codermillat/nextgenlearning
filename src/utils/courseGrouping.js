import { COURSE_GROUPS, getCourseGroup } from '../data/courseGroups';

/**
 * Determine the degree level category for a program
 * Categories: 'graduate', 'pg', 'diploma', 'lateral'
 */
export function getDegreeLevel(program) {
  const degree = (program.degree || '').toLowerCase();
  const name = (program.name || '').toLowerCase();
  const specialization = (program.specialization || '').toLowerCase();
  const searchText = `${degree} ${name} ${specialization}`;

  // Check for Lateral Entry first (most specific)
  if (degree.includes('lateral') || searchText.includes('lateral entry') || searchText.includes('lateral')) {
    return 'lateral';
  }

  // Check for Diploma
  if (degree.includes('diploma') || degree === 'd.pharm' || degree === 'd.pharm' || 
      name.includes('diploma') || specialization.includes('diploma')) {
    return 'diploma';
  }

  // Check for Post Graduate (Master's level)
  if (degree.startsWith('m.') || degree.startsWith('master') || 
      degree === 'mba' || degree === 'mca' || degree === 'mpt' || 
      degree === 'mph' || degree === 'mpharm' || degree === 'pharm.d' ||
      degree === 'llm' || degree === 'mfa' || degree === 'mdes' ||
      degree.includes('post graduate') || degree.includes('pg')) {
    return 'pg';
  }

  // Check for PhD
  if (degree.includes('ph.d') || degree.includes('phd') || degree === 'ph.d.') {
    return 'pg'; // PhD is also post-graduate level
  }

  // Everything else is Graduate (Bachelor's level)
  // B.Tech, BBA, BCA, B.Sc, B.Com, B.Arch, BPT, B.Pharm, BA, etc.
  return 'graduate';
}

/**
 * Group programs by course groups
 */
export function groupProgramsByCourseType(programs) {
  const grouped = {};

  programs.forEach(program => {
    const groupId = getCourseGroup(program);
    if (groupId) {
      if (!grouped[groupId]) {
        grouped[groupId] = [];
      }
      grouped[groupId].push(program);
    }
  });

  return grouped;
}

/**
 * Get programs for a specific course group, filtered by degree level
 * Only compares programs of the same level (Graduate vs Graduate, PG vs PG, etc.)
 */
export function getProgramsForGroup(programs, groupId) {
  const groupPrograms = programs.filter(p => getCourseGroup(p) === groupId);
  
  if (groupPrograms.length === 0) {
    return [];
  }

  // Determine the most common degree level in this group
  const levelCounts = {};
  groupPrograms.forEach(program => {
    const level = getDegreeLevel(program);
    levelCounts[level] = (levelCounts[level] || 0) + 1;
  });

  // Find the dominant level (most common)
  const dominantLevel = Object.keys(levelCounts).reduce((a, b) => 
    levelCounts[a] > levelCounts[b] ? a : b
  );

  // Filter to only include programs of the dominant level
  // This ensures Graduate vs Graduate, PG vs PG, Diploma vs Diploma, Lateral vs Lateral
  return groupPrograms.filter(p => getDegreeLevel(p) === dominantLevel);
}

/**
 * Get course group info
 */
export function getCourseGroupInfo(groupId) {
  return COURSE_GROUPS[groupId] || null;
}

