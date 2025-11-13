/**
 * Convert a string to a URL-friendly slug
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')              // Trim - from start of text
    .replace(/-+$/, '');             // Trim - from end of text
}

/**
 * Generate slug for a course (without university)
 */
export function courseSlug(course) {
  const name = course.name || course.specialization || '';
  return slugify(name);
}

/**
 * Generate unique slug for a course including university
 * Format: university-slug/course-slug
 */
export function courseSlugWithUniversity(course, university) {
  const courseSlugPart = courseSlug(course);
  const universitySlugPart = universitySlug(university);
  return `${universitySlugPart}/${courseSlugPart}`;
}

/**
 * Generate slug for a university
 */
export function universitySlug(university) {
  const name = university.name || university.shortName || '';
  return slugify(name);
}

