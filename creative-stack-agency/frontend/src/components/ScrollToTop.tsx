import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  });

  useEffect(() => {
    const toggleVisibility = () => {
      // Show when user scrolls more than 300px
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 md:bottom-8 md:left-8 w-14 h-14 rounded-full flex items-center justify-center bg-primary/80 dark:bg-zinc-900/80 backdrop-blur-md text-accent border border-white/10 shadow-2xl hover:shadow-[0_0_20px_rgba(0,212,255,0.45)] z-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent group"
          aria-label="Scroll Back to Top"
          title="Scroll to Top"
        >
          {/* Progress Ring */}
          <svg className="w-full h-full -rotate-90 absolute inset-0 p-1 pointer-events-none" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              className="stroke-gray-300/20 dark:stroke-white/10" 
              strokeWidth="5" 
              fill="none" 
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              className="stroke-accent"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              style={{ pathLength }}
            />
          </svg>

          {/* Floating Icon with Micro-Interaction */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
            className="relative z-10 text-accent group-hover:text-white transition-colors"
          >
            <ArrowUp size={20} className="stroke-[2.5px]" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
