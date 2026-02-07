import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  const normalizeHref = (to) => {
    if (typeof to === 'string') {
      return to;
    }
    if (to && typeof to === 'object') {
      const pathname = to.pathname || '';
      const search = to.search || '';
      const hash = to.hash || '';
      return `${pathname}${search}${hash}` || '#';
    }
    return '#';
  };

  const SafeLink = React.forwardRef(function SafeLink({ to, children, ...props }, ref) {
    return React.createElement('a', { ...props, ref, href: normalizeHref(to) }, children);
  });

  const SafeNavLink = React.forwardRef(function SafeNavLink({ to, children, ...props }, ref) {
    return React.createElement('a', { ...props, ref, href: normalizeHref(to) }, children);
  });

  return {
    ...actual,
    Link: SafeLink,
    NavLink: SafeNavLink,
  };
});
