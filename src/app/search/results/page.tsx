'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCountryResults } from '@/hooks/useCountryResults';
import InfiniteGrid from '@/components/common/Grid/Grid';
import CardContainer from '@/components/common/Card/CardContainer';
import CountryCard from '@/components/semantic/CountrySearchCard/CountrySearchCard';
import NoCountryResults from '@/components/semantic/NoCountryResults/NoCountryResults';
import ErrorContainer from '@/components/common/Error/ErrorContainer';
import { Country } from '@/app/types/Country';
import { RefObject } from 'react';
import { GRIDSORTOPTIONS } from '@/constants/constants';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { countries, loading, observerRef } = useCountryResults(searchParams);

  const currentSortRaw = searchParams.get('sort') || '';
  const currentSort = currentSortRaw.charAt(0).toUpperCase() + currentSortRaw.slice(1).toLowerCase();

  const handleSortChange = (sortBy: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('sort', sortBy.toLowerCase()); // lowercase for consistency
    router.push(`?${newParams.toString()}`);
  };

  const handleDoubleClick = (country: Country) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('name', country.name); // or country.name.common if using REST API format
    router.push(`/search/details?${newParams.toString()}`);
  };


  if (!loading && countries.length === 0) {
    return (
      <div className="p-4 flex justify-center">
        <ErrorContainer>
          <NoCountryResults />
        </ErrorContainer>
      </div>
    );
  }

  return (
    <InfiniteGrid
      items={countries}
      loading={loading}
      observerRef={observerRef as RefObject<HTMLDivElement>}
      renderItem={(country, idx) => (
        <CardContainer onDoubleClick={() => handleDoubleClick(country)} key={idx}>
          <CountryCard {...country} />
        </CardContainer>
      )}
      currentSort={currentSort}
      sortOptions={GRIDSORTOPTIONS}
      onSortChange={handleSortChange}
    />
  );
}
