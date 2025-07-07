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

  // 👇 Only change when filters change (not page)
  const queryIdentity = useMemo(() => `${name}-${continent}-${sort}`, [name, continent, sort]);

  const cacheKey = `result:${queryIdentity}-page-${page}`;
  const getCountries = useWithCache(
    cacheKey,
    () =>
      fetchCountriesData({
        name,
        continent,
        sort,
        page,
        limit: LIMIT,
      }),
    { forceRefresh: false }
  );

  // 👇 Reset only when filters change (not page)
  useEffect(() => {
    setCountries([]);
    setPage(1);
    setHasMore(true);
  }, [queryIdentity]);

  // 👇 Fetch countries on page/filter change
  useEffect(() => {
    let canceled = false;

    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getCountries();
        if (!canceled) {
          setCountries((prev) => (page === 1 ? data : [...prev, ...data]));
          setHasMore(data.length === LIMIT);
        }
      } catch (err) {
        console.error('Failed to fetch countries:', err);
      } finally {
        if (!canceled) setLoading(false);
      }
    };

    if (hasMore) fetch();

    return () => {
      canceled = true;
    };
  }, [page, queryIdentity, hasMore]);

  const observerRef = useInfiniteScrollObserver({
    loading,
    hasMore,
    onIntersect: () => setPage((prev) => prev + 1),
  });

  return { countries, loading, observerRef };
}

// lib/fetchCountries.ts
export const fetchCountriesData = async ({
  name,
  continent,
  sort,
  page,
  limit,
}: {
  name: string;
  continent: string;
  sort: string;
  page: number;
  limit: number;
}) => {
  const params = new URLSearchParams();
  if (name) params.set('name', name);
  if (continent) params.set('continent', continent);
  if (sort) params.set('sort', sort);
  params.set('page', page.toString());
  params.set('limit', limit.toString());

  const res = await fetch(`/api/countries?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch countries');
  return res.json();
};
