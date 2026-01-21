import { memo } from 'react';
import Button from '../Common/Button';
import { typography, spacing } from '../../utils/designTokens';

/**
 * CTA Section Component for Home Page
 * Call-to-action section at bottom of page
 */
const CTASection = memo(function CTASection() {
  return (
    <section className={`cta ${spacing.sectionMedium} px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden`}>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className={`${typography.sectionTitle} mb-4 sm:mb-6`}>Ready to Start Your Tech Journey?</h2>
        <p className={`${typography.bodyLarge} mb-8 sm:mb-10 text-blue-50 max-w-2xl mx-auto`}>
          Explore tech courses and find the perfect program for your career. Get free counseling and application assistance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button to="/courses" variant="white" size="md">
            Browse Tech Courses
          </Button>
          <Button to="/apply" variant="secondary" size="md">
            Apply Now - Free
          </Button>
        </div>
      </div>
    </section>
  );
});

export default CTASection;
