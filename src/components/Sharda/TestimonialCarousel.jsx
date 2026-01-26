import { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import useReducedMotion from '../../hooks/useReducedMotion';

/**
 * TestimonialCarousel Component
 * Feature: sharda-university-content-enhancement
 * 
 * Displays student testimonials in a carousel format with:
 * - Filtering by country and program
 * - Support for both text and video testimonials
 * - Lazy loading for images and videos
 * - Prioritization logic for Bangladeshi users
 * - Respects prefers-reduced-motion for accessibility
 * 
 * Validates: Requirements 2.4, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 19.6
 * 
 * @param {Object} props - Component props
 * @param {Array} props.testimonials - Array of testimonial objects
 * @param {string} [props.filterByCountry] - Filter testimonials by country
 * @param {string} [props.filterByProgram] - Filter testimonials by program
 * @param {string} [props.userCountry] - User's country for prioritization
 * @param {string} [props.className] - Additional CSS classes
 */
const TestimonialCarousel = memo(function TestimonialCarousel({
  testimonials = [],
  filterByCountry,
  filterByProgram,
  userCountry,
  className = '',
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(filterByCountry || '');
  const [selectedProgram, setSelectedProgram] = useState(filterByProgram || '');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  // Filter and prioritize testimonials
  const filteredTestimonials = useCallback(() => {
    let filtered = [...testimonials];

    // Apply country filter
    if (selectedCountry) {
      filtered = filtered.filter(t => t.country === selectedCountry);
    }

    // Apply program filter
    if (selectedProgram) {
      filtered = filtered.filter(t => t.program.toLowerCase().includes(selectedProgram.toLowerCase()));
    }

    // Prioritize Bangladeshi testimonials for Bangladeshi users
    if (userCountry === 'Bangladesh' && !selectedCountry) {
      const bangladeshiTestimonials = filtered.filter(t => t.country === 'Bangladesh');
      const otherTestimonials = filtered.filter(t => t.country !== 'Bangladesh');
      filtered = [...bangladeshiTestimonials, ...otherTestimonials];
    }

    return filtered;
  }, [testimonials, selectedCountry, selectedProgram, userCountry]);

  const displayedTestimonials = filteredTestimonials();

  // Get unique countries and programs for filters
  const countries = [...new Set(testimonials.map(t => t.country))].sort();
  const programs = [...new Set(testimonials.map(t => t.program))].sort();

  // Auto-play carousel (disabled if user prefers reduced motion)
  useEffect(() => {
    if (!isAutoPlaying || displayedTestimonials.length <= 1 || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % displayedTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, displayedTestimonials.length, prefersReducedMotion]);

  // Reset index when filters change
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCountry, selectedProgram]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => 
      prev === 0 ? displayedTestimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => (prev + 1) % displayedTestimonials.length);
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentTestimonial = displayedTestimonials[currentIndex];

  if (displayedTestimonials.length === 0 || !currentTestimonial) {
    return (
      <div className={`py-8 text-center ${className}`}>
        <p className="text-gray-500">No testimonials available for the selected filters.</p>
      </div>
    );
  }

  return (
    <section
      className={`py-12 ${className}`}
      data-section="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Student Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our students about their journey at Sharda University
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {/* Country Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="country-filter" className="text-sm font-medium text-gray-700">
              Country:
            </label>
            <select
              id="country-filter"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Filter testimonials by country"
            >
              <option value="">All Countries</option>
              {countries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Program Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="program-filter" className="text-sm font-medium text-gray-700">
              Program:
            </label>
            <select
              id="program-filter"
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Filter testimonials by program"
            >
              <option value="">All Programs</option>
              {programs.map(program => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Main Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Side - Student Info and Media */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white flex flex-col justify-center items-center">
                {/* Video or Photo */}
                {currentTestimonial.videoUrl ? (
                  <div className="w-full mb-6">
                    <div className="aspect-video bg-black/20 rounded-lg overflow-hidden">
                      <iframe
                        src={currentTestimonial.videoUrl}
                        title={`Video testimonial from ${currentTestimonial.studentName}`}
                        className="w-full h-full"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ) : currentTestimonial.photo ? (
                  <div className="mb-6">
                    <img
                      src={currentTestimonial.photo}
                      alt={`${currentTestimonial.studentName} - ${currentTestimonial.program} student`}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="mb-6">
                    <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center border-4 border-white shadow-lg">
                      <span className="text-5xl font-bold">
                        {currentTestimonial.studentName.charAt(0)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Student Details */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">
                    {currentTestimonial.studentName}
                  </h3>
                  <p className="text-white/90 mb-1">
                    {currentTestimonial.program}
                  </p>
                  <p className="text-white/80 text-sm mb-1">
                    Class of {currentTestimonial.graduationYear}
                  </p>
                  <p className="text-white/80 text-sm flex items-center justify-center gap-2">
                    <span role="img" aria-label={`From ${currentTestimonial.country}`}>
                      🌍
                    </span>
                    {currentTestimonial.country}
                  </p>
                </div>

                {/* Current Position */}
                <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-center">
                  <p className="text-sm text-white/80 mb-1">Currently</p>
                  <p className="font-semibold">{currentTestimonial.currentPosition}</p>
                </div>
              </div>

              {/* Right Side - Testimonial Content */}
              <div className="p-8 flex flex-col justify-center">
                {/* Quote Icon */}
                <div className="text-blue-600 mb-4">
                  <svg
                    className="w-12 h-12"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
                  {currentTestimonial.testimonialText}
                </blockquote>

                {/* Achievement Badge */}
                {currentTestimonial.achievement && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl" role="img" aria-label="Achievement">
                        🏆
                      </span>
                      <div>
                        <p className="font-semibold text-yellow-800 text-sm mb-1">
                          Achievement
                        </p>
                        <p className="text-yellow-700 text-sm">
                          {currentTestimonial.achievement}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {displayedTestimonials.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Next testimonial"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Dots Navigation */}
        {displayedTestimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {displayedTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  index === currentIndex
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        )}

        {/* Testimonial Count */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Showing {currentIndex + 1} of {displayedTestimonials.length} testimonials
          {(selectedCountry || selectedProgram) && (
            <button
              onClick={() => {
                setSelectedCountry('');
                setSelectedProgram('');
              }}
              className="ml-2 text-blue-600 hover:text-blue-700 underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
    </section>
  );
});

TestimonialCarousel.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      studentName: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      program: PropTypes.string.isRequired,
      graduationYear: PropTypes.number.isRequired,
      currentPosition: PropTypes.string.isRequired,
      testimonialText: PropTypes.string.isRequired,
      photo: PropTypes.string,
      videoUrl: PropTypes.string,
      achievement: PropTypes.string.isRequired,
    })
  ).isRequired,
  filterByCountry: PropTypes.string,
  filterByProgram: PropTypes.string,
  userCountry: PropTypes.string,
  className: PropTypes.string,
};

export default TestimonialCarousel;
