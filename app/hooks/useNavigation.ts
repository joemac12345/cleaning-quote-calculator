'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

/**
 * Hook to detect navigation and track isNavigating state.
 * Used by NavigationProgress and other components to enhance UX during page transitions.
 */
export function useNavigation() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const prevPathRef = useRef<string>(pathname);

  useEffect(() => {
    // Detect when pathname changes (navigation occurred)
    if (prevPathRef.current !== pathname) {
      setIsNavigating(true);
      prevPathRef.current = pathname;
      
      // Reset navigation state after transition completes
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 400);
      
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return { isNavigating };
}
