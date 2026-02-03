import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import MetaManager, { generateDescription, generateTitle, validateLength } from '../MetaManager';

describe('MetaManager Component', () => {
  beforeEach(() => {
    // Clear any existing meta tags before each test
    document.head.innerHTML = '';
  });

  afterEach(() => {
    // Clean up after each test
    document.head.innerHTML = '';
  });

  it('should render meta tags in document head', () => {
    render(
      <MetaManager
        emoji="🎓"
        benefit="Study in India's Top Universities"
        socialProof="10,000+ students"
        price="From ₹1.2L/year"
        urgency="Apply by March 2026"
        cta="Apply Now"
        baseTitle="Sharda University Admissions"
      />
    );

    const titleTag = document.querySelector('meta[name="title"]');
    const descriptionTag = document.querySelector('meta[name="description"]');

    expect(titleTag).toBeTruthy();
    expect(descriptionTag).toBeTruthy();
    expect(document.title).toContain('2026');
  });

  it('should update meta tags when props change', () => {
    const { rerender } = render(
      <MetaManager
        benefit="First benefit"
        cta="Apply Now"
        baseTitle="First Title"
      />
    );

    const firstDescription = document.querySelector('meta[name="description"]')?.content;

    rerender(
      <MetaManager
        benefit="Second benefit"
        cta="Apply Now"
        baseTitle="Second Title"
      />
    );

    const secondDescription = document.querySelector('meta[name="description"]')?.content;

    expect(firstDescription).not.toBe(secondDescription);
    expect(secondDescription).toContain('Second benefit');
  });
});

describe('generateDescription', () => {
  it('should handle missing data (partial data)', () => {
    // Only required fields
    const description1 = generateDescription({
      benefit: 'Great education',
      cta: 'Apply Now',
    });
    expect(description1).toContain('Great education');
    expect(description1).toContain('Apply Now');
    expect(description1.length).toBeLessThanOrEqual(160);

    // With some optional fields
    const description2 = generateDescription({
      emoji: '🎓',
      benefit: 'Great education',
      cta: 'Apply Now',
    });
    expect(description2).toContain('🎓');
    expect(description2).toContain('Great education');
    expect(description2).toContain('Apply Now');
  });

  it('should handle empty strings gracefully', () => {
    const description = generateDescription({
      emoji: '',
      benefit: 'Great education',
      socialProof: '',
      price: '',
      urgency: '',
      cta: 'Apply Now',
    });
    expect(description).toContain('Great education');
    expect(description).toContain('Apply Now');
    expect(description.length).toBeLessThanOrEqual(160);
  });

  it('should handle null/undefined values', () => {
    const description = generateDescription({
      emoji: null,
      benefit: 'Great education',
      socialProof: undefined,
      price: null,
      urgency: undefined,
      cta: 'Apply Now',
    });
    expect(description).toContain('Great education');
    expect(description).toContain('Apply Now');
    expect(description.length).toBeLessThanOrEqual(160);
  });

  it('should truncate at word boundaries when too long', () => {
    const description = generateDescription({
      emoji: '🎓',
      benefit: 'This is a very long benefit statement that goes on and on',
      socialProof: 'Over 50,000 students enrolled from 100+ countries worldwide',
      price: 'Starting from ₹1.2 Lakhs per year',
      urgency: 'Limited seats available - Apply before March 31, 2026',
      cta: 'Apply Now and Get Scholarship',
    });

    expect(description.length).toBeLessThanOrEqual(160);
    
    // Should not end with a partial word (unless it's ellipsis)
    if (description.endsWith('...')) {
      const withoutEllipsis = description.slice(0, -3);
      const lastChar = withoutEllipsis[withoutEllipsis.length - 1];
      // Last char before ellipsis should be a letter or number, not a space
      expect(lastChar).not.toBe(' ');
    }
  });

  it('should render emoji correctly', () => {
    const description1 = generateDescription({
      emoji: '🎓',
      benefit: 'Study abroad',
      cta: 'Apply',
    });
    expect(description1).toContain('🎓');

    const description2 = generateDescription({
      emoji: '🏆',
      benefit: 'Top ranked',
      cta: 'Enroll',
    });
    expect(description2).toContain('🏆');

    const description3 = generateDescription({
      emoji: '💼',
      benefit: 'Career ready',
      cta: 'Join',
    });
    expect(description3).toContain('💼');
  });

  it('should use bullet separator between elements', () => {
    const description = generateDescription({
      emoji: '🎓',
      benefit: 'Great education',
      socialProof: '10,000 students',
      cta: 'Apply Now',
    });
    expect(description).toContain('•');
  });
});

