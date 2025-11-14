# Google Search Console - Fixing Old Site URLs

## Problem
The domain `nextgenlearning.dev` was previously linked to another site (a blog). Google Search Console is showing 404 errors for old blog URLs that no longer exist on the new NextGen Learning site.

## Old URLs Showing 404 Errors:
1. `/index.xml` (RSS feed)
2. `/categories/ai-training/` (blog categories)
3. `/categories/` (blog categories index)
4. `/tags/performance-analysis/` (blog tags)
5. `/tags/data-visualization/` (blog tags)
6. `/posts/` (blog posts index)
7. `/lora-vs-full-fine-tuning/` (old blog post)
8. `/lora-fine-tuning-explained/` (old blog post)
9. `/privacy-policy/` (with trailing slash)
10. `/terms-and-conditions/` (with trailing slash)

## Solutions Implemented

### 1. ✅ Redirects Added (vercel.json)
- `/index.xml` → `/` (homepage)
- `/categories/*` → `/program-categories`
- `/tags/*` → `/guides`
- `/posts/*` → `/guides`
- `/lora-*` → `/guides`
- `/privacy-policy/` → `/privacy-policy` (remove trailing slash)
- `/terms-and-conditions/` → `/terms-and-conditions` (remove trailing slash)

### 2. ✅ Robots.txt Updated
- Added `Disallow` rules for old blog paths
- Prevents crawlers from accessing old URLs

### 3. ✅ Routes Added
- Added routes for trailing slash versions of privacy-policy and terms-and-conditions

## Next Steps in Google Search Console

### Option 1: Request URL Removal (Recommended)
1. Go to **Google Search Console** → **Removals** → **New Request**
2. Select **"Remove this URL"**
3. Add each old URL from the list above
4. Submit the request
5. Google will remove them from search results within a few days

### Option 2: Wait for Re-crawl
- Google will eventually re-crawl these URLs
- They will see the 301 redirects or 404s
- The redirects will help Google understand the new site structure
- 404s will eventually drop from the index

### Option 3: Use URL Inspection Tool
1. Go to **URL Inspection** tool in Search Console
2. Enter each old URL
3. Click **"Request Indexing"** after the redirect is in place
4. This helps Google discover the redirects faster

## Monitoring
- Check **Page indexing** report weekly
- Monitor **404 errors** decreasing over time
- Verify redirects are working (use browser dev tools or curl)

## Expected Timeline
- **Immediate**: Redirects are live
- **1-2 weeks**: Google re-crawls old URLs
- **2-4 weeks**: 404 errors start decreasing
- **1-2 months**: Most old URLs removed from index

## Verification Commands

```bash
# Test redirects
curl -I https://www.nextgenlearning.dev/index.xml
curl -I https://www.nextgenlearning.dev/categories/ai-training/
curl -I https://www.nextgenlearning.dev/privacy-policy/

# Should return 301 redirects
```

## Notes
- All redirects are **301 (permanent)** to signal to Google that the content has permanently moved
- The new site structure is completely different (tech courses vs blog)
- Old blog content is not migrated, so redirects point to relevant new pages
- Trailing slash redirects ensure consistent URL structure

