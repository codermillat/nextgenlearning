# FeeCalculator Component

**Feature:** sharda-university-content-enhancement  
**Task:** 8.1 Create FeeCalculator component

## Overview

The `FeeCalculator` component is an interactive tool that allows prospective students to calculate their total fees at Sharda University, including scholarship adjustments based on their academic performance and country of origin. The component provides real-time calculations with a comprehensive breakdown of all costs.

## Features

### Core Functionality
- **Program Selection**: Dropdown to select from available programs
- **Country Selection**: Choose country for country-specific scholarship rules
- **GPA/Percentage Input**: Enter academic score for scholarship calculation
- **Real-time Calculation**: Instant fee calculation with scholarship adjustments
- **Comprehensive Breakdown**: Detailed display of all fee components

### Fee Breakdown Display
- Base tuition fee per year
- Scholarship discount (percentage and amount)
- Tuition after scholarship
- Additional costs (hostel, mess, registration, other)
- First year total
- 4-year total for undergraduate programs

### Scholarship Rules
- **Bangladesh**: 50% for GPA 3.5-5.0, 20% for GPA 3.0-3.4
- **India**: 50% for 90-100%, 25% for 80-89%
- **International**: 30% for 85-100%, 15% for 75-84%

### Integration Features
- **ApplicationCTA Integration**: Pre-filled application button with selected program
- **Analytics Tracking**: Logs calculator usage for conversion tracking
- **Responsive Design**: Mobile-first design with touch-friendly inputs
- **Accessibility**: Proper labels, ARIA attributes, keyboard navigation

## Requirements Validation

This component validates the following requirements:

- **7.1**: Displays base tuition fee for selected program
- **7.2**: Automatically calculates scholarship percentage based on GPA
- **7.3**: Shows breakdown with base fee, scholarship, and final amount
- **7.4**: Applies Bangladesh-specific scholarship rules (50% for GPA 3.5-5.0, 20% for GPA 3.0-3.4)
- **7.5**: Includes additional costs (hostel, mess, registration) in total
- **7.6**: Shows 4-year total for undergraduate programs
- **7.7**: Includes application CTA with pre-filled program information

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `programs` | `Array<Program>` | Yes | - | Array of program objects with fee information |
| `scholarshipRules` | `Array<ScholarshipRule>` | Yes | - | Array of scholarship rules by country and GPA |
| `userCountry` | `string` | No | `'International'` | User's country for default scholarship rules |
| `className` | `string` | No | `''` | Additional CSS classes for styling |

### Program Object Structure

```typescript
{
  id: string;              // Unique program identifier
  name: string;            // Program name
  duration: string;        // Duration (e.g., "4 years")
  level: string;           // "undergraduate" | "postgraduate" | "doctoral"
  fees: {
    tuitionPerYear: number;  // Annual tuition fee
    hostel: number;          // Annual hostel fee
    mess: number;            // Annual mess fee
    registration: number;    // One-time registration fee
    other: number;           // Other annual fees
  };
}
```

### ScholarshipRule Object Structure

```typescript
{
  country: string;    // Country name (e.g., "Bangladesh", "India")
  gpaMin: number;     // Minimum GPA/percentage for this tier
  gpaMax: number;     // Maximum GPA/percentage for this tier
  percentage: number; // Scholarship percentage (0-100)
}
```

## Usage Examples

### Basic Usage

```jsx
import FeeCalculator from './components/Sharda/FeeCalculator';
import { shardaPrograms, scholarshipRules } from './data/shardaData';

function App() {
  return (
    <FeeCalculator
      programs={shardaPrograms}
      scholarshipRules={scholarshipRules}
    />
  );
}
```

### For Bangladeshi Students

```jsx
<FeeCalculator
  programs={shardaPrograms}
  scholarshipRules={scholarshipRules}
  userCountry="Bangladesh"
/>
```

### In a Landing Page Section

```jsx
<section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12">
      Calculate Your Investment
    </h2>
    <div className="max-w-4xl mx-auto">
      <FeeCalculator
        programs={shardaPrograms}
        scholarshipRules={scholarshipRules}
        userCountry="Bangladesh"
      />
    </div>
  </div>
</section>
```

### With Custom Styling

```jsx
<FeeCalculator
  programs={shardaPrograms}
  scholarshipRules={scholarshipRules}
  userCountry="India"
  className="shadow-3xl border-4 border-blue-200"
/>
```

## User Flow

