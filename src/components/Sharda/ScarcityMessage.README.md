# ScarcityMessage Component

## Overview

The `ScarcityMessage` component displays scarcity messaging to create urgency and encourage timely action. It includes limited seats notifications and early application benefits messaging. **Critically, it ensures all messaging is truthful and not misleading** by validating data before display.

## Features

- **Limited Seats Messaging**: Shows remaining seats count when applicable
- **Early Bird Benefits**: Highlights advantages of early application
- **Scholarship Priority**: Emphasizes early scholarship consideration
- **Hostel Priority**: Promotes early hostel room selection
- **Truthfulness Validation**: Only displays when conditions are actually true (Property 43)
- **Multiple Variants**: Info, warning, and urgent visual styles
- **Mobile Responsive**: Adapts to all screen sizes
- **Accessibility**: Proper ARIA labels and semantic HTML

## Usage

### Limited Seats Message

```jsx
import ScarcityMessage from './components/Sharda/ScarcityMessage';

function ProgramPage() {
  return (
    <div>
      <ScarcityMessage
        type="limited-seats"
        seatsRemaining={15}
        program="B.Tech Computer Science"
        variant="urgent"
      />
      {/* Rest of page content */}
    </div>
  );
}
```

### Early Bird Benefits

```jsx
<ScarcityMessage
  type="early-bird"
  variant="info"
/>
```

### Scholarship Priority

```jsx
<ScarcityMessage
  type="scholarship-priority"
  variant="warning"
/>
```

### Hostel Priority

```jsx
<ScarcityMessage
  type="hostel-priority"
  variant="info"
/>
```

### Custom Message

```jsx
<ScarcityMessage
  type="limited-seats"
  seatsRemaining={5}
  message="Only 5 seats left for international students! Secure your admission today."
  variant="urgent"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'limited-seats' \| 'early-bird' \| 'scholarship-priority' \| 'hostel-priority'` | `'limited-seats'` | Type of scarcity message |
| `seatsRemaining` | `number` | `undefined` | Number of seats remaining (required for 'limited-seats' type) |
| `program` | `string` | `undefined` | Program name for context |
| `message` | `string` | Auto-generated | Custom scarcity message |
| `variant` | `'info' \| 'warning' \| 'urgent'` | `'warning'` | Visual style variant |
| `showIcon` | `boolean` | `true` | Whether to show icon |
| `className` | `string` | `''` | Additional CSS classes |
| `truthful` | `boolean` | `true` | Internal flag ensuring messaging truthfulness |

## Message Types

### limited-seats
Displays remaining seats count. **Requires `seatsRemaining` prop** to ensure truthfulness.

**Default Message**: "Only X seats remaining! Apply now to secure your spot."
**Recommended Variant**: `urgent` (when < 10 seats), `warning` (when < 50 seats)
**Icon**: 🎓

**Important**: This type will NOT render if `seatsRemaining` is not provided or is invalid. This ensures we never show "limited seats" messaging when we don't have actual data.

### early-bird
Encourages early application with benefits list. No data validation required.

**Default Message**: "Apply early to receive priority consideration for scholarships and hostel allocation."
**Recommended Variant**: `info`
**Icon**: ⏰
**Benefits Shown**:
- Priority scholarship consideration
- Preferred hostel room selection
- Early course registration

### scholarship-priority
Highlights scholarship priority for early applicants.

**Default Message**: "Early applicants receive priority consideration for merit-based scholarships."
**Recommended Variant**: `warning`
**Icon**: 🏆

### hostel-priority
Promotes early hostel room selection benefits.

**Default Message**: "Apply early to get your preferred hostel room and accommodation."
**Recommended Variant**: `info`
**Icon**: 🏠

## Variants

### info (Blue)
- **Use for**: General benefits, informational scarcity
- **Style**: Blue background with blue border
- **Best for**: early-bird, hostel-priority

### warning (Orange)
- **Use for**: Moderate urgency, important notices
- **Style**: Amber background with amber border
- **Best for**: limited-seats (moderate), scholarship-priority

### urgent (Red)
- **Use for**: Critical scarcity, very limited availability
- **Style**: Red background with red border
- **Best for**: limited-seats (< 10 seats)

## Truthfulness Validation (Critical Feature)

The component implements strict validation to ensure scarcity messaging is **always truthful**:

### For limited-seats Type:
```jsx
// ✅ VALID - Will render
<ScarcityMessage
  type="limited-seats"
  seatsRemaining={15}
/>

// ❌ INVALID - Will NOT render (no seatsRemaining)
<ScarcityMessage
  type="limited-seats"
/>

// ❌ INVALID - Will NOT render (invalid seatsRemaining)
<ScarcityMessage
  type="limited-seats"
  seatsRemaining={0}
/>

// ❌ INVALID - Will NOT render (negative value)
<ScarcityMessage
  type="limited-seats"
  seatsRemaining={-5}
/>
```

