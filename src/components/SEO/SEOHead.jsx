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
  // Default OG image - ensure it exists
  const defaultImage = `${siteUrl}/og-image.jpg`;
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

    // Primary Meta Tags
    updateMetaTag('title', title);
    updateMetaTag('description', description);
    if (keywordsString) {
      updateMetaTag('keywords', keywordsString);
    }
    
    // Robots
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    
    // Canonical URL - Always set a canonical tag
    // Default to url prop if canonical is not provided, or use current pathname
    const canonicalUrl = canonical || url || window.location.pathname;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    
    // Set the canonical URL (ensure it's absolute)
    const finalCanonicalUrl = canonicalUrl.startsWith('http') 
      ? canonicalUrl 
      : `${siteUrl}${canonicalUrl.startsWith('/') ? canonicalUrl : '/' + canonicalUrl}`;
    canonicalLink.setAttribute('href', finalCanonicalUrl);
    
    // Open Graph / Facebook
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', fullImage, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', title, true);
    updateMetaTag('og:site_name', 'NextGen Learning - Tech & IT Courses', true);
    updateMetaTag('og:locale', 'en_US', true);
    
    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', fullUrl);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', fullImage);
    updateMetaTag('twitter:image:alt', title);
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
  }, [title, description, keywordsString, image, url, type, canonical, noindex, fullUrl, fullImage, alternateLanguages]);

  return null;
}
