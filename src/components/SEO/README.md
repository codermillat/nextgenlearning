# StructuredData Component and Utilities

This directory contains the StructuredData component and utilities for generating and validating schema.org structured data (JSON-LD) for SEO optimization.

## Overview

The StructuredData component provides:
- **Schema Generation**: Functions to generate valid schema.org markup for various types (Course, Organization, FAQPage, Review, etc.)
- **Schema Validation**: Comprehensive validation to ensure schemas meet schema.org specifications
- **React Component**: Easy-to-use component for injecting structured data into pages

## Files

- `StructuredData.jsx` - Main component and schema generator functions
- `StructuredData.example.jsx` - Usage examples and patterns
- `StructuredData.test.js` - Unit tests for validation and edge cases
- `StructuredData.property.test.js` - Property-based tests for schema validity
- `README.md` - This documentation file

## Quick Start

### Basic Usage

```jsx
import StructuredData, { generateCourseSchema } from './StructuredData.jsx';

function CoursePage() {
  const course = {
    name: 'B.Tech Computer Science',
    description: 'Comprehensive CS program',
    duration: 4,
    annualFees: [200000]
  };
  
  const university = {
    name: 'Sharda University',
    location: 'Greater Noida, UP'
  };
  
  const schema = generateCourseSchema(course, university, '/courses/btech-cs');
  
  return (
    <div>
      <h1>{course.name}</h1>
      <StructuredData data={schema} id="course-schema" />
    </div>
  );
}
```

## Available Schema Generators

### 1. Organization Schema

Generates schema for educational organizations/universities.

```javascript
import { generateOrganizationSchema } from './StructuredData.jsx';

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

const schema = generateOrganizationSchema(university, '/universities/sharda');
```

**Required Fields:**
- `name` - University name
- `location` - City and state
- `url` - University website

**Optional Fields:**
- `shortName` - Abbreviated name
- `established` - Year founded
- `profile.rankings` - NIRF, NAAC rankings
- `programs` - Array of programs offered

### 2. Course Schema

Generates schema for academic courses/programs.

```javascript
import { generateCourseSchema } from './StructuredData.jsx';

const course = {
  name: 'B.Tech Computer Science',
  specialization: 'Computer Science',
  id: 'btech-cs',
  degree: 'B.Tech',
  duration: 4,
  annualFees: [200000, 200000, 200000, 200000],
  scholarships: [{ percentage: 50 }],
  eligibility: 'HSC with 50% marks',
  description: 'Comprehensive computer science program'
};

const schema = generateCourseSchema(course, university, '/courses/btech-cs');
```

**Required Fields:**
- `name` - Course name
- `description` - Course description
- `provider` - University/organization offering the course
- `duration` - Duration in years

**Optional Fields:**
- `specialization` - Area of specialization
- `degree` - Degree awarded
- `annualFees` - Array of annual fees
- `scholarships` - Available scholarships
- `eligibility` - Eligibility criteria
- `curriculum` - Curriculum details

### 3. FAQPage Schema

Generates schema for FAQ sections.

```javascript
import { generateFAQSchema } from './StructuredData.jsx';

const faqs = [
  {
    question: 'What is the admission process?',
    answer: 'Submit online application with required documents.'
  },
  {
    question: 'What scholarships are available?',
    answer: 'Scholarships range from 20% to 50% based on academic merit.'
  }
];

const schema = generateFAQSchema(faqs);
```

**Required Fields:**
- `question` - The question text
- `answer` - The answer text

**Returns:** `null` if faqs array is empty or null

### 4. Review Schema

Generates schema for course/program reviews.

```javascript
import { generateReviewSchema } from './StructuredData.jsx';

const course = { name: 'B.Tech Computer Science' };
const university = { name: 'Sharda University' };

const schema = generateReviewSchema(
  course,
  university,
  5, // rating (1-5)
  'Excellent program with great faculty and placement support.',
  'Rahul Ahmed' // author name (optional)
);
```

**Required Fields:**
- `course` - Course object with name
- `university` - University object with name
- `rating` - Rating value (1-5)
- `reviewText` - Review content

