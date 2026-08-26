import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User } from 'lucide-react';
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/95 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="bg-secondary border border-white/10 rounded-3xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto text-white shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 bg-primary/80 text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all duration-300"
          >
            <X size={20} />
          </button>
          
          <img loading="lazy" src={post.image} alt={post.title} className="w-full h-64 md:h-80 object-cover rounded-2xl mb-6 shadow-md" />
          
          <div className="space-y-4">
            <span className="bg-accent/20 text-accent text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
              {post.category}
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight">{post.title}</h2>
            
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 border-y border-white/10 py-3">
              <span className="flex items-center gap-1"><Calendar size={14} className="text-accent" /> July 16, 2026</span>
              <span className="flex items-center gap-1"><Clock size={14} className="text-accent" /> {post.readTime}</span>
              <span className="flex items-center gap-1"><User size={14} className="text-accent" /> Creative Stack Team</span>
            </div>
            
            <div className="text-gray-300 leading-relaxed space-y-4 text-base pt-2">
              <p className="font-semibold text-white text-lg border-l-4 border-accent pl-4 italic">
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
                className="w-full py-4 bg-accent text-primary font-bold rounded-xl hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition"
              >
                Discuss with Our Team
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
