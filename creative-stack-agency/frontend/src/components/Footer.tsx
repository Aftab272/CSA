import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, MapPin, Phone, Clock, MessageCircle, Linkedin,
  ExternalLink, MessageSquare, 
  Sun, Moon, Shield, Info, FileText, Scale, RotateCcw, X 
} from 'lucide-react';
import { 
  SiFacebook, SiInstagram, SiGithub, SiYoutube, 
  SiWhatsapp, SiFiverr, SiUpwork, SiTelegram, SiTiktok 
} from '@icons-pack/react-simple-icons';
import { motion, AnimatePresence } from 'motion/react';
import { socialPlatforms } from '../data/social';

// Icon mapping helper for Social Icons
const SocialIcon = ({ name, className }: { name: string; className: string }) => {
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
    case 'tiktok': return <SiTiktok className={className} />;
    default: return <ExternalLink className={className} />;
  }
};

const getSocialColor = (name: string) => {
  switch (name) {
    case 'facebook': return 'text-[#1877F2]';
    case 'instagram': return 'text-[#E4405F]';
    case 'linkedin': return 'text-[#0A66C2]';
    case 'github': return 'text-gray-900 dark:text-white';
    case 'youtube': return 'text-[#FF0000]';
    case 'whatsapp': return 'text-[#25D366]';
    case 'fiverr': return 'text-[#00b22d]';
    case 'upwork': return 'text-[#14a800]';
    case 'telegram': return 'text-[#0088cc]';
    case 'tiktok': return 'text-black dark:text-white';
    default: return 'text-blue-500';
  }
};

type LegalDocType = 'privacy' | 'terms' | 'cookie' | 'disclaimer' | 'refund' | null;

import { useAdmin } from '../context/AdminContext';
import AdContainer from './AdContainer';

