# UTM Tracking Implementation for Sharda University

## Overview

This document describes the UTM tracking implementation for Sharda University content enhancement. The system uses precise UTM parameters to track conversions from NextGen Learning to Sharda University's application pages.

## Base URLs

### Bangladesh Students
```
https://global.sharda.ac.in/bangladesh/
```

### International Students (All other countries)
```
https://global.sharda.ac.in/
```

## UTM Parameters

### Consistent Parameters (All Links)

- **utm_source**: `studyatsharda_youtube` (consistent across all links)
- **utm_medium**: `NextGenLearning` (identifies the referring platform)

### Campaign Parameters (Country-Specific)

- **Bangladesh**: `utm_campaign=SU_AdmissionsBD_2026`
- **International**: `utm_campaign=SU_AdmissionsIntl_2026`

### Content Parameters (Context-Specific)

The `utm_content` parameter provides precise tracking of user actions:

Format: `{contentType}_{program}_{action}`

Examples:
- `landing_apply-now` - Landing page CTA
- `program_btech-cse_apply-now` - B.Tech CSE program page CTA
- `calculator_btech-cse_apply-with-calculation` - Fee calculator CTA
- `comparison_apply-now` - Comparison page CTA
- `bangladesh_scholarship` - Bangladesh scholarship section CTA
- `faq_admission` - FAQ admission category CTA
- `floating-cta_apply-now` - Floating sticky CTA
- `header-cta_apply-now` - Header CTA
- `footer-cta_apply-now` - Footer CTA

## Example URLs

### Bangladesh Student Examples

1. **Landing Page**
   ```
   https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=landing_apply-now
   ```

2. **B.Tech CSE Program Page**
   ```
   https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=program_btech-cse_apply-now
   ```

3. **Fee Calculator**
   ```
   https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=calculator_btech-cse_apply-with-calculation
   ```

4. **Bangladesh Scholarship Section**
   ```
   https://global.sharda.ac.in/bangladesh/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsBD_2026&utm_content=bangladesh_scholarship
   ```

### International Student Examples

1. **Landing Page (Nepal)**
   ```
   https://global.sharda.ac.in/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsIntl_2026&utm_content=landing_apply-now
   ```

2. **MBA Program Page (India)**
   ```
   https://global.sharda.ac.in/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsIntl_2026&utm_content=program_mba_apply-now
   ```

3. **Ranking Page (Sri Lanka)**
   ```
   https://global.sharda.ac.in/?utm_source=studyatsharda_youtube&utm_medium=NextGenLearning&utm_campaign=SU_AdmissionsIntl_2026&utm_content=rankings_apply-now
   ```

## Implementation Files

### Core Utility
- **File**: `src/utils/utmGenerator.js`
- **Functions**: 15+ generator functions for different contexts
- **Features**: 
  - Automatic country-based URL routing
  - Consistent UTM parameter generation
  - URL validation
  - Parameter parsing

### Tests
- **Unit Tests**: `src/utils/__tests__/utmGenerator.test.js` (37 tests)
- **Property Tests**: `src/utils/__tests__/utmGenerator.property.test.js` (13 tests, 1,300 test cases)
- **Total**: 50 tests, all passing ✅

### Examples
- **File**: `src/utils/utmGenerator.example.js`
- **Content**: 16 real-world usage examples with React components

## Usage in Components

### Basic Usage

```javascript
import { generateProgramPageLink } from '@/utils/utmGenerator';

function ApplicationButton({ country, program }) {
  const link = generateProgramPageLink(country, program);
  
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      Apply Now
    </a>
  );
}
```

### Available Generator Functions

