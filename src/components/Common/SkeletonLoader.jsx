import { memo } from 'react';

/**
 * Skeleton Loader Component
 * Displays animated placeholder content while data is loading
 * Prevents CLS by reserving space before content loads
 * 
 * @param {string} variant - Type of skeleton (card, text, title, circle, button)
 * @param {number} count - Number of skeleton elements to render
 * @param {string} className - Additional CSS classes
 */
const SkeletonLoader = memo(function SkeletonLoader({ 
  variant = 'card',
  count = 1,
  className = ''
}) {
  const variants = {
    card: 'h-64 rounded-xl',
    text: 'h-4 rounded',
    title: 'h-8 rounded',
    circle: 'h-16 w-16 rounded-full',
    button: 'h-12 w-32 rounded-lg'
  };

  const skeletonClass = `bg-gray-200 animate-pulse ${variants[variant]} ${className}`;

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={skeletonClass} aria-hidden="true" />
      ))}
    </>
  );
});

export default SkeletonLoader;
