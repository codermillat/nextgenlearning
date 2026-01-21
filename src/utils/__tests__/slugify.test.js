/**
 * Unit tests for slugify utilities
 * Run with: npx vitest run src/utils/__tests__/slugify.test.js
 */

import { describe, it, expect } from 'vitest';
import { slugify, courseSlug, universitySlug } from '../slugify';

describe('slugify', () => {
  it('converts text to lowercase', () => {
    expect(slugify('HELLO WORLD')).toBe('hello-world');
  });

  it('replaces spaces with hyphens', () => {
    expect(slugify('hello world')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify('hello@world!')).toBe('helloworld');
  });

  it('removes multiple consecutive hyphens', () => {
    expect(slugify('hello   world')).toBe('hello-world');
  });

  it('trims hyphens from start and end', () => {
    expect(slugify(' hello world ')).toBe('hello-world');
  });

  it('handles empty string', () => {
    expect(slugify('')).toBe('');
  });

  it('handles numbers', () => {
    expect(slugify('B.Tech CSE 2025')).toBe('btech-cse-2025');
  });

  it('handles parentheses and special chars', () => {
    expect(slugify('Computer Science (Hons)')).toBe('computer-science-hons');
  });
});

describe('courseSlug', () => {
  it('generates slug from course name', () => {
    const course = { name: 'B.Tech Computer Science' };
    expect(courseSlug(course)).toBe('btech-computer-science');
  });

  it('falls back to specialization if name is missing', () => {
    const course = { specialization: 'Artificial Intelligence' };
    expect(courseSlug(course)).toBe('artificial-intelligence');
  });

  it('returns empty string for empty course', () => {
    const course = {};
    expect(courseSlug(course)).toBe('');
  });

  it('handles AI/ML specialization', () => {
    const course = { name: 'B.Tech CSE (AI & ML)' };
    expect(courseSlug(course)).toBe('btech-cse-ai-ml');
  });
});

describe('universitySlug', () => {
  it('uses existing slug if available', () => {
    const university = { slug: 'galgotias-university', name: 'Galgotias University' };
    expect(universitySlug(university)).toBe('galgotias-university');
  });

  it('generates slug from name if slug is missing', () => {
    const university = { name: 'Sharda University' };
    expect(universitySlug(university)).toBe('sharda-university');
  });

  it('handles special characters in university name', () => {
    const university = { name: 'Noida International University (NIU)' };
    expect(universitySlug(university)).toBe('noida-international-university-niu');
  });
});