**Optional Fields:**
- `author` - Reviewer name (defaults to "Student")

### 5. BreadcrumbList Schema

Generates schema for breadcrumb navigation.

```javascript
import { generateBreadcrumbSchema } from './StructuredData.jsx';

const items = [
  { name: 'Home', url: '/' },
  { name: 'Universities', url: '/universities' },
  { name: 'Sharda University', url: '/universities/sharda' }
];

const schema = generateBreadcrumbSchema(items);
```

### 6. Article Schema

Generates schema for blog posts and articles.

```javascript
import { generateArticleSchema } from './StructuredData.jsx';

const schema = generateArticleSchema({
  title: 'Complete Guide to Studying at Sharda University',
  description: 'Comprehensive guide covering admissions, fees, and campus life.',
  url: '/guides/sharda-university',
  author: 'NextGen Learning',
  datePublished: '2025-01-01T00:00:00Z',
  keywords: ['sharda university', 'admissions', 'fees']
});
```

### 7. HowTo Schema

Generates schema for step-by-step guides.

```javascript
import { generateHowToSchema } from './StructuredData.jsx';

const schema = generateHowToSchema({
  name: 'How to Apply to Sharda University',
  description: 'Step-by-step application guide',
  steps: [
    { name: 'Visit Website', text: 'Go to admissions portal' },
    { name: 'Fill Application', text: 'Complete the form' },
    { name: 'Submit Documents', text: 'Upload required documents' }
  ],
  totalTime: 'PT30M',
  url: '/guides/how-to-apply'
});
```

### 8. WebSite Schema

Generates schema for the main website.

```javascript
import { generateWebsiteSchema } from './StructuredData.jsx';

const schema = generateWebsiteSchema();
```

### 9. ItemList Schema

Generates schema for lists of items (courses, programs, etc.).

```javascript
import { generateItemListSchema } from './StructuredData.jsx';

const items = [
  { name: 'B.Tech Computer Science', url: '/courses/btech-cs' },
  { name: 'B.Tech AI & ML', url: '/courses/btech-ai-ml' }
];

const schema = generateItemListSchema(
  items,
  'Computer Science Programs',
  'List of CS programs at Sharda University',
  '/programs/computer-science'
);
```

### 10. LocalBusiness Schema

Generates schema for local business information.

```javascript
import { generateLocalBusinessSchema } from './StructuredData.jsx';

const schema = generateLocalBusinessSchema();
```

### 11. SiteOrganization Schema

Generates schema for the site's organization.

```javascript
import { generateSiteOrganizationSchema } from './StructuredData.jsx';

const schema = generateSiteOrganizationSchema();
```

## Schema Validation

The `validateSchema` function validates structured data against schema.org specifications.

### Basic Validation

```javascript
import { validateSchema } from './StructuredData.jsx';

const schema = generateCourseSchema(course, university, '/courses/btech-cs');
const validation = validateSchema(schema);

if (!validation.isValid) {
  console.error('Schema validation errors:', validation.errors);
}
```

### Validation Response

```javascript
{
  isValid: boolean,
  errors: string[] // Array of error messages
}
```

### What Gets Validated

1. **Required Fields:**
   - `@context` must be "https://schema.org"
   - `@type` must be present and non-empty

2. **Type-Specific Validation:**
   - **Course**: Requires name, description, provider (Organization)
   - **Organization**: Requires name, url (valid URL format)
   - **FAQPage**: Requires mainEntity array with Question objects
   - **Review**: Requires itemReviewed, reviewRating, author
   - **BreadcrumbList**: Requires itemListElement array with ListItem objects
   - **Article**: Requires headline, author, datePublished
   - **HowTo**: Requires name, step array with HowToStep objects
   - **WebSite**: Requires name, url
   - **ItemList**: Requires itemListElement array
   - **LocalBusiness**: Requires name, address

3. **Structural Validation:**
   - Nested objects have correct @type
   - URLs are valid
   - No circular references
   - Valid JSON serialization

### Validation Examples

