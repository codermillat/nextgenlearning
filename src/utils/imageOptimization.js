/**
 * Image Optimization Utilities
 * Provides helpers for responsive images and WebP conversion
 */

/**
 * Standard responsive breakpoints for images
 */
export const IMAGE_BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
  ultrawide: 1920,
};

/**
 * Generate responsive image sources for common use cases
 * 
 * @param {string} basePath - Base path without extension (e.g., '/images/hero')
 * @param {string} extension - File extension (e.g., 'jpg', 'png')
 * @param {Array<number>} widths - Array of widths to generate
 * @returns {Array<{width: number, src: string}>}
 */
export function generateResponsiveSources(basePath, extension, widths) {
  return widths.map(width => ({
    width,
    src: `${basePath}-${width}w.${extension}`,
  }));
}

/**
 * Generate sizes attribute for responsive images
 * 
 * @param {Object} config - Configuration object
 * @param {string} config.mobile - Size for mobile (default: '100vw')
 * @param {string} config.tablet - Size for tablet (default: '50vw')
 * @param {string} config.desktop - Size for desktop (default: '33vw')
 * @returns {string} - Sizes attribute value
 */
export function generateSizesAttribute({ mobile = '100vw', tablet = '50vw', desktop = '33vw' } = {}) {
  return `(max-width: ${IMAGE_BREAKPOINTS.mobile}px) ${mobile}, (max-width: ${IMAGE_BREAKPOINTS.desktop}px) ${tablet}, ${desktop}`;
}

/**
 * Presets for common image use cases
 */
export const IMAGE_PRESETS = {
  hero: {
    widths: [640, 768, 1024, 1280, 1920],
    sizes: generateSizesAttribute({ mobile: '100vw', tablet: '100vw', desktop: '100vw' }),
  },
  card: {
    widths: [320, 640, 768],
    sizes: generateSizesAttribute({ mobile: '100vw', tablet: '50vw', desktop: '33vw' }),
  },
  thumbnail: {
    widths: [150, 300],
    sizes: generateSizesAttribute({ mobile: '150px', tablet: '150px', desktop: '150px' }),
  },
  avatar: {
    widths: [64, 128],
    sizes: generateSizesAttribute({ mobile: '64px', tablet: '64px', desktop: '64px' }),
  },
};

/**
 * Check if browser supports WebP
 * Uses feature detection
 * 
 * @returns {Promise<boolean>}
 */
export async function supportsWebP() {
  if (typeof window === 'undefined') return false;
  
  // Check if already cached
  if (window.__webpSupport !== undefined) {
    return window.__webpSupport;
  }
  
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      const support = webP.height === 2;
      window.__webpSupport = support;
      resolve(support);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * Get optimized image URL based on device pixel ratio
 * 
 * @param {string} src - Original image source
 * @param {number} targetWidth - Target width in CSS pixels
 * @returns {string} - Optimized image URL
 */
export function getOptimizedImageUrl(src, targetWidth) {
  if (!src) return src;
  
  // Get device pixel ratio (default to 1)
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  
  // Calculate actual pixel width needed
  const actualWidth = Math.ceil(targetWidth * dpr);
  
  // Round to nearest standard width
  const standardWidths = [320, 640, 768, 1024, 1280, 1920];
  const optimalWidth = standardWidths.find(w => w >= actualWidth) || standardWidths[standardWidths.length - 1];
  
  // If external URL, return as-is (CDN should handle optimization)
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  
  // For local images, append width parameter
  const [path, query] = src.split('?');
  const newQuery = query ? `${query}&w=${optimalWidth}` : `w=${optimalWidth}`;
  
  return `${path}?${newQuery}`;
}

/**
 * Preload critical images
 * Should be called for above-the-fold images
 * 
 * @param {string} src - Image source
 * @param {string} type - Image type (default: 'image/webp')
 */
export function preloadImage(src, type = 'image/webp') {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.type = type;
  
  document.head.appendChild(link);
}

/**
 * Calculate image dimensions maintaining aspect ratio
 * 
 * @param {number} originalWidth - Original width
 * @param {number} originalHeight - Original height
 * @param {number} targetWidth - Target width
 * @returns {{width: number, height: number}}
 */
export function calculateAspectRatio(originalWidth, originalHeight, targetWidth) {
  const aspectRatio = originalHeight / originalWidth;
  return {
    width: targetWidth,
    height: Math.round(targetWidth * aspectRatio),
  };
}
