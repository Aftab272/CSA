import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star } from 'lucide-react';
import { reviews as initialReviews, Review } from '../data/reviews';
import { fetchVerifiedReviews } from '../lib/api';

export default function Testimonials() {
  const [localReviews, setLocalReviews] = useState<Review[]>(initialReviews);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await fetchVerifiedReviews();
      if (data && data.length > 0) {
        setLocalReviews(data as Review[]);
      } else {
        setLocalReviews(initialReviews);
      }
      setCurrentIndex(0);
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setLocalReviews(current => {
        if (current.length === 0) return current;
        setCurrentIndex((prev) => (prev + 1) % current.length);
        return current;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const review = localReviews[currentIndex] || initialReviews[0];

  return (
    <div className="text-center">
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display mb-3 sm:mb-4 text-gray-900 dark:text-white">What Our Clients Say</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-xs sm:text-sm md:text-base">Trusted by clients worldwide.</p>

      <div className="flex justify-center items-center mb-6 sm:mb-8 gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="text-yellow-400 fill-current w-5 h-5 sm:w-6 sm:h-6" />
        ))}
        <span className="ml-2.5 sm:ml-3 text-base sm:text-xl font-bold text-gray-900 dark:text-white">4.9 / 5.0 Average</span>
      </div>

      <AnimatePresence mode="wait">
        {review && (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-secondary p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl transition-colors duration-300"
          >
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 dark:bg-accent/20 flex items-center justify-center text-blue-600 dark:text-accent font-bold text-lg sm:text-xl border border-blue-200 dark:border-accent/30">
                {review.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <h4 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">{review.name}</h4>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{review.company}</p>
              </div>
            </div>
            <p className="text-sm sm:text-lg md:text-xl italic mb-4 sm:mb-6 text-gray-700 dark:text-gray-200 leading-relaxed">"{review.comment}"</p>
            <div className="text-xs sm:text-sm text-blue-600 dark:text-accent font-bold uppercase tracking-wider">{review.service}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
