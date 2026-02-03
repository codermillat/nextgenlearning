# Design Document: CLS Fix

## Overview

This design addresses Cumulative Layout Shift (CLS) issues across the NextGen Learning React + Vite application. The current implementation suffers from multiple layout stability problems that negatively impact user experience and Core Web Vitals scores. The solution implements a comprehensive set of fixes targeting hero sections, animations, mobile navigation, card hover effects, font loading, and dynamic content rendering.

The design follows a systematic approach to eliminate layout shifts by:
1. Reserving space for all content before it loads
2. Using CSS transforms instead of layout-affecting properties
3. Implementing proper font loading strategies
4. Adding skeleton loaders for dynamic content
5. Fixing mobile menu expansion behavior
6. Stabilizing card hover effects

Target CLS score: < 0.1 on both desktop and mobile (currently exceeding 0.25 on mobile).

## Architecture

### Component-Level Fixes

The architecture organizes CLS fixes into distinct layers:

**Layout Layer**: Fixed-height containers and aspect-ratio preservation
- Hero sections with explicit min-height values
- Responsive height calculations using CSS custom properties
- Aspect-ratio CSS for maintaining proportions

**Animation Layer**: Transform-based animations that don't trigger layout
- GPU-accelerated transforms (translate, scale, opacity)
- Will-change hints for performance
- Reduced motion support maintained

**Content Layer**: Reserved space and skeleton loaders
- Placeholder components with matching dimensions
- Skeleton screens for async content
- Min-height reservations for unknown content

**Font Layer**: Optimized web font loading
- font-display: swap for custom fonts
- Metric-matched fallback fonts
- Preloading critical fonts

### File Organization

```
src/
├── components/
│   ├── Common/
│   │   ├── Card.jsx (updated hover effects)
│   │   └── SkeletonLoader.jsx (new)
│   ├── Layout/
│   │   └── Header.jsx (mobile menu fixes)
│   └── Home/
│       └── HeroSection.jsx (height fixes)
├── styles/
│   └── cls-optimized.css (new)
├── hooks/
│   └── useFontLoading.js (new)
└── index.css (font-display updates)
```

## Components and Interfaces

### 1. Hero Section Stabilization

**Problem**: Hero sections use only padding without fixed heights, causing layout shifts as content loads.

**Solution**: Implement responsive min-height with explicit values.

```css
/* Hero section with fixed minimum heights */
.hero-section {
  min-height: 500px; /* Mobile */
  position: relative;
}

@media (min-width: 640px) {
  .hero-section {
    min-height: 600px; /* Tablet */
  }
}

@media (min-width: 1024px) {
  .hero-section {
    min-height: 700px; /* Desktop */
  }
}
```

**Component Update** (HeroSection.jsx):
```jsx
<section className="hero bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white px-4 relative overflow-hidden min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center">
  {/* Content */}
</section>
```

### 2. Animation Fixes

**Problem**: `animate-fade-in` and `animate-slide-up` cause layout shifts by changing opacity and transform during initial render.

**Solution**: Use CSS transforms with will-change hints and ensure animations don't affect layout.

```css
/* Updated animations that don't cause layout shifts */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
  will-change: opacity;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out;
  will-change: transform, opacity;
}
```

**Key Change**: Animations already use transform (translateY) which doesn't trigger layout. Add will-change for performance.

### 3. Mobile Menu Expansion Fix

**Problem**: Mobile menu expands without reserved space, pushing content down.

**Solution**: Use absolute positioning or max-height transition with reserved space.

**Option A - Absolute Positioning** (Recommended):
```jsx
{/* Mobile Menu with absolute positioning */}
{mobileMenuOpen && (
  <nav 
    id="mobile-navigation" 
    className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40"
    aria-label="Main navigation"
  >
    {/* Menu items */}
  </nav>
)}
```

**Option B - Max-Height Transition**:
```css
.mobile-menu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
}

.mobile-menu.open {
  max-height: 600px; /* Sufficient for all menu items */
}
```

### 4. Card Hover Effect Stabilization

**Problem**: `hover:scale-110` and `group-hover:scale-110` cause layout shifts by changing element dimensions.

**Solution**: Use transform: scale() which doesn't affect layout, but ensure parent has overflow handling.

```jsx
// Updated Card component
<div className="text-4xl mb-4 transition-transform duration-300 will-change-transform group-hover:scale-110" 
     style={{ transformOrigin: 'center' }}
     aria-hidden="true">
  💻
</div>
```

