import TestimonialCarousel from './TestimonialCarousel';
import { bangladeshTestimonials } from '../../data/shardaData';

/**
 * Example usage of TestimonialCarousel component
 * Feature: sharda-university-content-enhancement
 */

// Example 1: Basic usage with all testimonials
export const BasicTestimonialCarousel = () => (
  <TestimonialCarousel testimonials={bangladeshTestimonials} />
);

// Example 2: Filtered by country
export const CountryFilteredCarousel = () => (
  <TestimonialCarousel
    testimonials={bangladeshTestimonials}
    filterByCountry="Bangladesh"
  />
);

// Example 3: Filtered by program
export const ProgramFilteredCarousel = () => (
  <TestimonialCarousel
    testimonials={bangladeshTestimonials}
    filterByProgram="B.Tech"
  />
);

// Example 4: With user country for prioritization
export const PrioritizedCarousel = () => (
  <TestimonialCarousel
    testimonials={bangladeshTestimonials}
    userCountry="Bangladesh"
  />
);

// Example 5: With custom styling
export const StyledCarousel = () => (
  <TestimonialCarousel
    testimonials={bangladeshTestimonials}
    className="bg-gray-50"
  />
);

// Example 6: Mixed testimonials (text and video)
const mixedTestimonials = [
  ...bangladeshTestimonials,
  {
    id: 'test-video-1',
    studentName: 'Amit Kumar',
    country: 'India',
    program: 'MBA',
    graduationYear: 2023,
    currentPosition: 'Product Manager at Google',
    testimonialText: 'Sharda University MBA program transformed my career.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    achievement: 'Placed at Google with INR 25 LPA package',
  },
];

export const MixedMediaCarousel = () => (
  <TestimonialCarousel testimonials={mixedTestimonials} />
);

// Example 7: With photos
const testimonialsWithPhotos = bangladeshTestimonials.map((t, index) => ({
  ...t,
  photo: `https://i.pravatar.cc/150?img=${index + 1}`,
}));

export const PhotoCarousel = () => (
  <TestimonialCarousel testimonials={testimonialsWithPhotos} />
);

// Example 8: Empty state
export const EmptyCarousel = () => (
  <TestimonialCarousel testimonials={[]} />
);

// Example 9: Single testimonial
export const SingleTestimonial = () => (
  <TestimonialCarousel testimonials={[bangladeshTestimonials[0]]} />
);

// Example 10: Complete integration example
export const CompleteExample = () => {
  // Simulate user from Bangladesh
  const userCountry = 'Bangladesh';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Student Testimonials
        </h1>
        <TestimonialCarousel
          testimonials={testimonialsWithPhotos}
          userCountry={userCountry}
          className="mb-12"
        />
      </div>
    </div>
  );
};

export default {
  BasicTestimonialCarousel,
  CountryFilteredCarousel,
  ProgramFilteredCarousel,
  PrioritizedCarousel,
  StyledCarousel,
  MixedMediaCarousel,
  PhotoCarousel,
  EmptyCarousel,
  SingleTestimonial,
  CompleteExample,
};
