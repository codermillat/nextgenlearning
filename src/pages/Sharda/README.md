# Sharda University Pages

This directory contains page-level components for Sharda University content.

## Feature: sharda-university-content-enhancement

### Directory Structure

```
src/pages/Sharda/
├── README.md                           # This file
├── ShardaLanding.jsx                   # Main landing page
├── ShardaRankings.jsx                  # Rankings page
├── ShardaNIRFRanking.jsx              # NIRF ranking specific page
├── ShardaBTechCSEFees.jsx             # B.Tech CSE fees page
├── ShardaBTechCSETotalFees.jsx        # B.Tech CSE total fees page
├── ShardaBTechCSE4YearFees.jsx        # B.Tech CSE 4-year fees page
├── StudyInIndiaFromBangladesh.jsx     # Bangladesh students guide
├── ScholarshipBangladeshIndia.jsx     # Bangladesh scholarship page
├── IndianUniversityBangladesh.jsx     # Indian universities for BD students
├── ShardaVsAmity.jsx                  # Comparison page
├── BestUniversitiesBangladesh.jsx     # Best universities comparison
└── programs/                           # Individual program pages
    ├── BTechCSE.jsx
    ├── BTechCSEAI.jsx
    ├── BTechCSEIoT.jsx
    ├── BCom.jsx
    └── MBA.jsx
```

### Page Categories

#### Main Pages
- **ShardaLanding**: Comprehensive landing page with all sections
- **ShardaRankings**: Overview of all rankings

#### SEO-Optimized Keyword Pages
- **ShardaNIRFRanking**: Targets "sharda university nirf ranking"
- **ShardaBTechCSEFees**: Targets "sharda university b.tech cse fees"
- **ShardaBTechCSETotalFees**: Targets "sharda university b.tech cse total fees"
- **ShardaBTechCSE4YearFees**: Targets "sharda university b.tech cse total fees 4 years"

#### Bangladesh-Focused Pages
- **StudyInIndiaFromBangladesh**: Targets "study in india from bangladesh"
- **ScholarshipBangladeshIndia**: Targets "scholarship for bangladeshi students in india"
- **IndianUniversityBangladesh**: Targets "indian university for bangladeshi students"

#### Comparison Pages
- **ShardaVsAmity**: Sharda vs Amity comparison
- **BestUniversitiesBangladesh**: Best universities for Bangladeshi students

#### Program Pages
Individual pages for each program with:
- Detailed program information
- Fee breakdown
- Eligibility requirements
- Curriculum details
- Career prospects
- Related programs
- Student testimonials
- Course schema markup

### SEO Features

Each page includes:
- Unique title tag (optimized for target keyword)
- Unique meta description (under 160 characters)
- Target keyword in H1, H2, and content
- Proper heading hierarchy
- Internal links to related pages
- Structured data (Organization, Course, FAQPage, etc.)
- Canonical URL
- Breadcrumb navigation

### Conversion Elements

Each page includes:
- Application CTAs (UTM-tracked)
- WhatsApp CTAs (contextual messages)
- Fee calculator integration
- Program finder integration
- Testimonials
- FAQ sections

### Routing

Pages are integrated into React Router:

```jsx
import { ShardaLanding } from './pages/Sharda/ShardaLanding';
import { ShardaNIRFRanking } from './pages/Sharda/ShardaNIRFRanking';

const routes = [
  { path: '/sharda-university', element: <ShardaLanding /> },
  { path: '/sharda-university/nirf-ranking', element: <ShardaNIRFRanking /> },
  // ... more routes
];
```

### Content Guidelines

1. **Minimum 800 words** per page (for SEO)
2. **Unique content** - no duplicate content across pages
3. **Natural keyword usage** - avoid keyword stuffing
4. **User-focused** - prioritize information over marketing
5. **Mobile-optimized** - responsive design for all devices
6. **Fast loading** - lazy loading, optimized images
7. **Accessible** - WCAG AA compliant

### Testing

Each page should have:
- Unit tests for content presence
- Property tests for SEO compliance
- Accessibility tests
- Performance tests

### Related Documentation

- Requirements: `.kiro/specs/sharda-university-content-enhancement/requirements.md`
- Design: `.kiro/specs/sharda-university-content-enhancement/design.md`
- Tasks: `.kiro/specs/sharda-university-content-enhancement/tasks.md`
