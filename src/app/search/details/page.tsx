'use client';

import { useSearchParams } from 'next/navigation';
import ErrorContainer from '@/components/common/Error/ErrorContainer';
import NoCountryData from '@/components/semantic/NoCountryData.tsx/NoCountryData';
import CountryDetailsCard from '@/components/semantic/CountryDetails/CountryDetails';
import Loading from '@/components/common/Loading/Loading';
import { useCountryDetails } from '@/hooks/useCountryDetails';
import { flattenCountryData } from '@/utils/helpers';


export default function CountryDetails() {
  const searchParams = useSearchParams();
  const countryName = searchParams.get('name');

  const endpoint = `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName ?? "")}?fullText=true`;

  const { country, loading, error } = useCountryDetails(endpoint, flattenCountryData);

  if (!countryName)
    return (
      <ErrorContainer>
        <NoCountryData error="No country name provided in query." />
      </ErrorContainer>
    );

  if (loading) return <Loading text="Loading country results" />;

  if (error)
    return (
      <ErrorContainer>
        <NoCountryData error="There was an error fetching the country details. Please try again." />
      </ErrorContainer>
    );

  if (!country)
    return (
      <ErrorContainer>
        <NoCountryData error="The provided country could not be found." />
      </ErrorContainer>
    );

  return <CountryDetailsCard country={country} />;
}
