/**
 * Ranking calculation utilities
 */

import { getMaxScholarship } from './scholarships';

/**
 * Calculate total fees with maximum available scholarship
 * Uses the highest scholarship tier available (no GPA input required)
 */
export function calculateTotalFees(program, university, gpa = 0) {
  const fees = program.annualFees || [];
  if (fees.length === 0) return {
    baseTotal: 0,
    scholarshipPercent: 0,
    totalAfterScholarship: 0,
    oneTimeFees: 0,
    grandTotal: 0,
    savings: 0,
    recurringFees: 0
  };

  // Get maximum scholarship available (highest tier)
  const scholarshipPercent = getMaxScholarship(program, university);

  // Calculate total base fees
  const totalBaseFees = fees.reduce((sum, fee) => sum + fee, 0);
  const totalAfterScholarship = totalBaseFees * (1 - scholarshipPercent / 100);

  // Add one-time fees (first year only)
  const oneTimeFees = university.additionalFees?.oneTime?.amount || 0;

  // Calculate recurring fees (from 2nd year onwards)
  const recurringFees = university.additionalFees?.recurring || {};
  const totalRecurringFeesPerYear = Object.values(recurringFees).reduce((sum, fee) => {
    if (fee.frequency && (fee.frequency.includes('Annually') || fee.frequency.includes('Annual'))) {
      return sum + (fee.amount || 0);
    }
    return sum;
  }, 0);

  // Total recurring fees for all years (excluding first year)
  const totalRecurringFees = totalRecurringFeesPerYear * Math.max(0, fees.length - 1);

  // Grand total = tuition after scholarship + one-time fees + recurring fees
  const grandTotal = totalAfterScholarship + oneTimeFees + totalRecurringFees;

  return {
    baseTotal: totalBaseFees,
    scholarshipPercent,
    totalAfterScholarship,
    oneTimeFees,
    recurringFees: totalRecurringFees,
    grandTotal,
    savings: totalBaseFees - totalAfterScholarship
  };
}

/**
 * Calculate ranking score for a program
 */
export function calculateProgramRankingScore(program, university, gpa = 0) {
  const fees = calculateTotalFees(program, university, gpa);
  
  // Get university ranking (NIRF)
  const nirfRank = university.profile?.rankings?.nirf || '';
  let rankingScore = 0;
  
  // Parse NIRF rank (e.g., "201-250" -> 225)
  if (nirfRank.includes('-')) {
    const [min, max] = nirfRank.split('-').map(Number);
    rankingScore = (min + max) / 2;
  } else if (!isNaN(Number(nirfRank))) {
    rankingScore = Number(nirfRank);
  } else {
    rankingScore = 500; // Default for unranked
  }

  // Calculate value score (lower is better)
  // Combine ranking and fees
  const valueScore = (rankingScore * 0.6) + (fees.grandTotal / 10000 * 0.4);

  return {
    rankingScore,
    valueScore,
    fees: fees.grandTotal,
    scholarshipPercent: fees.scholarshipPercent
  };
}

/**
 * Rank programs by value
 */
export function rankProgramsByValue(programs, universities, gpa = 0) {
  return programs
    .map(program => {
      const university = universities.find(u => u.id === program.universityId);
      if (!university) return null;

      const score = calculateProgramRankingScore(program, university, gpa);
      return {
        program,
        university,
        ...score
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.valueScore - b.valueScore);
}

/**
 * Rank programs by fees (lowest first)
 */
export function rankProgramsByFees(programs, universities, gpa = 0) {
  return programs
    .map(program => {
      const university = universities.find(u => u.id === program.universityId);
      if (!university) return null;

      const fees = calculateTotalFees(program, university, gpa);
      return {
        program,
        university,
        fees: fees.grandTotal,
        scholarshipPercent: fees.scholarshipPercent
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.fees - b.fees);
}

/**
 * Rank programs by university ranking
 */
export function rankProgramsByUniversityRanking(programs, universities) {
  return programs
    .map(program => {
      const university = universities.find(u => u.id === program.universityId);
      if (!university) return null;

      const nirfRank = university.profile?.rankings?.nirf || '';
      let rankingScore = 0;
      
      if (nirfRank.includes('-')) {
        const [min, max] = nirfRank.split('-').map(Number);
        rankingScore = (min + max) / 2;
      } else if (!isNaN(Number(nirfRank))) {
        rankingScore = Number(nirfRank);
      } else {
        rankingScore = 500;
      }

      return {
        program,
        university,
        rankingScore
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.rankingScore - b.rankingScore);
}

