# Performance Optimization Guide

This document outlines the performance optimization strategies implemented in the NextGen Learning platform and provides guidance for maintaining optimal performance.

## Overview

The platform implements multiple performance optimization techniques to ensure fast loading times, smooth interactions, and excellent user experience across all devices and network conditions.

### Performance Targets

- **Lighthouse Performance Score**: 90+
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

## Implemented Optimizations

### 1. Image Optimization

#### WebP Format with Fallbacks

All images use modern WebP format with automatic fallbacks for older browsers:

```jsx
import LazyImage from '@/components/Common/LazyImage';

<LazyImage
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  useWebP={true}
/>
```

The `LazyImage` component automatically:
- Converts images to WebP format
- Provides fallback to original format
- Uses `<picture>` element for browser compatibility

#### Responsive Images

Images are served in multiple sizes based on viewport:

```jsx
import { IMAGE_PRESETS, generateResponsiveSources } from '@/utils/imageOptimization';

const sources = generateResponsiveSources('/images/hero', 'jpg', [640, 1024, 1920]);

<LazyImage
  src="/images/hero.jpg"
  alt="Hero image"
  srcSet={sources}
  sizes={IMAGE_PRESETS.hero.sizes}
/>
```

**Available Presets:**
- `hero`: Full-width images (100vw on all devices)
- `card`: Card images (100vw mobile, 50vw tablet, 33vw desktop)
- `thumbnail`: Small images (150px fixed)
- `avatar`: Profile images (64px fixed)

#### Lazy Loading

All images below the fold use lazy loading:

```jsx
<LazyImage
  src="/images/content.jpg"
  alt="Content image"
  loading="lazy"
  decoding="async"
/>
```

Features:
- Intersection Observer for viewport detection
- 50px margin for preloading
- Skeleton placeholder during loading
- Smooth fade-in transition

### 2. Service Worker & Offline Support

#### Cache Strategy

The service worker implements a multi-tier caching strategy:

**Static Cache** (30 days):
- JavaScript bundles
- CSS files
- Fonts
- Icons

**Dynamic Cache** (7 days):
- HTML pages
- API responses
- Dynamic content

**Image Cache** (30 days):
- JPG/PNG images
- WebP images
- SVG graphics

#### Offline Fallback

When offline, users see a custom offline page with:
- Clear offline status message
- Retry button
- Tips for reconnecting
- Auto-reload when connection restored

#### Cache Management

Automatic cache management prevents storage bloat:
- Maximum 50 static assets
- Maximum 100 dynamic pages
- Maximum 60 images
- Oldest entries removed first (LRU)

### 3. Code Splitting

#### Route-Based Splitting

Each route is loaded on-demand:

```jsx
const ShardaLandingPage = lazy(() => import('./pages/Sharda/ShardaLandingPage'));
const ProgramDetailPage = lazy(() => import('./pages/Sharda/ProgramDetailPage'));
```

#### Vendor Chunking

Third-party libraries are bundled separately:

```javascript
// vite.config.js
manualChunks: {
  'react-vendor': ['react', 'react-dom', 'react-router-dom'],
}
```

Benefits:
- Smaller initial bundle
- Better caching (vendor code changes less frequently)
- Parallel loading

### 4. Asset Optimization

#### Minification

All assets are minified in production:
- JavaScript: esbuild minification
- CSS: PostCSS minification
- HTML: Vite HTML minification

#### Compression

Assets are served with compression:
- Gzip compression for all text assets
- Brotli compression where supported
- Automatic content negotiation

#### Tree Shaking

Unused code is automatically removed:
- ES modules for tree shaking
- Side-effect-free imports
- Dead code elimination

### 5. Resource Hints

#### Preload Critical Resources

```html
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
```

#### DNS Prefetch

```html
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
```

#### Preconnect

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

## Running Lighthouse Audits

### Using the Audit Script

```bash
# Build the project first
npm run build
npm run preview

# In another terminal, run the audit
node scripts/lighthouse-audit.js http://localhost:4173
```

### Using Lighthouse CLI

```bash
# Install Lighthouse globally
npm install -g lighthouse

# Run audit
lighthouse http://localhost:4173 --view

# Run audit with specific categories
lighthouse http://localhost:4173 \
  --only-categories=performance,accessibility \
  --output=html \
  --output-path=./report.html
```

