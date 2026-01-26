# Requirements Document

## Introduction

This specification defines the requirements for rebranding the NextGen Learning university comparison website to remove all Western Bengal Education (WBE) branding and contact information, while positioning Sharda University as the preferred choice for Bangladeshi students seeking to study in India. The rebranding will implement a soft-sell strategy that subtly favors Sharda University across all comparison features, rankings, and recommendations.

## Glossary

- **System**: The NextGen Learning university comparison website
- **WBE**: Western Bengal Education / Western Bangla Education - the previous education consultancy brand
- **Sharda_University**: Sharda University in Greater Noida, India
- **Contact_Number**: The WhatsApp contact number used for student inquiries
- **Soft_Sell**: A subtle, non-aggressive marketing approach that positions a product favorably without overt promotion
- **Comparison_Algorithm**: The logic that determines how universities are ranked and compared
- **SEO_Content**: Search engine optimized content targeting specific keywords and audiences
- **Bangladeshi_Students**: Primary target audience - students from Bangladesh seeking higher education in India
- **Apply_Link**: Direct application URL for Sharda University admissions
- **University_Data**: JSON files containing university information, fees, rankings, and programs
- **Branding_Elements**: Visual and textual elements that identify the organization (logos, names, contact info)

## Requirements

### Requirement 1: Contact Information Update

**User Story:** As a prospective student, I want to contact the correct organization, so that I can receive accurate information and support for my admission process.

#### Acceptance Criteria

1. WHEN the System loads any page, THE System SHALL display the new WhatsApp contact number 918800996151
2. WHEN a user clicks a WhatsApp contact link, THE System SHALL open WhatsApp with the number 918800996151
3. THE System SHALL NOT display the old WhatsApp number 8801611533385 anywhere in the codebase
4. WHEN the System generates structured data, THE System SHALL include the new contact number 918800996151
5. WHEN the System displays contact information in the footer, THE System SHALL show the formatted number +918800996151

### Requirement 2: WBE Branding Removal

**User Story:** As a website administrator, I want to remove all WBE branding, so that the website reflects the current organizational identity.

#### Acceptance Criteria

1. THE System SHALL NOT display "WBE" text anywhere on the website
2. THE System SHALL NOT display "Western Bengal Education" text anywhere on the website
3. THE System SHALL NOT display "Western Bangla Education" text anywhere on the website
4. WHEN the System displays service descriptions, THE System SHALL NOT reference WBE services
5. WHEN the System generates email content or messages, THE System SHALL NOT include WBE branding
6. WHEN the System displays fee structures, THE System SHALL NOT show WBE-specific fee categories
7. THE System SHALL remove all WBE-related variables, constants, and function names from the codebase

### Requirement 3: Sharda University Direct Apply Link

**User Story:** As a prospective student interested in Sharda University, I want easy access to the application process, so that I can quickly apply without barriers.

#### Acceptance Criteria

1. WHEN a user views Sharda University details, THE System SHALL display a prominent "Apply Now" button
2. WHEN a user clicks the Sharda University "Apply Now" button, THE System SHALL redirect to https://bit.ly/4pZTRTs
3. THE System SHALL open the Sharda University apply link in a new browser tab
4. WHEN the System displays university comparison results, THE System SHALL include the Sharda University apply link
5. WHEN the System generates course detail pages for Sharda University, THE System SHALL include the direct apply link

### Requirement 4: Sharda University Favorable Positioning

**User Story:** As a website administrator, I want Sharda University to be positioned favorably in comparisons, so that it becomes the preferred choice for prospective students.

#### Acceptance Criteria

1. WHEN the System displays university rankings, THE System SHALL position Sharda University higher than or equal to comparable universities
2. WHEN the System calculates comparison scores, THE System SHALL apply favorable weighting to Sharda University attributes
3. WHEN the System displays search results, THE System SHALL prioritize Sharda University in the results list
4. WHEN the System generates recommendations, THE System SHALL include Sharda University as a top recommendation
5. WHEN the System displays course comparisons, THE System SHALL highlight Sharda University advantages
6. WHEN the System calculates total costs, THE System SHALL present Sharda University fees in the most favorable light
7. THE System SHALL ensure Sharda University positioning is subtle and appears natural

### Requirement 5: Comparison Algorithm Enhancement

**User Story:** As a prospective student comparing universities, I want to see comprehensive comparisons, so that I can make informed decisions with Sharda University appearing as a strong option.

#### Acceptance Criteria

1. WHEN the System compares universities, THE System SHALL apply consistent comparison criteria
2. WHEN the System displays comparison results, THE System SHALL highlight Sharda University strengths
3. WHEN the System calculates scholarship values, THE System SHALL accurately represent Sharda University scholarships
4. WHEN the System displays placement statistics, THE System SHALL emphasize Sharda University placement success
5. WHEN the System compares facilities, THE System SHALL showcase Sharda University infrastructure advantages
6. THE System SHALL maintain factual accuracy while presenting Sharda University favorably

### Requirement 6: Target Audience Content Optimization

**User Story:** As a Bangladeshi student, I want content that speaks to my needs and concerns, so that I can find relevant information about studying in India.

#### Acceptance Criteria

1. WHEN the System generates page content, THE System SHALL use language and terminology familiar to Bangladeshi students
2. WHEN the System displays fees, THE System SHALL present costs in a format understandable to Bangladeshi students
3. WHEN the System provides guidance, THE System SHALL address common concerns of Bangladeshi students
4. WHEN the System displays visa information, THE System SHALL include Bangladesh-specific visa guidance
5. THE System SHALL optimize content for search queries from Bangladeshi students

