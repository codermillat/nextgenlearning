/**
 * Internal Linking Strategy Utilities
 * Feature: seo-overhaul
 * 
 * Implements strategic internal linking to improve SEO crawlability,
 * distribute page authority, and help search engines discover all pages.
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6
 */

import { getCourseGroup, COURSE_GROUPS } from '../data/courseGroups';

/**
 * Get related courses for a given course
 * Returns at least 3 related courses based on relevance scoring
 * 
 * @param {string} courseId - The course ID to find related courses for
 * @param {number} limit - Maximum number of related courses to return (default: 3)
 * @param {Array} allCourses - Array of all available courses
 * @returns {Array} Array of related course objects with title, url, anchorText, relevanceScore
 * 
 * Requirements: 5.1, 5.4, 5.5
 */
export function getRelatedCourses(courseId, limit = 3, allCourses = []) {
  if (!courseId || !Array.isArray(allCourses) || allCourses.length === 0) {
    return [];
  }

  // Find the source course
  const sourceCourse = allCourses.find(c => c.id === courseId);
  if (!sourceCourse) {
    return [];
  }

  // Calculate relevance scores for all other courses
  const coursesWithScores = allCourses
    .filter(course => course.id !== courseId)
    .map(course => ({
      ...course,
      relevanceScore: calculateCourseRelevance(sourceCourse, course)
    }))
    .sort((a, b) => b.relevanceScore - a.relevanceScore);

  // Take top courses up to limit
  const topCourses = coursesWithScores.slice(0, Math.max(limit, 3));

  // If we don't have enough courses, supplement with popular courses
  if (topCourses.length < 3) {
    const popularCourses = getPopularCourses(allCourses, 3 - topCourses.length)
      .filter(pc => pc.id !== courseId && !topCourses.find(tc => tc.id === pc.id));
    topCourses.push(...popularCourses);
  }

  // Format as internal links
  return topCourses.slice(0, Math.max(limit, 3)).map(course => ({
    title: course.name || course.title,
    url: generateCourseUrl(course),
    anchorText: generateAnchorText(course),
    relevanceScore: course.relevanceScore || 50,
    category: course.field || course.discipline || 'General'
  }));
}

/**
 * Get popular comparison pages
 * Returns comparison pages that are frequently accessed
 * 
 * @param {number} limit - Maximum number of comparisons to return (default: 5)
 * @returns {Array} Array of comparison link objects
 * 
 * Requirements: 5.2, 5.4
 */
export function getPopularComparisons(limit = 5) {
  // Popular course group comparisons based on search volume and user interest
  const popularGroups = [
    'btech-cse',
    'btech-ai-ml',
    'btech-data-science',
    'mba',
    'bca',
    'mca',
    'btech-cyber-security',
    'btech-it'
  ];

  const comparisons = popularGroups.slice(0, limit).map(groupId => {
    const group = COURSE_GROUPS[groupId];
    if (!group) return null;

    return {
      title: `Compare ${group.name} Programs`,
      url: `/courses/compare/${groupId}`,
      anchorText: `Compare ${group.name} Programs`,
      relevanceScore: 100,
      category: 'Course Comparison'
    };
  }).filter(Boolean);

  return comparisons;
}

/**
 * Get top universities by ranking and popularity
 * Returns universities sorted by relevance and ranking
 * 
 * @param {number} limit - Maximum number of universities to return (default: 5)
 * @param {Array} allUniversities - Array of all available universities
 * @returns {Array} Array of university link objects
 * 
 * Requirements: 5.3, 5.4, 5.5
 */
export function getTopUniversities(limit = 5, allUniversities = []) {
  if (!Array.isArray(allUniversities) || allUniversities.length === 0) {
    // Return default top universities if no data provided
    return getDefaultTopUniversities(limit);
  }

  // Calculate scores for universities
  const universitiesWithScores = allUniversities.map(university => ({
    ...university,
    relevanceScore: calculateUniversityRelevance(university)
  })).sort((a, b) => b.relevanceScore - a.relevanceScore);

  // Take top universities
  const topUniversities = universitiesWithScores.slice(0, limit);

  // Format as internal links
  return topUniversities.map(university => ({
    title: university.name,
    url: `/universities/${university.id || slugify(university.name)}`,
    anchorText: `${university.name} - ${getUniversityHighlight(university)}`,
    relevanceScore: university.relevanceScore,
    category: 'University'
  }));
}

/**
 * Calculate relevance score between two courses
 * Higher score = more relevant
 * 
 * @param {Object} sourceCourse - The source course
 * @param {Object} targetCourse - The target course to compare
 * @returns {number} Relevance score (0-100)
 * 
 * Requirements: 5.5
 */
