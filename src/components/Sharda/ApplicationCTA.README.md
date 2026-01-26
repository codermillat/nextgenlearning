# ApplicationCTA Component

## Overview

The `ApplicationCTA` component is a standardized call-to-action button for Sharda University applications. It automatically generates UTM-tracked links and logs conversion events for analytics tracking.

**Feature**: sharda-university-content-enhancement  
**Validates**: Requirements 1.3, 5.1, 5.5

## Features

- **Three Button Variants**: Primary, Secondary, and Floating styles
- **Automatic UTM Tracking**: Generates UTM parameters for conversion tracking
- **Event Logging**: Logs click events with full context for analytics
- **Responsive Design**: Mobile-first design with touch-friendly targets
- **Accessibility**: Proper ARIA labels and keyboard navigation support
- **Customizable**: Flexible props for different use cases

## Usage

### Basic Usage

```jsx
import ApplicationCTA from './components/Sharda/ApplicationCTA';

function LandingPage() {
  return (
    <ApplicationCTA
      source="landing"
      context="landing"
      country="Bangladesh"
    />
  );
}
```

### With Program Information

```jsx
<ApplicationCTA
  variant="primary"
  source="program-btech-cse"
  context="program"
  program="btech-cse"
  country="Nepal"
  location="hero"
>
  Apply for B.Tech CSE
</ApplicationCTA>
```

### Floating CTA

```jsx
<ApplicationCTA
  variant="floating"
  source="landing"
  context="landing"
  country="Bangladesh"
  location="floating"
>
  Apply Now
</ApplicationCTA>
```

### Fee Calculator CTA

```jsx
<ApplicationCTA
  variant="primary"
  source="fee-calculator"
  context="calculator"
  program="btech-cse"
  action="apply-with-calculation"
  location="calculator-result"
  country="Bangladesh"
>
  Apply with This Program
</ApplicationCTA>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'floating'` | No | `'primary'` | Button style variant |
| `source` | `string` | Yes | - | Page context for UTM tracking (e.g., 'landing', 'program-btech-cse') |
| `context` | `string` | Yes | - | Content type for analytics (e.g., 'landing', 'program', 'comparison') |
| `program` | `string` | No | - | Program code if applicable (e.g., 'btech-cse') |
| `country` | `string` | No | `'International'` | User's country for URL routing |
| `action` | `string` | No | `'apply-now'` | Specific action identifier |
| `location` | `string` | No | `'content'` | Location on page (e.g., 'hero', 'footer', 'floating') |
| `className` | `string` | No | `''` | Additional CSS classes |
| `children` | `ReactNode` | No | `'Apply Now'` | Button content |
| `ariaLabel` | `string` | No | Auto-generated | Accessibility label |

## Variants

### Primary
- Gradient blue background (blue-600 to indigo-600)
- White text
- Large shadow with hover effects
- Scale animation on hover
- Best for: Main CTAs, hero sections

### Secondary
- Semi-transparent white background with backdrop blur
- White text with border
- Subtle shadow
- Best for: Secondary CTAs on dark backgrounds

### Floating
- Fixed position (bottom-right corner)
- Gradient blue background
- Extra large shadow
- Pulse animation
- Rounded full (circular)
- Best for: Sticky CTAs that follow user scroll

## UTM Tracking

The component automatically generates UTM-tracked links using the `utmGenerator` utility:

- **utm_source**: `studyatsharda_youtube`
- **utm_medium**: `NextGenLearning`
- **utm_campaign**: `SU_AdmissionsBD_2026` (Bangladesh) or `SU_AdmissionsIntl_2026` (International)
- **utm_content**: Combination of contentType, program, and action

Example generated URL:
```
https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=landing_apply-now
```

## Event Logging

The component logs click events using the `conversionEventLogger` utility:

```javascript
{
  ctaType: 'apply-now',
  ctaLocation: 'hero',
  targetUrl: 'https://global.sharda.ac.in/...',
  program: 'btech-cse',
  contentType: 'program'
}
```

Events are sent to Google Analytics 4 for tracking and analysis.

## Accessibility

- **Minimum Touch Target**: 44px height for mobile accessibility
- **ARIA Labels**: Descriptive labels for screen readers
- **Keyboard Navigation**: Fully keyboard accessible
- **Focus Indicators**: Clear focus rings for keyboard users
- **Security**: Opens in new tab with `noopener noreferrer`

## Responsive Design

The component uses Tailwind CSS responsive classes:

- **Mobile**: Smaller padding and text size
- **Desktop**: Larger padding and text size
- **Floating Variant**: Fixed positioning on all screen sizes

## Examples

### Landing Page Hero

```jsx
<div className="hero-section">
  <h1>Study at Sharda University</h1>
  <p>Join 95+ countries of students</p>
  <ApplicationCTA
    variant="primary"
    source="landing"
    context="landing"
    location="hero"
    country="Bangladesh"
  >
    Start Your Application
  </ApplicationCTA>
</div>
```

### Program Page

```jsx
<div className="program-details">
  <h2>B.Tech Computer Science Engineering</h2>
  <p>Duration: 4 Years | Fees: ₹2,50,000/year</p>
  <ApplicationCTA
    variant="primary"
    source="program-btech-cse"
    context="program"
    program="btech-cse"
    location="content"
    country="Nepal"
  >
    Apply for B.Tech CSE
  </ApplicationCTA>
</div>
```

### Comparison Page

```jsx
<div className="comparison-table">
  <h3>Sharda vs Other Universities</h3>
  {/* Comparison content */}
  <ApplicationCTA
    variant="primary"
    source="comparison-sharda-vs-amity"
    context="comparison"
    location="comparison-result"
    country="Bangladesh"
  >
    Apply to Sharda University
  </ApplicationCTA>
</div>
```

### Floating CTA (Sticky)

```jsx
<ApplicationCTA
  variant="floating"
  source="landing"
  context="landing"
  location="floating"
  country="Bangladesh"
/>
```

## Testing

The component includes comprehensive unit tests covering:

- Rendering with different variants
- UTM link generation
- Click event logging
- Accessibility attributes
- Responsive design classes
- Edge cases and error handling

Run tests:
```bash
npm test -- src/components/Sharda/__tests__/ApplicationCTA.test.jsx
```

## Dependencies

- `react`: Component framework
- `prop-types`: Runtime type checking
- `../../utils/utmGenerator`: UTM link generation
- `../../utils/conversionEventLogger`: Event logging

## Related Components

- `WhatsAppCTA`: WhatsApp engagement button
- `ApplyButton`: Generic apply button (legacy)

## Notes

- Always provide `source` and `context` props for proper tracking
- Use descriptive `source` values that identify the page/section
- The `country` prop determines the base URL (Bangladesh vs International)
- Floating variant should only be used once per page
- Consider using different `location` values for multiple CTAs on the same page

## Future Enhancements

- A/B testing support
- Custom color schemes
- Icon support
- Loading states
- Success/error feedback
