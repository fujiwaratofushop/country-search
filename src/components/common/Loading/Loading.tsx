'use client';

import React, { useEffect, useState } from 'react';
import { LoadingProps } from './types';

export default function Loading({ text = 'Loading...' }: LoadingProps) {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center p-4 text-gray-600 font-medium text-lg select-none">
      {text}
      <span className="ml-1">
        {'.'.repeat(dotCount)}
      </span>
    </div>
  );
}
