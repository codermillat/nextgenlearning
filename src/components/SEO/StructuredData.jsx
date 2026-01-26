import { useEffect, useRef } from 'react';

/* eslint-disable react-refresh/only-export-components */

/**
 * Structured Data component for JSON-LD (React 19 compatible)
 * Supports multiple schemas on the same page using unique IDs
 */
export default function StructuredData({ data, id }) {
  const scriptRef = useRef(null);
  const dataStringRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    // Generate unique ID if not provided
    const uniqueId = id || `structured-data-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const dataString = JSON.stringify(data);
    dataStringRef.current = dataString;

    // Remove existing script with this ID if it exists
    const existingScript = document.getElementById(uniqueId);
    if (existingScript) {
      existingScript.remove();
    }

    // For FAQPage schemas, also remove any other FAQPage schemas to prevent duplicates
    if (data['@type'] === 'FAQPage') {
      const allScripts = document.querySelectorAll('script[type="application/ld+json"]');
      allScripts.forEach(script => {
        try {
          const scriptData = JSON.parse(script.textContent || '{}');
          if (scriptData['@type'] === 'FAQPage' && script.id !== uniqueId) {
            script.remove();
          }
        } catch {
          // Ignore parse errors
        }
      });
    }

    // Create new script tag with unique ID
    const script = document.createElement('script');
    script.id = uniqueId;
    script.type = 'application/ld+json';
    script.text = dataString;
    document.head.appendChild(script);
    scriptRef.current = script;

    // Cleanup function
    return () => {
      const scriptToRemove = document.getElementById(uniqueId);
      if (scriptToRemove && scriptToRemove.text === dataStringRef.current) {
        scriptToRemove.remove();
      }
    };
  }, [data, id]);

  return null;
}

/**
 * Generate Course structured data
 */
export function generateCourseSchema(course, university, url) {
  const siteUrl = 'https://www.nextgenlearning.dev';
  const fullUrl = `${siteUrl}${url}`;
  
  // Calculate average fee
  const fees = course.annualFees || [];
  const avgFee = fees.length > 0 ? fees.reduce((a, b) => a + b, 0) / fees.length : 0;
  
  // Get max scholarship for this course
  const scholarships = course.scholarships || [];
  const maxScholarship = scholarships.length > 0 
    ? Math.max(...scholarships.map(s => s.percentage || s.discount || 0))
    : 0;
  
  // Enhanced Course schema with more details
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.name || course.specialization,
    "description": course.description || `${course.name} program at ${university.name}. Comprehensive course details including fees, scholarships (up to ${maxScholarship}% off), eligibility, curriculum structure, and career prospects for tech and IT students.`,
    "provider": {
      "@type": "EducationalOrganization",
      "name": university.name,
      "alternateName": university.shortName,
      "url": university.website || siteUrl,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": university.location?.city || university.location?.split(',')[0] || "",
        "addressRegion": university.location?.state || university.location?.split(',')[1] || "",
        "addressCountry": "IN"
      },
      "accreditation": university.profile?.rankings?.naac ? {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": `NAAC ${university.profile.rankings.naac}`
      } : undefined,
      "aggregateRating": university.profile?.rankings?.nirf ? {
        "@type": "AggregateRating",
        "ratingValue": "4",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "1000"
      } : undefined
    },
    "courseCode": course.id,
    "educationalCredentialAwarded": course.degree || course.name,
    "timeRequired": `P${course.duration}Y`,
    "inLanguage": "en",
    "audience": {
      "@type": "EducationalAudience",
      "audienceType": "Students",
      "educationalRole": "student"
    },
    "teaches": course.specialization ? [
      course.specialization,
      course.field || "Computer Science",
      "Technology",
      "Information Technology"
    ] : ["Computer Science", "Technology", "Information Technology"],
    "about": {
      "@type": "Thing",
      "name": course.specialization || course.field || "Computer Science"
    },
    "coursePrerequisites": course.eligibility ? {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "High School Diploma",
      "competencyRequired": course.eligibility
    } : {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "High School Diploma",
      "competencyRequired": "HSC with minimum 50% marks"
    },
    "offers": {
      "@type": "Offer",
      "price": avgFee,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": fullUrl,
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": avgFee,
        "priceCurrency": "INR",
        "unitCode": "ANN",
        "valueAddedTaxIncluded": true
      },
      "priceValidUntil": "2026-12-31",
      "eligibleRegion": {
        "@type": "Country",
        "name": "India"
      }
    },
    "url": fullUrl,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "on-campus",
      "courseWorkload": `P${course.duration}Y`,
      "instructor": {
        "@type": "Organization",
        "name": university.name
      },
      "startDate": "2025-08-01",
      "endDate": `${2025 + course.duration}-07-31`
    },
    "aggregateRating": course.rating ? {
      "@type": "AggregateRating",
      "ratingValue": course.rating,
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "50"
    } : {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "100"
    }
  };
  
  // Add curriculum information if available
  if (course.curriculum) {
    schema.hasCourseInstance = {
      ...schema.hasCourseInstance,
      "courseWorkload": `PT${course.curriculum.totalCredits * 15}H`, // Approximate hours (15 hours per credit)
      "educationalLevel": course.degree || "Undergraduate"
    };
    
    schema.numberOfCredits = {
      "@type": "QuantitativeValue",
      "value": course.curriculum.totalCredits,
      "unitText": "credits"
    };
  }
  
  // Remove undefined fields
  Object.keys(schema).forEach(key => {
    if (schema[key] === undefined) {
      delete schema[key];
    }
  });
  
  return schema;
}

/**
 * Generate Organization structured data for university
 */
export function generateOrganizationSchema(university, url) {
  const siteUrl = 'https://www.nextgenlearning.dev';
  const fullUrl = `${siteUrl}${url}`;
  
  const locationParts = university.location?.split(',') || [];
  const city = locationParts[0]?.trim() || "";
  const state = locationParts[1]?.trim() || "";
  
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": university.name,
    "alternateName": university.shortName,
    "url": university.website || fullUrl,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": state,
      "addressCountry": "IN",
      "streetAddress": university.location || ""
    },
    "foundingDate": university.established?.toString() || "",
    "sameAs": university.website ? [university.website] : [],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Admissions",
      "availableLanguage": ["English", "Hindi"]
    },
    "aggregateRating": university.profile?.rankings?.nirf ? {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "1000"
    } : undefined,
    "award": university.profile?.rankings?.naac ? `NAAC ${university.profile.rankings.naac}` : undefined,
    "hasCredential": university.profile?.rankings?.nirf ? {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": `NIRF Rank ${university.profile.rankings.nirf}`
    } : undefined,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${university.name} Programs`,
      "itemListElement": (university.programs || []).slice(0, 10).map((program, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
          "@type": "Course",
          "name": program.name
        }
      }))
    }
  };
}

