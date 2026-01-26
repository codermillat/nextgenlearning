import { Link } from 'react-router-dom';
import { WHATSAPP_DISPLAY, getWhatsAppUrl } from '../../config/constants';

export default function Footer() {

  return (
    <>
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* About */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">NG</span>
                </div>
                <h3 className="text-lg font-bold">NextGen Learning</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Your gateway to tech and IT education. Compare computer science, 
                data science, AI/ML, cybersecurity, and more tech courses across top Indian universities.
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">About Us</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/courses" className="text-gray-300 hover:text-white transition-colors inline-flex items-center group">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    All Courses
                  </Link>
                </li>
                <li>
                  <Link to="/universities" className="text-gray-300 hover:text-white transition-colors inline-flex items-center group">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Universities
                  </Link>
                </li>
                <li>
                  <Link to="/compare" className="text-gray-300 hover:text-white transition-colors inline-flex items-center group">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Compare
                  </Link>
                </li>
                <li>
                  <Link to="/rankings" className="text-gray-300 hover:text-white transition-colors inline-flex items-center group">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    NIRF Rankings
                  </Link>
                </li>
                <li>
                  <Link to="/fees-scholarships" className="text-gray-300 hover:text-white transition-colors inline-flex items-center group">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Fees & Scholarships
                  </Link>
                </li>
                <li>
                  <Link to="/apply" className="text-gray-300 hover:text-white transition-colors inline-flex items-center group font-semibold">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Apply Now
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-4">Contact & Support</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white transition-colors inline-flex items-center group">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white transition-colors inline-flex items-center group">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-300 hover:text-white transition-colors inline-flex items-center group">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    FAQ
                  </Link>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-gray-400 text-xs mb-2">WhatsApp Support</p>
                <a 
                  href={getWhatsAppUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-colors font-medium text-sm inline-flex items-center"
                >
                  <span className="mr-2">💬</span>
                  {WHATSAPP_DISPLAY}
                </a>
              </div>
            </div>

            {/* Resources */}
            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/guides" className="text-gray-300 hover:text-white transition-colors inline-flex items-center group">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Learning Guides
                  </Link>
                </li>
                <li>
                  <Link to="/scholarships" className="text-gray-300 hover:text-white transition-colors inline-flex items-center group">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Scholarships
                  </Link>
                </li>
                <li>
                  <Link to="/program-categories" className="text-gray-300 hover:text-white transition-colors inline-flex items-center group">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Program Categories
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-4 md:space-y-0">
              <p className="text-center md:text-left">
                © {new Date().getFullYear()} NextGen Learning. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
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

