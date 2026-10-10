import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Rocket, Layers, Cpu, Globe, 
  Sparkles, Lightbulb, Zap, ShieldCheck, Eye, Smile, ArrowRight 
} from 'lucide-react';

export default function About() {
  const coreValues = [
    { title: 'Creativity', icon: Sparkles, desc: 'Crafting unique, memorable visual identities that stand out in crowded digital markets.' },
    { title: 'Innovation', icon: Lightbulb, desc: 'Pioneering AI-driven tools, automated pipelines, and next-generation frameworks.' },
    { title: 'High Performance', icon: Zap, desc: 'Sub-second load speeds, clean architecture, and ultra-responsive user interfaces.' },
    { title: 'Security & Quality', icon: ShieldCheck, desc: 'Enterprise-grade protection, sanitized inputs, and strict zero-vulnerability testing.' },
    { title: 'Transparency', icon: Eye, desc: 'Clear communication, agile sprint demos, and reliable milestone delivery.' },
    { title: 'Client Satisfaction', icon: Smile, desc: 'Dedicated partnership from initial concept ideation to post-launch scaling.' },
  ];

  const milestones = [
    { year: '2025', step: '01', title: 'Agency Foundation', icon: Rocket, desc: 'Creative Stack Agency was established with a focus on modern web development and digital branding.' },
    { year: '2025', step: '02', title: 'Service Expansion', icon: Layers, desc: 'Scaled into full-stack engineering, bespoke UI/UX prototyping, and performance marketing.' },
    { year: '2026', step: '03', title: 'Custom AI Systems', icon: Cpu, desc: 'Engineered autonomous AI agent workflows, SaaS platforms, and enterprise software.' },
    { year: '2026', step: '04', title: 'Global Reach', icon: Globe, desc: 'Delivering world-class digital products and dedicated tech support to clients globally.' }
  ];

  return (
    <section id="about" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-white dark:bg-primary text-gray-900 dark:text-white font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">
        {/* Introduction & Story */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-accent/10 border border-blue-200 dark:border-accent/20 text-blue-600 dark:text-accent text-xs font-bold uppercase tracking-wider">
              About Creative Stack
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-gray-900 dark:text-white tracking-tight leading-tight">
              We're More Than Just Developers
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
              Creative Stack Agency is a modern digital solutions company dedicated to helping startups, businesses, and brands establish a strong online presence. We combine creativity, technology, and strategy to build digital experiences that drive real business growth.
            </p>
            <div className="pt-2">
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-3.5 rounded-xl font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition duration-300"
              >
                <span>Read Our Full Story</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50/60 to-indigo-50/60 dark:from-secondary dark:to-secondary/60 border border-gray-200 dark:border-white/10 rounded-3xl p-8 sm:p-10 shadow-lg dark:shadow-2xl relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-md shadow-blue-500/20">
              <Rocket size={28} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-gray-900 dark:text-white mb-4">Our Core Mission</h3>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
              Creative Stack Agency began with a simple vision—to bridge the gap between creative design and cutting-edge software engineering. We provide complete, turn-key digital solutions that combine beautiful aesthetics, clean high-performance code, and result-driven marketing strategies under one roof.
            </p>
          </div>
        </div>

        {/* Core Values (Clean 3x2 Grid) */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-gray-900 dark:text-white">Our Core Values</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">The foundational principles that guide every product we engineer and design.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {coreValues.map((value, i) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={i} 
                  className="bg-white dark:bg-secondary p-7 sm:p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_25px_rgba(0,212,255,0.15)] hover:border-blue-500/40 transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/10 text-blue-600 dark:text-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <IconComponent size={24} />
                  </div>
                  <h4 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-2">{value.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Professional Timeline (Rich 4-Column Milestone Roadmap) */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-secondary dark:to-secondary/60 border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-lg dark:shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-accent">Our Journey &amp; Growth</span>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-gray-900 dark:text-white">Professional Timeline</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">How Creative Stack Agency evolved into an international digital agency.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((item, i) => {
              const MilestoneIcon = item.icon;
              return (
                <div 
                  key={i} 
                  className="bg-white dark:bg-primary/60 border border-gray-200 dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-100 dark:bg-accent/20 text-blue-600 dark:text-accent border border-blue-200 dark:border-accent/30">
                        {item.year}
                      </span>
                      <span className="text-xs font-mono font-semibold text-gray-400">Step {item.step}</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/10 text-blue-600 dark:text-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <MilestoneIcon size={24} />
                    </div>
                    <h4 className="font-bold text-lg font-display text-gray-900 dark:text-white mb-2">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-gray-100 dark:border-white/5 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                    <span>Completed &amp; Active</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

