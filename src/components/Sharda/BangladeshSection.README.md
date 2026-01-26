# BangladeshSection Component

## Overview

The `BangladeshSection` component displays comprehensive Bangladesh-specific content for Sharda University, including scholarships, admission process, cultural compatibility information, visa guidance, and financial guidance.

**Feature**: sharda-university-content-enhancement  
**Validates**: Requirements 2.1, 2.2, 2.3, 2.5, 2.6

## Features

- **Scholarship Information**: Displays Bangladesh-specific scholarship tiers (50% for GPA 3.5-5.0, 20% for GPA 3.0-3.4)
- **Admission Process**: Step-by-step guide with 7 detailed steps including documents, timelines, and pro tips
- **Cultural Compatibility**: Information about proximity, climate, halal food, prayer facilities, language, and community
- **Visa Guidance**: Complete visa application process, requirements, and timeline
- **Financial Guidance**: Currency transfer, bank accounts, scholarships, and cost of living information
- **WhatsApp Integration**: Direct connection to Bangladesh admissions team

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `bangladeshContent` | `BangladeshContent` | Yes | - | Bangladesh-specific content data including scholarships, admission process, cultural info, visa guidance, and financial guidance |
| `className` | `string` | No | `''` | Additional CSS classes to apply to the section |

### BangladeshContent Type

```typescript
interface BangladeshContent {
  scholarships: Array<{
    gpaMin: number;
    gpaMax: number;
    percentage: number;
    eligibility: string[];
    applicationProcess: string[];
  }>;
  admissionProcess: Array<{
    stepNumber: number;
    title: string;
    description: string;
    documents?: string[];
    timeline?: string;
    tips?: string[];
  }>;
  culturalInfo: {
    proximity?: string;
    climate?: string;
    food?: string[];
    religiousFacilities?: string[];
    language?: string;
    community?: string;
  };
  visaGuidance: {
    type?: string;
    duration?: string;
    requirements?: string[];
    process?: string[];
    timeline?: string;
  };
  financialGuidance: {
    currencyTransfer?: string[];
    bankAccounts?: string[];
    scholarships?: string[];
    costOfLiving?: string;
  };
}
```

## Usage

### Basic Usage

```jsx
import BangladeshSection from './components/Sharda/BangladeshSection';
import { bangladeshContent } from './data/shardaData';

function ShardaLandingPage() {
  return (
    <div>
      <BangladeshSection bangladeshContent={bangladeshContent} />
    </div>
  );
}
```

### With Custom Styling

```jsx
<BangladeshSection 
  bangladeshContent={bangladeshContent}
  className="my-custom-class"
/>
```

### Conditional Rendering

```jsx
function ShardaLandingPage({ userCountry }) {
  return (
    <div>
      {userCountry === 'Bangladesh' && (
        <BangladeshSection bangladeshContent={bangladeshContent} />
      )}
    </div>
  );
}
```

## Component Structure

The component renders the following sections:

1. **Header**: "Study at Sharda from Bangladesh" with Bangladesh flag emoji
2. **Scholarship Cards**: Two cards showing 50% and 20% scholarship tiers
3. **Admission Process**: 7-step process with expandable details
4. **Cultural Compatibility**: 6 cards showing proximity, climate, food, prayer facilities, language, and community
5. **Visa Guidance**: Comprehensive visa information in a single card
6. **Financial Guidance**: 4 cards covering currency transfer, bank accounts, scholarships, and cost of living
7. **WhatsApp CTA**: Call-to-action section with WhatsApp button for Bangladesh-specific queries

## Styling

The component uses Tailwind CSS for styling with:
- Gradient background: `from-green-50 via-white to-blue-50`
- Responsive grid layouts: `md:grid-cols-2`, `lg:grid-cols-3`
- Card-based design with shadows and hover effects
- Mobile-first responsive design
- Accessible color contrasts and semantic HTML

## Accessibility

- Proper heading hierarchy (H2 → H3 → H4)
- ARIA labels for section (`aria-labelledby`)
- Descriptive emoji labels (`role="img"`, `aria-label`)
- Semantic HTML structure
- Keyboard-accessible WhatsApp CTA

## Integration with WhatsAppCTA

The component integrates the `WhatsAppCTA` component with:
- Context: `"bangladesh"`
- Variant: `"button"`
- Content Type: `"bangladesh-section"`
- Phone Number: `+91 88009 96151` (automatically handled by WhatsAppCTA)

## Data Requirements

The component requires complete Bangladesh content data from `shardaData.ts`. If any section is empty or missing, that section will not be rendered:

- Empty `scholarships` array → Scholarship section hidden
- Empty `admissionProcess` array → Admission process section hidden
- Empty `culturalInfo` object → Cultural compatibility section hidden
- Empty `visaGuidance` object → Visa guidance section hidden
- Empty `financialGuidance` object → Financial guidance section hidden

## Testing

Unit tests cover:
- Rendering with complete data
- Scholarship information display
- Admission process steps
- Cultural compatibility information
- Visa guidance display
- Financial guidance display
- WhatsApp CTA integration
- Edge cases (empty data)
- Accessibility features
- Responsive design classes

## Performance Considerations

- Component uses `memo` for performance optimization
- Conditional rendering prevents unnecessary DOM elements
- Efficient array mapping for dynamic content
- No heavy computations or side effects

## Browser Support

Works in all modern browsers that support:
- CSS Grid
- Flexbox
- ES6+ JavaScript
- React 18+

## Related Components

- `WhatsAppCTA`: Integrated for Bangladesh-specific queries
- `ApplicationCTA`: Can be used alongside for application links
- `TestimonialCarousel`: Can display Bangladesh testimonials

## Future Enhancements

- Add video testimonials from Bangladeshi students
- Interactive scholarship calculator
- Virtual campus tour for Bangladeshi students
- Live chat integration
- Multi-language support (Bengali)

## Maintenance

- Update scholarship percentages annually
- Refresh admission process steps as needed
- Update visa requirements when changed
- Keep financial guidance current
- Add new testimonials regularly

## Support

For questions or issues with this component, contact the development team or refer to the main project documentation.
