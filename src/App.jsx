import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ErrorBoundary from './components/Common/ErrorBoundary';
import { trackPageView } from './utils/analytics';

// Lazy load routes for code splitting
const Home = lazy(() => import('./pages/Home'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const CourseGroupCompare = lazy(() => import('./pages/CourseGroupCompare'));
const Universities = lazy(() => import('./pages/Universities'));
const UniversityDetail = lazy(() => import('./pages/UniversityDetail'));
const Compare = lazy(() => import('./pages/Compare'));
const Apply = lazy(() => import('./pages/Apply'));
const NotFound = lazy(() => import('./pages/NotFound'));
const UniversityCourses = lazy(() => import('./pages/UniversityCourses'));
const Scholarships = lazy(() => import('./pages/Scholarships'));
const ProgramCategories = lazy(() => import('./pages/ProgramCategories'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const Guides = lazy(() => import('./pages/Guides'));
const GuideDetail = lazy(() => import('./pages/GuideDetail'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Rankings = lazy(() => import('./pages/Rankings'));
const FeesAndScholarships = lazy(() => import('./pages/FeesAndScholarships'));

// Component to track page views on route changes and clean up query parameters
function PageViewTracker() {
  const location = useLocation();
  
  useEffect(() => {
    // Remove unwanted query parameters (like ?m=1) from URL
    const url = new URL(window.location.href);
    let shouldUpdate = false;
    
    // Remove mobile query parameter if present
    if (url.searchParams.has('m')) {
      url.searchParams.delete('m');
      shouldUpdate = true;
    }
    
    // Update URL if query parameters were removed (without page reload)
    if (shouldUpdate) {
      const newUrl = url.pathname + (url.search || '');
      window.history.replaceState({}, '', newUrl);
    }
    
    // Track page view with clean URL (without query parameters)
    trackPageView(location.pathname);
  }, [location]);
  
  return null;
}

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[400px]" aria-live="polite" aria-busy="true">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" role="status" aria-label="Loading">
        <span className="sr-only">Loading...</span>
      </div>
      <p className="text-gray-700">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <PageViewTracker />
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          {/* Skip to main content link for screen readers */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-grow overflow-x-hidden" tabIndex={-1}>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/courses" element={<Courses />} />
                <Route path="/" element={<Home />} />
                <Route path="/universities/:universitySlug/courses/:courseSlug" element={<CourseDetail />} />
                <Route path="/courses/compare/:groupId" element={<CourseGroupCompare />} />
                <Route path="/universities" element={<Universities />} />
                <Route path="/universities/:universitySlug" element={<UniversityDetail />} />
                <Route path="/universities/:universitySlug/courses" element={<UniversityCourses />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/apply" element={<Apply />} />
                <Route path="/scholarships" element={<Scholarships />} />
                <Route path="/program-categories" element={<ProgramCategories />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/guides/:slug" element={<GuideDetail />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/rankings" element={<Rankings />} />
                <Route path="/fees-scholarships" element={<FeesAndScholarships />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
