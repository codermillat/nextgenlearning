/**
 * Property-based tests for CTA components (ApplicationCTA and WhatsAppCTA)
 * Feature: sharda-university-content-enhancement
 * 
 * Tests Properties 1, 18-23 for CTA components
 * 
 * Validates: Requirements 1.3, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import fc from 'fast-check';
import ApplicationCTA from '../ApplicationCTA.jsx';
import WhatsAppCTA from '../WhatsAppCTA.jsx';
import * as utmGenerator from '../../../utils/utmGenerator.js';
import * as conversionEventLogger from '../../../utils/conversionEventLogger.js';

// Mock the utilities
vi.mock('../../../utils/utmGenerator.js');
vi.mock('../../../utils/conversionEventLogger.js');

describe('CTA Components - Property-Based Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mock implementations
    utmGenerator.generateUTMLink.mockReturnValue('https://global.sharda.ac.in/?utm_source=test&utm_medium=test&utm_campaign=test&utm_content=test');
    conversionEventLogger.logCTAClick.mockReturnValue({});
    conversionEventLogger.logWhatsAppClick.mockReturnValue({});
  });

  afterEach(() => {
    cleanup(); // Clean up after each test
    vi.restoreAllMocks();
  });

  /**
   * Property 1: Conversion Element Distribution
   * Feature: sharda-university-content-enhancement, Property 1
   * 
   * For any Sharda content page, conversion elements (Application CTAs, WhatsApp buttons)
   * should appear at multiple strategic locations throughout the page content.
   * 
   * Note: This property tests that CTA components can be rendered in multiple locations
   * and maintain their functionality. The actual page-level distribution is tested
   * in page component tests.
   * 
   * Validates: Requirements 1.3
   */
  it('Property 1: Conversion Element Distribution', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('primary', 'secondary', 'floating'),
        fc.constantFrom('button', 'floating', 'inline'),
        fc.constantFrom('hero', 'content', 'footer', 'floating'),
        fc.constantFrom('landing', 'program', 'comparison', 'calculator'),
        (appVariant, whatsappVariant, location, context) => {
          // Render both CTA types
          const { container: appContainer } = render(
            <ApplicationCTA
              variant={appVariant}
              source={context}
              context={context}
              location={location}
            />
          );

          const { container: whatsappContainer } = render(
            <WhatsAppCTA
              variant={whatsappVariant}
              context={context}
              position={location}
            />
          );

          // Verify both CTAs render successfully
          const appCTA = appContainer.querySelector('[data-testid="application-cta"]');
          const whatsappCTA = whatsappContainer.querySelector('[data-testid="whatsapp-cta"]');

          expect(appCTA).toBeTruthy();
          expect(whatsappCTA).toBeTruthy();

          // Verify they have proper attributes for tracking location
          expect(appCTA.getAttribute('data-context')).toBe(context);
          expect(whatsappCTA.getAttribute('data-context')).toBe(context);

          // Verify they are functional (have href)
          expect(appCTA.getAttribute('href')).toBeTruthy();
          expect(whatsappCTA.getAttribute('href')).toBeTruthy();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 18: WhatsApp Number Consistency
   * Feature: sharda-university-content-enhancement, Property 18
   * 
   * For any WhatsApp CTA rendered, the phone number should always be +91 88009 96151
   * regardless of user country.
   * 
   * Validates: Requirements 6.1
   */
  it('Property 18: WhatsApp Number Consistency', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('button', 'floating', 'inline'),
        fc.constantFrom('landing', 'program', 'bangladesh', 'international', 'fee-calculator'),
        fc.option(fc.constantFrom('B.Tech CSE', 'MBA', 'B.Com', 'B.Tech AI')),
        (variant, context, program) => {
          const { container } = render(
            <WhatsAppCTA
              variant={variant}
              context={context}
              program={program || undefined}
            />
          );

          const button = container.querySelector('[data-testid="whatsapp-cta"]');
          const phoneNumber = button.getAttribute('data-phone');
          const href = button.getAttribute('href');

          // Verify phone number is always +91 88009 96151
          expect(phoneNumber).toBe('+91 88009 96151');

          // Verify phone number in href (without + and spaces: 918800996151)
          expect(href).toMatch(/918800996151/);
          
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 19: WhatsApp Message Contextualization
   * Feature: sharda-university-content-enhancement, Property 19
   * 
   * For any WhatsApp CTA on a page with specific context (program, topic),
   * the pre-filled message should reference that context.
   * 
   * Validates: Requirements 6.2
   */
  it('Property 19: WhatsApp Message Contextualization', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'landing',
          'fee-calculator',
          'program-finder',
          'comparison',
          'ranking',
          'scholarship',
          'bangladesh',
          'testimonial',
          'campus',
          'placement'
        ),
        fc.option(fc.constantFrom('B.Tech CSE', 'MBA', 'B.Com', 'B.Tech AI', 'M.Tech')),
        (context, program) => {
          const { container } = render(
            <WhatsAppCTA
              context={context}
              program={program || undefined}
            />
          );

          const button = container.querySelector('[data-testid="whatsapp-cta"]');
          const href = button.getAttribute('href');
          const decodedHref = decodeURIComponent(href);

          // If program is provided, message should include program name
          // Note: When program is provided, it takes priority over context in the message
          if (program) {
            expect(decodedHref).toContain(program);
            expect(decodedHref).toContain('interested in');
          } else {
            // Without program, message should reference the context
            if (context.includes('fee-calculator')) {
              expect(decodedHref).toContain('fee calculator');
            } else if (context.includes('bangladesh')) {
              expect(decodedHref).toContain('Bangladesh');
            } else if (context.includes('ranking')) {
              expect(decodedHref).toContain('ranking');
            } else if (context.includes('scholarship')) {
              expect(decodedHref).toContain('scholarship');
            } else if (context.includes('placement')) {
              expect(decodedHref).toContain('placement');
            }
          }

          // All messages should mention Sharda University
          expect(decodedHref).toContain('Sharda University');
          
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 20: WhatsApp Mobile Link Format
   * Feature: sharda-university-content-enhancement, Property 20
   * 
   * For any WhatsApp CTA rendered on a mobile device, the link should use
   * the wa.me URL format for direct app opening.
   * 
   * Validates: Requirements 6.3
   */
  it('Property 20: WhatsApp Mobile Link Format', () => {
    // Mock mobile user agent
    const originalUserAgent = navigator.userAgent;
    
    fc.assert(
      fc.property(
        fc.constantFrom(
          'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
          'Mozilla/5.0 (Linux; Android 10; SM-G973F)',
          'Mozilla/5.0 (iPad; CPU OS 13_0 like Mac OS X)'
        ),
        fc.constantFrom('button', 'floating', 'inline'),
        fc.constantFrom('landing', 'program', 'bangladesh'),
        (userAgent, variant, context) => {
          // Set mobile user agent
          Object.defineProperty(navigator, 'userAgent', {
            value: userAgent,
            writable: true,
            configurable: true,
          });

          const { container } = render(
            <WhatsAppCTA
              variant={variant}
              context={context}
            />
          );

          const button = container.querySelector('[data-testid="whatsapp-cta"]');
          const href = button.getAttribute('href');

          // Verify mobile format: wa.me
          expect(href).toMatch(/^https:\/\/wa\.me\//);
          expect(href).toContain('918800996151');
          expect(href).toContain('text=');

          cleanup();
          
          // Restore original user agent
          Object.defineProperty(navigator, 'userAgent', {
            value: originalUserAgent,
            writable: true,
            configurable: true,
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 21: WhatsApp Desktop Link Format
   * Feature: sharda-university-content-enhancement, Property 21
   * 
   * For any WhatsApp CTA rendered on a desktop device, the link should use
   * web.whatsapp.com or display the phone number.
   * 
   * Validates: Requirements 6.4
   */
  it('Property 21: WhatsApp Desktop Link Format', () => {
    // Mock desktop user agent
    const originalUserAgent = navigator.userAgent;
    
    fc.assert(
      fc.property(
        fc.constantFrom(
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
        ),
        fc.constantFrom('button', 'floating', 'inline'),
        fc.constantFrom('landing', 'program', 'bangladesh'),
        (userAgent, variant, context) => {
          // Set desktop user agent
          Object.defineProperty(navigator, 'userAgent', {
            value: userAgent,
            writable: true,
            configurable: true,
          });

          const { container } = render(
            <WhatsAppCTA
              variant={variant}
              context={context}
            />
          );

          const button = container.querySelector('[data-testid="whatsapp-cta"]');
          const href = button.getAttribute('href');

          // Verify desktop format: web.whatsapp.com
          expect(href).toMatch(/^https:\/\/web\.whatsapp\.com\/send/);
          expect(href).toContain('phone=918800996151');
          expect(href).toContain('text=');

          cleanup();
          
          // Restore original user agent
          Object.defineProperty(navigator, 'userAgent', {
            value: originalUserAgent,
            writable: true,
            configurable: true,
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 22: WhatsApp CTA Distribution
   * Feature: sharda-university-content-enhancement, Property 22
   * 
   * For any Sharda content page, WhatsApp CTAs should appear in at least two
   * distinct locations (hero, content sections, or footer).
   * 
   * Note: This property tests that WhatsApp CTAs can be rendered in multiple
   * positions and maintain distinct positioning. The actual page-level distribution
   * is tested in page component tests.
   * 
   * Validates: Requirements 6.5
   */
  it('Property 22: WhatsApp CTA Distribution', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('button', 'floating', 'inline'),
        fc.constantFrom('button', 'floating', 'inline'),
        fc.constantFrom('hero', 'content', 'footer', 'sticky'),
        fc.constantFrom('hero', 'content', 'footer', 'sticky'),
        fc.constantFrom('landing', 'program', 'comparison'),
        (variant1, variant2, position1, position2, context) => {
          // Ensure positions are different
          fc.pre(position1 !== position2 || variant1 !== variant2);

          // Render two WhatsApp CTAs with different positions
          const { container: container1 } = render(
            <WhatsAppCTA
              variant={variant1}
              context={context}
              position={position1}
            />
          );

          const { container: container2 } = render(
            <WhatsAppCTA
              variant={variant2}
              context={context}
              position={position2}
            />
          );

          const cta1 = container1.querySelector('[data-testid="whatsapp-cta"]');
          const cta2 = container2.querySelector('[data-testid="whatsapp-cta"]');

          // Verify both CTAs render successfully
          expect(cta1).toBeTruthy();
          expect(cta2).toBeTruthy();

          // Verify they have different styling based on variant
          const classes1 = cta1.className;
          const classes2 = cta2.className;

          if (variant1 === 'floating') {
            expect(classes1).toContain('fixed');
          }
          if (variant2 === 'floating') {
            expect(classes2).toContain('fixed');
          }

          // Verify both are functional
          expect(cta1.getAttribute('href')).toBeTruthy();
          expect(cta2.getAttribute('href')).toBeTruthy();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 23: WhatsApp CTA Labeling
   * Feature: sharda-university-content-enhancement, Property 23
   * 
   * For any WhatsApp button, the button text or aria-label should include
   * clear messaging about connecting with admissions.
   * 
   * Validates: Requirements 6.6
   */
  it('Property 23: WhatsApp CTA Labeling', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('button', 'floating', 'inline'),
        fc.constantFrom('landing', 'program', 'bangladesh', 'fee-calculator'),
        fc.option(fc.constantFrom('B.Tech CSE', 'MBA', 'B.Com')),
        (variant, context, program) => {
          const { container } = render(
            <WhatsAppCTA
              variant={variant}
              context={context}
              program={program || undefined}
            />
          );

          const button = container.querySelector('[data-testid="whatsapp-cta"]');
          const ariaLabel = button.getAttribute('aria-label');
          const textContent = button.textContent;

          // Verify aria-label includes clear messaging
          expect(ariaLabel).toBeTruthy();
          expect(ariaLabel.toLowerCase()).toMatch(/connect|whatsapp|admissions|sharda/);

          // Verify aria-label mentions Sharda University
          expect(ariaLabel).toContain('Sharda University');

          // Verify aria-label mentions admissions
          expect(ariaLabel).toContain('admissions');

          // If program is provided, aria-label should mention it
          if (program) {
            expect(ariaLabel).toContain(program);
          }

          // For non-floating variants, verify visible text is present
          if (variant !== 'floating') {
            expect(textContent).toBeTruthy();
            expect(textContent.toLowerCase()).toMatch(/whatsapp|connect/);
          }
          
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional Property: Application CTA Variant Consistency
   * 
   * For any ApplicationCTA rendered with a specific variant, the component
   * should apply the correct styling classes for that variant.
   */
  it('should apply correct variant styles to ApplicationCTA', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('primary', 'secondary', 'floating'),
        fc.constantFrom('landing', 'program', 'comparison'),
        fc.option(fc.constantFrom('btech-cse', 'mba', 'bcom')),
        (variant, context, program) => {
          // Create a fresh container for each render
          const container = document.createElement('div');
          document.body.appendChild(container);
          
          const { container: renderContainer } = render(
            <ApplicationCTA
              variant={variant}
              source={context}
              context={context}
              program={program || undefined}
            />,
            { container }
          );

          const button = renderContainer.querySelector('[data-testid="application-cta"]');
          const classes = button.className;

          // Verify variant-specific classes
          if (variant === 'primary') {
            expect(classes).toContain('from-blue-600');
            expect(classes).toContain('to-indigo-600');
          } else if (variant === 'secondary') {
            expect(classes).toContain('bg-white/10');
            expect(classes).toContain('backdrop-blur-sm');
          } else if (variant === 'floating') {
            expect(classes).toContain('fixed');
            expect(classes).toContain('bottom-6');
            expect(classes).toContain('right-6');
            expect(classes).toContain('rounded-full');
          }

          // Verify data attribute matches variant
          expect(button.getAttribute('data-variant')).toBe(variant);
          
          // Cleanup
          document.body.removeChild(container);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional Property: WhatsApp CTA Variant Consistency
   * 
   * For any WhatsAppCTA rendered with a specific variant, the component
   * should apply the correct styling classes for that variant.
   */
  it('should apply correct variant styles to WhatsAppCTA', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('button', 'floating', 'inline'),
        fc.constantFrom('landing', 'program', 'comparison'),
        (variant, context) => {
          // Create a fresh container for each render
          const container = document.createElement('div');
          document.body.appendChild(container);
          
          const { container: renderContainer } = render(
            <WhatsAppCTA
              variant={variant}
              context={context}
            />,
            { container }
          );

          const button = renderContainer.querySelector('[data-testid="whatsapp-cta"]');
          const classes = button.className;

          // Verify variant-specific classes
          if (variant === 'button') {
            expect(classes).toContain('bg-[#25D366]');
            expect(classes).not.toContain('fixed');
          } else if (variant === 'floating') {
            expect(classes).toContain('fixed');
            expect(classes).toContain('bottom-6');
            expect(classes).toContain('left-6');
            expect(classes).toContain('rounded-full');
          } else if (variant === 'inline') {
            expect(classes).toContain('border-2');
            expect(classes).toContain('border-[#25D366]');
          }

          // Verify data attribute matches variant
          expect(button.getAttribute('data-variant')).toBe(variant);
          
          // Cleanup
          document.body.removeChild(container);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional Property: CTA Accessibility Compliance
   * 
   * For any CTA component rendered, it should meet basic accessibility requirements:
   * - Has aria-label
   * - Has minimum touch target size
   * - Opens in new tab with security attributes
   * - Has focus ring styles
   */
  it('should meet accessibility requirements for all CTAs', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('primary', 'secondary', 'floating'),
        fc.constantFrom('button', 'floating', 'inline'),
        fc.constantFrom('landing', 'program', 'comparison'),
        (appVariant, whatsappVariant, context) => {
          // Test ApplicationCTA
          const appContainer = document.createElement('div');
          document.body.appendChild(appContainer);
          
          const { container: appRenderContainer } = render(
            <ApplicationCTA
              variant={appVariant}
              source={context}
              context={context}
            />,
            { container: appContainer }
          );

          const appButton = appRenderContainer.querySelector('[data-testid="application-cta"]');

          // Verify ApplicationCTA accessibility
          expect(appButton.getAttribute('aria-label')).toBeTruthy();
          expect(appButton.className).toContain('min-h-[44px]');
          expect(appButton.getAttribute('target')).toBe('_blank');
          expect(appButton.getAttribute('rel')).toBe('noopener noreferrer');
          expect(appButton.className).toContain('focus:outline-none');
          expect(appButton.className).toContain('focus:ring-2');
          
          document.body.removeChild(appContainer);

          // Test WhatsAppCTA
          const whatsappContainer = document.createElement('div');
          document.body.appendChild(whatsappContainer);
          
          const { container: whatsappRenderContainer } = render(
            <WhatsAppCTA
              variant={whatsappVariant}
              context={context}
            />,
            { container: whatsappContainer }
          );

          const whatsappButton = whatsappRenderContainer.querySelector('[data-testid="whatsapp-cta"]');

          // Verify WhatsAppCTA accessibility
          expect(whatsappButton.getAttribute('aria-label')).toBeTruthy();
          expect(whatsappButton.className).toContain('min-h-[44px]');
          expect(whatsappButton.getAttribute('target')).toBe('_blank');
          expect(whatsappButton.getAttribute('rel')).toBe('noopener noreferrer');
          expect(whatsappButton.className).toContain('focus:outline-none');
          expect(whatsappButton.className).toContain('focus:ring-2');
          
          document.body.removeChild(whatsappContainer);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional Property: CTA URL Validity
   * 
   * For any CTA component rendered, the href attribute should be a valid URL.
   */
  it('should generate valid URLs for all CTAs', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('primary', 'secondary', 'floating'),
        fc.constantFrom('button', 'floating', 'inline'),
        fc.constantFrom('landing', 'program', 'comparison', 'calculator'),
        fc.option(fc.constantFrom('btech-cse', 'mba', 'bcom')),
        (appVariant, whatsappVariant, context, program) => {
          // Test ApplicationCTA
          const mockAppUrl = `https://global.sharda.ac.in/?utm_source=test&utm_medium=test&utm_campaign=test&utm_content=${context}`;
          utmGenerator.generateUTMLink.mockReturnValue(mockAppUrl);

          const appContainer = document.createElement('div');
          document.body.appendChild(appContainer);
          
          const { container: appRenderContainer } = render(
            <ApplicationCTA
              variant={appVariant}
              source={context}
              context={context}
              program={program || undefined}
            />,
            { container: appContainer }
          );

          const appButton = appRenderContainer.querySelector('[data-testid="application-cta"]');
          const appHref = appButton.getAttribute('href');

          // Verify ApplicationCTA URL is valid
          expect(appHref).toBeTruthy();
          expect(() => new URL(appHref)).not.toThrow();
          expect(appHref).toMatch(/^https:\/\//);
          
          document.body.removeChild(appContainer);

          // Test WhatsAppCTA
          const whatsappContainer = document.createElement('div');
          document.body.appendChild(whatsappContainer);
          
          const { container: whatsappRenderContainer } = render(
            <WhatsAppCTA
              variant={whatsappVariant}
              context={context}
              program={program || undefined}
            />,
            { container: whatsappContainer }
          );

          const whatsappButton = whatsappRenderContainer.querySelector('[data-testid="whatsapp-cta"]');
          const whatsappHref = whatsappButton.getAttribute('href');

          // Verify WhatsAppCTA URL is valid
          expect(whatsappHref).toBeTruthy();
          expect(() => new URL(whatsappHref)).not.toThrow();
          expect(whatsappHref).toMatch(/^https:\/\//);
          
          document.body.removeChild(whatsappContainer);
        }
      ),
      { numRuns: 100 }
    );
  });
});