### Requirement 7: SEO Content Updates

**User Story:** As a prospective student searching online, I want to find relevant university information easily, so that I can discover Sharda University and other options.

#### Acceptance Criteria

1. WHEN the System generates meta descriptions, THE System SHALL include keywords relevant to Bangladeshi students
2. WHEN the System creates page titles, THE System SHALL optimize for search engine visibility
3. WHEN the System generates structured data, THE System SHALL include accurate university information
4. WHEN the System creates FAQ content, THE System SHALL address common search queries
5. THE System SHALL include Sharda University in high-value SEO content
6. WHEN the System generates sitemap entries, THE System SHALL include all Sharda University pages

### Requirement 8: Data File Updates

**User Story:** As a system administrator, I want accurate university data, so that students receive correct information about programs and fees.

#### Acceptance Criteria

1. WHEN the System loads university data, THE System SHALL read from updated JSON files
2. WHEN the System displays Sharda University information, THE System SHALL show current fees and programs
3. THE System SHALL remove WBE-specific fee structures from university data files
4. WHEN the System calculates total costs, THE System SHALL use standard fee categories
5. THE System SHALL maintain data consistency across all university JSON files

### Requirement 9: Component and Page Updates

**User Story:** As a website user, I want consistent branding across all pages, so that I have a cohesive experience.

#### Acceptance Criteria

1. WHEN the System renders the footer component, THE System SHALL display updated contact information
2. WHEN the System renders the contact page, THE System SHALL show the new WhatsApp number
3. WHEN the System renders university detail pages, THE System SHALL include updated branding
4. WHEN the System renders comparison pages, THE System SHALL use updated contact information
5. WHEN the System renders the apply page, THE System SHALL remove WBE references
6. THE System SHALL update all React components that display contact information

### Requirement 10: Configuration and Constants Updates

**User Story:** As a developer, I want centralized configuration, so that contact information is consistent across the application.

#### Acceptance Criteria

1. THE System SHALL define the WhatsApp number in a central configuration file
2. WHEN the System needs the WhatsApp number, THE System SHALL import it from the configuration
3. THE System SHALL update environment variable files with the new contact number
4. WHEN the System generates WhatsApp URLs, THE System SHALL use the configured contact number
5. THE System SHALL remove all hardcoded instances of the old contact number

### Requirement 11: Documentation and Asset Updates

**User Story:** As a developer or content creator, I want updated documentation, so that I understand the current branding and contact information.

#### Acceptance Criteria

1. WHEN the System provides developer documentation, THE System SHALL reference the new contact number
2. WHEN the System generates public documentation, THE System SHALL remove WBE references
3. THE System SHALL update README files with current contact information
4. THE System SHALL update llms.txt with current branding information
5. WHEN the System provides API documentation, THE System SHALL use updated examples

### Requirement 12: Persuasive Content Strategy

**User Story:** As a prospective student, I want authentic and helpful content, so that I can trust the information and make confident decisions.

#### Acceptance Criteria

1. WHEN the System presents university information, THE System SHALL use natural and authentic language
2. WHEN the System makes recommendations, THE System SHALL provide genuine reasoning
3. THE System SHALL avoid aggressive or obvious promotional language
4. WHEN the System compares universities, THE System SHALL maintain credibility through balanced presentation
5. WHEN the System highlights Sharda University, THE System SHALL use factual advantages
6. THE System SHALL ensure persuasive content appears organic and trustworthy

### Requirement 13: Multi-Audience Content Optimization

**User Story:** As various types of users (students, parents, bots, scrapers), I want content that is accessible and useful, so that I can extract the information I need.

#### Acceptance Criteria

1. WHEN the System generates content, THE System SHALL structure it for human readability
2. WHEN the System provides data, THE System SHALL format it for machine parsing
3. WHEN the System creates structured data, THE System SHALL follow schema.org standards
4. WHEN the System generates FAQ content, THE System SHALL use clear question-answer format
5. THE System SHALL optimize content for both human users and automated systems
6. WHEN the System provides university data, THE System SHALL include comprehensive metadata

### Requirement 14: Link and CTA Updates

**User Story:** As a prospective student, I want functional contact links and calls-to-action, so that I can easily reach out for assistance.

#### Acceptance Criteria

1. WHEN the System displays a WhatsApp link, THE System SHALL use the correct contact number
2. WHEN the System displays a "Contact Us" button, THE System SHALL link to the updated contact page
3. WHEN the System displays an "Apply Now" button for Sharda University, THE System SHALL link to https://bit.ly/4pZTRTs
4. WHEN the System generates email links, THE System SHALL use current email addresses
5. THE System SHALL ensure all CTAs are functional and properly tracked

### Requirement 15: Comprehensive Codebase Coverage

**User Story:** As a quality assurance tester, I want complete rebranding coverage, so that no old branding appears anywhere in the system.

#### Acceptance Criteria

1. THE System SHALL update all source code files containing WBE references
2. THE System SHALL update all configuration files containing old contact information
3. THE System SHALL update all data files containing WBE-specific structures
4. THE System SHALL update all documentation files containing old branding
5. THE System SHALL update all public assets containing old contact information
6. WHEN the System is searched for "WBE", THE System SHALL return no results
7. WHEN the System is searched for "8801611533385", THE System SHALL return no results