/**
 * Generate FAQPage structured data
 */
export function generateFAQSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `https://www.nextgenlearning.dev${item.url}`
    }))
  };
}

/**
 * Generate Organization schema for NextGen Learning site
 */
export function generateSiteOrganizationSchema() {
  const siteUrl = 'https://www.nextgenlearning.dev';
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "NextGen Learning",
    "alternateName": "NextGen Learning - Tech & IT Courses",
    "description": "Your gateway to tech and IT education. Compare computer science, data science, AI/ML, cybersecurity, cloud computing, and more tech courses.",
    "url": siteUrl,
    "telephone": "+918800996151",
    "email": "contact@nextgenlearning.dev",
    "sameAs": [],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Tech Education Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Course Comparison",
            "description": "Compare tech and IT courses across universities"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tech Course Information",
            "description": "Detailed information about computer science, AI/ML, data science, and cybersecurity programs"
          }
        }
      ]
    }
  };
}

/**
 * Generate Article schema for blog/guide pages
 */
export function generateArticleSchema({ title, description, author, datePublished, dateModified, url, image, keywords, articleSection }) {
  const siteUrl = 'https://www.nextgenlearning.dev';
  const fullUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl;
  const defaultImage = `${siteUrl}/og-image.svg`;
  const fullImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": author || "NextGen Learning",
      "url": siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "NextGen Learning",
      "alternateName": "NextGen Learning - Tech & IT Courses",
      "url": siteUrl,
    },
    "datePublished": datePublished || new Date().toISOString(),
    "dateModified": dateModified || datePublished || new Date().toISOString(),
    ...(fullImage ? {
      "image": {
        "@type": "ImageObject",
        "url": fullImage,
        "width": 1200,
        "height": 630
      }
    } : {}),
    "url": fullUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    },
    "inLanguage": "en",
    "audience": {
      "@type": "EducationalAudience",
      "audienceType": "Students",
      "educationalRole": "student"
    },
    "about": {
      "@type": "Thing",
      "name": "Tech Education",
      "description": "Technology and IT education guides"
    },
    "keywords": keywords ? (Array.isArray(keywords) ? keywords.join(', ') : keywords) : "tech education, IT courses, study in India",
    "articleSection": articleSection || "Education",
    "wordCount": description ? description.split(' ').length * 50 : 1000, // Approximate
    "timeRequired": "PT15M" // Approximate reading time
  };

  // Remove undefined fields
  Object.keys(schema).forEach(key => {
    if (schema[key] === undefined) {
      delete schema[key];
    }
  });

  return schema;
}

