'use client';

import React from 'react';
import { InfiniteGridProps } from './types';
import SortDropdown from '@/components/common/SortBy/SortBy';
import Loading from '../Loading/Loading';

export default function InfiniteGrid<T>({
  items,
  renderItem,
  observerRef,
  loading,
  currentSort,
  sortOptions,
  onSortChange,
}: InfiniteGridProps<T>) {

  console.log('123', currentSort)

  return (
    <>
      {sortOptions && <SortDropdown selected={currentSort} options={sortOptions} onChange={onSortChange} />}

      {loading && <Loading text='Loading country details'/>}

      <div className="p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
        {items.map((item, idx) => (
          <React.Fragment key={idx}>{renderItem(item, idx)}</React.Fragment>
        ))}

        <div ref={observerRef} className="h-1" />

        
      </div>
    </>
  );
}
