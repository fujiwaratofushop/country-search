import React from 'react';
import { ICountryCard } from './types';

const CountryCardContent = ({ name, flag, capital, continent, currency }: ICountryCard) => {
  return (
    <>
      <img src={flag} alt={`${name} flag`} className="w-full h-24 object-cover rounded" />
      <h2 className="text-base font-medium mt-1">{name}</h2>
      <p className="text-xs text-gray-600">Capital: {capital}</p>
      <p className="text-xs text-gray-600">Continent: {continent}</p>
      <p className="text-xs text-gray-600">Currency: {currency}</p>
    </>
  );
};

export default CountryCardContent;
