import React from 'react';
import { motion } from 'motion/react';
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

export default function SocialMedia() {
  return (
    <section id="social-media" className="px-8 py-24 bg-secondary text-white font-sans">
      <h2 className="text-center text-4xl font-bold font-display text-white mb-16">Connect With Us</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {socialPlatforms.map((platform) => {
          const isHighlight = platform.name === 'WhatsApp' || platform.name === 'Fiverr';
          return (
            <motion.div 
              key={platform.name}
              whileHover={{ y: -10 }}
              className={`p-6 rounded-3xl border transition flex flex-col items-center text-center space-y-4 relative ${
                isHighlight 
                  ? 'bg-primary border-accent/40 shadow-[0_0_20px_rgba(0,212,255,0.15)] md:scale-105 z-10' 
                  : 'bg-primary border-white/10 shadow-xl'
              }`}
            >
              {isHighlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  Direct Response
                </div>
              )}
              <div className="relative">
                <IconWrapper name={platform.iconName} className={`${isHighlight ? 'w-16 h-16' : 'w-12 h-12'} ${platform.color} transition-all duration-300`} />
                <div className="absolute -top-2 -right-2 bg-accent text-primary text-[10px] font-bold px-1 rounded-full">LIVE</div>
              </div>
              <h3 className="text-xl font-bold font-display">{platform.name}</h3>
              <p className="text-gray-400 text-sm flex-grow">{platform.followers}</p>
              <a 
                href={platform.url} 
                className="relative overflow-hidden group/btn w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 text-center flex items-center justify-center"
              >
                <span className="relative z-10">Visit {platform.name}</span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
              </a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
