export interface CountryAPIResponse {
  name: {
    common: string;
    official?: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  capital: string[];
  flags: {
    png: string;
    svg?: string;
    alt?: string;
  };
  region: string;
  subregion: string;
  population: number;
  area: number;
  currencies: Record<string, { name: string; symbol: string }>;
  languages: Record<string, string>;
  timezones?: string[];
  car?: {
    side: 'left' | 'right';
    signs?: string[];
  };
  borders?: string[];
  tld?: string[];
  unMember?: boolean;
  coatOfArms?: {
    png?: string;
    svg?: string;
  };
  maps?: {
    googleMaps?: string;
    openStreetMaps?: string;
  };
}
