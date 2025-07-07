import React from 'react';
import { IErrorContainerProps } from './types';

const ErrorContainer = ({ children }: IErrorContainerProps) => {
  return (
    <div className="w-full max-w-md mx-auto mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl shadow">
      {children ? (
        children
      ) : (
        <p className="text-sm font-medium">Something went wrong. Please try again later.</p>
      )}
    </div>
  );
};

export default ErrorContainer;
