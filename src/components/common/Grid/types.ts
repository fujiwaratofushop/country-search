// components/common/Grid/types.ts
export interface InfiniteGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  observerRef: React.RefObject<HTMLDivElement>;
  loading: boolean;
  currentSort: string;
  sortOptions?: string[];
  onSortChange?: (value: string) => void;
}
