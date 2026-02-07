import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ShardaLandingPage from '../ShardaLandingPage';

/**
 * Unit tests for ShardaLandingPage Component
 * Feature: sharda-university-content-enhancement
 * 
 * Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 3.3, 3.4, 3.6
 */
describe('ShardaLandingPage', () => {
  // Clean up DOM after each test
  afterEach(() => {
    // Clean up any meta tags or scripts added during tests
    document.querySelectorAll('meta[data-test]').forEach(el => el.remove());
    document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
  });

  it('renders without crashing', () => {
    render(<ShardaLandingPage />);
  });

  it('displays all required sections', () => {
    const { container } = render(<ShardaLandingPage />);
    
    // Check for all required sections
    expect(container.querySelector('[data-section="hero"]')).toBeTruthy();
    expect(container.querySelector('[data-section="about"]')).toBeTruthy();
    expect(container.querySelector('[data-section="rankings"]')).toBeTruthy();
    expect(container.querySelector('[data-section="programs"]')).toBeTruthy();
    expect(container.querySelector('[data-section="placements"]')).toBeTruthy();
    expect(container.querySelector('[data-section="campus"]')).toBeTruthy();
    expect(container.querySelector('[data-section="testimonials"]')).toBeTruthy();
    expect(container.querySelector('[data-section="faq"]')).toBeTruthy();
  });

  // Requirements 1.1 & 1.2: Test comprehensive overview and logical organization
  describe('Section Completeness and Organization (Requirements 1.1, 1.2)', () => {
    it('displays hero section with university profile', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const heroSection = container.querySelector('[data-section="hero"]');
      expect(heroSection).toBeTruthy();
      expect(heroSection.textContent).toContain('Sharda University');
      expect(heroSection.textContent).toContain('Inspiring Excellence');
    });

    it('displays about section with university profile and accreditations', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const aboutSection = container.querySelector('[data-section="about"]');
      expect(aboutSection).toBeTruthy();
      expect(aboutSection.textContent).toContain('About Sharda University');
      expect(aboutSection.textContent).toContain('Accreditations');
      expect(aboutSection.textContent).toContain('NAAC');
    });

    it('displays rankings section with ranking data', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const rankingsSection = container.querySelector('[data-section="rankings"]');
      expect(rankingsSection).toBeTruthy();
      expect(rankingsSection.textContent).toContain('Rankings');
      expect(rankingsSection.textContent).toContain('NIRF');
    });

    it('displays programs section with program information', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const programsSection = container.querySelector('[data-section="programs"]');
      expect(programsSection).toBeTruthy();
      expect(programsSection.textContent).toContain('Popular Programs');
      expect(programsSection.textContent).toContain('B.Tech');
    });

    it('displays placements section with placement statistics', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const placementsSection = container.querySelector('[data-section="placements"]');
      expect(placementsSection).toBeTruthy();
      expect(placementsSection.textContent).toContain('Placement');
      expect(placementsSection.textContent).toContain('Companies Visited');
      expect(placementsSection.textContent).toContain('Students Placed');
    });

    it('displays campus section with campus facilities', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const campusSection = container.querySelector('[data-section="campus"]');
      expect(campusSection).toBeTruthy();
      expect(campusSection.textContent).toContain('Campus');
      expect(campusSection.textContent).toContain('Facilities');
      expect(campusSection.textContent).toContain('Hospital');
    });

    it('displays testimonials section with student stories', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const testimonialsSection = container.querySelector('[data-section="testimonials"]');
      expect(testimonialsSection).toBeTruthy();
      expect(testimonialsSection.textContent).toContain('Student Success Stories');
    });

    it('displays FAQ section with questions and answers', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const faqSection = container.querySelector('[data-section="faq"]');
      expect(faqSection).toBeTruthy();
      expect(faqSection.textContent).toContain('Frequently Asked Questions');
    });

    it('displays sections in logical order', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const sections = container.querySelectorAll('[data-section]');
      const sectionOrder = Array.from(sections).map(section => section.getAttribute('data-section'));
      
      // Verify sections appear in expected order
      expect(sectionOrder.indexOf('hero')).toBeLessThan(sectionOrder.indexOf('about'));
      expect(sectionOrder.indexOf('about')).toBeLessThan(sectionOrder.indexOf('rankings'));
      expect(sectionOrder.indexOf('rankings')).toBeLessThan(sectionOrder.indexOf('programs'));
      expect(sectionOrder.indexOf('programs')).toBeLessThan(sectionOrder.indexOf('placements'));
      expect(sectionOrder.indexOf('placements')).toBeLessThan(sectionOrder.indexOf('campus'));
      expect(sectionOrder.indexOf('campus')).toBeLessThan(sectionOrder.indexOf('testimonials'));
      expect(sectionOrder.indexOf('testimonials')).toBeLessThan(sectionOrder.indexOf('faq'));
    });

    it('includes key differentiators in about section', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const aboutSection = container.querySelector('[data-section="about"]');
      const aboutText = aboutSection.textContent;
      
      // Check for key differentiators
      expect(aboutText).toContain('Established');
      expect(aboutText).toContain('Chancellor');
      expect(aboutText).toContain('Vice Chancellor');
    });

    it('includes hospital information in campus section', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const campusSection = container.querySelector('[data-section="campus"]');
      expect(campusSection.textContent).toContain('Sharda Hospital');
      expect(campusSection.textContent).toContain('1600+');
      expect(campusSection.textContent).toContain('bed');
    });

    it('includes placement statistics in placements section', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const placementsSection = container.querySelector('[data-section="placements"]');
      const placementsText = placementsSection.textContent;
      
      // Check for key placement metrics
      expect(placementsText).toContain('Companies Visited');
      expect(placementsText).toContain('Students Placed');
      expect(placementsText).toContain('Highest Package');
      expect(placementsText).toContain('Placement Rate');
    });

    it('includes top recruiters in placements section', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const placementsSection = container.querySelector('[data-section="placements"]');
      expect(placementsSection.textContent).toContain('Top Recruiters');
    });

    it('includes program fees in programs section', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const programsSection = container.querySelector('[data-section="programs"]');
      expect(programsSection.textContent).toContain('Lakhs');
      expect(programsSection.textContent).toContain('year');
    });
  });

  it('displays university name and tagline', () => {
    render(<ShardaLandingPage />);
    
    expect(screen.getByText('Sharda University')).toBeTruthy();
    expect(screen.getByText('Inspiring Excellence')).toBeTruthy();
  });

  it('displays key statistics in hero section', () => {
    const { container } = render(<ShardaLandingPage />);
    
    // Check for key statistics in hero section specifically
    const heroSection = container.querySelector('[data-section="hero"]');
    expect(heroSection).toBeTruthy();
    expect(heroSection.textContent).toContain('95+');
    expect(heroSection.textContent).toContain('Countries Represented');
    expect(heroSection.textContent).toContain('1,600+');
    expect(heroSection.textContent).toContain('Bed Hospital');
    expect(heroSection.textContent).toContain('600+');
    expect(heroSection.textContent).toContain('Recruiting Companies');
    expect(heroSection.textContent).toContain('₹1.7 Cr');
    expect(heroSection.textContent).toContain('Highest Package');
  });

  // Requirement 1.4: Test all key statistics from comprehensive guides
  describe('Key Statistics Display (Requirement 1.4)', () => {
    it('displays "95+ countries" statistic', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const heroSection = container.querySelector('[data-section="hero"]');
      expect(heroSection.textContent).toContain('95+');
      expect(heroSection.textContent).toContain('Countries');
    });

    it('displays "1,600+ bed hospital" statistic', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const heroSection = container.querySelector('[data-section="hero"]');
      expect(heroSection.textContent).toContain('1,600+');
      expect(heroSection.textContent).toContain('Bed Hospital');
    });

    it('displays "600+ recruiting companies" statistic', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const heroSection = container.querySelector('[data-section="hero"]');
      expect(heroSection.textContent).toContain('600+');
      expect(heroSection.textContent).toContain('Recruiting Companies');
    });

    it('displays "INR 1.7 Crore highest package" statistic', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const heroSection = container.querySelector('[data-section="hero"]');
      expect(heroSection.textContent).toContain('₹1.7 Cr');
      expect(heroSection.textContent).toContain('Highest Package');
    });

    it('displays all four key statistics together in hero section', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const heroSection = container.querySelector('[data-section="hero"]');
      const heroText = heroSection.textContent;
      
      // All four key statistics should be present
      expect(heroText).toContain('95+');
      expect(heroText).toContain('1,600+');
      expect(heroText).toContain('600+');
      expect(heroText).toContain('₹1.7 Cr');
    });

    it('displays statistics with appropriate icons/visual elements', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const heroSection = container.querySelector('[data-section="hero"]');
      
      // Check that statistics are in styled cards (not just plain text)
      const statCards = heroSection.querySelectorAll('.bg-white\\/10, [class*="bg-white/10"]');
      expect(statCards.length).toBeGreaterThanOrEqual(4);
    });
  });

  it('displays application CTAs', () => {
    const { container } = render(<ShardaLandingPage />);
    
    // Check for application CTAs
    const ctaButtons = container.querySelectorAll('[data-testid="application-cta"]');
    expect(ctaButtons.length).toBeGreaterThan(0);
  });

  it('displays WhatsApp CTAs', () => {
    const { container } = render(<ShardaLandingPage />);
    
    // Check for WhatsApp CTAs
    const whatsappButtons = container.querySelectorAll('[data-testid="whatsapp-cta"]');
    expect(whatsappButtons.length).toBeGreaterThan(0);
  });

  // Requirement 1.3: Test CTA presence and distribution
  describe('CTA Presence and Distribution (Requirement 1.3)', () => {
    it('displays Application CTAs in hero section', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const heroSection = container.querySelector('[data-section="hero"]');
      expect(heroSection).toBeTruthy();
      
      // Check for Application CTA in hero
      const heroCTAs = heroSection.querySelectorAll('[data-testid="application-cta"]');
      expect(heroCTAs.length).toBeGreaterThan(0);
    });

    it('displays WhatsApp CTAs in hero section', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const heroSection = container.querySelector('[data-section="hero"]');
      expect(heroSection).toBeTruthy();
      
      // Check for WhatsApp CTA in hero
      const heroWhatsAppCTAs = heroSection.querySelectorAll('[data-testid="whatsapp-cta"]');
      expect(heroWhatsAppCTAs.length).toBeGreaterThan(0);
    });

    it('displays CTAs in about section', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const aboutSection = container.querySelector('[data-section="about"]');
      expect(aboutSection).toBeTruthy();
      
      // Check for CTAs in about section
      const aboutCTAs = aboutSection.querySelectorAll('[data-testid="application-cta"]');
      expect(aboutCTAs.length).toBeGreaterThan(0);
    });

    it('displays CTAs in rankings section', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const rankingsSection = container.querySelector('[data-section="rankings"]');
      expect(rankingsSection).toBeTruthy();
      
      // Check for WhatsApp CTA in rankings section
      const rankingsCTAs = rankingsSection.querySelectorAll('[data-testid="whatsapp-cta"]');
      expect(rankingsCTAs.length).toBeGreaterThan(0);
    });

    it('displays CTAs in programs section', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const programsSection = container.querySelector('[data-section="programs"]');
      expect(programsSection).toBeTruthy();
      
      // Check for Application CTAs in programs section (one per program card + view all)
      const programsCTAs = programsSection.querySelectorAll('[data-testid="application-cta"]');
      expect(programsCTAs.length).toBeGreaterThan(1); // Multiple CTAs expected
    });

    it('displays CTAs in placements section', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const placementsSection = container.querySelector('[data-section="placements"]');
      expect(placementsSection).toBeTruthy();
      
      // Check for WhatsApp CTA in placements section
      const placementsCTAs = placementsSection.querySelectorAll('[data-testid="whatsapp-cta"]');
      expect(placementsCTAs.length).toBeGreaterThan(0);
    });

    it('displays CTAs in campus section', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const campusSection = container.querySelector('[data-section="campus"]');
      expect(campusSection).toBeTruthy();
      
      // Check for Application CTA in campus section
      const campusCTAs = campusSection.querySelectorAll('[data-testid="application-cta"]');
      expect(campusCTAs.length).toBeGreaterThan(0);
    });

    it('displays CTAs in testimonials section', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const testimonialsSection = container.querySelector('[data-section="testimonials"]');
      expect(testimonialsSection).toBeTruthy();
      
      // Check for WhatsApp CTA in testimonials section
      const testimonialsCTAs = testimonialsSection.querySelectorAll('[data-testid="whatsapp-cta"]');
      expect(testimonialsCTAs.length).toBeGreaterThan(0);
    });

    it('displays CTAs in FAQ section', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const faqSection = container.querySelector('[data-section="faq"]');
      expect(faqSection).toBeTruthy();
      
      // Check for both Application and WhatsApp CTAs in FAQ section
      const faqApplicationCTAs = faqSection.querySelectorAll('[data-testid="application-cta"]');
      const faqWhatsAppCTAs = faqSection.querySelectorAll('[data-testid="whatsapp-cta"]');
      
      expect(faqApplicationCTAs.length).toBeGreaterThan(0);
      expect(faqWhatsAppCTAs.length).toBeGreaterThan(0);
    });

    it('displays floating CTAs (Application and WhatsApp)', () => {
      const { container } = render(<ShardaLandingPage />);
      
      // Check for floating variant CTAs
      const floatingCTAs = container.querySelectorAll('[data-variant="floating"]');
      expect(floatingCTAs.length).toBeGreaterThanOrEqual(2); // At least Application and WhatsApp floating CTAs
      
      // Verify both types are present
      const floatingApplicationCTAs = container.querySelectorAll('[data-testid="application-cta"][data-variant="floating"]');
      const floatingWhatsAppCTAs = container.querySelectorAll('[data-testid="whatsapp-cta"][data-variant="floating"]');
      
      expect(floatingApplicationCTAs.length).toBeGreaterThan(0);
      expect(floatingWhatsAppCTAs.length).toBeGreaterThan(0);
    });

    it('displays CTAs at strategic intervals throughout the page', () => {
      const { container } = render(<ShardaLandingPage />);
      
      // Count total CTAs across all sections
      const allApplicationCTAs = container.querySelectorAll('[data-testid="application-cta"]');
      const allWhatsAppCTAs = container.querySelectorAll('[data-testid="whatsapp-cta"]');
      
      // Should have multiple CTAs distributed throughout (at least 5 of each type)
      expect(allApplicationCTAs.length).toBeGreaterThanOrEqual(5);
      expect(allWhatsAppCTAs.length).toBeGreaterThanOrEqual(5);
    });
  });

  it('displays rankings section with ranking data', () => {
    const { container } = render(<ShardaLandingPage />);
    
    const rankingsSection = container.querySelector('[data-section="rankings"]');
    expect(rankingsSection).toBeTruthy();
    expect(rankingsSection.textContent).toContain('Rankings & Recognition');
    expect(rankingsSection.textContent).toContain('NIRF');
  });

  it('displays programs section with program cards', () => {
    render(<ShardaLandingPage />);
    
    expect(screen.getByText('Popular Programs')).toBeTruthy();
    expect(screen.getByText('B.Tech in Computer Science and Engineering')).toBeTruthy();
  });

  it('displays placements section with statistics', () => {
    render(<ShardaLandingPage />);
    
    expect(screen.getByText('Excellent Placement Record')).toBeTruthy();
    expect(screen.getByText('Companies Visited')).toBeTruthy();
    expect(screen.getByText('Students Placed')).toBeTruthy();
  });

  it('displays campus section with facilities', () => {
    render(<ShardaLandingPage />);
    
    expect(screen.getByText('World-Class Campus & Facilities')).toBeTruthy();
    expect(screen.getByText('Sharda Hospital')).toBeTruthy();
  });

  it('displays testimonials section', () => {
    render(<ShardaLandingPage />);
    
    expect(screen.getByText('Student Success Stories')).toBeTruthy();
  });

  it('displays FAQ section', () => {
    render(<ShardaLandingPage />);
    
    expect(screen.getByText('Frequently Asked Questions')).toBeTruthy();
  });

  it('displays floating CTAs', () => {
    const { container } = render(<ShardaLandingPage />);
    
    // Check for floating variant CTAs
    const floatingCTAs = container.querySelectorAll('[data-variant="floating"]');
    expect(floatingCTAs.length).toBeGreaterThanOrEqual(2); // At least Application and WhatsApp floating CTAs
  });

  it('passes userCountry prop to child components', () => {
    const { container } = render(<ShardaLandingPage userCountry="Bangladesh" />);
    
    // Component should render without errors with custom country
    expect(container.querySelector('[data-section="hero"]')).toBeTruthy();
  });

  // SEO-specific tests (Requirement 1.5, 3.3, 3.4, 3.6)
  describe('SEO Optimization', () => {
    it('sets proper page title with SEOMetaTags', () => {
      render(<ShardaLandingPage />);
      
      // Check if document title is set
      expect(document.title).toContain('Sharda University');
      expect(document.title).toContain('2026-27');
    });

    it('includes Organization structured data', () => {
      render(<ShardaLandingPage />);
      
      // Check for structured data script
      const structuredDataScripts = document.querySelectorAll('script[type="application/ld+json"]');
      expect(structuredDataScripts.length).toBeGreaterThan(0);
      
      // Find the organization schema
      let foundOrganizationSchema = false;
      structuredDataScripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent);
          if (data['@type'] === 'EducationalOrganization') {
            foundOrganizationSchema = true;
            expect(data.name).toBe('Sharda University');
            expect(data['@context']).toBe('https://schema.org');
            expect(data.address).toBeTruthy();
            expect(data.contactPoint).toBeTruthy();
          }
        } catch {
          // Skip invalid JSON
        }
      });
      
      expect(foundOrganizationSchema).toBe(true);
    });

    it('uses proper heading hierarchy (H1 → H2 → H3)', () => {
      const { container } = render(<ShardaLandingPage />);
      
      // Check for H1 (should be only one - university name)
      const h1Elements = container.querySelectorAll('h1');
      expect(h1Elements.length).toBe(1);
      expect(h1Elements[0].textContent).toContain('Sharda University');
      
      // Check for H2 (section titles)
      const h2Elements = container.querySelectorAll('h2');
      expect(h2Elements.length).toBeGreaterThan(0);
      
      // Check for H3 (subsection titles)
      const h3Elements = container.querySelectorAll('h3');
      expect(h3Elements.length).toBeGreaterThan(0);
      
      // Verify no H4 appears before H3, no H3 before H2, etc.
      const allHeadings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let previousLevel = 0;
      allHeadings.forEach(heading => {
        const currentLevel = parseInt(heading.tagName.substring(1));
        // Allow same level or one level deeper, but not skipping levels
        if (previousLevel > 0) {
          expect(currentLevel - previousLevel).toBeLessThanOrEqual(1);
        }
        previousLevel = currentLevel;
      });
    });

    it('includes internal links to program pages', () => {
      const { container } = render(<ShardaLandingPage />);
      
      // Check for internal links to programs
      const programLinks = container.querySelectorAll('a[href*="/sharda-university/programs"]');
      expect(programLinks.length).toBeGreaterThan(0);
    });

    it('includes internal links to fee pages', () => {
      const { container } = render(<ShardaLandingPage />);
      
      // Check for internal links to fees
      const feeLinks = container.querySelectorAll('a[href*="/sharda-university/btech-cse-fees"]');
      expect(feeLinks.length).toBeGreaterThan(0);
    });

    it('includes internal links to rankings pages', () => {
      const { container } = render(<ShardaLandingPage />);
      
      // Check for internal links to rankings
      const rankingLinks = container.querySelectorAll('a[href*="/sharda-university/ranking-2026"]');
      expect(rankingLinks.length).toBeGreaterThan(0);
    });

    it('includes internal links to admissions pages', () => {
      const { container } = render(<ShardaLandingPage />);
      
      // Check for internal links to admissions
      const admissionLinks = container.querySelectorAll('a[href*="/apply"]');
      expect(admissionLinks.length).toBeGreaterThan(0);
    });

    it('uses descriptive anchor text for internal links', () => {
      const { container } = render(<ShardaLandingPage />);
      
      // Get all internal links
      const internalLinks = container.querySelectorAll('a[href^="/sharda-university"]');
      
      // Check that links have meaningful text (not "click here" or just URLs)
      internalLinks.forEach(link => {
        const linkText = link.textContent.trim().toLowerCase();
        expect(linkText).not.toBe('click here');
        expect(linkText).not.toBe('here');
        expect(linkText).not.toMatch(/^https?:\/\//);
        expect(linkText.length).toBeGreaterThan(0);
      });
    });

    it('includes SEO keywords in content', () => {
      const { container } = render(<ShardaLandingPage />);
      
      const pageText = container.textContent.toLowerCase();
      
      // Check for important SEO keywords
      expect(pageText).toContain('sharda university');
      expect(pageText).toContain('admission');
      expect(pageText).toContain('ranking');
      expect(pageText).toContain('nirf');
      expect(pageText).toContain('naac');
      expect(pageText).toContain('b.tech');
      expect(pageText).toContain('engineering');
    });
  });
});
