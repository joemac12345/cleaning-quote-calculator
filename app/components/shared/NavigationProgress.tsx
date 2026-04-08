'use client';

import { useEffect, useState } from 'react';
import { useNavigation } from '@/app/hooks/useNavigation';

export default function NavigationProgress() {
  const { isNavigating } = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isNavigating) return;

    // Start progress
    setProgress(10);

    // Progressive loading effect
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90;
        return prev + Math.random() * 30;
      });
    }, 200);

    // Complete transition after navigation finishes
    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setProgress(0), 300);
    }, 400);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isNavigating]);

  if (!isNavigating && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 h-1 transition-all duration-300 z-50"
      style={{
        width: `${progress}%`,
        opacity: isNavigating ? 1 : 0,
        background: `linear-gradient(to right, var(--color-primary), var(--color-primary))`,
      }}
    />
  );
}
