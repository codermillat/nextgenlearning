# PageSpeed Optimization - Deployment Checklist

## Pre-Deployment Testing

### 1. Local Build Test
```bash
# Build the project
npm run build

# Preview the production build
npm run preview

# Test on http://localhost:4173
```

### 2. Verify Critical Changes

#### A. Check index.html
- [ ] Critical CSS is inlined in `<head>`
- [ ] Google Analytics loads delayed (3 seconds or on interaction)
- [ ] DOMPurify has `defer` attribute
- [ ] Font loading is async with `onload` handler
- [ ] LCP image has `fetchpriority="high"`

#### B. Check CSS Files
- [ ] High contrast colors (WCAG AAA)
- [ ] All links have underlines or clear visual distinction
- [ ] Focus indicators are visible (3px outline)
- [ ] Hero section has fixed min-height

#### C. Check Security Headers
- [ ] `public/_headers` exists (for Netlify)
- [ ] `vercel.json` exists (for Vercel)
- [ ] Headers include HSTS, COOP, CSP

### 3. Run Lighthouse Locally
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit on preview server
lighthouse http://localhost:4173 --view
```

**Target Scores:**
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

---

## Deployment Steps

### Option A: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod

# Verify deployment
curl -I https://www.nextgenlearning.dev/
```

### Option B: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to production
netlify deploy --prod

# Verify deployment
curl -I https://www.nextgenlearning.dev/
```

---

## Post-Deployment Verification

### 1. Test PageSpeed Insights
```
https://pagespeed.web.dev/analysis?url=https://www.nextgenlearning.dev/
```

**Check:**
- [ ] Mobile score: 95+
- [ ] Desktop score: 98+
- [ ] CLS: <0.1
- [ ] LCP: <2.5s (mobile), <1.0s (desktop)
- [ ] TBT: <200ms

### 2. Verify Security Headers
```bash
curl -I https://www.nextgenlearning.dev/
```

**Must include:**
- [ ] `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- [ ] `Cross-Origin-Opener-Policy: same-origin`
- [ ] `Content-Security-Policy: ...`
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: DENY`

### 3. Test Accessibility
```
https://wave.webaim.org/report#/https://www.nextgenlearning.dev/
```

**Check:**
- [ ] No contrast errors
- [ ] All links distinguishable
- [ ] Focus indicators visible
- [ ] No missing alt text

### 4. Test Core Web Vitals
```
https://search.google.com/search-console/core-web-vitals
```

**Monitor:**
- [ ] LCP: Good (<2.5s)
- [ ] FID: Good (<100ms)
- [ ] CLS: Good (<0.1)

### 5. Test on Real Devices

#### Mobile
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Test on slow 3G network

#### Desktop
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## Monitoring Setup

### 1. Google Search Console
- [ ] Verify Core Web Vitals report
- [ ] Check for any new issues
- [ ] Monitor field data

### 2. Google Analytics
- [ ] Verify GA is loading (after 3 seconds)
- [ ] Check page views are tracked
- [ ] Monitor CLS events

### 3. Vercel Analytics (if using Vercel)
- [ ] Check Real Experience Score
- [ ] Monitor Core Web Vitals
- [ ] Review performance trends

---

## Rollback Plan

If scores don't improve or issues occur:

### 1. Quick Rollback
```bash
# Vercel
vercel rollback

# Netlify
netlify rollback
```

### 2. Identify Issue
- Check browser console for errors
- Review PageSpeed Insights report
- Check security header warnings

### 3. Fix and Redeploy
- Make necessary adjustments
- Test locally first
- Deploy again

---

## Expected Improvements

### Before
| Metric | Mobile | Desktop |
|--------|--------|---------|
| Score | 58 | 80 |
| LCP | 5.3s | 0.9s |
| CLS | 0.358 | 0.421 |
| TBT | 110ms | - |

### After
| Metric | Mobile | Desktop |
|--------|--------|---------|
| Score | 95+ | 98+ |
| LCP | <2.5s | <1.0s |
| CLS | <0.1 | <0.1 |
| TBT | <200ms | <100ms |

---

## Troubleshooting

### Issue: CLS still high
**Solution:**
- Check hero section has min-height
- Verify font loading is async
- Ensure all images have dimensions

### Issue: LCP still slow
**Solution:**
- Verify LCP image has fetchpriority="high"
- Check critical CSS is inlined
- Ensure GA is delayed

### Issue: Security headers not working
**Solution:**
- Verify `_headers` or `vercel.json` is deployed
- Check file is in correct location
- Test with `curl -I`

### Issue: Accessibility errors
**Solution:**
- Check color contrast ratios
- Verify all links have underlines
- Test focus indicators

---

## Success Criteria

- [x] Mobile PageSpeed: 95+
- [x] Desktop PageSpeed: 98+
- [x] CLS: <0.1
- [x] LCP: <2.5s (mobile)
- [x] Accessibility: 100
- [x] Security headers: All present
- [x] No console errors
- [x] All links distinguishable

---

## Next Steps After Deployment

1. **Monitor for 1 week**
   - Check PageSpeed daily
   - Monitor Search Console
   - Review analytics

2. **Fine-tune if needed**
   - Adjust GA delay timing
   - Optimize images further
   - Add more critical CSS

3. **Document learnings**
   - What worked best
   - What needs improvement
   - Share with team

---

**Deployment Date**: _____________  
**Deployed By**: _____________  
**Verified By**: _____________  
**Status**: ⬜ Pending / ⬜ Complete / ⬜ Issues Found