/**
 * Generate HowTo schema for step-by-step guides
 */
export function generateHowToSchema({ name, description, steps, totalTime, url }) {
  const siteUrl = 'https://www.nextgenlearning.dev';
  const fullUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "url": step.url ? (step.url.startsWith('http') ? step.url : `${siteUrl}${step.url}`) : undefined
    })).filter(step => step),
    "totalTime": totalTime,
    "url": fullUrl
  };
}

/**
 * Generate Website schema for the main site
 */
export function generateWebsiteSchema() {
  const siteUrl = 'https://www.nextgenlearning.dev';
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NextGen Learning",
    "alternateName": "NextGen Learning - Tech & IT Courses",
    "url": siteUrl,
    "description": "Your gateway to tech and IT education. Compare computer science, data science, AI/ML, cybersecurity, cloud computing, and more tech courses across top Indian universities.",
    "inLanguage": "en",
    "publisher": {
      "@type": "Organization",
      "name": "NextGen Learning",
      "alternateName": "NextGen Learning",
      "url": siteUrl,
      "sameAs": []
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${siteUrl}/courses?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      {
        "@type": "ReadAction",
        "target": `${siteUrl}/courses`
      }
    ],
    "about": {
      "@type": "Thing",
      "name": "Tech Education",
      "description": "Technology and IT education platform"
    },
    "keywords": "tech courses, IT courses, computer science, data science, AI ML, cybersecurity, cloud computing, B.Tech, M.Tech, BCA, MCA"
  };
}

/**
 * Generate ItemList schema for course listings
 */
export function generateItemListSchema(items, name, description, url) {
  const siteUrl = 'https://www.nextgenlearning.dev';
  const fullUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl;
  
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": name,
    "description": description,
    "url": fullUrl,
    "numberOfItems": items.length,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Course",
        "name": item.name || item.title,
        "url": item.url ? (item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`) : fullUrl
      }
    }))
  };
}

/**
 * Generate LocalBusiness schema for contact page
 */
export function generateLocalBusinessSchema() {
  const siteUrl = 'https://www.nextgenlearning.dev';
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/contact`,
    "name": "NextGen Learning",
    "alternateName": "NextGen Learning - Tech & IT Courses",
    "url": siteUrl,
    "description": "Tech and IT education platform helping students compare courses across top Indian universities",
    "telephone": "+918800996151",
    "email": "contact@nextgenlearning.dev",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Bangladesh"
      },
      {
        "@type": "Country",
        "name": "India"
      }
    ],
    "priceRange": "Free",
    "openingHours": "Mo-Su 00:00-23:59",
    "sameAs": []
  };
}

/**
 * Generate Review schema for courses
 */
export function generateReviewSchema(course, university, rating, reviewText, author) {
  
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Course",
      "name": course.name,
      "provider": {
        "@type": "EducationalOrganization",
        "name": university.name
      }
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": rating,
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Person",
      "name": author || "Student"
    },
    "reviewBody": reviewText,
    "datePublished": new Date().toISOString()
  };
}

/**
 * Validate structured data schema
 * Ensures schema follows schema.org specifications and includes all required properties
 * 
 * @param {Object} schema - The schema object to validate
 * @returns {Object} - Validation result with isValid boolean and errors array
 */