This validation ensures compliance with **Requirement 11.5** and **Property 43**: "Urgency messaging only displays when the stated condition is actually true."

### For Other Types:
Other message types (early-bird, scholarship-priority, hostel-priority) don't require specific data validation as they represent general policies rather than specific limited quantities.

## Dynamic Messaging

The component adapts its message based on the data:

### Seats Remaining Thresholds:
- **≤ 10 seats**: Shows additional "High demand! Seats are filling up quickly." message
- **> 10 seats**: Shows standard message only

### Program Context:
When `program` prop is provided, it's included in the message:
```jsx
<ScarcityMessage
  type="limited-seats"
  seatsRemaining={8}
  program="MBA"
/>
// Displays: "Only 8 seats remaining for MBA! Apply now to secure your spot."
```

## Accessibility

- Uses `role="status"` for screen reader announcements
- `aria-live="polite"` for dynamic updates
- Icons are hidden from screen readers with `aria-hidden="true"`
- High contrast text for readability
- Semantic HTML structure

## Examples

### Program Detail Page

```jsx
<div className="space-y-4">
  {/* Show limited seats if applicable */}
  {seatsData.remaining < 50 && (
    <ScarcityMessage
      type="limited-seats"
      seatsRemaining={seatsData.remaining}
      program="B.Tech CSE"
      variant={seatsData.remaining <= 10 ? 'urgent' : 'warning'}
    />
  )}
  
  {/* Always show early bird benefits */}
  <ScarcityMessage
    type="early-bird"
    variant="info"
  />
</div>
```

### Landing Page

```jsx
<section className="py-8">
  <div className="max-w-4xl mx-auto space-y-4">
    <ScarcityMessage
      type="scholarship-priority"
      variant="warning"
    />
    
    <ScarcityMessage
      type="hostel-priority"
      variant="info"
    />
  </div>
</section>
```

### Conditional Rendering Based on Data

```jsx
function AdmissionSection({ programData }) {
  return (
    <div>
      {/* Only show if we have actual seats data */}
      {programData.seatsRemaining && (
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={programData.seatsRemaining}
          program={programData.name}
          variant={programData.seatsRemaining <= 10 ? 'urgent' : 'warning'}
        />
      )}
      
      {/* Always show early bird benefits during admission season */}
      {isAdmissionSeason && (
        <ScarcityMessage
          type="early-bird"
          variant="info"
        />
      )}
    </div>
  );
}
```

## Integration with Sharda Pages

### ShardaLandingPage
```jsx
<ScarcityMessage
  type="early-bird"
  variant="info"
  className="mb-8"
/>
```

### Program Detail Pages
```jsx
{programData.seatsRemaining && (
  <ScarcityMessage
    type="limited-seats"
    seatsRemaining={programData.seatsRemaining}
    program={programData.name}
    variant="urgent"
  />
)}
```

### Scholarship Pages
```jsx
<ScarcityMessage
  type="scholarship-priority"
  variant="warning"
/>
```

## Requirements Validation

- ✅ **Requirement 11.2**: Display limited seats messaging where applicable
- ✅ **Requirement 11.5**: Ensure messaging is truthful and not misleading

## Properties Validation

- ✅ **Property 43**: Urgency messaging only displays when stated condition is actually true

## Best Practices

### DO:
- ✅ Always provide `seatsRemaining` when using `limited-seats` type
- ✅ Use `urgent` variant only when truly urgent (< 10 seats)
- ✅ Combine with UrgencyBanner for maximum impact
- ✅ Update seats data in real-time if possible
- ✅ Use early-bird messaging during admission season

### DON'T:
- ❌ Show limited-seats without actual data
- ❌ Use fake or inflated scarcity numbers
- ❌ Overuse scarcity messaging (reduces effectiveness)
- ❌ Show conflicting messages (e.g., "unlimited seats" and "limited seats")
- ❌ Use urgent variant for non-urgent situations

## Testing

See `src/components/Sharda/__tests__/ScarcityMessage.test.jsx` for unit tests and `src/components/Sharda/__tests__/ScarcityMessage.property.test.jsx` for property-based tests.

## Notes

- Scarcity messaging is most effective when used sparingly and truthfully
- Consider A/B testing different message types to optimize conversion
- Monitor user feedback to ensure messaging is not perceived as manipulative
- Update seats data regularly to maintain accuracy
- Combine with countdown timers (UrgencyBanner) for maximum urgency
