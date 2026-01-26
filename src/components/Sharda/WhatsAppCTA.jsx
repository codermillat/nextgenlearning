import { memo } from 'react';
import PropTypes from 'prop-types';
import { logWhatsAppClick } from '../../utils/conversionEventLogger';

/**
 * WhatsAppCTA Component
 * Feature: sharda-university-content-enhancement
 * 
 * WhatsApp call-to-action button for connecting with Sharda University admissions.
 * Uses single phone number +91 88009 96151 for all students (Bangladeshi and international).
 * Generates contextual pre-filled messages and handles mobile vs desktop link formats.
 * 
 * Validates: Requirements 2.6, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6
 * 
 * @param {Object} props - Component props
 * @param {string} [props.context='general'] - Page context for message generation (e.g., 'landing', 'program-btech-cse', 'fee-calculator')
 * @param {string} [props.variant='button'] - Button style variant: 'button' | 'floating' | 'inline'
 * @param {string} [props.position='content'] - Position on page: 'hero' | 'content' | 'footer' | 'sticky'
 * @param {string} [props.program] - Program name for contextual message (e.g., 'B.Tech CSE')
 * @param {string} [props.contentType] - Content type for analytics (e.g., 'landing', 'program', 'comparison')
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} [props.children] - Button content (defaults to "Connect on WhatsApp")
 * @param {string} [props.ariaLabel] - Accessibility label
 */
const WhatsAppCTA = memo(function WhatsAppCTA({
  context = 'general',
  variant = 'button',
  position = 'content',
  program,
  contentType,
  className = '',
  children,
  ariaLabel,
  ...props
}) {
  // Single phone number for all students (Bangladeshi and international)
  const WHATSAPP_NUMBER = '+918800996151'; // +91 88009 96151
  const DISPLAY_NUMBER = '+91 88009 96151';

  /**
   * Generate contextual pre-filled message based on page context
   * Validates: Requirement 6.2
   */
  const generateMessage = () => {
    // Program-specific contexts
    if (program) {
      return `Hi, I'm interested in ${program} at Sharda University. Could you please provide more information?`;
    }

    // Context-based messages
    const contextMessages = {
      'landing': "Hi, I'm interested in studying at Sharda University. Could you please provide more information about admissions?",
      'fee-calculator': "Hi, I've used the fee calculator and I'm interested in learning more about the programs and scholarships at Sharda University.",
      'program-finder': "Hi, I'm exploring programs at Sharda University. Could you help me find the right program for me?",
      'comparison': "Hi, I'm comparing universities and I'm interested in learning more about Sharda University.",
      'ranking': "Hi, I saw Sharda University's rankings and I'm interested in learning more about admissions.",
      'scholarship': "Hi, I'm interested in learning about scholarship opportunities at Sharda University.",
      'bangladesh': "Hi, I'm from Bangladesh and I'm interested in studying at Sharda University. Could you provide information about the admission process?",
      'testimonial': "Hi, I read student testimonials and I'm interested in applying to Sharda University.",
      'campus': "Hi, I'm interested in learning more about campus life at Sharda University.",
      'placement': "Hi, I'm interested in learning about placement opportunities at Sharda University.",
      'general': "Hi, I'm interested in studying at Sharda University. Could you please provide more information?",
    };

    // Match context or use general message
    const matchedContext = Object.keys(contextMessages).find(key => 
      context.toLowerCase().includes(key)
    );

    return contextMessages[matchedContext] || contextMessages.general;
  };

  /**
   * Detect if user is on mobile device
   * Used to determine link format (mobile app vs web)
   */
  const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  /**
   * Generate WhatsApp link
   * Mobile: wa.me format (opens app directly) - Validates: Requirement 6.3
   * Desktop: web.whatsapp.com format - Validates: Requirement 6.4
   */
  const generateWhatsAppLink = () => {
    const message = generateMessage();
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = WHATSAPP_NUMBER.replace(/\+/g, '');

    if (isMobile()) {
      // Mobile: Direct app link
      return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    } else {
      // Desktop: WhatsApp Web
      return `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    }
  };

  const whatsappUrl = generateWhatsAppLink();
  const message = generateMessage();

  /**
   * Handle click event with logging
   */
  const handleClick = (e) => {
    // Log WhatsApp click event
    logWhatsAppClick({
      phoneNumber: DISPLAY_NUMBER,
      message,
      context,
      program,
      contentType,
    });

    // Allow default link behavior to continue
  };

  // Base classes for all variants
  const baseClasses = 'font-semibold transition-all duration-200 min-h-[44px] flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg';

  // Variant-specific styles
  const variantClasses = {
    button: 'bg-[#25D366] text-white hover:bg-[#20BA5A] shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-green-500 focus:ring-offset-2 px-6 sm:px-8 py-3 text-base sm:text-lg',
    floating: 'fixed bottom-6 left-6 z-50 bg-[#25D366] text-white hover:bg-[#20BA5A] shadow-2xl hover:shadow-3xl transform hover:scale-110 focus:ring-green-500 focus:ring-offset-2 px-5 py-4 text-base font-bold animate-bounce hover:animate-none rounded-full',
    inline: 'bg-[#25D366]/10 text-[#25D366] border-2 border-[#25D366] hover:bg-[#25D366] hover:text-white shadow-md hover:shadow-lg transform hover:scale-105 focus:ring-green-500 focus:ring-offset-2 px-4 sm:px-6 py-2 text-sm sm:text-base',
  };

  // Combine all classes
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  // Determine aria-label - Validates: Requirement 6.6
  const accessibilityLabel = ariaLabel || `Connect with Sharda University admissions team on WhatsApp${program ? ` about ${program}` : ''}`;

  // Default button content based on variant
  const defaultContent = variant === 'floating' ? (
    <>
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span className="sr-only">WhatsApp</span>
    </>
  ) : (
    <>
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span>Connect on WhatsApp</span>
    </>
  );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      onClick={handleClick}
      aria-label={accessibilityLabel}
      data-testid="whatsapp-cta"
      data-variant={variant}
      data-context={context}
      data-program={program}
      data-phone={DISPLAY_NUMBER}
      {...props}
    >
      {children || defaultContent}
    </a>
  );
});

WhatsAppCTA.propTypes = {
  context: PropTypes.string,
  variant: PropTypes.oneOf(['button', 'floating', 'inline']),
  position: PropTypes.oneOf(['hero', 'content', 'footer', 'sticky']),
  program: PropTypes.string,
  contentType: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  ariaLabel: PropTypes.string,
};

export default WhatsAppCTA;
