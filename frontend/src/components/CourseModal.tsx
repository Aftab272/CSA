import React from 'react';
import { motion } from 'motion/react';
import { X, ExternalLink, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import type { CourseContent } from '../types/content';

type CourseModalProps = {
  course: CourseContent;
  onClose: () => void;
};

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScn0oHrhzZAZZnSLqY35NS6TfiqzJA1ZMMCGSQQNsQDJXh4aA/viewform?usp=dialog';

export default function CourseModal({ course, onClose }: CourseModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto text-gray-900 dark:text-white shadow-2xl relative flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="space-y-5">
          {/* Top badges & price */}
          <div className="flex flex-wrap items-center justify-between gap-2 pr-8">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-blue-500/15 text-blue-600 dark:text-cyan-400 border border-blue-500/30">
                {course.level || 'All Levels'}
              </span>
              {course.duration && (
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Duration: {course.duration}
                </span>
              )}
            </div>
            <span className="text-lg sm:text-xl font-black text-blue-600 dark:text-cyan-400 font-display">
              {course.price || 'Free Track'}
            </span>
          </div>

          {/* Title & Short Description */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 dark:text-white leading-tight">
              {course.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Training Mode Pill */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span>100% Online Classes · Practical Hands-on Training &amp; Mentorship</span>
          </div>

          {/* Curriculum & Topics */}
          {course.syllabus && course.syllabus.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 dark:bg-white/4 border border-gray-200 dark:border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 mb-3 flex items-center gap-1.5">
                <Sparkles size={14} />
                <span>Curriculum &amp; Topics:</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                {course.syllabus.map((topic, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-blue-500 dark:text-cyan-400 mt-0.5 shrink-0" />
                    <span className="leading-snug">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Features / Benefits if available */}
          {course.features && course.features.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {course.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl text-xs bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 font-medium"
                >
                  ✓ {feat}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons: Direct Enroll Track (Google Form) */}
        <div className="pt-6 mt-6 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-gray-500 dark:text-gray-400 uppercase font-semibold block">
              Admission / Registration
            </span>
            <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
              Click below to fill the online application form
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href="https://wa.me/923021575850?text=Hi%20Creative%20Stack%20Agency,%20I%20have%20a%20question%20about%20your%20courses."
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 text-gray-700 dark:text-gray-300 hover:text-white hover:bg-emerald-600 hover:border-emerald-600 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0"
              title="Chat on WhatsApp"
            >
              <MessageSquare size={14} />
              <span className="hidden sm:inline">Help</span>
            </a>

            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-[0_0_15px_rgba(37,99,235,0.35)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-center"
            >
              <span>Enroll Track</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