**CSS Enhancement**:
```css
/* Ensure scale transforms don't cause overflow */
.card-icon-container {
  display: inline-block;
  transition: transform 0.3s ease-in-out;
  will-change: transform;
  transform-origin: center;
}

.group:hover .card-icon-container {
  transform: scale(1.1);
}

/* Prevent overflow from scaled elements */
.card-wrapper {
  overflow: hidden;
}
```

### 5. Font Loading Strategy

**Problem**: No font-display strategy causes FOIT (Flash of Invisible Text) and layout shifts when fonts load.

**Solution**: Implement font-display: swap with metric-matched fallbacks.

**index.html Update**:
```html
<!-- Preload critical fonts -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
```

**CSS Update** (index.css):
```css
@layer base {
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    font-display: swap;
  }
}

/* Metric-matched fallback to minimize shift */
@font-face {
  font-family: 'Inter Fallback';
  src: local('Arial');
  size-adjust: 107%;
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
}
```

**Font Loading Hook** (useFontLoading.js):
```javascript
import { useEffect, useState } from 'react';

export function useFontLoading(fontFamily = 'Inter') {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    if (!document.fonts) {
      setFontLoaded(true);
      return;
    }

    document.fonts.ready.then(() => {
      setFontLoaded(true);
    });

    // Fallback timeout
    const timeout = setTimeout(() => {
      setFontLoaded(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [fontFamily]);

  return fontLoaded;
}
```

### 6. Skeleton Loaders for Dynamic Content

**Problem**: Dynamic content loads without reserved space, causing layout shifts.

**Solution**: Implement skeleton loaders with matching dimensions.

**SkeletonLoader Component**:
```jsx
import { memo } from 'react';

const SkeletonLoader = memo(function SkeletonLoader({ 
  variant = 'card',
  count = 1,
  className = ''
}) {
  const variants = {
    card: 'h-64 rounded-xl',
    text: 'h-4 rounded',
    title: 'h-8 rounded',
    circle: 'h-16 w-16 rounded-full',
    button: 'h-12 w-32 rounded-lg'
  };

  const skeletonClass = `bg-gray-200 animate-pulse ${variants[variant]} ${className}`;

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={skeletonClass} aria-hidden="true" />
      ))}
    </>
  );
});

export default SkeletonLoader;
```

**Usage Example**:
```jsx
import SkeletonLoader from '../Common/SkeletonLoader';

function CourseList({ courses, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SkeletonLoader variant="card" count={6} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {courses.map(course => <CourseCard key={course.id} {...course} />)}
    </div>
  );
}
```

### 7. Gradient Background Stabilization

**Problem**: Multiple gradient background layers without explicit heights can cause shifts.

**Solution**: Ensure all gradient containers have explicit dimensions.

```css
/* Gradient sections with fixed heights */
.gradient-section {
  min-height: 400px;
  background: linear-gradient(to bottom, #f9fafb, #ffffff);
}

/* Hero gradients */
.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent);
  pointer-events: none;
}
```

## Data Models

### CLS Measurement Data Structure

```typescript
interface CLSMeasurement {
  url: string;
  viewport: 'mobile' | 'desktop';
  clsScore: number;
  timestamp: number;
  shifts: LayoutShift[];
}

interface LayoutShift {
  element: string;
  value: number;
  hadRecentInput: boolean;
  sources: ShiftSource[];
}

interface ShiftSource {
  node: string;
  previousRect: DOMRect;
  currentRect: DOMRect;
}
```

### Font Loading State

