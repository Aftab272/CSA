import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const messages = [
  "Initializing Experience...",
  "Loading Creative Stack Agency...",
  "Building Digital Excellence...",
  "Preparing Your Experience...",
  "Almost Ready..."
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full mb-8"
      />
      <h2 className="text-2xl font-bold font-display text-white">Creative Stack Agency</h2>
      <p className="text-gray-400 mt-2">{messages[messageIndex]}</p>
      <p className="text-accent mt-2 font-bold">Loading... {progress}%</p>
    </motion.div>
  );
}
