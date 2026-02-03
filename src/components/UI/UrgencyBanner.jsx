import { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * UrgencyBanner Component
 * Feature: seo-overhaul
 * 
 * Displays time-sensitive information to create urgency and drive conversions.
 * Includes deadline information, seat availability, and call-to-action buttons.
 * 
 * Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5, 4.7
 * 
 * @param {Object} props - Component props
 * @param {string|Date} [props.deadline] - Application deadline date
 * @param {number} [props.seatsLeft] - Number of seats remaining
 * @param {string} props.ctaText - Call-to-action button text
 * @param {string} props.ctaLink - Call-to-action button link
 * @param {string} [props.variant='homepage'] - Banner variant: 'homepage' | 'university' | 'course'
 */
const UrgencyBanner = memo(function UrgencyBanner({
  deadline,
  seatsLeft,
  ctaText,
  ctaLink,
  variant = 'homepage',
}) {
  /**
   * Format deadline into human-readable format
   * Validates: Requirement 4.1, 4.2
   * 
   * @param {string|Date} date - Deadline date
   * @returns {string} Formatted deadline string
   */
  const formatDeadline = (date) => {
    if (!date) return null;

    try {
      const deadlineDate = new Date(date);
      
      // Check if date is valid
      if (isNaN(deadlineDate.getTime())) {
        return null;
      }

      const now = new Date();
      const diffTime = deadlineDate - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // If deadline has passed, don't show it
      if (diffDays < 0) {
        return null;
      }

      // Format based on time remaining
      if (diffDays === 0) {
        return 'Deadline: Today!';
      } else if (diffDays === 1) {
        return 'Deadline: Tomorrow';
      } else if (diffDays <= 7) {
        return `Deadline: ${diffDays} days left`;
      } else if (diffDays <= 30) {
        return `Deadline: ${Math.ceil(diffDays / 7)} weeks left`;
      } else {
        // Format as readable date
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return `Deadline: ${deadlineDate.toLocaleDateString('en-US', options)}`;
      }
    } catch {
      // Invalid date format - return null
      return null;
    }
  };

  /**
   * Calculate urgency level based on deadline proximity and seats left
   * Validates: Requirement 4.6
   * 
   * @returns {'high' | 'medium' | 'low'} Urgency level
   */
  const calculateUrgencyLevel = () => {
    let urgencyScore = 0;

    // Factor 1: Deadline proximity
    if (deadline) {
      try {
        const deadlineDate = new Date(deadline);
        if (!isNaN(deadlineDate.getTime())) {
          const now = new Date();
          const diffDays = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));

          if (diffDays <= 3) {
            urgencyScore += 3;
          } else if (diffDays <= 7) {
            urgencyScore += 2;
          } else if (diffDays <= 14) {
            urgencyScore += 1;
          }
        }
      } catch {
        // Invalid date - no urgency from deadline
      }
    }

    // Factor 2: Seats remaining
    if (typeof seatsLeft === 'number' && seatsLeft >= 0) {
      if (seatsLeft <= 5) {
        urgencyScore += 3;
      } else if (seatsLeft <= 20) {
        urgencyScore += 2;
      } else if (seatsLeft <= 50) {
        urgencyScore += 1;
      }
    }

    // Determine urgency level
    if (urgencyScore >= 4) {
      return 'high';
    } else if (urgencyScore >= 2) {
      return 'medium';
    } else {
      return 'low';
    }
  };

  /**
   * Render call-to-action button
   * Validates: Requirement 4.5
   * 
   * @returns {JSX.Element} CTA button element
   */
  const renderCTA = () => {
    const urgencyLevel = calculateUrgencyLevel();
    
    // Base button classes
    const baseClasses = 'font-bold transition-all duration-200 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[44px] flex items-center justify-center';
    
    // Urgency-based styling
    const urgencyClasses = {
      high: 'bg-red-600 hover:bg-red-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 focus:ring-red-500 animate-pulse',
      medium: 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-orange-500',
      low: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 focus:ring-blue-500',
    };

    const buttonClasses = `${baseClasses} ${urgencyClasses[urgencyLevel]}`;

    return (
      <a
        href={ctaLink}
        className={buttonClasses}
        data-testid="urgency-cta"
      >
        {ctaText}
      </a>
    );
  };

  // Handle missing urgency data gracefully - return null if no data
  // Validates: Requirement 4.7
  const formattedDeadline = formatDeadline(deadline);
  
  // If no valid deadline and no seatsLeft, don't render
  if (!formattedDeadline && (seatsLeft === null || seatsLeft === undefined)) {
    return null;
  }
  const urgencyLevel = calculateUrgencyLevel();

  // Get variant-specific styling
  const variantStyles = {
    homepage: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    university: 'bg-gradient-to-r from-purple-600 to-pink-600',
    course: 'bg-gradient-to-r from-green-600 to-teal-600',
  };

  const backgroundClass = variantStyles[variant] || variantStyles.homepage;

  return (
    <div
      className={`${backgroundClass} text-white py-6 px-4 sm:px-6 shadow-lg`}
      role="alert"
      aria-live="polite"
      data-testid="urgency-banner"
      data-variant={variant}
      data-urgency-level={urgencyLevel}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Urgency Information */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              {/* Deadline */}
              {formattedDeadline && (
                <div className="flex items-center gap-2">
                  <span className="text-2xl" aria-hidden="true">⏰</span>
                  <span className="font-bold text-lg" data-testid="deadline-text">
                    {formattedDeadline}
                  </span>
                </div>
              )}

              {/* Seats Left */}
              {typeof seatsLeft === 'number' && seatsLeft >= 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-2xl" aria-hidden="true">🎓</span>
                  <span className="font-bold text-lg" data-testid="seats-text">
                    {seatsLeft === 0 ? 'No seats left' : `Only ${seatsLeft} seats left`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="flex-shrink-0">
            {renderCTA()}
          </div>
        </div>
      </div>
    </div>
  );
});

UrgencyBanner.propTypes = {
  deadline: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  seatsLeft: PropTypes.number,
  ctaText: PropTypes.string.isRequired,
  ctaLink: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['homepage', 'university', 'course']),
};

export default UrgencyBanner;
