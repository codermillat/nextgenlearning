/**
 * Dynamic Sitemap Generator
 * Generates sitemap.xml for all pages in the application
 */

const BASE_URL = 'https://studyinindiabd.vercel.app';

export function generateSitemap(data) {
  const { allPrograms, universities, courseGroups } = data;
  
  const urls = [
    // Static pages
    { loc: '/', changefreq: 'daily', priority: '1.0' },
    { loc: '/courses', changefreq: 'weekly', priority: '0.9' },
    { loc: '/universities', changefreq: 'weekly', priority: '0.9' },
    { loc: '/scholarships', changefreq: 'weekly', priority: '0.8' },
    { loc: '/program-categories', changefreq: 'weekly', priority: '0.8' },
    { loc: '/apply', changefreq: 'monthly', priority: '0.7' },
    { loc: '/compare', changefreq: 'monthly', priority: '0.7' },
  ];

  // University pages
  universities.forEach(uni => {
    const uniSlug = uni.slug || uni.id;
    urls.push({
      loc: `/universities/${uniSlug}`,
      changefreq: 'weekly',
      priority: '0.8'
    });
    urls.push({
      loc: `/universities/${uniSlug}/courses`,
      changefreq: 'weekly',
      priority: '0.7'
    });
  });

  // Course group comparison pages
  courseGroups.forEach(group => {
    urls.push({
      loc: `/courses/compare/${group.id}`,
      changefreq: 'weekly',
      priority: '0.8'
    });
  });

  // Individual course pages (now with university in URL)
  allPrograms.forEach(program => {
    const courseSlug = program.slug || program.id;
    const universitySlug = program.universitySlug || program.university?.slug;
    if (universitySlug && courseSlug) {
      urls.push({
        loc: `/universities/${universitySlug}/courses/${courseSlug}`,
        changefreq: 'monthly',
        priority: '0.7'
      });
    }
  });

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${BASE_URL}${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

/**
 * Generate sitemap as a route handler
 */
export function generateSitemapRoute(data) {
  const sitemap = generateSitemap(data);
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}

