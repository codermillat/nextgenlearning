/**
 * Unit Tests for BangladeshSection Component
 * Feature: sharda-university-content-enhancement
 * 
 * Tests specific examples and edge cases for the Bangladesh-specific content section.
 * 
 * Validates: Requirements 2.1, 2.2, 2.3, 2.5, 2.6
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BangladeshSection from '../BangladeshSection';
import { bangladeshContent } from '../../../data/shardaData';

describe('BangladeshSection Component', () => {
  describe('Rendering', () => {
    it('should render the section with heading', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByRole('heading', { name: /Study at Sharda from Bangladesh/i })).toBeInTheDocument();
    });

    it('should render with proper section attributes', () => {
      const { container } = render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      const section = container.querySelector('[data-section="bangladesh"]');
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute('aria-labelledby', 'bangladesh-heading');
    });

    it('should return null when bangladeshContent is not provided', () => {
      const { container } = render(<BangladeshSection bangladeshContent={null} />);
      
      expect(container.firstChild).toBeNull();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <BangladeshSection 
          bangladeshContent={bangladeshContent} 
          className="custom-class"
        />
      );
      
      const section = container.querySelector('[data-section="bangladesh"]');
      expect(section).toHaveClass('custom-class');
    });
  });

  describe('Scholarship Information - Requirement 2.2', () => {
    it('should display Bangladesh-specific scholarship information', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      // Check for scholarship heading
      expect(screen.getByRole('heading', { name: /Exclusive Scholarships for Bangladeshi Students/i })).toBeInTheDocument();
      
      // Check for 50% scholarship
      expect(screen.getByText('50% OFF')).toBeInTheDocument();
      expect(screen.getByText(/For HSC GPA 3.5 - 5/i)).toBeInTheDocument();
      
      // Check for 20% scholarship
      expect(screen.getByText('20% OFF')).toBeInTheDocument();
      // Check for the 20% scholarship GPA range - text is split across elements
      const scholarshipCards = screen.getAllByTestId('scholarship-card');
      const secondCard = scholarshipCards[1];
      // The actual text is "3 - 3.49" not "3.0 - 3.4"
      expect(secondCard.textContent).toMatch(/For HSC GPA 3 - 3\.49/i);
    });

    it('should display scholarship eligibility criteria', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByText(/HSC certificate with GPA 3.5 or above/i)).toBeInTheDocument();
      // Use getAllByText since "Valid passport" and "Completed application form" appear in both scholarship cards
      const validPassportElements = screen.getAllByText(/Valid passport/i);
      expect(validPassportElements.length).toBeGreaterThan(0);
      const completedFormElements = screen.getAllByText(/Completed application form/i);
      expect(completedFormElements.length).toBeGreaterThan(0);
    });

    it('should display scholarship application process', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      // Use getAllByText since these texts appear in both scholarship cards
      const submitElements = screen.getAllByText(/Submit HSC certificate/i);
      expect(submitElements.length).toBeGreaterThan(0);
      const applyOnlineElements = screen.getAllByText(/Apply online/i);
      expect(applyOnlineElements.length).toBeGreaterThan(0);
      const scholarshipAutoElements = screen.getAllByText(/Scholarship automatically applied based on GPA/i);
      expect(scholarshipAutoElements.length).toBeGreaterThan(0);
    });

    it('should render scholarship cards with proper test ids', () => {
      const { container } = render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      const scholarshipCards = container.querySelectorAll('[data-testid="scholarship-card"]');
      expect(scholarshipCards).toHaveLength(2);
    });
  });

  describe('Admission Process Steps - Requirement 2.3', () => {
    it('should display admission process heading', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByRole('heading', { name: /Step-by-Step Admission Process/i })).toBeInTheDocument();
    });

    it('should display all admission steps in order', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByText('Document Preparation')).toBeInTheDocument();
      expect(screen.getByText('Online Application')).toBeInTheDocument();
      expect(screen.getByText('Application Fee Payment')).toBeInTheDocument();
      expect(screen.getByText('Admission Offer')).toBeInTheDocument();
      expect(screen.getByText('Visa Application')).toBeInTheDocument();
      expect(screen.getByText('Fee Payment')).toBeInTheDocument();
      expect(screen.getByText('Travel and Arrival')).toBeInTheDocument();
    });

    it('should display step numbers correctly', () => {
      const { container } = render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      const stepNumbers = container.querySelectorAll('.w-12.h-12.bg-blue-600');
      expect(stepNumbers).toHaveLength(7);
      expect(stepNumbers[0]).toHaveTextContent('1');
      expect(stepNumbers[6]).toHaveTextContent('7');
    });

    it('should display required documents for each step', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByText(/HSC Certificate \(original and copy\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Passport \(valid for at least 2 years\)/i)).toBeInTheDocument();
    });

    it('should display timeline information', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      // Use getAllByText since timeline appears in multiple admission steps
      const oneToTwoWeeks = screen.getAllByText(/1-2 weeks/i);
      expect(oneToTwoWeeks.length).toBeGreaterThan(0);
      const twoToFourWeeks = screen.getAllByText(/2-4 weeks/i);
      expect(twoToFourWeeks.length).toBeGreaterThan(0);
    });

    it('should display pro tips for each step', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByText(/Get documents attested by Bangladesh Ministry of Foreign Affairs/i)).toBeInTheDocument();
      expect(screen.getByText(/Keep multiple copies of all documents/i)).toBeInTheDocument();
    });

    it('should render admission steps with proper test ids', () => {
      const { container } = render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      const admissionSteps = container.querySelectorAll('[data-testid="admission-step"]');
      expect(admissionSteps).toHaveLength(7);
    });
  });

  describe('Cultural Compatibility Information - Requirement 2.5', () => {
    it('should display cultural compatibility heading', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByRole('heading', { name: /Why Bangladeshi Students Love Sharda/i })).toBeInTheDocument();
    });

    it('should display proximity information', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByText(/Just 2-3 hours flight from Dhaka to Delhi/i)).toBeInTheDocument();
    });

    it('should display climate information', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByText(/Similar to Bangladesh - hot summers, mild winters, monsoon season/i)).toBeInTheDocument();
    });

    it('should display halal food availability', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByText(/Halal food available in campus cafeterias/i)).toBeInTheDocument();
      expect(screen.getByText(/Bengali restaurants in Greater Noida/i)).toBeInTheDocument();
    });

    it('should display prayer facilities information', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByText(/Prayer rooms available on campus/i)).toBeInTheDocument();
      expect(screen.getByText(/Mosques nearby in Greater Noida/i)).toBeInTheDocument();
      expect(screen.getByText(/Friday prayers organized/i)).toBeInTheDocument();
    });

    it('should display language information', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByText(/English is medium of instruction/i)).toBeInTheDocument();
    });

    it('should display community information', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByText(/Large Bangladeshi student community/i)).toBeInTheDocument();
    });
  });

  describe('Visa Guidance - Requirement 2.5', () => {
    it('should display visa guidance heading', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByRole('heading', { name: /Visa Guidance for Bangladeshi Students/i })).toBeInTheDocument();
    });

    it('should display visa type and duration', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByText(/Student Visa \(X Visa\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Valid for duration of course/i)).toBeInTheDocument();
    });

    it('should display visa requirements', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByText(/Valid passport \(minimum 6 months validity\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Admission offer letter from Sharda University/i)).toBeInTheDocument();
      expect(screen.getByText(/Financial proof \(bank statements\)/i)).toBeInTheDocument();
    });

    it('should display visa application process', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      // Use getAllByText since "Receive admission offer letter" appears in multiple places
      const admissionLetterElements = screen.getAllByText(/Receive admission offer letter/i);
      expect(admissionLetterElements.length).toBeGreaterThan(0);
      expect(screen.getByText(/Fill visa application form online/i)).toBeInTheDocument();
      expect(screen.getByText(/Book appointment at Indian High Commission, Dhaka/i)).toBeInTheDocument();
    });

    it('should display visa processing timeline', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByText(/2-4 weeks from application/i)).toBeInTheDocument();
    });
  });

  describe('Financial Guidance - Requirement 2.5', () => {
    it('should display financial guidance heading', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByRole('heading', { name: /Financial Guidance/i })).toBeInTheDocument();
    });

    it('should display currency transfer information', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByText(/Use authorized forex dealers in Bangladesh/i)).toBeInTheDocument();
      expect(screen.getByText(/Bank wire transfer to Sharda University account/i)).toBeInTheDocument();
    });

    it('should display bank account information', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByText(/Can open account with passport and student ID/i)).toBeInTheDocument();
      expect(screen.getByText(/Major banks: SBI, HDFC, ICICI near campus/i)).toBeInTheDocument();
    });

    it('should display scholarship opportunities', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByText(/50% scholarship for GPA 3.5-5.0/i)).toBeInTheDocument();
      expect(screen.getByText(/20% scholarship for GPA 3.0-3.4/i)).toBeInTheDocument();
    });

    it('should display cost of living information', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByText(/INR 5,000-8,000 per month/i)).toBeInTheDocument();
    });
  });

  describe('WhatsApp CTA Integration - Requirement 2.6', () => {
    it('should display WhatsApp CTA section', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByRole('heading', { name: /Have Questions About Studying from Bangladesh\?/i })).toBeInTheDocument();
    });

    it('should display WhatsApp CTA button', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      const whatsappButton = screen.getByTestId('whatsapp-cta');
      expect(whatsappButton).toBeInTheDocument();
      expect(whatsappButton).toHaveAttribute('data-context', 'bangladesh');
    });

    it('should display Bangladesh-specific phone number', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByText(/\+91 88009 96151/i)).toBeInTheDocument();
    });

    it('should have proper WhatsApp CTA text', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      expect(screen.getByText(/Chat with Bangladesh Admissions Team/i)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty scholarships array', () => {
      const contentWithoutScholarships = {
        ...bangladeshContent,
        scholarships: [],
      };
      
      render(<BangladeshSection bangladeshContent={contentWithoutScholarships} />);
      
      expect(screen.queryByText(/Exclusive Scholarships/i)).not.toBeInTheDocument();
    });

    it('should handle empty admission process array', () => {
      const contentWithoutAdmission = {
        ...bangladeshContent,
        admissionProcess: [],
      };
      
      render(<BangladeshSection bangladeshContent={contentWithoutAdmission} />);
      
      expect(screen.queryByText(/Step-by-Step Admission Process/i)).not.toBeInTheDocument();
    });

    it('should handle empty cultural info', () => {
      const contentWithoutCulturalInfo = {
        ...bangladeshContent,
        culturalInfo: {},
      };
      
      render(<BangladeshSection bangladeshContent={contentWithoutCulturalInfo} />);
      
      expect(screen.queryByText(/Why Bangladeshi Students Love Sharda/i)).not.toBeInTheDocument();
    });

    it('should handle empty visa guidance', () => {
      const contentWithoutVisa = {
        ...bangladeshContent,
        visaGuidance: {},
      };
      
      render(<BangladeshSection bangladeshContent={contentWithoutVisa} />);
      
      expect(screen.queryByText(/Visa Guidance/i)).not.toBeInTheDocument();
    });

    it('should handle empty financial guidance', () => {
      const contentWithoutFinancial = {
        ...bangladeshContent,
        financialGuidance: {},
      };
      
      render(<BangladeshSection bangladeshContent={contentWithoutFinancial} />);
      
      expect(screen.queryByText(/Financial Guidance/i)).not.toBeInTheDocument();
    });

    it('should handle partial cultural info', () => {
      const partialCulturalInfo = {
        ...bangladeshContent,
        culturalInfo: {
          proximity: 'Close to Bangladesh',
        },
      };
      
      render(<BangladeshSection bangladeshContent={partialCulturalInfo} />);
      
      expect(screen.getByText('Close to Bangladesh')).toBeInTheDocument();
      expect(screen.queryByText(/Halal Food Available/i)).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      const { container } = render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      const h2 = container.querySelector('h2');
      const h3s = container.querySelectorAll('h3');
      const h4s = container.querySelectorAll('h4');
      
      expect(h2).toBeInTheDocument();
      expect(h3s.length).toBeGreaterThan(0);
      expect(h4s.length).toBeGreaterThan(0);
    });

    it('should have proper ARIA labels', () => {
      const { container } = render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      const section = container.querySelector('[data-section="bangladesh"]');
      expect(section).toHaveAttribute('aria-labelledby', 'bangladesh-heading');
    });

    it('should have descriptive emoji labels', () => {
      render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      const flagEmoji = screen.getByLabelText('Bangladesh flag');
      expect(flagEmoji).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive grid classes', () => {
      const { container } = render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      const grids = container.querySelectorAll('.grid');
      expect(grids.length).toBeGreaterThan(0);
      
      // Check for responsive classes
      const responsiveGrid = container.querySelector('.md\\:grid-cols-2');
      expect(responsiveGrid).toBeInTheDocument();
    });

    it('should have responsive text sizes', () => {
      const { container } = render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      const responsiveText = container.querySelector('.sm\\:text-4xl');
      expect(responsiveText).toBeInTheDocument();
    });

    it('should have responsive padding', () => {
      const { container } = render(<BangladeshSection bangladeshContent={bangladeshContent} />);
      
      const responsivePadding = container.querySelector('.sm\\:p-12');
      expect(responsivePadding).toBeInTheDocument();
    });
  });
});
