# ConversionEventLogger Utility

## Overview

The `ConversionEventLogger` is a comprehensive event tracking utility for the Sharda University content enhancement feature. It provides seamless integration with Google Analytics 4 (GA4) to track user interactions, conversions, and engagement metrics.

## Features

- **CTA Click Tracking**: Track application button clicks with full context
- **WhatsApp Engagement**: Monitor WhatsApp button interactions
- **Calculator Usage**: Track fee calculator interactions and calculations
- **Page View Tracking**: Log page views with content type classification
- **Scroll Depth Tracking**: Automatically track user scroll behavior (25%, 50%, 75%, 100%)
- **Time on Page**: Monitor user engagement duration
- **UTM Parameter Integration**: Automatically capture and track UTM parameters
- **Session Management**: Track user sessions and return visitors
- **GA4 Integration**: Native Google Analytics 4 event tracking

## Installation

The utility is already integrated into the project. Import the functions you need:

```javascript
import {
  logCTAClick,
  logWhatsAppClick,
  logCalculatorUsage,
  logPageView,
  initPageTracking,
} from '../utils/conversionEventLogger';
```

## Usage Examples

### 1. Track CTA Clicks

```javascript
import { logCTAClick } from '../utils/conversionEventLogger';

// In your ApplicationCTA component
const handleClick = () => {
  logCTAClick({
    ctaType: 'apply-now',
    ctaLocation: 'hero',
    targetUrl: 'https://global.sharda.ac.in/?utm_source=...',
    program: 'btech-cse',
    contentType: 'landing',
  });
};
```

### 2. Track WhatsApp Clicks

```javascript
import { logWhatsAppClick } from '../utils/conversionEventLogger';

// In your WhatsAppCTA component
const handleWhatsAppClick = () => {
  logWhatsAppClick({
    phoneNumber: '+91 88009 96151',
    message: "I'm interested in B.Tech CSE at Sharda University",
    context: 'program-page',
    program: 'btech-cse',
    contentType: 'program',
  });
};
```

### 3. Track Fee Calculator Usage

```javascript
import { logCalculatorUsage } from '../utils/conversionEventLogger';

// In your FeeCalculator component
const handleCalculate = (calculationData) => {
  logCalculatorUsage({
    program: 'B.Tech CSE',
    gpa: 4.5,
    country: 'Bangladesh',
    baseFee: 400000,
    scholarshipPercentage: 50,
    finalAmount: 200000,
    action: 'calculate',
  });
};

// When user clicks apply from calculator
const handleApply = (calculationData) => {
  logCalculatorUsage({
    ...calculationData,
    action: 'apply',
  });
};
```

### 4. Initialize Page Tracking

```javascript
import { initPageTracking } from '../utils/conversionEventLogger';
import { useEffect } from 'react';

// In your page component
function ShardaLandingPage() {
  useEffect(() => {
    // Initialize all tracking (page view, scroll depth, time on page)
    const cleanup = initPageTracking({
      contentType: 'landing',
      category: 'sharda-content',
    });

    // Cleanup on unmount
    return cleanup;
  }, []);

  return <div>...</div>;
}
```

### 5. Track Individual Events

```javascript
import { logPageView, logScrollDepth, logTimeOnPage } from '../utils/conversionEventLogger';

// Track page view manually
logPageView({
  contentType: 'program',
  program: 'btech-cse',
  category: 'sharda-programs',
});

// Track scroll depth manually
logScrollDepth({
  depth: 50,
  contentType: 'landing',
});

// Track time on page manually
logTimeOnPage({
  seconds: 120,
  contentType: 'landing',
});
```

## Event Types

The utility tracks the following event types:

```javascript
EVENT_TYPES = {
  CTA_CLICK: 'cta_click',
  WHATSAPP_CLICK: 'whatsapp_click',
  CALCULATOR_USE: 'calculator_use',
  PAGE_VIEW: 'page_view',
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',
}
```

## Automatic Data Collection

Every event automatically includes:

- **Timestamp**: ISO 8601 format
- **Session ID**: Unique session identifier
- **User ID**: Returning user identifier (if available)
- **Page Context**:
  - Current URL
  - Page path
  - Page title
  - Referrer
- **UTM Parameters** (if present):
  - utm_source
  - utm_medium
  - utm_campaign
  - utm_content
  - utm_term

## Google Analytics 4 Integration

All events are automatically sent to GA4 using the `gtag` function. The utility checks for the presence of `window.gtag` and gracefully handles cases where it's not available.

### GA4 Event Structure

Events are sent with the following structure:

```javascript
gtag('event', eventType, {
  event_type: 'cta_click',
  timestamp: '2024-01-15T10:30:00.000Z',
  session_id: 'session_123456',
  user_id: 'user_789',
  page_url: 'https://example.com/sharda/landing',
  page_path: '/sharda/landing',
  page_title: 'Sharda University - Landing Page',
  referrer: 'https://google.com',
  utm_source: 'studyatsharda_youtube',
  utm_medium: 'NextGenLearning',
  utm_campaign: 'SU_AdmissionsIntl_2026',
  // ... event-specific data
});
```

