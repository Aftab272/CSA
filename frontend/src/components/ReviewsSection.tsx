import React from 'react';
import ReviewForm from './ReviewForm';
import Testimonials from './Testimonials';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="px-3.5 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 bg-gray-50/70 dark:bg-primary text-gray-900 dark:text-white font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-2xl sm:text-4xl md:text-5xl font-extrabold font-display mb-8 sm:mb-14 text-gray-900 dark:text-white">
          Client Reviews &amp; Testimonials
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          <div className="flex-1 w-full">
            <ReviewForm />
          </div>
          <div className="flex-1 w-full">
            <Testimonials />
          </div>
        </div>
      </div>
    </section>
  );
}
