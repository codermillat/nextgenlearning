# Google Analytics 4 Setup Guide for Sharda University Content

This guide provides step-by-step instructions for setting up Google Analytics 4 (GA4) to track Sharda University content performance, conversions, and user behavior.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [GA4 Property Setup](#ga4-property-setup)
3. [Custom Events Configuration](#custom-events-configuration)
4. [Conversion Events Setup](#conversion-events-setup)
5. [Custom Dimensions Setup](#custom-dimensions-setup)
6. [Conversion Funnel Setup](#conversion-funnel-setup)
7. [Custom Dashboards](#custom-dashboards)
8. [Audiences for Remarketing](#audiences-for-remarketing)
9. [Testing and Verification](#testing-and-verification)

## Prerequisites

- Access to Google Analytics 4 property (ID: G-B1MLPB5SJB)
- Admin or Editor permissions in GA4
- Basic understanding of GA4 interface

## GA4 Property Setup

The GA4 tracking code is already integrated in `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-B1MLPB5SJB"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-B1MLPB5SJB', {
    'send_page_view': true,
    'anonymize_ip': false,
    'cookie_flags': 'SameSite=None;Secure'
  });
</script>
```

## Custom Events Configuration

### Events Being Tracked

The following custom events are automatically tracked:

#### Conversion Events
- **cta_click**: User clicks on application CTA
- **whatsapp_click**: User clicks WhatsApp contact button
- **calculator_use**: User uses fee calculator
- **form_submit**: User submits application form

#### Engagement Events
- **page_view**: Page views with content type
- **scroll_depth**: Scroll depth at 25%, 50%, 75%, 100%
- **time_on_page**: Time spent on page (logged every 30 seconds)
- **program_view**: User views program detail page
- **comparison_view**: User views comparison page

### Event Parameters

Each event includes the following parameters:

**Common Parameters:**
- `page_url`: Current page URL
- `page_path`: Current page path
- `page_title`: Current page title
- `session_id`: User session ID
- `timestamp`: Event timestamp
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`: UTM parameters

**Event-Specific Parameters:**

**cta_click:**
- `cta_type`: Type of CTA (e.g., 'apply-now', 'learn-more')
- `cta_location`: Location on page (e.g., 'hero', 'footer')
- `program`: Program name if applicable
- `target_url`: URL the CTA links to

**whatsapp_click:**
- `phone_number`: WhatsApp phone number
- `click_context`: Context where button was clicked
- `program`: Program name if applicable

**calculator_use:**
- `program`: Selected program
- `gpa`: Entered GPA/percentage
- `country`: Selected country
- `scholarship_percentage`: Applied scholarship percentage
- `final_amount`: Final calculated amount

**scroll_depth:**
- `scroll_depth`: Percentage scrolled (25, 50, 75, 100)
- `content_type`: Type of content

**time_on_page:**
- `time_seconds`: Time spent in seconds
- `content_type`: Type of content

## Conversion Events Setup

### Step 1: Mark Events as Conversions

1. Go to GA4 Admin → Events
2. Find the following events and mark them as conversions:
   - `cta_click`
   - `whatsapp_click`
   - `calculator_use`
   - `form_submit`
   - `generate_lead`

### Step 2: Set Conversion Values

For each conversion event, set appropriate values:

- **cta_click**: Value = 1 (lead value)
- **whatsapp_click**: Value = 1 (lead value)
- **calculator_use**: Value = final_amount / 1000 (in thousands)
- **form_submit**: Value = 5 (completed application value)

### Step 3: Create Conversion Goals

Create the following conversion goals:

1. **Sharda Application Started**
   - Event: `cta_click`
   - Condition: `cta_type` = 'apply-now'

2. **Sharda WhatsApp Contact**
   - Event: `whatsapp_click`
   - Condition: `page_path` contains '/sharda'

3. **Sharda Calculator Engagement**
   - Event: `calculator_use`
   - Condition: `program` is not empty

4. **Sharda Application Submitted**
   - Event: `form_submit`
   - Condition: `page_path` contains '/sharda'

## Custom Dimensions Setup

### Step 1: Create Custom Dimensions

Go to GA4 Admin → Custom Definitions → Create Custom Dimension

Create the following dimensions:

1. **Content Type**
   - Dimension name: `content_type`
   - Scope: Event
   - Event parameter: `content_type`
   - Description: Type of Sharda content (landing, program, comparison, etc.)

2. **Program**
   - Dimension name: `program`
   - Scope: Event
   - Event parameter: `program`
   - Description: Program name (e.g., btech-cse, mba)

3. **Category**
   - Dimension name: `category`
   - Scope: Event
   - Event parameter: `category`
   - Description: Content category (sharda-content)

4. **CTA Type**
   - Dimension name: `cta_type`
   - Scope: Event
   - Event parameter: `cta_type`
   - Description: Type of CTA clicked

5. **CTA Location**
   - Dimension name: `cta_location`
   - Scope: Event
   - Event parameter: `cta_location`
   - Description: Location of CTA on page

6. **Scroll Depth**
   - Dimension name: `scroll_depth`
   - Scope: Event
   - Event parameter: `scroll_depth`
   - Description: Scroll depth percentage

## Conversion Funnel Setup

### Funnel Steps

Create a funnel exploration report with the following steps:

1. **Step 1: Landing Page View**
   - Event: `page_view`
   - Condition: `page_path` contains '/sharda'

2. **Step 2: Program View**
   - Event: `page_view`
   - Condition: `content_type` = 'program'

3. **Step 3: Calculator Use**
   - Event: `calculator_use`

4. **Step 4: CTA Click**
   - Event: `cta_click`

5. **Step 5: Application Submit**
   - Event: `form_submit`

### Creating the Funnel

1. Go to Explore → Create new exploration
2. Select "Funnel exploration" template
3. Name: "Sharda Application Funnel"
4. Add the 5 steps above in order
5. Set visualization to "Standard funnel"
6. Add breakdown dimensions:
   - Traffic source
   - Device category
   - Country

## Custom Dashboards

### Dashboard 1: Sharda Content Overview

**Metrics:**
- Total Users
- New Users
- Sessions
- Engagement Rate
- Conversions
- Conversion Rate

**Dimensions:**
- Page Path (filter: contains '/sharda')
- Content Type
- Traffic Source

**Charts:**
1. Line chart: Users over time
2. Bar chart: Page views by content type
3. Table: Top performing pages
4. Pie chart: Traffic sources

### Dashboard 2: Conversion Performance

**Metrics:**
- CTA Clicks
- WhatsApp Clicks
- Calculator Uses
- Form Submissions
- Conversion Rate

**Dimensions:**
- CTA Type
- CTA Location
- Program
- Traffic Source

**Charts:**
1. Bar chart: Conversions by type
2. Table: CTA performance by location
3. Line chart: Conversion rate over time
4. Funnel: Application funnel

### Dashboard 3: Program Interest

**Metrics:**
- Program Views
- Calculator Uses
- CTA Clicks
- Time on Page

**Dimensions:**
- Program
- Content Type

**Charts:**
1. Bar chart: Views by program
2. Table: Program engagement metrics
3. Scatter plot: Engagement vs conversions

### Dashboard 4: Engagement Metrics

**Metrics:**
- Average Engagement Time
- Scroll Depth
- Pages per Session
- Bounce Rate

**Dimensions:**
- Page Path
- Content Type
- Device Category

**Charts:**
1. Line chart: Engagement time over time
2. Bar chart: Scroll depth distribution
3. Table: Page engagement metrics

## Audiences for Remarketing

### Audience 1: Sharda Landing Page Visitors

**Conditions:**
- Event: `page_view`
- `page_path` contains '/sharda'
- Within last 30 days

**Use case:** Retarget users who visited Sharda content

### Audience 2: Calculator Users

**Conditions:**
- Event: `calculator_use`
- Within last 30 days

**Use case:** Retarget users who showed high intent by using calculator

### Audience 3: High Intent Users

**Conditions:**
- Event: `cta_click`
- NOT Event: `form_submit`
- Within last 7 days

**Use case:** Retarget users who clicked CTAs but didn't complete application

### Audience 4: Program Researchers

**Conditions:**
- Event: `program_view`
- Event count >= 3
- Within last 30 days

**Use case:** Retarget users researching multiple programs

### Audience 5: Engaged Visitors

**Conditions:**
- `scroll_depth` >= 75
- `time_on_page` >= 60 seconds
- Within last 30 days

**Use case:** Retarget highly engaged users

## Testing and Verification

### Step 1: Real-time Testing

1. Go to GA4 → Reports → Realtime
2. Open Sharda landing page in incognito window
3. Verify events appear in real-time:
   - `page_view` event
   - Scroll to trigger `scroll_depth` events
   - Click CTA to trigger `cta_click` event
   - Use calculator to trigger `calculator_use` event

### Step 2: DebugView Testing

1. Enable debug mode by adding `?debug_mode=true` to URL
2. Go to GA4 → Configure → DebugView
3. Perform actions and verify events with all parameters

### Step 3: Event Parameter Verification

1. Go to GA4 → Reports → Events
2. Click on each custom event
3. Verify all parameters are being captured correctly

### Step 4: Conversion Tracking Verification

1. Go to GA4 → Reports → Conversions
2. Verify conversion events are being tracked
3. Check conversion values are correct

## Monitoring and Optimization

### Daily Checks

- Monitor real-time conversions
- Check for any tracking errors
- Verify event counts are reasonable

### Weekly Analysis

- Review conversion funnel drop-off points
- Analyze top performing content
- Check CTA performance by location
- Review traffic source effectiveness

### Monthly Optimization

- Update conversion values based on actual lead value
- Refine audience definitions
- Optimize underperforming CTAs
- A/B test different CTA placements

## Troubleshooting

### Events Not Appearing

1. Check browser console for errors
2. Verify gtag is loaded: `typeof window.gtag === 'function'`
3. Check ad blockers are disabled
4. Verify GA4 tracking ID is correct

### Parameters Missing

1. Check event payload in Network tab
2. Verify parameter names match custom dimensions
3. Check for JavaScript errors preventing tracking

### Conversions Not Counting

1. Verify events are marked as conversions in GA4
2. Check conversion event names match exactly
3. Verify conversion conditions are correct

## Additional Resources

- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [GA4 Custom Dimensions](https://support.google.com/analytics/answer/10075209)
- [GA4 Funnel Exploration](https://support.google.com/analytics/answer/9327974)

## Support

For questions or issues with GA4 setup, contact the development team or refer to the codebase documentation in:
- `src/utils/ga4Config.js`
- `src/utils/conversionEventLogger.js`
- `src/hooks/useAnalytics.js`
