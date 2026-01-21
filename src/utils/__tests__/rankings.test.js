/**
 * Unit tests for ranking utilities
 * Run with: npx vitest run src/utils/__tests__/rankings.test.js
 */

import { describe, it, expect, vi } from 'vitest';
import { calculateTotalFees } from '../rankings';

// Mock the scholarships module
vi.mock('../scholarships', () => ({
  getMaxScholarship: vi.fn((universityId) => {
    const scholarships = {
      'niu': 50,
      'sharda': 50,
      'chandigarh': 50,
      'galgotias': 60,
    };
    return scholarships[universityId] || 0;
  }),
}));

describe('calculateTotalFees', () => {
  const mockUniversity = {
    id: 'galgotias',
    name: 'Galgotias University',
  };

  const mockProgram = {
    name: 'B.Tech CSE',
    duration: 4,
    annualFees: [
      { type: 'tuition', amount: 200000 },
      { type: 'hostel', amount: 50000 },
    ],
  };

  it('calculates total fees correctly', () => {
    const result = calculateTotalFees(mockProgram, mockUniversity);
    
    expect(result).toHaveProperty('baseTotal');
    expect(result).toHaveProperty('scholarshipPercent');
    expect(result).toHaveProperty('totalAfterScholarship');
    expect(result).toHaveProperty('grandTotal');
  });

  it('applies scholarship percentage', () => {
    const result = calculateTotalFees(mockProgram, mockUniversity);
    
    // Galgotias has 60% max scholarship
    expect(result.scholarshipPercent).toBe(60);
  });

  it('returns zero values for program without fees', () => {
    const programNoFees = { name: 'Test', duration: 4, annualFees: [] };
    const result = calculateTotalFees(programNoFees, mockUniversity);
    
    expect(result.baseTotal).toBe(0);
    expect(result.grandTotal).toBe(0);
  });

  it('handles different university scholarships', () => {
    const niuUniversity = { id: 'niu', name: 'NIU' };
    const result = calculateTotalFees(mockProgram, niuUniversity);
    
    // NIU has 50% flat scholarship
    expect(result.scholarshipPercent).toBe(50);
  });
});
