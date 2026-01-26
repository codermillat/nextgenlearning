/**
 * SEOMetaTags Component Usage Examples
 * 
 * This file demonstrates various use cases for the SEOMetaTags component
 * in the Sharda University content enhancement feature.
 */

import SEOMetaTags from './SEOMetaTags';

// Example 1: Basic usage for a landing page
export function ShardaLandingPageSEO() {
  return (
    <SEOMetaTags
      title="Sharda University - Top Private University in India | Admissions 2026-27"
      description="Sharda University offers world-class education with students from 95+ countries. Explore B.Tech, MBA, Medical programs with scholarships up to 50%. Apply now!"
      keywords={[
        'sharda university',
        'sharda university admission',
        'top private university india',
        'international university india',
        'study in india'
      ]}
      canonicalUrl="/sharda"
      ogImage="/images/sharda-campus.jpg"
    />
  );
}

// Example 2: Program-specific page with structured data
export function BTechCSEProgramSEO() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "B.Tech Computer Science Engineering",
    "description": "4-year undergraduate program in Computer Science and Engineering at Sharda University",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Sharda University",
      "url": "https://www.sharda.ac.in"
    },
    "offers": {
      "@type": "Offer",
      "price": "240000",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <SEOMetaTags
      title="B.Tech CSE at Sharda University - Fees, Eligibility, Placements 2026"
      description="B.Tech Computer Science Engineering at Sharda University. Total fees ₹9.6L (4 years), scholarships available. 95% placement rate. Apply now for 2026 admission."
      keywords={[
        'sharda university b.tech cse',
        'b.tech cse fees sharda',
        'computer science engineering sharda',
        'sharda university engineering'
      ]}
      canonicalUrl="/sharda/programs/btech-cse"
      ogImage="/images/sharda-btech-cse.jpg"
      structuredData={courseSchema}
    />
  );
}

// Example 3: Fee-specific page
export function BTechCSEFeesSEO() {
  return (
    <SEOMetaTags
      title="Sharda University B.Tech CSE Fees 2026 - Complete Fee Structure"
      description="Detailed fee breakdown for B.Tech CSE at Sharda University. Annual fees ₹2.4L, total 4-year fees ₹9.6L. Scholarships up to 50% available for eligible students."
      keywords={[
        'sharda university b.tech cse fees',
        'sharda university engineering fees',
        'b.tech cse total fees',
        'sharda university fees 4 years'
      ]}
      canonicalUrl="/sharda/programs/btech-cse/fees"
    />
  );
}

// Example 4: Ranking page
export function ShardaRankingsSEO() {
  return (
    <SEOMetaTags
      title="Sharda University NIRF Ranking 2026 - QS, NAAC Rankings"
      description="Sharda University rankings: NIRF Rank 151-200, QS Asia Rank 651-700, NAAC A Grade. Recognized by UGC, AICTE, MCI. Top private university in NCR."
      keywords={[
        'sharda university nirf ranking',
        'sharda university ranking',
        'sharda university qs ranking',
        'sharda university naac grade'
      ]}
      canonicalUrl="/sharda/rankings"
      ogImage="/images/sharda-rankings.jpg"
    />
  );
}

// Example 5: Bangladesh-specific content
export function BangladeshStudentsSEO() {
  return (
    <SEOMetaTags
      title="Study at Sharda University from Bangladesh - Scholarships & Admission 2026"
      description="Bangladeshi students get up to 50% scholarship at Sharda University. Easy admission process, HSC accepted. 500+ Bangladeshi students studying. Apply now!"
      keywords={[
        'study in india from bangladesh',
        'sharda university bangladesh',
        'scholarship for bangladeshi students',
        'indian university for bangladeshi students'
      ]}
      canonicalUrl="/sharda/bangladesh-students"
      ogImage="/images/sharda-bangladesh-students.jpg"
    />
  );
}

// Example 6: Comparison page
export function ShardaVsAmityComparisonSEO() {
  return (
    <SEOMetaTags
      title="Sharda University vs Amity University - Which is Better? 2026 Comparison"
      description="Compare Sharda vs Amity: fees, placements, rankings, infrastructure. Detailed comparison to help you choose the right university for your career."
      keywords={[
        'sharda vs amity',
        'sharda university vs amity university',
        'which is better sharda or amity',
        'sharda amity comparison'
      ]}
      canonicalUrl="/compare/sharda-vs-amity"
      ogType="article"
    />
  );
}

