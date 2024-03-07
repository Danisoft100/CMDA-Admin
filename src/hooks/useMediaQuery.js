import { useEffect, useState } from "react";

/**
 * Custom hook to check if the screen matches a given media query.
 *
 * @param {string} query - The media query string to check.
 * @return {boolean} - Returns true if the screen matches the media query, false otherwise.
 *
 * @example
 * // Usage example in a React component
 * const ScreenSizeChecker = () => {
 *   // Define your media query
 *   const mediaQuery = '(min-width: 600px)';
 *
 *   // Use the custom hook to check if the screen matches the media query
 *   const isScreenMatched = useMediaQuery(mediaQuery);
 *
 *   return (
 *     <div>
 *       <p>
 *         {isScreenMatched
 *           ? 'The screen matches the media query!'
 *           : 'The screen does not match the media query.'}
 *       </p>
 *     </div>
 *   );
 * };
 */

const useMediaQuery = (query) => {
  const [isMatched, setIsMatched] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleChange = (event) => {
      setIsMatched(event.matches);
    };

    mediaQueryList.addEventListener(handleChange);

    return () => {
      mediaQueryList.removeEventListener(handleChange);
    };
  }, [query]);

  return isMatched;
};

export default useMediaQuery;
