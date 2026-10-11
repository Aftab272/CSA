import React from 'react';
import { AlertCircle, RefreshCw, Inbox } from 'lucide-react';

interface DataErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const DataErrorState: React.FC<DataErrorStateProps> = ({
  title = 'Cannot Fetch Data',
  message = 'Failed to load content from the server. Please verify your connection or try again.',
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={`w-full max-w-xl mx-auto my-8 p-6 sm:p-8 rounded-3xl border border-rose-500/25 bg-rose-500/5 text-center backdrop-blur-md shadow-lg ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center mb-3.5">
        <AlertCircle size={26} />
      </div>
      <h3 className="text-base sm:text-lg font-bold font-display text-gray-900 dark:text-white mb-1.5">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-5 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md hover:shadow-lg transition cursor-pointer"
        >
          <RefreshCw size={14} />
          <span>Retry Loading</span>
        </button>
      )}
    </div>
  );
};

interface EmptyDataStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export const EmptyDataState: React.FC<EmptyDataStateProps> = ({
  title = 'No Records Found',
  message = 'There is currently no data published in this section.',
  className = '',
}) => {
  return (
    <div
      className={`w-full max-w-md mx-auto my-8 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-secondary/40 text-center backdrop-blur-md ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-400 mx-auto flex items-center justify-center mb-3">
        <Inbox size={24} />
      </div>
      <h3 className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200 mb-1">
        {title}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {message}
      </p>
    </div>
  );
};

interface CardSkeletonGridProps {
  count?: number;
  columns?: string;
  aspectHeight?: string;
}

export const CardSkeletonGrid: React.FC<CardSkeletonGridProps> = ({
  count = 3,
  columns = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8',
  aspectHeight = 'h-52 sm:h-56',
}) => {
  return (
    <div className={columns}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-3xl border border-gray-200/60 dark:border-white/5 bg-white/40 dark:bg-secondary/40 p-4 sm:p-6 overflow-hidden animate-pulse flex flex-col"
        >
          <div className={`w-full rounded-2xl bg-gray-200 dark:bg-white/5 mb-4 ${aspectHeight}`} />
          <div className="h-5 w-3/4 rounded-lg bg-gray-200 dark:bg-white/5 mb-2.5" />
          <div className="h-3.5 w-full rounded-md bg-gray-200/80 dark:bg-white/5 mb-1.5" />
          <div className="h-3.5 w-2/3 rounded-md bg-gray-200/80 dark:bg-white/5 mb-5" />
          <div className="mt-auto h-9 w-full rounded-xl bg-gray-200 dark:bg-white/5" />
        </div>
      ))}
    </div>
  );
};
