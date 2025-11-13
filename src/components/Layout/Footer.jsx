import { Link } from 'react-router-dom';
import StructuredData from '../SEO/StructuredData';
import { generateWBESchema } from '../SEO/StructuredData';

export default function Footer() {
  const wbeSchema = generateWBESchema();

  return (
    <>
      {wbeSchema && <StructuredData data={wbeSchema} />}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-4">About</h3>
              <p className="text-gray-400 text-sm mb-4">
                Your gateway to tech and IT education. Compare computer science, 
                data science, AI/ML, cybersecurity, and more tech courses.
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/courses" className="text-gray-400 hover:text-white transition-colors">
                    All Courses
                  </Link>
                </li>
                <li>
                  <Link to="/universities" className="text-gray-400 hover:text-white transition-colors">
                    Universities
                  </Link>
                </li>
                <li>
                  <Link to="/compare" className="text-gray-400 hover:text-white transition-colors">
                    Compare
                  </Link>
                </li>
                <li>
                  <Link to="/apply" className="text-gray-400 hover:text-white transition-colors">
                    Apply Now
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/guides" className="text-gray-400 hover:text-white transition-colors">
                    Learning Guides
                  </Link>
                </li>
                <li>
                  <Link to="/scholarships" className="text-gray-400 hover:text-white transition-colors">
                    Scholarships
                  </Link>
                </li>
                <li>
                  <Link to="/program-categories" className="text-gray-400 hover:text-white transition-colors">
                    Program Categories
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-4 md:space-y-0">
              <p>
                © {new Date().getFullYear()} NextGen Learning. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

