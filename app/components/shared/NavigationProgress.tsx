'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationProgress() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start transition when pathname changes
    setIsTransitioning(true);
    setProgress(10);

    // Progressive loading effect
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90;
        return prev + Math.random() * 30;
      });
    }, 200);

    // Complete transition after a short delay
    const timeout = setTimeout(() => {
      setIsTransitioning(false);
      setProgress(100);
      setTimeout(() => setProgress(0), 300);
    }, 400);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [pathname]);

  if (!isTransitioning && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 z-50"
      style={{
        width: `${progress}%`,
        opacity: isTransitioning ? 1 : 0,
      }}
    />
  );
}
