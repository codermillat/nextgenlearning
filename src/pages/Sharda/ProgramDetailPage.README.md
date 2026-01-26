# ProgramDetailPage Component

## Overview

`ProgramDetailPage` is a reusable template component for creating individual program pages at Sharda University. It provides a consistent structure and SEO optimization for all program pages.

## Features

- **SEO Optimized**: Includes meta tags, structured data (Course schema), and breadcrumb navigation
- **Comprehensive Sections**: Overview, Curriculum, Fees, Eligibility, Career Prospects
- **Interactive Elements**: Fee calculator, application CTAs, WhatsApp CTAs
- **Mobile Responsive**: Fully responsive design with mobile-optimized layouts
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support
- **Content Requirements**: Ensures 800+ words of unique content per page

## Usage

### Basic Example

```jsx
import ProgramDetailPage from './ProgramDetailPage';

const BTechCSEPage = () => {
  return (
    <ProgramDetailPage
      programId="btech-cse"
      pageTitle="B.Tech Computer Science Engineering at Sharda University 2026"
      metaDescription="B.Tech CSE at Sharda University: 4-year program with AI, ML specializations. ₹2.2L/year fees, up to 50% scholarship. 85% placement rate. Apply now!"
      keywords={[
        'sharda university btech cse',
        'computer science sharda',
        'btech cse fees sharda',
        'sharda university engineering',
      ]}
      canonicalPath="/sharda-university/programs/btech-cse"
      overview={`
        The B.Tech in Computer Science and Engineering at Sharda University is a comprehensive 4-year undergraduate program designed to prepare students for successful careers in the technology industry. The program combines theoretical knowledge with practical skills, covering fundamental computer science concepts and cutting-edge technologies.

        [... 800+ words of unique content ...]
      `}
      careerProspects={{
        roles: [
          'Software Engineer',
          'Data Scientist',
          'AI/ML Engineer',
          'Full Stack Developer',
          'Cloud Architect',
        ],
        industries: [
          'Information Technology',
          'Software Development',
          'Consulting',
          'E-commerce',
          'Financial Services',
        ],
        skills: [
          'Programming Languages',
          'Data Structures & Algorithms',
          'Machine Learning',
          'Cloud Computing',
          'Problem Solving',
        ],
      }}
      highlights={[
        {
          icon: '✓',
          title: 'NBA Accredited',
          description: 'Program accredited by National Board of Accreditation',
        },
        {
          icon: '💼',
          title: 'Excellent Placements',
          description: 'Top companies recruit with packages up to ₹17 LPA',
        },
        {
          icon: '🎓',
          title: 'Modern Curriculum',
          description: 'Industry-aligned curriculum with latest technologies',
        },
      ]}
      faqs={[
        {
          question: 'What is the duration of the B.Tech CSE program?',
          answer: 'The B.Tech CSE program is a 4-year undergraduate degree program.',
        },
        {
          question: 'What are the eligibility criteria?',
          answer: 'Minimum 60% in 10+2 with Physics, Chemistry, and Mathematics. JEE Main or Sharda University Entrance Test required.',
        },
      ]}
    />
  );
};

export default BTechCSEPage;
```

## Props

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `programId` | `string` | Program ID from shardaData (e.g., 'btech-cse', 'mba') |
| `pageTitle` | `string` | SEO page title (50-60 characters) |
| `metaDescription` | `string` | SEO meta description (150-160 characters) |
| `keywords` | `string[]` | Array of SEO keywords |
| `canonicalPath` | `string` | Canonical URL path (e.g., '/sharda-university/programs/btech-cse') |
| `overview` | `string` | Program overview content (minimum 800 words) |

### Optional Props

| Prop | Type | Description |
|------|------|-------------|
| `careerProspects` | `object` | Career information with roles, industries, and skills |
| `highlights` | `array` | Program highlights with icon, title, and description |
| `faqs` | `array` | Frequently asked questions with question and answer |

## Content Guidelines

### Overview Section (Required)

- **Minimum Length**: 800 words
- **Content Structure**:
  - Introduction to the program (2-3 paragraphs)
  - Program objectives and learning outcomes (2-3 paragraphs)
  - Key features and differentiators (2-3 paragraphs)
  - Industry relevance and career opportunities (2-3 paragraphs)
  - Why choose Sharda for this program (2-3 paragraphs)

- **SEO Best Practices**:
  - Include target keywords naturally throughout
  - Use variations of keywords
  - Write for humans first, search engines second
  - Include internal links to related pages

### Career Prospects (Optional but Recommended)

Provide comprehensive career information:

```jsx
careerProspects={{
  roles: [
    'Job Role 1',
    'Job Role 2',
    // ... 5-8 roles
  ],
  industries: [
    'Industry 1',
    'Industry 2',
    // ... 5-8 industries
  ],
  skills: [
    'Skill 1',
    'Skill 2',
    // ... 5-8 skills
  ],
}}
```

### Highlights (Optional but Recommended)

Showcase 3-6 key program highlights:

