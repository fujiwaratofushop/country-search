'use client';

import { SuggestiveInput } from '@/components/common/SuggestiveInput/SuggestiveInput';
import { SearchBarUIProps } from './types';

export const SearchBar = ({
  isCompact,
  dropdownEmptyValue,
  dropdownValue,
  dropdownOptions,
  inputValue,
  suggestions,
  onDropdownChange,
  onInputChange,
  onSuggestionClick,
  onSubmit,
}: SearchBarUIProps) => {

    console.log('123', suggestions)
  return (
    <form
      onSubmit={onSubmit}
      className={`transition-all duration-500 ease-in-out mx-auto flex items-center gap-3 flex-wrap sm:flex-nowrap
        bg-white shadow-lg rounded-xl w-full
        ${isCompact ? 'max-w-2xl p-3 scale-75' : 'max-w-4xl p-6'}
      `}
    >
      {/* Dropdown */}
      <select
        value={dropdownValue}
        onChange={(e) => onDropdownChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 flex-1 min-w-[150px]"
      >
        <option value="">{dropdownEmptyValue}</option>
        {dropdownOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Suggestive Input */}
      <SuggestiveInput
        value={inputValue}
        suggestions={suggestions}
        onChange={onInputChange}
        onSuggestionClick={onSuggestionClick}
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
        aria-label="Search"
      >
        <span role="img" aria-label="search" className="leading-normal text-lg h-6 w-6">🔍︎</span>
      </button>
    </form>
  );
};

export default SearchBar