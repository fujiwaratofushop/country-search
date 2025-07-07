'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ISearchBar } from './types';
import { CONTINENTS } from '@/constants/constants';
import { useCountrySuggestions } from '@/hooks/useCountrySuggestions';
import { SearchBar } from '../../common/SearchBar/SearchBar';

export const CountrySearch = ({ isCompact }: ISearchBar) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [continent, setContinent] = useState(searchParams.get('continent') || '');
  const [country, setCountry] = useState(searchParams.get('name') || '');
  const { suggestions, setSuggestions } = useCountrySuggestions(country, continent);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (continent) query.set('continent', continent);
    if (country) query.set('name', country);
    router.push(`/search/results?${query.toString()}`);
    setSuggestions([]);
  };

  const handleSuggestionClick = (val: string) => {
    setCountry(val);
    setSuggestions([]);
  };

  return (
    <div className="searchbar-container relative z-[999]">
      <SearchBar
        isCompact={isCompact}
        dropdownValue={continent}
        dropdownEmptyValue={"All Continents"}
        dropdownOptions={CONTINENTS.map((c) => ({ label: c, value: c }))}
        inputValue={country}
        suggestions={suggestions}
        onDropdownChange={setContinent}
        onInputChange={setCountry}
        onSuggestionClick={handleSuggestionClick}
        onSubmit={handleSearch}
      />
    </div>
  );
};

export default CountrySearch;
