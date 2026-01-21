/**
 * Design System Tokens
 * Centralized design constants for consistent styling across the application
 */

// Typography Scale
export const typography = {
  // Page Titles
  pageTitle: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight',
  pageTitleSubtext: 'text-2xl sm:text-3xl md:text-4xl font-normal',
  
  // Section Headings
  sectionTitle: 'text-3xl sm:text-4xl md:text-5xl font-bold',
  sectionSubtitle: 'text-lg sm:text-xl text-gray-700',
  
  // Card Headings
  cardTitle: 'text-xl sm:text-2xl font-bold',
  cardSubtitle: 'text-lg font-semibold',
  
  // Body Text
  bodyLarge: 'text-lg sm:text-xl text-gray-700',
  body: 'text-base sm:text-lg text-gray-700',
  bodySmall: 'text-sm sm:text-base text-gray-700',
  
  // Labels & Captions
  label: 'text-sm font-medium text-gray-700',
  caption: 'text-xs sm:text-sm text-gray-600',
};

// Spacing Scale
export const spacing = {
  // Section Spacing
  section: 'py-16 sm:py-20 md:py-24',
  sectionMedium: 'py-12 sm:py-16 md:py-20',
  sectionSmall: 'py-8 sm:py-12',
  
  // Container Padding
  container: 'px-4 sm:px-6 lg:px-8',
  containerNarrow: 'px-4 sm:px-6',
  
  // Card Padding
  card: 'p-6 sm:p-8',
  cardSmall: 'p-4 sm:p-6',
  
  // Gap Spacing
  gap: 'gap-4 sm:gap-6',
  gapSmall: 'gap-3 sm:gap-4',
  gapLarge: 'gap-6 sm:gap-8',
};

// Border Radius
export const borderRadius = {
  card: 'rounded-xl', // 12px
  button: 'rounded-lg', // 8px
  input: 'rounded-xl', // 12px
  badge: 'rounded-full',
};

// Shadow System
export const shadows = {
  soft: 'shadow-soft',
  medium: 'shadow-medium',
  large: 'shadow-large',
  card: 'shadow-soft hover:shadow-large',
  button: 'shadow-md hover:shadow-lg',
  buttonPrimary: 'shadow-xl hover:shadow-2xl',
};

// Animation Durations
export const animations = {
  fast: 'transition-all duration-200',
  normal: 'transition-all duration-300',
  slow: 'transition-all duration-500',
};

// Common Transitions
export const transitions = {
  hover: 'transition-all duration-200',
  hoverSlow: 'transition-all duration-300',
  transform: 'transform hover:scale-105',
  transformLift: 'transform hover:-translate-y-1',
};

// Color Utilities
export const colors = {
  primary: {
    bg: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    bgHover: 'hover:from-blue-700 hover:to-indigo-700',
    text: 'text-white',
  },
  secondary: {
    bg: 'bg-white/10 backdrop-blur-sm',
    bgHover: 'hover:bg-white/20',
    border: 'border-2 border-white/30',
    text: 'text-white',
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
  },
};

// Button Styles (for reference, actual component will use these)
export const buttonStyles = {
  primary: {
    base: `${colors.primary.bg} ${colors.primary.text} ${borderRadius.button} font-bold ${spacing.card} ${shadows.buttonPrimary} ${transitions.hover} ${transitions.transform} min-h-[44px] flex items-center justify-center`,
    hover: colors.primary.bgHover,
  },
  secondary: {
    base: `${colors.secondary.bg} ${colors.secondary.text} ${colors.secondary.border} ${borderRadius.button} font-bold ${spacing.card} ${shadows.button} ${transitions.hover} ${transitions.transform} min-h-[44px] flex items-center justify-center`,
    hover: colors.secondary.bgHover,
  },
  white: {
    base: `bg-white text-blue-600 ${borderRadius.button} font-bold ${spacing.card} ${shadows.buttonPrimary} ${transitions.hover} ${transitions.transform} min-h-[44px] flex items-center justify-center`,
    hover: 'hover:bg-blue-50',
  },
};

// Card Styles (for reference, actual component will use these)
export const cardStyles = {
  default: {
    base: `bg-white ${spacing.card} ${borderRadius.card} ${shadows.card} ${transitions.hoverSlow} border border-gray-100`,
    hover: 'hover:border-blue-200',
  },
  gradient: {
    base: `bg-gradient-to-br ${spacing.card} ${borderRadius.card} ${shadows.card} ${transitions.hoverSlow} border`,
    hover: 'hover:-translate-y-1',
  },
  feature: {
    base: `bg-white ${spacing.card} ${borderRadius.card} ${shadows.card} ${transitions.hoverSlow} border border-gray-100 group`,
    hover: 'hover:border-blue-200',
  },
};
