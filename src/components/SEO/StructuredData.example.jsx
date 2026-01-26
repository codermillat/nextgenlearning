/**
 * Example usage of StructuredData component and validation
 * 
 * This file demonstrates how to:
 * 1. Generate structured data schemas
 * 2. Validate schemas before rendering
 * 3. Use the StructuredData component in React
 */

import React from 'react';
import StructuredData, {
  generateOrganizationSchema,
  generateCourseSchema,
  generateFAQSchema,
  generateReviewSchema,
  validateSchema
} from './StructuredData.jsx';

/**
 * Example 1: Basic usage with Course schema
 */
export function CoursePageExample() {
  const course = {
    name: 'B.Tech Computer Science',
    specialization: 'Computer Science',
    id: 'btech-cs',
    degree: 'B.Tech',
    duration: 4,
    annualFees: [200000, 200000, 200000, 200000],
    scholarships: [{ percentage: 50 }],
    eligibility: 'HSC with 50% marks',
    description: 'Comprehensive computer science program with focus on AI, ML, and software development.'
  };
  
  const university = {
    name: 'Sharda University',
    shortName: 'SU',
    location: 'Greater Noida, Uttar Pradesh',
    established: 2009,
    website: 'https://www.sharda.ac.in',
    profile: {
      rankings: {
        nirf: '101-150',
        naac: 'A'
      }
    },
    programs: []
  };
  
  // Generate schema
  const courseSchema = generateCourseSchema(course, university, '/courses/btech-cs');
  
  // Validate schema before rendering (optional but recommended)
  const validation = validateSchema(courseSchema);
  
  if (!validation.isValid) {
    console.error('Schema validation errors:', validation.errors);
    // Handle validation errors - maybe log to monitoring service
  }
  
  return (
    <div>
      <h1>{course.name}</h1>
      <p>{course.description}</p>
      
      {/* Render structured data */}
      <StructuredData data={courseSchema} id="course-schema" />
    </div>
  );
}

/**
 * Example 2: Organization schema with validation
 */
export function UniversityPageExample() {
  const university = {
    name: 'Sharda University',
    shortName: 'SU',
    location: 'Greater Noida, Uttar Pradesh',
    established: 2009,
    website: 'https://www.sharda.ac.in',
    profile: {
      rankings: {
        nirf: '101-150',
        naac: 'A'
      }
    },
    programs: [
      { name: 'B.Tech Computer Science' },
      { name: 'B.Tech AI & ML' },
      { name: 'BCA' }
    ]
  };
  
  const orgSchema = generateOrganizationSchema(university, '/universities/sharda');
  
  // Validate before rendering
  const validation = validateSchema(orgSchema);
  
  return (
    <div>
      <h1>{university.name}</h1>
      
      {validation.isValid ? (
        <StructuredData data={orgSchema} id="org-schema" />
      ) : (
        <div>
          {/* Log errors but don't block page rendering */}
          {console.error('Organization schema validation failed:', validation.errors)}
        </div>
      )}
    </div>
  );
}

/**
 * Example 3: FAQ schema with validation
 */
