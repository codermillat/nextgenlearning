import { memo, useState, useRef, useEffect } from 'react';

/**
 * Lazy Loading Image Component with WebP Support
 * Uses Intersection Observer for lazy loading images
 * Shows skeleton while loading for better UX
 * Supports WebP format with fallbacks for better performance
 * Implements responsive image sizes
 * 
 * @param {string} src - Image source URL (will be converted to WebP if possible)
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - Additional CSS classes
 * @param {string|number} width - Image width
 * @param {string|number} height - Image height
 * @param {string} placeholder - Placeholder color/gradient while loading
 * @param {string} sizes - Responsive sizes attribute (e.g., "(max-width: 768px) 100vw, 50vw")
 * @param {Array<{width: number, src: string}>} srcSet - Array of responsive image sources
 * @param {boolean} useWebP - Whether to use WebP format with fallback (default: true)
 */
const LazyImage = memo(function LazyImage({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder = 'bg-gray-200',
  sizes,
  srcSet,
  useWebP = true,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  /**
   * Convert image URL to WebP format
   * Handles both local and external URLs
   */
  const getWebPUrl = (url) => {
    if (!url || !useWebP) return url;
    
    // Skip if already WebP
    if (url.endsWith('.webp')) return url;
    
    // Skip external URLs (CDNs, etc.) - they should handle their own optimization
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // Convert local images to WebP
    return url.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };

  /**
   * Generate srcSet string for responsive images
   */
  const generateSrcSet = (sources, format = 'original') => {
    if (!sources || sources.length === 0) return undefined;
    
    return sources
      .map(({ width: w, src: s }) => {
        const url = format === 'webp' ? getWebPUrl(s) : s;
        return `${url} ${w}w`;
      })
      .join(', ');
  };

  const webpSrc = getWebPUrl(src);
  const webpSrcSet = srcSet ? generateSrcSet(srcSet, 'webp') : undefined;
  const fallbackSrcSet = srcSet ? generateSrcSet(srcSet, 'original') : undefined;

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Skeleton placeholder */}
      {!isLoaded && (
        <div
          className={`absolute inset-0 ${placeholder} animate-pulse`}
          aria-hidden="true"
        />
      )}
      
      {/* Actual image - only load when in view */}
      {isInView && (
        <>
          {useWebP && webpSrc !== src ? (
            // Use picture element for WebP with fallback
            <picture>
              <source
                type="image/webp"
                srcSet={webpSrcSet || webpSrc}
                sizes={sizes}
              />
              <source
                type={src.endsWith('.png') ? 'image/png' : 'image/jpeg'}
                srcSet={fallbackSrcSet || src}
                sizes={sizes}
              />
              <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                loading="lazy"
                decoding="async"
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                {...props}
              />
            </picture>
          ) : (
            // Standard img element
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              srcSet={fallbackSrcSet}
              sizes={sizes}
              loading="lazy"
              decoding="async"
              onLoad={() => setIsLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              {...props}
            />
          )}
        </>
      )}
    </div>
  );
});

export default LazyImage;
