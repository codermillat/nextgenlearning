/**
 * Sitemap generation utility
 */

const BASE_URL = 'https://studyinindiabd.vercel.app';

/**
 * Generate sitemap XML
 */
export function generateSitemap(routes) {
  const urls = routes.map(route => {
    const lastmod = new Date().toISOString().split('T')[0];
    return `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq || 'weekly'}</changefreq>
    <priority>${route.priority || '0.8'}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

/**
 * Generate all routes for sitemap
 */
export function generateAllRoutes(universities, allPrograms, courseGroups) {
  const routes = [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/courses', changefreq: 'weekly', priority: '0.9' },
    { path: '/universities', changefreq: 'weekly', priority: '0.9' },
    { path: '/compare', changefreq: 'weekly', priority: '0.8' },
    { path: '/apply', changefreq: 'monthly', priority: '0.9' }
  ];

  // Add university pages
  universities.forEach(uni => {
    routes.push({
      path: `/universities/${uni.slug}`,
      changefreq: 'weekly',
      priority: '0.8'
    });
  });

  // Add course pages (now with university in URL)
  allPrograms.forEach(program => {
    const universitySlug = program.universitySlug || program.university?.slug;
    if (universitySlug && program.slug) {
      routes.push({
        path: `/universities/${universitySlug}/courses/${program.slug}`,
        changefreq: 'weekly',
        priority: '0.8'
      });
    }
  });

  // Add course group comparison pages
  courseGroups.forEach(group => {
    routes.push({
      path: `/courses/compare/${group.id}`,
      changefreq: 'weekly',
      priority: '0.8'
    });
  });

  return routes;
}

