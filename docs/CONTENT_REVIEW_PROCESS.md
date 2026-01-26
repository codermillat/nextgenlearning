# Content Review Process

## Overview

This document outlines the quarterly content review process for Sharda University content on the NextGen Learning platform. Regular reviews ensure information accuracy, maintain SEO performance, and build trust with prospective students.

## Feature

**Feature**: sharda-university-content-enhancement  
**Validates**: Requirements 16.3, 16.4, 16.5, 16.6

## Review Schedule

### Quarterly Review Cycle

Content is reviewed on a quarterly basis:

- **Q1 (January - March)**: Review general content, comparison pages, Bangladesh-focused pages
- **Q2 (April - June)**: Review rankings (NIRF typically released in June), placements
- **Q3 (July - September)**: Review fees, programs, scholarships (new admission cycle)
- **Q4 (October - December)**: Review all content for year-end accuracy

### Content-Specific Frequencies

Different content types have different review frequencies:

| Content Type | Review Frequency | Typical Update Trigger |
|--------------|------------------|------------------------|
| **Fees** | Every 6 months | Annual fee structure changes |
| **Rankings** | Every 6 months | New ranking releases (NIRF, QS, etc.) |
| **Placements** | Every 6 months | Annual placement season completion |
| **Programs** | Every 6 months | Curriculum changes, new specializations |
| **Scholarships** | Every 6 months | Policy changes |
| **Admissions** | Every 3 months | Process updates, visa changes |
| **General Content** | Every 3 months | Accuracy verification |
| **Comparison Pages** | Every 3 months | Competitor data updates |

## Review Process

### 1. Identify Content Due for Review

Use the content metadata system to identify pages due for review:

```typescript
import { getContentDueForReview, getContentByQuarter } from '@/data/contentMetadata';

// Get all content due for review today
const dueContent = getContentDueForReview();

// Get content due in Q2 2026
const q2Content = getContentByQuarter('Q2', 2026);
```

### 2. Review Checklist

For each content item, verify:

#### Fees Content
- [ ] Tuition fees are current for the admission cycle
- [ ] Hostel and mess charges are accurate
- [ ] Scholarship percentages and eligibility are correct
- [ ] Additional costs (registration, etc.) are up-to-date
- [ ] Fee calculator produces accurate results
- [ ] Currency conversions are current (if applicable)

#### Rankings Content
- [ ] NIRF ranking is the latest available
- [ ] QS ranking is current
- [ ] Other rankings (Times Higher Education, etc.) are updated
- [ ] Ranking year is clearly stated
- [ ] Comparison with peer institutions is accurate
- [ ] Structured data includes correct ranking information

#### Placements Content
- [ ] Placement statistics are from the most recent season
- [ ] Highest package amount is accurate
- [ ] Average package is correct
- [ ] Number of companies visited is current
- [ ] Top recruiters list is updated
- [ ] Placement percentage is accurate
- [ ] Success stories are recent and relevant

#### Programs Content
- [ ] Program duration is correct
- [ ] Eligibility criteria are current
- [ ] Curriculum information is up-to-date
- [ ] Specializations list is complete
- [ ] Accreditation information is accurate
- [ ] Career prospects are relevant
- [ ] Fee information matches fee pages

#### Scholarships Content
- [ ] Scholarship percentages are current
- [ ] Eligibility criteria are accurate
- [ ] Application process is up-to-date
- [ ] Deadlines are correct for current cycle
- [ ] Country-specific scholarships are accurate
- [ ] Terms and conditions are current

#### Admissions Content
- [ ] Admission process steps are current
- [ ] Document requirements are accurate
- [ ] Deadlines are correct for current cycle
- [ ] Visa information is up-to-date (especially for Bangladesh)
- [ ] Contact information is correct
- [ ] Application links are working

#### General Content
- [ ] All statistics and numbers are accurate
- [ ] Links are working (internal and external)
- [ ] Images are loading correctly
- [ ] Contact information is current
- [ ] Admission cycle year is correct
- [ ] No outdated information or references

### 3. Update Content

When updating content:

1. **Make Changes**: Update the content in the appropriate component or data file
2. **Update Metadata**: Update the `lastUpdated` date in `contentMetadata.ts`
3. **Update LastUpdated Component**: Ensure the `LastUpdated` component on the page shows the new date
4. **Test Changes**: Verify the changes render correctly
5. **Run Tests**: Ensure all tests pass
6. **Document Changes**: Note what was updated in the metadata `notes` field

Example metadata update:

```typescript
import { updateContentMetadata } from '@/data/contentMetadata';

// After updating B.Tech CSE fees
updateContentMetadata('btech-cse-fees', '2026-07-15');
```

### 4. Verify SEO Impact

After content updates:

- [ ] Meta descriptions are still optimized
- [ ] Title tags are accurate
- [ ] Structured data is valid
- [ ] Internal links are working
- [ ] Keywords are naturally integrated
- [ ] Content length meets minimum requirements (800+ words for program pages)

### 5. Update Review Schedule

After completing a review:

```typescript
// Update the metadata registry in contentMetadata.ts
// The updateContentMetadata function automatically calculates next review date
```

## Monitoring and Alerts

### Overdue Content

Check for overdue content regularly:

```typescript
import { getContentDueForReview, isContentOverdue } from '@/data/contentMetadata';

// Get all overdue content
const overdueContent = getContentDueForReview();

// Check if specific content is overdue
const isOverdue = isContentOverdue('btech-cse-fees');
```

### Review Dashboard

Create a simple dashboard to track review status:

