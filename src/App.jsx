import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import CourseGroupCompare from './pages/CourseGroupCompare';
import Universities from './pages/Universities';
import UniversityDetail from './pages/UniversityDetail';
import Compare from './pages/Compare';
import Apply from './pages/Apply';
import NotFound from './pages/NotFound';
import UniversityCourses from './pages/UniversityCourses';
import Scholarships from './pages/Scholarships';
import ProgramCategories from './pages/ProgramCategories';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Guides from './pages/Guides';
import FAQ from './pages/FAQ';
import { trackPageView } from './utils/analytics';

// Component to track page views on route changes
function PageViewTracker() {
  const location = useLocation();
  
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
  
  return null;
}

function App() {
  return (
    <Router>
      <PageViewTracker />
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex-grow overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
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
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        </div>
    </Router>
  );
}

export default App;
