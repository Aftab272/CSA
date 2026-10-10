import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ServiceContent } from '../types/content';

type ServiceModalProps = {
  service: ServiceContent;
  onClose: () => void;
};

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
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
          className="bg-white dark:bg-[#0c1222] border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto text-gray-900 dark:text-white shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/20 p-2 rounded-full transition-all duration-300"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          
          <nav className="flex text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-4 font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <a href="/" onClick={(e) => { e.preventDefault(); onClose(); }} className="inline-flex items-center hover:text-blue-600 dark:hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-1 text-gray-400">/</span>
                  <a href="/#services" onClick={(e) => { e.preventDefault(); onClose(); navigate('/#services'); }} className="hover:text-blue-600 dark:hover:text-white">Services</a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-1 text-gray-400">/</span>
                  <span className="text-gray-800 dark:text-gray-200 font-semibold">{service.title}</span>
                </div>
              </li>
            </ol>
          </nav>

          <img loading="lazy" src={service.image} alt={service.title} className="w-full h-56 md:h-64 object-cover rounded-2xl mb-6 shadow-md border border-gray-100 dark:border-white/5" />
          
          <div className="space-y-4">
            <span className="bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full inline-block border border-blue-500/20">
              {service.category}
            </span>
            
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-gray-900 dark:text-white leading-tight">
              {service.title}
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base pt-1">
              {service.description} We work hand-in-hand with your business to construct robust digital experiences that improve user retention, loading performance, and overall client experience.
            </p>

            {service.fullDescription && (
              <div className="space-y-3 pt-2 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                {service.fullDescription.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}

            <div className="space-y-3 pt-4">
              <h3 className="text-base sm:text-lg font-bold text-blue-600 dark:text-cyan-400 font-display">Key Offerings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium">
                    <CheckCircle size={16} className="text-blue-500 dark:text-cyan-400 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium">
                  <CheckCircle size={16} className="text-blue-500 dark:text-cyan-400 shrink-0" />
                  <span>24/7 Dedicated Support</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium">
                  <CheckCircle size={16} className="text-blue-500 dark:text-cyan-400 shrink-0" />
                  <span>100% Mobile Responsive</span>
                </div>
              </div>
            </div>
            
            <div className="pt-6 grid grid-cols-2 gap-4">
              <button 
                onClick={() => {
                  onClose();
                  const query = new URLSearchParams({ service: service.title });
                  navigate(`/?${query.toString()}#contact`);
                }}
                className="py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-md transition text-center text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Hire Us</span>
                <ArrowRight size={16} />
              </button>
              <button 
                onClick={onClose}
                className="py-3.5 px-6 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white font-bold rounded-xl transition text-center text-sm cursor-pointer"
              >
                Back to Services
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
