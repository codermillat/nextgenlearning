/**
 * Unit tests for UTM Generator utility
 * Feature: sharda-university-content-enhancement
 */

import { describe, it, expect } from 'vitest';
import {
  generateUTMLink,
  generateLandingPageLink,
  generateProgramPageLink,
  generateFeeCalculatorLink,
  generateComparisonPageLink,
  generateRankingPageLink,
  generateFeePageLink,
  generateBangladeshContentLink,
  generateBlogLink,
  generateFAQLink,
  generateFloatingCTALink,
  generateHeaderCTALink,
  generateFooterCTALink,
  parseUTMParameters,
  getBaseURL,
  isValidUTMLink,
} from '../utmGenerator';

describe('UTM Generator Utility', () => {
  describe('generateUTMLink', () => {
    it('should generate correct URL for Bangladesh students', () => {
      const url = generateUTMLink({
        country: 'Bangladesh',
        page: 'landing',
        contentType: 'landing',
        action: 'apply-now'
      });

      expect(url).toContain('https://global.sharda.ac.in/bangladesh/');
      expect(url).toContain('utm_source=studyatsharda_youtube');
      expect(url).toContain('utm_medium=NextGenLearning');
      expect(url).toContain('utm_campaign=SU_AdmissionsBD_2026');
      expect(url).toContain('utm_content=landing_apply-now');
    });

    it('should generate correct URL for international students', () => {
      const url = generateUTMLink({
        country: 'Nepal',
        page: 'landing',
        contentType: 'landing',
        action: 'apply-now'
      });

      expect(url).toContain('https://global.sharda.ac.in/');
      expect(url).not.toContain('/bangladesh/');
      expect(url).toContain('utm_source=studyatsharda_youtube');
      expect(url).toContain('utm_medium=NextGenLearning');
      expect(url).toContain('utm_campaign=SU_AdmissionsIntl_2026');
      expect(url).toContain('utm_content=landing_apply-now');
    });

    it('should include program in utm_content when provided', () => {
      const url = generateUTMLink({
        country: 'Bangladesh',
        page: 'program-btech-cse',
        contentType: 'program',
        program: 'btech-cse',
        action: 'apply-now'
      });

      expect(url).toContain('utm_content=program_btech-cse_apply-now');
    });

    it('should handle case-insensitive country matching', () => {
      const url1 = generateUTMLink({
        country: 'BANGLADESH',
        page: 'landing',
        contentType: 'landing'
      });

      const url2 = generateUTMLink({
        country: 'bangladesh',
        page: 'landing',
        contentType: 'landing'
      });

      expect(url1).toContain('/bangladesh/');
      expect(url2).toContain('/bangladesh/');
    });

    it('should use default action when not provided', () => {
      const url = generateUTMLink({
        country: 'Bangladesh',
        page: 'landing',
        contentType: 'landing'
      });

      expect(url).toContain('utm_content=landing_apply-now');
    });
  });

  describe('generateLandingPageLink', () => {
    it('should generate landing page link for Bangladesh', () => {
      const url = generateLandingPageLink('Bangladesh');

      expect(url).toContain('https://global.sharda.ac.in/bangladesh/');
      expect(url).toContain('utm_campaign=SU_AdmissionsBD_2026');
      expect(url).toContain('utm_content=landing_apply-now');
    });

    it('should generate landing page link for international students', () => {
      const url = generateLandingPageLink('India');

      expect(url).toContain('https://global.sharda.ac.in/');
      expect(url).toContain('utm_campaign=SU_AdmissionsIntl_2026');
    });
  });

  describe('generateProgramPageLink', () => {
    it('should generate program page link with program code', () => {
      const url = generateProgramPageLink('Bangladesh', 'btech-cse');

      expect(url).toContain('utm_content=program_btech-cse_apply-now');
      expect(url).toContain('utm_campaign=SU_AdmissionsBD_2026');
    });

    it('should work for different programs', () => {
      const url = generateProgramPageLink('Nepal', 'mba');

      expect(url).toContain('utm_content=program_mba_apply-now');
      expect(url).toContain('utm_campaign=SU_AdmissionsIntl_2026');
    });
  });

  describe('generateFeeCalculatorLink', () => {
    it('should generate fee calculator link', () => {
      const url = generateFeeCalculatorLink('Bangladesh', 'btech-cse');

      expect(url).toContain('utm_content=calculator_btech-cse_apply-with-calculation');
    });
  });

  describe('generateComparisonPageLink', () => {
    it('should generate comparison page link', () => {
      const url = generateComparisonPageLink('Bangladesh', 'sharda-vs-amity');

      expect(url).toContain('utm_content=comparison_apply-now');
    });
  });

  describe('generateRankingPageLink', () => {
    it('should generate ranking page link', () => {
      const url = generateRankingPageLink('Bangladesh');

      expect(url).toContain('utm_content=rankings_apply-now');
    });
  });

  describe('generateFeePageLink', () => {
    it('should generate fee page link with program', () => {
      const url = generateFeePageLink('Bangladesh', 'btech-cse');

      expect(url).toContain('utm_content=fees_btech-cse_apply-now');
    });
  });

  describe('generateBangladeshContentLink', () => {
    it('should always use Bangladesh URL', () => {
      const url = generateBangladeshContentLink('scholarship');

      expect(url).toContain('https://global.sharda.ac.in/bangladesh/');
      expect(url).toContain('utm_campaign=SU_AdmissionsBD_2026');
      expect(url).toContain('utm_content=bangladesh_scholarship');
    });

    it('should work for different content sections', () => {
      const url1 = generateBangladeshContentLink('admission-process');
      const url2 = generateBangladeshContentLink('testimonials');

      expect(url1).toContain('utm_content=bangladesh_admission-process');
      expect(url2).toContain('utm_content=bangladesh_testimonials');
    });
  });

  describe('generateBlogLink', () => {
    it('should generate blog link with article slug', () => {
      const url = generateBlogLink('Bangladesh', 'study-in-india-guide');

      expect(url).toContain('utm_content=blog_apply-now');
    });
  });

  describe('generateFAQLink', () => {
    it('should generate FAQ link with category', () => {
      const url = generateFAQLink('Bangladesh', 'admission');

      expect(url).toContain('utm_content=faq_admission');
    });
  });

  describe('generateFloatingCTALink', () => {
    it('should generate floating CTA link', () => {
      const url = generateFloatingCTALink('Bangladesh', 'program-btech-cse');

      expect(url).toContain('utm_content=floating-cta_apply-now');
    });
  });

  describe('generateHeaderCTALink', () => {
    it('should generate header CTA link', () => {
      const url = generateHeaderCTALink('Bangladesh');

      expect(url).toContain('utm_content=header-cta_apply-now');
    });
  });

  describe('generateFooterCTALink', () => {
    it('should generate footer CTA link', () => {
      const url = generateFooterCTALink('Bangladesh');

      expect(url).toContain('utm_content=footer-cta_apply-now');
    });
  });

  describe('parseUTMParameters', () => {
    it('should parse UTM parameters from URL', () => {
      const url = 'https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=landing_apply-now';
      const params = parseUTMParameters(url);

      expect(params).toEqual({
        utm_source: 'studyatsharda_youtube',
        utm_medium: 'NextGenLearning',
        utm_campaign: 'SU_AdmissionsBD_2026',
        utm_content: 'landing_apply-now',
        utm_term: null,
      });
    });

    it('should return null for invalid URL', () => {
      const params = parseUTMParameters('not-a-valid-url');

      expect(params).toBeNull();
    });

    it('should handle missing UTM parameters', () => {
      const url = 'https://global.sharda.ac.in/';
      const params = parseUTMParameters(url);

      expect(params).toEqual({
        utm_source: null,
        utm_medium: null,
        utm_campaign: null,
        utm_content: null,
        utm_term: null,
      });
    });
  });

  describe('getBaseURL', () => {
    it('should return Bangladesh URL for Bangladesh', () => {
      const url = getBaseURL('Bangladesh');

      expect(url).toBe('https://global.sharda.ac.in/bangladesh/');
    });

    it('should return international URL for other countries', () => {
      const url1 = getBaseURL('Nepal');
      const url2 = getBaseURL('India');
      const url3 = getBaseURL('Sri Lanka');

      expect(url1).toBe('https://global.sharda.ac.in/');
      expect(url2).toBe('https://global.sharda.ac.in/');
      expect(url3).toBe('https://global.sharda.ac.in/');
    });

    it('should handle undefined country', () => {
      const url = getBaseURL();

      expect(url).toBe('https://global.sharda.ac.in/');
    });
  });

  describe('isValidUTMLink', () => {
    it('should validate correct UTM link', () => {
      const url = 'https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=landing_apply-now';

      expect(isValidUTMLink(url)).toBe(true);
    });

    it('should reject URL without UTM parameters', () => {
      const url = 'https://global.sharda.ac.in/bangladesh/';

      expect(isValidUTMLink(url)).toBe(false);
    });

    it('should reject URL with incomplete UTM parameters', () => {
      const url = 'https://global.sharda.ac.in/bangladesh/?utm_source=test&utm_medium=test';

      expect(isValidUTMLink(url)).toBe(false);
    });

    it('should reject non-Sharda URL', () => {
      const url = 'https://example.com/?utm_source=test&utm_medium=test&utm_campaign=test&utm_content=test';

      expect(isValidUTMLink(url)).toBe(false);
    });

    it('should reject invalid URL', () => {
      expect(isValidUTMLink('not-a-url')).toBe(false);
    });
  });

  describe('UTM Parameter Consistency', () => {
    it('should use consistent utm_source across all links', () => {
      const urls = [
        generateLandingPageLink('Bangladesh'),
        generateProgramPageLink('Nepal', 'btech-cse'),
        generateFeeCalculatorLink('India', 'mba'),
        generateRankingPageLink('Bangladesh'),
      ];

      urls.forEach(url => {
        expect(url).toContain('utm_source=studyatsharda_youtube');
      });
    });

    it('should use consistent utm_medium across all links', () => {
      const urls = [
        generateLandingPageLink('Bangladesh'),
        generateProgramPageLink('Nepal', 'btech-cse'),
        generateFeeCalculatorLink('India', 'mba'),
      ];

      urls.forEach(url => {
        expect(url).toContain('utm_medium=NextGenLearning');
      });
    });

    it('should differentiate campaigns for Bangladesh vs International', () => {
      const bdUrl = generateLandingPageLink('Bangladesh');
      const intlUrl = generateLandingPageLink('Nepal');

      expect(bdUrl).toContain('utm_campaign=SU_AdmissionsBD_2026');
      expect(intlUrl).toContain('utm_campaign=SU_AdmissionsIntl_2026');
    });
  });

  describe('URL Format', () => {
    it('should generate valid URLs', () => {
      const url = generateLandingPageLink('Bangladesh');

      expect(() => new URL(url)).not.toThrow();
    });

    it('should use HTTPS protocol', () => {
      const url = generateLandingPageLink('Bangladesh');

      expect(url).toMatch(/^https:\/\//);
    });

    it('should properly encode special characters in parameters', () => {
      const url = generateUTMLink({
        country: 'Bangladesh',
        page: 'test page',
        contentType: 'test content',
        action: 'test action'
      });

      expect(() => new URL(url)).not.toThrow();
    });
  });
});
