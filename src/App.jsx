import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ErrorBoundary from './components/Common/ErrorBoundary';
import SkipLinks from './components/Common/SkipLinks';
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
const ShardaLandingPage = lazy(() => import('./pages/Sharda/ShardaLandingPage'));
const ShardaNIRFRanking = lazy(() => import('./pages/Sharda/ShardaNIRFRanking'));
const ShardaRanking2026 = lazy(() => import('./pages/Sharda/ShardaRanking2026'));
const ShardaBTechCSEFees = lazy(() => import('./pages/Sharda/ShardaBTechCSEFees'));
const ShardaMBAFees = lazy(() => import('./pages/Sharda/ShardaMBAFees'));
const StudyInIndiaFromBangladesh = lazy(() => import('./pages/Sharda/StudyInIndiaFromBangladesh'));
const ScholarshipBangladeshiStudents = lazy(() => import('./pages/Sharda/ScholarshipBangladeshiStudents'));
const IndianUniversityBangladeshiStudents = lazy(() => import('./pages/Sharda/IndianUniversityBangladeshiStudents'));
const ShardaBTechCSE = lazy(() => import('./pages/Sharda/programs/ShardaBTechCSE'));
const ShardaMBA = lazy(() => import('./pages/Sharda/programs/ShardaMBA'));
const ShardaMBBS = lazy(() => import('./pages/Sharda/programs/ShardaMBBS'));
const ShardaBBA = lazy(() => import('./pages/Sharda/programs/ShardaBBA'));
const ShardaVsAmity = lazy(() => import('./pages/Sharda/ShardaVsAmity'));
const ShardaVsChandigarh = lazy(() => import('./pages/Sharda/ShardaVsChandigarh'));
const BestUniversitiesBangladeshiStudents = lazy(() => import('./pages/Sharda/BestUniversitiesBangladeshiStudents'));
const ForBangladeshiStudents = lazy(() => import('./pages/ForBangladeshiStudents'));

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
          {/* Skip navigation links for accessibility */}
          <SkipLinks />
          <Header />
          <main id="main-content" className="flex-grow overflow-x-hidden" tabIndex={-1}>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/courses" element={<Courses />} />
                <Route path="/" element={<Home />} />
                <Route path="/universities/:universitySlug/courses/:courseSlug" element={<CourseDetail />} />
                <Route path="/courses/compare/:groupId" element={<CourseGroupCompare />} />
                <Route path="/universities" element={<Universities />} />
                <Route path="/universities/sharda-university" element={<Navigate to="/sharda-university" replace />} />
                <Route path="/universities/sharda-university/" element={<Navigate to="/sharda-university" replace />} />
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
                <Route path="/sharda" element={<Navigate to="/sharda-university" replace />} />
                <Route path="/sharda/" element={<Navigate to="/sharda-university" replace />} />
                <Route path="/sharda/admissions" element={<Navigate to="/apply" replace />} />
                <Route path="/sharda/rankings" element={<Navigate to="/sharda-university/ranking-2026" replace />} />
                <Route path="/sharda/fees" element={<Navigate to="/sharda-university/btech-cse-fees" replace />} />
                <Route path="/sharda/programs" element={<Navigate to="/sharda-university/programs/btech-cse" replace />} />
                <Route path="/sharda/programs/btech-cse" element={<Navigate to="/sharda-university/programs/btech-cse" replace />} />
                <Route path="/sharda/programs/mba" element={<Navigate to="/sharda-university/programs/mba" replace />} />
                <Route path="/sharda/programs/mbbs" element={<Navigate to="/sharda-university/programs/mbbs" replace />} />
                <Route path="/sharda/programs/bba" element={<Navigate to="/sharda-university/programs/bba" replace />} />
                <Route path="/sharda/nirf-ranking" element={<Navigate to="/sharda-university/nirf-ranking" replace />} />
                <Route path="/sharda/ranking-2026" element={<Navigate to="/sharda-university/ranking-2026" replace />} />
                <Route path="/sharda/btech-cse-fees" element={<Navigate to="/sharda-university/btech-cse-fees" replace />} />
                <Route path="/sharda/mba-fees" element={<Navigate to="/sharda-university/mba-fees" replace />} />
                <Route path="/sharda/scholarship-bangladeshi-students" element={<Navigate to="/sharda-university/scholarship-bangladeshi-students-india" replace />} />
                <Route path="/sharda/scholarship-bangladeshi-students-india" element={<Navigate to="/sharda-university/scholarship-bangladeshi-students-india" replace />} />
                <Route path="/sharda/study-in-india-from-bangladesh" element={<Navigate to="/sharda-university/study-in-india-from-bangladesh" replace />} />
                <Route path="/sharda/indian-university-bangladeshi-students" element={<Navigate to="/sharda-university/indian-university-bangladeshi-students" replace />} />
                <Route path="/sharda/best-universities-bangladeshi-students" element={<Navigate to="/best-universities-bangladeshi-students-india" replace />} />
                <Route path="/sharda-university" element={<ShardaLandingPage />} />
                <Route path="/sharda-university/nirf-ranking" element={<ShardaNIRFRanking />} />
                <Route path="/sharda-university/ranking-2026" element={<ShardaRanking2026 />} />
                <Route path="/sharda-university/btech-cse-fees" element={<ShardaBTechCSEFees />} />
                <Route path="/sharda-university/mba-fees" element={<ShardaMBAFees />} />
                <Route path="/sharda-university/study-in-india-from-bangladesh" element={<StudyInIndiaFromBangladesh />} />
                <Route path="/sharda-university/scholarship-bangladeshi-students-india" element={<ScholarshipBangladeshiStudents />} />
                <Route path="/sharda-university/indian-university-bangladeshi-students" element={<IndianUniversityBangladeshiStudents />} />
                <Route path="/sharda-university/programs/btech-cse" element={<ShardaBTechCSE />} />
                <Route path="/sharda-university/programs/mba" element={<ShardaMBA />} />
                <Route path="/sharda-university/programs/mbbs" element={<ShardaMBBS />} />
                <Route path="/sharda-university/programs/bba" element={<ShardaBBA />} />
                <Route path="/sharda-vs-amity" element={<ShardaVsAmity />} />
                <Route path="/sharda-vs-chandigarh" element={<ShardaVsChandigarh />} />
                <Route path="/best-universities-bangladeshi-students-india" element={<BestUniversitiesBangladeshiStudents />} />
                <Route path="/for-bangladeshi-students" element={<ForBangladeshiStudents />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
