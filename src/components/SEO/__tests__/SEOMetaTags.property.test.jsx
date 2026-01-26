import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import fc from 'fast-check';
import SEOMetaTags from '../SEOMetaTags';

describe('SEOMetaTags Component - Property-Based Tests', () => {
  // Clean up DOM after each test
  afterEach(() => {
    cleanup();
    
    // Clean up meta tags
    document.querySelectorAll('meta').forEach(meta => {
      const name = meta.getAttribute('name') || meta.getAttribute('property');
      if (name && (
        name.startsWith('og:') || 
        name.startsWith('twitter:') ||
        ['title', 'description', 'keywords', 'robots', 'author'].includes(name)
      )) {
        meta.remove();
      }
    });
    
    // Clean up canonical links
    document.querySelectorAll('link[rel="canonical"]').forEach(link => link.remove());
    
    // Clean up structured data scripts
    document.querySelectorAll('script[type="application/ld+json"]').forEach(script => script.remove());
    
    // Reset document title
    document.title = '';
  });

  /**
   * Property 3: SEO Keyword Integration
   * Feature: sharda-university-content-enhancement, Property 3
   * 
   * For any SEO-optimized page with a target keyword, that keyword should appear 
   * in the page title, meta description, H1 tag, and naturally throughout the content body.
   * 
   * Note: This test validates that keywords appear in title and description.
   * H1 and content body are validated at the page level, not component level.
   * Note: HTML normalizes whitespace, so we normalize both expected and actual values.
   * 
   * Validates: Requirements 3.3
   */
  it('Property 3: SEO Keyword Integration - keywords in title and description', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 3, maxLength: 50 }).filter(s => s.trim().length > 0),
        fc.string({ minLength: 10, maxLength: 200 }).filter(s => s.trim().length > 0),
        fc.array(fc.string({ minLength: 2, maxLength: 30 }).filter(s => s.trim().length > 0), { minLength: 1, maxLength: 10 }),
        (baseTitle, baseDescription, keywords) => {
          // Ensure at least one keyword appears in title and description
          const keyword = keywords[0].trim();
          const title = `${baseTitle.trim()} ${keyword}`;
          const description = `${baseDescription.trim()} ${keyword}`;
          
          render(
            <SEOMetaTags
              title={title}
              description={description}
              keywords={keywords}
            />
          );
          
          // Helper to normalize whitespace (HTML normalizes multiple spaces to single space)
          const normalizeWhitespace = (str) => str.replace(/\s+/g, ' ').trim();
          const normalizedKeyword = normalizeWhitespace(keyword.toLowerCase());
          
          // Verify keyword appears in title
          const actualTitle = normalizeWhitespace(document.title.toLowerCase());
          expect(actualTitle).toContain(normalizedKeyword);
          
          // Verify keyword appears in meta description
          const metaDescription = document.querySelector('meta[name="description"]');
          const actualDescription = normalizeWhitespace(metaDescription?.getAttribute('content')?.toLowerCase() || '');
          expect(actualDescription).toContain(normalizedKeyword);
          
          // Verify keyword appears in og:title
          const ogTitle = document.querySelector('meta[property="og:title"]');
          const actualOgTitle = normalizeWhitespace(ogTitle?.getAttribute('content')?.toLowerCase() || '');
          expect(actualOgTitle).toContain(normalizedKeyword);
          
          // Verify keyword appears in og:description
          const ogDescription = document.querySelector('meta[property="og:description"]');
          const actualOgDescription = normalizeWhitespace(ogDescription?.getAttribute('content')?.toLowerCase() || '');
          expect(actualOgDescription).toContain(normalizedKeyword);
          
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5: Meta Description Length Constraint
   * Feature: sharda-university-content-enhancement, Property 5
   * 
   * For any page, the meta description should be unique and contain no more than 160 characters.
   * 
   * Validates: Requirements 3.5
   */
  it('Property 5: Meta Description Length Constraint', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }),
        fc.string({ minLength: 10, maxLength: 160 }),
        (title, description) => {
          render(
            <SEOMetaTags
              title={title}
              description={description}
            />
          );
          
          const metaDescription = document.querySelector('meta[name="description"]');
          const content = metaDescription?.getAttribute('content') || '';
          
          // Verify description is not empty
          expect(content.length).toBeGreaterThan(0);
          
          // Verify description is at most 160 characters
          expect(content.length).toBeLessThanOrEqual(160);
          
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Canonical URL Format Consistency
   * 
   * For any canonical URL provided, it should be properly formatted as an absolute URL
   * with the site domain prepended if it's a relative URL.
   */
  it('should ensure canonical URLs are absolute and properly formatted', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.string({ minLength: 10, maxLength: 100 }),
        fc.oneof(
          fc.webPath(),
          fc.constant('/sharda/programs/btech-cse'),
          fc.constant('/sharda/fees'),
          fc.constant('/sharda/rankings')
        ),
        (title, description, path) => {
          render(
            <SEOMetaTags
              title={title}
              description={description}
              canonicalUrl={path}
            />
          );
          
          const canonical = document.querySelector('link[rel="canonical"]');
          const href = canonical?.getAttribute('href') || '';
          
          // Verify canonical URL is absolute
          expect(href).toMatch(/^https?:\/\//);
          
          // Verify it includes the site domain
          expect(href).toContain('nextgenlearning.dev');
          
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Open Graph Tags Completeness
   * 
   * For any page with SEO meta tags, all required Open Graph tags should be present
   * (og:type, og:url, og:title, og:description, og:image, og:site_name, og:locale).
   */
  it('should create all required Open Graph tags for any valid input', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 5, maxLength: 100 }),
        fc.string({ minLength: 20, maxLength: 160 }),
        fc.constantFrom('website', 'article', 'profile'),
        (title, description, ogType) => {
          render(
            <SEOMetaTags
              title={title}
              description={description}
              ogType={ogType}
            />
          );
          
          // Verify all required OG tags exist
          expect(document.querySelector('meta[property="og:type"]')).toBeTruthy();
          expect(document.querySelector('meta[property="og:url"]')).toBeTruthy();
          expect(document.querySelector('meta[property="og:title"]')).toBeTruthy();
          expect(document.querySelector('meta[property="og:description"]')).toBeTruthy();
          expect(document.querySelector('meta[property="og:image"]')).toBeTruthy();
          expect(document.querySelector('meta[property="og:site_name"]')).toBeTruthy();
          expect(document.querySelector('meta[property="og:locale"]')).toBeTruthy();
          
          // Verify og:type matches input
          const ogTypeTag = document.querySelector('meta[property="og:type"]');
          expect(ogTypeTag?.getAttribute('content')).toBe(ogType);
          
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Twitter Card Tags Completeness
   * 
   * For any page with SEO meta tags, all required Twitter Card tags should be present
   * (twitter:card, twitter:url, twitter:title, twitter:description, twitter:image).
   */
  it('should create all required Twitter Card tags for any valid input', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 5, maxLength: 100 }),
        fc.string({ minLength: 20, maxLength: 160 }),
        (title, description) => {
          render(
            <SEOMetaTags
              title={title}
              description={description}
            />
          );
          
          // Verify all required Twitter Card tags exist
          expect(document.querySelector('meta[name="twitter:card"]')).toBeTruthy();
          expect(document.querySelector('meta[name="twitter:url"]')).toBeTruthy();
          expect(document.querySelector('meta[name="twitter:title"]')).toBeTruthy();
          expect(document.querySelector('meta[name="twitter:description"]')).toBeTruthy();
          expect(document.querySelector('meta[name="twitter:image"]')).toBeTruthy();
          expect(document.querySelector('meta[name="twitter:site"]')).toBeTruthy();
          expect(document.querySelector('meta[name="twitter:creator"]')).toBeTruthy();
          
          // Verify twitter:card is always summary_large_image
          const twitterCard = document.querySelector('meta[name="twitter:card"]');
          expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');
          
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Structured Data Validity
   * 
   * For any structured data provided, it should be properly formatted as valid JSON-LD
   * and injected into the document head.
   */
  it('should inject valid JSON-LD structured data for any schema object', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 5, maxLength: 50 }),
        fc.string({ minLength: 10, maxLength: 100 }),
        fc.string({ minLength: 5, maxLength: 50 }),
        fc.constantFrom('Course', 'Organization', 'FAQPage', 'Article'),
        (title, description, name, schemaType) => {
          const structuredData = {
            "@context": "https://schema.org",
            "@type": schemaType,
            "name": name,
            "description": description
          };
          
          render(
            <SEOMetaTags
              title={title}
              description={description}
              structuredData={structuredData}
            />
          );
          
          const script = document.querySelector('script[type="application/ld+json"]#seo-structured-data');
          expect(script).toBeTruthy();
          
          // Verify it's valid JSON
          const scriptContent = JSON.parse(script?.textContent || '{}');
          expect(scriptContent['@context']).toBe('https://schema.org');
          expect(scriptContent['@type']).toBe(schemaType);
          expect(scriptContent.name).toBe(name);
          
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Keywords Array Handling
   * 
   * For any array of keywords, they should be properly joined with commas
   * and set in the keywords meta tag.
   */
  it('should properly format keywords array into comma-separated string', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 5, maxLength: 50 }),
        fc.string({ minLength: 10, maxLength: 100 }),
        fc.array(fc.string({ minLength: 2, maxLength: 30 }), { minLength: 1, maxLength: 10 }),
        (title, description, keywords) => {
          render(
            <SEOMetaTags
              title={title}
              description={description}
              keywords={keywords}
            />
          );
          
          const metaKeywords = document.querySelector('meta[name="keywords"]');
          const content = metaKeywords?.getAttribute('content') || '';
          
          // Verify all keywords are present in the content
          keywords.forEach(keyword => {
            expect(content).toContain(keyword);
          });
          
          // Verify keywords are comma-separated
          const keywordArray = content.split(',').map(k => k.trim());
          expect(keywordArray.length).toBeGreaterThanOrEqual(keywords.length);
          
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Robots Meta Tag Consistency
   * 
   * For any page, the robots meta tag should be set to either "index, follow"
   * or "noindex, nofollow" based on the noindex prop.
   */
  it('should set robots meta tag correctly based on noindex prop', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 5, maxLength: 50 }),
        fc.string({ minLength: 10, maxLength: 100 }),
        fc.boolean(),
        (title, description, noindex) => {
          render(
            <SEOMetaTags
              title={title}
              description={description}
              noindex={noindex}
            />
          );
          
          const metaRobots = document.querySelector('meta[name="robots"]');
          const content = metaRobots?.getAttribute('content') || '';
          
          if (noindex) {
            expect(content).toBe('noindex, nofollow');
          } else {
            expect(content).toBe('index, follow');
          }
          
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Image URL Handling
   * 
   * For any image URL (relative or absolute), it should be properly formatted
   * as an absolute URL in og:image and twitter:image tags.
   */
  it('should properly format image URLs as absolute URLs', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 5, maxLength: 50 }),
        fc.string({ minLength: 10, maxLength: 100 }),
        fc.oneof(
          fc.webPath().map(path => `/images${path}`),
          fc.constant('/images/sharda-campus.jpg'),
          fc.constant('https://cdn.example.com/image.jpg')
        ),
        (title, description, imagePath) => {
          render(
            <SEOMetaTags
              title={title}
              description={description}
              ogImage={imagePath}
            />
          );
          
          const ogImage = document.querySelector('meta[property="og:image"]');
          const twitterImage = document.querySelector('meta[name="twitter:image"]');
          
          const ogImageUrl = ogImage?.getAttribute('content') || '';
          const twitterImageUrl = twitterImage?.getAttribute('content') || '';
          
          // Verify both are absolute URLs
          expect(ogImageUrl).toMatch(/^https?:\/\//);
          expect(twitterImageUrl).toMatch(/^https?:\/\//);
          
          // Verify they match
          expect(ogImageUrl).toBe(twitterImageUrl);
          
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Meta Tag Update Consistency
   * 
   * For any change in props, all related meta tags should be updated consistently.
   */
  it('should update all related meta tags when props change', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 5, maxLength: 50 }).filter(s => s.trim().length >= 3 && !s.includes('  ')).map(s => s.trim()),
        fc.string({ minLength: 10, maxLength: 100 }).filter(s => s.trim().length >= 10 && !s.includes('  ')).map(s => s.trim()),
        fc.string({ minLength: 5, maxLength: 50 }).filter(s => s.trim().length >= 3 && !s.includes('  ')).map(s => s.trim()),
        fc.string({ minLength: 10, maxLength: 100 }).filter(s => s.trim().length >= 10 && !s.includes('  ')).map(s => s.trim()),
        (title1, description1, title2, description2) => {
          // Skip if titles or descriptions are the same
          if (title1 === title2 && description1 === description2) {
            return true;
          }
          
          const { rerender } = render(
            <SEOMetaTags
              title={title1}
              description={description1}
            />
          );
          
          // Verify initial values
          expect(document.title).toBe(title1);
          expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(description1);
          
          // Update props
          rerender(
            <SEOMetaTags
              title={title2}
              description={description2}
            />
          );
          
          // Verify updated values
          expect(document.title).toBe(title2);
          expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(description2);
          expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(title2);
          expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe(description2);
          expect(document.querySelector('meta[name="twitter:title"]')?.getAttribute('content')).toBe(title2);
          expect(document.querySelector('meta[name="twitter:description"]')?.getAttribute('content')).toBe(description2);
          
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Mobile Optimization Tags Presence
   * 
   * For any page, mobile optimization meta tags should always be present.
   */
  it('should always create mobile optimization meta tags', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 5, maxLength: 50 }),
        fc.string({ minLength: 10, maxLength: 100 }),
        (title, description) => {
          render(
            <SEOMetaTags
              title={title}
              description={description}
            />
          );
          
          // Verify mobile optimization tags exist
          expect(document.querySelector('meta[name="theme-color"]')).toBeTruthy();
          expect(document.querySelector('meta[name="mobile-web-app-capable"]')).toBeTruthy();
          expect(document.querySelector('meta[name="apple-mobile-web-app-capable"]')).toBeTruthy();
          expect(document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')).toBeTruthy();
          
          // Verify theme color is consistent
          const themeColor = document.querySelector('meta[name="theme-color"]');
          expect(themeColor?.getAttribute('content')).toBe('#2563eb');
          
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });
});
