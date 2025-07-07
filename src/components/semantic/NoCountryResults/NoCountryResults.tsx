const NoCountryResults = () => (
  <div className="flex flex-col items-center text-center text-red-700">
    <div className="text-3xl mb-2">🌐</div>
    <p className="text-base font-semibold">No matching countries found.</p>
    <p className="text-sm text-red-600">Try changing the search term or selecting a different continent.</p>
  </div>
);

export default NoCountryResults;
