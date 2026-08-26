import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <section id="about" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-primary text-gray-900 dark:text-white font-sans">
      <div className="max-w-7xl mx-auto space-y-14 sm:space-y-20">
        {/* Introduction & Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white">We're More Than Just Developers</h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
              Creative Stack Agency is a modern digital solutions company dedicated to helping startups, businesses, and brands establish a strong online presence. We combine creativity, technology, and strategy to build digital experiences that drive real business growth.
            </p>
            <Link to="/about" className="inline-block bg-accent text-primary px-8 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition duration-300">
              Read Our Full Story
            </Link>
          </div>
          <div className="bg-white dark:bg-secondary border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-lg dark:shadow-2xl">
            <h3 className="text-2xl font-bold font-display text-blue-600 dark:text-accent mb-4">Our Story</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Creative Stack Agency began with a simple vision—to bridge the gap between creativity and technology. We provide complete digital solutions that combine beautiful design, modern development, and result-driven marketing strategies under one roof.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-12">
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-center text-gray-900 dark:text-white">Our Core Values</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {['Creativity', 'Innovation', 'Quality', 'Transparency', 'Client Satisfaction'].map((value, i) => (
              <div key={i} className="bg-white dark:bg-secondary p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-white/5 shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] transition">
                <h4 className="text-xl font-bold font-display text-blue-600 dark:text-accent mb-2">{value}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Our foundation built on {value.toLowerCase()} to deliver excellence.</p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Timeline */}
        <div className="bg-white dark:bg-secondary border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-lg dark:shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-gray-900 dark:text-white mb-10 sm:mb-12 text-center">Professional Timeline</h3>
          <div className="space-y-8">
            {[
              { year: '2025', title: 'Foundation', desc: 'Creative Stack Agency was founded.' },
              { year: '2025', title: 'Service Expansion', desc: 'Expanded into web, UI/UX, branding.' },
              { year: '2026', title: 'Custom Development', desc: 'Started delivering advanced applications.' },
              { year: '2026', title: 'Global Services', desc: 'Began serving international clients.' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-3 sm:gap-6 sm:items-center">
                <div className="text-blue-600 dark:text-accent font-bold text-lg sm:text-xl">{item.year}</div>
                <div className="h-0.5 w-full sm:grow bg-gray-200 dark:bg-white/10"></div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

