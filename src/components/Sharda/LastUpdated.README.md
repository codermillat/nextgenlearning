# LastUpdated Component

## Overview

The `LastUpdated` component displays "Last Updated" timestamps and current admission cycle year on key information pages. This helps maintain content freshness and builds trust with prospective students by showing that information is current.

## Feature

**Feature**: sharda-university-content-enhancement  
**Validates**: Requirements 16.1, 16.2  
**Property**: Property 62 - Last Updated Timestamp

## Usage

### Basic Usage

```jsx
import LastUpdated from './components/Sharda/LastUpdated';

function FeesPage() {
  return (
    <div>
      <h1>Sharda University Fees</h1>
      <LastUpdated date="2026-01-15" />
      {/* Page content */}
    </div>
  );
}
```

### With Custom Admission Cycle

```jsx
<LastUpdated 
  date={new Date('2026-01-15')}
  admissionCycle="2026-27"
/>
```

### Compact Variant

```jsx
<LastUpdated 
  date="2026-01-15"
  variant="compact"
/>
```

### Inline Variant

```jsx
<p>
  Program information 
  <LastUpdated 
    date="2026-01-15"
    variant="inline"
    showAdmissionCycle={false}
  />
</p>
```

### Without Admission Cycle

```jsx
<LastUpdated 
  date="2026-01-15"
  showAdmissionCycle={false}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `date` | `Date \| string` | - | Date when content was last updated (Date object or ISO string) |
| `admissionCycle` | `string` | Auto-calculated | Admission cycle year (e.g., "2026-27") |
| `showAdmissionCycle` | `boolean` | `true` | Whether to show admission cycle information |
| `className` | `string` | `''` | Additional CSS classes |
| `variant` | `'default' \| 'compact' \| 'inline'` | `'default'` | Visual variant |

## Variants

### Default
Full-width component with background, border, and padding. Best for standalone placement.

```jsx
<LastUpdated date="2026-01-15" variant="default" />
```

### Compact
Smaller component with left border accent. Good for sidebars or tight spaces.

```jsx
<LastUpdated date="2026-01-15" variant="compact" />
```

### Inline
Minimal inline component. Perfect for embedding within text content.

```jsx
<LastUpdated date="2026-01-15" variant="inline" />
```

## Admission Cycle Calculation

If `admissionCycle` prop is not provided, the component automatically calculates the current admission cycle:

- **January - June**: Shows current year to next year (e.g., "2026-27")
- **July - December**: Shows next year to year after (e.g., "2027-28")

This ensures the admission cycle is always relevant to the current time period.

## Date Formatting

The component accepts dates in multiple formats:
- JavaScript `Date` object: `new Date('2026-01-15')`
- ISO string: `"2026-01-15T00:00:00Z"`
- Date string: `"2026-01-15"`

Dates are formatted as: "January 15, 2026"

## Accessibility

- Uses semantic HTML with `role="contentinfo"`
- Includes `aria-label` for screen readers
- Uses `<time>` element with `datetime` attribute for machine-readable dates
- Icons are marked with `aria-hidden="true"`
- Sufficient color contrast for WCAG AA compliance

## Best Practices

### Placement Recommendations

1. **Top of Page**: Place near the page title for immediate visibility
   ```jsx
   <div>
     <h1>Sharda University B.Tech CSE Fees</h1>
     <LastUpdated date="2026-01-15" />
   </div>
   ```

2. **After Key Sections**: Place after important information blocks
   ```jsx
   <section>
     <h2>Fee Structure</h2>
     {/* Fee details */}
     <LastUpdated date="2026-01-15" variant="compact" />
   </section>
   ```

3. **Footer**: Place in page footer for reference
   ```jsx
   <footer>
     <LastUpdated date="2026-01-15" variant="inline" />
   </footer>
   ```

### When to Use

Use `LastUpdated` on pages with:
- **Fee information** (tuition, scholarships, costs)
- **Ranking data** (NIRF, QS, other rankings)
- **Admission requirements** (eligibility, deadlines, process)
- **Placement statistics** (packages, companies, percentages)
- **Program details** (curriculum, specializations, duration)

### Update Frequency

- **Fees**: Update annually or when changes occur
- **Rankings**: Update when new rankings are released
- **Admissions**: Update at start of each admission cycle
- **Placements**: Update annually after placement season
- **Programs**: Update when curriculum changes

## Examples

### Fees Page

```jsx
function ShardaBTechCSEFees() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Sharda University B.Tech CSE Fees 2026-27
      </h1>
      
      <LastUpdated 
        date="2026-01-15"
        admissionCycle="2026-27"
      />
      
      {/* Fee content */}
    </div>
  );
}
```

### Rankings Page

```jsx
function ShardaNIRFRanking() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Sharda University NIRF Ranking
      </h1>
      
      <LastUpdated 
        date="2025-12-20"
        showAdmissionCycle={false}
      />
      
      {/* Ranking content */}
    </div>
  );
}
```

### Program Page

```jsx
function ShardaBTechCSE() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        B.Tech Computer Science Engineering
      </h1>
      
      <LastUpdated 
        date="2026-01-10"
        variant="compact"
        className="mb-6"
      />
      
      {/* Program content */}
    </div>
  );
}
```

## Testing

The component includes comprehensive tests:
- Unit tests for rendering and formatting
- Property tests for date handling
- Accessibility tests
- Variant rendering tests

See `__tests__/LastUpdated.test.jsx` for test examples.

## Related Components

- **UrgencyBanner**: Displays deadline countdowns
- **ScarcityMessage**: Shows limited availability messaging
- **SEOMetaTags**: Manages page meta information

## Notes

- The component gracefully handles invalid dates by returning `null`
- If neither `date` nor `showAdmissionCycle` is provided, component returns `null`
- Admission cycle calculation is timezone-aware based on user's local time
- Component is fully responsive and mobile-friendly
