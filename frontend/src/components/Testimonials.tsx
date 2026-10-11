import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, AlertCircle, RefreshCw } from 'lucide-react';
import type { Review } from '../data/reviews';
import { fetchVerifiedReviews } from '../lib/api';

export default function Testimonials() {
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const loadReviews = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const data = await fetchVerifiedReviews();
      setLocalReviews((data || []) as Review[]);
      setCurrentIndex(0);
    } catch (err: any) {
      setLocalReviews([]);
      setFetchError(err?.message || 'Cannot fetch reviews from server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadReviews();

    const handleReviewSubmitted = () => {
      void loadReviews();
    };
    window.addEventListener('review-submitted', handleReviewSubmitted);
    return () => window.removeEventListener('review-submitted', handleReviewSubmitted);
  }, []);

  useEffect(() => {
    if (localReviews.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % localReviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [localReviews.length]);

  const review = localReviews[currentIndex];

  return (
    <div className="text-center">
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display mb-3 sm:mb-4 text-gray-900 dark:text-white">What Our Clients Say</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-xs sm:text-sm md:text-base">Verified reviews from authentic client partnerships.</p>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="bg-white dark:bg-secondary p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-white/10 animate-pulse">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700/60" />
            <div className="space-y-2 text-left">
              <div className="h-4 w-28 bg-slate-200 dark:bg-slate-700/60 rounded" />
              <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700/60 rounded" />
            </div>
          </div>
          <div className="space-y-3 max-w-md mx-auto mb-6">
            <div className="h-4 bg-slate-200 dark:bg-slate-700/60 rounded w-full" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700/60 rounded w-4/5 mx-auto" />
          </div>
          <div className="h-3 w-28 bg-slate-200 dark:bg-slate-700/60 rounded mx-auto" />
        </div>
      )}

      {/* Error State: Cannot Fetch Data */}
      {!isLoading && fetchError && (
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6 sm:p-8 text-center">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
          <h4 className="text-base sm:text-lg font-bold text-rose-600 dark:text-rose-400 mb-1">Cannot Fetch Reviews</h4>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4">{fetchError}</p>
          <button
            onClick={() => void loadReviews()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 text-white font-medium text-xs hover:bg-rose-700 transition shadow-sm"
          >
            <RefreshCw size={14} /> Retry Fetching
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !fetchError && localReviews.length === 0 && (
        <div className="bg-white dark:bg-secondary p-8 rounded-2xl border border-gray-200 dark:border-white/10 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">No verified client reviews currently published.</p>
        </div>
      )}

      {/* Render Real Reviews */}
      {!isLoading && !fetchError && review && (
        <>
          <div className="flex justify-center items-center mb-6 sm:mb-8 gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-yellow-400 fill-current w-5 h-5 sm:w-6 sm:h-6" />
            ))}
            <span className="ml-2.5 sm:ml-3 text-base sm:text-xl font-bold text-gray-900 dark:text-white">
              {review.rating ? `${review.rating}.0` : '5.0'} / 5.0
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={review.id || currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-secondary p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl transition-colors duration-300"
            >
              <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 dark:bg-accent/20 flex items-center justify-center text-blue-600 dark:text-accent font-bold text-lg sm:text-xl border border-blue-200 dark:border-accent/30 overflow-hidden">
                  {review.image && (review.image.startsWith('http://') || review.image.startsWith('https://')) ? (
                    <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                  ) : (
                    review.name.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">{review.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{review.company || 'Verified Client'}</p>
                </div>
              </div>
              <p className="text-sm sm:text-lg md:text-xl italic mb-4 sm:mb-6 text-gray-700 dark:text-gray-200 leading-relaxed">
                "{review.comment}"
              </p>
              <div className="text-xs sm:text-sm text-blue-600 dark:text-accent font-bold uppercase tracking-wider">
                {review.service}
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