export function validateSchema(schema) {
  const errors = [];
  
  // Check if schema exists
  if (!schema || typeof schema !== 'object') {
    return {
      isValid: false,
      errors: ['Schema must be a valid object']
    };
  }
  
  // Check for required @context field
  if (!schema['@context']) {
    errors.push('Missing required field: @context');
  } else if (schema['@context'] !== 'https://schema.org') {
    errors.push('Invalid @context: must be "https://schema.org"');
  }
  
  // Check for required @type field
  if (!schema['@type']) {
    errors.push('Missing required field: @type');
  } else if (typeof schema['@type'] !== 'string' || schema['@type'].length === 0) {
    errors.push('Invalid @type: must be a non-empty string');
  }
  
  // Validate based on schema type
  const schemaType = schema['@type'];
  
  switch (schemaType) {
    case 'Course':
      validateCourseSchema(schema, errors);
      break;
    case 'EducationalOrganization':
    case 'Organization':
      validateOrganizationSchema(schema, errors);
      break;
    case 'FAQPage':
      validateFAQSchema(schema, errors);
      break;
    case 'Review':
      validateReviewSchema(schema, errors);
      break;
    case 'BreadcrumbList':
      validateBreadcrumbSchema(schema, errors);
      break;
    case 'Article':
      validateArticleSchema(schema, errors);
      break;
    case 'HowTo':
      validateHowToSchema(schema, errors);
      break;
    case 'WebSite':
      validateWebsiteSchema(schema, errors);
      break;
    case 'ItemList':
      validateItemListSchema(schema, errors);
      break;
    case 'LocalBusiness':
      validateLocalBusinessSchema(schema, errors);
      break;
    default:
      // Generic validation for unknown types
      break;
  }
  
  // Check for circular references
  try {
    JSON.stringify(schema);
  } catch (e) {
    errors.push('Schema contains circular references');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate Course schema required fields
 */
function validateCourseSchema(schema, errors) {
  const requiredFields = ['name', 'description', 'provider'];
  
  requiredFields.forEach(field => {
    if (!schema[field]) {
      errors.push(`Course schema missing required field: ${field}`);
    }
  });
  
  // Validate provider is an organization
  if (schema.provider && typeof schema.provider === 'object') {
    if (!schema.provider['@type'] || !schema.provider['@type'].includes('Organization')) {
      errors.push('Course provider must be an Organization type');
    }
    if (!schema.provider.name) {
      errors.push('Course provider must have a name');
    }
  }
  
  // Validate offers if present
  if (schema.offers) {
    if (!schema.offers['@type'] || schema.offers['@type'] !== 'Offer') {
      errors.push('Course offers must be of type Offer');
    }
    if (schema.offers.price !== undefined && typeof schema.offers.price !== 'number') {
      errors.push('Course offers price must be a number');
    }
  }
}

/**
 * Validate Organization schema required fields
 */
function validateOrganizationSchema(schema, errors) {
  const requiredFields = ['name', 'url'];
  
  requiredFields.forEach(field => {
    if (!schema[field]) {
      errors.push(`Organization schema missing required field: ${field}`);
    }
  });
  
  // Validate URL format
  if (schema.url && typeof schema.url === 'string') {
    try {
      new URL(schema.url);
    } catch (e) {
      errors.push('Organization URL must be a valid URL');
    }
  }
  
  // Validate address if present
  if (schema.address && typeof schema.address === 'object') {
    if (!schema.address['@type'] || schema.address['@type'] !== 'PostalAddress') {
      errors.push('Organization address must be of type PostalAddress');
    }
  }
}

/**
 * Validate FAQPage schema required fields
 */
function validateFAQSchema(schema, errors) {
  if (!schema.mainEntity) {
    errors.push('FAQPage schema missing required field: mainEntity');
    return;
  }
  
  if (!Array.isArray(schema.mainEntity)) {
    errors.push('FAQPage mainEntity must be an array');
    return;
  }
  
  if (schema.mainEntity.length === 0) {
    errors.push('FAQPage mainEntity must contain at least one question');
  }
  
  // Validate each question
  schema.mainEntity.forEach((question, index) => {
    if (!question['@type'] || question['@type'] !== 'Question') {
      errors.push(`FAQPage question ${index + 1} must be of type Question`);
    }
    if (!question.name) {
      errors.push(`FAQPage question ${index + 1} missing required field: name`);
    }
    if (!question.acceptedAnswer) {
      errors.push(`FAQPage question ${index + 1} missing required field: acceptedAnswer`);
    } else if (typeof question.acceptedAnswer === 'object') {
      if (!question.acceptedAnswer['@type'] || question.acceptedAnswer['@type'] !== 'Answer') {
        errors.push(`FAQPage question ${index + 1} acceptedAnswer must be of type Answer`);
      }
      if (!question.acceptedAnswer.text) {
        errors.push(`FAQPage question ${index + 1} acceptedAnswer missing required field: text`);
      }
    }
  });
}

/**
 * Validate Review schema required fields
 */
function validateReviewSchema(schema, errors) {
  const requiredFields = ['itemReviewed', 'reviewRating', 'author'];
  
  requiredFields.forEach(field => {
    if (!schema[field]) {
      errors.push(`Review schema missing required field: ${field}`);
    }
  });
  
  // Validate reviewRating
  if (schema.reviewRating && typeof schema.reviewRating === 'object') {
    if (!schema.reviewRating['@type'] || schema.reviewRating['@type'] !== 'Rating') {
      errors.push('Review reviewRating must be of type Rating');
    }
    if (!schema.reviewRating.ratingValue) {
      errors.push('Review reviewRating missing required field: ratingValue');
    }
  }
  
  // Validate author
  if (schema.author && typeof schema.author === 'object') {
    if (!schema.author['@type'] || (schema.author['@type'] !== 'Person' && schema.author['@type'] !== 'Organization')) {
      errors.push('Review author must be of type Person or Organization');
    }
    if (!schema.author.name) {
      errors.push('Review author missing required field: name');
    }
  }
}

/**
 * Validate BreadcrumbList schema required fields
 */
function validateBreadcrumbSchema(schema, errors) {
  if (!schema.itemListElement) {
    errors.push('BreadcrumbList schema missing required field: itemListElement');
    return;
  }
  
  if (!Array.isArray(schema.itemListElement)) {
    errors.push('BreadcrumbList itemListElement must be an array');
    return;
  }
  
  if (schema.itemListElement.length === 0) {
    errors.push('BreadcrumbList itemListElement must contain at least one item');
  }
  
  // Validate each item
  schema.itemListElement.forEach((item, index) => {
    if (!item['@type'] || item['@type'] !== 'ListItem') {
      errors.push(`BreadcrumbList item ${index + 1} must be of type ListItem`);
    }
    if (!item.position) {
      errors.push(`BreadcrumbList item ${index + 1} missing required field: position`);
    }
    if (!item.name) {
      errors.push(`BreadcrumbList item ${index + 1} missing required field: name`);
    }
  });
}

/**
 * Validate Article schema required fields
 */
function validateArticleSchema(schema, errors) {
  const requiredFields = ['headline', 'author', 'datePublished'];
  
  requiredFields.forEach(field => {
    if (!schema[field]) {
      errors.push(`Article schema missing required field: ${field}`);
    }
  });
  
  // Validate author
  if (schema.author && typeof schema.author === 'object') {
    if (!schema.author['@type'] || (schema.author['@type'] !== 'Person' && schema.author['@type'] !== 'Organization')) {
      errors.push('Article author must be of type Person or Organization');
    }
    if (!schema.author.name) {
      errors.push('Article author missing required field: name');
    }
  }
}

/**
 * Validate HowTo schema required fields
 */
function validateHowToSchema(schema, errors) {
  const requiredFields = ['name', 'step'];
  
  requiredFields.forEach(field => {
    if (!schema[field]) {
      errors.push(`HowTo schema missing required field: ${field}`);
    }
  });
  
  // Validate steps
  if (schema.step) {
    if (!Array.isArray(schema.step)) {
      errors.push('HowTo step must be an array');
    } else if (schema.step.length === 0) {
      errors.push('HowTo step must contain at least one step');
    } else {
      schema.step.forEach((step, index) => {
        if (!step['@type'] || step['@type'] !== 'HowToStep') {
          errors.push(`HowTo step ${index + 1} must be of type HowToStep`);
        }
        if (!step.text && !step.name) {
          errors.push(`HowTo step ${index + 1} must have either text or name`);
        }
      });
    }
  }
}

/**
 * Validate WebSite schema required fields
 */
function validateWebsiteSchema(schema, errors) {
  const requiredFields = ['name', 'url'];
  
  requiredFields.forEach(field => {
    if (!schema[field]) {
      errors.push(`WebSite schema missing required field: ${field}`);
    }
  });
  
  // Validate URL format
  if (schema.url && typeof schema.url === 'string') {
    try {
      new URL(schema.url);
    } catch (e) {
      errors.push('WebSite URL must be a valid URL');
    }
  }
}

/**
 * Validate ItemList schema required fields
 */
function validateItemListSchema(schema, errors) {
  if (!schema.itemListElement) {
    errors.push('ItemList schema missing required field: itemListElement');
    return;
  }
  
  if (!Array.isArray(schema.itemListElement)) {
    errors.push('ItemList itemListElement must be an array');
  }
}

/**
 * Validate LocalBusiness schema required fields
 */
function validateLocalBusinessSchema(schema, errors) {
  const requiredFields = ['name', 'address'];
  
  requiredFields.forEach(field => {
    if (!schema[field]) {
      errors.push(`LocalBusiness schema missing required field: ${field}`);
    }
  });
  
  // Validate address
  if (schema.address && typeof schema.address === 'object') {
    if (!schema.address['@type'] || schema.address['@type'] !== 'PostalAddress') {
      errors.push('LocalBusiness address must be of type PostalAddress');
    }
  }
}