```typescript
interface FontLoadingState {
  loaded: boolean;
  error: boolean;
  fontFamily: string;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Hero Section Height Stability
*For any* viewport size, the hero section should maintain a minimum height before and after content loads, ensuring no layout shift occurs during the initial render.
**Validates: Requirements 6.1, 6.5**

### Property 2: Animation Transform Isolation
*For any* animated element, animations should only modify transform and opacity properties, never affecting layout properties (width, height, margin, padding).
**Validates: Requirements 6.2**

### Property 3: Mobile Menu Position Independence
*For any* mobile menu state (open/closed), the menu should not push down page content, maintaining layout stability through absolute positioning or reserved space.
**Validates: Requirements 6.5**

### Property 4: Card Hover Transform Containment
*For any* card with hover effects, the scale transform should be contained within the card's overflow boundaries, preventing layout shifts in surrounding elements.
**Validates: Requirements 6.2**

### Property 5: Font Loading Fallback Consistency
*For any* text element, the fallback font metrics should match the web font metrics within 5% to minimize layout shift when fonts load.
**Validates: Requirements 3.1, 3.2, 3.4**

### Property 6: Skeleton Loader Dimension Matching
*For any* dynamic content with a skeleton loader, the skeleton dimensions should match the final content dimensions within 10px to prevent layout shift on load.
**Validates: Requirements 4.1, 4.2**

### Property 7: Gradient Container Height Specification
*For any* section with gradient backgrounds, the container should have an explicit min-height value to prevent layout shifts as gradients render.
**Validates: Requirements 6.1**

### Property 8: CLS Score Threshold Compliance
*For any* page load on desktop or mobile, the measured CLS score should be below 0.1 for at least 75% of page visits.
**Validates: Requirements 7.1, 7.2**

### Property 9: Image Dimension Preservation
*For any* image element, explicit width and height attributes or aspect-ratio CSS should be specified to reserve space before image loads.
**Validates: Requirements 2.1, 2.2, 2.3**

### Property 10: Dynamic Content Space Reservation
*For any* asynchronously loaded content, space should be reserved using skeleton loaders or min-height before content arrives.
**Validates: Requirements 4.1, 4.2, 4.3**

## Error Handling

### Font Loading Failures

**Scenario**: Web fonts fail to load due to network issues.

**Handling**:
```javascript
// Timeout fallback in useFontLoading hook
useEffect(() => {
  const timeout = setTimeout(() => {
    if (!fontLoaded) {
      console.warn('Font loading timeout, using fallback');
      setFontLoaded(true); // Proceed with fallback font
    }
  }, 3000);

  return () => clearTimeout(timeout);
}, [fontLoaded]);
```

### Skeleton Loader Timeout

**Scenario**: Dynamic content fails to load, skeleton remains visible.

**Handling**:
```javascript
useEffect(() => {
  const timeout = setTimeout(() => {
    if (loading) {
      setError('Content failed to load');
      setLoading(false);
    }
  }, 10000); // 10 second timeout

  return () => clearTimeout(timeout);
}, [loading]);
```

### CLS Measurement Failures

**Scenario**: Performance API unavailable or CLS measurement fails.

**Handling**:
```javascript
function measureCLS() {
  if (!('PerformanceObserver' in window)) {
    console.warn('PerformanceObserver not supported');
    return null;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.hadRecentInput) continue;
        // Process CLS entry
      }
    });
    observer.observe({ type: 'layout-shift', buffered: true });
    return observer;
  } catch (error) {
    console.error('CLS measurement failed:', error);
    return null;
  }
}
```

### Animation Fallback for Reduced Motion

**Scenario**: User has prefers-reduced-motion enabled.

**Handling**: Already implemented in index.css, ensure all new animations respect this preference.

```css
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .animate-slide-up {
    animation: none !important;
  }
  
  .hover\:scale-110:hover {
    transform: none !important;
  }
}
```

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests**: Verify specific CLS fixes and edge cases
- Test hero section renders with correct min-height
- Test mobile menu uses absolute positioning
- Test skeleton loaders match content dimensions
- Test font loading hook handles timeouts
- Test animations respect reduced motion preferences

**Property Tests**: Verify CLS properties across all inputs
- Generate random viewport sizes and verify hero height stability
- Generate random content and verify skeleton dimensions match
- Generate random font loading scenarios and verify fallback behavior
- Test CLS measurements across different page loads

### Property-Based Testing Configuration

Use **fast-check** library for JavaScript property-based testing.

**Minimum 100 iterations per property test** due to randomization.

Each property test must reference its design document property using this tag format:
```javascript
// Feature: cls-fix, Property 1: Hero Section Height Stability
```

### Unit Test Examples

**Hero Section Height Test**:
```javascript
import { render } from '@testing-library/react';
import HeroSection from '../components/Home/HeroSection';

describe('HeroSection CLS Fix', () => {
  it('should render with fixed minimum height', () => {
    const { container } = render(<HeroSection />);
    const hero = container.querySelector('.hero');
    
    const styles = window.getComputedStyle(hero);
    expect(styles.minHeight).toBe('500px'); // Mobile default
  });

  it('should maintain height across viewport changes', () => {
    const { container, rerender } = render(<HeroSection />);
    const hero = container.querySelector('.hero');
    
    const initialHeight = hero.offsetHeight;
    
    // Simulate viewport change
    global.innerWidth = 1024;
    rerender(<HeroSection />);
    
    const newHeight = hero.offsetHeight;
    expect(newHeight).toBeGreaterThanOrEqual(initialHeight);
  });
});
```

**Mobile Menu Position Test**:
```javascript
import { render, fireEvent } from '@testing-library/react';
import Header from '../components/Layout/Header';

