import { CountryAPIResponse } from '@/app/types/responses/CountryAPIResponse';

export interface CountryDetailsCardProps {
  name: string;
  officialName?: string;
  nativeNames: string;
  flag: string;
  coatOfArms?: string;
  capital: string;
  region: string;
  subregion?: string;
  population: string;
  area: string;
  currency: string;
  languages: string;
  timezones: string;
  drivingSide: string;
  borders: string;
  tld: string;
  unMember: string;
  mapLink?: string;
}
