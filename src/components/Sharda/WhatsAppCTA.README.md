# WhatsAppCTA Component

## Overview

The `WhatsAppCTA` component is a WhatsApp call-to-action button for connecting prospective students with Sharda University admissions counselors. It uses a single phone number for all students, generates contextual pre-filled messages, and handles mobile vs desktop link formats automatically.

**Feature**: sharda-university-content-enhancement  
**Validates**: Requirements 2.6, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6

## Features

- **Single Phone Number**: Uses +91 88009 96151 for all students (Bangladeshi and international)
- **Contextual Messages**: Generates pre-filled messages based on page context and program
- **Mobile/Desktop Detection**: Opens WhatsApp app on mobile, WhatsApp Web on desktop
- **Three Button Variants**: Button, Floating, and Inline styles
- **Event Logging**: Tracks WhatsApp engagement for analytics
- **Responsive Design**: Mobile-first design with touch-friendly targets
- **Accessibility**: Proper ARIA labels and keyboard navigation support

## Usage

### Basic Usage

```jsx
import WhatsAppCTA from './components/Sharda/WhatsAppCTA';

function LandingPage() {
  return (
    <WhatsAppCTA
      context="landing"
      contentType="landing"
    />
  );
}
```

### With Program Context

```jsx
<WhatsAppCTA
  variant="button"
  context="program-btech-cse"
  program="B.Tech Computer Science Engineering"
  contentType="program"
  position="hero"
/>
```

### Floating WhatsApp Button

```jsx
<WhatsAppCTA
  variant="floating"
  context="landing"
  contentType="landing"
  position="sticky"
/>
```

### Inline Style (Light Background)

```jsx
<WhatsAppCTA
  variant="inline"
  context="fee-calculator"
  contentType="calculator"
  position="content"
>
  Chat with Admissions
</WhatsAppCTA>
```

### Bangladesh-Specific Section

```jsx
<WhatsAppCTA
  variant="button"
  context="bangladesh"
  contentType="bangladesh-section"
  position="content"
>
  Connect with Bangladesh Admissions Team
</WhatsAppCTA>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `context` | `string` | No | `'general'` | Page context for message generation (e.g., 'landing', 'program-btech-cse', 'fee-calculator') |
| `variant` | `'button' \| 'floating' \| 'inline'` | No | `'button'` | Button style variant |
| `position` | `'hero' \| 'content' \| 'footer' \| 'sticky'` | No | `'content'` | Position on page for analytics |
| `program` | `string` | No | - | Program name for contextual message (e.g., 'B.Tech CSE') |
| `contentType` | `string` | No | - | Content type for analytics (e.g., 'landing', 'program', 'comparison') |
| `className` | `string` | No | `''` | Additional CSS classes |
| `children` | `ReactNode` | No | Auto-generated | Button content |
| `ariaLabel` | `string` | No | Auto-generated | Accessibility label |

## Variants

### Button (Default)
- WhatsApp green background (#25D366)
- White text with WhatsApp icon
- Medium shadow with hover effects
- Scale animation on hover
- Best for: Primary WhatsApp CTAs in content sections

### Floating
- Fixed position (bottom-left corner)
- WhatsApp green background
- Extra large shadow
- Bounce animation
- Rounded full (circular) with icon only
- Best for: Sticky WhatsApp button that follows user scroll

### Inline
- Light green background with border
- Green text that turns white on hover
- Subtle shadow
- Best for: Secondary WhatsApp CTAs on light backgrounds

## Phone Number

**All students use the same phone number**: +91 88009 96151

This applies to:
- Bangladeshi students
- International students from other countries
- All program inquiries
- All page contexts

The component automatically formats the number for WhatsApp links (`+918800996151`) while displaying it as `+91 88009 96151` for readability.

## Contextual Messages

The component generates pre-filled messages based on the `context` and `program` props:

### Program-Specific
When `program` prop is provided:
```
"Hi, I'm interested in [Program Name] at Sharda University. Could you please provide more information?"
```

### Context-Based Messages

| Context | Generated Message |
|---------|-------------------|
| `landing` | "Hi, I'm interested in studying at Sharda University. Could you please provide more information about admissions?" |
| `fee-calculator` | "Hi, I've used the fee calculator and I'm interested in learning more about the programs and scholarships at Sharda University." |
| `program-finder` | "Hi, I'm exploring programs at Sharda University. Could you help me find the right program for me?" |
| `comparison` | "Hi, I'm comparing universities and I'm interested in learning more about Sharda University." |
| `ranking` | "Hi, I saw Sharda University's rankings and I'm interested in learning more about admissions." |
| `scholarship` | "Hi, I'm interested in learning about scholarship opportunities at Sharda University." |
| `bangladesh` | "Hi, I'm from Bangladesh and I'm interested in studying at Sharda University. Could you provide information about the admission process?" |
| `testimonial` | "Hi, I read student testimonials and I'm interested in applying to Sharda University." |
| `campus` | "Hi, I'm interested in learning more about campus life at Sharda University." |
| `placement` | "Hi, I'm interested in learning about placement opportunities at Sharda University." |
| `general` | "Hi, I'm interested in studying at Sharda University. Could you please provide more information?" |

The component uses intelligent matching - if your context includes any of these keywords (e.g., `program-btech-cse-ranking`), it will match the appropriate message.

## Mobile vs Desktop Behavior

### Mobile Devices
- Detects mobile user agents (Android, iOS, etc.)
- Uses `wa.me` link format
- Opens WhatsApp mobile app directly
- Example: `https://wa.me/918800996151?text=...`