1. **Select Program**: User chooses a program from the dropdown
2. **Select Country**: User selects their country (defaults to provided `userCountry`)
3. **Enter GPA**: User enters their academic score
4. **Calculate**: User clicks "Calculate Fees" button
5. **View Results**: Component displays:
   - Scholarship badge (if applicable)
   - Detailed fee breakdown
   - First year total
   - 4-year total (for undergraduate programs)
   - Important notes
   - Application CTA with pre-filled program

## Calculation Logic

### Scholarship Calculation

1. Find scholarship rules matching the selected country
2. If no country-specific rules exist, use "International" rules
3. Find the rule where GPA falls within the min-max range
4. Apply the scholarship percentage to tuition fee only

### Fee Calculation

```
Discounted Tuition = Base Tuition - (Base Tuition × Scholarship %)
First Year Total = Discounted Tuition + Hostel + Mess + Registration + Other
Program Total = (Discounted Tuition × Years) + Registration + (Hostel + Mess + Other) × Years
```

Note: Registration fee is one-time, other costs are annual.

## Styling

The component uses Tailwind CSS with:
- **Responsive Design**: Mobile-first with `sm:` breakpoints
- **Color Scheme**: Blue/Indigo gradient for primary actions
- **Visual Feedback**: Hover effects, transitions, animations
- **Status Colors**: Green for scholarships, yellow for notes
- **Shadows**: Layered shadows for depth

## Accessibility

- **Semantic HTML**: Proper form elements with labels
- **ARIA Labels**: Descriptive labels for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Indicators**: Clear focus states for all interactive elements
- **Input Types**: Appropriate input types for mobile keyboards
- **Color Contrast**: WCAG AA compliant contrast ratios

## Analytics Tracking

The component logs calculator usage events including:
- Program selected
- Country selected
- GPA entered
- Scholarship percentage calculated
- Total fee calculated

This data is sent via `logCalculatorUse()` from the conversion event logger.

## Mobile Optimization

- **Touch-Friendly**: Large touch targets (min 44px)
- **Responsive Layout**: Adapts to all screen sizes
- **Input Optimization**: Numeric keyboard for GPA input
- **Readable Text**: Appropriate font sizes for mobile
- **Scrollable Results**: Results section scrolls smoothly

## Error Handling

- **Input Validation**: Only allows valid numeric input for GPA
- **Empty State**: Shows helpful message when no calculation performed
- **Disabled State**: Calculate button disabled until all inputs valid
- **Graceful Degradation**: Works even if some fee components are missing

## Testing

See `FeeCalculator.test.jsx` for unit tests and `FeeCalculator.property.test.jsx` for property-based tests.

### Key Test Scenarios

- Program selection updates display
- GPA input validation
- Scholarship calculation accuracy
- Bangladesh-specific scholarship rules
- 4-year total for undergraduate programs
- Application CTA presence with correct program
- Mobile responsiveness
- Accessibility compliance

## Performance Considerations

- **useMemo**: Memoizes expensive calculations
- **useCallback**: Prevents unnecessary re-renders
- **Lazy Rendering**: Results only render after calculation
- **Optimized Re-renders**: State updates trigger minimal re-renders

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## Future Enhancements

Potential improvements for future iterations:

1. **Currency Conversion**: Show fees in user's local currency
2. **Payment Plans**: Display installment options
3. **Comparison Mode**: Compare fees across multiple programs
4. **PDF Export**: Download fee breakdown as PDF
5. **Email Results**: Send calculation to user's email
6. **Saved Calculations**: Store calculations in local storage
7. **Loan Calculator**: Integrate education loan calculator
8. **Exchange Rate**: Real-time INR conversion rates

## Related Components

- **ApplicationCTA**: Used for the apply button
- **WhatsAppCTA**: Could be added for fee-related queries
- **ProgramFinder**: Can link to calculator with pre-selected program
- **BangladeshSection**: Can embed calculator for Bangladeshi students

## Data Dependencies

- `shardaPrograms`: Array of program data from `shardaData.ts`
- `scholarshipRules`: Array of scholarship rules from `shardaData.ts`
- `generateUTMLink`: From `utmGenerator.js` (via ApplicationCTA)
- `logCalculatorUse`: From `conversionEventLogger.js`

## Notes

- Scholarship applies to tuition fees only, not additional costs
- Registration fee is one-time, included in first year but not multiplied for program total
- Hostel and mess charges are optional but included in calculations
- Fees are subject to annual revision (noted in the UI)
- The component assumes program duration is in years (e.g., "4 years")

## Support

For questions or issues with this component, refer to:
- Design document: `.kiro/specs/sharda-university-content-enhancement/design.md`
- Requirements: `.kiro/specs/sharda-university-content-enhancement/requirements.md`
- Task list: `.kiro/specs/sharda-university-content-enhancement/tasks.md`
