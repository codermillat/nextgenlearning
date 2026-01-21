import { memo } from 'react';

/**
 * Skeleton Loading Component
 * Provides placeholder UI while content is loading
 * Better UX than spinners - shows content shape
 */

/**
 * Base skeleton element with pulse animation
 */
const SkeletonBase = memo(function SkeletonBase({ className = '', ...props }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      {...props}
    />
  );
});

/**
 * Text line skeleton
 */
export const SkeletonText = memo(function SkeletonText({ 
  lines = 1, 
  className = '',
  lastLineWidth = '75%'
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBase
          key={i}
          className="h-4"
          style={{ 
            width: i === lines - 1 && lines > 1 ? lastLineWidth : '100%' 
          }}
        />
      ))}
    </div>
  );
});

/**
 * Card skeleton for course/university cards
 */
export const SkeletonCard = memo(function SkeletonCard({ className = '' }) {
  return (
    <div className={`bg-white p-6 rounded-xl border border-gray-200 ${className}`}>
      {/* Icon placeholder */}
      <SkeletonBase className="w-12 h-12 rounded-lg mb-4" />
      
      {/* Title */}
      <SkeletonBase className="h-6 w-3/4 mb-3" />
      
      {/* Description lines */}
      <SkeletonText lines={2} className="mb-4" />
      
      {/* Meta info */}
      <div className="flex justify-between">
        <SkeletonBase className="h-4 w-20" />
        <SkeletonBase className="h-4 w-16" />
      </div>
    </div>
  );
});

/**
 * University card skeleton
 */
export const SkeletonUniversityCard = memo(function SkeletonUniversityCard({ className = '' }) {
  return (
    <div className={`bg-white p-6 rounded-xl border border-gray-200 ${className}`}>
      {/* Header with logo */}
      <div className="flex items-start gap-4 mb-4">
        <SkeletonBase className="w-16 h-16 rounded-lg flex-shrink-0" />
        <div className="flex-1">
          <SkeletonBase className="h-6 w-3/4 mb-2" />
          <SkeletonBase className="h-4 w-1/2" />
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <SkeletonBase className="h-3 w-16 mb-1" />
          <SkeletonBase className="h-5 w-12" />
        </div>
        <div>
          <SkeletonBase className="h-3 w-16 mb-1" />
          <SkeletonBase className="h-5 w-12" />
        </div>
      </div>
      
      {/* Button */}
      <SkeletonBase className="h-10 w-full rounded-lg" />
    </div>
  );
});

/**
 * Course list skeleton
 */
export const SkeletonCourseList = memo(function SkeletonCourseList({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
});

/**
 * Page header skeleton
 */
export const SkeletonPageHeader = memo(function SkeletonPageHeader({ className = '' }) {
  return (
    <div className={`mb-8 ${className}`}>
      <SkeletonBase className="h-10 w-2/3 mb-4" />
      <SkeletonText lines={2} />
    </div>
  );
});

/**
 * Filter bar skeleton
 */
export const SkeletonFilters = memo(function SkeletonFilters({ className = '' }) {
  return (
    <div className={`flex flex-wrap gap-4 mb-6 ${className}`}>
      <SkeletonBase className="h-10 w-32 rounded-lg" />
      <SkeletonBase className="h-10 w-40 rounded-lg" />
      <SkeletonBase className="h-10 w-36 rounded-lg" />
      <SkeletonBase className="h-10 flex-1 min-w-[200px] rounded-lg" />
    </div>
  );
});

/**
 * Full page loading skeleton
 */
export const SkeletonPage = memo(function SkeletonPage({ 
  showFilters = false,
  cardCount = 6 
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SkeletonPageHeader />
      {showFilters && <SkeletonFilters />}
      <SkeletonCourseList count={cardCount} />
    </div>
  );
});

export default SkeletonBase;
