import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle } from 'lucide-react';
import { Service } from '../data/services';

type ServiceModalProps = {
  service: Service;
  onClose: () => void;
};

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/95 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="bg-secondary border border-white/10 rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 bg-primary/80 text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all duration-300"
          >
            <X size={20} />
          </button>
          
          <nav className="flex text-gray-400 text-sm mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="/" onClick={(e) => { e.preventDefault(); onClose(); }} className="inline-flex items-center hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2">/</span>
                  <a href="#services" onClick={(e) => { e.preventDefault(); onClose(); }} className="hover:text-white">Services</a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="text-gray-200">{service.title}</span>
                </div>
              </li>
            </ol>
          </nav>

          <img loading="lazy" src={service.image} alt={service.title} className="w-full h-56 md:h-64 object-cover rounded-2xl mb-6 shadow-md" />
          
          <div className="space-y-4">
            <span className="bg-accent/20 text-accent text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
              {service.category}
            </span>
            
            <h2 className="text-3xl font-bold font-display leading-tight">{service.title}</h2>
            
            <p className="text-gray-200 leading-relaxed text-base pt-2">
              {service.description} We work hand-in-hand with your business to construct robust digital experiences that improve user retention, loading performance, and overall client experience.
            </p>

            {service.fullDescription && (
              <div className="space-y-4 pt-4 text-gray-200 leading-relaxed text-base">
                {service.fullDescription.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}

            <div className="space-y-3 pt-6">
              <h3 className="text-lg font-bold text-accent font-display">Key Offerings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-200">
                    <CheckCircle size={16} className="text-accent flex-shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <CheckCircle size={16} className="text-accent flex-shrink-0" />
                  <span>24/7 Dedicated Support</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <CheckCircle size={16} className="text-accent flex-shrink-0" />
                  <span>100% Mobile Responsive</span>
                </div>
              </div>
            </div>
            
            <div className="pt-6 grid grid-cols-2 gap-4">
              <button 
                onClick={() => {
                  onClose();
                  // Dispatch simple custom event to populate and scroll to contact
                  window.dispatchEvent(new CustomEvent('select-service', { 
                    detail: { service: service.title } 
                  }));
                  window.location.hash = 'contact';
                }}
                className="py-4 bg-accent text-primary font-bold rounded-xl hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition text-center"
              >
                Hire Us
              </button>
              <button 
                onClick={onClose}
                className="py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition"
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
