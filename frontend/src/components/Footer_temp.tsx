import React, { useState, useEffect } from 'react';
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
    default: return <ExternalLink className={className} />;
  }
};

type LegalDocType = 'privacy' | 'terms' | 'cookie' | 'disclaimer' | 'refund' | null;

import AdminModal from './AdminModal';
import { useAdmin } from '../context/AdminContext';

export default function Footer() {
  const { footerData } = useAdmin();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

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
      {/* 1. Connect Across Networks Standalone Pre-Footer Section */}
      <section 
        className={`relative border-t w-full py-16 transition-all duration-500 overflow-hidden font-sans ${
          theme === 'dark' 
            ? 'bg-[#111827] text-white border-white/10' 
            : 'bg-[#f1f5f9] text-gray-800 border-gray-200'
        }`}
      >
        {/* Background Ambient Blur Blobs */}
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-primary/20 dark:bg-white/[0.02] p-8 md:p-12 rounded-3xl border border-white/10 shadow-xl backdrop-blur-md">
            <div className="text-center lg:text-left space-y-2">
              <h4 className="text-xl md:text-2xl font-bold font-display uppercase tracking-wider text-accent">
                Connect Across Networks
              </h4>
              <p className="text-xs md:text-sm text-gray-400">
                Official channels with live responses &amp; community updates. Follow us for trends and tech discussions!
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 relative">
              {socialPlatforms.map((platform) => {
                const isHovered = hoveredSocial === platform.name;
                return (
                  <div 
                    key={platform.name}
                    className="relative"
                    onMouseEnter={() => setHoveredSocial(platform.name)}
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
                            <span>{platform.name} ({platform.followers})</span>
                          </div>
                          {/* Triangle indicator */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-zinc-900 border-r border-b border-zinc-800 rotate-45" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Social Icon Link */}
                    <motion.a
                      href={platform.url === '#' ? `https://${platform.name.toLowerCase()}.com` : platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit Creative Stack Agency on ${platform.name}`}
                      whileHover={{ scale: 1.15, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3.5 rounded-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden group ${
                        theme === 'dark' 
                          ? 'bg-white/[0.03] border border-white/[0.08]' 
                          : 'bg-white border border-gray-200 shadow-sm'
                      }`}
                      style={{
                        boxShadow: isHovered 
                          ? theme === 'dark'
                            ? `0 0 20px rgba(0, 212, 255, 0.15)`
                            : `0 4px 15px rgba(0, 0, 0, 0.08)`
                          : 'none'
                      }}
                    >
                      <SocialIcon 
                        name={platform.iconName} 
                        className={`w-6 h-6 transition-all duration-300 ${
                          isHovered ? platform.color : 'text-gray-400 group-hover:scale-105'
                        }`} 
                      />
                    </motion.a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Footer Section */}
      <footer 
        role="contentinfo"
        className={`relative border-t w-full transition-all duration-500 overflow-hidden font-sans ${
          theme === 'dark' 
            ? 'bg-[#0B1120]/95 text-white border-white/10' 
            : 'bg-[#f8fafc] text-gray-800 border-gray-200'
        }`}
      >
        {/* 1. Premium Gradient Top Border */}
        <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-accent via-indigo-500 via-purple-500 to-accent animate-gradient-xy" />

        {/* Background Ambient Blur Blobs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 relative z-10">
          
          {/* 2. Responsive 6-Column Grid of Glassmorphic Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          
          {/* Column 1: Brand details with Theme Switcher */}
          <motion.div 
            whileHover={{ y: -4 }}
            className={`group p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between ${
              theme === 'dark' 
                ? 'bg-white/[0.02] backdrop-blur-md border border-white/[0.08] hover:border-accent/40 shadow-xl' 
                : 'bg-white/80 backdrop-blur-md border border-gray-200 hover:border-accent/50 shadow-md'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 bg-accent/25 rounded-2xl flex items-center justify-center font-bold text-accent text-lg shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                  CSA
                </div>
                <span className="font-bold text-sm uppercase tracking-wider text-accent font-display">
                  Creative Stack
                </span>
              </div>
              
              {/* Animated Divider */}
              <div className="h-[2px] w-12 bg-accent group-hover:w-full transition-all duration-500 rounded-full" />
              
              <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Creative Stack Agency delivers next-generation web &amp; mobile engineering, premium brand aesthetics, customized AI automations, and elite tech training globally.
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

          {/* Column 2: Quick Links */}
          <motion.div 
            whileHover={{ y: -4 }}
            className={`group p-6 rounded-3xl transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-white/[0.02] backdrop-blur-md border border-white/[0.08] hover:border-accent/40 shadow-xl' 
                : 'bg-white/80 backdrop-blur-md border border-gray-200 hover:border-accent/50 shadow-md'
            }`}
          >
            <h4 className="text-sm font-bold font-display uppercase tracking-widest text-accent">
              Quick Links
            </h4>
            <div className="h-[2px] w-8 bg-accent mt-2 group-hover:w-full transition-all duration-500 rounded-full" />
            
            <ul className="mt-4 space-y-2 text-xs">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '#about' },
                { name: 'Services', href: '#services' },
                { name: 'Projects', href: '#projects' },
                { name: 'Courses', href: '#courses' },
                { name: 'Blog', href: '#blog' },
                { name: 'Reviews', href: '#reviews' },
                { name: 'FAQ', href: '#faq' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className={`inline-block transition-all duration-300 hover:translate-x-1.5 hover:text-accent relative py-0.5 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div 
            whileHover={{ y: -4 }}
            className={`group p-6 rounded-3xl transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-white/[0.02] backdrop-blur-md border border-white/[0.08] hover:border-accent/40 shadow-xl' 
                : 'bg-white/80 backdrop-blur-md border border-gray-200 hover:border-accent/50 shadow-md'
            }`}
          >
            <h4 className="text-sm font-bold font-display uppercase tracking-widest text-accent">
              Services
            </h4>
            <div className="h-[2px] w-8 bg-accent mt-2 group-hover:w-full transition-all duration-500 rounded-full" />
            
            <ul className="mt-4 space-y-2 text-xs">
              {[
                { name: 'Web Development', href: '#services' },
                { name: 'E-Commerce Stores', href: '#services' },
                { name: 'Mobile Application', href: '#services' },
                { name: 'UI/UX Craftsmanship', href: '#services' },
                { name: 'Graphic Design', href: '#services' },
                { name: 'SEO Optimization', href: '#services' },
                { name: 'Digital Marketing', href: '#services' },
                { name: 'AI & Automation', href: '#services' },
                { name: 'Full Maintenance', href: '#services' },
              ].map((service) => (
                <li key={service.name}>
                  <a 
                    href={service.href} 
                    className={`inline-block transition-all duration-300 hover:translate-x-1.5 hover:text-accent py-0.5 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Courses */}
          <motion.div 
            whileHover={{ y: -4 }}
            className={`group p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between ${
              theme === 'dark' 
                ? 'bg-white/[0.02] backdrop-blur-md border border-white/[0.08] hover:border-accent/40 shadow-xl' 
                : 'bg-white/80 backdrop-blur-md border border-gray-200 hover:border-accent/50 shadow-md'
            }`}
          >
            <div>
              <h4 className="text-sm font-bold font-display uppercase tracking-widest text-accent">
                Courses
              </h4>
              <div className="h-[2px] w-8 bg-accent mt-2 group-hover:w-full transition-all duration-500 rounded-full" />
              
              <ul className="mt-4 space-y-2 text-xs">
                {[
                  { name: 'Full Stack Dev', href: '#courses' },
                  { name: 'MERN Stack', href: '#courses' },
                  { name: 'React.js Mastery', href: '#courses' },
                  { name: 'Next.js Pro', href: '#courses' },
                  { name: 'UI/UX Design', href: '#courses' },
                  { name: 'Graphic Academy', href: '#courses' },
                  { name: 'Marketing Pro', href: '#courses' },
                  { name: 'AI Engineering', href: '#courses' },
                ].map((course) => (
                  <li key={course.name}>
                    <a 
                      href={course.href} 
                      className={`inline-block transition-all duration-300 hover:translate-x-1.5 hover:text-accent py-0.5 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {course.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <a 
                href="#courses" 
                className="block text-center py-2 bg-accent text-primary font-bold text-xs rounded-xl hover:shadow-[0_4px_15px_rgba(0,212,255,0.3)] hover:scale-[1.03] active:scale-95 transition-all duration-300"
              >
                View All Courses
              </a>
            </div>
          </motion.div>

          {/* Column 5: Projects */}
          <motion.div 
            whileHover={{ y: -4 }}
            className={`group p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between ${
              theme === 'dark' 
                ? 'bg-white/[0.02] backdrop-blur-md border border-white/[0.08] hover:border-accent/40 shadow-xl' 
                : 'bg-white/80 backdrop-blur-md border border-gray-200 hover:border-accent/50 shadow-md'
            }`}
          >
            <div>
              <h4 className="text-sm font-bold font-display uppercase tracking-widest text-accent">
                Projects
              </h4>
              <div className="h-[2px] w-8 bg-accent mt-2 group-hover:w-full transition-all duration-500 rounded-full" />
              
              <ul className="mt-4 space-y-2 text-xs">
                {[
                  { name: 'Web Applications', href: '#projects' },
                  { name: 'Business Sites', href: '#projects' },
                  { name: 'E-Commerce Portals', href: '#projects' },
                  { name: 'Mobile Apps', href: '#projects' },
                  { name: 'Admin Dashboards', href: '#projects' },
                  { name: 'Branding Blueprints', href: '#projects' },
                  { name: 'AI Deployments', href: '#projects' },
                  { name: 'UI/UX Case Studies', href: '#projects' },
                ].map((project) => (
                  <li key={project.name}>
                    <a 
                      href={project.href} 
                      className={`inline-block transition-all duration-300 hover:translate-x-1.5 hover:text-accent py-0.5 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {project.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <a 
                href="#projects" 
                className="block text-center py-2 bg-accent text-primary font-bold text-xs rounded-xl hover:shadow-[0_4px_15px_rgba(0,212,255,0.3)] hover:scale-[1.03] active:scale-95 transition-all duration-300"
              >
                View Portfolio
              </a>
            </div>
          </motion.div>

          {/* Column 6: Clickable Contact Details */}
          <motion.div 
            whileHover={{ y: -4 }}
            className={`group p-6 rounded-3xl transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-white/[0.02] backdrop-blur-md border border-white/[0.08] hover:border-accent/40 shadow-xl' 
                : 'bg-white/80 backdrop-blur-md border border-gray-200 hover:border-accent/50 shadow-md'
            }`}
          >
            <h4 className="text-sm font-bold font-display uppercase tracking-widest text-accent">
              Contact Us
            </h4>
            <div className="h-[2px] w-8 bg-accent mt-2 group-hover:w-full transition-all duration-500 rounded-full" />
            
            <ul className="mt-4 space-y-3.5 text-xs">
              <li className="flex items-start gap-2 group/item">
                <MapPin className="shrink-0 text-accent group-hover/item:scale-110 transition mt-0.5" size={16} />
                <a 
                  href="https://maps.google.com/?q=123+Agency+Way+New+York+NY" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`hover:text-accent transition ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  123 Agency Way, New York, NY
                </a>
              </li>

              <li className="flex items-center gap-2 group/item">
                <Mail className="shrink-0 text-accent group-hover/item:scale-110 transition" size={16} />
                <a 
                  href="mailto:info@creativestack.agency" 
                  className={`hover:text-accent transition font-mono ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  info@creativestack.agency
                </a>
              </li>

              <li className="flex items-center gap-2 group/item">
                <Phone className="shrink-0 text-accent group-hover/item:scale-110 transition" size={16} />
                <a 
                  href="tel:+1234567890" 
                  className={`hover:text-accent transition font-mono ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  +1 (234) 567-890
                </a>
              </li>

              <li className="flex items-center gap-2 group/item">
                <MessageCircle className="shrink-0 text-accent group-hover/item:scale-110 transition" size={16} />
                <a 
                  href="https://wa.me/1234567890" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`hover:text-accent transition font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  WhatsApp Business
                </a>
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
        <div className="mt-12 pt-8 border-t border-gray-500/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-500">
          
          {/* Copyright description */}
          <div className="text-center md:text-left space-y-1">
            <p className="font-semibold text-gray-400 dark:text-gray-300 flex flex-wrap items-center gap-2 justify-center md:justify-start">
              <span>&copy; 2025–{new Date().getFullYear()} Creative Stack Agency. All Rights Reserved.</span>
              <button 
                onClick={() => setIsAdminModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-accent/10 text-accent hover:bg-accent/20 transition-colors font-medium border border-accent/20"
              >
                Admin Management
              </button>
            </p>
            <p className="text-[10px] opacity-75">
              Designed &amp; Developed with absolute precision by <span className="text-accent font-semibold">Creative Stack Agency</span>.
            </p>
          </div>

          {/* SEO-friendly internal legal links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-medium">
            {[
              { type: 'privacy', name: 'Privacy Policy' },
              { type: 'terms', name: 'Terms & Conditions' },
              { type: 'cookie', name: 'Cookie Policy' },
              { type: 'disclaimer', name: 'Disclaimer' },
              { type: 'refund', name: 'Refund Policy' },
            ].map((doc) => (
              <button
                key={doc.type}
                onClick={() => setActiveLegalDoc(doc.type as LegalDocType)}
                className="hover:text-accent transition duration-200 relative after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[1px] after:bg-accent after:transition-all hover:after:w-full"
              >
                {doc.name}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* 5. Interactive Legal Policy Modals - Ensures links are fully workable */}
      <AnimatePresence>
        {activeLegalDoc && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111827] border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] text-gray-100"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0B1120]/60 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-xl text-accent">
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
                  className="p-1.5 text-gray-400 hover:text-white rounded-xl hover:bg-white/5 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Document Content */}
              <div className="p-6 md:p-8 overflow-y-auto flex-grow space-y-6 text-sm leading-relaxed text-gray-300">
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
              <div className="p-4 border-t border-white/10 bg-[#0B1120]/60 flex justify-end shrink-0">
                <button
                  onClick={() => setActiveLegalDoc(null)}
                  className="px-6 py-2.5 bg-accent text-primary font-bold text-sm rounded-xl hover:opacity-90 transition"
                >
                  Close Document
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AdminModal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} />
    </footer>
    </>
  );
}
