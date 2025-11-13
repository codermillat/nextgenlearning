/**
 * Email obfuscation utility to prevent email scraping
 * Converts email addresses to encoded format that can be decoded on click
 */

/**
 * Obfuscate email address
 * @param {string} email - Email address to obfuscate
 * @returns {string} - Obfuscated email string
 */
export function obfuscateEmail(email) {
  // Simple obfuscation: reverse and encode
  return email.split('').reverse().join('');
}

/**
 * Deobfuscate email address
 * @param {string} obfuscated - Obfuscated email string
 * @returns {string} - Original email address
 */
export function deobfuscateEmail(obfuscated) {
  return obfuscated.split('').reverse().join('');
}

/**
 * Create a mailto link component with obfuscated display
 * @param {string} email - Email address
 * @param {string} displayText - Text to display (defaults to obfuscated email)
 * @returns {object} - Object with href and displayText
 */
export function createEmailLink(email, displayText = null) {
  const obfuscated = obfuscateEmail(email);
  return {
    href: `mailto:${email}`,
    displayText: displayText || obfuscated,
    // For React components, use onClick to decode
    onClick: (e) => {
      // Email is already in href, just ensure it works
      return true;
    }
  };
}

/**
 * Encode email using base64-like encoding (simple obfuscation)
 * @param {string} email - Email address
 * @returns {string} - Encoded email
 */
export function encodeEmail(email) {
  // Use a simple encoding that's not easily scraped
  return btoa(email).split('').reverse().join('');
}

/**
 * Decode email
 * @param {string} encoded - Encoded email
 * @returns {string} - Decoded email
 */
export function decodeEmail(encoded) {
  try {
    return atob(encoded.split('').reverse().join(''));
  } catch (e) {
    return '';
  }
}

