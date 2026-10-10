import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

const messages = [
  "Initializing Experience...",
  "Loading Creative Stack Agency...",
  "Building Digital Excellence...",
  "Preparing Your Experience...",
  "Almost Ready..."
];

export default function LoadingScreen() {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const isDark = theme === 'dark';
  const logoSrc = isDark ? "/logo-white.svg" : "/logo.png";

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 20);
    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, []);

  return (
    <motion.div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-colors duration-500 font-sans ${
        isDark ? 'bg-[#090d16] text-white' : 'bg-[#f8fafc] text-gray-900'
      }`}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Rotating Logo inside circular effect */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Outer glowing spinning ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          className={`w-28 h-28 rounded-full border-2 border-dashed ${
            isDark 
              ? 'border-cyan-400/80 border-t-transparent shadow-[0_0_25px_rgba(0,212,255,0.25)]' 
              : 'border-blue-600/80 border-t-transparent shadow-[0_0_25px_rgba(37,99,235,0.2)]'
          }`}
        />

        {/* Inner rotating logo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center p-3"
        >
          <img
            src={logoSrc}
            alt="Creative Stack Agency"
            className="w-16 h-16 object-contain"
          />
        </motion.div>
      </div>

      <h2 className={`text-2xl font-bold font-display ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Creative Stack Agency
      </h2>
      <p className={`mt-2 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {messages[messageIndex]}
      </p>
      <p className={`mt-2 font-bold text-sm tracking-wide ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
        Loading... {progress}%
      </p>
    </motion.div>
  );
}
