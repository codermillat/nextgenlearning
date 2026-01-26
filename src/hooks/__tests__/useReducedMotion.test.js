/**
 * Tests for useReducedMotion Hook
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useReducedMotion from '../useReducedMotion';

describe('useReducedMotion Hook', () => {
  let matchMediaMock;

  beforeEach(() => {
    // Create a mock matchMedia function
    matchMediaMock = vi.fn();
    window.matchMedia = matchMediaMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return false when prefers-reduced-motion is not set', () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('should return true when prefers-reduced-motion is set to reduce', () => {
    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it('should add event listener for media query changes', () => {
    const addEventListenerSpy = vi.fn();
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: addEventListenerSpy,
      removeEventListener: vi.fn(),
    });

    renderHook(() => useReducedMotion());
    expect(addEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('should remove event listener on unmount', () => {
    const removeEventListenerSpy = vi.fn();
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: removeEventListenerSpy,
    });

    const { unmount } = renderHook(() => useReducedMotion());
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('should handle browsers without matchMedia support', () => {
    window.matchMedia = undefined;

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('should use fallback addListener for older browsers', () => {
    const addListenerSpy = vi.fn();
    matchMediaMock.mockReturnValue({
      matches: false,
      addListener: addListenerSpy,
      removeListener: vi.fn(),
    });

    renderHook(() => useReducedMotion());
    expect(addListenerSpy).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should use fallback removeListener for older browsers on unmount', () => {
    const removeListenerSpy = vi.fn();
    matchMediaMock.mockReturnValue({
      matches: false,
      addListener: vi.fn(),
      removeListener: removeListenerSpy,
    });

    const { unmount } = renderHook(() => useReducedMotion());
    unmount();
    
    expect(removeListenerSpy).toHaveBeenCalledWith(expect.any(Function));
  });
});
