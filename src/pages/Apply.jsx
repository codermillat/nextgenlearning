import { useState } from 'react';
import { useData } from '../context/DataContext';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import FAQSection from '../components/SEO/FAQSection';
import Button from '../components/Common/Button';
import Card from '../components/Common/Card';
import { generateBreadcrumbSchema } from '../components/SEO/StructuredData';
import { redirectToWhatsApp, generateApplicationMessage } from '../utils/whatsappRedirect';
import { trackFormSubmission } from '../utils/analytics';
import { typography, spacing } from '../utils/designTokens';
import { WHATSAPP_DISPLAY, getWhatsAppUrl } from '../config/constants';

export default function Apply() {
  const { universities } = useData();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    gpa: '',
    courseInterest: '',
    universityPreference: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Apply', url: '/apply' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.gpa && (parseFloat(formData.gpa) < 0 || parseFloat(formData.gpa) > 5)) {
      newErrors.gpa = 'GPA must be between 0 and 5';
    }
    
    if (!formData.courseInterest.trim()) {
      newErrors.courseInterest = 'Course interest is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('submitting');
    
    try {
      // Track form submission as lead generation
      trackFormSubmission('Application Form', {
        hasName: !!formData.name,
        hasPhone: !!formData.phone,
        hasEmail: !!formData.email,
        hasGPA: !!formData.gpa,
        courseInterest: formData.courseInterest,
        universityPreference: formData.universityPreference
      });
      
      const message = generateApplicationMessage(formData);
      redirectToWhatsApp(message, 'apply_page', formData.courseInterest || '', formData.universityPreference || '');
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    setErrors(prev => {
      if (prev[name]) {
        return {
          ...prev,
          [name]: ''
        };
      }
      return prev;
    });
  };

  const handleBlur = (e) => {
    // Validate field on blur
    const { name, value } = e.target;
    if (name === 'phone' && value && !/^\+?[0-9]{10,15}$/.test(value.replace(/\s/g, ''))) {
      setErrors({ ...errors, [name]: 'Please enter a valid phone number' });
    } else if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors({ ...errors, [name]: 'Please enter a valid email address' });
    } else if (name === 'gpa' && value && (parseFloat(value) < 0 || parseFloat(value) > 5)) {
      setErrors({ ...errors, [name]: 'GPA must be between 0 and 5' });
    }
  };

  const faqs = [
    {
      question: 'Is the counseling service really free?',
      answer: 'Yes, we provide all counseling and application assistance completely free of charge. We help with course selection, university applications, visa processing, and document verification at no cost to students.'
    },
    {
      question: 'What documents do I need to apply?',
      answer: 'You will need your academic transcripts, passport, passport-size photographs, and other documents as required by the university. We will guide you through the complete document preparation process.'
    },
    {
      question: 'How long does the application process take?',
      answer: 'The application process typically takes 2-4 weeks, depending on the university and course. We will help expedite the process and ensure all documents are submitted correctly.'
    },
    {
      question: 'Do I need to pay any fees for counseling?',
      answer: 'No, we provide all services completely free. You only pay the university fees directly to the university. We earn through university partnerships, not from students.'
    }
  ];

  return (
    <>
      <SEOHead
        title="Apply to Study in India 2025 | Free Counseling"
        description={`Apply to Sharda University & top Indian universities. Free counseling, visa assistance for Bangladeshi students. WhatsApp: ${WHATSAPP_DISPLAY}. Apply now.`}
        keywords={[
          'apply to study in India',
          'admission in India from Bangladesh',
          'visa assistance for India',
          'free counseling for study in India',
          'study in India application form',
          'admission process India',
          'student visa India',
          'document verification India',
          'free education counseling',
          'Bangladeshi students India admission',
          'apply Indian universities',
          'study abroad counseling free',
          'Sharda University admission',
          'Indian university application'
        ]}
        url="/apply"
        canonical="/apply"
      />
      {generateBreadcrumbSchema(breadcrumbs) && <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />}
      {/* FAQ schema is generated by FAQSection component below */}
      <Breadcrumbs items={breadcrumbs} />

      <div className={`container mx-auto ${spacing.container} ${spacing.sectionSmall} max-w-3xl`}>
        <h1 className={`${typography.sectionTitle} mb-3 sm:mb-4 leading-tight`}>Apply to Study in India</h1>
        <p className={`${typography.body} mb-6 sm:mb-8`}>
          Get free counseling and application assistance. 
          Fill out the form below and we'll contact you via WhatsApp to help you with your application.
        </p>

        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-large border border-gray-200 mb-6 sm:mb-8" aria-label="Application form">
          {/* Form submission status */}
          {submitStatus === 'error' && (
            <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg" role="alert" aria-live="assertive">
              <p className="text-red-800 font-medium">Please correct the errors below before submitting.</p>
            </div>
          )}
          
          <div className="space-y-5 sm:space-y-6" aria-busy={isSubmitting}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 text-base border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px] shadow-sm hover:border-blue-400 transition-colors ${
                  errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : 'name-help'}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.name}
                </p>
              )}
              <p id="name-help" className="sr-only">Enter your full legal name</p>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number (WhatsApp) *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 text-base border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px] shadow-sm hover:border-blue-400 transition-colors ${
                  errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
                placeholder="+880XXXXXXXXX"
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'phone-error' : 'phone-help'}
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.phone}
                </p>
              )}
              <p id="phone-help" className="mt-1 text-xs text-gray-500">Include country code (e.g., +880 for Bangladesh)</p>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 text-base border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px] shadow-sm hover:border-blue-400 transition-colors ${
                  errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : 'email-help'}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.email}
                </p>
              )}
              <p id="email-help" className="mt-1 text-xs text-gray-500">Optional - for receiving updates</p>
            </div>

            <div>
              <label htmlFor="gpa" className="block text-sm font-medium text-gray-700 mb-2">
                GPA (HSC/SSC)
              </label>
              <input
                type="number"
                id="gpa"
                name="gpa"
                min="0"
                max="5"
                step="0.01"
                value={formData.gpa}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 text-base border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px] shadow-sm hover:border-blue-400 transition-colors ${
                  errors.gpa ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
                placeholder="4.5"
                aria-invalid={errors.gpa ? 'true' : 'false'}
                aria-describedby={errors.gpa ? 'gpa-error gpa-help' : 'gpa-help'}
              />
              {errors.gpa && (
                <p id="gpa-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.gpa}
                </p>
              )}
              <p id="gpa-help" className="mt-1 text-xs text-gray-500">Enter your GPA on a scale of 0-5</p>
            </div>

            <div>
              <label htmlFor="courseInterest" className="block text-sm font-medium text-gray-700 mb-2">
                Course Interest *
              </label>
              <input
                type="text"
                id="courseInterest"
                name="courseInterest"
                required
                value={formData.courseInterest}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 text-base border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px] shadow-sm hover:border-blue-400 transition-colors ${
                  errors.courseInterest ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., B.Tech Computer Science, BBA, MBA"
                aria-invalid={errors.courseInterest ? 'true' : 'false'}
                aria-describedby={errors.courseInterest ? 'courseInterest-error' : undefined}
              />
              {errors.courseInterest && (
                <p id="courseInterest-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.courseInterest}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="universityPreference" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred University (Optional)
              </label>
              <select
                id="universityPreference"
                name="universityPreference"
                value={formData.universityPreference}
                onChange={handleChange}
                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px] shadow-sm hover:border-blue-400 transition-colors"
                aria-describedby="university-help"
              >
                <option value="">Select a university (optional)</option>
                {universities.map(uni => (
                  <option key={uni.id} value={uni.name}>{uni.name}</option>
                ))}
              </select>
              <p id="university-help" className="mt-1 text-xs text-gray-500">Choose your preferred university if you have one</p>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Sending...' : 'Send via WhatsApp'}
            </Button>
          </div>
          
          {/* Success message */}
          {submitStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg" role="status" aria-live="polite">
              <p className="text-green-800 font-medium">Form submitted successfully! Redirecting to WhatsApp...</p>
            </div>
          )}
        </form>

        <FAQSection faqs={faqs} title="Frequently Asked Questions about Application Process" />

        <Card variant="gradient" gradientColors="from-green-50 to-emerald-50" borderColor="border-green-200" className="text-center mt-6 sm:mt-8">
          <h2 className={`${typography.cardTitle} mb-3 sm:mb-4 text-gray-900`}>Need Immediate Help?</h2>
          <p className={`${typography.body} mb-4 sm:mb-6`}>
            Contact us directly on WhatsApp for instant assistance
          </p>
          <Button
            href={getWhatsAppUrl()}
            variant="primary"
            size="md"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 w-full sm:w-auto"
          >
            💬 Chat on WhatsApp
          </Button>
        </Card>
      </div>
    </>
  );
}

