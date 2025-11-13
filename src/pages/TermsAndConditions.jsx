import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import { generateBreadcrumbSchema } from '../components/SEO/StructuredData';

export default function TermsAndConditions() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Terms and Conditions', url: '/terms-and-conditions' }
  ];

  return (
    <>
      <SEOHead
        title="Terms and Conditions - Study in India BD | Western Bangla Education"
        description="Terms and Conditions for Study in India BD and Western Bangla Education. Read our terms of service, content usage, and user responsibilities."
        keywords={[
          'terms and conditions',
          'terms of service',
          'Western Bangla Education terms',
          'WBE terms',
          'user agreement',
          'website terms'
        ]}
        url="/terms-and-conditions"
        canonical="/terms-and-conditions"
      />
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
          
          <div className="prose max-w-none space-y-6 text-gray-700">
            <p className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <p>
              Welcome to the official website of <strong>Study in India BD</strong>, powered by <strong>Western Bangla Education (WBE)</strong>. By accessing or using this website, you agree to comply with the following terms and conditions. Please read them carefully.
            </p>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Content Usage</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The information shared on this website is for <strong>educational and informational purposes only</strong>.</li>
                <li>Website content may include general guidance on education, admissions, and study abroad opportunities, but does not replace official university policies or professional advice.</li>
                <li>You may share or link our content, provided proper credit is given to Western Bangla Education.</li>
                <li>Unauthorized reproduction, distribution, or modification of website content is prohibited.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">2. Accuracy of Information</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>While WBE strives to provide accurate and updated information, we make <strong>no guarantees</strong> regarding completeness, reliability, or accuracy.</li>
                <li>Admission requirements, fees, scholarships, and policies are subject to change by universities or institutions without notice.</li>
                <li>All fee calculations and scholarship information are estimates based on available data and may vary.</li>
                <li>Users are advised to verify all information directly with the respective universities before making decisions.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">3. External Links</h2>
              <p>
                Our website may contain links to third-party websites (university websites, social media, etc.). WBE is <strong>not responsible</strong> for the content, accuracy, or practices of those websites. Accessing external links is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">4. Intellectual Property</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All website content, including text, graphics, logos, and design, is the property of Western Bangla Education unless otherwise stated.</li>
                <li>University logos and names are the property of their respective institutions.</li>
                <li>Unauthorized reproduction, distribution, or modification of website content is prohibited.</li>
                <li>You may not use our content for commercial purposes without written permission.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">5. User Responsibility</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Users are responsible for providing accurate information when using our services.</li>
                <li>Users must use the website in a lawful manner and not engage in any activities that could harm the website or other users.</li>
                <li>Users are responsible for maintaining the confidentiality of any account information or passwords.</li>
                <li>WBE reserves the right to remove any inappropriate or harmful content or block users who violate these terms.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">6. Services Provided</h2>
              <p>
                WBE provides free counseling and admission assistance services. Our services include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Career counseling and course selection guidance</li>
                <li>University and program information</li>
                <li>Admission application assistance</li>
                <li>Document verification support</li>
                <li>Visa assistance and pre-departure orientation</li>
              </ul>
              <p className="mt-4">
                <strong>Important:</strong> WBE does not guarantee admission to any university. Admission decisions are made solely by the respective universities based on their criteria.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">7. Limitation of Liability</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>WBE will not be liable for any loss, damage, or inconvenience arising from the use of the website or reliance on its content.</li>
                <li>WBE is not responsible for any decisions made based on information provided on this website.</li>
                <li>WBE does not guarantee admission, visa approval, or scholarship awards.</li>
                <li>Users acknowledge that university policies, fees, and requirements may change without notice.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">8. Privacy</h2>
              <p>
                Your use of this website is also governed by our <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>. Please review it to understand how we collect and use your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">9. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Western Bangla Education, its officers, employees, and partners from any claims, damages, losses, or expenses arising from your use of the website or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">10. Changes to Terms</h2>
              <p>
                WBE reserves the right to update or modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on this page. Your continued use of the website after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">11. Governing Law</h2>
              <p>
                These Terms and Conditions are governed by the laws of Bangladesh. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Bangladesh.
              </p>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg mt-8">
              <h2 className="text-2xl font-bold mb-4">12. Contact</h2>
              <p className="mb-4">
                For any questions regarding these Terms and Conditions, please contact us:
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

            <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-500">
              <p className="text-sm">
                <strong>Note:</strong> By using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use this website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

