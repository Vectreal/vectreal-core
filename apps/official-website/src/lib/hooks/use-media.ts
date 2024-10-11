import { useEffect, useState } from 'react';

/**
 * React hook that tracks whether a CSS media query matches the current viewport.
 *
 * @param {string} query - The media query string (e.g. "(max-width: 600px)")
 * @returns {boolean} Whether the media query matches the current viewport
 */
const useMedia = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

export default useMedia;
