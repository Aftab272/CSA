import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <section id="about" className="px-8 py-24 bg-primary text-white font-sans">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Introduction & Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white">We're More Than Just Developers</h2>
            <p className="text-gray-300 text-lg">
              Creative Stack Agency is a modern digital solutions company dedicated to helping startups, businesses, and brands establish a strong online presence. We combine creativity, technology, and strategy to build digital experiences that drive real business growth.
            </p>
            <Link to="/about" className="inline-block bg-accent text-primary px-8 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition duration-300">
              Read Our Full Story
            </Link>
          </div>
          <div className="bg-secondary border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold font-display text-accent mb-4">Our Story</h3>
            <p className="text-gray-300">
              Creative Stack Agency began with a simple vision—to bridge the gap between creativity and technology. We provide complete digital solutions that combine beautiful design, modern development, and result-driven marketing strategies under one roof.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-12">
          <h3 className="text-3xl font-bold font-display text-center text-white">Our Core Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {['Creativity', 'Innovation', 'Quality', 'Transparency', 'Client Satisfaction'].map((value, i) => (
              <div key={i} className="bg-secondary p-8 rounded-2xl border border-white/5 shadow-lg hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] transition">
                <h4 className="text-xl font-bold font-display text-accent mb-2">{value}</h4>
                <p className="text-gray-400 text-sm">Our foundation built on {value.toLowerCase()} to deliver excellence.</p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Timeline */}
        <div className="bg-secondary border border-white/10 rounded-3xl p-12 shadow-2xl">
          <h3 className="text-3xl font-bold font-display text-white mb-12 text-center">Professional Timeline</h3>
          <div className="space-y-8">
            {[
              { year: '2025', title: 'Foundation', desc: 'Creative Stack Agency was founded.' },
              { year: '2025', title: 'Service Expansion', desc: 'Expanded into web, UI/UX, branding.' },
              { year: '2026', title: 'Custom Development', desc: 'Started delivering advanced applications.' },
              { year: '2026', title: 'Global Services', desc: 'Began serving international clients.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-center">
                <div className="text-accent font-bold text-xl">{item.year}</div>
                <div className="h-0.5 flex-grow bg-white/10"></div>
                <div>
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