export function FAQPageExample() {
  const faqs = [
    {
      question: 'What is the admission process for Sharda University?',
      answer: 'The admission process involves submitting an online application, providing required documents (HSC certificate, passport copy), and paying the application fee. Bangladeshi students need to get their HSC certificate equivalence from AIU.'
    },
    {
      question: 'What scholarships are available for Bangladeshi students?',
      answer: 'Bangladeshi students with GPA 3.5-5.0 receive 50% scholarship, and those with GPA 3.0-3.4 receive 20% scholarship on tuition fees.'
    },
    {
      question: 'What is the total cost for B.Tech CSE at Sharda University?',
      answer: 'The total 4-year cost for B.Tech CSE is approximately INR 12-16 lakhs including tuition, hostel, and mess fees, after applying applicable scholarships.'
    }
  ];
  
  const faqSchema = generateFAQSchema(faqs);
  
  // Validate schema
  const validation = validateSchema(faqSchema);
  
  if (!validation.isValid) {
    console.error('FAQ schema validation errors:', validation.errors);
  }
  
  return (
    <div>
      <h2>Frequently Asked Questions</h2>
      
      {faqs.map((faq, index) => (
        <div key={index}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
      
      {/* Only render schema if valid */}
      {validation.isValid && (
        <StructuredData data={faqSchema} id="faq-schema" />
      )}
    </div>
  );
}

/**
 * Example 4: Review schema with validation
 */
export function ReviewExample() {
  const course = { name: 'B.Tech Computer Science' };
  const university = { name: 'Sharda University' };
  
  const reviewSchema = generateReviewSchema(
    course,
    university,
    5,
    'Excellent program with great faculty, modern infrastructure, and strong placement support. The AI and ML specialization is particularly well-structured.',
    'Rahul Ahmed'
  );
  
  // Validate review schema
  const validation = validateSchema(reviewSchema);
  
  return (
    <div>
      <div className="review">
        <h4>Student Review</h4>
        <p>Rating: 5/5</p>
        <p>Excellent program with great faculty...</p>
        <p>- Rahul Ahmed</p>
      </div>
      
      {validation.isValid && (
        <StructuredData data={reviewSchema} id="review-schema" />
      )}
    </div>
  );
}

/**
 * Example 5: Multiple schemas on same page
 */
export function CompletePageExample() {
  const university = {
    name: 'Sharda University',
    shortName: 'SU',
    location: 'Greater Noida, Uttar Pradesh',
    established: 2009,
    website: 'https://www.sharda.ac.in',
    profile: {
      rankings: {
        nirf: '101-150',
        naac: 'A'
      }
    },
    programs: []
  };
  
  const course = {
    name: 'B.Tech Computer Science',
    specialization: 'Computer Science',
    id: 'btech-cs',
    degree: 'B.Tech',
    duration: 4,
    annualFees: [200000],
    scholarships: [{ percentage: 50 }],
    eligibility: 'HSC with 50% marks',
    description: 'Comprehensive computer science program'
  };
  
  const faqs = [
    {
      question: 'What is the admission process?',
      answer: 'Submit online application with required documents.'
    }
  ];
  
  // Generate all schemas
  const orgSchema = generateOrganizationSchema(university, '/universities/sharda');
  const courseSchema = generateCourseSchema(course, university, '/courses/btech-cs');
  const faqSchema = generateFAQSchema(faqs);
  
  // Validate all schemas
  const schemas = [
    { data: orgSchema, id: 'org-schema', name: 'Organization' },
    { data: courseSchema, id: 'course-schema', name: 'Course' },
    { data: faqSchema, id: 'faq-schema', name: 'FAQ' }
  ];
  
  // Validate each schema
  schemas.forEach(schema => {
    const validation = validateSchema(schema.data);
    if (!validation.isValid) {
      console.error(`${schema.name} schema validation errors:`, validation.errors);
    }
  });
  
  return (
    <div>
      <h1>Sharda University - B.Tech Computer Science</h1>
      
      {/* Render multiple schemas */}
      {schemas.map(schema => {
        const validation = validateSchema(schema.data);
        return validation.isValid ? (
          <StructuredData key={schema.id} data={schema.data} id={schema.id} />
        ) : null;
      })}
      
      {/* Page content */}
      <div>
        <h2>About the Program</h2>
        <p>{course.description}</p>
        
        <h2>FAQs</h2>
        {faqs.map((faq, index) => (
          <div key={index}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Example 6: Error handling and logging
 */
export function ValidationErrorHandlingExample() {
  // Intentionally create an invalid schema for demonstration
  const invalidSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Test Course'
    // Missing required fields: description, provider
  };
  
  const validation = validateSchema(invalidSchema);
  
  if (!validation.isValid) {
    // Log to monitoring service (e.g., Sentry, LogRocket)
    console.error('Schema validation failed:', {
      errors: validation.errors,
      schema: invalidSchema,
      timestamp: new Date().toISOString()
    });
    
    // Optionally send to analytics
    // analytics.track('schema_validation_error', {
    //   schemaType: invalidSchema['@type'],
    //   errorCount: validation.errors.length,
    //   errors: validation.errors
    // });
  }
  
  return (
    <div>
      <h1>Page Content</h1>
      {/* Don't render invalid schema */}
      {validation.isValid && (
        <StructuredData data={invalidSchema} id="invalid-schema" />
      )}
    </div>
  );
}

/**
 * Example 7: Validation in development vs production
 */
export function ConditionalValidationExample() {
  const course = {
    name: 'B.Tech Computer Science',
    specialization: 'Computer Science',
    id: 'btech-cs',
    degree: 'B.Tech',
    duration: 4,
    annualFees: [200000],
    scholarships: [],
    eligibility: 'HSC with 50% marks',
    description: 'Computer science program'
  };
  
  const university = {
    name: 'Sharda University',
    shortName: 'SU',
    location: 'Greater Noida, Uttar Pradesh',
    established: 2009,
    website: 'https://www.sharda.ac.in',
    profile: { rankings: {} },
    programs: []
  };
  
  const courseSchema = generateCourseSchema(course, university, '/courses/btech-cs');
  
  // Only validate in development mode
  if (import.meta.env.DEV) {
    const validation = validateSchema(courseSchema);
    if (!validation.isValid) {
      console.warn('Schema validation warnings:', validation.errors);
      // In development, you might want to throw an error
      // throw new Error(`Invalid schema: ${validation.errors.join(', ')}`);
    }
  }
  
  return (
    <div>
      <h1>{course.name}</h1>
      <StructuredData data={courseSchema} id="course-schema" />
    </div>
  );
}

export default {
  CoursePageExample,
  UniversityPageExample,
  FAQPageExample,
  ReviewExample,
  CompletePageExample,
  ValidationErrorHandlingExample,
  ConditionalValidationExample
};
