'use client';

import { useEffect, useState } from 'react';
import { CountryAPIResponse } from '@/app/types/responses/CountryAPIResponse';

type FlattenFn<T> = (data: CountryAPIResponse) => T;

export function useCountryDetails<T = CountryAPIResponse>(
  countryName: string | null,
  flattenFn?: FlattenFn<T>
) {
  const [country, setCountry] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!countryName) return;

    const fetchCountry = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`
        );
        const data = await res.json();

        if (res.ok && data.length > 0) {
          const raw = data[0];
          setCountry(flattenFn ? flattenFn(raw) : raw);
        } else {
          throw new Error('Country not found');
        }
      } catch (err: any) {
        setError(err.message || 'Error fetching country');
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryName, flattenFn]);

  return { country, loading, error };
}
