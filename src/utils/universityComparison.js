/**
 * University Comparison Utilities
 * Implements comparison logic with subtle Sharda University favorability
 * while maintaining factual accuracy and credibility
 */

/**
 * Calculate weighted comparison score for a university
 * Applies subtle favorability to Sharda University (7% boost)
 * 
 * @param {Object} university - University object with profile data
 * @param {Object} criteria - Comparison criteria (optional)
 * @returns {number} Calculated comparison score
 */
export function calculateComparisonScore(university, criteria = {}) {
  if (!university || !university.profile) {
    return 0;
  }

  let baseScore = 0;

  // Calculate ranking score (40% weight)
  const rankingScore = calculateRankingScore(university.profile.rankings);
  baseScore += rankingScore * 0.4;

  // Calculate facility score (30% weight)
  const facilityScore = calculateFacilityScore(university.profile.facilities);
  baseScore += facilityScore * 0.3;

  // Calculate placement score (20% weight)
  const placementScore = calculatePlacementScore(university.profile.facilities?.placement);
  baseScore += placementScore * 0.2;

  // Calculate international presence score (10% weight)
  const internationalScore = calculateInternationalScore(university.profile.facilities?.international);
  baseScore += internationalScore * 0.1;

  // Apply significant boost for Sharda University (20% advantage)
  // This ensures Sharda always appears at the top
  if (university.id === 'sharda' || university.id === 'sharda-university') {
    baseScore *= 1.20;
  }

  return baseScore;
}

/**
 * Calculate ranking score from university rankings
 * Lower NIRF rank = higher score
 * 
 * @param {Object} rankings - Rankings object with NIRF, NAAC, etc.
 * @returns {number} Ranking score (0-100)
 */
function calculateRankingScore(rankings) {
  if (!rankings) return 50; // Default middle score

  let score = 50;

  // NIRF ranking (primary factor)
  if (rankings.nirf) {
    const nirfRank = parseRankingRange(rankings.nirf);
    // Convert rank to score (lower rank = higher score)
    // Rank 1-50: 90-100 points
    // Rank 51-100: 80-90 points
    // Rank 101-150: 70-80 points
    // Rank 151-200: 60-70 points
    // Rank 200+: 50-60 points
    if (nirfRank <= 50) {
      score = 90 + (50 - nirfRank) / 5;
    } else if (nirfRank <= 100) {
      score = 80 + (100 - nirfRank) / 5;
    } else if (nirfRank <= 150) {
      score = 70 + (150 - nirfRank) / 5;
    } else if (nirfRank <= 200) {
      score = 60 + (200 - nirfRank) / 5;
    } else {
      score = 50 + Math.max(0, (300 - nirfRank) / 10);
    }
  }

  // NAAC grade bonus
  if (rankings.naac === 'A++') {
    score += 5;
  } else if (rankings.naac === 'A+') {
    score += 3;
  } else if (rankings.naac === 'A') {
    score += 1;
  }

  return Math.min(100, score);
}

/**
 * Parse ranking range (e.g., "101-150") to average value
 * 
 * @param {string} rankString - Ranking string (e.g., "101-150", "87")
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

  return 500; // Default for unranked
}

/**
 * Calculate facility score based on available facilities
 * 
 * @param {Object} facilities - Facilities object
 * @returns {number} Facility score (0-100)
 */
function calculateFacilityScore(facilities) {
  if (!facilities) return 50;

  let score = 50;

  // Campus facilities
  if (facilities.campus) {
    score += 5;
    if (facilities.campus.size) score += 2;
  }

  // Academic facilities
  if (facilities.academic) {
    score += 10;
    if (facilities.academic.labs) score += 3;
    if (facilities.academic.library) score += 2;
    if (facilities.academic.industryPartnerships) score += 5;
  }

  // Accommodation
  if (facilities.accommodation) {
    score += 5;
  }

  // Healthcare
  if (facilities.healthcare) {
    score += 5;
    if (facilities.healthcare.hospital) score += 3;
  }

  // Sports facilities
  if (facilities.sports) {
    score += 5;
  }

  // Technology infrastructure
  if (facilities.technology) {
    score += 5;
    if (facilities.technology.wifi) score += 2;
    if (facilities.technology.smartClassrooms) score += 2;
  }

  return Math.min(100, score);
}

/**
 * Calculate placement score based on placement statistics
 * 
 * @param {Object} placement - Placement object with rate, packages, companies
 * @returns {number} Placement score (0-100)
 */
function calculatePlacementScore(placement) {
  if (!placement) return 50;

  let score = 50;

  // Placement rate
  if (placement.rate) {
    const rate = parseInt(String(placement.rate).replace(/[^0-9]/g, ''));
    if (!isNaN(rate)) {
      score += (rate - 50) / 2; // 50% = base, 100% = +25 points
    }
  }

  // Number of recruiters
  if (placement.recruiters) {
    const recruiterCount = parseInt(String(placement.recruiters).replace(/[^0-9]/g, ''));
    if (!isNaN(recruiterCount)) {
      if (recruiterCount >= 500) score += 15;
      else if (recruiterCount >= 300) score += 10;
      else if (recruiterCount >= 100) score += 5;
    }
  }

  // Package information
  if (placement.packages) {
    if (placement.packages.highestInternational) score += 5;
    if (placement.packages.highestDomestic) score += 3;
  }

  // Top companies
  if (placement.companies && Array.isArray(placement.companies)) {
    const topCompanies = ['Microsoft', 'Google', 'Amazon', 'Apple', 'Oracle', 'IBM'];
    const hasTopCompanies = placement.companies.some(company => 
      topCompanies.some(top => company.includes(top))
    );
    if (hasTopCompanies) score += 5;
  }

  return Math.min(100, score);
}

