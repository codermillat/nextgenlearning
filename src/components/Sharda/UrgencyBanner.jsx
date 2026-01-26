import { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useReducedMotion from '../../hooks/useReducedMotion';

/**
 * UrgencyBanner Component
 * Feature: sharda-university-content-enhancement
 * 
 * Displays urgency messaging including countdown timers for deadlines,
 * "Applications Open" banners, and dynamic date-based messaging.
 * Respects prefers-reduced-motion for accessibility.
 * 
 * Validates: Requirements 11.1, 11.3, 11.4, 11.6, 19.6
 * Properties: 42, 44
 * 
 * @param {Object} props - Component props
 * @param {string} [props.type='admission-open'] - Banner type: 'admission-open' | 'deadline' | 'scholarship-deadline' | 'early-bird'
 * @param {Date} [props.deadline] - Deadline date for countdown (required for 'deadline' and 'scholarship-deadline' types)
 * @param {string} [props.message] - Custom message to display
 * @param {string} [props.variant='info'] - Visual variant: 'info' | 'warning' | 'success' | 'urgent'
 * @param {boolean} [props.showCountdown=true] - Whether to show countdown timer
 * @param {string} [props.className] - Additional CSS classes
 * @param {Function} [props.onClose] - Callback when banner is dismissed
 * @param {boolean} [props.dismissible=false] - Whether banner can be dismissed
 */
const UrgencyBanner = memo(function UrgencyBanner({
  type = 'admission-open',
  deadline,
  message,
  variant = 'info',
  showCountdown = true,
  className = '',
  onClose,
  dismissible = false,
  ...props
}) {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  /**
   * Calculate time remaining until deadline
   * Validates: Requirement 11.1, 11.6
   */
  useEffect(() => {
    if (!deadline || !showCountdown) return;

    const calculateTimeRemaining = () => {
      const now = new Date();
      const deadlineDate = new Date(deadline);
      const diff = deadlineDate - now;

      if (diff <= 0) {
        setTimeRemaining(null);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Update every second (or every 10 seconds if reduced motion is preferred)
    const updateInterval = prefersReducedMotion ? 10000 : 1000;
    const interval = setInterval(calculateTimeRemaining, updateInterval);

    return () => clearInterval(interval);
  }, [deadline, showCountdown, prefersReducedMotion]);

  /**
   * Get default message based on type
   * Validates: Requirement 11.3, 11.4
   */
  const getDefaultMessage = () => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;

    switch (type) {
      case 'admission-open':
        return `Applications Open for ${currentYear}-${nextYear.toString().slice(-2)} Academic Year`;
      case 'deadline':
        return 'Application Deadline Approaching';
      case 'scholarship-deadline':
        return 'Scholarship Application Deadline';
      case 'early-bird':
        return 'Apply Early for Priority Consideration';
      default:
        return 'Important Announcement';
    }
  };

  /**
   * Get variant-specific styles
   */
  const getVariantStyles = () => {
    const variants = {
      info: {
        bg: 'bg-gradient-to-r from-blue-600 to-indigo-600',
        text: 'text-white',
        icon: '📢',
      },
      warning: {
        bg: 'bg-gradient-to-r from-amber-500 to-orange-600',
        text: 'text-white',
        icon: '⚠️',
      },
      success: {
        bg: 'bg-gradient-to-r from-green-600 to-emerald-600',
        text: 'text-white',
        icon: '✅',
      },
      urgent: {
        bg: 'bg-gradient-to-r from-red-600 to-rose-600',
        text: 'text-white',
        icon: '🔥',
      },
    };

    return variants[variant] || variants.info;
  };

  /**
   * Handle banner dismissal
   */
  const handleDismiss = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  /**
   * Check if banner should be displayed based on deadline
   * Validates: Property 42 - Display urgency messaging within 30 days of deadline
   */
  const shouldDisplay = () => {
    if (!deadline) return true;

    const now = new Date();
    const deadlineDate = new Date(deadline);
    const daysUntilDeadline = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));

    // Only show if deadline is within 30 days and hasn't passed
    return daysUntilDeadline > 0 && daysUntilDeadline <= 30;
  };

  // Don't render if not visible or shouldn't display
  if (!isVisible || !shouldDisplay()) {
    return null;
  }

  const styles = getVariantStyles();
  const displayMessage = message || getDefaultMessage();

  return (
    <div
      className={`${styles.bg} ${styles.text} py-3 px-4 sm:px-6 shadow-lg relative ${className}`.trim()}
      role="alert"
      aria-live="polite"
      data-testid="urgency-banner"
      data-type={type}
      data-variant={variant}
      {...props}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        {/* Icon */}
        <span className="text-2xl" aria-hidden="true">
          {styles.icon}
        </span>

        {/* Message */}
        <div className="flex-1 text-center sm:text-left">
          <p className="font-bold text-base sm:text-lg">
            {displayMessage}
          </p>
        </div>

        {/* Countdown Timer */}
        {showCountdown && timeRemaining && (
          <div className="flex gap-2 sm:gap-3 items-center">
            {timeRemaining.days > 0 && (
              <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 min-w-[50px]">
                <div className="text-xl sm:text-2xl font-bold">{timeRemaining.days}</div>
                <div className="text-xs uppercase">Days</div>
              </div>
            )}
            <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 min-w-[50px]">
              <div className="text-xl sm:text-2xl font-bold">{timeRemaining.hours}</div>
              <div className="text-xs uppercase">Hours</div>
            </div>
            <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 min-w-[50px]">
              <div className="text-xl sm:text-2xl font-bold">{timeRemaining.minutes}</div>
              <div className="text-xs uppercase">Mins</div>
            </div>
          </div>
        )}

        {/* Dismiss Button */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 sm:relative sm:top-0 sm:right-0 text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Dismiss banner"
            data-testid="dismiss-button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
});

UrgencyBanner.propTypes = {
  type: PropTypes.oneOf(['admission-open', 'deadline', 'scholarship-deadline', 'early-bird']),
  deadline: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  message: PropTypes.string,
  variant: PropTypes.oneOf(['info', 'warning', 'success', 'urgent']),
  showCountdown: PropTypes.bool,
  className: PropTypes.string,
  onClose: PropTypes.func,
  dismissible: PropTypes.bool,
};

export default UrgencyBanner;
