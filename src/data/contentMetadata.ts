/**
 * Content Metadata
 * 
 * Tracks last updated dates and review schedules for Sharda University content.
 * This enables the content freshness system and quarterly review process.
 * 
 * Feature: sharda-university-content-enhancement
 * Validates: Requirements 16.3, 16.4, 16.5, 16.6
 */

export interface ContentMetadata {
  /** Unique identifier for the content */
  id: string;
  /** Content type (fees, rankings, placements, programs, admissions) */
  type: ContentType;
  /** Page path or identifier */
  path: string;
  /** Date when content was last updated */
  lastUpdated: string; // ISO date string
  /** Date when content should be reviewed next */
  nextReview: string; // ISO date string
  /** Review frequency in months */
  reviewFrequency: number;
  /** Content owner/maintainer */
  owner: string;
  /** Additional notes about the content */
  notes?: string;
}

export type ContentType = 
  | 'fees'
  | 'rankings'
  | 'placements'
  | 'programs'
  | 'admissions'
  | 'scholarships'
  | 'campus'
  | 'general';

export interface ReviewSchedule {
  /** Quarter (Q1, Q2, Q3, Q4) */
  quarter: string;
  /** Year */
  year: number;
  /** Content items due for review */
  items: ContentMetadata[];
  /** Review status */
  status: 'pending' | 'in_progress' | 'completed';
}

/**
 * Content Metadata Registry
 * 
 * Maintains metadata for all Sharda University content pages.
 * Update this registry when content is modified.
 */
export const contentMetadataRegistry: ContentMetadata[] = [
  // Landing Page
  {
    id: 'sharda-landing',
    type: 'general',
    path: '/sharda-university',
    lastUpdated: '2026-01-15',
    nextReview: '2026-04-15',
    reviewFrequency: 3,
    owner: 'Content Team',
    notes: 'Main landing page - review quarterly'
  },
  
  // Fee Pages
  {
    id: 'btech-cse-fees',
    type: 'fees',
    path: '/sharda-university/btech-cse-fees',
    lastUpdated: '2026-01-15',
    nextReview: '2026-07-15',
    reviewFrequency: 6,
    owner: 'Admissions Team',
    notes: 'Update annually or when fee structure changes'
  },
  {
    id: 'mba-fees',
    type: 'fees',
    path: '/sharda-university/mba-fees',
    lastUpdated: '2026-01-15',
    nextReview: '2026-07-15',
    reviewFrequency: 6,
    owner: 'Admissions Team',
    notes: 'Update annually or when fee structure changes'
  },
  
  // Ranking Pages
  {
    id: 'nirf-ranking',
    type: 'rankings',
    path: '/sharda-university/nirf-ranking',
    lastUpdated: '2025-12-20',
    nextReview: '2026-06-20',
    reviewFrequency: 6,
    owner: 'Marketing Team',
    notes: 'Update when new NIRF rankings released (typically June)'
  },
  {
    id: 'ranking-2026',
    type: 'rankings',
    path: '/sharda-university/ranking-2026',
    lastUpdated: '2025-12-20',
    nextReview: '2026-06-20',
    reviewFrequency: 6,
    owner: 'Marketing Team',
    notes: 'Update when new rankings released'
  },
  
  // Program Pages
  {
    id: 'program-btech-cse',
    type: 'programs',
    path: '/sharda-university/programs/btech-cse',
    lastUpdated: '2026-01-10',
    nextReview: '2026-07-10',
    reviewFrequency: 6,
    owner: 'Academic Team',
    notes: 'Update when curriculum changes or new specializations added'
  },
  {
    id: 'program-mba',
    type: 'programs',
    path: '/sharda-university/programs/mba',
    lastUpdated: '2026-01-10',
    nextReview: '2026-07-10',
    reviewFrequency: 6,
    owner: 'Academic Team',
    notes: 'Update when curriculum changes'
  },
  {
    id: 'program-mbbs',
    type: 'programs',
    path: '/sharda-university/programs/mbbs',
    lastUpdated: '2026-01-10',
    nextReview: '2026-07-10',
    reviewFrequency: 6,
    owner: 'Academic Team',
    notes: 'Update when curriculum changes'
  },
  {
    id: 'program-bba',
    type: 'programs',
    path: '/sharda-university/programs/bba',
    lastUpdated: '2026-01-10',
    nextReview: '2026-07-10',
    reviewFrequency: 6,
    owner: 'Academic Team',
    notes: 'Update when curriculum changes'
  },
  
  // Placement Data
  {
    id: 'placements',
    type: 'placements',
    path: '/sharda-university#placements',
    lastUpdated: '2025-12-01',
    nextReview: '2026-06-01',
    reviewFrequency: 6,
    owner: 'Placement Cell',
    notes: 'Update annually after placement season (typically May-June)'
  },
  
  // Scholarship Pages
  {
    id: 'bangladesh-scholarships',
    type: 'scholarships',
    path: '/sharda-university/scholarship-bangladeshi-students-india',
    lastUpdated: '2026-01-15',
    nextReview: '2026-07-15',
    reviewFrequency: 6,
    owner: 'Admissions Team',
    notes: 'Update when scholarship policies change'
  },
  
  // Comparison Pages
  {
    id: 'sharda-vs-amity',
    type: 'general',
    path: '/sharda-vs-amity',
    lastUpdated: '2026-01-15',
    nextReview: '2026-04-15',
    reviewFrequency: 3,
    owner: 'Content Team',
    notes: 'Review quarterly to ensure data accuracy'
  },
  {
    id: 'sharda-vs-chandigarh',
    type: 'general',
    path: '/sharda-vs-chandigarh',
    lastUpdated: '2026-01-15',
    nextReview: '2026-04-15',
    reviewFrequency: 3,
    owner: 'Content Team',
    notes: 'Review quarterly to ensure data accuracy'
  },
  
  // Bangladesh-focused Pages
  {
    id: 'study-india-bangladesh',
    type: 'admissions',
    path: '/sharda-university/study-in-india-from-bangladesh',
    lastUpdated: '2026-01-15',
    nextReview: '2026-04-15',
    reviewFrequency: 3,
    owner: 'International Admissions',
    notes: 'Review quarterly for visa/admission process updates'
  },
  {
    id: 'indian-university-bangladesh',
    type: 'admissions',
    path: '/sharda-university/indian-university-bangladeshi-students',
    lastUpdated: '2026-01-15',
    nextReview: '2026-04-15',
    reviewFrequency: 3,
    owner: 'International Admissions',
    notes: 'Review quarterly'
  },
  {
    id: 'best-universities-bangladesh',
    type: 'general',
    path: '/best-universities-bangladeshi-students-india',
    lastUpdated: '2026-01-15',
    nextReview: '2026-04-15',
    reviewFrequency: 3,
    owner: 'Content Team',
    notes: 'Review quarterly'
  }
];

