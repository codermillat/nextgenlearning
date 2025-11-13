import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import { generateBreadcrumbSchema } from '../components/SEO/StructuredData';

export default function PrivacyPolicy() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy-policy' }
  ];

  return (
    <>
      <SEOHead
        title="Privacy Policy - Study in India BD | Western Bangla Education"
        description="Privacy Policy for Study in India BD and Western Bangla Education. Learn how we collect, use, and protect your personal information. Contact us for privacy concerns."
        keywords={[
          'privacy policy',
          'data protection',
          'Western Bangla Education privacy',
          'WBE privacy policy',
          'student data protection',
          'privacy Bangladesh'
        ]}
        url="/privacy-policy"
        canonical="/privacy-policy"
      />
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="prose max-w-none space-y-6 text-gray-700">
            <p className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <p>
              At <strong>Western Bangla Education (WBE)</strong>, we respect and protect your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
            </p>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mt-4 mb-2">Personal Information</h3>
              <p>
                If you contact us via forms, email, WhatsApp, or comments, we may collect:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Academic information (GPA, course interests)</li>
                <li>University preferences</li>
                <li>Any other information you voluntarily provide</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4 mb-2">Non-Personal Information</h3>
              <p>
                We may collect data such as:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>IP address</li>
                <li>Usage statistics for analytics (via Google Analytics)</li>
                <li>Pages visited and time spent on pages</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To respond to your inquiries or comments</li>
                <li>To provide counseling and admission assistance</li>
                <li>To process applications and facilitate university admissions</li>
                <li>To improve our website content and user experience</li>
                <li>To share updates or educational resources (only if you opt in)</li>
                <li>To comply with legal or regulatory requirements</li>
                <li>To analyze website usage and improve our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">3. Cookies</h2>
              <p>
                Our website may use cookies to improve site performance and user experience. Cookies are small text files stored on your device that help us:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Remember your preferences</li>
                <li>Analyze website traffic</li>
                <li>Provide personalized content</li>
              </ul>
              <p className="mt-4">
                You can disable cookies in your browser settings, though some features may not function properly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Sharing</h2>
              <p>
                We do <strong>not sell, rent, or trade</strong> your personal information to third parties.
              </p>
              <p className="mt-4">
                We may share information with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Trusted service providers</strong> (e.g., Google Analytics) who support our website operations, under strict confidentiality agreements</li>
                <li><strong>Partner universities</strong> when processing your admission applications (with your consent)</li>
                <li><strong>Legal authorities</strong> if required by law or to protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">5. External Links</h2>
              <p>
                Our website may include links to third-party websites (such as university websites, WhatsApp, social media platforms). WBE is not responsible for their privacy practices or content. We encourage you to review the privacy policies of any external sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">6. Data Security</h2>
              <p>
                We take reasonable technical and organizational measures to protect your information from unauthorized access, misuse, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">7. Children's Privacy</h2>
              <p>
                Our website is not intended for children under 13. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">8. Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">9. Changes to This Policy</h2>
              <p>
                WBE reserves the right to update or modify this Privacy Policy at any time. Updates will be posted on this page with a revised date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg mt-8">
              <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
              <p className="mb-4">
                If you have questions or concerns about this Privacy Policy, or wish to exercise your rights, please contact us:
              </p>
              <ul className="space-y-2">
                <li>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:westernbanglaedu@gmail.com" className="text-blue-600 hover:text-blue-800">
                    Contact Us via Email
                  </a>
                </li>
                <li>
                  <strong>Phone/WhatsApp:</strong>{' '}
                  <a href="https://wa.me/8801611533385" className="text-blue-600 hover:text-blue-800">
                    +8801611533385
                  </a>
                </li>
                <li>
                  <strong>Address:</strong> Binodnagar, Nawabganj, Dinajpur – 5280, Rangpur Division, Bangladesh
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

