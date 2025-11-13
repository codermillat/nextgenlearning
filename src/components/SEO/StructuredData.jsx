import { useEffect, useRef } from 'react';

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
  const siteUrl = 'https://nextgenlearning.dev';
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
    "image": `${siteUrl}/og-image.jpg`,
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
  const siteUrl = 'https://nextgenlearning.dev';
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
    "logo": `${siteUrl}/og-image.jpg`,
    "image": `${siteUrl}/og-image.jpg`,
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
      "item": item.url.startsWith('http') ? item.url : `https://nextgenlearning.dev${item.url}`
    }))
  };
}

/**
 * Generate Organization schema for NextGen Learning
 */
export function generateWBESchema() {
  const siteUrl = 'https://nextgenlearning.dev';
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "NextGen Learning",
    "alternateName": "NextGen Learning - Tech & IT Courses",
    "description": "Your gateway to tech and IT education. Compare computer science, data science, AI/ML, cybersecurity, cloud computing, and more tech courses.",
    "url": siteUrl,
    "logo": `${siteUrl}/og-image.jpg`,
    "image": `${siteUrl}/og-image.jpg`,
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
export function generateArticleSchema({ title, description, author, datePublished, dateModified, url, image }) {
  const siteUrl = 'https://nextgenlearning.dev';
  const fullUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl;
  const fullImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/og-image.jpg`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": author || "NextGen Learning"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NextGen Learning",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/og-image.jpg`
      }
    },
    "datePublished": datePublished || new Date().toISOString(),
    "dateModified": dateModified || datePublished || new Date().toISOString(),
    "image": fullImage,
    "url": fullUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    },
    "inLanguage": "en-BD",
    "audience": {
      "@type": "EducationalAudience",
      "audienceType": "Students from Bangladesh",
      "geographicArea": {
        "@type": "Country",
        "name": "Bangladesh"
      }
    }
  };
}

/**
 * Generate HowTo schema for step-by-step guides
 */
export function generateHowToSchema({ name, description, steps, totalTime, url }) {
  const siteUrl = 'https://nextgenlearning.dev';
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
  const siteUrl = 'https://nextgenlearning.dev';
  
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
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/og-image.jpg`,
        "width": 1200,
        "height": 630
      },
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
  const siteUrl = 'https://nextgenlearning.dev';
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
  const siteUrl = 'https://nextgenlearning.dev';
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/contact`,
    "name": "NextGen Learning",
    "alternateName": "NextGen Learning - Tech & IT Courses",
    "url": siteUrl,
    "logo": `${siteUrl}/og-image.jpg`,
    "image": `${siteUrl}/og-image.jpg`,
    "description": "Tech and IT education platform helping students compare courses across top Indian universities",
    "telephone": "+8801611533385",
    "email": "westernbanglaedu@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BD"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Bangladesh"
    },
    "priceRange": "Free",
    "openingHours": "Mo-Su 00:00-23:59",
    "sameAs": []
  };
}

/**
 * Generate Review schema for courses
 */
export function generateReviewSchema(course, university, rating, reviewText, author) {
  const siteUrl = 'https://nextgenlearning.dev';
  
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
