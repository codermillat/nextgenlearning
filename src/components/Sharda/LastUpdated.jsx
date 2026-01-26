import React from 'react';
import PropTypes from 'prop-types';

/**
 * LastUpdated Component
 * 
 * Displays "Last Updated" timestamp and current admission cycle year
 * on key information pages (fees, rankings, admissions).
 * 
 * Feature: sharda-university-content-enhancement
 * Validates: Requirements 16.1, 16.2
 * Property 62: Last Updated Timestamp
 */
const LastUpdated = ({ 
  date, 
  admissionCycle,
  showAdmissionCycle = true,
  className = '',
  variant = 'default' // 'default', 'compact', 'inline'
}) => {
  // Format the date
  const formatDate = (dateInput) => {
    if (!dateInput) return null;
    
    const dateObj = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    
    if (isNaN(dateObj.getTime())) return null;
    
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get current admission cycle if not provided
  const getCurrentAdmissionCycle = () => {
    // Use the provided date for cycle calculation if available
    const referenceDate = date ? (typeof date === 'string' ? new Date(date) : date) : new Date();
    
    // If date is invalid, use current date
    if (isNaN(referenceDate.getTime())) {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      
      if (currentMonth < 6) {
        return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
      } else {
        return `${currentYear + 1}-${(currentYear + 2).toString().slice(-2)}`;
      }
    }
    
    const currentYear = referenceDate.getFullYear();
    const currentMonth = referenceDate.getMonth(); // 0-11
    
    // If we're in Jan-June, show current year to next year
    // If we're in July-Dec, show next year to year after
    if (currentMonth < 6) {
      return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
    } else {
      return `${currentYear + 1}-${(currentYear + 2).toString().slice(-2)}`;
    }
  };

  const formattedDate = formatDate(date);
  const cycle = admissionCycle || getCurrentAdmissionCycle();

  // Variant styles
  const variantStyles = {
    default: 'bg-blue-50 border border-blue-200 rounded-lg p-4',
    compact: 'bg-gray-50 border-l-4 border-blue-500 px-4 py-2',
    inline: 'inline-flex items-center gap-2'
  };

  const textStyles = {
    default: 'text-sm text-gray-600',
    compact: 'text-xs text-gray-500',
    inline: 'text-xs text-gray-500'
  };

  const iconStyles = {
    default: 'w-5 h-5',
    compact: 'w-4 h-4',
    inline: 'w-3 h-3'
  };

  if (!formattedDate && !showAdmissionCycle) {
    return null;
  }

  return (
    <div 
      className={`${variantStyles[variant]} ${className}`}
      data-testid="last-updated"
      role="contentinfo"
      aria-label="Content freshness information"
    >
      <div className={`flex flex-col ${variant === 'inline' ? 'sm:flex-row' : ''} gap-2`}>
        {formattedDate && (
          <div className="flex items-center gap-2">
            <svg 
              className={`${iconStyles[variant]} text-blue-600 flex-shrink-0`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <span className={textStyles[variant]}>
              <span className="font-medium">Last Updated:</span>{' '}
              <time dateTime={date instanceof Date ? date.toISOString() : date}>
                {formattedDate}
              </time>
            </span>
          </div>
        )}
        
        {showAdmissionCycle && (
          <div className="flex items-center gap-2">
            <svg 
              className={`${iconStyles[variant]} text-green-600 flex-shrink-0`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <span className={textStyles[variant]}>
              <span className="font-medium">Admission Cycle:</span>{' '}
              <span className="text-green-700 font-semibold">{cycle}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

LastUpdated.propTypes = {
  /** Date when the content was last updated (Date object or ISO string) */
  date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]),
  /** Admission cycle year (e.g., "2026-27"). If not provided, calculated automatically */
  admissionCycle: PropTypes.string,
  /** Whether to show the admission cycle information */
  showAdmissionCycle: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Visual variant of the component */
  variant: PropTypes.oneOf(['default', 'compact', 'inline'])
};

export default LastUpdated;
