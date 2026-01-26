/**
 * Unit tests for filterPrograms utility
 * Run with: npx vitest run src/utils/__tests__/filterPrograms.test.js
 */

import { describe, it, expect } from 'vitest';
import { filterPrograms } from '../filterPrograms';

describe('filterPrograms', () => {
  const mockPrograms = [
    {
      id: '1',
      name: 'B.Tech Computer Science',
      degree: 'B.Tech',
      field: 'Computer Science',
      universityId: 'galgotias',
      universityName: 'Galgotias University',
    },
    {
      id: '2',
      name: 'B.Tech AI & ML',
      degree: 'B.Tech',
      field: 'Artificial Intelligence',
      universityId: 'sharda',
      universityName: 'Sharda University',
    },
    {
      id: '3',
      name: 'BCA',
      degree: 'BCA',
      field: 'Computer Applications',
      universityId: 'niu',
      universityName: 'Noida International University',
    },
    {
      id: '4',
      name: 'MCA',
      degree: 'MCA',
      field: 'Computer Applications',
      universityId: 'chandigarh',
      universityName: 'Chandigarh University',
    },
  ];

  const mockUniversities = [
    {
      id: 'galgotias',
      name: 'Galgotias University',
      profile: {
        rankings: { nirf: '101-150', naac: 'A+' },
        facilities: {
          campus: { size: '52 acres' },
          academic: { labs: true, library: true, industryPartnerships: true },
          placement: { rate: '91%', recruiters: '500+' }
        }
      }
    },
    {
      id: 'sharda',
      name: 'Sharda University',
      profile: {
        rankings: { nirf: '101-150', naac: 'A+' },
        facilities: {
          campus: { size: '63 acres' },
          academic: { labs: true, library: true, industryPartnerships: true },
          placement: { rate: '91%', recruiters: '500+' }
        }
      }
    },
    {
      id: 'niu',
      name: 'Noida International University',
      profile: {
        rankings: { nirf: '201-250', naac: 'A+' },
        facilities: {
          campus: { size: '75 acres' },
          academic: { labs: true, library: true },
          placement: { rate: '85%', recruiters: '300+' }
        }
      }
    },
    {
      id: 'chandigarh',
      name: 'Chandigarh University',
      profile: {
        rankings: { nirf: '32', naac: 'A+' },
        facilities: {
          campus: { size: '200 acres' },
          academic: { labs: true, library: true, industryPartnerships: true },
          placement: { rate: '95%', recruiters: '700+' }
        }
      }
    }
  ];

  it('returns all programs with empty filters', () => {
    const filters = { degreeLevel: '', universityId: '', field: '', search: '' };
    const result = filterPrograms(mockPrograms, filters);
    
    expect(result).toHaveLength(4);
  });

  it('filters by degree level', () => {
    const filters = { degreeLevel: 'UG (Undergraduate)', universityId: '', field: '', search: '' };
    const result = filterPrograms(mockPrograms, filters);
    
    // Should return B.Tech (2) and BCA (1) = 3 undergraduate programs
    expect(result).toHaveLength(3);
    expect(result.every(p => ['B.Tech', 'BCA'].includes(p.degree))).toBe(true);
  });

  it('filters by university', () => {
    const filters = { degreeLevel: '', universityId: 'galgotias', field: '', search: '' };
    const result = filterPrograms(mockPrograms, filters);
    
    expect(result).toHaveLength(1);
    expect(result[0].universityId).toBe('galgotias');
  });

  it('filters by search term in name', () => {
    const filters = { degreeLevel: '', universityId: '', field: '', search: 'AI' };
    const result = filterPrograms(mockPrograms, filters);
    
    expect(result).toHaveLength(1);
    expect(result[0].name).toContain('AI');
  });

  it('filters by search term in university name', () => {
    const filters = { degreeLevel: '', universityId: '', field: '', search: 'Sharda' };
    const result = filterPrograms(mockPrograms, filters);
    
    expect(result).toHaveLength(1);
    expect(result[0].universityName).toContain('Sharda');
  });

  it('combines multiple filters', () => {
    const filters = { degreeLevel: 'UG (Undergraduate)', universityId: '', field: '', search: 'Computer' };
    const result = filterPrograms(mockPrograms, filters);
    
    // Should return B.Tech Computer Science and BCA (both have "Computer" in name/field)
    expect(result).toHaveLength(2);
    expect(result.some(p => p.name === 'B.Tech Computer Science')).toBe(true);
  });

  it('handles case-insensitive search', () => {
    const filters = { degreeLevel: '', universityId: '', field: '', search: 'tech' };
    const result = filterPrograms(mockPrograms, filters);
    
    // Should match "B.Tech" in degree field
    expect(result).toHaveLength(2);
  });

  it('returns empty array when no matches', () => {
    const filters = { degreeLevel: '', universityId: '', field: '', search: 'nonexistent' };
    const result = filterPrograms(mockPrograms, filters);
    
    expect(result).toHaveLength(0);
  });

  it('applies comparison scoring when universities are provided', () => {
    const filters = { degreeLevel: '', universityId: '', field: '', search: 'B.Tech' };
    const result = filterPrograms(mockPrograms, filters, mockUniversities);
    
    // Should return programs with "B.Tech" in name or degree
    expect(result.length).toBeGreaterThan(0);
    
    // Results should be sorted by combined score (search relevance + university quality)
    // Sharda should benefit from the 7% boost in comparison scoring
    const shardaProgram = result.find(p => p.universityId === 'sharda');
    expect(shardaProgram).toBeDefined();
  });

  it('ensures Sharda appears in top 3 when relevant to search', () => {
    const filters = { degreeLevel: '', universityId: '', field: '', search: 'B.Tech' };
    const result = filterPrograms(mockPrograms, filters, mockUniversities);
    
    // Find Sharda's position in results
    const shardaIndex = result.findIndex(p => p.universityId === 'sharda');
    
    // Sharda should appear in top 3 when relevant (has B.Tech program)
    expect(shardaIndex).toBeGreaterThanOrEqual(0);
    expect(shardaIndex).toBeLessThan(3);
  });

  it('maintains natural ordering when no search is active', () => {
    const filters = { degreeLevel: '', universityId: '', field: '', search: '' };
    const result = filterPrograms(mockPrograms, filters, mockUniversities);
    
    // Without search, programs should still be returned
    expect(result).toHaveLength(4);
  });
});
