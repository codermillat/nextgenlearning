/**
 * Example usage of BangladeshSection component
 * Feature: sharda-university-content-enhancement
 * 
 * This file demonstrates various ways to use the BangladeshSection component
 * in different scenarios and configurations.
 */

import { useState, useEffect, useRef } from 'react';
import BangladeshSection from './BangladeshSection';
import { bangladeshContent } from '../../data/shardaData';

// ============================================================================
// Example 1: Basic Usage
// ============================================================================

export function BasicExample() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BangladeshSection bangladeshContent={bangladeshContent} />
    </div>
  );
}

// ============================================================================
// Example 2: With Custom Styling
// ============================================================================

export function CustomStyledExample() {
  return (
    <div className="min-h-screen">
      <BangladeshSection
        bangladeshContent={bangladeshContent}
        className="shadow-2xl border-t-4 border-green-600"
      />
    </div>
  );
}

// ============================================================================
// Example 3: Conditional Rendering Based on User Country
// ============================================================================

export function ConditionalExample({ userCountry }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Sharda University</h1>
          <p className="text-xl mt-2">Your Gateway to World-Class Education</p>
        </div>
      </header>

      {/* Show Bangladesh section only for Bangladeshi users */}
      {userCountry === 'Bangladesh' && (
        <BangladeshSection bangladeshContent={bangladeshContent} />
      )}

      {/* Other content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">About Sharda University</h2>
          <p className="text-gray-600">
            Sharda University is a leading private university in India...
          </p>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// Example 4: In a Landing Page with Multiple Sections
// ============================================================================

export function LandingPageExample() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Sharda University</h1>
          <p className="text-2xl mb-8">Inspiring Excellence Since 2009</p>
          <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100">
            Apply Now
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">About Us</h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Sharda University is a premier educational institution with students from 95+ countries...
          </p>
        </div>
      </section>

      {/* Bangladesh Section */}
      <BangladeshSection bangladeshContent={bangladeshContent} />

      {/* Programs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Our Programs</h2>
          {/* Program cards */}
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// Example 5: With Partial Data (Graceful Degradation)
// ============================================================================

export function PartialDataExample() {
  // Example with only some sections of data
  const partialContent = {
    scholarships: bangladeshContent.scholarships,
    admissionProcess: bangladeshContent.admissionProcess,
    culturalInfo: {
      proximity: 'Just 2-3 hours flight from Dhaka',
      climate: 'Similar to Bangladesh',
    },
    visaGuidance: {},
    financialGuidance: {},
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BangladeshSection bangladeshContent={partialContent} />
    </div>
  );
}

// ============================================================================
// Example 6: With Loading State
// ============================================================================

export function LoadingStateExample({ isLoading, bangladeshData }) {
  if (isLoading) {
    return (
      <div className="py-16 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BangladeshSection bangladeshContent={bangladeshData || bangladeshContent} />
  );
}

// ============================================================================
// Example 7: With Error Boundary
// ============================================================================

import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('BangladeshSection Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-16 bg-red-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-red-800 mb-4">
              Something went wrong
            </h2>
            <p className="text-red-600">
              We're having trouble loading the Bangladesh section. Please try again later.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function WithErrorBoundaryExample() {
  return (
    <ErrorBoundary>
      <BangladeshSection bangladeshContent={bangladeshContent} />
    </ErrorBoundary>
  );
}

// ============================================================================
// Example 8: With Analytics Tracking
// ============================================================================

export function WithAnalyticsExample() {
  useEffect(() => {
    // Track section view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_bangladesh_section', {
        event_category: 'engagement',
        event_label: 'Bangladesh Section Viewed',
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <BangladeshSection bangladeshContent={bangladeshContent} />
    </div>
  );
}

// ============================================================================
// Example 9: With Scroll Animation
// ============================================================================

export function WithScrollAnimationExample() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        ref={sectionRef}
        className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <BangladeshSection bangladeshContent={bangladeshContent} />
      </div>
    </div>
  );
}

// ============================================================================
// Example 10: With Custom WhatsApp Message
// ============================================================================

export function CustomWhatsAppExample() {
  // Note: The WhatsAppCTA component inside BangladeshSection
  // automatically generates contextual messages based on the "bangladesh" context
  // This example shows the component works seamlessly with that integration

  return (
    <div className="min-h-screen bg-gray-50">
      <BangladeshSection bangladeshContent={bangladeshContent} />

      {/* Additional context or information */}
      <section className="py-8 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-700">
            💬 Our Bangladesh admissions team is available on WhatsApp to answer all your questions!
          </p>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// Default Export: All Examples
// ============================================================================

export default function AllExamples() {
  return (
    <div className="space-y-16">
      <section>
        <h2 className="text-3xl font-bold mb-4 px-4">Example 1: Basic Usage</h2>
        <BasicExample />
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 px-4">Example 2: Custom Styled</h2>
        <CustomStyledExample />
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 px-4">Example 3: Conditional Rendering</h2>
        <ConditionalExample userCountry="Bangladesh" />
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 px-4">Example 4: In Landing Page</h2>
        <LandingPageExample />
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 px-4">Example 5: Partial Data</h2>
        <PartialDataExample />
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 px-4">Example 6: With Loading State</h2>
        <LoadingStateExample isLoading={false} bangladeshData={bangladeshContent} />
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 px-4">Example 7: With Error Boundary</h2>
        <WithErrorBoundaryExample />
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 px-4">Example 8: With Analytics</h2>
        <WithAnalyticsExample />
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 px-4">Example 9: With Scroll Animation</h2>
        <WithScrollAnimationExample />
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4 px-4">Example 10: Custom WhatsApp</h2>
        <CustomWhatsAppExample />
      </section>
    </div>
  );
}
