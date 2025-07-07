export interface SuggestiveInputProps {
  value: string;
  suggestions: ISuggestion[];
  onChange: (value: string) => void;
  onSuggestionClick: (name: string) => void;
}

export interface ISuggestion { _id: string; name: string }
