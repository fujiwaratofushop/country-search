// hooks/useCountryResults.ts
'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useInfiniteScrollObserver } from './useInfiniteScrollObserver';

const LIMIT = 12;

export function useCountryResults(searchParams: URLSearchParams) {
  const [countries, setCountries] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const name = searchParams.get('name') || '';
  const continent = searchParams.get('continent') || '';
  const sort = searchParams.get('sort') || '';
  const queryKey = useMemo(() => `${name}-${continent}-${sort}`, [name, continent, sort]);

  const fetchCountries = async (pageNum: number) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (name) params.set('name', name);
    if (continent) params.set('continent', continent);
    if (sort) params.set('sort', sort);
    params.set('page', pageNum.toString());
    params.set('limit', LIMIT.toString());

    const res = await fetch(`/api/countries?${params.toString()}`);
    const data = await res.json();

    setCountries((prev) => (pageNum === 1 ? data : [...prev, ...data]));
    setHasMore(data.length === LIMIT);
    setLoading(false);
  };

  // Reset on searchParams change
  useEffect(() => {
    setCountries([]);
    setPage(1);
    setHasMore(true);
  }, [queryKey]);

  useEffect(() => {
    if (hasMore) fetchCountries(page);
  }, [page, queryKey, hasMore]);

  const observerRef = useInfiniteScrollObserver({
    loading,
    hasMore,
    onIntersect: () => setPage((prev) => prev + 1),
  });

  return { countries, loading, observerRef };
}
