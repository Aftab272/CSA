import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number }[]>([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    let bubbleId = 0;

    const moveMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);

      // Create a small bubble trail randomly
      if (Math.random() > 0.7) {
        setBubbles((prev) => [
          ...prev,
          { id: bubbleId++, x: e.clientX, y: e.clientY },
        ].slice(-8)); // Keep max 8 bubbles
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: smoothX,
          y: smoothY,
          backgroundColor: isHovering ? 'rgba(37, 99, 235, 0.4)' : 'transparent',
          scale: isHovering ? 1.8 : 1,
          boxShadow: isHovering ? '0 0 20px rgba(37, 99, 235, 0.8)' : '0 0 10px rgba(37, 99, 235, 0.4)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="absolute inset-0 m-auto w-1 h-1 bg-white rounded-full shadow-[0_0_5px_white]" />
      </motion.div>

      {/* Bubble Trail */}
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          initial={{ opacity: 0.8, scale: 0.5, x: b.x, y: b.y }}
          animate={{ opacity: 0, scale: 1.5, y: b.y - 40 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="hidden md:block fixed w-2 h-2 bg-accent rounded-full pointer-events-none z-[9998] blur-[1px]"
        />
      ))}
    </>
  );
}