### Desktop Devices
- Uses `web.whatsapp.com` link format
- Opens WhatsApp Web in new tab
- Example: `https://web.whatsapp.com/send?phone=918800996151&text=...`

## Event Logging

The component logs WhatsApp click events using the `conversionEventLogger` utility:

```javascript
{
  phoneNumber: '+91 88009 96151',
  message: 'Hi, I'm interested in...',
  context: 'landing',
  program: 'B.Tech CSE',
  contentType: 'program'
}
```

Events are sent to Google Analytics 4 for tracking and analysis.

## Accessibility

- **Minimum Touch Target**: 44px height for mobile accessibility
- **ARIA Labels**: Descriptive labels for screen readers
  - Default: "Connect with Sharda University admissions team on WhatsApp"
  - With program: "Connect with Sharda University admissions team on WhatsApp about [Program]"
- **Keyboard Navigation**: Fully keyboard accessible
- **Focus Indicators**: Clear focus rings for keyboard users
- **Security**: Opens in new tab with `noopener noreferrer`
- **Icon Accessibility**: WhatsApp icon marked as `aria-hidden` with text alternative

## Responsive Design

The component uses Tailwind CSS responsive classes:

- **Mobile**: Smaller padding and text size
- **Desktop**: Larger padding and text size
- **Floating Variant**: Fixed positioning on all screen sizes (bottom-left)

## Examples

### Landing Page Hero

```jsx
<div className="hero-section bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
  <h1>Study at Sharda University</h1>
  <p>Join 95+ countries of students</p>
  <div className="flex gap-4">
    <ApplicationCTA
      variant="primary"
      source="landing"
      context="landing"
      location="hero"
    />
    <WhatsAppCTA
      variant="button"
      context="landing"
      contentType="landing"
      position="hero"
    />
  </div>
</div>
```

### Program Page

```jsx
<div className="program-details">
  <h2>B.Tech Computer Science Engineering</h2>
  <p>Duration: 4 Years | Fees: ₹2,50,000/year</p>
  <div className="flex gap-4">
    <ApplicationCTA
      variant="primary"
      source="program-btech-cse"
      context="program"
      program="btech-cse"
    />
    <WhatsAppCTA
      variant="inline"
      context="program-btech-cse"
      program="B.Tech Computer Science Engineering"
      contentType="program"
      position="content"
    >
      Ask Questions on WhatsApp
    </WhatsAppCTA>
  </div>
</div>
```

