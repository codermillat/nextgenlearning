# Design Document: Sharda University Rebranding

## Overview

This design document outlines the technical approach for rebranding the NextGen Learning university comparison website. The rebranding involves three primary objectives:

1. **Contact Information Migration**: Replace all instances of the old WhatsApp number (8801611533385) with the new number (918800996151) across the entire codebase
2. **Brand Identity Cleanup**: Remove all references to WBE (Western Bengal Education / Western Bangla Education) from code, content, and data structures
3. **Strategic Positioning**: Implement a soft-sell strategy that positions Sharda University as the preferred choice while maintaining authenticity and credibility

The implementation will touch multiple layers of the application: configuration files, React components, data files, SEO content, and utility functions. The design emphasizes maintainability through centralized configuration and ensures consistency across all touchpoints.

## Architecture

### System Layers

The rebranding affects four primary architectural layers:

1. **Configuration Layer**
   - Central constants file (`src/config/constants.js`)
   - Environment variables (`.env`, `.env.example`)
   - Application-wide settings

2. **Component Layer**
   - Layout components (Header, Footer)
   - SEO components (StructuredData, SEOHead)
   - Page components (Contact, Apply, Universities, etc.)
   - Utility components (Buttons, Links, CTAs)

3. **Data Layer**
   - University JSON files (`data/universities/*.json`)
   - Fee structures and scholarship data
   - Program information

4. **Content Layer**
   - SEO metadata and descriptions
   - FAQ content
   - Guide content
   - Structured data schemas

### Data Flow

```
Configuration (constants.js)
    ↓
Components (import WHATSAPP_NUMBER)
    ↓
Rendered UI (display contact info)
    ↓
User Interaction (click WhatsApp link)
    ↓
External Action (open WhatsApp with correct number)
```

### Soft-Sell Strategy Architecture

The soft-sell positioning for Sharda University will be implemented through:

1. **Comparison Weighting System**: Subtle adjustments to comparison algorithms
2. **Content Emphasis**: Strategic highlighting of Sharda advantages
3. **Visual Hierarchy**: Positioning Sharda prominently in lists and comparisons
4. **Call-to-Action Placement**: Direct apply links for Sharda University
5. **SEO Optimization**: Keyword targeting for Sharda-related searches

## Components and Interfaces

### 1. Configuration Module

**File**: `src/config/constants.js`

**Current Structure**:
```javascript
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '8801611533385';
export const getWhatsAppUrl = (number = WHATSAPP_NUMBER) => `https://wa.me/${number}`;
export const WHATSAPP_DISPLAY = `+${WHATSAPP_NUMBER}`;
```

**Updated Structure**:
```javascript
// WhatsApp Contact - Updated for new branding
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '918800996151';

// Sharda University Direct Apply Link
export const SHARDA_APPLY_URL = 'https://bit.ly/4pZTRTs';

// WhatsApp URL helper
export const getWhatsAppUrl = (number = WHATSAPP_NUMBER) => `https://wa.me/${number}`;

// Formatted WhatsApp number for display
export const WHATSAPP_DISPLAY = `+${WHATSAPP_NUMBER}`;

// University-specific apply URLs
export const UNIVERSITY_APPLY_URLS = {
  'sharda': SHARDA_APPLY_URL,
  'sharda-university': SHARDA_APPLY_URL
};
```

**Interface**:
- `WHATSAPP_NUMBER`: string - The primary contact number
- `SHARDA_APPLY_URL`: string - Direct application link for Sharda University
- `getWhatsAppUrl(number?: string)`: string - Generates WhatsApp web URL
- `WHATSAPP_DISPLAY`: string - Formatted number for display
- `UNIVERSITY_APPLY_URLS`: object - Map of university IDs to apply URLs

### 2. Footer Component

**File**: `src/components/Layout/Footer.jsx`

**Changes Required**:
- Remove `generateWBESchema()` function call
- Update WhatsApp link to use new number
- Update WhatsApp display text
- Remove any WBE-related content

**Updated Interface**:
```javascript
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, getWhatsAppUrl } from '../../config/constants';