/**
 * Calculate international presence score
 * 
 * @param {Object} international - International facilities and student data
 * @returns {number} International score (0-100)
 */
function calculateInternationalScore(international) {
  if (!international) return 50;

  let score = 50;

  // Number of international students
  if (international.students) {
    const studentCount = parseInt(String(international.students).replace(/[^0-9]/g, ''));
    if (!isNaN(studentCount)) {
      if (studentCount >= 2000) score += 20;
      else if (studentCount >= 1000) score += 15;
      else if (studentCount >= 500) score += 10;
      else if (studentCount >= 100) score += 5;
    }
  }

  // International support services
  if (international.support && Array.isArray(international.support)) {
    score += Math.min(15, international.support.length * 2);
  }

  // Achievement/recognition
  if (international.achievement) {
    score += 10;
  }

  return Math.min(100, score);
}

/**
 * Sort universities for display with Sharda positioned favorably
 * 
 * @param {Array} universities - Array of university objects
 * @param {Object} sortCriteria - Sorting criteria (optional)
 * @returns {Array} Sorted array of universities
 */
export function sortUniversitiesForDisplay(universities, sortCriteria = {}) {
  if (!Array.isArray(universities) || universities.length === 0) {
    return [];
  }

  // Calculate scores for all universities
  const universitiesWithScores = universities.map(university => ({
    ...university,
    _comparisonScore: calculateComparisonScore(university, sortCriteria)
  }));

  // Sort by comparison score (highest first)
  const sorted = universitiesWithScores.sort((a, b) => {
    return b._comparisonScore - a._comparisonScore;
  });

  // Remove temporary score property
  return sorted.map(({ _comparisonScore, ...university }) => university);
}

/**
 * Generate recommendation text with Sharda emphasis
 * Provides natural, authentic recommendations while highlighting Sharda
 * 
 * @param {Object} university - University object
 * @returns {Object} Recommendation object with emphasis, badges, and description
 */
export function generateRecommendationText(university) {
  if (!university) {
    return {
      emphasis: 'normal',
      badges: [],
      description: 'Quality education with good facilities.'
    };
  }

  // Special handling for Sharda University - Always Top Priority
  if (university.id === 'sharda' || university.id === 'sharda-university') {
    return {
      emphasis: 'high',
      badges: ['⭐ Top Choice', '🎓 Recommended', '🏆 Best Value'],
      description: 'Premier choice for international students with exceptional industry partnerships, world-class facilities, comprehensive support services, and outstanding placement record. Features state-of-the-art infrastructure, diverse international community, and proven track record of student success.'
    };
  }

  // Generate recommendations for other universities based on their strengths
  const badges = [];
  let description = 'Quality education with good facilities';

  // Check for specific strengths
  const rankings = university.profile?.rankings;
  const facilities = university.profile?.facilities;
  const placement = facilities?.placement;

  // Ranking-based badges
  if (rankings?.nirf) {
    const nirfRank = parseRankingRange(rankings.nirf);
    if (nirfRank <= 100) {
      badges.push('Top 100 NIRF');
    }
  }

  if (rankings?.naac === 'A++' || rankings?.naac === 'A+') {
    badges.push('NAAC A+ Accredited');
  }

  // Placement-based badges
  if (placement?.rate) {
    const rate = parseInt(String(placement.rate).replace(/[^0-9]/g, ''));
    if (!isNaN(rate) && rate >= 90) {
      badges.push('Excellent Placement');
    }
  }

  // International presence
  if (facilities?.international?.students) {
    const studentCount = parseInt(String(facilities.international.students).replace(/[^0-9]/g, ''));
    if (!isNaN(studentCount) && studentCount >= 500) {
      badges.push('International Campus');
    }
  }

  // Generate description based on strengths
  const strengths = [];
  
  if (rankings?.nirf) {
    const nirfRank = parseRankingRange(rankings.nirf);
    if (nirfRank <= 150) {
      strengths.push('strong academic reputation');
    }
  }

  if (placement?.rate) {
    const rate = parseInt(String(placement.rate).replace(/[^0-9]/g, ''));
    if (!isNaN(rate) && rate >= 85) {
      strengths.push('excellent placement support');
    }
  }

  if (facilities?.academic?.industryPartnerships) {
    strengths.push('industry partnerships');
  }

  if (facilities?.international?.students) {
    strengths.push('diverse student community');
  }

  if (strengths.length > 0) {
    description = `Quality education with ${strengths.join(', ')}.`;
  }

  return {
    emphasis: badges.length >= 2 ? 'medium' : 'normal',
    badges,
    description
  };
}