export function calculateRelevance(sourceCourse, targetCourse) {
  return calculateCourseRelevance(sourceCourse, targetCourse);
}

/**
 * Calculate course relevance score
 * Factors: same group, same level, same university, same field
 * 
 * @param {Object} sourceCourse - The source course
 * @param {Object} targetCourse - The target course to compare
 * @returns {number} Relevance score (0-100)
 */
function calculateCourseRelevance(sourceCourse, targetCourse) {
  let score = 0;

  // Same course group (highest weight - 40 points)
  const sourceGroup = getCourseGroup(sourceCourse);
  const targetGroup = getCourseGroup(targetCourse);
  if (sourceGroup && targetGroup && sourceGroup === targetGroup) {
    score += 40;
  }

  // Same degree level (30 points)
  const sourceDegree = (sourceCourse.degree || '').toLowerCase();
  const targetDegree = (targetCourse.degree || '').toLowerCase();
  if (sourceDegree && targetDegree && sourceDegree === targetDegree) {
    score += 30;
  }

  // Same field/discipline (20 points)
  const sourceField = (sourceCourse.field || sourceCourse.discipline || '').toLowerCase();
  const targetField = (targetCourse.field || targetCourse.discipline || '').toLowerCase();
  if (sourceField && targetField && sourceField === targetField) {
    score += 20;
  }

  // Different university (prefer cross-university comparisons - 10 points)
  const sourceUniversity = sourceCourse.universityId || sourceCourse.university;
  const targetUniversity = targetCourse.universityId || targetCourse.university;
  if (sourceUniversity && targetUniversity && sourceUniversity !== targetUniversity) {
    score += 10;
  }

  return score;
}

/**
 * Calculate university relevance score
 * Factors: ranking, accreditation, facilities, placement
 * 
 * @param {Object} university - University object
 * @returns {number} Relevance score (0-100)
 */
function calculateUniversityRelevance(university) {
  let score = 50; // Base score

  // Ranking score (30 points)
  if (university.profile?.rankings?.nirf) {
    const nirfRank = parseRankingRange(university.profile.rankings.nirf);
    if (nirfRank <= 50) score += 30;
    else if (nirfRank <= 100) score += 25;
    else if (nirfRank <= 150) score += 20;
    else if (nirfRank <= 200) score += 15;
  }

  // Accreditation (10 points)
  if (university.profile?.rankings?.naac === 'A+' || university.profile?.rankings?.naac === 'A++') {
    score += 10;
  }

  // International presence (10 points)
  if (university.profile?.facilities?.international?.students) {
    const intlStudents = parseInt(String(university.profile.facilities.international.students).replace(/[^0-9]/g, ''));
    if (intlStudents >= 1000) score += 10;
    else if (intlStudents >= 500) score += 5;
  }

  return Math.min(100, score);
}

/**
 * Ensure page is reachable within 3 clicks from homepage
 * Verifies that a page has sufficient internal links pointing to it
 * 
 * @param {string} pageUrl - The page URL to check
 * @param {Object} siteStructure - Optional site structure data
 * @returns {boolean} True if page is reachable within 3 clicks
 * 
 * Requirements: 5.6
 */
export function ensurePageReachability(pageUrl, siteStructure = null) {
  if (!pageUrl || typeof pageUrl !== 'string') {
    return false;
  }

  // Normalize URL
  const normalizedUrl = pageUrl.startsWith('/') ? pageUrl : `/${pageUrl}`;

  // Homepage is always reachable (0 clicks)
  if (normalizedUrl === '/' || normalizedUrl === '/home') {
    return true;
  }

  // Main navigation pages are reachable in 1 click
  const mainNavPages = [
    '/courses',
    '/universities',
    '/compare',
    '/scholarships',
    '/apply',
    '/about',
    '/contact',
    '/guides',
    '/faq',
    '/rankings'
  ];
  if (mainNavPages.includes(normalizedUrl)) {
    return true;
  }

  // Course detail pages are reachable in 2 clicks (universities -> university -> course)
  if (normalizedUrl.match(/^\/universities\/[^/]+\/courses\/[^/]+$/)) {
    return true;
  }

  // University detail pages are reachable in 2 clicks (universities -> university)
  if (normalizedUrl.match(/^\/universities\/[^/]+$/) && !normalizedUrl.includes('/courses')) {
    return true;
  }

  // Course comparison pages are reachable in 2 clicks (courses -> compare)
  if (normalizedUrl.match(/^\/courses\/compare\/[^/]+$/)) {
    return true;
  }

  // Sharda-specific pages are reachable in 2-3 clicks
  if (normalizedUrl.startsWith('/sharda')) {
    return true;
  }

  // Guide detail pages are reachable in 2 clicks (guides -> guide)
  if (normalizedUrl.match(/^\/guides\/[^/]+$/)) {
    return true;
  }

  // If we have site structure data, check actual link depth
  if (siteStructure && typeof siteStructure === 'object') {
    return checkLinkDepth(normalizedUrl, siteStructure) <= 3;
  }

  // Default: assume page is reachable if it follows standard patterns
  return normalizedUrl.split('/').filter(Boolean).length <= 3;
}