// Example 7: Article/Blog post
export function ShardaAdmissionGuideSEO() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Complete Guide to Sharda University Admission 2026",
    "description": "Step-by-step guide for admission to Sharda University",
    "author": {
      "@type": "Organization",
      "name": "NextGen Learning"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NextGen Learning"
    },
    "datePublished": "2025-01-15",
    "dateModified": "2025-01-15"
  };

  return (
    <SEOMetaTags
      title="Sharda University Admission 2026 - Complete Application Guide"
      description="Complete guide to Sharda University admission process. Learn about eligibility, documents required, application steps, deadlines, and scholarship opportunities."
      keywords={[
        'sharda university admission',
        'sharda university admission process',
        'how to apply sharda university',
        'sharda university application'
      ]}
      canonicalUrl="/guides/sharda-university-admission"
      ogType="article"
      structuredData={articleSchema}
    />
  );
}

// Example 8: Page that should not be indexed (e.g., thank you page)
export function ThankYouPageSEO() {
  return (
    <SEOMetaTags
      title="Thank You - Application Submitted | Sharda University"
      description="Your application has been successfully submitted to Sharda University. We will contact you shortly."
      canonicalUrl="/sharda/thank-you"
      noindex={true}
    />
  );
}

// Example 9: FAQ page with structured data
export function ShardaFAQSEO() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the fee structure for B.Tech at Sharda University?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The annual fee for B.Tech programs at Sharda University is approximately ₹2.4 lakhs, making the total 4-year fee around ₹9.6 lakhs. Scholarships up to 50% are available for eligible students."
        }
      },
      {
        "@type": "Question",
        "name": "Does Sharda University accept HSC from Bangladesh?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Sharda University accepts HSC certificates from Bangladesh. Bangladeshi students can apply directly with their HSC marksheet and are eligible for scholarships up to 50%."
        }
      }
    ]
  };

  return (
    <SEOMetaTags
      title="Sharda University FAQs - Admission, Fees, Scholarships, Placements"
      description="Frequently asked questions about Sharda University. Get answers about admission process, fee structure, scholarships, placements, hostel facilities, and more."
      keywords={[
        'sharda university faq',
        'sharda university admission questions',
        'sharda university fees questions'
      ]}
      canonicalUrl="/sharda/faq"
      structuredData={faqSchema}
    />
  );
}

// Example 10: Dynamic page with URL parameters
export function DynamicProgramPageSEO({ programName, programCode, fees }) {
  return (
    <SEOMetaTags
      title={`${programName} at Sharda University - Fees, Eligibility, Admission 2026`}
      description={`${programName} (${programCode}) at Sharda University. Complete details about fees (₹${fees}), eligibility criteria, admission process, and career prospects.`}
      keywords={[
        `sharda university ${programName.toLowerCase()}`,
        `${programCode.toLowerCase()} sharda`,
        `${programName.toLowerCase()} fees`,
        `${programName.toLowerCase()} admission`
      ]}
      canonicalUrl={`/sharda/programs/${programCode.toLowerCase()}`}
    />
  );
}

/**
 * Best Practices for Using SEOMetaTags:
 * 
 * 1. Title Length: Keep titles between 50-60 characters for optimal display in search results
 * 2. Description Length: Keep descriptions between 150-160 characters
 * 3. Keywords: Use 3-7 relevant keywords, prioritize long-tail keywords
 * 4. Canonical URL: Always provide a canonical URL to avoid duplicate content issues
 * 5. OG Image: Use high-quality images (1200x630px) for social media sharing
 * 6. Structured Data: Add structured data for rich snippets in search results
 * 7. Unique Content: Ensure each page has unique title and description
 * 8. Target Keywords: Include primary keyword in title, description, and first keyword
 * 9. Mobile-First: All meta tags are automatically optimized for mobile
 * 10. Updates: Update meta tags when content changes significantly
 */