describe('generateTitle', () => {
  it('should include current year', () => {
    const title = generateTitle({
      baseTitle: 'Sharda University',
    });
    const currentYear = new Date().getFullYear();
    expect(title).toContain(currentYear.toString());
  });

  it('should include urgency when space permits', () => {
    const title = generateTitle({
      baseTitle: 'Sharda',
      urgency: 'Apply Now',
    });
    expect(title).toContain('Apply Now');
  });

  it('should include brand name when space permits', () => {
    const title = generateTitle({
      baseTitle: 'Sharda',
      brandName: 'NextGen',
    });
    expect(title).toContain('NextGen');
  });

  it('should not exceed 60 characters', () => {
    const title = generateTitle({
      baseTitle: 'This is a very long title that should be truncated',
      urgency: 'Apply by March 2026',
      brandName: 'NextGen Learning Platform',
    });
    expect(title.length).toBeLessThanOrEqual(60);
  });

  it('should handle missing baseTitle', () => {
    const title = generateTitle({
      brandName: 'NextGen Learning',
    });
    expect(title).toBe('NextGen Learning');
  });

  it('should prioritize baseTitle and year over other elements', () => {
    const title = generateTitle({
      baseTitle: 'Very Long University Name That Takes Up Space',
      urgency: 'Apply Now',
      brandName: 'NextGen Learning',
    });
    
    const currentYear = new Date().getFullYear();
    expect(title).toContain(currentYear.toString());
    expect(title.length).toBeLessThanOrEqual(60);
  });
});

describe('validateLength', () => {
  it('should return text as-is when within bounds', () => {
    const text = 'This is a normal length text';
    const result = validateLength(text, 0, 100);
    expect(result).toBe(text);
  });

  it('should truncate text that exceeds max length', () => {
    const text = 'This is a very long text that needs to be truncated because it exceeds the maximum allowed length';
    const result = validateLength(text, 0, 50);
    expect(result.length).toBeLessThanOrEqual(50);
  });

  it('should truncate at word boundaries', () => {
    const text = 'This is a sentence with multiple words that should be truncated';
    const result = validateLength(text, 0, 30);
    
    // Should not end with a space (unless it's the ellipsis)
    if (result.endsWith('...')) {
      const withoutEllipsis = result.slice(0, -3);
      expect(withoutEllipsis[withoutEllipsis.length - 1]).not.toBe(' ');
    }
  });

  it('should add ellipsis when truncating', () => {
    const text = 'This is a very long text that needs to be truncated';
    const result = validateLength(text, 0, 30);
    
    if (result.length < text.length) {
      expect(result).toContain('...');
    }
  });

  it('should handle empty string', () => {
    const result = validateLength('', 0, 100);
    expect(result).toBe('');
  });

  it('should handle null/undefined', () => {
    expect(validateLength(null, 0, 100)).toBe('');
    expect(validateLength(undefined, 0, 100)).toBe('');
  });

  it('should return text even if below minimum length', () => {
    const text = 'Short';
    const result = validateLength(text, 20, 100);
    // We don't pad, just return what we have
    expect(result).toBe(text);
  });
});
