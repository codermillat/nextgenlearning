import { memo } from 'react';
import Button from '../Common/Button';
import { typography } from '../../utils/designTokens';

/**
 * Hero Section Component for Home Page
 * Displays the main hero banner with CTA buttons
 */
const HeroSection = memo(function HeroSection() {
  return (
    <section className="hero bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-16 sm:py-20 md:py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="mb-6 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/30">
            🎓 Your Gateway to Tech Education
          </div>
        </div>
        <h1 className={`${typography.pageTitle} mb-6 sm:mb-8 animate-slide-up`}>
          NextGen Learning
          <span className={`block ${typography.pageTitleSubtext} mt-3 text-blue-50`}>
            Tech & IT Courses
          </span>
        </h1>
        <p className={`${typography.bodyLarge} mb-8 sm:mb-10 text-blue-100 px-2 max-w-3xl mx-auto leading-relaxed`}>
          Compare computer science, data science, AI/ML, cybersecurity, cloud computing, and more tech courses across top Indian universities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-2">
          <Button to="/courses" variant="white" size="md">
            Browse Tech Courses
          </Button>
          <Button to="/universities" variant="secondary" size="md">
            View Universities
          </Button>
          <Button to="/compare" variant="secondary" size="md">
            Compare Courses
          </Button>
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
