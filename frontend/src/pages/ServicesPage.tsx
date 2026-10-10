import React from 'react';
import PageShell from './PageShell';
import Services from '../components/Services';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
export default function ServicesPage() {

  return (
    <PageShell
      title="Our Premium Services | Creative Stack Agency"
      description="Explore our full suite of digital engineering services: Web & Mobile Apps, UI/UX Design, Cloud Architecture, and AI Automations."
    >
      {/* Header Banner */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-12 pb-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-semibold mb-6"
        >
          <Sparkles size={16} />
          <span>Full-Cycle Digital Agency Solutions</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white mb-6"
        >
          Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400">Scale</span>, Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Impact</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          From ambitious startups to established global brands, we architect custom websites, mobile applications, and intelligent automated workflows tailored to your business goals.
        </motion.p>
      </section>

      {/* Main Services Grid */}
      <Services />

      {/* Agency Process Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-gray-900 dark:text-white mb-4">Our Proven 4-Step Process</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">How we turn concepts into market-dominating digital experiences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Discovery & Scope', desc: 'Deep dive into your product requirements, user personas, and KPIs.' },
            { step: '02', title: 'UI/UX & Prototype', desc: 'Wireframing, interactive Figma designs, and design system creation.' },
            { step: '03', title: 'Agile Engineering', desc: 'Clean, performant, and secure code built with modern web/mobile stacks.' },
            { step: '04', title: 'Launch & Optimize', desc: 'Zero-downtime deployment, SEO optimization, and 24/7 reliability.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-secondary/40 backdrop-blur-xl border border-gray-200 dark:border-white/5 p-6 rounded-2xl relative group hover:border-blue-500/30 transition-all shadow-sm">
              <span className="text-4xl font-black text-blue-500/20 group-hover:text-blue-500/40 transition-colors font-display block mb-3">{item.step}</span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Direct CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 dark:from-blue-600/20 dark:via-indigo-600/20 dark:to-cyan-600/20 border border-blue-200 dark:border-blue-500/30 shadow-md">
          <h2 className="text-2xl sm:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">Need a Custom Solution?</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-8 text-sm sm:text-base">Tell us about your project vision and get an actionable proposal within 24 hours.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all transform hover:-translate-y-0.5"
          >
            <span>Discuss Your Project</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
