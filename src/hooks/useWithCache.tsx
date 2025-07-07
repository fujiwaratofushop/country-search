// hooks/useWithCache.ts
import { useRef } from 'react';

type Fetcher<T> = (...args: any[]) => Promise<T>;

const globalCache = new Map<string, any>();

export function useWithCache<T>(
  key: string,
  fetcher: Fetcher<T>,
  options?: { forceRefresh?: boolean }
) {
  const cacheRef = useRef(globalCache);

  async function getData(...args: any[]): Promise<T> {
    if (!options?.forceRefresh && cacheRef.current.has(key)) {
      return cacheRef.current.get(key);
    }
    const result = await fetcher(...args);
    cacheRef.current.set(key, result);
    return result;
  }

  return getData;
}
