import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SiWhatsapp, SiFiverr } from '@icons-pack/react-simple-icons';

export default function FloatingContact() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const contactButtons = [
    { 
      name: 'WhatsApp (Aftab)', 
      icon: (className: string) => <SiWhatsapp className={className} />, 
      color: 'bg-[#25D366]', 
      shadow: 'shadow-[#25D366]/40 hover:shadow-[#25D366]/60',
      glow: 'rgba(37, 211, 102, 0.4)',
      link: 'https://wa.me/923027434569',
      text: 'Chat on WhatsApp'
    },
    { 
      name: 'WhatsApp (Maryam)', 
      icon: (className: string) => <SiWhatsapp className={className} />, 
      color: 'bg-[#128C7E]', 
      shadow: 'shadow-[#128C7E]/40 hover:shadow-[#128C7E]/60',
      glow: 'rgba(18, 140, 126, 0.4)',
      link: 'https://wa.me/923047556084',
      text: 'Chat on WhatsApp'
    },
    { 
      name: 'Fiverr', 
      icon: (className: string) => <SiFiverr className={className} />, 
      color: 'bg-[#1DBF73]', 
      shadow: 'shadow-[#1DBF73]/40 hover:shadow-[#1DBF73]/60',
      glow: 'rgba(29, 191, 115, 0.4)',
      link: 'https://www.fiverr.com/users/aftab569/manage_gigs/do-custom-website-development-as-full-stack-web-developer-frontend-backend-dev/edit?wizard=5&tab=publish',
      text: 'Order on Fiverr'
    },
  ];

  return (
    <div className="fixed right-6 bottom-8 flex flex-col gap-4 z-50 items-end">
      {contactButtons.map((btn) => {
        const isHovered = hoveredButton === btn.name;
        return (
          <div 
            key={btn.name} 
            className="flex items-center gap-3 relative group"
            onMouseEnter={() => setHoveredButton(btn.name)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            {/* Sliding text label */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  className="bg-primary/95 text-white font-sans text-sm font-semibold py-2 px-4 rounded-xl border border-white/10 shadow-xl backdrop-blur-md whitespace-nowrap"
                >
                  {btn.text}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Glowing outer pulsing animation */}
            <div className="absolute inset-0 rounded-full animate-ping opacity-25 pointer-events-none" style={{ backgroundColor: btn.glow, animationDuration: '3s' }} />

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.open(btn.link, '_blank')}
              className={`${btn.color} w-14 h-14 md:w-16 md:h-16 rounded-full text-white shadow-xl ${btn.shadow} flex items-center justify-center transition-all duration-300 relative overflow-hidden`}
              title={btn.name}
            >
              {/* Inner subtle glare effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20 pointer-events-none" />
              {btn.icon("w-7 h-7 md:w-8 md:h-8")}
            </motion.button>
          </div>
        );
      })}
    </div>
  );
}