```jsx
highlights={[
  {
    icon: '✓', // Emoji or icon
    title: 'Highlight Title',
    description: 'Brief description of the highlight',
  },
  // ... more highlights
]}
```

### FAQs (Optional but Recommended)

Include 5-10 frequently asked questions:

```jsx
faqs={[
  {
    question: 'Question text?',
    answer: 'Detailed answer with relevant information.',
  },
  // ... more FAQs
]}
```

## SEO Features

### Structured Data

The component automatically generates:

1. **Course Schema**: Includes program name, provider, fees, duration
2. **Breadcrumb Schema**: Navigation hierarchy
3. **FAQ Schema**: If FAQs are provided

### Meta Tags

- Title tag (optimized for search engines)
- Meta description
- Keywords meta tag
- Canonical URL
- Open Graph tags (inherited from SEOMetaTags)

### Internal Linking

The component includes internal links to:
- Home page
- Sharda University landing page
- Scholarship information page
- Related program pages (via breadcrumbs)

## Accessibility Features

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly
- Proper heading hierarchy (H1 → H2 → H3)
- Alt text for icons (via aria-hidden)

## Mobile Optimization

- Mobile-first responsive design
- Touch-friendly interactive elements
- Responsive tables (converts to cards on mobile)
- Optimized font sizes for mobile
- Mobile-optimized CTAs

## Integration with Existing Components

The template integrates with:

- `SEOMetaTags`: For meta tag management
- `StructuredData`: For JSON-LD schema
- `ApplicationCTA`: For application buttons
- `WhatsAppCTA`: For WhatsApp engagement
- `FeeCalculator`: For interactive fee calculation
- `shardaData`: For program information

## Creating New Program Pages

### Step 1: Create Program Page File

Create a new file in `src/pages/Sharda/` (e.g., `ShardaBTechCSE.jsx`):

```jsx
import ProgramDetailPage from './ProgramDetailPage';

const ShardaBTechCSE = () => {
  return (
    <ProgramDetailPage
      programId="btech-cse"
      pageTitle="..."
      metaDescription="..."
      keywords={[...]}
      canonicalPath="/sharda-university/programs/btech-cse"
      overview={`...`}
      careerProspects={{...}}
      highlights={[...]}
      faqs={[...]}
    />
  );
};

export default ShardaBTechCSE;
```

### Step 2: Add Route

Add the route in `src/App.jsx`:

```jsx
import ShardaBTechCSE from './pages/Sharda/ShardaBTechCSE';

// In Routes:
<Route path="/sharda-university/programs/btech-cse" element={<ShardaBTechCSE />} />
```

### Step 3: Update Sitemap

Add the new page to `public/sitemap.xml`:

```xml
<url>
  <loc>https://yourdomain.com/sharda-university/programs/btech-cse</loc>
  <lastmod>2026-01-26</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### Step 4: Add Internal Links

Add links to the new page from:
- Sharda landing page
- Program finder results
- Related program pages

## Testing

### Unit Tests

Test the component with different props:

```jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProgramDetailPage from './ProgramDetailPage';

describe('ProgramDetailPage', () => {
  it('renders program information correctly', () => {
    render(
      <BrowserRouter>
        <ProgramDetailPage
          programId="btech-cse"
          pageTitle="Test Program"
          metaDescription="Test description"
          keywords={['test']}
          canonicalPath="/test"
          overview="Test overview content..."
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Test Program/i)).toBeInTheDocument();
  });
});
```

### SEO Validation

1. Validate structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Check meta tags with browser dev tools
3. Verify canonical URLs
4. Test breadcrumb navigation

### Accessibility Testing

1. Run automated tests with jest-axe
2. Test keyboard navigation
3. Verify screen reader compatibility
4. Check color contrast ratios

## Best Practices

1. **Content Quality**: Write unique, valuable content (minimum 800 words)
2. **Keyword Optimization**: Include target keywords naturally
3. **Internal Linking**: Link to related pages and resources
4. **Mobile First**: Test on mobile devices first
5. **Performance**: Optimize images and lazy load below-fold content
6. **Accessibility**: Follow WCAG 2.1 AA guidelines
7. **SEO**: Validate structured data and meta tags
8. **User Experience**: Clear CTAs and easy navigation

## Requirements Validation

This component satisfies the following requirements:

- **Requirement 3.7**: Individual pages for each program with detailed fee breakdowns
- **Requirement 4.1**: Minimum 800 words unique content per page
- **Requirement 4.4**: Course structured data schema
- **Requirement 14.4**: Breadcrumb navigation

## Related Components

- `ShardaLandingPage`: Main Sharda University page
- `FeeCalculator`: Interactive fee calculator
- `ApplicationCTA`: Application call-to-action
- `WhatsAppCTA`: WhatsApp engagement
- `SEOMetaTags`: Meta tag management
- `StructuredData`: JSON-LD schema

## Support

For questions or issues with the ProgramDetailPage template, refer to:
- Design document: `.kiro/specs/sharda-university-content-enhancement/design.md`
- Requirements document: `.kiro/specs/sharda-university-content-enhancement/requirements.md`
- Sharda data: `src/data/shardaData.ts`
