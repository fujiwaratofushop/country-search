import { CountryAPIResponse } from "@/app/types/responses/CountryAPIResponse";

export function debounce(func: Function, delay: number) {
  let timeoutId: any;

  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function flattenCountryData(country: CountryAPIResponse) {
  const currency = Object.values(country.currencies || {})[0] as any;
  const languages = Object.values(country.languages || {}).join(", ");
  const nativeNames = Object.values(country.name.nativeName || {})
    .map((n: any) => n.common)
    .join(", ");

  return {
    name: country.name.common,
    officialName: country.name.official,
    nativeNames,
    flag: country.flags.png,
    coatOfArms: country.coatOfArms?.png,
    capital: country.capital?.join(", ") || "N/A",
    region: country.region,
    subregion: country.subregion || "N/A",
    population: country.population.toLocaleString(),
    area: `${country.area.toLocaleString()} km²`,
    currency: `${currency?.name || "N/A"} (${currency?.symbol || "-"})`,
    languages,
    timezones: country.timezones?.join(", ") || "N/A",
    drivingSide: country.car?.side === "right" ? "Right" : "Left",
    borders: country.borders?.join(", ") || "None",
    tld: country.tld?.join(", ") || "N/A",
    unMember: country.unMember ? "Yes" : "No",
    mapLink: country.maps?.googleMaps || "#",
  };
};