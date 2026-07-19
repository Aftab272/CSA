import React from 'react';
import ReviewForm from './ReviewForm';
import Testimonials from './Testimonials';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="px-6 py-16 md:px-8 md:py-24 bg-primary text-white font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl md:text-5xl font-bold font-display mb-16">Client Reviews & Testimonials</h2>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <ReviewForm />
          </div>
          <div className="flex-1">
            <Testimonials />
          </div>
        </div>
      </div>
    </section>
  );
}
