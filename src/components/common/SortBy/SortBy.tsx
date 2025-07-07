'use client';

import { SortDropdownProps } from "./types";

export default function SortDropdown({ selected, options, onChange }: SortDropdownProps) {
  return (
    <div className="fixed top-6.5 right-6 z-[999] bg-white shadow-lg rounded p-2 w-48 flex items-center gap-x-2">
      <label className="text-xs font-medium text-gray-700 whitespace-nowrap">
        Sort by
      </label>

      <select
        className="text-xs px-3 py-1 border border-gray-300 rounded w-32"
        value={selected || ''}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option value="">None</option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
