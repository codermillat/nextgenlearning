import MetaManager from './MetaManager';

/**
 * Example usage of MetaManager component
 * 
 * This component demonstrates how to use MetaManager to create
 * optimized meta descriptions and title tags following the formula:
 * [EMOJI] + [BENEFIT] + [SOCIAL PROOF] + [PRICE] + [URGENCY] + [CTA]
 */

// Example 1: Homepage
export function HomePageExample() {
  return (
    <MetaManager
      emoji="🎓"
      benefit="Study in India's Top Universities"
      socialProof="10,000+ students enrolled"
      price="From ₹1.2L/year"
      urgency="Apply by March 2026"
      cta="Apply Now"
      baseTitle="NextGen Learning"
      url="/"
    />
  );
}

// Example 2: University Detail Page
export function UniversityDetailExample() {
  return (
    <MetaManager
      emoji="🏆"
      benefit="Sharda University - NAAC A+ Accredited"
      socialProof="Rated 4.2/5 by 5,000+ students"
      price="Fees from ₹1.2L/year"
      urgency="Limited seats for 2026"
      cta="View Programs"
      baseTitle="Sharda University"
      url="/universities/sharda"
    />
  );
}

// Example 3: Course Detail Page
export function CourseDetailExample() {
  return (
    <MetaManager
      emoji="💻"
      benefit="B.Tech CSE - 100% Placement Support"
      socialProof="Average package ₹6.5 LPA"
      price="Total fees ₹7.2L"
      urgency="Admissions closing soon"
      cta="Apply Today"
      baseTitle="B.Tech Computer Science"
      url="/courses/btech-cse"
    />
  );
}

// Example 4: Minimal Usage (only required fields)
export function MinimalExample() {
  return (
    <MetaManager
      benefit="Explore top universities in India"
      cta="Browse Now"
      baseTitle="Universities"
      url="/universities"
    />
  );
}

// Example 5: With Custom Brand Name
export function CustomBrandExample() {
  return (
    <MetaManager
      emoji="📚"
      benefit="Scholarship opportunities for Bangladeshi students"
      socialProof="₹50,000+ scholarships awarded"
      urgency="Apply before deadline"
      cta="Check Eligibility"
      baseTitle="Scholarships for Bangladesh"
      brandName="NextGen"
      url="/scholarships/bangladesh"
    />
  );
}
