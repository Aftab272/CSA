import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import type { CourseContent } from '../types/content';

type CourseModalProps = {
  course: CourseContent;
  onClose: () => void;
};

export default function CourseModal({ course, onClose }: CourseModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-110 flex items-center justify-center p-4 bg-primary/90 backdrop-blur-md"
      onClick={onClose}
    >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-secondary border border-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="float-right text-gray-400 hover:text-white"><X /></button>
          
          {submitted ? (
            <div className="text-center py-12">
              <Check className="mx-auto text-accent mb-4" size={48} />
              <h2 className="text-3xl font-bold font-display mb-2">Application Submitted!</h2>
              <p className="text-gray-400">We will get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-3xl font-bold font-display mb-6">Enroll in {course.title}</h2>
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="Full Name" className="bg-primary p-3 rounded-lg border border-white/10" />
                <input required type="email" placeholder="Email" className="bg-primary p-3 rounded-lg border border-white/10" />
              </div>
              <input required type="tel" placeholder="WhatsApp Number" className="w-full bg-primary p-3 rounded-lg border border-white/10" />
              <textarea placeholder="Previous Experience/Skills" className="w-full bg-primary p-3 rounded-lg border border-white/10" rows={3}></textarea>
              <label className="flex items-center gap-2 text-sm text-gray-400">
                <input type="checkbox" required className="accent-accent" />
                I agree to the terms & conditions
              </label>
              <button type="submit" className="w-full py-4 bg-accent text-primary font-bold rounded-full hover:shadow-lg transition">Submit Application</button>
            </form>
          )}
        </motion.div>
    </motion.div>
  );
}
