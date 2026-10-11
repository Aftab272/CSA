import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from './PageShell';
import { Home, ArrowRight, Compass, Sparkles, BookOpen, Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function NotFoundPage() {
  return (
    <PageShell
      title="Page Not Found (404) | Creative Stack Agency"
      description="The requested page could not be located on Creative Stack Agency. Navigate back to our services, engineering projects, team, or blog."
    >
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 max-w-4xl mx-auto text-center font-sans">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Compass size={16} />
            <span>Status 404 · Navigation Guide</span>
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white">
            4<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-400 dark:to-blue-500">0</span>4
          </h1>

          <h2 className="text-2xl sm:text-3xl font-bold font-display text-gray-900 dark:text-white">
            Lost in Cyberspace?
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            The destination you are trying to visit might have been renamed, removed, or is temporarily unavailable. Explore our key agency areas below:
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
            >
              <Home size={16} />
              <span>Back to Homepage</span>
            </Link>

            <Link
              to="/services"
              className="py-3.5 px-6 rounded-xl bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white font-bold text-sm transition-all flex items-center gap-2 shadow-sm"
            >
              <Sparkles size={16} />
              <span>Explore Services</span>
            </Link>
          </div>

          {/* Quick Helpful Links Grid */}
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
            <Link
              to="/team"
              className="p-4 rounded-2xl bg-white dark:bg-secondary/60 border border-gray-200 dark:border-white/10 hover:border-blue-500/40 transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <Users size={18} className="text-blue-500 dark:text-cyan-400" />
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Our Squad</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Meet our engineers &amp; leads.</p>
            </Link>

            <Link
              to="/blog"
              className="p-4 rounded-2xl bg-white dark:bg-secondary/60 border border-gray-200 dark:border-white/10 hover:border-blue-500/40 transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <BookOpen size={18} className="text-indigo-500 dark:text-cyan-400" />
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Tech Blog</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Articles &amp; engineering guides.</p>
            </Link>

            <Link
              to="/contact"
              className="p-4 rounded-2xl bg-white dark:bg-secondary/60 border border-gray-200 dark:border-white/10 hover:border-blue-500/40 transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <Sparkles size={18} className="text-purple-500 dark:text-cyan-400" />
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Contact Us</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Get a free project consultation.</p>
            </Link>
          </div>
        </motion.div>
      </section>
    </PageShell>
  );
}
