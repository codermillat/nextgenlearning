# UrgencyBanner Component

## Overview

The `UrgencyBanner` component displays urgency messaging to encourage timely action from prospective students. It supports countdown timers for deadlines, "Applications Open" banners, and dynamic date-based messaging that adapts to the current admission cycle.

## Features

- **Countdown Timers**: Real-time countdown to deadlines with days, hours, and minutes
- **Dynamic Messaging**: Automatically updates based on current date and admission cycle
- **Multiple Variants**: Info, warning, success, and urgent visual styles
- **Smart Display Logic**: Only shows within 30 days of deadline (Property 42)
- **Dismissible Option**: Can be configured to allow user dismissal
- **Mobile Responsive**: Adapts layout for mobile and desktop screens
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Usage

### Basic Admission Open Banner

```jsx
import UrgencyBanner from './components/Sharda/UrgencyBanner';

function ShardaLandingPage() {
  return (
    <div>
      <UrgencyBanner
        type="admission-open"
        variant="success"
      />
      {/* Rest of page content */}
    </div>
  );
}
```

### Deadline with Countdown

```jsx
<UrgencyBanner
  type="deadline"
  deadline={new Date('2026-06-30')}
  variant="warning"
  showCountdown={true}
  message="Application Deadline: June 30, 2026"
/>
```

### Scholarship Deadline

```jsx
<UrgencyBanner
  type="scholarship-deadline"
  deadline={new Date('2026-05-15')}
  variant="urgent"
  showCountdown={true}
  dismissible={true}
/>
```

### Early Bird Messaging

```jsx
<UrgencyBanner
  type="early-bird"
  variant="info"
  message="Apply by March 31st for Priority Hostel Allocation"
  dismissible={true}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'admission-open' \| 'deadline' \| 'scholarship-deadline' \| 'early-bird'` | `'admission-open'` | Type of urgency banner |
| `deadline` | `Date \| string` | `undefined` | Deadline date for countdown (required for deadline types) |
| `message` | `string` | Auto-generated | Custom message to display |
| `variant` | `'info' \| 'warning' \| 'success' \| 'urgent'` | `'info'` | Visual style variant |
| `showCountdown` | `boolean` | `true` | Whether to show countdown timer |
| `className` | `string` | `''` | Additional CSS classes |
| `onClose` | `function` | `undefined` | Callback when banner is dismissed |
| `dismissible` | `boolean` | `false` | Whether banner can be dismissed |

## Banner Types

### admission-open
Displays "Applications Open for [Year]-[Year] Academic Year" message. Best used at the top of landing pages during admission season.

**Default Message**: "Applications Open for 2026-27 Academic Year"
**Recommended Variant**: `success` or `info`

### deadline
Shows application deadline with countdown timer. Use when deadline is approaching (within 30 days).

**Default Message**: "Application Deadline Approaching"
**Recommended Variant**: `warning` or `urgent`

### scholarship-deadline
Highlights scholarship application deadline with countdown. Creates urgency for scholarship seekers.

**Default Message**: "Scholarship Application Deadline"
**Recommended Variant**: `urgent`

### early-bird
Encourages early application with benefits messaging. No countdown required.

**Default Message**: "Apply Early for Priority Consideration"
**Recommended Variant**: `info`

## Variants

### info (Blue)
- **Use for**: General announcements, admission open messages
- **Style**: Blue gradient background
- **Icon**: 📢

### warning (Orange)
- **Use for**: Approaching deadlines, important notices
- **Style**: Orange gradient background
- **Icon**: ⚠️

### success (Green)
- **Use for**: Positive announcements, admission open
- **Style**: Green gradient background
- **Icon**: ✅

### urgent (Red)
- **Use for**: Critical deadlines, last-chance messaging
- **Style**: Red gradient background
- **Icon**: 🔥

## Smart Display Logic

The banner automatically determines whether to display based on the deadline:

- **Shows**: When deadline is within 30 days and hasn't passed (Property 42)
- **Hides**: When deadline is more than 30 days away or has passed
- **No deadline**: Always shows (for admission-open and early-bird types)

This ensures urgency messaging is only displayed when it's actually urgent and truthful (Property 43).

## Countdown Timer

When `showCountdown={true}` and a `deadline` is provided:

- Updates every second in real-time
- Shows days, hours, and minutes remaining
- Automatically hides when deadline passes
- Responsive design: stacks on mobile, inline on desktop

## Accessibility

- Uses `role="alert"` for screen reader announcements
- `aria-live="polite"` for dynamic updates
- Keyboard accessible dismiss button
- Proper focus management
- High contrast text for readability

## Examples

### Landing Page Hero

```jsx
<div className="relative">
  <UrgencyBanner
    type="admission-open"
    variant="success"
    className="sticky top-0 z-40"
  />
  <HeroSection />
</div>
```

### Program Page with Deadline

```jsx
<UrgencyBanner
  type="deadline"
  deadline={new Date('2026-07-15')}
  variant="warning"
  message="B.Tech CSE Applications Close July 15, 2026"
  showCountdown={true}
  dismissible={true}
  onClose={() => console.log('Banner dismissed')}
/>
```

### Scholarship Page

```jsx
<UrgencyBanner
  type="scholarship-deadline"
  deadline={new Date('2026-05-31')}
  variant="urgent"
  showCountdown={true}
/>
```

## Integration with Sharda Pages

### ShardaLandingPage
```jsx
<UrgencyBanner
  type="admission-open"
  variant="success"
/>
```

### Program Detail Pages
```jsx
<UrgencyBanner
  type="deadline"
  deadline={admissionDeadline}
  variant="warning"
  showCountdown={true}
/>
```

### Scholarship Pages
```jsx
<UrgencyBanner
  type="scholarship-deadline"
  deadline={scholarshipDeadline}
  variant="urgent"
  showCountdown={true}
  dismissible={true}
/>
```

## Requirements Validation

- ✅ **Requirement 11.1**: Display countdown timers for deadlines
- ✅ **Requirement 11.3**: Show "Applications Open for 2026-27" banners
- ✅ **Requirement 11.4**: Implement dynamic date-based messaging
- ✅ **Requirement 11.6**: Update urgency messaging dynamically based on current date

## Properties Validation

- ✅ **Property 42**: Urgency messaging displays within 30 days of deadline
- ✅ **Property 44**: Dynamic urgency updates based on current date relative to admission cycle

## Testing

See `src/components/Sharda/__tests__/UrgencyBanner.test.jsx` for unit tests and `src/components/Sharda/__tests__/UrgencyBanner.property.test.jsx` for property-based tests.

## Notes

- Countdown updates every second - consider performance impact on pages with multiple banners
- Banner automatically hides when deadline passes
- Use sparingly to maintain effectiveness - too many urgency messages reduce impact
- Ensure deadline dates are accurate and truthful (Requirement 11.5)
- Consider user timezone when setting deadlines
