import { useEffect } from 'react';

/**
 * SEO Head component for dynamic meta tags (React 19 compatible)
 * Usage: <SEOHead title="Page Title" description="Page description" />
 */
export default function SEOHead({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  canonical,
  noindex = false,
  alternateLanguages = [],
}) {
  const siteUrl = 'https://www.nextgenlearning.dev';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  // Default OG image
  const defaultImage = `${siteUrl}/og-image.svg`;
  const fullImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;
  const keywordsString = Array.isArray(keywords) ? keywords.join(', ') : keywords;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Canonical URL - Set early for better SEO
    // Always use clean URLs without query parameters or hash
    // Use canonical prop if provided, otherwise use url prop, otherwise use current pathname
    let canonicalPath = canonical || url;
    
    // If no canonical or url prop, use current pathname (window.location.pathname already excludes query params and hash)
    if (!canonicalPath) {
      canonicalPath = window.location.pathname || '/';
    }
    
    // Ensure canonicalPath is a string
    canonicalPath = String(canonicalPath || '/');
    
    // Normalize canonical path: ensure it starts with /, no trailing slash (except root), no query params or hash
    if (canonicalPath) {
      // Remove query parameters and hash first
      canonicalPath = canonicalPath.split('?')[0].split('#')[0];
      
      // If it's already a full URL, extract just the path
      if (canonicalPath.startsWith('http')) {
        try {
          const urlObj = new URL(canonicalPath);
          canonicalPath = urlObj.pathname;
        } catch {
          // If URL parsing fails, fall back to pathname extraction
          const match = canonicalPath.match(/\/\/[^/]+(\/.*)?/);
          canonicalPath = match && match[1] ? match[1] : '/';
        }
      }
      
      // Ensure it starts with /
      canonicalPath = canonicalPath.startsWith('/') ? canonicalPath : '/' + canonicalPath;
      
      // Remove trailing slash except for root
      if (canonicalPath !== '/' && canonicalPath.endsWith('/')) {
        canonicalPath = canonicalPath.slice(0, -1);
      }
      
      // Final cleanup: remove any remaining query parameters or hash (defensive)
      canonicalPath = canonicalPath.split('?')[0].split('#')[0];
    }
    
    // Ensure canonicalPath has a valid value (fallback to root)
    if (!canonicalPath || canonicalPath === '') {
      canonicalPath = '/';
    }
    
    // Remove any existing canonical links to avoid conflicts
    document.querySelectorAll('link[rel="canonical"]').forEach(link => link.remove());
    
    // Create new canonical link
    const canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    
    // Set the canonical URL (ensure it's absolute)
    const finalCanonicalUrl = `${siteUrl}${canonicalPath}`;
    canonicalLink.setAttribute('href', finalCanonicalUrl);
    document.head.appendChild(canonicalLink);

    // Primary Meta Tags
    updateMetaTag('title', title);
    updateMetaTag('description', description);
    if (keywordsString) {
      updateMetaTag('keywords', keywordsString);
    }
    
    // Robots
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    
    // Open Graph / Facebook
    // Use canonical URL for og:url to avoid query parameter issues
    const ogUrl = canonicalPath ? `${siteUrl}${canonicalPath}` : fullUrl;
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', ogUrl, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    if (fullImage) {
      updateMetaTag('og:image', fullImage, true);
      updateMetaTag('og:image:width', '1200', true);
      updateMetaTag('og:image:height', '630', true);
      updateMetaTag('og:image:alt', title, true);
    }
    updateMetaTag('og:site_name', 'NextGen Learning - Tech & IT Courses', true);
    updateMetaTag('og:locale', 'en_US', true);
    
    // Twitter Card
    // Use canonical URL for twitter:url to avoid query parameter issues
    const twitterUrl = canonicalPath ? `${siteUrl}${canonicalPath}` : fullUrl;
    updateMetaTag('twitter:card', fullImage ? 'summary_large_image' : 'summary');
    updateMetaTag('twitter:url', twitterUrl);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    if (fullImage) {
      updateMetaTag('twitter:image', fullImage);
      updateMetaTag('twitter:image:alt', title);
    }
    updateMetaTag('twitter:site', '@NextGenLearning', true);
    updateMetaTag('twitter:creator', '@NextGenLearning', true);
    
    // Additional Meta Tags
    updateMetaTag('author', 'NextGen Learning');
    updateMetaTag('revisit-after', '7 days');
    
    
    // Article meta (if applicable)
    if (type === 'article') {
      updateMetaTag('article:author', 'NextGen Learning', true);
    }
    
    // Mobile optimization
    updateMetaTag('theme-color', '#2563eb');
    updateMetaTag('mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'default');
    
    // Additional SEO meta tags
    updateMetaTag('format-detection', 'telephone=yes');
    updateMetaTag('rating', 'general');
    updateMetaTag('distribution', 'global');
    updateMetaTag('expires', 'never');
    updateMetaTag('geo.region', 'IN');
    updateMetaTag('geo.placename', 'India');
    updateMetaTag('ICBM', '28.6139, 77.2090'); // Delhi coordinates (central location)
    
    // Enhanced SEO tags
    updateMetaTag('application-name', 'NextGen Learning');
    updateMetaTag('apple-mobile-web-app-title', 'NextGen Learning');
    updateMetaTag('msapplication-TileColor', '#2563eb');
    updateMetaTag('msapplication-config', '/browserconfig.xml');
    
    // Content Security and Verification
    updateMetaTag('referrer', 'no-referrer-when-downgrade');
    updateMetaTag('X-UA-Compatible', 'IE=edge');
    
    // Language: Standardized to English only (remove conflicting language tags)
    // HTML lang="en" is set in index.html, no need for duplicate meta tags
    
    // Remove any existing hreflang tags (we're using single language - English)
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.remove());
    
    // Only add hreflang if alternate languages are explicitly provided
    if (alternateLanguages && alternateLanguages.length > 0) {
      alternateLanguages.forEach(lang => {
        const hreflangLink = document.createElement('link');
        hreflangLink.setAttribute('rel', 'alternate');
        hreflangLink.setAttribute('hreflang', lang.code);
        hreflangLink.setAttribute('href', lang.url);
        document.head.appendChild(hreflangLink);
      });
    }
  }, [title, description, keywordsString, image, url, type, canonical, noindex, fullUrl, fullImage, alternateLanguages, siteUrl]);

  return null;
}
