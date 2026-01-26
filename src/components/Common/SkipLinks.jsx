/**
 * SkipLinks Component
 * 
 * Provides skip navigation links for keyboard and screen reader users
 * to quickly navigate to main content areas.
 * 
 * WCAG 2.1 AA Compliance: Requirement 19.3
 */

export default function SkipLinks() {
  const skipLinkClass = "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:transition-all";

  return (
    <>
      {/* Skip to main content */}
      <a
        href="#main-content"
        className={`${skipLinkClass} focus:left-4`}
      >
        Skip to main content
      </a>
      
      {/* Skip to navigation */}
      <a
        href="#main-navigation"
        className={`${skipLinkClass} focus:left-48`}
      >
        Skip to navigation
      </a>
    </>
  );
}
