import React from 'react';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const images = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80"
];

export default function Hero() {
  const [text, setText] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const fullText = "We Build Digital Experiences That Drive Real Results";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(imageInterval);
  }, []);

  return (
    <section id="home" className="relative px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pb-20 lg:pb-24 flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-12 min-h-screen bg-transparent text-gray-900 dark:text-white font-sans overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-blue-600/20 rounded-full blur-[150px] mix-blend-screen hidden dark:block"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen hidden dark:block"
      />

      <div className="flex-1 space-y-8 relative z-10 w-full mt-12 md:mt-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-display leading-[1.1] min-h-[120px] sm:min-h-[160px] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-blue-700 to-gray-600 dark:from-white dark:via-blue-100 dark:to-gray-500">
          {text}<span className="animate-pulse text-blue-600 dark:text-blue-500">|</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-xl font-light leading-relaxed">
          We are a premium digital agency providing modern web solutions to help your business dominate online.
        </p>
        
        {/* Stats */}
        <div className="flex flex-wrap gap-8 sm:gap-12 py-4">
          <div className="relative p-6 bg-white dark:bg-white/5 dark:backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_30px_rgba(37,99,235,0.1)] hover:shadow-[0_4px_30px_rgba(37,99,235,0.1)] dark:hover:shadow-[0_0_40px_rgba(37,99,235,0.3)] transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent rounded-2xl"></div>
            <div className="relative z-10 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">50+</div>
            <div className="relative z-10 text-sm text-gray-600 dark:text-gray-400 uppercase tracking-widest mt-1">Projects</div>
          </div>
          <div className="relative p-6 bg-white dark:bg-white/5 dark:backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_30px_rgba(37,99,235,0.1)] hover:shadow-[0_4px_30px_rgba(37,99,235,0.1)] dark:hover:shadow-[0_0_40px_rgba(37,99,235,0.3)] transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent rounded-2xl"></div>
            <div className="relative z-10 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-400 dark:to-indigo-600">20+</div>
            <div className="relative z-10 text-sm text-gray-600 dark:text-gray-400 uppercase tracking-widest mt-1">Clients</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto pt-4">
          <a 
            href="/#contact" 
            className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] transition-all duration-300 text-center transform hover:-translate-y-1"
          >
            <span className="relative z-10">Start Your Project</span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </a>
          <a 
            href="/#projects" 
            className="relative overflow-hidden group bg-gray-200 dark:bg-white/5 backdrop-blur-md border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white px-8 py-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] transition-all duration-300 text-center transform hover:-translate-y-1"
          >
            View Portfolio
          </a>
        </div>
      </div>
      
      <div className="flex-1 w-full max-w-xl relative z-10 mt-12 md:mt-0">
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="relative rounded-[2rem] p-4 bg-white dark:bg-white/5 dark:backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-b before:from-blue-500/20 before:to-transparent before:p-[1px] before:-z-10"
        >
           <div className="w-full h-[400px] md:h-[500px] rounded-3xl shadow-2xl relative overflow-hidden bg-primary group">
             <AnimatePresence mode="wait">
               <motion.img
                 key={currentImage}
                 src={images[currentImage]}
                 initial={{ opacity: 0, scale: 1.1 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.05 }}
                 transition={{ duration: 1.2, ease: "easeInOut" }}
                 className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                 alt="Premium Digital Work"
               />
             </AnimatePresence>
             <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent pointer-events-none mix-blend-multiply opacity-80 hidden dark:block" />
           </div>
        </motion.div>
      </div>
    </section>
  );
}
