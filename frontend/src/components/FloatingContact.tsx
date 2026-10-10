import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Bot, Sparkles, MessageCircle } from 'lucide-react';
import { SiWhatsapp, SiFiverr } from '@icons-pack/react-simple-icons';
import BeemimChatModal from './BeemimChatModal';

export default function FloatingContact() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const contactButtons = [
    { 
      name: 'WhatsApp (Aftab)', 
      icon: (className: string) => <SiWhatsapp className={className} />, 
      color: 'bg-[#25D366]', 
      shadow: 'shadow-[#25D366]/40 hover:shadow-[#25D366]/60',
      glow: 'rgba(37, 211, 102, 0.4)',
      link: 'https://wa.me/923027434569',
      text: 'Chat with Aftab (Lead Dev)'
    },
    { 
      name: 'WhatsApp (Maryam)', 
      icon: (className: string) => <SiWhatsapp className={className} />, 
      color: 'bg-[#128C7E]', 
      shadow: 'shadow-[#128C7E]/40 hover:shadow-[#128C7E]/60',
      glow: 'rgba(18, 140, 126, 0.4)',
      link: 'https://wa.me/923047556084',
      text: 'Chat with Maryam (Co-Founder)'
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
    <>
      {/* Beemim AI Interactive Chat Assistant Modal */}
      <BeemimChatModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />

      {/* Floating Action Button Container */}
      <div className="fixed right-3.5 bottom-5 sm:right-6 sm:bottom-8 z-50 flex flex-col items-end gap-3 select-none">
        
        {/* Expanded Contact Buttons (Animates up when + is clicked) */}
        <AnimatePresence>
          {isContactOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-2.5 sm:gap-3 items-end mb-1"
            >
              {contactButtons.map((btn, index) => {
                const isHovered = hoveredButton === btn.name;
                return (
                  <motion.div
                    key={btn.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-2.5 relative group"
                    onMouseEnter={() => setHoveredButton(btn.name)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    {/* Sliding Label on Desktop */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, x: 10, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 10, scale: 0.95 }}
                          className="bg-gray-900/95 text-white font-sans text-xs font-semibold py-1.5 px-3.5 rounded-xl border border-white/20 shadow-2xl backdrop-blur-md whitespace-nowrap hidden sm:block"
                        >
                          {btn.text}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Button */}
                    <motion.button
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => {
                        window.open(btn.link, '_blank');
                        setIsContactOpen(false);
                      }}
                      className={`${btn.color} w-11 h-11 sm:w-12 sm:h-12 rounded-full text-white shadow-lg ${btn.shadow} flex items-center justify-center transition-all cursor-pointer relative overflow-hidden`}
                      title={btn.name}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/25 pointer-events-none" />
                      {btn.icon("w-5 h-5 sm:w-5.5 sm:h-5.5")}
                    </motion.button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Primary Action Row: [Beemim AI Button] + [+ Expand Contact Button] */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* 1. BEEMIM AI ASSISTANT BUTTON */}
          <div className="relative group">
            {/* Ambient Animated Glow Aura */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400 opacity-60 blur-md group-hover:opacity-100 animate-pulse transition-opacity duration-500 pointer-events-none" />
            
            {/* Tooltip on desktop */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900/95 text-cyan-300 text-xs font-bold py-1.5 px-3 rounded-xl border border-cyan-500/30 shadow-2xl backdrop-blur-md whitespace-nowrap hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              ✨ Chat with Beemim AI
            </div>

            <motion.button
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsAiOpen(true)}
              className="relative w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-gradient-to-tr from-blue-700 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-blue-500/40 flex items-center justify-center transition-all cursor-pointer overflow-hidden border border-white/25"
              aria-label="Open Beemim AI Assistant"
            >
              {/* Inner sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-white/30 pointer-events-none" />
              <div className="relative flex items-center justify-center">
                <Bot size={25} className="text-white drop-shadow-md" />
                <Sparkles size={13} className="absolute -top-1.5 -right-1.5 text-cyan-300 animate-pulse" />
              </div>
            </motion.button>
          </div>

          {/* 2. EXPANDABLE CONTACT BUTTON (+) */}
          <div className="relative group">
            {/* Ambient Pulse */}
            <div className={`absolute -inset-1 rounded-full ${isContactOpen ? 'bg-rose-500/40' : 'bg-emerald-500/40'} blur-md transition-all duration-300 pointer-events-none`} />

            {/* Tooltip on desktop */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900/95 text-white text-xs font-bold py-1.5 px-3 rounded-xl border border-white/20 shadow-2xl backdrop-blur-md whitespace-nowrap hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {isContactOpen ? 'Close' : 'Quick Contact (WhatsApp & Fiverr)'}
            </div>

            <motion.button
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsContactOpen((prev) => !prev)}
              className={`relative w-14 h-14 sm:w-15 sm:h-15 rounded-full text-white shadow-xl transition-all cursor-pointer flex items-center justify-center border border-white/25 overflow-hidden ${
                isContactOpen
                  ? 'bg-gradient-to-tr from-rose-600 to-pink-500 shadow-rose-500/40'
                  : 'bg-gradient-to-tr from-emerald-600 via-teal-600 to-green-500 shadow-emerald-500/40'
              }`}
              aria-label={isContactOpen ? 'Close contact menu' : 'Open contact menu'}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-white/30 pointer-events-none" />
              <motion.div
                animate={{ rotate: isContactOpen ? 135 : 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              >
                <Plus size={26} className="stroke-[2.5]" />
              </motion.div>
            </motion.button>
          </div>

        </div>

      </div>
    </>
  );
}
