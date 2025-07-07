import React from 'react';
import { CardContainerProps } from './types';

const CardContainer = ({ children, onDoubleClick }: CardContainerProps) => {
  return (
    <div onDoubleClick={onDoubleClick} className="rounded-lg border border-gray-300 p-2 shadow-sm bg-white">
      {children}
    </div>
  );
};

export default CardContainer;
