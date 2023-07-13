import { FC } from 'react';

interface LoadingIndicatorProps {}

export const LoadingIndicator: FC<LoadingIndicatorProps> = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="border-blue500 border-r-transparent animate-spin inline-block w-12 h-12 border-4 rounded-full"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
