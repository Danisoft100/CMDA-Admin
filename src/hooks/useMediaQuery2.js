import { useEffect, useState } from "react";

export function useMediaQuery2(query) {
  const [isMatched, setIsMatched] = useState(window.matchMedia(`(max-width: ${query})`).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${query})`);

    const handleResize = () => setIsMatched(mediaQuery.matches);

    // Add the event listener on initial render and cleanup on unmount
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [query]);

  return isMatched;
}
