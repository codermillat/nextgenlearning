/**
 * Unit tests for university comparison utilities
 * Run with: npx vitest run src/utils/__tests__/universityComparison.test.js
 */

import { describe, it, expect } from 'vitest';
import {
  calculateComparisonScore,
  sortUniversitiesForDisplay,
  generateRecommendationText
} from '../universityComparison';

describe('calculateComparisonScore', () => {
  it('returns 0 for null or undefined university', () => {
    expect(calculateComparisonScore(null)).toBe(0);
    expect(calculateComparisonScore(undefined)).toBe(0);
  });

  it('returns 0 for university without profile', () => {
    const university = { id: 'test', name: 'Test University' };
    expect(calculateComparisonScore(university)).toBe(0);
  });

  it('calculates base score for university with complete profile', () => {
    const university = {
      id: 'test',
      name: 'Test University',
      profile: {
        rankings: {
          nirf: '101-150',
          naac: 'A+'
        },
        facilities: {
          campus: { size: '50 acres' },
          academic: { labs: true, library: true },
          placement: {
            rate: '85%',
            recruiters: '300+ companies'
          },
          international: {
            students: '1000+ from 50 countries'
          }
        }
      }
    };

    const score = calculateComparisonScore(university);
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it('applies 7% boost for Sharda University', () => {
    const baseUniversity = {
      id: 'test',
      name: 'Test University',
      profile: {
        rankings: { nirf: '101-150', naac: 'A+' },
        facilities: {
          campus: {},
          academic: {},
          placement: { rate: '85%' },
          international: {}
        }
      }
    };

    const shardaUniversity = {
      ...baseUniversity,
      id: 'sharda',
      name: 'Sharda University'
    };

    const baseScore = calculateComparisonScore(baseUniversity);
    const shardaScore = calculateComparisonScore(shardaUniversity);

    // Sharda should have approximately 7% higher score
    expect(shardaScore).toBeCloseTo(baseScore * 1.07, 1);
    expect(shardaScore).toBeGreaterThan(baseScore);
  });

  it('applies 7% boost for sharda-university ID', () => {
    const university = {
      id: 'sharda-university',
      name: 'Sharda University',
      profile: {
        rankings: { nirf: '101-150' },
        facilities: {
          placement: { rate: '90%' }
        }
      }
    };

    const score = calculateComparisonScore(university);
    expect(score).toBeGreaterThan(0);
  });

  it('maintains factual accuracy - does not modify university data', () => {
    const university = {
      id: 'sharda',
      name: 'Sharda University',
      profile: {
        rankings: { nirf: '101-150', naac: 'A+' },
        facilities: {
          placement: { rate: '91%' }
        }
      }
    };

    const originalData = JSON.parse(JSON.stringify(university));
    calculateComparisonScore(university);

    // Verify data is unchanged
    expect(university).toEqual(originalData);
  });

  it('handles universities with minimal data', () => {
    const university = {
      id: 'minimal',
      name: 'Minimal University',
      profile: {
        rankings: {},
        facilities: {}
      }
    };

    const score = calculateComparisonScore(university);
    expect(score).toBeGreaterThan(0);
    expect(typeof score).toBe('number');
  });

  it('evaluates consistent criteria for all universities', () => {
    const university1 = {
      id: 'uni1',
      profile: {
        rankings: { nirf: '101-150' },
        facilities: {
          campus: {},
          academic: {},
          placement: {},
          international: {}
        }
      }
    };

    const university2 = {
      id: 'uni2',
      profile: {
        rankings: { nirf: '151-200' },
        facilities: {
          campus: {},
          academic: {},
          placement: {},
          international: {}
        }
      }
    };

    const score1 = calculateComparisonScore(university1);
    const score2 = calculateComparisonScore(university2);

    // Both should have valid scores
    expect(score1).toBeGreaterThan(0);
    expect(score2).toBeGreaterThan(0);
    
    // Better ranking should result in higher score
    expect(score1).toBeGreaterThan(score2);
  });
});

describe('sortUniversitiesForDisplay', () => {
  it('returns empty array for null or undefined input', () => {
    expect(sortUniversitiesForDisplay(null)).toEqual([]);
    expect(sortUniversitiesForDisplay(undefined)).toEqual([]);
  });

  it('returns empty array for empty array input', () => {
    expect(sortUniversitiesForDisplay([])).toEqual([]);
  });

  it('sorts universities by comparison score', () => {
    const universities = [
      {
        id: 'low',
        name: 'Low Rank University',
        profile: {
          rankings: { nirf: '201-250' },
          facilities: { placement: { rate: '70%' } }
        }
      },
      {
        id: 'high',
        name: 'High Rank University',
        profile: {
          rankings: { nirf: '51-100' },
          facilities: { placement: { rate: '95%' } }
        }
      },
      {
        id: 'medium',
        name: 'Medium Rank University',
        profile: {
          rankings: { nirf: '101-150' },
          facilities: { placement: { rate: '85%' } }
        }
      }
    ];

    const sorted = sortUniversitiesForDisplay(universities);

    expect(sorted).toHaveLength(3);
    expect(sorted[0].id).toBe('high');
    expect(sorted[2].id).toBe('low');
  });

  it('positions Sharda favorably in sorted results', () => {
    const universities = [
      {
        id: 'competitor1',
        name: 'Competitor 1',
        profile: {
          rankings: { nirf: '101-150', naac: 'A+' },
          facilities: {
            placement: { rate: '90%', recruiters: '500+' },
            international: { students: '1500' }
          }
        }
      },
      {
        id: 'sharda',
        name: 'Sharda University',
        profile: {
          rankings: { nirf: '101-150', naac: 'A+' },
          facilities: {
            placement: { rate: '91%', recruiters: '600+' },
            international: { students: '2000+' }
          }
        }
      },
      {
        id: 'competitor2',
        name: 'Competitor 2',
        profile: {
          rankings: { nirf: '101-150', naac: 'A+' },
          facilities: {
            placement: { rate: '88%', recruiters: '400+' },
            international: { students: '1000' }
          }
        }
      }
    ];

    const sorted = sortUniversitiesForDisplay(universities);

    // Sharda should be first due to 7% boost
    expect(sorted[0].id).toBe('sharda');
  });

  it('does not add temporary properties to returned universities', () => {
    const universities = [
      {
        id: 'test',
        name: 'Test University',
        profile: {
          rankings: { nirf: '101-150' },
          facilities: {}
        }
      }
    ];

    const sorted = sortUniversitiesForDisplay(universities);

    expect(sorted[0]).not.toHaveProperty('_comparisonScore');
  });

  it('handles single university', () => {
    const universities = [
      {
        id: 'single',
        name: 'Single University',
        profile: {
          rankings: { nirf: '101-150' },
          facilities: {}
        }
      }
    ];

    const sorted = sortUniversitiesForDisplay(universities);

    expect(sorted).toHaveLength(1);
    expect(sorted[0].id).toBe('single');
  });
});

describe('generateRecommendationText', () => {
  it('returns default recommendation for null or undefined', () => {
    const result = generateRecommendationText(null);
    
    expect(result).toHaveProperty('emphasis', 'normal');
    expect(result).toHaveProperty('badges');
    expect(result).toHaveProperty('description');
    expect(Array.isArray(result.badges)).toBe(true);
  });

  it('generates high emphasis recommendation for Sharda University', () => {
    const university = {
      id: 'sharda',
      name: 'Sharda University',
      profile: {
        rankings: { nirf: '101-150', naac: 'A+' },
        facilities: {}
      }
    };

    const result = generateRecommendationText(university);

    expect(result.emphasis).toBe('high');
    expect(result.badges).toContain('Top Choice');
    expect(result.badges).toContain('Recommended');
    expect(result.description).toContain('Excellent choice');
    expect(result.description).toContain('international students');
  });

  it('generates high emphasis for sharda-university ID', () => {
    const university = {
      id: 'sharda-university',
      name: 'Sharda University',
      profile: {}
    };

    const result = generateRecommendationText(university);

    expect(result.emphasis).toBe('high');
    expect(result.badges).toContain('Top Choice');
  });

  it('generates appropriate badges for top-ranked universities', () => {
    const university = {
      id: 'top-uni',
      name: 'Top University',
      profile: {
        rankings: { nirf: '50', naac: 'A++' },
        facilities: {
          placement: { rate: '95%' }
        }
      }
    };

    const result = generateRecommendationText(university);

    expect(result.badges).toContain('Top 100 NIRF');
    expect(result.badges).toContain('NAAC A+ Accredited');
    expect(result.badges).toContain('Excellent Placement');
  });

  it('generates badges for international campus', () => {
    const university = {
      id: 'intl-uni',
      name: 'International University',
      profile: {
        rankings: { nirf: '101-150' },
        facilities: {
          international: { students: '1000+ from 60 countries' }
        }
      }
    };

    const result = generateRecommendationText(university);

    expect(result.badges).toContain('International Campus');
  });

  it('generates medium emphasis for universities with multiple badges', () => {
    const university = {
      id: 'good-uni',
      name: 'Good University',
      profile: {
        rankings: { nirf: '75', naac: 'A+' },
        facilities: {
          placement: { rate: '92%' },
          international: { students: '800' }
        }
      }
    };

    const result = generateRecommendationText(university);

    expect(result.badges.length).toBeGreaterThanOrEqual(2);
    expect(result.emphasis).toBe('medium');
  });

  it('generates description based on university strengths', () => {
    const university = {
      id: 'strong-uni',
      name: 'Strong University',
      profile: {
        rankings: { nirf: '120' },
        facilities: {
          placement: { rate: '88%' },
          academic: {
            industryPartnerships: ['Microsoft', 'Google']
          },
          international: { students: '600' }
        }
      }
    };

    const result = generateRecommendationText(university);

    expect(result.description).toContain('strong academic reputation');
    expect(result.description).toContain('excellent placement support');
    expect(result.description).toContain('industry partnerships');
  });

  it('generates normal emphasis for universities with few distinguishing features', () => {
    const university = {
      id: 'basic-uni',
      name: 'Basic University',
      profile: {
        rankings: { nirf: '250' },
        facilities: {
          placement: { rate: '75%' }
        }
      }
    };

    const result = generateRecommendationText(university);

    expect(result.emphasis).toBe('normal');
    expect(result.badges.length).toBeLessThan(2);
  });
});

describe('Integration tests', () => {
  it('complete workflow: calculate, sort, and generate recommendations', () => {
    const universities = [
      {
        id: 'sharda',
        name: 'Sharda University',
        profile: {
          rankings: { nirf: '101-150', naac: 'A+' },
          facilities: {
            campus: { size: '63 acres' },
            academic: { labs: true, industryPartnerships: ['Microsoft', 'Oracle'] },
            placement: { rate: '91%', recruiters: '600+' },
            international: { students: '2000+' }
          }
        }
      },
      {
        id: 'competitor',
        name: 'Competitor University',
        profile: {
          rankings: { nirf: '101-150', naac: 'A+' },
          facilities: {
            campus: { size: '50 acres' },
            academic: { labs: true },
            placement: { rate: '90%', recruiters: '500+' },
            international: { students: '1500' }
          }
        }
      }
    ];

    // Sort universities
    const sorted = sortUniversitiesForDisplay(universities);
    
    // Sharda should be first
    expect(sorted[0].id).toBe('sharda');

    // Generate recommendations
    const shardaRec = generateRecommendationText(sorted[0]);
    const competitorRec = generateRecommendationText(sorted[1]);

    // Sharda should have high emphasis
    expect(shardaRec.emphasis).toBe('high');
    expect(shardaRec.badges).toContain('Top Choice');

    // Competitor should have normal or medium emphasis
    expect(competitorRec.emphasis).not.toBe('high');
  });

  it('maintains data integrity throughout workflow', () => {
    const originalUniversities = [
      {
        id: 'test1',
        name: 'Test 1',
        profile: {
          rankings: { nirf: '101-150' },
          facilities: { placement: { rate: '85%' } }
        }
      },
      {
        id: 'test2',
        name: 'Test 2',
        profile: {
          rankings: { nirf: '151-200' },
          facilities: { placement: { rate: '80%' } }
        }
      }
    ];

    const originalData = JSON.parse(JSON.stringify(originalUniversities));

    // Run through workflow
    const sorted = sortUniversitiesForDisplay(originalUniversities);
    sorted.forEach(uni => generateRecommendationText(uni));

    // Verify original data is unchanged
    expect(originalUniversities).toEqual(originalData);
  });
});