```typescript
import { 
  getContentDueForReview, 
  getContentByQuarter,
  getDaysUntilReview 
} from '@/data/contentMetadata';

// Get current quarter content
const currentQuarter = 'Q1';
const currentYear = 2026;
const quarterContent = getContentByQuarter(currentQuarter, currentYear);

// Get days until review for each item
quarterContent.forEach(item => {
  const days = getDaysUntilReview(item.id);
  console.log(`${item.path}: ${days} days until review`);
});
```

## Best Practices

### Content Accuracy

1. **Verify Sources**: Always verify information with official sources (university website, admissions office)
2. **Cross-Reference**: Check multiple sources for critical information (fees, rankings)
3. **Document Sources**: Note where information came from in metadata notes
4. **Timestamp Updates**: Always update the `lastUpdated` date when making changes

### SEO Maintenance

1. **Preserve Keywords**: Maintain target keywords when updating content
2. **Update Structured Data**: Ensure schema markup reflects current information
3. **Check Internal Links**: Verify all internal links still work after updates
4. **Monitor Rankings**: Track SEO rankings for target keywords after updates

### User Experience

1. **Test Calculators**: Verify fee calculator and program finder work correctly
2. **Check Mobile**: Test updated content on mobile devices
3. **Verify CTAs**: Ensure all application and WhatsApp CTAs are working
4. **Test Forms**: Check that any forms or interactive elements function properly

### Version Control

1. **Commit Messages**: Use clear commit messages describing what was updated
2. **Change Log**: Maintain a change log for major content updates
3. **Backup**: Keep backups of previous content versions
4. **Review History**: Document review history in metadata notes

## Automation Opportunities

### Future Enhancements

Consider automating:

1. **Review Reminders**: Email notifications when content is due for review
2. **Overdue Alerts**: Slack/email alerts for overdue content
3. **Data Validation**: Automated checks for broken links, missing images
4. **SEO Monitoring**: Automated SEO audits after content updates
5. **Comparison Updates**: Automated competitor data collection

### Integration Points

- **CMS Integration**: Connect to university CMS for automatic data updates
- **Analytics Integration**: Track content performance metrics
- **Calendar Integration**: Add review dates to team calendars
- **Project Management**: Create review tasks in project management tools

## Roles and Responsibilities

### Content Team
- General content reviews
- Comparison page updates
- SEO optimization
- Content quality assurance

### Admissions Team
- Fee structure updates
- Scholarship policy updates
- Admission process updates
- International student information

### Academic Team
- Program curriculum updates
- Specialization information
- Eligibility criteria
- Academic calendar updates

### Placement Cell
- Placement statistics updates
- Recruiter information
- Success stories
- Career prospects data

### Marketing Team
- Rankings updates
- Promotional content
- Testimonial collection
- Brand messaging

### International Admissions
- Bangladesh-specific content
- Visa information
- Country-specific scholarships
- International student support

## Quarterly Review Checklist

### Q1 (January - March)

- [ ] Review all general content pages
- [ ] Update admission cycle year across all pages
- [ ] Review comparison pages
- [ ] Update Bangladesh-focused content
- [ ] Verify contact information
- [ ] Check all CTAs and links

### Q2 (April - June)

- [ ] Update NIRF rankings (typically released in June)
- [ ] Update other rankings (QS, THE, etc.)
- [ ] Update placement statistics (after placement season)
- [ ] Review program pages
- [ ] Verify scholarship information

### Q3 (July - September)

- [ ] Update fee structures for new admission cycle
- [ ] Review program curriculum information
- [ ] Update scholarship policies
- [ ] Verify admission process for new cycle
- [ ] Update fee calculator

### Q4 (October - December)

- [ ] Year-end accuracy check for all content
- [ ] Prepare for next year's admission cycle
- [ ] Update testimonials and success stories
- [ ] Review and update FAQs
- [ ] Plan content updates for next year

## Metrics and KPIs

Track these metrics to measure content effectiveness:

### Traffic Metrics
- Page views per content type
- Bounce rate by page
- Time on page
- Traffic sources (organic, direct, referral)

### Engagement Metrics
- CTA click-through rates
- WhatsApp engagement rate
- Fee calculator usage
- Program finder usage

### Conversion Metrics
- Application link clicks
- Conversion rate by page
- Conversion funnel completion

### SEO Metrics
- Keyword rankings
- Organic traffic growth
- Backlinks
- Domain authority

### Content Quality Metrics
- Content freshness (average days since last update)
- Review completion rate
- Overdue content count
- User feedback/ratings

## Tools and Resources

### Internal Tools
- Content Metadata System (`src/data/contentMetadata.ts`)
- LastUpdated Component (`src/components/Sharda/LastUpdated.jsx`)
- Review Schedule Functions

### External Tools
- Google Analytics: Traffic and engagement metrics
- Google Search Console: SEO performance
- Lighthouse: Performance and accessibility audits
- Screaming Frog: Technical SEO audits

### Documentation
- Requirements Document: `.kiro/specs/sharda-university-content-enhancement/requirements.md`
- Design Document: `.kiro/specs/sharda-university-content-enhancement/design.md`
- Component Documentation: Individual README files

## Contact

For questions about the content review process:

- **Content Team Lead**: [Contact Information]
- **Technical Lead**: [Contact Information]
- **SEO Specialist**: [Contact Information]

## Revision History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-26 | 1.0 | Initial content review process documentation | Content Team |

---

**Last Updated**: January 26, 2026  
**Next Review**: April 26, 2026
