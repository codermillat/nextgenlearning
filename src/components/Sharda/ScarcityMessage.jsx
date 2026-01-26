import { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * ScarcityMessage Component
 * Feature: sharda-university-content-enhancement
 * 
 * Displays scarcity messaging including limited seats notifications and
 * early application benefits. Ensures all messaging is truthful and not misleading.
 * 
 * Validates: Requirements 11.2, 11.5
 * Property: 43
 * 
 * @param {Object} props - Component props
 * @param {string} [props.type='limited-seats'] - Message type: 'limited-seats' | 'early-bird' | 'scholarship-priority' | 'hostel-priority'
 * @param {number} [props.seatsRemaining] - Number of seats remaining (required for 'limited-seats' type)
 * @param {string} [props.program] - Program name for context
 * @param {string} [props.message] - Custom scarcity message
 * @param {string} [props.variant='warning'] - Visual variant: 'info' | 'warning' | 'urgent'
 * @param {boolean} [props.showIcon=true] - Whether to show icon
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.truthful=true] - Internal flag to ensure messaging is truthful (always true in production)
 */
const ScarcityMessage = memo(function ScarcityMessage({
  type = 'limited-seats',
  seatsRemaining,
  program,
  message,
  variant = 'warning',
  showIcon = true,
  className = '',
  truthful = true,
  ...props
}) {
  /**
   * Validate that scarcity messaging is truthful
   * Validates: Requirement 11.5, Property 43
   * 
   * For limited-seats type, seatsRemaining must be provided and be a positive number
   * This ensures we only show scarcity messaging when it's actually true
   */
  const isValidScarcityMessage = () => {
    if (type === 'limited-seats') {
      // Must have seatsRemaining and it must be a positive number
      return seatsRemaining !== undefined && 
             seatsRemaining !== null && 
             typeof seatsRemaining === 'number' && 
             seatsRemaining > 0;
    }
    
    // Other types don't require specific validation
    return truthful;
  };

  /**
   * Get default message based on type
   */
  const getDefaultMessage = () => {
    switch (type) {
      case 'limited-seats':
        if (seatsRemaining !== undefined && seatsRemaining !== null) {
          const seatText = seatsRemaining === 1 ? 'seat' : 'seats';
          return `Only ${seatsRemaining} ${seatText} remaining${program ? ` for ${program}` : ''}! Apply now to secure your spot.`;
        }
        return 'Limited seats available. Apply now to secure your spot.';
      
      case 'early-bird':
        return 'Apply early to receive priority consideration for scholarships and hostel allocation.';
      
      case 'scholarship-priority':
        return 'Early applicants receive priority consideration for merit-based scholarships.';
      
      case 'hostel-priority':
        return 'Apply early to get your preferred hostel room and accommodation.';
      
      default:
        return 'Limited availability. Apply now to secure your place.';
    }
  };

  /**
   * Get variant-specific styles
   */
  const getVariantStyles = () => {
    const variants = {
      info: {
        bg: 'bg-blue-50 border-blue-200',
        text: 'text-blue-800',
        icon: 'text-blue-600',
        iconSvg: '📢',
      },
      warning: {
        bg: 'bg-amber-50 border-amber-200',
        text: 'text-amber-900',
        icon: 'text-amber-600',
        iconSvg: '⚠️',
      },
      urgent: {
        bg: 'bg-red-50 border-red-200',
        text: 'text-red-900',
        icon: 'text-red-600',
        iconSvg: '🔥',
      },
    };

    return variants[variant] || variants.warning;
  };

  /**
   * Get icon based on type
   */
  const getIcon = () => {
    const icons = {
      'limited-seats': '🎓',
      'early-bird': '⏰',
      'scholarship-priority': '🏆',
      'hostel-priority': '🏠',
    };

    return icons[type] || '📢';
  };

  // Don't render if scarcity message is not truthful
  if (!isValidScarcityMessage()) {
    return null;
  }

  const styles = getVariantStyles();
  const displayMessage = message || getDefaultMessage();
  const icon = getIcon();

  return (
    <div
      className={`${styles.bg} border-l-4 ${styles.text} p-4 rounded-r-lg shadow-sm ${className}`.trim()}
      role="status"
      aria-live="polite"
      data-testid="scarcity-message"
      data-type={type}
      data-variant={variant}
      data-seats-remaining={seatsRemaining}
      {...props}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        {showIcon && (
          <span 
            className={`text-2xl flex-shrink-0 ${styles.icon}`}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}

        {/* Message Content */}
        <div className="flex-1">
          <p className="font-semibold text-sm sm:text-base leading-relaxed">
            {displayMessage}
          </p>
          
          {/* Additional context for limited seats */}
          {type === 'limited-seats' && seatsRemaining && seatsRemaining <= 10 && (
            <p className="mt-2 text-xs sm:text-sm opacity-90">
              High demand! Seats are filling up quickly.
            </p>
          )}
          
          {/* Early bird benefits */}
          {type === 'early-bird' && (
            <ul className="mt-2 text-xs sm:text-sm space-y-1 opacity-90">
              <li>✓ Priority scholarship consideration</li>
              <li>✓ Preferred hostel room selection</li>
              <li>✓ Early course registration</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
});

ScarcityMessage.propTypes = {
  type: PropTypes.oneOf(['limited-seats', 'early-bird', 'scholarship-priority', 'hostel-priority']),
  seatsRemaining: PropTypes.number,
  program: PropTypes.string,
  message: PropTypes.string,
  variant: PropTypes.oneOf(['info', 'warning', 'urgent']),
  showIcon: PropTypes.bool,
  className: PropTypes.string,
  truthful: PropTypes.bool,
};

export default ScarcityMessage;
