import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star } from 'lucide-react';
import { reviews as initialReviews, Review } from '../data/reviews';
import { supabase } from '../lib/supabase';

export default function Testimonials() {
  const [localReviews, setLocalReviews] = useState<Review[]>(initialReviews);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('createdAt', { ascending: false });

      if (!error && data && data.length > 0) {
        setLocalReviews(data as Review[]);
      } else {
        setLocalReviews(initialReviews); // Fallback agar database khali ho
      }
      setCurrentIndex(0); // Reset index whenever data changes
    };

    fetchReviews();

    // Real-time listener for Supabase Database
    const channel = supabase
      .channel('public:reviews')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reviews' }, payload => {
        fetchReviews();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
        <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">What Our Clients Say</h2>
        <p className="text-gray-400 mb-12">Trusted by clients worldwide.</p>

        <div className="flex justify-center items-center mb-8 gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="text-yellow-400 fill-current w-6 h-6" />
          ))}
          <span className="ml-3 text-xl font-bold">4.9 / 5.0 Average</span>
        </div>

        <AnimatePresence mode="wait">
          {review && (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-secondary p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xl border border-accent/30">
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-white">{review.name}</h4>
                  <p className="text-sm text-gray-400">{review.company}</p>
                </div>
              </div>
              <p className="text-lg md:text-xl italic mb-6 text-gray-200">"{review.comment}"</p>
              <div className="text-sm text-accent font-bold uppercase tracking-wider">{review.service}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}