### Using Chrome DevTools

1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select categories to audit
4. Click "Analyze page load"

## Performance Monitoring

### Core Web Vitals

Monitor these metrics in production:

**Largest Contentful Paint (LCP)**
- Target: < 2.5s
- Measures: Loading performance
- Optimize: Image optimization, server response time

**First Input Delay (FID)**
- Target: < 100ms
- Measures: Interactivity
- Optimize: Reduce JavaScript execution time

**Cumulative Layout Shift (CLS)**
- Target: < 0.1
- Measures: Visual stability
- Optimize: Set image dimensions, avoid dynamic content insertion

### Real User Monitoring (RUM)

Implement RUM to track actual user experience:

```javascript
// Example using Web Vitals library
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

## Best Practices

### Images

✅ **DO:**
- Use WebP format with fallbacks
- Specify width and height attributes
- Use lazy loading for below-fold images
- Compress images before uploading
- Use responsive images with srcset

❌ **DON'T:**
- Use unoptimized images
- Load all images eagerly
- Use images larger than display size
- Forget alt text

### JavaScript

✅ **DO:**
- Use code splitting
- Lazy load non-critical components
- Minimize third-party scripts
- Use async/defer for scripts
- Remove unused code

❌ **DON'T:**
- Load everything upfront
- Block rendering with scripts
- Use synchronous scripts in head
- Include unused libraries

### CSS

✅ **DO:**
- Use critical CSS inline
- Defer non-critical CSS
- Minimize CSS files
- Use CSS containment
- Remove unused styles

❌ **DON'T:**
- Load all CSS upfront
- Use @import in CSS
- Include unused frameworks
- Block rendering with CSS

### Fonts

✅ **DO:**
- Use font-display: swap
- Preload critical fonts
- Use system fonts as fallback
- Subset fonts to needed characters
- Use WOFF2 format

❌ **DON'T:**
- Load unnecessary font weights
- Use multiple font families
- Block rendering waiting for fonts
- Use outdated font formats

## Troubleshooting

### Slow Initial Load

**Symptoms:** High FCP/LCP times

**Solutions:**
1. Check bundle size: `npm run build:analyze`
2. Reduce JavaScript execution time
3. Optimize images
4. Enable compression
5. Use CDN for static assets

### Layout Shifts

**Symptoms:** High CLS score

**Solutions:**
1. Set explicit dimensions for images
2. Reserve space for dynamic content
3. Avoid inserting content above existing content
4. Use CSS aspect-ratio for responsive elements

### Poor Interactivity

**Symptoms:** High FID/TBT times

**Solutions:**
1. Reduce JavaScript execution time
2. Break up long tasks
3. Use web workers for heavy computation
4. Defer non-critical JavaScript
5. Optimize event handlers

### Large Bundle Size

**Symptoms:** Slow download times

**Solutions:**
1. Analyze bundle: `npm run build:analyze`
2. Remove unused dependencies
3. Use dynamic imports
4. Enable tree shaking
5. Minimize third-party code

## Performance Checklist

Before deploying to production:

- [ ] Run Lighthouse audit (score 90+)
- [ ] Check Core Web Vitals
- [ ] Verify image optimization
- [ ] Test on 3G connection
- [ ] Test on mobile devices
- [ ] Verify service worker caching
- [ ] Check bundle sizes
- [ ] Test offline functionality
- [ ] Verify lazy loading works
- [ ] Check for console errors

## Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Core Web Vitals](https://web.dev/vitals/)
- [Image Optimization](https://web.dev/fast/#optimize-your-images)
- [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers)

## Continuous Improvement

Performance optimization is an ongoing process:

1. **Monitor**: Track metrics in production
2. **Analyze**: Identify bottlenecks
3. **Optimize**: Implement improvements
4. **Test**: Verify improvements
5. **Repeat**: Continuously iterate

Set up automated performance testing in CI/CD:

```yaml
# Example GitHub Actions workflow
- name: Lighthouse CI
  run: |
    npm run build
    npm run preview &
    sleep 5
    npx @lhci/cli@0.12.x autorun
```

---

**Last Updated:** January 2026  
**Maintained By:** NextGen Learning Team
