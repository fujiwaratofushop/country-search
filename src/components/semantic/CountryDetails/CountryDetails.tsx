// components/CountryCardContent.tsx
import { CountryDetailsCardProps } from "./types";

const CountryCardContent = ({ country }: { country: CountryDetailsCardProps }) => {
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow space-y-4">
      <div className="flex items-center space-x-4">
        <img
          src={country.flag}
          alt={`${country.name} flag`}
          className="w-24 h-auto rounded"
        />
        <div>
          <h1 className="text-3xl font-bold">{country.name}</h1>
          <p className="text-gray-600 italic">{country.officialName}</p>
          <p className="text-sm text-gray-500">Native Names: {country.nativeNames}</p>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-800">
        <li><strong>Capital:</strong> {country.capital}</li>
        <li><strong>Region:</strong> {country.region}</li>
        <li><strong>Subregion:</strong> {country.subregion}</li>
        <li><strong>Population:</strong> {country.population}</li>
        <li><strong>Area:</strong> {country.area}</li>
        <li><strong>Currency:</strong> {country.currency}</li>
        <li><strong>Languages:</strong> {country.languages}</li>
        <li><strong>Timezones:</strong> {country.timezones}</li>
        <li><strong>Driving Side:</strong> {country.drivingSide}</li>
        <li><strong>Borders:</strong> {country.borders}</li>
        <li><strong>Top-Level Domain:</strong> {country.tld}</li>
        <li><strong>UN Member:</strong> {country.unMember}</li>
      </ul>

      {country.coatOfArms && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Coat of Arms</h2>
          <img
            src={country.coatOfArms}
            alt={`${country.name} coat of arms`}
            className="w-32 h-auto"
          />
        </div>
      )}

      <a
        href={country.mapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-sm"
      >
        View on Google Maps
      </a>
    </div>
  );
};

export default CountryCardContent;
