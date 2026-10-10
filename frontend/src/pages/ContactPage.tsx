import React from 'react';
import PageShell from './PageShell';
import ContactSection from '../components/ContactSection';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, MessageSquare, ShieldCheck, CheckCircle } from 'lucide-react';
export default function ContactPage() {

  return (
    <PageShell
      title="Contact Us | Creative Stack Agency"
      description="Get in touch with Creative Stack Agency. Request a project proposal, schedule a free discovery call, or connect with our engineering team."
    >
      {/* Contact Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-12 pb-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-semibold mb-6"
        >
          <MessageSquare size={16} />
          <span>Let's Build Something Great Together</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white mb-6"
        >
          Get in Touch with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400">Our Experts</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Have a question or looking to kick off a new project? Send us your message and our senior technical lead will get back to you within 24 hours.
        </motion.p>
      </section>

      {/* Main Contact Form Section */}
      <ContactSection />

      {/* Trust & Guarantee points */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-white dark:bg-secondary/30 border border-gray-200 dark:border-white/5 shadow-sm">
            <ShieldCheck size={28} className="text-blue-500 dark:text-blue-400 mx-auto mb-3" />
            <h4 className="font-bold text-gray-900 dark:text-white mb-1">Strict NDA Protection</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">Your ideas and intellectual property are 100% confidential and secure.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-secondary/30 border border-gray-200 dark:border-white/5 shadow-sm">
            <Clock size={28} className="text-emerald-500 dark:text-emerald-400 mx-auto mb-3" />
            <h4 className="font-bold text-gray-900 dark:text-white mb-1">24-Hour Response</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">Guaranteed swift turnaround with complete scope and timeline estimates.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-secondary/30 border border-gray-200 dark:border-white/5 shadow-sm">
            <CheckCircle size={28} className="text-indigo-500 dark:text-indigo-400 mx-auto mb-3" />
            <h4 className="font-bold text-gray-900 dark:text-white mb-1">Zero Obligation</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">Free 30-minute discovery call with no strings attached.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
