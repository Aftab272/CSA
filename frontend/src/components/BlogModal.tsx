import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../data/blog';

type BlogModalProps = {
  post: BlogPost;
  onClose: () => void;
};

export default function BlogModal({ post, onClose }: BlogModalProps) {
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
          className="bg-white dark:bg-[#0c1222] border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto text-gray-900 dark:text-white shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button 
            onClick={onClose} 
            className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
          
          <img 
            loading="lazy" 
            src={post.image} 
            alt={post.title} 
            className="w-full h-60 sm:h-72 object-cover rounded-2xl mb-6 shadow-md border border-gray-100 dark:border-white/5" 
          />
          
          <div className="space-y-4">
            <span className="bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full inline-block border border-blue-500/20">
              {post.category}
            </span>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white leading-tight">
              {post.title}
            </h2>
            
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 border-y border-gray-200 dark:border-white/10 py-3">
              <span className="flex items-center gap-1.5"><Calendar size={14} className="text-blue-500 dark:text-cyan-400" /> {post.date || 'August 2026'}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-blue-500 dark:text-cyan-400" /> {post.readTime}</span>
              <span className="flex items-center gap-1.5"><User size={14} className="text-blue-500 dark:text-cyan-400" /> By {post.author || 'M. Sami Ullah'} ({post.authorRole || 'Lead Architect'})</span>
            </div>
            
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 text-sm sm:text-base pt-2">
              <p className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg border-l-4 border-blue-600 dark:border-cyan-400 pl-4 italic">
                "{post.excerpt}"
              </p>
              <p className="whitespace-pre-line">
                {post.content}
              </p>
              <p>
                As technologies advance rapidly in 2026, keeping up with these trends is vital to maintaining competitive web interfaces and maximizing user conversion rates. If you have any questions or want to implement these solutions on your platform, reach out to us!
              </p>
            </div>
            
            <div className="pt-6">
              <button 
                onClick={() => {
                  onClose();
                  const query = new URLSearchParams({
                    service: 'Website Development',
                    message: `Hi, I read your blog post "${post.title}" and would like to learn how to integrate these solutions into my project.`,
                  });
                  navigate(`/?${query.toString()}#contact`);
                }}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-sm shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Discuss with Our Team</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
