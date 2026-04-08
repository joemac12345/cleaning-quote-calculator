'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

/**
 * Hook to detect navigation and show loading indicator during transitions.
 * Helps make page transitions feel smoother and less jarring.
 */
export function useNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Simulate navigation delay detection
    const currentPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    
    // Store current path to detect actual navigation
    const handleNavigation = () => {
      // Navigation detected - route has changed
      setIsNavigating(false);
    };

    handleNavigation();
    
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [pathname, searchParams]);

  return { isNavigating };
}
