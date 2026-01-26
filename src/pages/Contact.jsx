import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import { generateBreadcrumbSchema, generateSiteOrganizationSchema, generateLocalBusinessSchema } from '../components/SEO/StructuredData';
import { redirectToWhatsApp } from '../utils/whatsappRedirect';
import { trackWhatsAppClick, trackEmailClick } from '../utils/analytics';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, getWhatsAppUrl } from '../config/constants';

export default function Contact() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Contact Us', url: '/contact' }
  ];

  const siteOrgSchema = generateSiteOrganizationSchema();

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('contact_page', '', '');
    redirectToWhatsApp('Hello! I would like to get more information about studying in India.', 'contact_page', '', '');
  };

  return (
    <>
      <SEOHead
        title="Contact Us | Free Counseling & Admission Help"
        description={`Contact NextGen Learning for free counseling. Apply to Sharda University & top universities. WhatsApp: ${WHATSAPP_DISPLAY}. Help for Bangladeshi students.`}
        keywords={[
          'contact NextGen Learning',
          'tech course counseling',
          'IT course consultation',
          'free tech education counseling',
          'admission assistance tech courses',
          'WhatsApp tech counseling',
          'computer science course help',
          'data science course guidance',
          'AI ML course consultation',
          'cybersecurity course assistance'
        ]}
        url="/contact"
        canonical="/contact"
      />
      {siteOrgSchema && <StructuredData data={siteOrgSchema} id="site-org-schema" />}
      {generateLocalBusinessSchema() && <StructuredData data={generateLocalBusinessSchema()} id="local-business-schema" />}
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          
          <p className="text-lg text-gray-700 mb-8">
            We're here to help you take the first step towards your global education journey. Whether you need counselling, admission guidance, or detailed information about studying abroad, our team at <strong>NextGen Learning</strong> is ready to assist you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <span className="mr-2">📞</span>
                    Phone / WhatsApp
                  </h3>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="text-blue-600 hover:text-blue-800 text-lg font-medium"
                  >
                    {WHATSAPP_DISPLAY}
                  </a>
                  <p className="text-sm text-gray-600 mt-1">Available 24/7 for WhatsApp</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <span className="mr-2">✉️</span>
                    Email
                  </h3>
                  <a
                    href="mailto:contact@nextgenlearning.dev"
                    onClick={() => trackEmailClick('contact@nextgenlearning.dev', 'contact_page')}
                    className="text-blue-600 hover:text-blue-800 text-lg font-medium"
                  >
                    Contact Us via Email
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <span className="mr-2">📍</span>
                    Office Location
                  </h3>
                  <address className="text-gray-700 not-italic">
                    <strong>NextGen Learning</strong><br />
                    Greater Noida, Uttar Pradesh<br />
                    India
                  </address>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              
              <div className="space-y-4">
                <a
                  href="/apply"
                  className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Apply Now - Free Consultation
                </a>
                
                <button
                  onClick={handleWhatsAppClick}
                  className="block w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Chat on WhatsApp
                </button>
                
                <a
                  href="mailto:contact@nextgenlearning.dev"
                  onClick={() => trackEmailClick('contact@nextgenlearning.dev', 'contact_page_quick_action')}
                  className="block w-full bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-center"
                >
                  Send Email
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-blue-200">
                <p className="text-sm text-gray-700">
                  <strong>Response Time:</strong> We typically respond within 24 hours. For urgent inquiries, please call or WhatsApp us directly.
                </p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
            <p className="text-gray-700 mb-4">
              Stay updated with the latest news, admission updates, and study abroad opportunities by following us on social media:
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://facebook.com/nextgenlearning"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com/nextgenlearning"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com/company/nextgenlearning"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/NextGenLearning"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                X (Twitter)
              </a>
              <a
                href="https://medium.com/@nextgenlearning"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Medium
              </a>
            </div>
          </div>

          {/* Service Areas */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Who We Serve</h2>
            <p className="text-gray-700 mb-4">
              NextGen Learning primarily serves students from Bangladesh seeking quality education in India, with a special focus on technology and IT programs.
            </p>
            <p className="text-sm text-gray-600 mt-4">
              We welcome students from all over Bangladesh and provide comprehensive services to help you achieve your educational goals.
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg font-semibold text-blue-600 italic">
              NextGen Learning – Your Gateway to Quality Tech Education in India
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

