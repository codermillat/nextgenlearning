import { useEffect, useState } from 'react';

/**
 * Font Loading Hook
 * Detects when web fonts have loaded to prevent CLS
 * Uses Font Loading API with fallback timeout
 * 
 * @param {string} fontFamily - Font family name to check (default: 'Inter')
 * @returns {boolean} - True when font is loaded or timeout reached
 */
export function useFontLoading(fontFamily = 'Inter') {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // If Font Loading API is not supported, assume fonts are loaded
    if (!document.fonts) {
      setFontLoaded(true);
      return;
    }

    // Check if fonts are ready
    document.fonts.ready.then(() => {
      setFontLoaded(true);
    });

    // Fallback timeout - proceed after 3 seconds even if fonts haven't loaded
    const timeout = setTimeout(() => {
      if (!fontLoaded) {
        console.warn(`Font loading timeout for ${fontFamily}, using fallback`);
        setFontLoaded(true);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [fontFamily, fontLoaded]);

  return fontLoaded;
}