```javascript
// Valid schema
const validSchema = generateCourseSchema(course, university, '/courses/test');
const result = validateSchema(validSchema);
// result.isValid === true
// result.errors === []

// Invalid schema - missing required fields
const invalidSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Test Course'
  // Missing description and provider
};
const result = validateSchema(invalidSchema);
// result.isValid === false
// result.errors === [
//   'Course schema missing required field: description',
//   'Course schema missing required field: provider'
// ]
```

## Best Practices

### 1. Always Validate in Development

```javascript
if (import.meta.env.DEV) {
  const validation = validateSchema(schema);
  if (!validation.isValid) {
    console.warn('Schema validation warnings:', validation.errors);
  }
}
```

### 2. Handle Validation Errors Gracefully

```javascript
const validation = validateSchema(schema);

if (validation.isValid) {
  return <StructuredData data={schema} id="schema-id" />;
} else {
  // Log errors but don't block page rendering
  console.error('Schema validation failed:', validation.errors);
  return null;
}
```

### 3. Use Unique IDs for Multiple Schemas

```javascript
<StructuredData data={orgSchema} id="org-schema" />
<StructuredData data={courseSchema} id="course-schema" />
<StructuredData data={faqSchema} id="faq-schema" />
```

### 4. Validate Before Rendering

```javascript
const schemas = [
  { data: orgSchema, id: 'org-schema' },
  { data: courseSchema, id: 'course-schema' }
];

return (
  <>
    {schemas.map(({ data, id }) => {
      const validation = validateSchema(data);
      return validation.isValid ? (
        <StructuredData key={id} data={data} id={id} />
      ) : null;
    })}
  </>
);
```

### 5. Log Validation Errors to Monitoring

```javascript
const validation = validateSchema(schema);

if (!validation.isValid) {
  // Send to monitoring service (Sentry, LogRocket, etc.)
  logger.error('Schema validation failed', {
    schemaType: schema['@type'],
    errors: validation.errors,
    page: window.location.pathname
  });
}
```

## Testing

### Unit Tests

Run unit tests for validation and edge cases:

```bash
npm test -- src/components/SEO/__tests__/StructuredData.test.js
```

### Property-Based Tests

Run property tests for schema validity across random inputs:

```bash
npm test -- src/components/SEO/__tests__/StructuredData.property.test.js
```

## Common Issues and Solutions

### Issue: Schema not appearing in Google Search Console

**Solution:** 
1. Validate schema using `validateSchema()`
2. Check Google Rich Results Test: https://search.google.com/test/rich-results
3. Ensure schema is rendered in `<head>` or `<body>`
4. Wait 24-48 hours for Google to re-crawl

### Issue: Multiple FAQPage schemas on same page

**Solution:** The component automatically removes duplicate FAQPage schemas. Only one FAQPage schema should exist per page.

### Issue: Schema validation errors in production

**Solution:** 
1. Always validate schemas in development
2. Add error logging to catch issues early
3. Use TypeScript for type safety
4. Test with various data inputs

### Issue: Circular reference errors

**Solution:** The validation function detects circular references. Ensure your data objects don't reference themselves.

## Requirements Validation

This implementation validates the following requirements from the Sharda University Content Enhancement spec:

- **Requirement 1.5**: Organization schema for landing page ✅
- **Requirement 12.1**: Organization schema with university details ✅
- **Requirement 12.2**: Course schema for program pages ✅
- **Requirement 12.3**: Ranking schema for awards ✅
- **Requirement 12.4**: FAQPage schema for FAQ sections ✅
- **Requirement 12.5**: Review schema for testimonials ✅
- **Requirement 12.6**: Validation against Google Rich Results Test ✅
- **Requirement 12.7**: All required properties included ✅

## Additional Resources

- [Schema.org Documentation](https://schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Google Search Central - Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [JSON-LD Specification](https://json-ld.org/)

## Contributing

When adding new schema types:

1. Add generator function to `StructuredData.jsx`
2. Add validation function for the schema type
3. Add unit tests in `StructuredData.test.js`
4. Add property tests in `StructuredData.property.test.js`
5. Add usage example in `StructuredData.example.jsx`
6. Update this README with documentation

## License

Part of the NextGen Learning platform.
