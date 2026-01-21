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

  it('returns all programs with empty filters', () => {
    const filters = { degreeLevel: '', universityId: '', field: '', search: '' };
    const result = filterPrograms(mockPrograms, filters);
    
    expect(result).toHaveLength(4);
  });

  it('filters by degree level', () => {
    const filters = { degreeLevel: 'B.Tech', universityId: '', field: '', search: '' };
    const result = filterPrograms(mockPrograms, filters);
    
    expect(result).toHaveLength(2);
    expect(result.every(p => p.degree === 'B.Tech')).toBe(true);
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
    const filters = { degreeLevel: 'B.Tech', universityId: '', field: '', search: 'Computer' };
    const result = filterPrograms(mockPrograms, filters);
    
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('B.Tech Computer Science');
  });

  it('handles case-insensitive search', () => {
    const filters = { degreeLevel: '', universityId: '', field: '', search: 'btech' };
    const result = filterPrograms(mockPrograms, filters);
    
    expect(result).toHaveLength(2);
  });

  it('returns empty array when no matches', () => {
    const filters = { degreeLevel: '', universityId: '', field: '', search: 'nonexistent' };
    const result = filterPrograms(mockPrograms, filters);
    
    expect(result).toHaveLength(0);
  });
});
