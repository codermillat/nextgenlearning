# Sharda University Components

This directory contains React components specific to Sharda University content enhancement.

## Feature: sharda-university-content-enhancement

### Directory Structure

```
src/components/Sharda/
├── README.md                    # This file
├── Landing/                     # Landing page components
├── Bangladesh/                  # Bangladesh-specific components
├── Interactive/                 # Interactive tools (calculator, finder)
├── SEO/                        # SEO-specific components
└── Common/                     # Shared Sharda components
```

### Component Categories

#### Landing Page Components
- **ShardaLandingPage**: Main landing page with all sections
- **HeroSection**: Hero section with key statistics
- **AboutSection**: University profile and overview
- **RankingsSection**: Rankings display
- **ProgramsSection**: Program highlights
- **PlacementsSection**: Placement statistics
- **CampusSection**: Campus facilities and infrastructure
- **TestimonialsSection**: Student testimonials

#### Bangladesh-Specific Components
- **BangladeshSection**: Dedicated section for Bangladeshi students
- **BangladeshScholarships**: Scholarship information for Bangladesh
- **BangladeshAdmissionProcess**: Step-by-step admission guide
- **CulturalCompatibility**: Cultural information for Bangladeshi students

#### Interactive Components
- **FeeCalculator**: Interactive fee calculator with scholarship
- **ProgramFinder**: Program search and filter tool
- **ComparisonTable**: University comparison tool

#### SEO Components
- **SEOMetaTags**: Dynamic meta tag generation
- **StructuredDataGenerator**: JSON-LD schema markup
- **BreadcrumbNavigation**: Breadcrumb navigation with schema

#### Common Components
- **ApplicationCTA**: Application call-to-action button
- **WhatsAppCTA**: WhatsApp contact button
- **TestimonialCarousel**: Testimonial carousel
- **FAQSection**: FAQ accordion with schema
- **UrgencyMessaging**: Deadline and urgency messages

### Data Models

All TypeScript interfaces are defined in `src/types/sharda.ts`

### Mock Data

Development and testing data is available in `src/data/shardaData.ts`

### Testing

- Unit tests: `__tests__/*.test.ts`
- Property tests: `__tests__/*.property.test.ts`

### Usage Example

```jsx
import { ShardaLandingPage } from './components/Sharda/Landing/ShardaLandingPage';
import { shardaUniversityData } from './data/shardaData';

function App() {
  return (
    <ShardaLandingPage 
      data={shardaUniversityData}
      userCountry="Bangladesh"
    />
  );
}
```

### Design Principles

1. **Mobile-First**: All components designed for mobile first
2. **SEO-Native**: SEO optimization built into every component
3. **Conversion-Focused**: Strategic CTA placement throughout
4. **Accessible**: WCAG AA compliant
5. **Performance**: Lazy loading and optimization by default

### Related Documentation

- Requirements: `.kiro/specs/sharda-university-content-enhancement/requirements.md`
- Design: `.kiro/specs/sharda-university-content-enhancement/design.md`
- Tasks: `.kiro/specs/sharda-university-content-enhancement/tasks.md`