## Advanced Features

### Scroll Depth Tracking

Automatically tracks when users scroll to 25%, 50%, 75%, and 100% of the page:

```javascript
import { initScrollDepthTracking } from '../utils/conversionEventLogger';

useEffect(() => {
  const cleanup = initScrollDepthTracking('landing');
  return cleanup;
}, []);
```

### Time on Page Tracking

Tracks time spent on page at regular intervals (default: 30 seconds):

```javascript
import { initTimeOnPageTracking } from '../utils/conversionEventLogger';

useEffect(() => {
  // Log time every 30 seconds
  const cleanup = initTimeOnPageTracking('landing', 30);
  return cleanup;
}, []);
```

### Target URL UTM Tracking

When tracking clicks to external URLs, the utility automatically extracts and logs UTM parameters from the target URL:

```javascript
logCTAClick({
  ctaType: 'apply-now',
  ctaLocation: 'hero',
  targetUrl: 'https://global.sharda.ac.in/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning',
  // ... other params
});

// Event will include both current page UTM and target URL UTM:
// utm_source: 'google' (current page)
// target_utm_source: 'studyatsharda_youtube' (target URL)
```

## Development Mode

In development mode (`NODE_ENV === 'development'`), all events are logged to the console for debugging:

```
[ConversionEventLogger] cta_click {
  event_type: 'cta_click',
  timestamp: '2024-01-15T10:30:00.000Z',
  cta_type: 'apply-now',
  cta_location: 'hero',
  ...
}
```

## Server-Side Rendering (SSR) Support

The utility gracefully handles server-side rendering environments where `window` is not available. All functions check for `window` existence before accessing browser APIs.

## Error Handling

The utility includes robust error handling:

- Gracefully handles missing `window.gtag`
- Handles invalid URLs in UTM parameter parsing
- Handles missing sessionStorage/localStorage
- Logs errors to console in development mode
- Never throws errors that would break the application

## Best Practices

1. **Initialize tracking early**: Call `initPageTracking()` in your page component's `useEffect`
2. **Clean up on unmount**: Always return the cleanup function from `useEffect`
3. **Use descriptive context**: Provide meaningful `contentType`, `program`, and `category` values
4. **Track user intent**: Use different `action` values in calculator tracking ('calculate' vs 'apply')
5. **Include program context**: Always include program information when available
6. **Test in development**: Check console logs to verify events are firing correctly

## API Reference

### Core Functions

#### `logCTAClick(params)`
Logs a CTA (Call-to-Action) click event.

**Parameters:**
- `ctaType` (string): Type of CTA (e.g., 'apply-now', 'learn-more')
- `ctaLocation` (string): Location on page (e.g., 'hero', 'footer', 'floating')
- `targetUrl` (string): URL the CTA links to
- `program` (string, optional): Program name if applicable
- `contentType` (string, optional): Type of content

#### `logWhatsAppClick(params)`
Logs a WhatsApp button click event.

**Parameters:**
- `phoneNumber` (string): WhatsApp phone number
- `message` (string): Pre-filled message
- `context` (string): Context where button was clicked
- `program` (string, optional): Program name if applicable
- `contentType` (string, optional): Type of content

#### `logCalculatorUsage(params)`
Logs fee calculator usage.

**Parameters:**
- `program` (string): Selected program
- `gpa` (number): Entered GPA/percentage
- `country` (string): Selected country
- `baseFee` (number): Base tuition fee
- `scholarshipPercentage` (number): Applied scholarship percentage
- `finalAmount` (number): Final calculated amount
- `action` (string, optional): Action taken (default: 'calculate')

#### `logPageView(params)`
Logs a page view event.

**Parameters:**
- `contentType` (string, optional): Type of content being viewed
- `program` (string, optional): Program name if viewing program page
- `category` (string, optional): Content category

#### `initPageTracking(params)`
Initializes comprehensive page tracking (page view, scroll depth, time on page).

**Parameters:**
- `contentType` (string, optional): Type of content
- `program` (string, optional): Program name if applicable
- `category` (string, optional): Content category

**Returns:** Cleanup function to stop all tracking

## Requirements Validation

This utility validates the following requirements:

- **17.1**: Logs conversion element interactions (CTA clicks, WhatsApp clicks, calculator usage)
- **17.2**: Tracks page views for all Sharda content pages
- **17.3**: Records application link clicks with page context
- **17.4**: Tracks scroll depth at key intervals
- **17.5**: Logs fee calculator usage with program and scholarship details
- **17.6**: Tracks time spent on key pages

## Testing

The utility includes comprehensive unit tests covering:

- All event logging functions
- UTM parameter extraction
- Session and user ID management
- GA4 integration
- Error handling
- Edge cases

Run tests with:
```bash
npm test -- conversionEventLogger.test.js
```

## Support

For issues or questions about the ConversionEventLogger utility, please refer to:
- Design document: `.kiro/specs/sharda-university-content-enhancement/design.md`
- Requirements: `.kiro/specs/sharda-university-content-enhancement/requirements.md`
- Task list: `.kiro/specs/sharda-university-content-enhancement/tasks.md`
