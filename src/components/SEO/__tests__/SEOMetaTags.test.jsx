import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import SEOMetaTags from '../SEOMetaTags';

describe('SEOMetaTags Component', () => {
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

  beforeEach(() => {
    // Ensure clean state before each test
    document.title = '';
  });

  describe('Basic Meta Tags', () => {
    it('should set document title', () => {
      render(
        <SEOMetaTags
          title="Sharda University B.Tech CSE"
          description="Complete information about B.Tech CSE program"
        />
      );

      expect(document.title).toBe('Sharda University B.Tech CSE');
    });

    it('should create meta description tag', () => {
      const description = 'Complete information about B.Tech CSE program at Sharda University';
      
      render(
        <SEOMetaTags
          title="Sharda University B.Tech CSE"
          description={description}
        />
      );

      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription?.getAttribute('content')).toBe(description);
    });

    it('should create meta keywords tag with array of keywords', () => {
      const keywords = ['sharda university', 'b.tech cse', 'engineering fees'];
      
      render(
        <SEOMetaTags
          title="Sharda University B.Tech CSE"
          description="Complete information"
          keywords={keywords}
        />
      );

      const metaKeywords = document.querySelector('meta[name="keywords"]');
      expect(metaKeywords).toBeTruthy();
      expect(metaKeywords?.getAttribute('content')).toBe('sharda university, b.tech cse, engineering fees');
    });

    it('should handle empty keywords array', () => {
      render(
        <SEOMetaTags
          title="Sharda University"
          description="University information"
          keywords={[]}
        />
      );

      const metaKeywords = document.querySelector('meta[name="keywords"]');
      // Should either not exist or be empty
      if (metaKeywords) {
        expect(metaKeywords.getAttribute('content')).toBe('');
      }
    });

    it('should set robots meta tag to index by default', () => {
      render(
        <SEOMetaTags
          title="Sharda University"
          description="University information"
        />
      );

      const metaRobots = document.querySelector('meta[name="robots"]');
      expect(metaRobots).toBeTruthy();
      expect(metaRobots?.getAttribute('content')).toBe('index, follow');
    });

    it('should set robots meta tag to noindex when specified', () => {
      render(
        <SEOMetaTags
          title="Sharda University"
          description="University information"
          noindex={true}
        />
      );

      const metaRobots = document.querySelector('meta[name="robots"]');
      expect(metaRobots).toBeTruthy();
      expect(metaRobots?.getAttribute('content')).toBe('noindex, nofollow');
    });
  });

  describe('Canonical URL', () => {
    it('should create canonical link with relative URL', () => {
      render(
        <SEOMetaTags
          title="Sharda University"
          description="University information"
          canonicalUrl="/sharda/programs/btech-cse"
        />
      );

      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical).toBeTruthy();
      expect(canonical?.getAttribute('href')).toBe('https://www.nextgenlearning.dev/sharda/programs/btech-cse');
    });

    it('should create canonical link with absolute URL', () => {
      render(
        <SEOMetaTags
          title="Sharda University"
          description="University information"
          canonicalUrl="https://www.nextgenlearning.dev/sharda/programs/btech-cse"
        />
      );

      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical).toBeTruthy();
      expect(canonical?.getAttribute('href')).toBe('https://www.nextgenlearning.dev/sharda/programs/btech-cse');
    });

    it('should create canonical link to root when not provided', () => {
      render(
        <SEOMetaTags
          title="Sharda University"
          description="University information"
        />
      );

      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical).toBeTruthy();
      expect(canonical?.getAttribute('href')).toBe('https://www.nextgenlearning.dev/');
    });

    it('should replace existing canonical link', () => {
      // Create an existing canonical link
      const existingCanonical = document.createElement('link');
      existingCanonical.setAttribute('rel', 'canonical');
      existingCanonical.setAttribute('href', 'https://example.com/old');
      document.head.appendChild(existingCanonical);

      render(
        <SEOMetaTags
          title="Sharda University"
          description="University information"
          canonicalUrl="/sharda/new"
        />
      );

      const canonicals = document.querySelectorAll('link[rel="canonical"]');
      expect(canonicals.length).toBe(1);
      expect(canonicals[0].getAttribute('href')).toBe('https://www.nextgenlearning.dev/sharda/new');
    });
  });

  describe('Open Graph Tags', () => {
    it('should create all required Open Graph tags', () => {
      render(
        <SEOMetaTags
          title="Sharda University B.Tech CSE"
          description="Complete information about B.Tech CSE"
          canonicalUrl="/sharda/programs/btech-cse"
        />
      );

      expect(document.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe('website');
      expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe('https://www.nextgenlearning.dev/sharda/programs/btech-cse');
      expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('Sharda University B.Tech CSE');
      expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe('Complete information about B.Tech CSE');
      expect(document.querySelector('meta[property="og:site_name"]')?.getAttribute('content')).toBe('NextGen Learning - Tech & IT Courses');
      expect(document.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe('en_US');
    });

    it('should use custom og:type when provided', () => {
      render(
        <SEOMetaTags
          title="Sharda University Article"
          description="Article about Sharda"
          ogType="article"
        />
      );

      expect(document.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe('article');
    });

    it('should create og:image tags with custom image', () => {
      render(
        <SEOMetaTags
          title="Sharda University"
          description="University information"
          ogImage="/images/sharda-campus.jpg"
        />
      );

      expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe('https://www.nextgenlearning.dev/images/sharda-campus.jpg');
      expect(document.querySelector('meta[property="og:image:width"]')?.getAttribute('content')).toBe('1200');
      expect(document.querySelector('meta[property="og:image:height"]')?.getAttribute('content')).toBe('630');
      expect(document.querySelector('meta[property="og:image:alt"]')?.getAttribute('content')).toBe('Sharda University');
    });

    it('should use default og:image when not provided', () => {
      render(
        <SEOMetaTags
          title="Sharda University"
          description="University information"
        />
      );

      expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe('https://www.nextgenlearning.dev/og-image.svg');
    });

    it('should handle absolute URL for og:image', () => {
      render(
        <SEOMetaTags
          title="Sharda University"
          description="University information"
          ogImage="https://cdn.example.com/sharda.jpg"
        />
      );

      expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe('https://cdn.example.com/sharda.jpg');
    });
  });

  describe('Twitter Card Tags', () => {
    it('should create all required Twitter Card tags', () => {
      render(
        <SEOMetaTags
          title="Sharda University B.Tech CSE"
          description="Complete information about B.Tech CSE"
          canonicalUrl="/sharda/programs/btech-cse"
        />
      );

      expect(document.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe('summary_large_image');
      expect(document.querySelector('meta[name="twitter:url"]')?.getAttribute('content')).toBe('https://www.nextgenlearning.dev/sharda/programs/btech-cse');
      expect(document.querySelector('meta[name="twitter:title"]')?.getAttribute('content')).toBe('Sharda University B.Tech CSE');
      expect(document.querySelector('meta[name="twitter:description"]')?.getAttribute('content')).toBe('Complete information about B.Tech CSE');
      expect(document.querySelector('meta[name="twitter:site"]')?.getAttribute('content')).toBe('@NextGenLearning');
      expect(document.querySelector('meta[name="twitter:creator"]')?.getAttribute('content')).toBe('@NextGenLearning');
    });

    it('should create twitter:image tags', () => {
      render(
        <SEOMetaTags
          title="Sharda University"
          description="University information"
          ogImage="/images/sharda-campus.jpg"
        />
      );

      expect(document.querySelector('meta[name="twitter:image"]')?.getAttribute('content')).toBe('https://www.nextgenlearning.dev/images/sharda-campus.jpg');
      expect(document.querySelector('meta[name="twitter:image:alt"]')?.getAttribute('content')).toBe('Sharda University');
    });
  });

  describe('Structured Data', () => {
    it('should inject structured data as JSON-LD script', () => {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "B.Tech CSE",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Sharda University"
        }
      };

      render(
        <SEOMetaTags
          title="Sharda University B.Tech CSE"
          description="Complete information"
          structuredData={structuredData}
        />
      );

      const script = document.querySelector('script[type="application/ld+json"]#seo-structured-data');
      expect(script).toBeTruthy();
      
      const scriptContent = JSON.parse(script?.textContent || '{}');
      expect(scriptContent['@type']).toBe('Course');
      expect(scriptContent.name).toBe('B.Tech CSE');
      expect(scriptContent.provider.name).toBe('Sharda University');
    });

    it('should replace existing structured data script', () => {
      const structuredData1 = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Old Course"
      };

      const { rerender } = render(
        <SEOMetaTags
          title="Old Title"
          description="Old description"
          structuredData={structuredData1}
        />
      );

      const structuredData2 = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "New Course"
      };

      rerender(
        <SEOMetaTags
          title="New Title"
          description="New description"
          structuredData={structuredData2}
        />
      );

      const scripts = document.querySelectorAll('script[type="application/ld+json"]#seo-structured-data');
      expect(scripts.length).toBe(1);
      
      const scriptContent = JSON.parse(scripts[0].textContent || '{}');
      expect(scriptContent.name).toBe('New Course');
    });

    it('should not create script when structured data is not provided', () => {
      render(
        <SEOMetaTags
          title="Sharda University"
          description="University information"
        />
      );

      const script = document.querySelector('script[type="application/ld+json"]#seo-structured-data');
      expect(script).toBeFalsy();
    });
  });

  describe('Mobile Optimization Tags', () => {
    it('should create mobile optimization meta tags', () => {
      render(
        <SEOMetaTags
          title="Sharda University"
          description="University information"
        />
      );

      expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe('#2563eb');
      expect(document.querySelector('meta[name="mobile-web-app-capable"]')?.getAttribute('content')).toBe('yes');
      expect(document.querySelector('meta[name="apple-mobile-web-app-capable"]')?.getAttribute('content')).toBe('yes');
      expect(document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')?.getAttribute('content')).toBe('default');
    });
  });

  describe('Additional SEO Tags', () => {
    it('should create author meta tag', () => {
      render(
        <SEOMetaTags
          title="Sharda University"
          description="University information"
        />
      );

      expect(document.querySelector('meta[name="author"]')?.getAttribute('content')).toBe('NextGen Learning');
    });

    it('should create revisit-after meta tag', () => {
      render(
        <SEOMetaTags
          title="Sharda University"
          description="University information"
        />
      );

      expect(document.querySelector('meta[name="revisit-after"]')?.getAttribute('content')).toBe('7 days');
    });
  });

  describe('Component Updates', () => {
    it('should update meta tags when props change', () => {
      const { rerender } = render(
        <SEOMetaTags
          title="Old Title"
          description="Old description"
        />
      );

      expect(document.title).toBe('Old Title');
      expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('Old description');

      rerender(
        <SEOMetaTags
          title="New Title"
          description="New description"
        />
      );

      expect(document.title).toBe('New Title');
      expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('New description');
    });

    it('should update keywords when changed', () => {
      const { rerender } = render(
        <SEOMetaTags
          title="Title"
          description="Description"
          keywords={['keyword1', 'keyword2']}
        />
      );

      expect(document.querySelector('meta[name="keywords"]')?.getAttribute('content')).toBe('keyword1, keyword2');

      rerender(
        <SEOMetaTags
          title="Title"
          description="Description"
          keywords={['keyword3', 'keyword4', 'keyword5']}
        />
      );

      expect(document.querySelector('meta[name="keywords"]')?.getAttribute('content')).toBe('keyword3, keyword4, keyword5');
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing optional props gracefully', () => {
      expect(() => {
        render(
          <SEOMetaTags
            title="Sharda University"
            description="University information"
          />
        );
      }).not.toThrow();
    });

    it('should handle empty strings', () => {
      render(
        <SEOMetaTags
          title=""
          description=""
        />
      );

      // Should not throw, but may not create tags
      expect(document.title).toBe('');
    });

    it('should handle very long descriptions', () => {
      const longDescription = 'A'.repeat(500);
      
      render(
        <SEOMetaTags
          title="Sharda University"
          description={longDescription}
        />
      );

      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription?.getAttribute('content')).toBe(longDescription);
    });

    it('should handle special characters in title and description', () => {
      const title = 'Sharda University - B.Tech CSE & AI/ML';
      const description = 'Learn about "Computer Science" & <Engineering> at Sharda';
      
      render(
        <SEOMetaTags
          title={title}
          description={description}
        />
      );

      expect(document.title).toBe(title);
      expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(description);
    });
  });

  describe('Component Rendering', () => {
    it('should not render any visible elements', () => {
      const { container } = render(
        <SEOMetaTags
          title="Sharda University"
          description="University information"
        />
      );

      expect(container.firstChild).toBeNull();
    });
  });
});
