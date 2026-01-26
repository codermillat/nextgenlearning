import { useEffect } from 'react';

/**
 * SEOMetaTags component for dynamic meta tag generation
 * Specifically designed for Sharda University content enhancement
 * 
 * Features:
 * - Dynamic title, description, keywords generation
 * - Open Graph tags for social media sharing
 * - Twitter Card support
 * - Canonical URL support
 * - Mobile optimization tags
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - Page title (will be used for <title>, og:title, twitter:title)
 * @param {string} props.description - Page description (will be used for meta description, og:description, twitter:description)
 * @param {string[]} [props.keywords=[]] - Array of keywords for SEO
 * @param {string} [props.canonicalUrl] - Canonical URL for the page (can be relative or absolute)
 * @param {string} [props.ogImage] - Open Graph image URL (can be relative or absolute)
 * @param {('website'|'article'|'profile')} [props.ogType='website'] - Open Graph type
 * @param {Object} [props.structuredData] - Structured data object (will be converted to JSON-LD)
 * @param {boolean} [props.noindex=false] - Whether to prevent indexing
 * 
 * @example
 * <SEOMetaTags
 *   title="Sharda University B.Tech CSE Fees"
 *   description="Complete fee structure for B.Tech CSE at Sharda University"
 *   keywords={['sharda university fees', 'b.tech cse fees', 'engineering fees']}
 *   canonicalUrl="/sharda/programs/btech-cse/fees"
 *   ogImage="/images/sharda-btech-cse.jpg"
 * />
 */
export default function SEOMetaTags({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  ogType = 'website',
  structuredData,
  noindex = false,
}) {
  const siteUrl = 'https://www.nextgenlearning.dev';
  
  // Ensure keywords is an array
  const keywordsArray = Array.isArray(keywords) ? keywords : [keywords].filter(Boolean);
  const keywordsString = keywordsArray.join(', ');
  
  // Build full URLs
  const fullCanonicalUrl = canonicalUrl 
    ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${siteUrl}${canonicalUrl}`)
    : null;
  
  const fullOgImage = ogImage
    ? (ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`)
    : `${siteUrl}/og-image.svg`;

  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Helper function to update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      if (!content) return;
      
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
    
    // Robots meta tag
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    
    // Canonical URL
    if (fullCanonicalUrl) {
      // Remove any existing canonical links
      document.querySelectorAll('link[rel="canonical"]').forEach(link => link.remove());
      
      // Create new canonical link
      const canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', fullCanonicalUrl);
      document.head.appendChild(canonicalLink);
    }
    
    // Open Graph Tags
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', fullCanonicalUrl || window.location.href, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', fullOgImage, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', title, true);
    updateMetaTag('og:site_name', 'NextGen Learning - Tech & IT Courses', true);
    updateMetaTag('og:locale', 'en_US', true);
    
    // Twitter Card Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', fullCanonicalUrl || window.location.href);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', fullOgImage);
    updateMetaTag('twitter:image:alt', title);
    updateMetaTag('twitter:site', '@NextGenLearning');
    updateMetaTag('twitter:creator', '@NextGenLearning');
    
    // Additional SEO Meta Tags
    updateMetaTag('author', 'NextGen Learning');
    updateMetaTag('revisit-after', '7 days');
    
    // Mobile Optimization
    updateMetaTag('theme-color', '#2563eb');
    updateMetaTag('mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'default');
    
    // Structured Data (JSON-LD)
    if (structuredData) {
      const scriptId = 'seo-structured-data';
      
      // Remove existing structured data script if it exists
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
      
      // Create new structured data script
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
    
    // Cleanup function
    return () => {
      // Note: We don't remove meta tags on unmount as they should persist
      // Only remove structured data script if component unmounts
      if (structuredData) {
        const scriptToRemove = document.getElementById('seo-structured-data');
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      }
    };
  }, [title, description, keywordsString, fullCanonicalUrl, fullOgImage, ogType, structuredData, noindex]);

  // This component doesn't render anything visible
  return null;
}
