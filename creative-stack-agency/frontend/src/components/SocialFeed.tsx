import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, MessageSquare, Linkedin } from 'lucide-react';
import { 
  SiFacebook, SiInstagram, SiGithub, SiYoutube, 
  SiWhatsapp, SiFiverr, SiUpwork, SiTelegram, SiTiktok 
} from '@icons-pack/react-simple-icons';
import { socialPlatforms } from '../data/social';

const IconWrapper = ({ name, className }: { name: string; className: string }) => {
  switch (name) {
    case 'facebook': return <SiFacebook className={className} />;
    case 'instagram': return <SiInstagram className={className} />;
    case 'linkedin': return <Linkedin className={className} />;
    case 'github': return <SiGithub className={className} />;
    case 'youtube': return <SiYoutube className={className} />;
    case 'whatsapp': return <SiWhatsapp className={className} />;
    case 'fiverr': return <SiFiverr className={className} />;
    case 'upwork': return <SiUpwork className={className} />;
    case 'telegram': return <SiTelegram className={className} />;
    case 'botim': return <MessageSquare className={className} />;
    case 'tiktok': return <SiTiktok className={className} />;
    default: return <ExternalLink className={className} />;
  }
};

export default function SocialFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % socialPlatforms.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const platform = socialPlatforms[currentIndex];

  return (
    <section id="social-feed" className="px-6 py-16 md:px-8 md:py-24 bg-primary text-white font-sans flex justify-center items-center">
      <div className="max-w-sm md:max-w-md lg:max-w-lg w-full">
        <h2 className="text-center text-3xl md:text-4xl font-bold font-display text-white mb-10 md:mb-16">Animated Social Feed</h2>
        <AnimatePresence mode="wait">
          <motion.div 
            key={platform.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="bg-secondary p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center text-center space-y-4 md:space-y-6"
          >
            <div className="relative">
              <IconWrapper name={platform.iconName} className={`w-16 h-16 md:w-24 md:h-24 ${platform.color}`} />
              <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-accent text-primary text-[10px] md:text-xs font-bold px-2 py-0.5 md:py-1 rounded-full">LIVE</div>
            </div>
            <h3 className="text-2xl md:text-4xl font-bold font-display">{platform.name}</h3>
            <p className="text-gray-400 text-base md:text-xl">{platform.followers}</p>
            <a href={platform.url} className="w-full py-3 md:py-4 bg-accent text-primary font-bold rounded-full hover:shadow-lg transition">
              Visit {platform.name}
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
