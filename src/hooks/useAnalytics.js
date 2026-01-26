/**
 * Analytics Hook for Sharda University Pages
 * Feature: sharda-university-content-enhancement
 * 
 * Custom React hook that integrates scroll depth tracking, time on page tracking,
 * and page view tracking for Sharda University content pages.
 * 
 * Validates: Requirements 17.1, 17.2, 17.4, 17.6
 * Properties: 63, 64, 66, 68
 */

import { useEffect } from 'react';
import { initPageTracking } from '../utils/conversionEventLogger';

/**
 * Custom hook to initialize analytics tracking for a page
 * 
 * Automatically tracks:
 * - Initial page view
 * - Scroll depth at 25%, 50%, 75%, 100%
 * - Time spent on page (logged every 30 seconds)
 * 
 * @param {Object} options - Tracking options
 * @param {string} [options.contentType] - Type of content (e.g., 'landing', 'program', 'comparison')
 * @param {string} [options.program] - Program name if applicable
 * @param {string} [options.category] - Content category
 * @param {boolean} [options.enabled=true] - Whether tracking is enabled
 * 
 * @example
 * // In a Sharda landing page component
 * useAnalytics({
 *   contentType: 'landing',
 *   category: 'sharda-content'
 * });
 * 
 * @example
 * // In a program detail page
 * useAnalytics({
 *   contentType: 'program',
 *   program: 'btech-cse',
 *   category: 'sharda-programs'
 * });
 */
export function useAnalytics({ contentType, program, category, enabled = true } = {}) {
  useEffect(() => {
    // Skip if tracking is disabled or in server-side rendering
    if (!enabled || typeof window === 'undefined') {
      return;
    }

    // Initialize all tracking (page view, scroll depth, time on page)
    const cleanup = initPageTracking({
      contentType,
      program,
      category,
    });

    // Cleanup function to stop tracking when component unmounts
    return cleanup;
  }, [contentType, program, category, enabled]);
}

/**
 * Hook specifically for Sharda University pages
 * Pre-configured with Sharda-specific category
 * 
 * @param {Object} options - Tracking options
 * @param {string} options.contentType - Type of Sharda content
 * @param {string} [options.program] - Program name if applicable
 * 
 * @example
 * useShardaAnalytics({ contentType: 'landing' });
 * useShardaAnalytics({ contentType: 'program', program: 'btech-cse' });
 */
export function useShardaAnalytics({ contentType, program } = {}) {
  return useAnalytics({
    contentType,
    program,
    category: 'sharda-content',
    enabled: true,
  });
}

export default useAnalytics;