describe('Header Mobile Menu CLS Fix', () => {
  it('should use absolute positioning for mobile menu', () => {
    const { getByLabelText, container } = render(<Header />);
    const menuButton = getByLabelText('Toggle menu');
    
    fireEvent.click(menuButton);
    
    const mobileMenu = container.querySelector('#mobile-navigation');
    const styles = window.getComputedStyle(mobileMenu);
    
    expect(styles.position).toBe('absolute');
  });

  it('should not push content down when menu opens', () => {
    const { getByLabelText, container } = render(
      <>
        <Header />
        <div data-testid="content-below">Content</div>
      </>
    );
    
    const contentBelow = container.querySelector('[data-testid="content-below"]');
    const initialTop = contentBelow.getBoundingClientRect().top;
    
    const menuButton = getByLabelText('Toggle menu');
    fireEvent.click(menuButton);
    
    const newTop = contentBelow.getBoundingClientRect().top;
    expect(newTop).toBe(initialTop);
  });
});
```

**Font Loading Hook Test**:
```javascript
import { renderHook, waitFor } from '@testing-library/react';
import { useFontLoading } from '../hooks/useFontLoading';

describe('useFontLoading Hook', () => {
  it('should return true when fonts are loaded', async () => {
    document.fonts = {
      ready: Promise.resolve()
    };

    const { result } = renderHook(() => useFontLoading('Inter'));

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it('should timeout after 3 seconds', async () => {
    document.fonts = {
      ready: new Promise(() => {}) // Never resolves
    };

    const { result } = renderHook(() => useFontLoading('Inter'));

    await waitFor(() => {
      expect(result.current).toBe(true);
    }, { timeout: 3500 });
  });
});
```

**Skeleton Loader Test**:
```javascript
import { render } from '@testing-library/react';
import SkeletonLoader from '../components/Common/SkeletonLoader';

describe('SkeletonLoader', () => {
  it('should render correct number of skeletons', () => {
    const { container } = render(<SkeletonLoader count={3} />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons).toHaveLength(3);
  });

  it('should apply correct variant classes', () => {
    const { container } = render(<SkeletonLoader variant="card" />);
    const skeleton = container.querySelector('.animate-pulse');
    expect(skeleton.classList.contains('h-64')).toBe(true);
    expect(skeleton.classList.contains('rounded-xl')).toBe(true);
  });
});
```

### Property-Based Test Examples

**Property 1: Hero Section Height Stability**:
```javascript
import fc from 'fast-check';
import { render } from '@testing-library/react';
import HeroSection from '../components/Home/HeroSection';

// Feature: cls-fix, Property 1: Hero Section Height Stability
describe('Property: Hero Section Height Stability', () => {
  it('should maintain minimum height across all viewport sizes', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 2560 }), // viewport width
        fc.integer({ min: 568, max: 1440 }), // viewport height
        (width, height) => {
          global.innerWidth = width;
          global.innerHeight = height;

          const { container } = render(<HeroSection />);
          const hero = container.querySelector('.hero');
          
          const computedHeight = hero.offsetHeight;
          const expectedMinHeight = width < 640 ? 500 : width < 1024 ? 600 : 700;
          
          return computedHeight >= expectedMinHeight;
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

**Property 5: Font Loading Fallback Consistency**:
```javascript
import fc from 'fast-check';

// Feature: cls-fix, Property 5: Font Loading Fallback Consistency
describe('Property: Font Loading Fallback Consistency', () => {
  it('should have fallback font metrics within 5% of web font', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 10, maxLength: 100 }), // random text
        fc.constantFrom('400', '500', '600', '700'), // font weights
        (text, weight) => {
          const testElement = document.createElement('div');
          testElement.style.position = 'absolute';
          testElement.style.visibility = 'hidden';
          testElement.style.fontSize = '16px';
          testElement.style.fontWeight = weight;
          testElement.textContent = text;
          
          document.body.appendChild(testElement);
          
          // Measure with fallback font
          testElement.style.fontFamily = 'Inter Fallback, Arial';
          const fallbackWidth = testElement.offsetWidth;
          const fallbackHeight = testElement.offsetHeight;
          
          // Measure with web font (if loaded)
          testElement.style.fontFamily = 'Inter, sans-serif';
          const webFontWidth = testElement.offsetWidth;
          const webFontHeight = testElement.offsetHeight;
          
          document.body.removeChild(testElement);
          
          const widthDiff = Math.abs(webFontWidth - fallbackWidth) / webFontWidth;
          const heightDiff = Math.abs(webFontHeight - fallbackHeight) / webFontHeight;
          
          return widthDiff <= 0.05 && heightDiff <= 0.05;
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

**Property 6: Skeleton Loader Dimension Matching**:
```javascript
import fc from 'fast-check';
import { render } from '@testing-library/react';
import SkeletonLoader from '../components/Common/SkeletonLoader';
import Card from '../components/Common/Card';

// Feature: cls-fix, Property 6: Skeleton Loader Dimension Matching
describe('Property: Skeleton Loader Dimension Matching', () => {
  it('should match card dimensions within 10px', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('default', 'gradient', 'feature'), // card variants
        (variant) => {
          const { container: skeletonContainer } = render(
            <SkeletonLoader variant="card" />
          );
          const skeleton = skeletonContainer.querySelector('.animate-pulse');
          const skeletonHeight = skeleton.offsetHeight;
          
          const { container: cardContainer } = render(
            <Card variant={variant}>
              <div className="h-16 w-16 mb-6" />
              <h3 className="text-lg mb-3">Title</h3>
              <p>Description text</p>
            </Card>
          );
          const card = cardContainer.firstChild;
          const cardHeight = card.offsetHeight;
          
          const heightDiff = Math.abs(cardHeight - skeletonHeight);
          
          return heightDiff <= 10;
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

**Property 8: CLS Score Threshold Compliance**:
```javascript
import fc from 'fast-check';

// Feature: cls-fix, Property 8: CLS Score Threshold Compliance
describe('Property: CLS Score Threshold Compliance', () => {
  it('should maintain CLS < 0.1 across page loads', async () => {
    fc.assert(
      await fc.asyncProperty(
        fc.constantFrom('/', '/courses', '/universities', '/compare'),
        fc.constantFrom('mobile', 'desktop'),
        async (path, viewport) => {
          const clsScore = await measureCLSForPage(path, viewport);
          return clsScore < 0.1;
        }
      ),
      { numRuns: 100 }
    );
  });
});

async function measureCLSForPage(path, viewport) {
  // Implementation would use Puppeteer or similar to measure CLS
  // This is a simplified example
  return new Promise((resolve) => {
    let clsScore = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
        }
      }
    });
    observer.observe({ type: 'layout-shift', buffered: true });
    
    setTimeout(() => {
      observer.disconnect();
      resolve(clsScore);
    }, 5000);
  });
}
```

### Integration Testing

**CLS Measurement Test** (using Puppeteer):
```javascript
import puppeteer from 'puppeteer';

describe('CLS Integration Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  it('should have CLS < 0.1 on home page (desktop)', async () => {
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsScore = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsScore += entry.value;
            }
          }
        });
        observer.observe({ type: 'layout-shift', buffered: true });

        setTimeout(() => {
          observer.disconnect();
          resolve(clsScore);
        }, 5000);
      });
    });

    expect(cls).toBeLessThan(0.1);
  });

  it('should have CLS < 0.1 on home page (mobile)', async () => {
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsScore = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsScore += entry.value;
            }
          }
        });
        observer.observe({ type: 'layout-shift', buffered: true });

        setTimeout(() => {
          observer.disconnect();
          resolve(clsScore);
        }, 5000);
      });
    });

    expect(cls).toBeLessThan(0.1);
  });
});
```

### Test Coverage Requirements

- Unit tests: 90% code coverage for CLS-related components
- Property tests: 100 iterations minimum per property
- Integration tests: All critical pages (home, courses, universities, compare)
- Both desktop and mobile viewports
- Network throttling tests (Fast 3G, 4G)
- Font loading failure scenarios
- Dynamic content loading scenarios

### Continuous Monitoring

Implement CLS monitoring in production:

```javascript
// Add to main.jsx or App.jsx
if (import.meta.env.PROD) {
  let clsScore = 0;
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsScore += entry.value;
      }
    }
    
    // Report to analytics
    if (window.gtag) {
      gtag('event', 'cls_measurement', {
        value: clsScore,
        page_path: window.location.pathname
      });
    }
  });
  
  observer.observe({ type: 'layout-shift', buffered: true });
}
```
