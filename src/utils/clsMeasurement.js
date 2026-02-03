/**
 * CLS Measurement Utility
 * Measures Cumulative Layout Shift using PerformanceObserver API
 * Filters out shifts caused by recent user input
 */

/**
 * Initialize CLS measurement
 * @param {Function} callback - Called with CLS score when measurement completes
 * @returns {PerformanceObserver|null} - Observer instance or null if not supported
 */
export function measureCLS(callback) {
  // Check if PerformanceObserver is supported
  if (!('PerformanceObserver' in window)) {
    console.warn('PerformanceObserver not supported - CLS measurement unavailable');
    return null;
  }

  let clsScore = 0;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Only count layout shifts without recent user input
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
        }
      }
      
      // Call callback with current CLS score
      if (callback) {
        callback(clsScore);
      }
    });

    observer.observe({ type: 'layout-shift', buffered: true });
    return observer;
  } catch (error) {
    console.error('CLS measurement failed:', error);
    return null;
  }
}

/**
 * Get detailed CLS information including shift sources
 * @returns {Promise<Object>} - CLS data with score and shift details
 */
export async function getCLSDetails() {
  return new Promise((resolve) => {
    if (!('PerformanceObserver' in window)) {
      resolve({ score: null, shifts: [], supported: false });
      return;
    }

    let clsScore = 0;
    const shifts = [];

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
          shifts.push({
            value: entry.value,
            sources: entry.sources?.map(source => ({
              node: source.node?.tagName || 'unknown',
              previousRect: source.previousRect,
              currentRect: source.currentRect
            })) || []
          });
        }
      }
    });

    observer.observe({ type: 'layout-shift', buffered: true });

    // Collect data for 5 seconds then resolve
    setTimeout(() => {
      observer.disconnect();
      resolve({
        score: clsScore,
        shifts,
        supported: true,
        timestamp: Date.now(),
        url: window.location.pathname
      });
    }, 5000);
  });
}

/**
 * Report CLS to analytics
 * @param {number} clsScore - The CLS score to report
 * @param {string} pagePath - Page path for the measurement
 */
export function reportCLS(clsScore, pagePath) {
  // Report to Google Analytics if available
  if (window.gtag) {
    window.gtag('event', 'cls_measurement', {
      value: Math.round(clsScore * 1000) / 1000, // Round to 3 decimals
      page_path: pagePath,
      metric_value: clsScore,
      metric_rating: clsScore < 0.1 ? 'good' : clsScore < 0.25 ? 'needs-improvement' : 'poor'
    });
  }

  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(`CLS Score for ${pagePath}:`, clsScore);
  }
}