1. `generateLandingPageLink(country)` - Landing page CTAs
2. `generateProgramPageLink(country, programCode)` - Program page CTAs
3. `generateFeeCalculatorLink(country, programCode)` - Fee calculator CTAs
4. `generateComparisonPageLink(country, comparisonType)` - Comparison page CTAs
5. `generateRankingPageLink(country)` - Ranking page CTAs
6. `generateFeePageLink(country, programCode)` - Fee page CTAs
7. `generateBangladeshContentLink(contentSection)` - Bangladesh-specific CTAs
8. `generateBlogLink(country, articleSlug)` - Blog/article CTAs
9. `generateFAQLink(country, faqCategory)` - FAQ section CTAs
10. `generateFloatingCTALink(country, currentPage)` - Floating sticky CTAs
11. `generateHeaderCTALink(country)` - Header CTAs
12. `generateFooterCTALink(country)` - Footer CTAs

### Custom Links

```javascript
import { generateUTMLink } from '@/utils/utmGenerator';

const customLink = generateUTMLink({
  country: 'Bangladesh',
  page: 'program-btech-ai',
  contentType: 'program',
  program: 'btech-ai',
  action: 'download-brochure'
});
```

## Tracking Benefits

### Precise Attribution
- Track which pages drive the most applications
- Identify high-performing content types
- Measure conversion rates by country
- Analyze user journey from content to application

### Campaign Differentiation
- Separate Bangladesh vs International campaigns
- Compare performance across student segments
- Optimize content for each audience

### Content Performance
- Track individual CTA performance
- Identify best-performing programs
- Measure engagement with different content types
- Optimize placement of conversion elements

## Analytics Setup

### Google Analytics 4

1. **Campaign Tracking**
   - View campaigns: `SU_AdmissionsBD_2026` and `SU_AdmissionsIntl_2026`
   - Compare performance between Bangladesh and International

2. **Content Tracking**
   - Analyze `utm_content` parameter for detailed insights
   - Identify top-performing pages and actions

3. **Conversion Goals**
   - Set up goals for application link clicks
   - Track conversion rates by source, campaign, and content

### Recommended Reports

1. **Acquisition > Traffic Acquisition**
   - Filter by `utm_source=studyatsharda_youtube`
   - Group by campaign to see Bangladesh vs International

2. **Engagement > Events**
   - Track `click` events on application links
   - Segment by `utm_content` for detailed analysis

3. **Conversions > Conversion Paths**
   - Analyze user journey from content to application
   - Identify most effective content sequences

## Best Practices

### Implementation
1. ✅ Always use generator functions (don't manually construct URLs)
2. ✅ Pass user's country for proper routing
3. ✅ Include program code on program-specific pages
4. ✅ Use descriptive actions for better tracking
5. ✅ Open links in new tab with `target="_blank" rel="noopener noreferrer"`

### Testing
1. ✅ Test links before deployment
2. ✅ Verify UTM parameters in browser
3. ✅ Check Google Analytics for proper tracking
4. ✅ Test both Bangladesh and International URLs

### Monitoring
1. ✅ Monitor conversion rates weekly
2. ✅ Analyze top-performing content monthly
3. ✅ A/B test different CTA placements
4. ✅ Optimize based on data insights

## Validation

All generated URLs are validated to ensure:
- ✅ Proper HTTPS protocol
- ✅ Correct Sharda domain
- ✅ All required UTM parameters present
- ✅ Valid URL format
- ✅ Consistent parameter structure

## Testing Results

```
✓ 37 unit tests passed
✓ 13 property-based tests passed (100 iterations each = 1,300 test cases)
✓ Total: 50 tests, 1,350 test cases - ALL PASSING ✅
```

## Next Steps

1. **Integration**: Integrate UTM generator into all Sharda CTA components
2. **Analytics**: Set up Google Analytics 4 tracking and reports
3. **Monitoring**: Establish baseline metrics and KPIs
4. **Optimization**: Continuously optimize based on conversion data
5. **Expansion**: Add more tracking parameters as needed

## Support

For questions or issues with UTM tracking:
- Review `src/utils/utmGenerator.example.js` for usage examples
- Check tests in `src/utils/__tests__/` for expected behavior
- Refer to this document for URL structure and parameters

---

**Last Updated**: January 24, 2026
**Version**: 1.0.0
**Status**: Production Ready ✅
