/**
 * Property-Based Tests for ApplyButton Component
 * Feature: sharda-university-rebranding
 * 
 * These tests verify that the ApplyButton component correctly handles
 * Sharda University apply links with proper security attributes.
 * 
 * Run with: npx vitest run src/components/Common/__tests__/ApplyButton.property.test.jsx
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import fc from 'fast-check';
import ApplyButton from '../ApplyButton.jsx';
import { SHARDA_APPLY_URL } from '../../../config/constants.js';

/**
 * Property 7: Sharda Apply Link Presence
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 14.3**
 * 
 * For any page or component displaying Sharda University information, 
 * there should exist an "Apply Now" link or button with href="https://bit.ly/4pZTRTs" 
 * and target="_blank".
 */
describe('Property 7: Sharda Apply Link Presence', () => {
  it('should use correct Sharda apply URL for any Sharda university ID variant', () => {
    // Test with various Sharda ID formats
    const shardaIds = fc.constantFrom('sharda', 'sharda-university');
    
    fc.assert(
      fc.property(shardaIds, (universityId) => {
        const { container } = render(<ApplyButton universityId={universityId} />);
        const link = container.querySelector('a');
        
        // Should have the correct Sharda apply URL
        expect(link.getAttribute('href')).toBe(SHARDA_APPLY_URL);
        expect(link.getAttribute('href')).toBe('https://bit.ly/4pZTRTs');
      }),
      { numRuns: 100 }
    );
  });

  it('should have target="_blank" attribute for all Sharda university IDs', () => {
    const shardaIds = fc.constantFrom('sharda', 'sharda-university');
    
    fc.assert(
      fc.property(shardaIds, (universityId) => {
        const { container } = render(<ApplyButton universityId={universityId} />);
        const link = container.querySelector('a');
        
        // Should open in new tab
        expect(link.getAttribute('target')).toBe('_blank');
      }),
      { numRuns: 100 }
    );
  });

  it('should have proper security attributes (rel="noopener noreferrer") for all Sharda IDs', () => {
    const shardaIds = fc.constantFrom('sharda', 'sharda-university');
    
    fc.assert(
      fc.property(shardaIds, (universityId) => {
        const { container } = render(<ApplyButton universityId={universityId} />);
        const link = container.querySelector('a');
        
        // Should have security attributes
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      }),
      { numRuns: 100 }
    );
  });

  it('should display "Apply Now" text or custom text for Sharda buttons', () => {
    const shardaIds = fc.constantFrom('sharda', 'sharda-university');
    const buttonTexts = fc.constantFrom(
      'Apply Now',
      'Apply to Sharda University',
      'Start Your Application',
      'Apply Today'
    );
    
    fc.assert(
      fc.property(shardaIds, buttonTexts, (universityId, buttonText) => {
        const { container } = render(
          <ApplyButton universityId={universityId}>
            {buttonText}
          </ApplyButton>
        );
        const link = container.querySelector('a');
        
        // Should display the provided text
        expect(link.textContent).toBe(buttonText);
        
        // Should still have correct URL
        expect(link.getAttribute('href')).toBe(SHARDA_APPLY_URL);
      }),
      { numRuns: 100 }
    );
  });

  it('should maintain correct URL across different button variants', () => {
    const shardaIds = fc.constantFrom('sharda', 'sharda-university');
    const variants = fc.constantFrom('primary', 'secondary', 'white', 'outline', 'ghost');
    
    fc.assert(
      fc.property(shardaIds, variants, (universityId, variant) => {
        const { container } = render(
          <ApplyButton universityId={universityId} variant={variant} />
        );
        const link = container.querySelector('a');
        
        // URL should be correct regardless of variant
        expect(link.getAttribute('href')).toBe(SHARDA_APPLY_URL);
        expect(link.getAttribute('target')).toBe('_blank');
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      }),
      { numRuns: 100 }
    );
  });

  it('should maintain correct URL across different button sizes', () => {
    const shardaIds = fc.constantFrom('sharda', 'sharda-university');
    const sizes = fc.constantFrom('sm', 'md', 'lg');
    
    fc.assert(
      fc.property(shardaIds, sizes, (universityId, size) => {
        const { container } = render(
          <ApplyButton universityId={universityId} size={size} />
        );
        const link = container.querySelector('a');
        
        // URL should be correct regardless of size
        expect(link.getAttribute('href')).toBe(SHARDA_APPLY_URL);
        expect(link.getAttribute('target')).toBe('_blank');
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      }),
      { numRuns: 100 }
    );
  });

  it('should maintain correct URL with custom className', () => {
    const shardaIds = fc.constantFrom('sharda', 'sharda-university');
    const classNames = fc.constantFrom(
      'custom-class',
      'my-4 mx-auto',
      'w-full',
      'shadow-lg hover:shadow-xl',
      ''
    );
    
    fc.assert(
      fc.property(shardaIds, classNames, (universityId, className) => {
        const { container } = render(
          <ApplyButton universityId={universityId} className={className} />
        );
        const link = container.querySelector('a');
        
        // URL should be correct regardless of custom classes
        expect(link.getAttribute('href')).toBe(SHARDA_APPLY_URL);
        expect(link.getAttribute('target')).toBe('_blank');
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
        
        // Custom class should be applied
        if (className) {
          expect(link.className).toContain(className);
        }
      }),
      { numRuns: 100 }
    );
  });

  it('should render as an anchor element with href attribute', () => {
    const shardaIds = fc.constantFrom('sharda', 'sharda-university');
    
    fc.assert(
      fc.property(shardaIds, (universityId) => {
        const { container } = render(<ApplyButton universityId={universityId} />);
        const link = container.querySelector('a');
        
        // Should be an anchor element
        expect(link).toBeTruthy();
        expect(link.tagName).toBe('A');
        
        // Should have href attribute
        expect(link.hasAttribute('href')).toBe(true);
        expect(link.getAttribute('href')).toBeTruthy();
      }),
      { numRuns: 100 }
    );
  });

  it('should not use fallback URL for Sharda university IDs', () => {
    const shardaIds = fc.constantFrom('sharda', 'sharda-university');
    
    fc.assert(
      fc.property(shardaIds, (universityId) => {
        const { container } = render(<ApplyButton universityId={universityId} />);
        const link = container.querySelector('a');
        
        // Should NOT use the fallback URL
        expect(link.getAttribute('href')).not.toBe('/apply');
        
        // Should use the Sharda-specific URL
        expect(link.getAttribute('href')).toBe(SHARDA_APPLY_URL);
      }),
      { numRuns: 100 }
    );
  });

  it('should maintain consistency across multiple renders', () => {
    const shardaIds = fc.constantFrom('sharda', 'sharda-university');
    
    fc.assert(
      fc.property(shardaIds, (universityId) => {
        // Render multiple times
        for (let i = 0; i < 5; i++) {
          const { container } = render(<ApplyButton universityId={universityId} />);
          const link = container.querySelector('a');
          
          // Each render should have the same correct attributes
          expect(link.getAttribute('href')).toBe(SHARDA_APPLY_URL);
          expect(link.getAttribute('target')).toBe('_blank');
          expect(link.getAttribute('rel')).toBe('noopener noreferrer');
        }
      }),
      { numRuns: 100 }
    );
  });

  it('should have accessible minimum touch target size', () => {
    const shardaIds = fc.constantFrom('sharda', 'sharda-university');
    
    fc.assert(
      fc.property(shardaIds, (universityId) => {
        const { container } = render(<ApplyButton universityId={universityId} />);
        const link = container.querySelector('a');
        
        // Should have minimum height for accessibility (44px)
        expect(link.className).toContain('min-h-[44px]');
      }),
      { numRuns: 100 }
    );
  });

  it('should be keyboard accessible', () => {
    const shardaIds = fc.constantFrom('sharda', 'sharda-university');
    
    fc.assert(
      fc.property(shardaIds, (universityId) => {
        const { container } = render(<ApplyButton universityId={universityId} />);
        const link = container.querySelector('a');
        
        // Should be an anchor with href (naturally keyboard accessible)
        expect(link.tagName).toBe('A');
        expect(link.getAttribute('href')).toBeTruthy();
        
        // Should have focus styles
        expect(link.className).toContain('focus:outline-none');
        expect(link.className).toContain('focus:ring-2');
      }),
      { numRuns: 100 }
    );
  });

  it('should use configuration constant, not hardcoded URL', () => {
    const shardaIds = fc.constantFrom('sharda', 'sharda-university');
    
    fc.assert(
      fc.property(shardaIds, (universityId) => {
        const { container } = render(<ApplyButton universityId={universityId} />);
        const link = container.querySelector('a');
        
        // Should match the constant from config
        expect(link.getAttribute('href')).toBe(SHARDA_APPLY_URL);
        
        // Verify the constant has the expected value
        expect(SHARDA_APPLY_URL).toBe('https://bit.ly/4pZTRTs');
      }),
      { numRuns: 100 }
    );
  });

  it('should pass through additional props while maintaining correct URL', () => {
    const shardaIds = fc.constantFrom('sharda', 'sharda-university');
    const testIds = fc.constantFrom('apply-btn', 'sharda-apply', 'cta-button');
    
    fc.assert(
      fc.property(shardaIds, testIds, (universityId, testId) => {
        const { container } = render(
          <ApplyButton 
            universityId={universityId} 
            data-testid={testId}
            aria-label="Apply to Sharda University"
          />
        );
        const link = container.querySelector('a');
        
        // Should have the additional props
        expect(link.getAttribute('data-testid')).toBe(testId);
        expect(link.getAttribute('aria-label')).toBe('Apply to Sharda University');
        
        // Should still have correct URL and security attributes
        expect(link.getAttribute('href')).toBe(SHARDA_APPLY_URL);
        expect(link.getAttribute('target')).toBe('_blank');
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      }),
      { numRuns: 100 }
    );
  });

  it('should have all required attributes together', () => {
    const shardaIds = fc.constantFrom('sharda', 'sharda-university');
    
    fc.assert(
      fc.property(shardaIds, (universityId) => {
        const { container } = render(<ApplyButton universityId={universityId} />);
        const link = container.querySelector('a');
        
        // All three critical attributes must be present
        const href = link.getAttribute('href');
        const target = link.getAttribute('target');
        const rel = link.getAttribute('rel');
        
        expect(href).toBe('https://bit.ly/4pZTRTs');
        expect(target).toBe('_blank');
        expect(rel).toBe('noopener noreferrer');
        
        // All must be truthy
        expect(href && target && rel).toBeTruthy();
      }),
      { numRuns: 100 }
    );
  });
});
