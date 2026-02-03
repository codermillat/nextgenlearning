import { describe, it, expect, beforeEach } from 'vitest';
import {
  IMAGE_BREAKPOINTS,
  generateResponsiveSources,
  generateSizesAttribute,
  IMAGE_PRESETS,
  supportsWebP,
  getOptimizedImageUrl,
  calculateAspectRatio,
} from '../imageOptimization';

describe('imageOptimization', () => {
  describe('IMAGE_BREAKPOINTS', () => {
    it('should define standard breakpoints', () => {
      expect(IMAGE_BREAKPOINTS).toEqual({
        mobile: 640,
        tablet: 768,
        desktop: 1024,
        wide: 1280,
        ultrawide: 1920,
      });
    });
  });

  describe('generateResponsiveSources', () => {
    it('should generate responsive sources for given widths', () => {
      const sources = generateResponsiveSources('/images/hero', 'jpg', [640, 1024, 1920]);
      
      expect(sources).toEqual([
        { width: 640, src: '/images/hero-640w.jpg' },
        { width: 1024, src: '/images/hero-1024w.jpg' },
        { width: 1920, src: '/images/hero-1920w.jpg' },
      ]);
    });

    it('should handle PNG extension', () => {
      const sources = generateResponsiveSources('/images/logo', 'png', [320, 640]);
      
      expect(sources).toEqual([
        { width: 320, src: '/images/logo-320w.png' },
        { width: 640, src: '/images/logo-640w.png' },
      ]);
    });

    it('should handle empty widths array', () => {
      const sources = generateResponsiveSources('/images/test', 'jpg', []);
      expect(sources).toEqual([]);
    });
  });

  describe('generateSizesAttribute', () => {
    it('should generate default sizes attribute', () => {
      const sizes = generateSizesAttribute();
      expect(sizes).toBe('(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw');
    });

    it('should generate custom sizes attribute', () => {
      const sizes = generateSizesAttribute({
        mobile: '90vw',
        tablet: '60vw',
        desktop: '40vw',
      });
      expect(sizes).toBe('(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 40vw');
    });

    it('should handle partial config', () => {
      const sizes = generateSizesAttribute({ mobile: '80vw' });
      expect(sizes).toBe('(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw');
    });
  });

  describe('IMAGE_PRESETS', () => {
    it('should define hero preset', () => {
      expect(IMAGE_PRESETS.hero).toBeDefined();
      expect(IMAGE_PRESETS.hero.widths).toEqual([640, 768, 1024, 1280, 1920]);
      expect(IMAGE_PRESETS.hero.sizes).toContain('100vw');
    });

    it('should define card preset', () => {
      expect(IMAGE_PRESETS.card).toBeDefined();
      expect(IMAGE_PRESETS.card.widths).toEqual([320, 640, 768]);
    });

    it('should define thumbnail preset', () => {
      expect(IMAGE_PRESETS.thumbnail).toBeDefined();
      expect(IMAGE_PRESETS.thumbnail.widths).toEqual([150, 300]);
    });

    it('should define avatar preset', () => {
      expect(IMAGE_PRESETS.avatar).toBeDefined();
      expect(IMAGE_PRESETS.avatar.widths).toEqual([64, 128]);
    });
  });

  describe('supportsWebP', () => {
    beforeEach(() => {
      // Clear cached result
      if (typeof window !== 'undefined') {
        delete window.__webpSupport;
      }
    });

    it('should return false in non-browser environment', async () => {
      const originalWindow = global.window;
      delete global.window;
      
      const result = await supportsWebP();
      expect(result).toBe(false);
      
      global.window = originalWindow;
    });

    it('should cache result', async () => {
      if (typeof window !== 'undefined') {
        window.__webpSupport = true;
        const result = await supportsWebP();
        expect(result).toBe(true);
      }
    });
  });

  describe('getOptimizedImageUrl', () => {
    it('should return original URL for external images', () => {
      const url = 'https://example.com/image.jpg';
      const result = getOptimizedImageUrl(url, 800);
      expect(result).toBe(url);
    });

    it('should add width parameter for local images', () => {
      const url = '/images/hero.jpg';
      const result = getOptimizedImageUrl(url, 800);
      expect(result).toContain('w=');
    });

    it('should round to nearest standard width', () => {
      const url = '/images/test.jpg';
      const result = getOptimizedImageUrl(url, 500);
      expect(result).toContain('w=640');
    });

    it('should handle images with existing query parameters', () => {
      const url = '/images/test.jpg?quality=80';
      const result = getOptimizedImageUrl(url, 800);
      expect(result).toContain('quality=80');
      expect(result).toContain('w=');
    });

    it('should return original URL if src is falsy', () => {
      expect(getOptimizedImageUrl(null, 800)).toBeNull();
      expect(getOptimizedImageUrl('', 800)).toBe('');
    });
  });

  describe('calculateAspectRatio', () => {
    it('should calculate correct dimensions for 16:9 aspect ratio', () => {
      const result = calculateAspectRatio(1920, 1080, 640);
      expect(result).toEqual({ width: 640, height: 360 });
    });

    it('should calculate correct dimensions for 4:3 aspect ratio', () => {
      const result = calculateAspectRatio(800, 600, 400);
      expect(result).toEqual({ width: 400, height: 300 });
    });

    it('should calculate correct dimensions for square images', () => {
      const result = calculateAspectRatio(500, 500, 200);
      expect(result).toEqual({ width: 200, height: 200 });
    });

    it('should round height to nearest integer', () => {
      const result = calculateAspectRatio(1000, 333, 600);
      expect(result.height).toBe(200); // 600 * (333/1000) = 199.8, rounded to 200
    });
  });
});
