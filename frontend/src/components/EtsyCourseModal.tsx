import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Calendar, 
  Clock, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  FolderGit2, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  MessageSquare, 
  Layers, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { etsyCourseData } from '../data/etsyCourseData';

interface EtsyCourseModalProps {
  onClose: () => void;
}

export default function EtsyCourseModal({ onClose }: EtsyCourseModalProps) {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'overview' | 'projects' | 'requirements'>('syllabus');
  const [openModule, setOpenModule] = useState<number | null>(1);

  const toggleModule = (moduleNum: number) => {
    setOpenModule(prev => (prev === moduleNum ? null : moduleNum));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        className="bg-white dark:bg-[#0c1222] border border-gray-200 dark:border-white/10 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl text-gray-900 dark:text-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative px-6 py-6 sm:px-8 border-b border-gray-100 dark:border-white/10 bg-gradient-to-r from-blue-600/10 via-indigo-600/5 to-purple-600/10 dark:from-blue-600/20 dark:via-transparent dark:to-purple-600/20">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-blue-600 text-white shadow-sm">
              {etsyCourseData.badge}
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-blue-50 dark:bg-white/5 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-blue-500/20">
              {etsyCourseData.institute}
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
              {etsyCourseData.duration}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 dark:text-white leading-tight">
            {etsyCourseData.title}
          </h2>
          <p className="text-xs sm:text-sm text-blue-600 dark:text-cyan-400 font-medium mt-1">
            {etsyCourseData.tagline}
          </p>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1 scrollbar-none border-b border-gray-200 dark:border-white/10">
            <button
              onClick={() => setActiveTab('syllabus')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                activeTab === 'syllabus'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              <BookOpen size={15} />
              <span>12 Course Modules</span>
            </button>
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              <Layers size={15} />
              <span>Overview &amp; Details</span>
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                activeTab === 'projects'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              <FolderGit2 size={15} />
              <span>Practical Projects (10)</span>
            </button>
            <button
              onClick={() => setActiveTab('requirements')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                activeTab === 'requirements'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              <CheckCircle2 size={15} />
              <span>Outcomes & Prerequisites</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* TAB 1: SYLLABUS (12 MODULES) */}
          {activeTab === 'syllabus' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="text-blue-500" size={18} />
                    Complete 12-Module Syllabus (1 Month Intensive)
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Click any module below to inspect the detailed topic breakdown.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOpenModule(openModule === null ? 1 : null)}
                    className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline"
                  >
                    {openModule === null ? 'Expand All' : 'Collapse'}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {etsyCourseData.modules.map((mod) => {
                  const isOpen = openModule === mod.number || openModule === -1;
                  return (
                    <div
                      key={mod.number}
                      className="border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden bg-gray-50/50 dark:bg-white/2 transition-colors"
                    >
                      <button
                        onClick={() => toggleModule(mod.number)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-100/60 dark:hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-500/20">
                            {mod.number < 10 ? `0${mod.number}` : mod.number}
                          </span>
                          <span className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                            MODULE {mod.number}: {mod.title}
                          </span>
                        </div>
                        <span className="text-gray-400">
                          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 border-t border-gray-200/50 dark:border-white/5 bg-white dark:bg-[#080d19]">
                          <ul className="grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                            {mod.topics.map((topic, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-blue-500 dark:text-cyan-400 font-bold mt-0.5">•</span>
                                <span className="leading-relaxed">{topic}</span>
                              </li>
                            ))}
                          </ul>

                          {mod.note && (
                            <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2 text-xs text-amber-700 dark:text-amber-300">
                              <AlertCircle size={15} className="shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{mod.note}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: OVERVIEW & SCHEDULE */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Description card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
                <h4 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 mb-2">
                  About This Training Program
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {etsyCourseData.description}
                </p>
              </div>

              {/* Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {etsyCourseData.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-gray-50 dark:bg-white/4 border border-gray-200 dark:border-white/10"
                  >
                    <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                      {h.label}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mt-1 block">
                      {h.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Training Format Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 space-y-3">
                <h4 className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                  <Calendar className="text-blue-500" size={18} />
                  Training Format
                </h4>
                <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
                  <div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white block">
                      Classes Online Hain (100% Online Classes)
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 block">
                      Interactive online mentorship, practical hands-on exercises, assignments reviews, and direct instructor support.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRACTICAL PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="pb-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FolderGit2 className="text-blue-500" size={18} />
                  10 Practical Hands-On Projects &amp; Deliverables
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  During this 1-month intensive, each student completes practical assignments to build their live digital store portfolio.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {etsyCourseData.projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-gray-50 dark:bg-white/3 border border-gray-200 dark:border-white/10 flex items-start gap-3 hover:border-blue-500/30 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                      {proj}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: OUTCOMES & REQUIREMENTS */}
          {activeTab === 'requirements' && (
            <div className="space-y-6">
              {/* Learning Outcomes */}
              <div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Award className="text-blue-500" size={18} />
                  What You Will Learn &amp; Master
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {etsyCourseData.learningOutcomes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Prerequisites */}
              <div className="pt-4 border-t border-gray-200 dark:border-white/10">
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 className="text-blue-500" size={18} />
                  Student Prerequisites &amp; Technical Requirements
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  {etsyCourseData.requirements.map((req, idx) => (
                    <li key={idx} className="leading-relaxed pl-1">
                      {req}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Official Disclaimer */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 leading-relaxed flex items-start gap-2.5">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold mb-1">Important Notice:</strong>
                  {etsyCourseData.importantNotice}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Footer */}
        <div className="px-6 py-4 sm:px-8 border-t border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-[#070b14] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs text-gray-400 line-through">{etsyCourseData.originalPrice}</span>
              <span className="text-2xl font-black text-blue-600 dark:text-cyan-400 font-display">
                {etsyCourseData.price}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Limited Seats Batch
              </span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Complete 1 Month Live Training · Creative Stack Agency
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="https://wa.me/923021575850?text=Hi%20Creative%20Stack%20Agency,%20I%20want%20details%20about%20the%20Etsy%20Digital%20Products%20Mastery%20course."
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-white hover:bg-emerald-600 hover:border-emerald-600 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0"
            >
              <MessageSquare size={14} />
              <span>WhatsApp</span>
            </a>

            <a
              href={etsyCourseData.formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none py-3 px-7 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>Enroll in Etsy Track</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
