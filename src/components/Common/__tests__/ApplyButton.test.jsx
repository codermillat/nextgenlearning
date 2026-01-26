/**
 * Unit tests for ApplyButton component
 * Run with: npx vitest run src/components/Common/__tests__/ApplyButton.test.jsx
 * 
 * Tests verify:
 * - Correct URL for Sharda University
 * - Fallback URL for other universities
 * - Proper attributes (target="_blank", rel="noopener noreferrer")
 * - Variant and size props work correctly
 * - Custom className is applied
 * 
 * Requirements: 3.1, 3.2, 3.3, 14.3
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ApplyButton from '../ApplyButton.jsx';
import { SHARDA_APPLY_URL } from '../../../config/constants.js';

describe('ApplyButton Component', () => {
  describe('Sharda University Apply URL', () => {
    it('should use Sharda apply URL for "sharda" university ID', () => {
      const { container } = render(<ApplyButton universityId="sharda" />);
      const link = container.querySelector('a');
      
      expect(link.getAttribute('href')).toBe(SHARDA_APPLY_URL);
      expect(link.getAttribute('href')).toBe('https://bit.ly/4pZTRTs');
    });

    it('should use Sharda apply URL for "sharda-university" university ID', () => {
      const { container } = render(<ApplyButton universityId="sharda-university" />);
      const link = container.querySelector('a');
      
      expect(link.getAttribute('href')).toBe(SHARDA_APPLY_URL);
      expect(link.getAttribute('href')).toBe('https://bit.ly/4pZTRTs');
    });

    it('should display "Apply Now" as default text', () => {
      const { container } = render(<ApplyButton universityId="sharda" />);
      const link = container.querySelector('a');
      
      expect(link.textContent).toBe('Apply Now');
    });

    it('should allow custom button text', () => {
      const { container } = render(
        <ApplyButton universityId="sharda">
          Apply to Sharda University
        </ApplyButton>
      );
      const link = container.querySelector('a');
      
      expect(link.textContent).toBe('Apply to Sharda University');
    });
  });

  describe('Fallback URL for Other Universities', () => {
    it('should use fallback URL for unknown university ID', () => {
      const { container } = render(<ApplyButton universityId="unknown-university" />);
      const link = container.querySelector('a');
      
      expect(link.getAttribute('href')).toBe('/apply');
    });

    it('should use fallback URL when no university ID is provided', () => {
      const { container } = render(<ApplyButton />);
      const link = container.querySelector('a');
      
      expect(link.getAttribute('href')).toBe('/apply');
    });

    it('should use fallback URL for other universities', () => {
      const { container } = render(<ApplyButton universityId="galgotias" />);
      const link = container.querySelector('a');
      
      expect(link.getAttribute('href')).toBe('/apply');
    });
  });

  describe('Link Attributes', () => {
    it('should have target="_blank" attribute', () => {
      const { container } = render(<ApplyButton universityId="sharda" />);
      const link = container.querySelector('a');
      
      expect(link.getAttribute('target')).toBe('_blank');
    });

    it('should have rel="noopener noreferrer" attribute', () => {
      const { container } = render(<ApplyButton universityId="sharda" />);
      const link = container.querySelector('a');
      
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('should have both security attributes for all university IDs', () => {
      const universityIds = ['sharda', 'sharda-university', 'galgotias', undefined];
      
      universityIds.forEach(id => {
        const { container } = render(<ApplyButton universityId={id} />);
        const link = container.querySelector('a');
        
        expect(link.getAttribute('target')).toBe('_blank');
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      });
    });
  });

  describe('Variant Prop', () => {
    it('should apply primary variant by default', () => {
      const { container } = render(<ApplyButton universityId="sharda" />);
      const link = container.querySelector('a');
      
      expect(link.className).toContain('from-blue-600');
      expect(link.className).toContain('to-indigo-600');
    });

    it('should apply secondary variant when specified', () => {
      const { container } = render(<ApplyButton universityId="sharda" variant="secondary" />);
      const link = container.querySelector('a');
      
      expect(link.className).toContain('bg-white/10');
      expect(link.className).toContain('backdrop-blur-sm');
    });

    it('should apply white variant when specified', () => {
      const { container } = render(<ApplyButton universityId="sharda" variant="white" />);
      const link = container.querySelector('a');
      
      expect(link.className).toContain('bg-white');
      expect(link.className).toContain('text-blue-600');
    });

    it('should apply outline variant when specified', () => {
      const { container } = render(<ApplyButton universityId="sharda" variant="outline" />);
      const link = container.querySelector('a');
      
      expect(link.className).toContain('border-2');
      expect(link.className).toContain('border-blue-600');
    });

    it('should apply ghost variant when specified', () => {
      const { container } = render(<ApplyButton universityId="sharda" variant="ghost" />);
      const link = container.querySelector('a');
      
      expect(link.className).toContain('bg-transparent');
      expect(link.className).toContain('text-gray-700');
    });
  });

  describe('Size Prop', () => {
    it('should apply medium size by default', () => {
      const { container } = render(<ApplyButton universityId="sharda" />);
      const link = container.querySelector('a');
      
      expect(link.className).toContain('px-6');
      expect(link.className).toContain('py-3');
    });

    it('should apply small size when specified', () => {
      const { container } = render(<ApplyButton universityId="sharda" size="sm" />);
      const link = container.querySelector('a');
      
      expect(link.className).toContain('px-4');
      expect(link.className).toContain('py-2');
      expect(link.className).toContain('text-sm');
    });

    it('should apply large size when specified', () => {
      const { container } = render(<ApplyButton universityId="sharda" size="lg" />);
      const link = container.querySelector('a');
      
      expect(link.className).toContain('px-8');
      expect(link.className).toContain('py-4');
    });
  });

  describe('Custom ClassName', () => {
    it('should apply custom className in addition to default classes', () => {
      const { container } = render(
        <ApplyButton universityId="sharda" className="custom-class" />
      );
      const link = container.querySelector('a');
      
      expect(link.className).toContain('custom-class');
      expect(link.className).toContain('from-blue-600'); // Still has default classes
    });

    it('should apply multiple custom classes', () => {
      const { container } = render(
        <ApplyButton universityId="sharda" className="custom-1 custom-2 custom-3" />
      );
      const link = container.querySelector('a');
      
      expect(link.className).toContain('custom-1');
      expect(link.className).toContain('custom-2');
      expect(link.className).toContain('custom-3');
    });
  });

  describe('Base Styling', () => {
    it('should have base button classes', () => {
      const { container } = render(<ApplyButton universityId="sharda" />);
      const link = container.querySelector('a');
      
      expect(link.className).toContain('font-bold');
      expect(link.className).toContain('transition-all');
      expect(link.className).toContain('min-h-[44px]');
      expect(link.className).toContain('flex');
      expect(link.className).toContain('items-center');
      expect(link.className).toContain('justify-center');
    });

    it('should have rounded corners', () => {
      const { container } = render(<ApplyButton universityId="sharda" />);
      const link = container.querySelector('a');
      
      expect(link.className).toContain('rounded-lg');
    });

    it('should have focus styles', () => {
      const { container } = render(<ApplyButton universityId="sharda" />);
      const link = container.querySelector('a');
      
      expect(link.className).toContain('focus:outline-none');
      expect(link.className).toContain('focus:ring-2');
    });
  });

  describe('Additional Props', () => {
    it('should pass through additional props to the anchor element', () => {
      const { container } = render(
        <ApplyButton 
          universityId="sharda" 
          data-testid="apply-button"
          aria-label="Apply to Sharda University"
        />
      );
      const link = container.querySelector('a');
      
      expect(link.getAttribute('data-testid')).toBe('apply-button');
      expect(link.getAttribute('aria-label')).toBe('Apply to Sharda University');
    });

    it('should support onClick handler', () => {
      let clicked = false;
      const handleClick = () => { clicked = true; };
      
      const { container } = render(
        <ApplyButton universityId="sharda" onClick={handleClick} />
      );
      const link = container.querySelector('a');
      
      link.click();
      expect(clicked).toBe(true);
    });
  });

  describe('Consistency Across Renders', () => {
    it('should maintain consistent URL across multiple renders', () => {
      for (let i = 0; i < 5; i++) {
        const { container } = render(<ApplyButton universityId="sharda" />);
        const link = container.querySelector('a');
        
        expect(link.getAttribute('href')).toBe('https://bit.ly/4pZTRTs');
        expect(link.getAttribute('target')).toBe('_blank');
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      }
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', () => {
      const { container } = render(<ApplyButton universityId="sharda" />);
      const link = container.querySelector('a');
      
      // Links are naturally keyboard accessible
      expect(link.tagName).toBe('A');
      expect(link.getAttribute('href')).toBeTruthy();
    });

    it('should have minimum touch target size', () => {
      const { container } = render(<ApplyButton universityId="sharda" />);
      const link = container.querySelector('a');
      
      // Should have min-h-[44px] for accessibility
      expect(link.className).toContain('min-h-[44px]');
    });

    it('should have visible focus indicator', () => {
      const { container } = render(<ApplyButton universityId="sharda" />);
      const link = container.querySelector('a');
      
      expect(link.className).toContain('focus:ring-2');
    });
  });
});
