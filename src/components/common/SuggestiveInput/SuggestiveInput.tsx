'use client';

import { useState, useRef, useEffect } from 'react';
import { SuggestiveInputProps } from './types';

export const SuggestiveInput = ({
  value,
  suggestions,
  onChange,
  onSuggestionClick,
}: SuggestiveInputProps) => {
  const [focused, setFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHighlightedIndex(-1)
  }, [value])

  useEffect((
    
  ) => {console.log('123',highlightedIndex)}, [highlightedIndex])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length || !focused) {
      return;
    };

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev === 0 ? suggestions.length - 1 : prev - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        const selected = suggestions[highlightedIndex];
        if (selected) {
          onSuggestionClick(selected.name);
          setFocused(false);
        }
        break;
      case 'Escape':
        setFocused(false);
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full flex-1 min-w-[200px]"
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={focused}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setFocused(true)
        }}
        onFocus={() => setFocused(true)}
        onKeyDown={handleKeyDown}
        placeholder="Enter country name..."
        className="border border-gray-300 rounded px-4 py-2 w-full"
        aria-controls="suggestion-list"
        aria-activedescendant={
          focused && suggestions[highlightedIndex]
            ? `suggestion-${suggestions[highlightedIndex]._id}`
            : undefined
        }
      />
      {value && focused && suggestions.length > 0 && (
        <ul
          id="suggestion-list"
          className="absolute z-50 bg-white border border-gray-200 w-full mt-1 rounded shadow-md max-h-48 overflow-y-auto"
          role="listbox"
        >
          {suggestions.map((s, i) => (
            <li
              key={s._id}
              id={`suggestion-${s._id}`}
              role="option"
              aria-selected={highlightedIndex === i}
              onMouseDown={() => {
                // Use onMouseDown instead of onClick to avoid blur-before-click issue
                onSuggestionClick(s.name);
                setFocused(false);
              }}
              className={`px-4 py-2 cursor-pointer ${
                highlightedIndex === i ? 'bg-blue-100' : 'hover:bg-blue-50'
              }`}
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
