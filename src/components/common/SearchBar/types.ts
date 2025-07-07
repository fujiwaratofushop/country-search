import { ISuggestion } from "../SuggestiveInput/types";

export interface SearchBarUIProps {
  isCompact: boolean;
  dropdownEmptyValue: string;
  dropdownValue: string;
  dropdownOptions: Option[];
  inputValue: string;
  suggestions: ISuggestion[];
  onDropdownChange: (val: string) => void;
  onInputChange: (val: string) => void;
  onSuggestionClick: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

interface Option {
  label: string;
  value: string;
}