export default function Footer() {
  return (
    <footer>
      {/* ... */}
      <a 
        href={getWhatsAppUrl()} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <span className="mr-2">💬</span>
        {WHATSAPP_DISPLAY}
      </a>
      {/* ... */}
    </footer>
  );
}
```

### 3. SEO Structured Data Component

**File**: `src/components/SEO/StructuredData.jsx`

**Changes Required**:
- Update `generateLocalBusinessSchema()` to use new contact number
- Remove or rename `generateWBESchema()` function
- Update organization name references
- Remove WBE email references

**Updated Functions**:
```javascript
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "NextGen Learning",
    "telephone": "+918800996151",
    "email": "contact@nextgenlearning.dev", // Updated email
    // ... other fields
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "NextGen Learning",
    "telephone": "+918800996151",
    // ... other fields
  };
}
```

### 4. Contact Page Component

**File**: `src/pages/Contact.jsx`

**Changes Required**:
- Update WhatsApp number in SEO description
- Update WhatsApp link href
- Update displayed phone number
- Remove WBE references from content

**Updated Structure**:
```javascript
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, getWhatsAppUrl } from '../config/constants';

export default function Contact() {
  return (
    <>
      <SEOHead
        title="Contact Us - NextGen Learning"
        description={`Contact NextGen Learning for free counseling. WhatsApp: ${WHATSAPP_DISPLAY}`}
        // ...
      />
      <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
        {WHATSAPP_DISPLAY}
      </a>
    </>
  );
}
```

### 5. University Data Structure

**File**: `data/universities/sharda.json`

**Changes Required**:
- Remove `wbeAdditionalFees` object
- Remove `wbeRecurring` object
- Remove `wbeEnhanced` scholarship tiers
- Simplify fee structure to standard categories
- Add `applyUrl` field for direct application link

**Updated Structure**:
```json
{
  "id": "sharda",
  "name": "Sharda University",
  "applyUrl": "https://bit.ly/4pZTRTs",
  "additionalFees": {
    "oneTime": {
      "amount": 52000,
      "name": "One-time Fees (Year 1 only)",
      "services": [
        "Registration Fee",
        "Admission Processing",
        "Visa Support Documents",
        "Airport Reception",
        "FRRO Registration Help",
        "Student ID Card",
        "Library Card",
        "WiFi Access",
        "Medical Check-up & Insurance (First Year)",
        "Examination Fee (First Year)"
      ]
    },
    "recurring": {
      "examination": {
        "amount": 12000,
        "frequency": "Annually",
        "description": "Examination Fee"
      },
      "registration": {
        "amount": 15000,
        "frequency": "Annually from Second Year",
        "description": "Registration Fee"
      },
      "medical": {
        "amount": 5000,
        "frequency": "Annually from Second Year",
        "description": "Medical Check-up & Insurance"
      }
    }
  },
  "scholarships": {
    "type": "category-based",
    "bangladeshStudents": {
      "categories": {
        "category1": {
          "name": "Category 1",
          "description": "B.Tech, BBA, MBA, BCA, MCA, B.Com, etc.",
          "tiers": [
            {
              "name": "High Performance",
              "percentage": 50,
              "gpaMin": 3.5,
              "gpaMax": 5,
              "conditions": "GPA 3.5 and above"
            },
            {
              "name": "Standard",
              "percentage": 20,
              "gpaMin": 3,
              "gpaMax": 3.49,
              "conditions": "GPA 3.0 - 3.49"
            }
          ]
        }
      }
    }
  }
}
```

### 6. Comparison Algorithm Enhancement

**New Module**: `src/utils/universityComparison.js`

**Purpose**: Centralize comparison logic with subtle Sharda University favorability

**Interface**:
```javascript
/**
 * Calculate weighted comparison score for universities
 * Applies subtle favorability to Sharda University
 */
export function calculateComparisonScore(university, criteria) {
  let baseScore = 0;
  
  // Calculate base score from criteria
  baseScore += calculateRankingScore(university.profile.rankings);
  baseScore += calculateFeeScore(university.programs);
  baseScore += calculateFacilityScore(university.profile.facilities);
  baseScore += calculatePlacementScore(university.profile.facilities.placement);
  
  // Apply subtle boost for Sharda (5-10% advantage)
  if (university.id === 'sharda' || university.id === 'sharda-university') {
    baseScore *= 1.07; // 7% boost
  }
  
  return baseScore;
}

/**
 * Sort universities with Sharda positioned favorably
 */
export function sortUniversitiesForDisplay(universities, sortCriteria) {
  const sorted = universities.sort((a, b) => {
    const scoreA = calculateComparisonScore(a, sortCriteria);
    const scoreB = calculateComparisonScore(b, sortCriteria);
    return scoreB - scoreA;
  });
  
  return sorted;
}