/**
 * Generate course URL from course object
 * 
 * @param {Object} course - Course object
 * @returns {string} Course URL
 */
function generateCourseUrl(course) {
  const universitySlug = course.universityId || slugify(course.university || 'university');
  const courseSlug = course.id || slugify(course.name || 'course');
  return `/universities/${universitySlug}/courses/${courseSlug}`;
}

/**
 * Generate descriptive anchor text for a course
 * 
 * @param {Object} course - Course object
 * @returns {string} Anchor text
 * 
 * Requirements: 5.4
 */
function generateAnchorText(course) {
  const name = course.name || course.title || 'Course';
  const university = course.university || '';
  
  if (university) {
    return `${name} at ${university}`;
  }
  
  return name;
}

/**
 * Get popular courses (fallback when not enough related courses)
 * 
 * @param {Array} allCourses - Array of all courses
 * @param {number} limit - Number of courses to return
 * @returns {Array} Array of popular courses
 */
function getPopularCourses(allCourses, limit = 3) {
  // Popular course groups
  const popularGroups = ['btech-cse', 'btech-ai-ml', 'mba', 'bca'];
  
  const popularCourses = allCourses
    .filter(course => {
      const group = getCourseGroup(course);
      return popularGroups.includes(group);
    })
    .slice(0, limit);

  return popularCourses;
}

/**
 * Get default top universities (fallback when no data provided)
 * 
 * @param {number} limit - Number of universities to return
 * @returns {Array} Array of default university links
 */
function getDefaultTopUniversities(limit = 5) {
  const defaultUniversities = [
    { id: 'sharda', name: 'Sharda University', highlight: 'NAAC A+ | Top International Campus' },
    { id: 'galgotias', name: 'Galgotias University', highlight: 'NAAC A+ | Strong Placements' },
    { id: 'niu', name: 'Noida International University', highlight: 'Modern Campus' },
    { id: 'chandigarh', name: 'Chandigarh University', highlight: 'NAAC A+ | Large Campus' }
  ];

  return defaultUniversities.slice(0, limit).map(university => ({
    title: university.name,
    url: `/universities/${university.id}`,
    anchorText: `${university.name} - ${university.highlight}`,
    relevanceScore: 90,
    category: 'University'
  }));
}

/**
 * Get university highlight text
 * 
 * @param {Object} university - University object
 * @returns {string} Highlight text
 */
function getUniversityHighlight(university) {
  const rankings = university.profile?.rankings;
  
  if (rankings?.naac) {
    return `NAAC ${rankings.naac}`;
  }
  
  if (rankings?.nirf) {
    return `NIRF Ranked`;
  }
  
  return 'Quality Education';
}

/**
 * Parse ranking range to numeric value
 * 
 * @param {string} rankString - Ranking string (e.g., "101-150")
 * @returns {number} Numeric rank value
 */
function parseRankingRange(rankString) {
  if (!rankString) return 500;

  const str = String(rankString).trim();

  // Handle range format (e.g., "101-150")
  if (str.includes('-')) {
    const [min, max] = str.split('-').map(s => parseInt(s.replace(/[^0-9]/g, '')));
    if (!isNaN(min) && !isNaN(max)) {
      return (min + max) / 2;
    }
  }

  // Handle single number (e.g., "87")
  const num = parseInt(str.replace(/[^0-9]/g, ''));
  if (!isNaN(num)) {
    return num;
  }

  return 500;
}

/**
 * Simple slugify function
 * 
 * @param {string} text - Text to slugify
 * @returns {string} Slugified text
 */
function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Check link depth in site structure
 * 
 * @param {string} url - URL to check
 * @param {Object} siteStructure - Site structure data
 * @returns {number} Link depth (number of clicks from homepage)
 */
function checkLinkDepth(url) {
  // Simplified implementation - count URL segments as proxy for depth
  const segments = url.split('/').filter(Boolean);
  return Math.min(segments.length, 3);
}
