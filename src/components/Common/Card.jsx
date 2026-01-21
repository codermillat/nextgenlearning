import { memo } from 'react';
import { Link } from 'react-router-dom';

/**
 * Standardized Card Component
 * Provides consistent card styling across the application
 * Wrapped in React.memo for performance optimization
 * 
 * @param {string} variant - Card style variant: 'default' | 'gradient' | 'feature'
 * @param {string} gradientColors - Gradient colors for gradient variant (e.g., 'from-blue-50 to-blue-100')
 * @param {string} borderColor - Border color class (e.g., 'border-blue-200')
 * @param {string} hoverBorderColor - Hover border color class (e.g., 'hover:border-blue-300')
 * @param {string} hoverTextColor - Hover text color class (e.g., 'group-hover:text-blue-600')
 * @param {string} to - If provided, renders as Link
 * @param {string} href - If provided, renders as anchor tag
 * @param {boolean} interactive - Whether card should have hover effects
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Card content
 */
const Card = memo(function Card({
  variant = 'default',
  gradientColors,
  borderColor = 'border-gray-200',
  hoverBorderColor = 'hover:border-blue-200',
  hoverTextColor,
  to,
  href,
  interactive = true,
  className = '',
  children,
  ...props
}) {
  // Base classes
  const baseClasses = 'p-6 sm:p-8 rounded-xl transition-all duration-300';
  
  // Variant styles
  const variantClasses = {
    default: `bg-white shadow-soft ${interactive ? 'hover:shadow-large' : ''} border ${borderColor} ${interactive ? hoverBorderColor : ''}`,
    gradient: `bg-gradient-to-br ${gradientColors || 'from-gray-50 to-gray-100'} shadow-soft ${interactive ? 'hover:shadow-large' : ''} border ${borderColor} ${interactive ? hoverBorderColor : ''} ${interactive ? 'hover:-translate-y-1' : ''}`,
    feature: `bg-white shadow-soft ${interactive ? 'hover:shadow-large' : ''} border border-gray-100 ${interactive ? 'hover:border-blue-200' : ''} group`,
  };
  
  // Combine all classes
  const classes = `${baseClasses} ${variantClasses[variant]} ${hoverTextColor || ''} ${className}`.trim();
  
  // Render as Link if 'to' prop is provided
  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        {...props}
      >
        {children}
      </Link>
    );
  }
  
  // Render as anchor if 'href' prop is provided
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }
  
  // Render as div
  return (
    <div
      className={classes}
      {...props}
    >
      {children}
    </div>
  );
});

export default Card;
