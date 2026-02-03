import { memo } from 'react';
import PropTypes from 'prop-types';
import { generateUTMLink } from '../../utils/utmGenerator';
import { logCTAClick } from '../../utils/conversionEventLogger';

/**
 * ApplicationCTA Component
 * Feature: sharda-university-content-enhancement
 * 
 * Standardized application CTA button for Sharda University with UTM tracking
 * and conversion event logging.
 * 
 * Validates: Requirements 1.3, 5.1, 5.5
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Button style variant: 'primary' | 'secondary' | 'floating'
 * @param {string} [props.program] - Program code if applicable (e.g., 'btech-cse')
 * @param {string} props.source - Page context for UTM tracking (e.g., 'landing', 'program-btech-cse')
 * @param {string} props.context - Content type for analytics (e.g., 'landing', 'program', 'comparison')
 * @param {string} [props.country='International'] - User's country for URL routing
 * @param {string} [props.action='apply-now'] - Specific action identifier
 * @param {string} [props.location='content'] - Location on page (e.g., 'hero', 'footer', 'floating')
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} [props.children] - Button content (defaults to "Apply Now")
 * @param {Object} [props.ariaLabel] - Accessibility label
 */
const ApplicationCTA = memo(function ApplicationCTA({
  variant = 'primary',
  program,
  source,
  context,
  country = 'International',
  action = 'apply-now',
  location = 'content',
  className = '',
  children = 'Apply Now',
  ariaLabel,
  ...props
}) {
  // Generate UTM-tracked link
  const applicationUrl = generateUTMLink({
    country,
    page: source,
    contentType: context,
    program,
    action,
  });

  // Handle click event with logging
  const handleClick = () => {
    // Log conversion event
    logCTAClick({
      ctaType: action,
      ctaLocation: location,
      targetUrl: applicationUrl,
      program,
      contentType: context,
    });

    // Allow default link behavior to continue
  };

  // Base classes for all variants
  const baseClasses = 'font-bold transition-all duration-200 min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg';

  // Variant-specific styles
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl transform hover:scale-105 focus:ring-blue-500 focus:ring-offset-2 px-6 sm:px-8 py-3 text-base sm:text-lg',
    secondary: 'bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-white focus:ring-offset-gray-800 px-6 sm:px-8 py-3 text-base sm:text-lg',
    floating: 'fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-2xl hover:shadow-3xl transform hover:scale-110 focus:ring-blue-500 focus:ring-offset-2 px-6 py-4 text-lg font-extrabold animate-pulse hover:animate-none rounded-full',
  };

  // Combine all classes
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  // Determine aria-label
  const accessibilityLabel = ariaLabel || `Apply to Sharda University${program ? ` for ${program}` : ''}`;

  return (
    <a
      href={applicationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      onClick={handleClick}
      aria-label={accessibilityLabel}
      data-testid="application-cta"
      data-variant={variant}
      data-context={context}
      data-program={program}
      {...props}
    >
      {children}
    </a>
  );
});

ApplicationCTA.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'floating']),
  program: PropTypes.string,
  source: PropTypes.string.isRequired,
  context: PropTypes.string.isRequired,
  country: PropTypes.string,
  action: PropTypes.string,
  location: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  ariaLabel: PropTypes.string,
};

export default ApplicationCTA;