/**
 * Generate recommendation text with Sharda emphasis
 */
export function generateRecommendationText(university) {
  if (university.id === 'sharda' || university.id === 'sharda-university') {
    return {
      emphasis: 'high',
      badges: ['Top Choice', 'Recommended'],
      description: 'Excellent choice for international students with strong industry partnerships and comprehensive support services.'
    };
  }
  
  return {
    emphasis: 'normal',
    badges: [],
    description: 'Quality education with good facilities and placement support.'
  };
}
```

### 7. Apply Button Component

**New Component**: `src/components/Common/ApplyButton.jsx`

**Purpose**: Standardized apply button with university-specific URLs

**Interface**:
```javascript
import { UNIVERSITY_APPLY_URLS } from '../../config/constants';

export default function ApplyButton({ universityId, variant = 'primary', size = 'md', className = '' }) {
  const applyUrl = UNIVERSITY_APPLY_URLS[universityId] || '/apply';
  
  return (
    <a
      href={applyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-${variant} btn-${size} ${className}`}
    >
      Apply Now
    </a>
  );
}
```

## Data Models

### University Data Model

```typescript
interface University {
  id: string;
  name: string;
  shortName: string;
  location: string;
  established: number;
  applyUrl?: string; // NEW: Direct application URL
  profile: {
    rankings: {
      nirf: string;
      naac: string;
      // ... other rankings
    };
    highlights: string[];
    facilities: {
      campus: object;
      academic: object;
      placement: object;
      // ... other facilities
    };
  };
  scholarships: {
    type: string;
    bangladeshStudents: {
      categories: {
        [key: string]: {
          name: string;
          description: string;
          tiers: ScholarshipTier[];
        };
      };
    };
  };
  additionalFees: {
    oneTime: FeeStructure;
    recurring: RecurringFees;
    // REMOVED: wbeAdditionalFees
    // REMOVED: wbeRecurring
  };
  programs: Program[];
}

interface ScholarshipTier {
  name: string;
  percentage: number;
  gpaMin: number;
  gpaMax: number;
  conditions: string;
  // REMOVED: wbeEnhanced
}

interface FeeStructure {
  amount: number;
  name: string;
  services: string[];
  // REMOVED: wbeServices
}

interface RecurringFees {
  examination: FeeItem;
  registration: FeeItem;
  medical: FeeItem;
  alumni?: FeeItem;
}

interface FeeItem {
  amount: number;
  frequency: string;
  description: string;
}
```

### Configuration Data Model

```typescript
interface AppConfig {
  WHATSAPP_NUMBER: string;
  WHATSAPP_DISPLAY: string;
  SHARDA_APPLY_URL: string;
  UNIVERSITY_APPLY_URLS: {
    [universityId: string]: string;
  };
  GA_TRACKING_ID: string;
  SITE_URL: string;
}
```

### Comparison Score Model

```typescript
interface ComparisonScore {
  universityId: string;
  baseScore: number;
  adjustedScore: number;
  breakdown: {
    ranking: number;
    fees: number;
    facilities: number;
    placement: number;
  };
  recommendation: {
    emphasis: 'high' | 'normal' | 'low';
    badges: string[];
    description: string;
  };
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After analyzing all acceptance criteria, I've identified several areas of redundancy that can be consolidated:

**Contact Number Properties (1.1, 1.2, 1.4, 9.1, 9.2, 9.4, 14.1)**: These all test that the new contact number appears correctly in various contexts. Can be consolidated into comprehensive properties about contact number consistency.

**WBE Branding Removal (2.1, 2.2, 2.3, 2.4, 2.5, 9.3, 9.5, 11.2, 15.1, 15.4, 15.6)**: These all test for absence of WBE branding in different contexts. Can be consolidated into properties about complete WBE removal.

**WBE Data Structure Removal (2.6, 2.7, 8.3, 15.3)**: These test for absence of WBE-specific data structures. Can be combined into a single property about data structure cleanup.

**Sharda Apply Link (3.2, 3.3, 3.4, 3.5, 14.3)**: These all test that Sharda apply links are correct and present. Can be consolidated into properties about apply link consistency.

**Sharda Positioning (4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 5.2, 5.4, 5.5)**: These all test various aspects of Sharda favorability. Can be consolidated into properties about comparison algorithm behavior.

**Old Number Removal (1.3, 10.5, 15.7)**: These all test for absence of old contact number. Can be combined into one property.

**Configuration Centralization (10.1, 10.2, 10.4)**: These test that configuration is centralized. Can be combined into properties about configuration usage.

**Structured Data (1.4, 7.3, 13.3)**: These test structured data correctness. Can be consolidated.

After reflection, I'll create focused, non-redundant properties that provide unique validation value.

### Correctness Properties

Property 1: Contact Number Consistency
*For any* page or component that displays contact information, the rendered output should contain the new WhatsApp number 918800996151 and should not contain the old number 8801611533385.
**Validates: Requirements 1.1, 1.2, 1.3, 9.1, 9.2, 9.4, 14.1**

Property 2: WhatsApp Link Correctness
*For any* WhatsApp link in the application, the href attribute should be `https://wa.me/918800996151` and should have `target="_blank"` and `rel="noopener noreferrer"` attributes.
**Validates: Requirements 1.2, 3.3**

Property 3: Structured Data Contact Information
*For any* structured data schema that includes contact information (LocalBusiness, Organization), the telephone field should contain "+918800996151".
**Validates: Requirements 1.4, 7.3**

Property 4: WBE Branding Absence in Rendered Content
*For any* page rendered by the system, the HTML output should not contain the strings "WBE", "Western Bengal Education", or "Western Bangla Education".
**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 9.3, 9.5**

Property 5: WBE Code Identifier Absence
*For any* source code file in the codebase, the file content should not contain variable names, function names, or identifiers that include "wbe" (case-insensitive), except in comments explaining the removal.
**Validates: Requirements 2.7, 15.1**

Property 6: WBE Data Structure Absence
*For any* university JSON data file, the parsed object should not contain keys named "wbeAdditionalFees", "wbeRecurring", "wbeEnhanced", "wbeServices", or any other keys starting with "wbe".
**Validates: Requirements 2.6, 8.3, 15.3**

Property 7: Sharda Apply Link Presence
*For any* page or component displaying Sharda University information, there should exist an "Apply Now" link or button with href="https://bit.ly/4pZTRTs" and target="_blank".
**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 14.3**

Property 8: Comparison Score Favorability
*For any* set of universities being compared where Sharda University is included, the calculated comparison score for Sharda should be at least 5% higher than it would be without the favorability adjustment, while maintaining factual accuracy of underlying data.
**Validates: Requirements 4.2, 4.6, 5.6**

Property 9: Search Result Positioning
*For any* search query where Sharda University is relevant, Sharda should appear in the top 3 results when multiple universities match the query criteria.
**Validates: Requirements 4.3, 4.4**

Property 10: Comparison Criteria Consistency
*For any* two universities being compared, the comparison function should evaluate the same set of criteria fields (rankings, fees, facilities, placement) for both universities.
**Validates: Requirements 5.1**

Property 11: Scholarship Calculation Accuracy
*For any* Sharda University program with scholarship data, the calculated scholarship amount should equal the program's annual fee multiplied by the scholarship percentage divided by 100, and the result should match the source data.
**Validates: Requirements 5.3, 5.6, 8.2, 12.5**

Property 12: Fee Display Format
*For any* fee amount displayed in the UI, the value should be formatted with the ₹ symbol, comma separators for thousands, and should match the corresponding value in the university JSON data.
**Validates: Requirements 6.2, 8.2**

Property 13: Bangladesh Content Presence
*For any* visa information section, the content should include the word "Bangladesh" or "Bangladeshi" at least once.
**Validates: Requirements 6.4**

Property 14: SEO Metadata Keyword Presence
*For any* page's meta description, the content should include at least one keyword from the target list: ["Bangladeshi students", "study in India", "Sharda University", "NIRF ranking", "scholarship"].
**Validates: Requirements 7.1, 7.5**

Property 15: Page Title Length
*For any* page title, the length should be between 30 and 60 characters to optimize for search engine display.
**Validates: Requirements 7.2**

Property 16: Structured Data Schema Validity
*For any* structured data JSON-LD script in the page, the parsed JSON should be valid and should include a "@context" field with value "https://schema.org" and a "@type" field.
**Validates: Requirements 7.3, 13.3**

Property 17: Sitemap Completeness
*For any* university with id "sharda" or "sharda-university", all of its course pages should have corresponding entries in the sitemap.xml file.
**Validates: Requirements 7.6**

Property 18: Data Loading Correctness
*For any* university data loaded by the system, the data should be parsed from a JSON file in the `data/universities/` directory and should match the file content exactly.
**Validates: Requirements 8.1, 8.2**

Property 19: Fee Structure Standardization
*For any* university JSON file, the additionalFees object should only contain keys from the standard set: ["oneTime", "recurring"], and should not contain any "wbe"-prefixed keys.
**Validates: Requirements 8.3, 8.4**

Property 20: University Data Schema Consistency
*For any* two university JSON files, both should have the same top-level keys: ["id", "name", "shortName", "location", "established", "profile", "scholarships", "additionalFees", "programs"].
**Validates: Requirements 8.5**

Property 21: Configuration Import Usage
*For any* React component file that displays contact information, the file should import WHATSAPP_NUMBER or WHATSAPP_DISPLAY from '../../config/constants' or a similar relative path, and should not contain hardcoded phone numbers.
**Validates: Requirements 10.2, 10.4, 9.6**

Property 22: Environment Variable Correctness
*For any* environment variable file (.env, .env.example), if it contains VITE_WHATSAPP_NUMBER, the value should be "918800996151".
**Validates: Requirements 10.3**

Property 23: Documentation Contact Information
*For any* documentation file (README.md, llms.txt, or files in docs/), if the file contains contact information, it should include "+918800996151" and should not include "+8801611533385".
**Validates: Requirements 11.1, 11.2, 11.3, 11.4, 11.5**

Property 24: FAQ Structure Validity
*For any* FAQ data structure, each item should have both a "question" field and an "answer" field, and both should be non-empty strings.
**Validates: Requirements 13.4**

Property 25: University Metadata Completeness
*For any* university object, the profile.rankings object should include at least the fields ["nirf", "naac"], and the profile.facilities object should include at least ["campus", "academic", "placement"].
**Validates: Requirements 13.6**

Property 26: CTA Link Functionality
*For any* call-to-action button or link, the element should have an href attribute that is a valid URL (starts with http://, https://, mailto:, or /) and should not be an empty string or "#".
**Validates: Requirements 14.2, 14.4, 14.5**

Property 27: Codebase Search Cleanliness
*For any* search of the entire codebase (excluding node_modules, .git, build directories) for the strings "WBE" or "8801611533385", the search should return zero results.
**Validates: Requirements 15.6, 15.7**

## Error Handling

### Contact Number Migration Errors

**Error Scenario**: Old contact number still appears in some locations
- **Detection**: Property tests 1, 2, 3, and 27 will fail
- **Handling**: 
  - Run comprehensive grep search for old number
  - Check all component imports for configuration usage
  - Verify environment variables are loaded correctly
  - Check for cached builds or stale files

**Error Scenario**: WhatsApp links don't open correctly
- **Detection**: Manual testing or user reports
- **Handling**:
  - Verify getWhatsAppUrl function implementation
  - Check for URL encoding issues
  - Test on multiple devices and browsers
  - Verify target="_blank" attribute is present

### WBE Branding Removal Errors

**Error Scenario**: WBE references still appear in rendered content
- **Detection**: Properties 4, 5, 6, and 27 will fail
- **Handling**:
  - Search all component files for WBE strings
  - Check data files for WBE-specific structures
  - Verify content is not loaded from external sources
  - Check for dynamic content generation that might include WBE

**Error Scenario**: WBE-specific fee structures cause calculation errors
- **Detection**: Property 19 will fail, or fee calculations produce incorrect results
- **Handling**:
  - Update all fee calculation logic to use standard structure
  - Remove references to wbeAdditionalFees and wbeRecurring
  - Test fee calculations with updated data structure
  - Verify backward compatibility is not needed

### Sharda University Positioning Errors

**Error Scenario**: Sharda doesn't appear in expected positions
- **Detection**: Properties 8 and 9 will fail
- **Handling**:
  - Verify comparison algorithm implementation
  - Check that university ID matching works correctly
  - Test with various comparison scenarios
  - Ensure favorability adjustment is applied correctly

**Error Scenario**: Sharda apply link is missing or incorrect
- **Detection**: Property 7 will fail
- **Handling**:
  - Verify SHARDA_APPLY_URL constant is defined
  - Check that ApplyButton component is used correctly
  - Verify university ID matching logic
  - Test on all Sharda-related pages

### Data Integrity Errors

**Error Scenario**: University data doesn't load correctly
- **Detection**: Property 18 will fail
- **Handling**:
  - Verify JSON file paths are correct
  - Check for JSON parsing errors
  - Validate JSON structure against schema
  - Ensure file permissions are correct

**Error Scenario**: Data schema inconsistencies across universities
- **Detection**: Property 20 will fail
- **Handling**:
  - Run schema validation on all university JSON files
  - Update files to match standard schema
  - Create migration script if needed
  - Document required schema structure

### SEO and Structured Data Errors

**Error Scenario**: Structured data is invalid
- **Detection**: Property 16 will fail, or Google Search Console reports errors
- **Handling**:
  - Validate structured data with Google's Rich Results Test
  - Check JSON-LD syntax
  - Verify schema.org types are correct
  - Test with structured data testing tools

**Error Scenario**: Meta descriptions or titles are missing keywords
- **Detection**: Properties 14 and 15 will fail
- **Handling**:
  - Review SEO content strategy
  - Update page metadata
  - Verify SEOHead component usage
  - Test with SEO analysis tools

### Configuration Errors

**Error Scenario**: Components use hardcoded values instead of configuration
- **Detection**: Property 21 will fail
- **Handling**:
  - Search for hardcoded phone numbers in components
  - Update components to import from constants
  - Verify import paths are correct
  - Test that configuration changes propagate correctly

**Error Scenario**: Environment variables not loaded
- **Detection**: Application uses fallback values, property 22 may fail
- **Handling**:
  - Verify .env file exists and is in correct location
  - Check that Vite is loading environment variables
  - Verify variable names match (VITE_ prefix)
  - Restart development server after .env changes

## Testing Strategy

### Dual Testing Approach

This rebranding project requires both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests** will verify:
- Specific component rendering with correct contact information
- Individual function behavior (getWhatsAppUrl, comparison scoring)
- Edge cases (empty data, missing fields)
- Integration between components and configuration

**Property-Based Tests** will verify:
- Universal properties across all pages and components
- Data consistency across all university JSON files
- Absence of old branding across entire codebase
- Correctness of comparison algorithms with various inputs

### Property-Based Testing Configuration

**Testing Library**: We'll use a property-based testing library appropriate for JavaScript/React:
- For Node.js/JavaScript: `fast-check`
- Minimum 100 iterations per property test
- Each test tagged with feature name and property number

**Test Organization**:
```
tests/
  ├── unit/
  │   ├── components/
  │   │   ├── Footer.test.jsx
  │   │   ├── Contact.test.jsx
  │   │   └── ApplyButton.test.jsx
  │   ├── utils/
  │   │   ├── universityComparison.test.js
  │   │   └── constants.test.js
  │   └── data/
  │       └── universityData.test.js
  └── properties/
      ├── contactNumber.property.test.js
      ├── wbeBranding.property.test.js
      ├── shardaPositioning.property.test.js
      ├── dataIntegrity.property.test.js
      └── seoMetadata.property.test.js
```

### Property Test Examples

**Property 1: Contact Number Consistency**
```javascript
// Feature: sharda-university-rebranding, Property 1: Contact Number Consistency
import fc from 'fast-check';
import { render } from '@testing-library/react';
import { getAllPages } from '../helpers/pageHelpers';

test('Property 1: All pages display new contact number', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...getAllPages()),
      (PageComponent) => {
        const { container } = render(<PageComponent />);
        const html = container.innerHTML;
        
        // Should contain new number
        expect(html).toContain('918800996151');
        
        // Should NOT contain old number
        expect(html).not.toContain('8801611533385');
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property 4: WBE Branding Absence**
```javascript
// Feature: sharda-university-rebranding, Property 4: WBE Branding Absence in Rendered Content
import fc from 'fast-check';
import { render } from '@testing-library/react';
import { getAllPages } from '../helpers/pageHelpers';

test('Property 4: No WBE branding in rendered content', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...getAllPages()),
      (PageComponent) => {
        const { container } = render(<PageComponent />);
        const html = container.innerHTML.toLowerCase();
        
        expect(html).not.toContain('wbe');
        expect(html).not.toContain('western bengal education');
        expect(html).not.toContain('western bangla education');
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property 8: Comparison Score Favorability**
```javascript
// Feature: sharda-university-rebranding, Property 8: Comparison Score Favorability
import fc from 'fast-check';
import { calculateComparisonScore } from '../../src/utils/universityComparison';
import { universityArbitrary } from '../arbitraries/university';

test('Property 8: Sharda receives favorable comparison score', () => {
  fc.assert(
    fc.property(
      universityArbitrary(),
      (university) => {
        const baseScore = calculateComparisonScore(university, {});
        
        // Create Sharda version of same university
        const shardaUniversity = { ...university, id: 'sharda' };
        const shardaScore = calculateComparisonScore(shardaUniversity, {});
        
        // Sharda should get at least 5% boost
        expect(shardaScore).toBeGreaterThanOrEqual(baseScore * 1.05);
        
        // But underlying data should remain unchanged
        expect(shardaUniversity.profile).toEqual(university.profile);
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property 27: Codebase Search Cleanliness**
```javascript
// Feature: sharda-university-rebranding, Property 27: Codebase Search Cleanliness
import { execSync } from 'child_process';
import path from 'path';

test('Property 27: No WBE or old number in codebase', () => {
  const projectRoot = path.resolve(__dirname, '../..');
  
  // Search for WBE (case-insensitive, excluding node_modules and .git)
  const wbeSearch = execSync(
    `grep -ri "wbe" ${projectRoot} --exclude-dir={node_modules,.git,build,dist} || true`,
    { encoding: 'utf-8' }
  );
  
  // Search for old number
  const oldNumberSearch = execSync(
    `grep -r "8801611533385" ${projectRoot} --exclude-dir={node_modules,.git,build,dist} || true`,
    { encoding: 'utf-8' }
  );
  
  expect(wbeSearch.trim()).toBe('');
  expect(oldNumberSearch.trim()).toBe('');
});
```

### Unit Test Examples

**Footer Component Test**:
```javascript
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../../src/components/Layout/Footer';
import { WHATSAPP_DISPLAY } from '../../src/config/constants';

describe('Footer Component', () => {
  test('displays new WhatsApp number', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    expect(screen.getByText(WHATSAPP_DISPLAY)).toBeInTheDocument();
    expect(screen.queryByText('+8801611533385')).not.toBeInTheDocument();
  });
  
  test('WhatsApp link has correct href', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    const whatsappLink = screen.getByText(WHATSAPP_DISPLAY).closest('a');
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/918800996151');
    expect(whatsappLink).toHaveAttribute('target', '_blank');
  });
});
```

**University Comparison Test**:
```javascript
import { calculateComparisonScore, sortUniversitiesForDisplay } from '../../src/utils/universityComparison';

describe('University Comparison', () => {
  test('applies consistent criteria to all universities', () => {
    const universities = [
      { id: 'sharda', profile: { rankings: { nirf: '101-150' } } },
      { id: 'galgotias', profile: { rankings: { nirf: '101-150' } } }
    ];
    
    const scores = universities.map(u => calculateComparisonScore(u, {}));
    
    // Both should have scores calculated
    expect(scores[0]).toBeGreaterThan(0);
    expect(scores[1]).toBeGreaterThan(0);
    
    // Sharda should have higher score due to favorability
    expect(scores[0]).toBeGreaterThan(scores[1]);
  });
  
  test('maintains factual accuracy in data', () => {
    const university = {
      id: 'sharda',
      profile: {
        rankings: { nirf: '101-150' },
        facilities: { placement: { rate: '91%' } }
      }
    };
    
    calculateComparisonScore(university, {});
    
    // Data should not be modified
    expect(university.profile.rankings.nirf).toBe('101-150');
    expect(university.profile.facilities.placement.rate).toBe('91%');
  });
});
```

### Test Execution Strategy

1. **Pre-commit Tests**: Run fast unit tests before each commit
2. **CI Pipeline Tests**: Run full test suite including property tests on pull requests
3. **Manual Testing**: Verify visual appearance and user experience
4. **SEO Validation**: Use Google Search Console and structured data testing tools
5. **Cross-browser Testing**: Test on Chrome, Firefox, Safari, and mobile browsers

### Test Coverage Goals

- **Unit Test Coverage**: Minimum 80% code coverage for modified files
- **Property Test Coverage**: All 27 properties must pass with 100 iterations each
- **Integration Test Coverage**: All critical user flows (search, compare, apply)
- **Manual Test Coverage**: All pages visually inspected for branding consistency