### Bangladesh Section

```jsx
<div className="bangladesh-section">
  <h2>Study at Sharda from Bangladesh</h2>
  <p>Special scholarships for Bangladeshi students</p>
  <WhatsAppCTA
    variant="button"
    context="bangladesh"
    contentType="bangladesh-section"
    position="content"
  >
    Connect with Bangladesh Admissions Team
  </WhatsAppCTA>
  <p className="text-sm mt-2">
    WhatsApp: +91 88009 96151
  </p>
</div>
```

### Fee Calculator Result

```jsx
<div className="calculator-result">
  <h3>Your Estimated Fees</h3>
  <p>Total: ₹8,00,000 (4 years)</p>
  <div className="flex gap-4">
    <ApplicationCTA
      variant="primary"
      source="fee-calculator"
      context="calculator"
      program="btech-cse"
    />
    <WhatsAppCTA
      variant="inline"
      context="fee-calculator"
      program="B.Tech CSE"
      contentType="calculator"
      position="content"
    >
      Discuss Fees on WhatsApp
    </WhatsAppCTA>
  </div>
</div>
```

### Floating WhatsApp Button (Sticky)

```jsx
// Add to layout or page component
<WhatsAppCTA
  variant="floating"
  context="landing"
  contentType="landing"
  position="sticky"
/>
```

### Multiple CTAs on Same Page

```jsx
<div className="landing-page">
  {/* Hero Section */}
  <section className="hero">
    <WhatsAppCTA
      variant="button"
      context="landing"
      contentType="landing"
      position="hero"
    />
  </section>

  {/* After Programs Section */}
  <section className="programs">
    <WhatsAppCTA
      variant="inline"
      context="program-finder"
      contentType="landing"
      position="content"
    >
      Need Help Choosing? Chat with Us
    </WhatsAppCTA>
  </section>

  {/* Floating Button */}
  <WhatsAppCTA
    variant="floating"
    context="landing"
    contentType="landing"
    position="sticky"
  />
</div>
```

## Testing

The component includes comprehensive unit tests covering:

- Rendering with different variants
- Phone number consistency (+91 88009 96151 for all students)
- Contextual message generation
- Mobile vs desktop link format
- Click event logging
- Accessibility attributes
- Responsive design classes
- Edge cases and error handling

Run tests:
```bash
npm test -- src/components/Sharda/__tests__/WhatsAppCTA.test.jsx
```

## Dependencies

- `react`: Component framework
- `prop-types`: Runtime type checking
- `../../utils/conversionEventLogger`: Event logging

## Related Components

- `ApplicationCTA`: Application button with UTM tracking
- `ApplyButton`: Generic apply button (legacy)

## Notes

- Always use the same phone number (+91 88009 96151) for all students
- Provide descriptive `context` values for better message generation
- The `program` prop overrides context-based messages
- Floating variant should only be used once per page
- Consider using different `position` values for multiple WhatsApp CTAs on the same page
- The component automatically detects mobile devices and adjusts link format
- Messages are URL-encoded automatically

## Future Enhancements

- Multi-language message support (Bengali, Hindi, etc.)
- Custom message templates
- A/B testing support
- Online/offline status indicator
- Business hours display
- Queue position or expected response time

## Troubleshooting

### WhatsApp doesn't open on mobile
- Ensure WhatsApp is installed on the device
- Check that the phone number format is correct (+918800996151)
- Verify the link format is `wa.me` for mobile

### Message not pre-filled
- Check that the message is properly URL-encoded
- Verify the context or program prop is provided
- Test the generated link in a browser

### Button not visible
- Check z-index for floating variant
- Verify Tailwind CSS classes are compiled
- Check for conflicting CSS styles

### Analytics not tracking
- Verify Google Analytics 4 is configured
- Check that `window.gtag` is available
- Review browser console for errors
- Ensure `conversionEventLogger` is imported correctly
