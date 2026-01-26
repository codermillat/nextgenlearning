# TestimonialCarousel Component

## Overview

The `TestimonialCarousel` component displays student testimonials in an interactive carousel format with filtering capabilities, lazy loading, and prioritization logic for specific user groups.

**Feature**: sharda-university-content-enhancement  
**Validates**: Requirements 2.4, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7

## Features

- ✅ **Carousel Navigation**: Auto-playing carousel with manual controls
- ✅ **Country Filtering**: Filter testimonials by student country
- ✅ **Program Filtering**: Filter testimonials by academic program
- ✅ **Media Support**: Displays both text testimonials and video testimonials
- ✅ **Lazy Loading**: Images and videos load lazily for performance
- ✅ **Prioritization**: Bangladeshi testimonials shown first for Bangladeshi users
- ✅ **Responsive Design**: Mobile-optimized layout
- ✅ **Accessibility**: Full keyboard navigation and ARIA labels

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `testimonials` | `Array<Testimonial>` | Yes | - | Array of testimonial objects |
| `filterByCountry` | `string` | No | `''` | Initial country filter |
| `filterByProgram` | `string` | No | `''` | Initial program filter |
| `userCountry` | `string` | No | - | User's country for prioritization |
| `className` | `string` | No | `''` | Additional CSS classes |

### Testimonial Object Structure

```javascript
{
  id: string,              // Unique identifier
  studentName: string,     // Student's full name
  country: string,         // Student's country
  program: string,         // Academic program
  graduationYear: number,  // Year of graduation
  currentPosition: string, // Current job/position
  testimonialText: string, // Testimonial content
  photo?: string,          // Optional photo URL
  videoUrl?: string,       // Optional video URL (YouTube embed)
  achievement: string      // Notable achievement
}
```

## Usage Examples

### Basic Usage

```jsx
import TestimonialCarousel from './components/Sharda/TestimonialCarousel';
import { bangladeshTestimonials } from './data/shardaData';

function App() {
  return (
    <TestimonialCarousel testimonials={bangladeshTestimonials} />
  );
}
```

### With Country Filter

```jsx
<TestimonialCarousel
  testimonials={testimonials}
  filterByCountry="Bangladesh"
/>
```

### With Program Filter

```jsx
<TestimonialCarousel
  testimonials={testimonials}
  filterByProgram="B.Tech"
/>
```

### With User Prioritization

```jsx
<TestimonialCarousel
  testimonials={testimonials}
  userCountry="Bangladesh"  // Bangladeshi testimonials shown first
/>
```

### With Custom Styling

```jsx
<TestimonialCarousel
  testimonials={testimonials}
  className="bg-gray-50 py-20"
/>
```

### Complete Integration

```jsx
import { useState, useEffect } from 'react';
import TestimonialCarousel from './components/Sharda/TestimonialCarousel';
import { shardaUniversityData } from './data/shardaData';

function TestimonialsPage() {
  const [userCountry, setUserCountry] = useState('');

  useEffect(() => {
    // Detect user country (example)
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => setUserCountry(data.country_name))
      .catch(() => setUserCountry(''));
  }, []);

  return (
    <div className="min-h-screen">
      <TestimonialCarousel
        testimonials={shardaUniversityData.bangladeshContent.testimonials}
        userCountry={userCountry}
      />
    </div>
  );
}
```

## Features in Detail

### 1. Carousel Auto-Play

The carousel automatically advances every 5 seconds. Auto-play pauses when users interact with navigation controls.

```jsx
// Auto-play is enabled by default
<TestimonialCarousel testimonials={testimonials} />

// Users can pause by clicking navigation arrows or dots
```

### 2. Filtering

Users can filter testimonials by country and program using dropdown selects:

```jsx
// Filters are interactive and update the carousel in real-time
// Multiple filters work together (AND logic)
```

### 3. Lazy Loading

Images and videos use lazy loading for optimal performance:

```jsx
// Images use loading="lazy" attribute
<img src={photo} loading="lazy" alt="..." />

// Videos (iframes) also use loading="lazy"
<iframe src={videoUrl} loading="lazy" />
```

### 4. Prioritization Logic

When `userCountry` is set to "Bangladesh", Bangladeshi student testimonials appear first:

```jsx
<TestimonialCarousel
  testimonials={allTestimonials}
  userCountry="Bangladesh"
  // Bangladeshi testimonials will be shown before others
/>
```

### 5. Media Support

The component intelligently displays:
- **Video testimonials**: Full embedded video player
- **Photo testimonials**: Student photo with text
- **Text-only testimonials**: Initials avatar with text

```jsx
// Video testimonial
{
  videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
  // ... other fields
}

// Photo testimonial
{
  photo: 'https://example.com/photo.jpg',
  // ... other fields
}

// Text-only (no photo or video)
{
  // Component shows initials avatar
}
```

## Accessibility

The component follows accessibility best practices:

- ✅ Semantic HTML structure
- ✅ ARIA labels for all interactive elements
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Focus management
- ✅ Descriptive alt text for images

### Keyboard Navigation

- `Tab`: Navigate between controls
- `Enter/Space`: Activate buttons
- `Arrow keys`: Navigate carousel (when focused)

## Responsive Design

The component is fully responsive:

- **Mobile**: Single column layout, touch-friendly controls
- **Tablet**: Optimized spacing and typography
- **Desktop**: Two-column layout with side-by-side content

## Performance Considerations

1. **Lazy Loading**: Images and videos load only when needed
2. **Memoization**: Component uses `memo` to prevent unnecessary re-renders
3. **Efficient Filtering**: Filters use `useCallback` for optimization
4. **Auto-play Management**: Intervals cleaned up properly

## Styling

The component uses Tailwind CSS for styling. Key classes:

- Gradient backgrounds for visual appeal
- Shadow effects for depth
- Smooth transitions for interactions
- Responsive utilities for mobile optimization

## Integration with BangladeshSection

The TestimonialCarousel can be integrated into the BangladeshSection:

```jsx
import BangladeshSection from './components/Sharda/BangladeshSection';
import TestimonialCarousel from './components/Sharda/TestimonialCarousel';
import { shardaUniversityData } from './data/shardaData';

function ShardaPage() {
  return (
    <>
      <BangladeshSection
        bangladeshContent={shardaUniversityData.bangladeshContent}
      />
      <TestimonialCarousel
        testimonials={shardaUniversityData.bangladeshContent.testimonials}
        userCountry="Bangladesh"
      />
    </>
  );
}
```

## Testing

See `TestimonialCarousel.test.jsx` for unit tests and property-based tests.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- `BangladeshSection`: Displays Bangladesh-specific content
- `WhatsAppCTA`: Call-to-action for WhatsApp engagement
- `ApplicationCTA`: Application call-to-action buttons

## Requirements Validation

This component validates the following requirements:

- **2.4**: Showcase testimonials and success stories from Bangladeshi students
- **9.1**: Display at least 5 Bangladeshi student success stories
- **9.2**: Include student name, program, graduation year, and current position
- **9.3**: Include student photos or video testimonials where available
- **9.4**: Organize testimonials by program category
- **9.5**: Prioritize Bangladeshi student stories for Bangladeshi users
- **9.6**: Include specific achievements in testimonial content
- **9.7**: Embed videos with proper loading optimization

## Future Enhancements

Potential improvements for future versions:

- [ ] Touch swipe gestures for mobile
- [ ] Thumbnail preview of all testimonials
- [ ] Social sharing buttons
- [ ] "Read more" expansion for long testimonials
- [ ] Integration with video platforms (YouTube, Vimeo)
- [ ] Testimonial submission form
- [ ] Rating/review system
- [ ] Search functionality
- [ ] Export testimonials feature
