import { debounce } from '@/utils/helpers';
import { useState, useEffect, useMemo } from 'react';
import { useWithCache } from '@/hooks/useWithCache';

export function useCountrySuggestions(name: string, continent?: string) {
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const key = useMemo(() => {
    if (!name) return null;
    return `suggestions:${name.toLowerCase()}-${continent || 'all'}`;
  }, [name, continent]);

  const fetcher = async () => {
    const url = new URL('/api/suggestions', window.location.origin);
    url.searchParams.set('name', name);
    if (continent) url.searchParams.set('continent', continent);

    const res = await fetch(url.toString());
    const data = await res.json();
    return data;
  };

  const getSuggestions = useWithCache(key || '', fetcher);

  const debouncedFetch = useMemo(() => {
    return debounce(async () => {
      if (!key) {
        setSuggestions([]);
        return;
      }
      const data = await getSuggestions();
      setSuggestions(data);
    }, 500);
  }, [key]);

  useEffect(() => {
    debouncedFetch();
  }, [debouncedFetch]);

  return { suggestions, setSuggestions };
}
