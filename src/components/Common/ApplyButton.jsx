import { memo } from 'react';
import { UNIVERSITY_APPLY_URLS } from '../../config/constants';

/**
 * ApplyButton Component
 * Standardized apply button for university applications
 * Automatically uses university-specific apply URLs from configuration
 * 
 * @param {string} universityId - University identifier (e.g., 'sharda', 'sharda-university')
 * @param {string} variant - Button style variant: 'primary' | 'secondary' | 'white' | 'outline' | 'ghost'
 * @param {string} size - Button size: 'sm' | 'md' | 'lg'
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Button content (defaults to "Apply Now")
 */
const ApplyButton = memo(function ApplyButton({
  universityId,
  variant = 'primary',
  size = 'md',
  className = '',
  children = 'Apply Now',
  ...props
}) {
  // Get university-specific apply URL or fallback to general apply page
  const applyUrl = UNIVERSITY_APPLY_URLS[universityId] || '/apply';
  
  // Base classes
  const baseClasses = 'font-bold transition-all duration-200 min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Variant styles
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl transform hover:scale-105 focus:ring-white focus:ring-offset-blue-600',
    secondary: 'bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-white focus:ring-offset-gray-800',
    white: 'bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transform hover:scale-105 focus:ring-blue-500 focus:ring-offset-2',
    outline: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg focus:ring-blue-500 focus:ring-offset-2',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 hover:text-blue-600 focus:ring-blue-500 focus:ring-offset-2',
  };
  
  // Size styles
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 sm:px-8 py-3 text-base sm:text-lg',
    lg: 'px-8 sm:px-10 py-4 text-lg sm:text-xl',
  };
  
  // Border radius
  const radiusClass = 'rounded-lg';
  
  // Combine all classes
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${radiusClass} ${className}`.trim();
  
  return (
    <a
      href={applyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      {...props}
    >
      {children}
    </a>
  );
});

export default ApplyButton;
