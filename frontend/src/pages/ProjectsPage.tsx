import React from 'react';
import PageShell from './PageShell';
import Projects from '../components/Projects';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Layers, Rocket } from 'lucide-react';
export default function ProjectsPage() {

  return (
    <PageShell
      title="Our Portfolio & Case Studies | Creative Stack Agency"
      description="Browse our selected work, enterprise software solutions, client websites, and cross-platform mobile apps."
    >
      {/* Header Banner */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-12 pb-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs sm:text-sm font-semibold mb-6"
        >
          <Code2 size={16} />
          <span>Curated Portfolio & Case Studies</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white mb-6"
        >
          Work That <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">Drives Growth</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Explore a handpicked selection of our modern web platforms, mobile products, and custom digital software built for clients globally.
        </motion.p>
      </section>

      {/* Projects Component */}
      <Projects />

      {/* Results & Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white dark:bg-secondary/40 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-3xl p-8 sm:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-sm">
          <div>
            <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 font-display block mb-2">50+</span>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">Projects Delivered</span>
          </div>
          <div>
            <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 font-display block mb-2">99.8%</span>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">Client Satisfaction</span>
          </div>
          <div>
            <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 dark:from-yellow-400 dark:to-amber-400 font-display block mb-2">12+</span>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">Global Countries</span>
          </div>
          <div>
            <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 font-display block mb-2">24/7</span>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">Continuous Support</span>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
