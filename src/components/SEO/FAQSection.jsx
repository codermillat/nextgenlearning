import { useState } from 'react';
import StructuredData from './StructuredData';
import { generateFAQSchema } from './StructuredData';

/**
 * FAQ Section component with structured data
 */
export default function FAQSection({ faqs, title = "Frequently Asked Questions" }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!faqs || faqs.length === 0) return null;

  const faqSchema = generateFAQSchema(faqs);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {faqSchema && <StructuredData data={faqSchema} id="faq-page-schema" />}
      <section className="faq-section py-4 sm:py-6 md:py-8 px-4 max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{title}</h2>
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors min-h-[44px]"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-base sm:text-lg pr-4">{faq.question}</span>
                <span className="text-xl sm:text-2xl text-gray-500 flex-shrink-0">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

