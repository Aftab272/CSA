import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Globe, Star, ExternalLink, Code2 } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import type { ProjectContent } from '../types/content';

type ProjectModalProps = {
  project: ProjectContent;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
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
        className="bg-white dark:bg-[#0c1222] border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto text-gray-900 dark:text-white shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300 cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        
        <img 
          loading="lazy" 
          src={project.gallery?.[0] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'} 
          alt={project.title} 
          className="w-full h-64 sm:h-72 object-cover rounded-2xl mb-6 shadow-md border border-gray-100 dark:border-white/5" 
        />
        
        <div className="space-y-6">
          <div>
            <span className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider rounded-full border border-blue-500/20 inline-block mb-3">
              {project.category} {project.completionDate ? `• ${project.completionDate}` : ''}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-gray-900 dark:text-white leading-tight">
              {project.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold font-display text-blue-600 dark:text-cyan-400">
                Project Overview
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                {project.description || project.shortDescription || 'Enterprise-grade software delivered with precision.'}
              </p>
            </div>
            
            {project.techStack && Object.keys(project.techStack).length > 0 && (
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-bold font-display text-blue-600 dark:text-cyan-400 flex items-center gap-2">
                  <Code2 size={18} />
                  <span>Architecture &amp; Tech Stack</span>
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                  {Object.entries(project.techStack).map(([key, value]) => (
                    <div key={key} className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                      <strong className="capitalize text-gray-900 dark:text-white block mb-0.5">{key}:</strong>
                      <span className="text-gray-600 dark:text-gray-400 font-medium">{Array.isArray(value) ? value.join(', ') : String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {project.clientReview && (
            <div className="bg-gray-50 dark:bg-white/5 p-5 sm:p-6 rounded-2xl border border-gray-200 dark:border-white/10">
              <div className="flex text-amber-400 mb-2 gap-0.5">
                {[...Array(project.clientReview.rating || 5)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
              </div>
              <p className="italic text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-2">
                "{project.clientReview.text}"
              </p>
              <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                — {project.clientReview.name}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-100 dark:border-white/10">
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Globe size={16} />
                <span>Visit Live Platform</span>
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer"
              >
                <SiGithub size={16} />
                <span>Source Repository</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="ml-auto px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 font-bold text-xs sm:text-sm transition border border-gray-200 dark:border-white/10 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