export default function Footer() {
  const { footerData } = useAdmin();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const isInternalLink = (url: string) => url.startsWith('/') || url.startsWith('#');
  const normalizeInternalUrl = (url: string) => (url.startsWith('#') ? `/${url}` : url);

  // Synchronize initial theme preference
  useEffect(() => {
    const isLightStored = localStorage.getItem('csa_theme') === 'light';
    const initialTheme = isLightStored ? 'light' : 'dark';
    setTheme(initialTheme);
    
    // Apply appropriate class to HTML element
    if (initialTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('csa_theme', nextTheme);
    
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#0B1120';
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.style.backgroundColor = '#0B1120';
      document.body.style.color = '#ffffff';
    }
  };

  const getLegalTitle = (type: LegalDocType) => {
    switch (type) {
      case 'privacy': return 'Privacy Policy';
      case 'terms': return 'Terms & Conditions';
      case 'cookie': return 'Cookie Policy';
      case 'disclaimer': return 'Disclaimer Notice';
      case 'refund': return 'Refund Policy';
      default: return '';
    }
  };

  return (
    <>
      {footerData.sections.social && (<>
{/* 1. Connect Across Networks Standalone Pre-Footer Section */}
      <section 
        className={`relative border-t w-full py-16 transition-all duration-500 overflow-hidden font-sans ${
          theme === 'dark' 
            ? 'bg-primary text-white border-white/10' 
            : 'bg-[#f1f5f9] text-gray-800 border-gray-200'
        }`}
      >
        {/* Removed ambient blur blobs to reduce extra effects and brightness */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 bg-primary/5 dark:bg-white/5 p-5 sm:p-8 md:p-12 rounded-3xl border border-white/5 shadow-sm">
            <div className="text-center lg:text-left space-y-2">
              <h4 className="text-xl md:text-2xl font-bold font-display uppercase tracking-wider text-accent">
                Connect Across Networks
              </h4>
              <p className="text-xs md:text-sm text-gray-400">
                Official channels with live responses &amp; community updates. Follow us for trends and tech discussions!
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 relative">
              {footerData.socialLinks.map((platform) => {
                const isHovered = hoveredSocial === platform.platform;
                return (
                  <div 
                    key={platform.platform}
                    className="relative"
                    onMouseEnter={() => setHoveredSocial(platform.platform)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    {/* Tooltip */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: -45, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className="absolute left-1/2 -translate-x-1/2 px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[10px] text-white font-bold rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none"
                        >
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                            <span>{platform.platform} ({platform.followers})</span>
                          </div>
                          {/* Triangle indicator */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-zinc-900 border-r border-b border-zinc-800 rotate-45" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Social Icon Link */}
                    <motion.a
                      href={platform.url === '#' ? `https://${platform.platform.toLowerCase()}.com` : platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit Creative Stack Agency on ${platform.platform}`}
                      whileHover={{ scale: 1.15, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3.5 rounded-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden group ${
                        theme === 'dark' 
                          ? 'bg-white/5 border border-white/10 hover:bg-white/10' 
                          : 'bg-white border border-gray-200 shadow-sm hover:bg-gray-50'
                      }`}
                    >
                      <SocialIcon 
                        name={platform.iconName} 
                        className={`w-6 h-6 transition-all duration-300 ${getSocialColor(platform.iconName)} group-hover:scale-110`} 
                      />
                    </motion.a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      </>)}
{/* 2. Main Footer Section */}
      <footer 
        role="contentinfo"
        className={`relative border-t w-full transition-all duration-500 overflow-hidden font-sans ${
          theme === 'dark' 
            ? 'bg-primary text-white border-white/10' 
            : 'bg-[#f8fafc] text-gray-800 border-gray-200'
        }`}
      >
        {/* 1. Premium Gradient Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient-xy" />

        {/* Background Ambient Blur Blobs */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen hidden dark:block" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen hidden dark:block" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 relative z-10">
          
          {/* 2. Responsive 6-Column Grid of Glassmorphic Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-5 sm:gap-6">
          
          {/* Column 1: Brand details with Theme Switcher */}
          <motion.div 
            whileHover={{ y: -4 }}
            className={`group p-5 sm:p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between ${
              theme === 'dark' 
                ? 'bg-white/2 backdrop-blur-md border border-white/8 hover:border-accent/40 shadow-xl' 
                : 'bg-white/80 backdrop-blur-md border border-gray-200 hover:border-accent/50 shadow-md'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                {footerData.logoUrl ? (
                  <img loading="lazy" src={footerData.logoUrl} alt="Logo" className="w-12 h-12 rounded-xl object-contain" />
                ) : (
                  <>
                    <div className="w-12 h-12 bg-accent/25 rounded-2xl flex items-center justify-center font-bold text-accent text-lg shadow-[0_0_15px_rgba(0,212,255,0.2)]">CSA</div>
                    <span className="font-bold text-sm uppercase tracking-wider text-accent font-display">Creative Stack</span>
                  </>
                )}
              </div>
              
              {/* Animated Divider */}
              <div className="h-0.5 w-12 bg-accent group-hover:w-full transition-all duration-500 rounded-full" />
              
              <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {footerData.description}
              </p>
            </div>

            {/* Quick Dark/Light Theme Switcher Card */}
            <div className="mt-6 pt-4 border-t border-dashed border-gray-500/20">
              <span className={`text-[10px] uppercase font-bold tracking-wider block mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Theme Preferences
              </span>
              <button 
                onClick={handleToggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition ${
                  theme === 'dark' 
                    ? 'bg-white/5 hover:bg-white/10 text-accent' 
                    : 'bg-gray-100 hover:bg-gray-200 text-indigo-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                  <span className="text-xs font-semibold capitalize">{theme} Mode</span>
                </div>
                <span className="text-[10px] opacity-60">Change</span>
              </button>
            </div>
          </motion.div>

          {footerData.sections.quicklinks && (<>
{/* Column 2: Quick Links */}
          <motion.div 
            whileHover={{ y: -4 }}
            className={`group p-5 sm:p-6 rounded-3xl transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-white/2 backdrop-blur-md border border-white/8 hover:border-accent/40 shadow-xl' 
                : 'bg-white/80 backdrop-blur-md border border-gray-200 hover:border-accent/50 shadow-md'
            }`}
          >
            <h4 className="text-sm font-bold font-display uppercase tracking-widest text-accent">
              Quick Links
            </h4>
            <div className="h-0.5 w-8 bg-accent mt-2 group-hover:w-full transition-all duration-500 rounded-full" />
            
            <ul className="mt-4 space-y-2 text-xs">
              {footerData.quickLinks.map((link) => (
                <li key={link.id}>
                  {isInternalLink(link.url) ? (
                    <Link
                      to={normalizeInternalUrl(link.url)}
                      className={`inline-block transition-all duration-300 hover:translate-x-1.5 hover:text-accent relative py-0.5 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-block transition-all duration-300 hover:translate-x-1.5 hover:text-accent relative py-0.5 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          </>)}
{footerData.sections.services && (<>
{/* Column 3: Services */}
          <motion.div 
            whileHover={{ y: -4 }}
            className={`group p-5 sm:p-6 rounded-3xl transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-white/2 backdrop-blur-md border border-white/8 hover:border-accent/40 shadow-xl' 
                : 'bg-white/80 backdrop-blur-md border border-gray-200 hover:border-accent/50 shadow-md'
            }`}
          >
            <h4 className="text-sm font-bold font-display uppercase tracking-widest text-accent">
              Services
            </h4>
            <div className="h-0.5 w-8 bg-accent mt-2 group-hover:w-full transition-all duration-500 rounded-full" />
            
            <ul className="mt-4 space-y-2 text-xs">
              {footerData.services.map((service) => (
                <li key={service.id}>
                  {isInternalLink(service.url) ? (
                    <Link
                      to={normalizeInternalUrl(service.url)}
                      className={`inline-block transition-all duration-300 hover:translate-x-1.5 hover:text-accent py-0.5 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {service.label}
                    </Link>
                  ) : (
                    <a
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-block transition-all duration-300 hover:translate-x-1.5 hover:text-accent py-0.5 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {service.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          </>)}
{/* Column 4: Courses */}
          <motion.div 
            whileHover={{ y: -4 }}
            className={`group p-5 sm:p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between ${
              theme === 'dark' 
                ? 'bg-white/2 backdrop-blur-md border border-white/8 hover:border-accent/40 shadow-xl' 
                : 'bg-white/80 backdrop-blur-md border border-gray-200 hover:border-accent/50 shadow-md'
            }`}
          >
            <div>
              <h4 className="text-sm font-bold font-display uppercase tracking-widest text-accent">
                Courses
              </h4>
              <div className="h-0.5 w-8 bg-accent mt-2 group-hover:w-full transition-all duration-500 rounded-full" />
              
              <ul className="mt-4 space-y-2 text-xs">
                {footerData.courses.map((course) => (
                  <li key={course.id}>
                    {isInternalLink(course.url) ? (
                      <Link
                        to={normalizeInternalUrl(course.url)}
                        className={`inline-block transition-all duration-300 hover:translate-x-1.5 hover:text-accent py-0.5 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {course.label}
                      </Link>
                    ) : (
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-block transition-all duration-300 hover:translate-x-1.5 hover:text-accent py-0.5 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {course.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <a 
                href="/courses" 
                className="relative overflow-hidden group/btn block text-center py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] hover:scale-[1.03] active:scale-95 transition-all duration-300"
              >
                <span className="relative z-10">View All Courses</span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
              </a>
            </div>
          </motion.div>

          {/* Column 5: Projects */}
          <motion.div 
            whileHover={{ y: -4 }}
            className={`group p-5 sm:p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between ${
              theme === 'dark' 
                ? 'bg-white/2 backdrop-blur-md border border-white/8 hover:border-accent/40 shadow-xl' 
                : 'bg-white/80 backdrop-blur-md border border-gray-200 hover:border-accent/50 shadow-md'
            }`}
          >
            <div>
              <h4 className="text-sm font-bold font-display uppercase tracking-widest text-accent">
                Projects
              </h4>
              <div className="h-0.5 w-8 bg-accent mt-2 group-hover:w-full transition-all duration-500 rounded-full" />
              
              <ul className="mt-4 space-y-2 text-xs">
                {footerData.projects.map((project) => (
                  <li key={project.id}>
                    {isInternalLink(project.url) ? (
                      <Link
                        to={normalizeInternalUrl(project.url)}
                        className={`inline-block transition-all duration-300 hover:translate-x-1.5 hover:text-accent py-0.5 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {project.label}
                      </Link>
                    ) : (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-block transition-all duration-300 hover:translate-x-1.5 hover:text-accent py-0.5 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {project.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <a 
                href="/#projects" 
                className="relative overflow-hidden group/btn block text-center py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] hover:scale-[1.03] active:scale-95 transition-all duration-300"
              >
                <span className="relative z-10">View Portfolio</span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
              </a>
            </div>
          </motion.div>

          {/* Column 6: Clickable Contact Details */}
          <motion.div 
            whileHover={{ y: -4 }}
            className={`group p-5 sm:p-6 rounded-3xl transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-white/2 backdrop-blur-md border border-white/8 hover:border-accent/40 shadow-xl' 
                : 'bg-white/80 backdrop-blur-md border border-gray-200 hover:border-accent/50 shadow-md'
            }`}
          >
            <h4 className="text-sm font-bold font-display uppercase tracking-widest text-accent">
              Contact Us
            </h4>
            <div className="h-0.5 w-8 bg-accent mt-2 group-hover:w-full transition-all duration-500 rounded-full" />
            
            <ul className="mt-4 space-y-3.5 text-xs">
              <li className="flex items-start gap-2 group/item">
                <MapPin className="shrink-0 text-accent group-hover/item:scale-110 transition mt-0.5" size={16} />
                <a 
                  href="https://maps.google.com/?q=123+Agency+Way+New+York+NY" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`hover:text-accent transition wrap-break-word ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  123 Agency Way, New York, NY
                </a>
              </li>

              <li className="flex items-start gap-2 group/item">
                <Mail className="shrink-0 text-accent group-hover/item:scale-110 transition mt-1" size={16} />
                <div className="flex flex-col">
                  <a 
                    href="mailto:creativestackagency513@gmail.com" 
                    className={`hover:text-accent transition font-mono break-all ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    creativestackagency513@gmail.com
                  </a>
                  <a 
                    href="mailto:maryannawazdev7780@gmail.com" 
                    className={`hover:text-accent transition font-mono break-all mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    maryannawazdev7780@gmail.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2 group/item">
                <Phone className="shrink-0 text-accent group-hover/item:scale-110 transition mt-1" size={16} />
                <div className="flex flex-col">
                  <a 
                    href="tel:+923027434569" 
                    className={`hover:text-accent transition font-mono ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    +92 (302) 743-4569
                  </a>
                  <a 
                    href="tel:+923047556084" 
                    className={`hover:text-accent transition font-mono mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    +92 (304) 755-6084
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2 group/item">
                <MessageCircle className="shrink-0 text-accent group-hover/item:scale-110 transition mt-1" size={16} />
                <div className="flex flex-col">
                  <a 
                    href="https://wa.me/923027434569" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`hover:text-accent transition font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    WhatsApp (Aftab)
                  </a>
                  <a 
                    href="https://wa.me/923047556084" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`hover:text-accent transition font-medium mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    WhatsApp (Maryam)
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <Clock className="shrink-0 text-accent mt-0.5" size={16} />
                <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  <p className="font-semibold">Mon-Fri</p>
                  <p className="opacity-80">9:00am - 6:00pm</p>
                </div>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Social Platforms Row removed from here (now pre-footer section) */}

        {/* 4. Bottom sub-footer containing copyright notice & SEO internal Legal links */}
        <div className="mt-12 pt-8 border-t border-gray-500/10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 text-xs text-gray-500">
          
          {/* Copyright description */}
          <div className="text-center md:text-left space-y-1">
            <p className="font-semibold text-gray-400 dark:text-gray-300 flex flex-wrap items-center gap-2 justify-center md:justify-start">
              <span>&copy; 2025–{new Date().getFullYear()} Creative Stack Agency. All Rights Reserved.</span>
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-accent/10 text-accent hover:bg-accent/20 transition-colors font-medium border border-accent/20"
              >
                Admin Management
              </Link>
            </p>
            <p className="text-[10px] opacity-75">
              Designed &amp; Developed with absolute precision by <span className="text-accent font-semibold">Creative Stack Agency</span>.
            </p>
          </div>

          {/* SEO-friendly internal legal links */}
          <div className="flex flex-col items-center lg:items-end gap-8 w-full">
            <AdContainer id="ad-footer" className="bg-white/3 border-none w-full max-w-4xl" label="Sponsor Section" />
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-medium">
              {[
                { path: '/privacy-policy', name: 'Privacy Policy' },
                { path: '/terms-and-conditions', name: 'Terms & Conditions' },
                { path: '/disclaimer', name: 'Disclaimer' },
                { path: '/cookie-policy', name: 'Cookie Policy' },
                { path: '/refund-policy', name: 'Refund Policy' },
                { path: '/cancellation-policy', name: 'Cancellation Policy' },
                { path: '/copyright-policy', name: 'Copyright Policy' },
                { path: '/acceptable-use-policy', name: 'Acceptable Use Policy' },
              ].map((doc) => (
                <Link
                  key={doc.path}
                  to={doc.path}
                  className="hover:text-accent transition duration-200 relative after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-px after:bg-accent after:transition-all hover:after:w-full"
                >
                  {doc.name}
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 5. Interactive Legal Policy Modals - Ensures links are fully workable */}
      <AnimatePresence>
        {activeLegalDoc && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-60 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-secondary border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] text-gray-100"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
                    {activeLegalDoc === 'privacy' && <Shield size={20} />}
                    {activeLegalDoc === 'terms' && <Scale size={20} />}
                    {activeLegalDoc === 'cookie' && <Info size={20} />}
                    {activeLegalDoc === 'disclaimer' && <FileText size={20} />}
                    {activeLegalDoc === 'refund' && <RotateCcw size={20} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">
                      {getLegalTitle(activeLegalDoc)}
                    </h3>
                    <p className="text-xs text-gray-400">Creative Stack Agency Legal Documents • Latest Update: July 2026</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveLegalDoc(null)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Document Content */}
              <div className="p-6 md:p-8 overflow-y-auto grow space-y-6 text-sm leading-relaxed text-gray-300">
                {activeLegalDoc === 'privacy' && (
                  <>
                    <h4 className="text-white font-bold text-base">1. Introduction &amp; Consent</h4>
                    <p>At Creative Stack Agency, we prioritize the confidentiality and safety of our customers' and visitors' data. This Privacy Policy details how we accumulate, utilize, disclose, and secure your personal details when you interact with our website, subscribe to our newsletters, or sign up for our professional training cohorts.</p>
                    <h4 className="text-white font-bold text-base">2. Information We Collect</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>Personal Credentials:</strong> Your name, email address, contact number, and professional details upon subscribing or registering.</li>
                      <li><strong>Device Data:</strong> IP addresses, browser specifications, operating systems, and page navigation logs through cookies.</li>
                      <li><strong>Payment Information:</strong> Secure tokens used to authorize premium subscriptions and course registration fees (processed via certified gateways).</li>
                    </ul>
                    <h4 className="text-white font-bold text-base">3. How We Use Information</h4>
                    <p>We process collected data to supply services, respond to customized inquiries, deliver course curricula, optimize web performance, track digital campaigns, and emit essential newsletter alerts. We do not sell or lease user credentials to third-party brokers.</p>
                    <h4 className="text-white font-bold text-base mt-6">4. Data Retention and Security Measures</h4>
                    <p>Creative Stack Agency adheres to the highest industry standards for data protection and cybersecurity. We utilize enterprise-grade encryption algorithms, including AES-256 and SSL/TLS protocols, to ensure that all data transmitted between your browser and our servers remains secure and impenetrable by unauthorized entities. Our cloud infrastructure is built on highly resilient and redundant architecture, guaranteeing maximum uptime and reliability while safeguarding your information against potential breaches. We strictly comply with global data protection regulations, including the GDPR (General Data Protection Regulation) and CCPA (California Consumer Privacy Act). By implementing rigorous access controls, multi-factor authentication for administrative accounts, and continuous vulnerability scanning, we maintain a secure environment for all user data. Data is retained only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, after which it is securely deleted or anonymized. We also conduct regular privacy impact assessments and employee training to foster a culture of privacy awareness throughout our organization.</p>
                    <h4 className="text-white font-bold text-base mt-6">5. Your Privacy Rights</h4>
                    <p>Depending on your jurisdiction, you possess specific rights regarding your personal information. These rights may include the right to access the personal data we hold about you, the right to request the correction of inaccurate or incomplete data, and the right to request the deletion of your personal information. You also have the right to object to the processing of your data for direct marketing purposes and the right to data portability, allowing you to obtain a copy of your data in a structured, machine-readable format. To exercise any of these rights, please contact our Data Protection Officer at privacy@creativestackagency.com. We are committed to responding to all legitimate requests promptly and transparently, without any discrimination. Furthermore, you have the right to withdraw your consent at any time, where we rely on consent to process your personal data, although this will not affect the lawfulness of processing based on consent before its withdrawal.</p>

                  </>
                )}

                {activeLegalDoc === 'terms' && (
                  <>
                    <h4 className="text-white font-bold text-base">1. Acceptance of Terms</h4>
                    <p>By entering and browsing the Creative Stack Agency portal, you agree to comply with our Terms &amp; Conditions and intellectual property boundaries. If you do not accept these policies, you must restrict your browsing instantly.</p>
                    <h4 className="text-white font-bold text-base">2. Intellectual Property</h4>
                    <p>All design tokens, layout mockups, text blocks, code structures, logo assets, video courses, and graphic materials hosted under the CSA umbrella are proprietary creations of Creative Stack Agency. Unauthorized reproduction, modification, or redistribution is strictly prohibited.</p>
                    <h4 className="text-white font-bold text-base">3. Professional Training Policy</h4>
                    <p>Registered course students are provided single-user licenses to view curriculum resources. Class recordings, code bases, and training credentials cannot be shared with secondary parties. Creative Stack Agency reserves the right to terminate access for violating student conduct.</p>
                    <h4 className="text-white font-bold text-base mt-6">4. User Conduct and Responsibilities</h4>
                    <p>As a user of the Creative Stack Agency website and its associated services, you agree to engage with our platform in a lawful, respectful, and ethical manner. You are strictly prohibited from utilizing our website to distribute malicious software, engage in unauthorized data scraping, attempt unauthorized access to our secure servers, or participate in any activity that could disrupt or impair the functionality of our digital infrastructure. Furthermore, any attempt to reverse engineer our proprietary codebases, exploit security vulnerabilities, or conduct unauthorized penetration testing will result in immediate termination of access and potential legal action. We expect all users, including those participating in our training cohorts and community forums, to maintain professional decorum, refrain from harassment, and respect the diverse perspectives of our global community. Failure to adhere to these standards constitutes a material breach of these Terms and Conditions.</p>
                    <h4 className="text-white font-bold text-base mt-6">5. Limitation of Liability and Indemnification</h4>
                    <p>To the maximum extent permitted by applicable law, Creative Stack Agency, its affiliates, directors, employees, and agents shall not be held liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising out of or in connection with your use of our website, services, or educational materials. This includes, but is not limited to, damages for loss of profits, goodwill, data, or other intangible losses, resulting from system failures, unauthorized access to your transmissions, or reliance on information provided on our platform. You agree to indemnify, defend, and hold harmless Creative Stack Agency from any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) that such parties may incur as a result of or arising from your violation of these Terms, your misuse of our services, or your infringement of any intellectual property or privacy rights of a third party.</p>

                  </>
                )}

                {activeLegalDoc === 'cookie' && (
                  <>
                    <h4 className="text-white font-bold text-base">1. What Are Cookies?</h4>
                    <p>Cookies are minute text fragments stored on your local browser by servers. They help websites retrieve state preferences, remember subscription logs, and analyze traffic volumes.</p>
                    <h4 className="text-white font-bold text-base">2. How We Employ Cookies</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>Essential Cookies:</strong> Vital for user authentication, security, and accessing custom portals.</li>
                      <li><strong>Performance &amp; Analytics:</strong> Monitors bounce rates, visitor sessions, and module engagement via services such as Google Analytics.</li>
                      <li><strong>Preference Customizer:</strong> Remembers your light/dark mode selection so the site displays correctly upon return.</li>
                    </ul>
                    <h4 className="text-white font-bold text-base">3. Managing Settings</h4>
                    <p>You can choose to disable cookies through your personal browser's settings panels. However, please note that turning off cookies may limit some features of the Creative Stack Agency workspace.</p>
                    <h4 className="text-white font-bold text-base mt-6">4. Third-Party Cookies and Tracking Technologies</h4>
                    <p>In addition to our proprietary cookies, Creative Stack Agency integrates selectively with trusted third-party partners to enhance the functionality and analytical capabilities of our website. These partners, which may include analytics providers, advertising networks, and social media platforms, may set their own cookies on your device when you interact with our content. For instance, we utilize Google Analytics to gather anonymized data regarding website traffic patterns, user engagement metrics, and conversion rates. This data empowers us to optimize our user interface, refine our content strategy, and deliver a more personalized browsing experience. Please note that these third-party cookies are governed by the respective privacy policies of the providing organizations. We recommend reviewing the privacy and cookie policies of these external partners to fully understand how your data is processed and utilized across different digital ecosystems.</p>
                    <h4 className="text-white font-bold text-base mt-6">5. Detailed Control Over Your Cookie Preferences</h4>
                    <p>We respect your right to privacy and offer robust mechanisms for controlling your cookie preferences. Upon your initial visit to our website, you are presented with a cookie consent banner that allows you to accept all cookies, reject non-essential cookies, or customize your preferences based on specific cookie categories (e.g., functional, analytical, marketing). You can revisit and modify these preferences at any time by accessing the 'Cookie Settings' link located in our website footer. Additionally, most modern web browsers provide built-in controls that allow you to block or delete cookies entirely. However, we advise caution when employing these global browser settings, as indiscriminately blocking all cookies may impede the functionality of our website and restrict access to specific features, such as personalized dashboards and secure user portals. For comprehensive guidance on managing cookies across various browsers, please consult the official support documentation provided by your browser's developer.</p>

                  </>
                )}

                {activeLegalDoc === 'disclaimer' && (
                  <>
                    <h4 className="text-white font-bold text-base">1. No Financial or Professional Guarantee</h4>
                    <p>All informational assets, articles, blogs, tools, and technical courses supplied by Creative Stack Agency are meant for educational and demonstrational purposes only. We make no specific promises of financial gain, job employment, or revenue increases.</p>
                    <h4 className="text-white font-bold text-base">2. Accuracy &amp; Liability</h4>
                    <p>While we strive to keep technical codes, marketing methodologies, and tutorial scripts accurate, technology is continuously evolving. We assume no legal responsibility for technical errors, database failures, or digital losses resulting from implementing agency codes or templates.</p>
                  </>
                )}

                {activeLegalDoc === 'refund' && (
                  <>
                    <h4 className="text-white font-bold text-base">1. Professional Development Services</h4>
                    <p>Due to the customized nature of custom software engineering, website development, branding blueprints, and UI/UX case studies, initial design deposits are non-refundable once engineering phases commence.</p>
                    <h4 className="text-white font-bold text-base">2. Course Tuition Refunds</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>Cancellation before Cohort Starts:</strong> Full tuition refund up to 7 days prior to course launch.</li>
                      <li><strong>Mid-course withdrawals:</strong> Refundable on a pro-rata basis if requested within the first 48 hours of instruction. No refunds thereafter.</li>
                    </ul>
                    <p>Please send all clear refund inquiries with verified receipts to <a href="mailto:info@creativestack.agency" className="text-accent underline font-mono">info@creativestack.agency</a>.</p>
                  </>
                )}
              </div>

              {/* Close Button Footer */}
              <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end shrink-0">
                <button
                  onClick={() => setActiveLegalDoc(null)}
                  className="relative overflow-hidden group/btn px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm rounded-xl hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all transform hover:-translate-y-0.5"
                >
                  <span className="relative z-10">Close Document</span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
    </>
  );
}
