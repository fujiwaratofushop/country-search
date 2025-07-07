const NoCountryData = ({error}: {error: string}) => (
  <div className="flex flex-col items-center text-center text-red-700">
    <div className="text-3xl mb-2">🌐</div>
    <p className="text-base font-semibold">Country data could not be loaded</p>
    <p className="text-sm text-red-600">{error}</p>
  </div>
);

export default NoCountryData;
