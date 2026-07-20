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
    <section id="home" className="relative px-8 py-24 flex flex-col md:flex-row items-center justify-between gap-12 bg-primary text-white font-sans overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-3xl"
      />

      <div className="flex-1 space-y-6 relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold font-display leading-tight min-h-[160px]">
          {text}<span className="animate-pulse">|</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-lg">
          We are a creative digital agency providing modern web solutions to help your business grow online.
        </p>
        
        {/* Stats */}
        <div className="flex gap-8 py-4">
          <div>
            <div className="text-3xl font-bold text-accent">50+</div>
            <div className="text-sm text-gray-400">Projects</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent">20+</div>
            <div className="text-sm text-gray-400">Clients</div>
          </div>
        </div>

        <div className="flex gap-4">
          <a 
            href="/#contact" 
            className="bg-accent text-primary px-8 py-4 rounded-full font-bold hover:shadow-[0_0_15px_rgba(0,212,255,0.5)] transition text-center inline-block"
          >
            Hire Us
          </a>
          <a 
            href="/#projects" 
            className="border-2 border-accent text-accent px-8 py-4 rounded-full font-bold hover:bg-accent/10 transition text-center inline-block"
          >
            View Portfolio
          </a>
        </div>
      </div>
      
      <div className="flex-1 w-full max-w-xl relative z-10">
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="bg-secondary/50 backdrop-blur-sm rounded-3xl p-4 md:p-6 border border-white/10 shadow-xl"
        >
           <div className="w-full h-[300px] md:h-[400px] rounded-2xl shadow-2xl relative overflow-hidden border border-white/10 bg-primary">
             <AnimatePresence mode="wait">
               <motion.img
                 key={currentImage}
                 src={images[currentImage]}
                 initial={{ opacity: 0, scale: 1.05 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 transition={{ duration: 0.8, ease: "easeInOut" }}
                 className="absolute inset-0 w-full h-full object-cover"
                 alt="Digital Agency Work"
               />
             </AnimatePresence>
             {/* Gradient overlay to make it look premium */}
             <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent pointer-events-none" />
           </div>
        </motion.div>
      </div>
    </section>
  );
}
