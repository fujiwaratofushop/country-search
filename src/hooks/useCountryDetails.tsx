import { useEffect, useState } from 'react';
import { CountryAPIResponse } from '@/app/types/responses/CountryAPIResponse';
import { CountryDetailsCardProps } from '@/components/semantic/CountryDetails/types';
import { useWithCache } from '@/hooks/useWithCache';

export function useCountryDetails(
  endpoint: string | null,
  flattenFn?: (data: any) => CountryDetailsCardProps
) {
  const [country, setCountry] = useState<CountryDetailsCardProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const key = endpoint || '';

  const fetcher = async () => {
    const res = await fetch(endpoint!);
    const data = await res.json();

    const raw: CountryAPIResponse | null =
      Array.isArray(data) && data.length > 0 ? data[0] : data ?? null;

    if (!raw) throw new Error('Country not found');

    return flattenFn ? flattenFn(raw) : (raw as unknown as CountryDetailsCardProps);
  };

  const getCountry = useWithCache<CountryDetailsCardProps>(key, fetcher);

  useEffect(() => {
    if (!endpoint) return;

    let cancelled = false;
    setLoading(true);
    setError('');

    getCountry()
      .then((data) => {
        if (!cancelled) setCountry(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'Error fetching country');
          setCountry(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [endpoint, flattenFn]);

  return { country, loading, error };
}
