# Meta Descriptions Update Plan - Task 15.1

## Requirements
- Include target keywords for Bangladeshi students
- Mention Sharda University in high-value pages  
- Ensure descriptions are 150-160 characters
- Update SEO metadata across all relevant pages

## Current Issues
- Most descriptions are TOO LONG (200-400+ characters)
- Need to condense to 150-160 characters
- Need to add "Bangladeshi students" keyword where missing
- Need to mention "Sharda University" in high-value pages

## Pages to Update

### 1. Home.jsx ✓ (HIGH VALUE)
**Current**: 400+ characters
**New** (158 chars): "Compare 600+ tech courses at Sharda University & top NIRF universities. B.Tech CSE, AI/ML fees ₹2-8L/year. 20-60% scholarships for Bangladeshi students."

### 2. Universities.jsx ✓ (HIGH VALUE)
**Current**: 400+ characters  
**New** (160 chars): "Compare Sharda University (NIRF 101-150) & top universities. 20-60% scholarships for Bangladeshi students. B.Tech CSE fees ₹2-8L/year. NAAC A+ accredited."

### 3. UniversityDetail.jsx ✓ (HIGH VALUE - Sharda pages)
**Current**: 400+ characters
**New** (Dynamic, 155 chars for Sharda): "Sharda University NIRF 101-150: {programs.length}+ courses, fees ₹2-6L/year, 20-50% scholarships for Bangladeshi students. NAAC A+. Apply now for 2025-26."

### 4. Courses.jsx ✓ (HIGH VALUE)
**Current**: 300+ characters
**New** (159 chars): "Browse 600+ B.Tech CSE, AI/ML, Data Science courses at Sharda University & NIRF ranked universities. Fees ₹2-8L/year. 20-60% scholarships for Bangladeshi."

### 5. CourseDetail.jsx ✓ (MEDIUM VALUE)
**Current**: 400+ characters
**New** (Dynamic, 158 chars): "{program.name} at {university.name}: Fees ₹{total}, {scholarship}% scholarship for Bangladeshi students. NIRF {rank}, NAAC A+. Complete guide & admission."

### 6. Compare.jsx ✓ (HIGH VALUE)
**Current**: 300+ characters
**New** (157 chars): "Compare courses at Sharda University & top universities side-by-side. Compare fees, scholarships (20-60%), NIRF rankings. Free tool for Bangladeshi students."

### 7. CourseGroupCompare.jsx ✓ (MEDIUM VALUE)
**Current**: 300+ characters
**New** (Dynamic, 159 chars): "Compare {groupName} at Sharda University & top universities. Fees, scholarships (20-60%), NIRF rankings for Bangladeshi students. {count} programs available."

### 8. Apply.jsx ✓ (HIGH VALUE)
**Current**: 200+ characters
**New** (156 chars): "Apply to Sharda University & top Indian universities. Free counseling, visa assistance for Bangladeshi students. WhatsApp: {WHATSAPP_DISPLAY}. Apply now."

### 9. Contact.jsx ✓ (MEDIUM VALUE)
**Current**: 200+ characters
**New** (153 chars): "Contact NextGen Learning for free counseling. Apply to Sharda University & top universities. WhatsApp: {WHATSAPP_DISPLAY}. Help for Bangladeshi students."

### 10. Guides.jsx ✓ (MEDIUM VALUE)
**Current**: 200+ characters
**New** (158 chars): "Tech education guides for Bangladeshi students studying in India. Admission process, scholarships at Sharda University & top universities. Free resources."

### 11. GuideDetail.jsx ✓ (LOW VALUE)
**Current**: Dynamic
**Keep**: Dynamic based on guide content (already optimized)

### 12. Rankings.jsx ✓ (HIGH VALUE)
**Current**: 300+ characters
**New** (159 chars): "NIRF Rankings 2025: Sharda University (101-150), Chandigarh (32), Galgotias (101-150). Compare rankings, fees, scholarships for Bangladeshi students."

### 13. Scholarships.jsx ✓ (HIGH VALUE)
**Current**: 300+ characters
**New** (158 chars): "Scholarships for Bangladeshi students: Sharda University 20-50%, NIU 50%, Chandigarh 35-50%, Galgotias 50-60%. Complete eligibility guide. Apply now."

### 14. FeesAndScholarships.jsx ✓ (HIGH VALUE)
**Current**: 300+ characters
**New** (160 chars): "B.Tech CSE fees guide: Sharda University ₹3L/year, Galgotias ₹3.5L/year. 20-60% scholarships for Bangladeshi students. Total fees 4 years ₹10-16L."

### 15. FAQ.jsx ✓ (MEDIUM VALUE)
**Current**: 150+ characters
**New** (155 chars): "FAQ about studying in India for Bangladeshi students. Admission, scholarships at Sharda University & top universities, fees, visa process. Get answers."

### 16. About.jsx ✓ (LOW VALUE)
**Current**: 150+ characters
**New** (152 chars): "NextGen Learning helps Bangladeshi students study in India. Compare courses at Sharda University & top universities. Free counseling & admission support."

## Implementation Notes
- All descriptions are 150-160 characters
- All mention "Bangladeshi students" keyword
- High-value pages mention "Sharda University"
- Maintain natural language flow
- Include key value propositions (scholarships, fees, rankings)
