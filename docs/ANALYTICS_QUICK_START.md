# Analytics Quick Start Guide

## For Developers: Adding Analytics to Pages

### Step 1: Import the Hook

```javascript
import { useShardaAnalytics } from '../../hooks/useAnalytics';
```

### Step 2: Add to Component

```javascript
function YourShardaPage() {
  // Add this line at the top of your component
  useShardaAnalytics({ 
    contentType: 'landing',  // or 'program', 'comparison', 'fee', etc.
    program: 'btech-cse'     // optional: only for program pages
  });
  
  return (
    <div>
      {/* Your page content */}
    </div>
  );
}
```

### That's It!

The hook automatically tracks:
- ✅ Page view when component mounts
- ✅ Scroll depth at 25%, 50%, 75%, 100%
- ✅ Time spent on page (every 30 seconds)
- ✅ Cleanup when component unmounts

## Content Type Values

Use these values for the `contentType` parameter:

- `'landing'` - Sharda landing page
- `'program'` - Program detail pages
- `'comparison'` - University comparison pages
- `'fee'` - Fee-specific pages
- `'ranking'` - Ranking pages
- `'scholarship'` - Scholarship pages

## Examples

### Landing Page
```javascript
useShardaAnalytics({ contentType: 'landing' });
```

### Program Page
```javascript
useShardaAnalytics({ 
  contentType: 'program', 
  program: 'btech-cse' 
});
```

### Comparison Page
```javascript
useShardaAnalytics({ contentType: 'comparison' });
```

## Manual Conversion Tracking

If you need to manually track conversions (most are automatic):

```javascript
import { trackCTAConversion, trackWhatsAppConversion, trackCalculatorConversion } from '../../utils/ga4Config';

// Track CTA click
trackCTAConversion({
  ctaType: 'apply-now',
  ctaLocation: 'hero',
  program: 'btech-cse',
  targetUrl: 'https://global.sharda.ac.in/',
});

// Track WhatsApp click
trackWhatsAppConversion({
  phoneNumber: '+91 88009 96151',
  context: 'landing-page',
  program: 'btech-cse',
});

// Track calculator usage
trackCalculatorConversion({
  program: 'B.Tech CSE',
  scholarshipPercentage: 50,
  finalAmount: 200000,
});
```

## Viewing Analytics Data

### Real-time Data
1. Go to [Google Analytics](https://analytics.google.com)
2. Select property: G-B1MLPB5SJB
3. Go to Reports → Realtime
4. See live user activity and events

### Historical Data
1. Go to Reports → Engagement → Events
2. Filter by event name (e.g., `cta_click`, `scroll_depth`)
3. View event parameters and counts

### Conversion Data
1. Go to Reports → Conversions
2. See conversion events and values
3. Analyze conversion rates

## Troubleshooting

### Events Not Showing Up?

1. **Check browser console** for errors
2. **Verify gtag is loaded**: Open console and type `typeof window.gtag`
   - Should return `"function"`
3. **Disable ad blockers** - they may block GA4
4. **Check GA4 property ID** - Should be G-B1MLPB5SJB

### Need Help?

- See full documentation: `docs/GA4_SETUP_GUIDE.md`
- Check implementation: `src/hooks/useAnalytics.js`
- Review tests: `src/hooks/__tests__/useAnalytics.test.js`

## What Gets Tracked Automatically

When you add `useShardaAnalytics` to a page:

✅ **Page View** - Logged immediately when page loads
✅ **Scroll Depth** - Logged at 25%, 50%, 75%, 100% scroll
✅ **Time on Page** - Logged every 30 seconds
✅ **Final Time** - Logged when user leaves page

All events include:
- Page URL and path
- Page title
- Session ID
- UTM parameters (if present)
- Content type
- Program (if specified)

## Performance Impact

The analytics tracking is highly optimized:
- ⚡ Negligible impact on page load
- ⚡ Throttled scroll events
- ⚡ Debounced time tracking
- ⚡ Automatic cleanup on unmount
- ⚡ SSR-safe (checks for window)

## Best Practices

1. **Always add analytics to new Sharda pages**
2. **Use descriptive content types**
3. **Include program name for program pages**
4. **Test in development** (check console logs)
5. **Verify in GA4 Realtime** after deployment

## Common Patterns

### Standard Page
```javascript
function MyShardaPage() {
  useShardaAnalytics({ contentType: 'landing' });
  return <div>Content</div>;
}
```

### Program Page with Dynamic Program
```javascript
function ProgramPage({ programId }) {
  useShardaAnalytics({ 
    contentType: 'program', 
    program: programId 
  });
  return <div>Program content</div>;
}
```

### Conditional Tracking
```javascript
function MyPage({ enableTracking = true }) {
  useAnalytics({ 
    contentType: 'landing',
    enabled: enableTracking  // Can disable for testing
  });
  return <div>Content</div>;
}
```

## Summary

Adding analytics is as simple as:
1. Import `useShardaAnalytics`
2. Call it at the top of your component
3. Specify content type (and program if applicable)

That's it! Everything else is automatic. 🎉
