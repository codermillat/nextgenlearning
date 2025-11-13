import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import { generateBreadcrumbSchema, generateWBESchema } from '../components/SEO/StructuredData';

export default function About() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' }
  ];

  const wbeSchema = generateWBESchema();

  return (
    <>
      <SEOHead
        title="About NextGen Learning - Tech & IT Education Platform"
        description="NextGen Learning is your gateway to tech and IT education. Compare computer science, data science, AI/ML, cybersecurity, cloud computing, and more tech courses across top universities."
        keywords={[
          'NextGen Learning',
          'tech education',
          'IT education',
          'computer science courses',
          'tech courses comparison',
          'data science courses',
          'AI ML courses',
          'cybersecurity courses',
          'tech career guidance'
        ]}
        url="/about"
        canonical="/about"
      />
      {wbeSchema && <StructuredData data={wbeSchema} />}
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About NextGen Learning</h1>
          
          <div className="prose max-w-none space-y-6 text-gray-700">
            <p className="text-lg leading-relaxed">
              <strong>NextGen Learning</strong> is your comprehensive platform for exploring tech and IT education. We help students compare computer science, data science, artificial intelligence, machine learning, cybersecurity, cloud computing, and other tech courses across top universities.
            </p>

            <p>
              Our mission is to make tech education accessible and transparent. We provide detailed information about tech programs, including fees, scholarships, rankings, placement records, and career prospects. Whether you're interested in computer science, data science, AI/ML, cybersecurity, or any other tech field, NextGen Learning helps you make informed decisions about your education and career.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">What We Offer</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Course Comparison:</strong> Compare similar tech courses across multiple universities side-by-side</li>
              <li><strong>Detailed Information:</strong> Comprehensive details about fees, scholarships, eligibility, and career prospects</li>
              <li><strong>University Rankings:</strong> View NIRF rankings, NAAC accreditation, and placement records</li>
              <li><strong>Tech Course Categories:</strong> Explore courses in computer science, AI/ML, data science, cybersecurity, cloud computing, full stack development, blockchain, IoT, and more</li>
              <li><strong>Learning Resources:</strong> Guides and resources to help you navigate your tech education journey</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Why Tech Education?</h2>
            <p>
              The technology industry is one of the fastest-growing sectors globally, with increasing demand for skilled professionals. Tech education opens doors to exciting career opportunities in software development, data science, artificial intelligence, cybersecurity, cloud computing, and many other fields. With the right education and skills, you can build a rewarding career in tech.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Our Focus</h2>
            <p>
              NextGen Learning focuses exclusively on tech and IT courses, including:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Computer Science & Engineering (CSE)</li>
              <li>Information Technology (IT)</li>
              <li>Artificial Intelligence & Machine Learning (AI/ML)</li>
              <li>Data Science & Analytics</li>
              <li>Cybersecurity</li>
              <li>Cloud Computing</li>
              <li>Full Stack Development</li>
              <li>Blockchain Technology</li>
              <li>Internet of Things (IoT)</li>
              <li>Bachelor of Computer Applications (BCA)</li>
              <li>Master of Computer Applications (MCA)</li>
              <li>And other tech-related programs</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Get Started</h2>
            <p>
              Ready to explore tech education? Browse our <a href="/courses" className="text-blue-600 font-semibold hover:underline">course catalog</a>, use our <a href="/compare" className="text-blue-600 font-semibold hover:underline">comparison tool</a>, or check out our <a href="/guides" className="text-blue-600 font-semibold hover:underline">learning guides</a> to get started on your tech education journey.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
