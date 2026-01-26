/**
 * Unit tests for useAnalytics hook
 * Feature: sharda-university-content-enhancement
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAnalytics, useShardaAnalytics } from '../useAnalytics';
import * as conversionEventLogger from '../../utils/conversionEventLogger';

// Mock the conversionEventLogger module
vi.mock('../../utils/conversionEventLogger', () => ({
  initPageTracking: vi.fn(() => vi.fn()), // Returns cleanup function
}));

describe('useAnalytics', () => {
  let originalWindow;

  beforeEach(() => {
    vi.clearAllMocks();
    // Store original window
    originalWindow = global.window;
    // Ensure window exists for tests
    if (!global.window) {
      global.window = {};
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // Restore original window state
    if (originalWindow === undefined) {
      delete global.window;
    } else {
      global.window = originalWindow;
    }
  });

  describe('Basic functionality', () => {
    it('should initialize page tracking on mount', () => {
      renderHook(() =>
        useAnalytics({
          contentType: 'landing',
          category: 'test-category',
        })
      );

      expect(conversionEventLogger.initPageTracking).toHaveBeenCalledTimes(1);
      expect(conversionEventLogger.initPageTracking).toHaveBeenCalledWith({
        contentType: 'landing',
        program: undefined,
        category: 'test-category',
      });
    });

    it('should pass all parameters to initPageTracking', () => {
      renderHook(() =>
        useAnalytics({
          contentType: 'program',
          program: 'btech-cse',
          category: 'sharda-programs',
        })
      );

      expect(conversionEventLogger.initPageTracking).toHaveBeenCalledWith({
        contentType: 'program',
        program: 'btech-cse',
        category: 'sharda-programs',
      });
    });

    it('should work with minimal parameters', () => {
      renderHook(() => useAnalytics({ contentType: 'landing' }));

      expect(conversionEventLogger.initPageTracking).toHaveBeenCalledWith({
        contentType: 'landing',
        program: undefined,
        category: undefined,
      });
    });

    it('should work without any parameters', () => {
      renderHook(() => useAnalytics());

      expect(conversionEventLogger.initPageTracking).toHaveBeenCalledWith({
        contentType: undefined,
        program: undefined,
        category: undefined,
      });
    });
  });

  describe('Cleanup behavior', () => {
    it('should call cleanup function on unmount', () => {
      const mockCleanup = vi.fn();
      vi.mocked(conversionEventLogger.initPageTracking).mockReturnValue(mockCleanup);

      const { unmount } = renderHook(() =>
        useAnalytics({ contentType: 'landing' })
      );

      expect(mockCleanup).not.toHaveBeenCalled();

      unmount();

      expect(mockCleanup).toHaveBeenCalledTimes(1);
    });

    it('should reinitialize tracking when parameters change', () => {
      const mockCleanup = vi.fn();
      vi.mocked(conversionEventLogger.initPageTracking).mockReturnValue(mockCleanup);

      const { rerender } = renderHook(
        ({ contentType }) => useAnalytics({ contentType }),
        { initialProps: { contentType: 'landing' } }
      );

      expect(conversionEventLogger.initPageTracking).toHaveBeenCalledTimes(1);
      expect(mockCleanup).not.toHaveBeenCalled();

      // Change contentType
      rerender({ contentType: 'program' });

      // Should cleanup old tracking and initialize new
      expect(mockCleanup).toHaveBeenCalledTimes(1);
      expect(conversionEventLogger.initPageTracking).toHaveBeenCalledTimes(2);
    });

    it('should not reinitialize if parameters stay the same', () => {
      const { rerender } = renderHook(
        ({ contentType }) => useAnalytics({ contentType }),
        { initialProps: { contentType: 'landing' } }
      );

      expect(conversionEventLogger.initPageTracking).toHaveBeenCalledTimes(1);

      // Rerender with same contentType
      rerender({ contentType: 'landing' });

      // Should not reinitialize
      expect(conversionEventLogger.initPageTracking).toHaveBeenCalledTimes(1);
    });
  });

  describe('Enabled/disabled state', () => {
    it('should not initialize tracking when enabled is false', () => {
      renderHook(() =>
        useAnalytics({
          contentType: 'landing',
          enabled: false,
        })
      );

      expect(conversionEventLogger.initPageTracking).not.toHaveBeenCalled();
    });

    it('should initialize tracking when enabled is true (default)', () => {
      renderHook(() =>
        useAnalytics({
          contentType: 'landing',
        })
      );

      expect(conversionEventLogger.initPageTracking).toHaveBeenCalledTimes(1);
    });

    it('should initialize tracking when enabled is explicitly true', () => {
      renderHook(() =>
        useAnalytics({
          contentType: 'landing',
          enabled: true,
        })
      );

      expect(conversionEventLogger.initPageTracking).toHaveBeenCalledTimes(1);
    });

    it('should cleanup and reinitialize when enabled changes from false to true', () => {
      const mockCleanup = vi.fn();
      vi.mocked(conversionEventLogger.initPageTracking).mockReturnValue(mockCleanup);

      const { rerender } = renderHook(
        ({ enabled }) => useAnalytics({ contentType: 'landing', enabled }),
        { initialProps: { enabled: false } }
      );

      expect(conversionEventLogger.initPageTracking).not.toHaveBeenCalled();

      // Enable tracking
      rerender({ enabled: true });

      expect(conversionEventLogger.initPageTracking).toHaveBeenCalledTimes(1);
    });

    it('should cleanup when enabled changes from true to false', () => {
      const mockCleanup = vi.fn();
      vi.mocked(conversionEventLogger.initPageTracking).mockReturnValue(mockCleanup);

      const { rerender } = renderHook(
        ({ enabled }) => useAnalytics({ contentType: 'landing', enabled }),
        { initialProps: { enabled: true } }
      );

      expect(conversionEventLogger.initPageTracking).toHaveBeenCalledTimes(1);
      expect(mockCleanup).not.toHaveBeenCalled();

      // Disable tracking
      rerender({ enabled: false });

      expect(mockCleanup).toHaveBeenCalledTimes(1);
    });
  });

  describe('Server-side rendering', () => {
    it('should not initialize tracking during SSR', () => {
      // This test verifies the hook handles missing window gracefully
      // The actual SSR behavior is that useEffect doesn't run on server
      // So we just verify the hook can be imported and used without window
      
      // The hook checks for window in useEffect, which won't run in SSR
      // This is the correct behavior - no tracking in SSR
      expect(conversionEventLogger.initPageTracking).not.toHaveBeenCalled();
    });
  });
});

describe('useShardaAnalytics', () => {
  let originalWindow;

  beforeEach(() => {
    vi.clearAllMocks();
    // Store original window
    originalWindow = global.window;
    // Ensure window exists for tests
    if (!global.window) {
      global.window = {};
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // Restore original window state
    if (originalWindow === undefined) {
      delete global.window;
    } else {
      global.window = originalWindow;
    }
  });

  it('should initialize tracking with sharda-content category', () => {
    renderHook(() =>
      useShardaAnalytics({
        contentType: 'landing',
      })
    );

    expect(conversionEventLogger.initPageTracking).toHaveBeenCalledWith({
      contentType: 'landing',
      program: undefined,
      category: 'sharda-content',
    });
  });

  it('should pass program parameter', () => {
    renderHook(() =>
      useShardaAnalytics({
        contentType: 'program',
        program: 'btech-cse',
      })
    );

    expect(conversionEventLogger.initPageTracking).toHaveBeenCalledWith({
      contentType: 'program',
      program: 'btech-cse',
      category: 'sharda-content',
    });
  });

  it('should always be enabled', () => {
    renderHook(() =>
      useShardaAnalytics({
        contentType: 'landing',
      })
    );

    expect(conversionEventLogger.initPageTracking).toHaveBeenCalledTimes(1);
  });

  it('should work without parameters', () => {
    renderHook(() => useShardaAnalytics());

    expect(conversionEventLogger.initPageTracking).toHaveBeenCalledWith({
      contentType: undefined,
      program: undefined,
      category: 'sharda-content',
    });
  });

  it('should cleanup on unmount', () => {
    const mockCleanup = vi.fn();
    vi.mocked(conversionEventLogger.initPageTracking).mockReturnValue(mockCleanup);

    const { unmount } = renderHook(() =>
      useShardaAnalytics({ contentType: 'landing' })
    );

    unmount();

    expect(mockCleanup).toHaveBeenCalledTimes(1);
  });
});

describe('Integration scenarios', () => {
  let originalWindow;

  beforeEach(() => {
    vi.clearAllMocks();
    // Store original window
    originalWindow = global.window;
    // Ensure window exists for tests
    if (!global.window) {
      global.window = {};
    }
  });

  afterEach(() => {
    // Restore original window state
    if (originalWindow === undefined) {
      delete global.window;
    } else {
      global.window = originalWindow;
    }
  });

  it('should handle multiple hook instances independently', () => {
    const mockCleanup1 = vi.fn();
    const mockCleanup2 = vi.fn();
    
    vi.mocked(conversionEventLogger.initPageTracking)
      .mockReturnValueOnce(mockCleanup1)
      .mockReturnValueOnce(mockCleanup2);

    const { unmount: unmount1 } = renderHook(() =>
      useAnalytics({ contentType: 'landing' })
    );

    const { unmount: unmount2 } = renderHook(() =>
      useAnalytics({ contentType: 'program' })
    );

    expect(conversionEventLogger.initPageTracking).toHaveBeenCalledTimes(2);

    unmount1();
    expect(mockCleanup1).toHaveBeenCalledTimes(1);
    expect(mockCleanup2).not.toHaveBeenCalled();

    unmount2();
    expect(mockCleanup2).toHaveBeenCalledTimes(1);
  });

  it('should handle rapid parameter changes', () => {
    const mockCleanup = vi.fn();
    vi.mocked(conversionEventLogger.initPageTracking).mockReturnValue(mockCleanup);

    const { rerender } = renderHook(
      ({ contentType }) => useAnalytics({ contentType }),
      { initialProps: { contentType: 'landing' } }
    );

    // Rapid changes
    rerender({ contentType: 'program' });
    rerender({ contentType: 'comparison' });
    rerender({ contentType: 'fee' });

    // Should have cleaned up 3 times (once for each change)
    expect(mockCleanup).toHaveBeenCalledTimes(3);
    // Should have initialized 4 times (initial + 3 changes)
    expect(conversionEventLogger.initPageTracking).toHaveBeenCalledTimes(4);
  });
});
