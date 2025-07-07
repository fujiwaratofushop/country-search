// hooks/useInfiniteScrollObserver.ts
'use client';

import { useEffect, useRef } from 'react';

export function useInfiniteScrollObserver({
  loading,
  hasMore,
  onIntersect,
}: {
  loading: boolean;
  hasMore: boolean;
  onIntersect: () => void;
}) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onIntersect();
      }
    });

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [loading, hasMore, onIntersect]);

  return observerRef;
}