/**
 * Get content metadata by ID
 */
export function getContentMetadata(id: string): ContentMetadata | undefined {
  return contentMetadataRegistry.find(item => item.id === id);
}

/**
 * Get content metadata by path
 */
export function getContentMetadataByPath(path: string): ContentMetadata | undefined {
  return contentMetadataRegistry.find(item => item.path === path);
}

/**
 * Get all content items of a specific type
 */
export function getContentByType(type: ContentType): ContentMetadata[] {
  return contentMetadataRegistry.filter(item => item.type === type);
}

/**
 * Get content items due for review
 * @param beforeDate - Check for reviews due before this date (default: today)
 */
export function getContentDueForReview(beforeDate?: Date): ContentMetadata[] {
  const checkDate = beforeDate || new Date();
  
  return contentMetadataRegistry.filter(item => {
    const reviewDate = new Date(item.nextReview);
    return reviewDate <= checkDate;
  });
}

/**
 * Get content items by review quarter
 * @param quarter - Quarter (Q1, Q2, Q3, Q4)
 * @param year - Year
 */
export function getContentByQuarter(quarter: string, year: number): ContentMetadata[] {
  const quarterMonths: Record<string, [number, number, number]> = {
    'Q1': [0, 1, 2],   // Jan, Feb, Mar
    'Q2': [3, 4, 5],   // Apr, May, Jun
    'Q3': [6, 7, 8],   // Jul, Aug, Sep
    'Q4': [9, 10, 11]  // Oct, Nov, Dec
  };
  
  const months = quarterMonths[quarter];
  if (!months) return [];
  
  return contentMetadataRegistry.filter(item => {
    const reviewDate = new Date(item.nextReview);
    return reviewDate.getFullYear() === year && 
           months.includes(reviewDate.getMonth());
  });
}

/**
 * Update content metadata after review
 * @param id - Content ID
 * @param lastUpdated - New last updated date
 * @returns Updated metadata
 */
export function updateContentMetadata(
  id: string, 
  lastUpdated: string
): ContentMetadata | null {
  const item = contentMetadataRegistry.find(item => item.id === id);
  
  if (!item) return null;
  
  // Calculate next review date based on frequency
  const updatedDate = new Date(lastUpdated);
  const nextReviewDate = new Date(updatedDate);
  nextReviewDate.setMonth(nextReviewDate.getMonth() + item.reviewFrequency);
  
  item.lastUpdated = lastUpdated;
  item.nextReview = nextReviewDate.toISOString().split('T')[0];
  
  return item;
}

/**
 * Get review schedule for a quarter
 * @param quarter - Quarter (Q1, Q2, Q3, Q4)
 * @param year - Year
 */
export function getReviewSchedule(quarter: string, year: number): ReviewSchedule {
  const items = getContentByQuarter(quarter, year);
  
  return {
    quarter,
    year,
    items,
    status: 'pending'
  };
}

/**
 * Check if content is overdue for review
 * @param id - Content ID
 * @returns True if overdue
 */
export function isContentOverdue(id: string): boolean {
  const item = getContentMetadata(id);
  if (!item) return false;
  
  const reviewDate = new Date(item.nextReview);
  const today = new Date();
  
  return reviewDate < today;
}

/**
 * Get days until next review
 * @param id - Content ID
 * @returns Number of days (negative if overdue)
 */
export function getDaysUntilReview(id: string): number | null {
  const item = getContentMetadata(id);
  if (!item) return null;
  
  const reviewDate = new Date(item.nextReview);
  const today = new Date();
  
  const diffTime = reviewDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}
