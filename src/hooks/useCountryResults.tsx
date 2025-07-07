// hooks/useCountryResults.ts
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useInfiniteScrollObserver } from './useInfiniteScrollObserver';
import { useWithCache } from './useWithCache';

const LIMIT = 12;

export function useCountryResults(searchParams: URLSearchParams) {
  const [countries, setCountries] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const name = searchParams.get('name') || '';
  const continent = searchParams.get('continent') || '';
  const sort = searchParams.get('sort') || '';

  const queryKey = useMemo(
    () => `${name}-${continent}-${sort}-page-${page}`,
    [name, continent, sort, page]
  );

  const fetcher = async () => {
    const params = new URLSearchParams();
    if (name) params.set('name', name);
    if (continent) params.set('continent', continent);
    if (sort) params.set('sort', sort);
    params.set('page', page.toString());
    params.set('limit', LIMIT.toString());

    const res = await fetch(`/api/countries?${params.toString()}`);
    return await res.json();
  };

  const getCountries = useWithCache(queryKey, fetcher);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const data = await getCountries();
      if (cancelled) return;

      setCountries((prev) => (page === 1 ? data : [...prev, ...data]));
      setHasMore(data.length === LIMIT);
      setLoading(false);
    }

    if (hasMore) load();

    return () => {
      cancelled = true;
    };
  }, [queryKey]);

  // Reset on searchParams change (excluding page)
  useEffect(() => {
    setCountries([]);
    setPage(1);
    setHasMore(true);
  }, [name, continent, sort]);

  const observerRef = useInfiniteScrollObserver({
    loading,
    hasMore,
    onIntersect: () => setPage((prev) => prev + 1),
  });

  return { countries, loading, observerRef };
}
