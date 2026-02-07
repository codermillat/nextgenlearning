import { useEffect } from 'react';
import { generateDescription, generateTitle } from '../../utils/metaUtils';

/**
 * MetaManager component for optimized meta descriptions and title tags
 * Implements the formula: [EMOJI] + [BENEFIT] + [SOCIAL PROOF] + [PRICE] + [URGENCY] + [CTA]
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.emoji] - Emoji relevant to content (1-2 chars)
 * @param {string} props.benefit - Clear benefit statement (20-30 chars)
 * @param {string} [props.socialProof] - Student numbers, ratings (15-25 chars)
 * @param {string} [props.price] - Pricing information (10-15 chars)
 * @param {string} [props.urgency] - Deadline or scarcity (15-20 chars)
 * @param {string} props.cta - Call to action (10-15 chars)
 * @param {string} [props.baseTitle] - Base title without year/urgency
 * @param {string} [props.brandName='NextGen Learning'] - Brand name for title
 * @param {string} [props.url] - Canonical URL
 * @param {string} [props.image] - OG image URL
 * @param {string} [props.type='website'] - OG type
 * 
 * @example
 * <MetaManager
 *   emoji="🎓"
 *   benefit="Study in India's Top Universities"
 *   socialProof="10,000+ students enrolled"
 *   price="From ₹1.2L/year"
 *   urgency="Apply by March 2026"
 *   cta="Apply Now"
 *   baseTitle="Sharda University Admissions"
 * />
 */
export default function MetaManager({
  emoji,
  benefit,
  socialProof,
  price,
  urgency,
  cta,
  baseTitle,
  brandName = 'NextGen Learning',
  url,
  image,
  type = 'website',
}) {
  const siteUrl = 'https://www.nextgenlearning.dev';

  // Generate optimized meta description
  const description = generateDescription({
    emoji,
    benefit,
    socialProof,
    price,
    urgency,
    cta,
  });

  // Generate optimized title
  const title = generateTitle({
    baseTitle,
    urgency,
    brandName,
  });

  // Build full URLs
  const fullUrl = url
    ? (url.startsWith('http') ? url : `${siteUrl}${url}`)
    : siteUrl;
  const fullImage = image
    ? (image.startsWith('http') ? image : `${siteUrl}${image}`)
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

    // Canonical URL
    let canonicalPath = url || window.location.pathname || '/';
    canonicalPath = String(canonicalPath || '/').split('?')[0].split('#')[0];

    if (canonicalPath.startsWith('http')) {
      try {
        canonicalPath = new URL(canonicalPath).pathname || '/';
      } catch {
        canonicalPath = '/';
      }
    }

    canonicalPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    if (canonicalPath !== '/' && canonicalPath.endsWith('/')) {
      canonicalPath = canonicalPath.slice(0, -1);
    }

    document.querySelectorAll('link[rel="canonical"]').forEach(link => link.remove());
    const canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', `${siteUrl}${canonicalPath}`);
    document.head.appendChild(canonicalLink);

    // Primary Meta Tags
    updateMetaTag('title', title);
    updateMetaTag('description', description);

    // Open Graph Tags
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', fullImage, true);
    updateMetaTag('og:site_name', brandName, true);

    // Twitter Card Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', fullUrl);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', fullImage);
  }, [title, description, fullUrl, fullImage, type, brandName, url]);

  // This component doesn't render anything visible
  return null;
}
