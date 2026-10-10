import React from 'react';
import { motion } from 'motion/react';
import { X, ExternalLink, Mail, Linkedin, Globe, Crown } from 'lucide-react';
import { SiGithub, SiWhatsapp } from '@icons-pack/react-simple-icons';
import type { TeamMemberContent } from '../types/content';

type PortfolioModalProps = {
  member: TeamMemberContent;
  onClose: () => void;
};

const getOptimizedTeamImage = (url?: string): string => {
  if (!url) return '';
  if (url.includes('res.cloudinary.com') && url.includes('/upload/') && !url.includes('c_fill') && !url.includes('c_crop')) {
    return url.replace('/upload/', '/upload/c_fill,ar_3:4,g_auto/');
  }
  return url;
};

export default function PortfolioModal({ member, onClose }: PortfolioModalProps) {
  const isLeader = Boolean(
    member.position?.toLowerCase().includes('lead') ||
    member.role?.toLowerCase().includes('lead') ||
    member.position?.toLowerCase().includes('founder') ||
    member.name?.toLowerCase().includes('sami')
  );

  const quoteText = member.testimonial || member.intro || 'Committed to engineering cutting-edge digital experiences, modern system architecture, and client excellence.';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-110 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 260 }}
        className="relative bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 max-w-4xl w-full max-h-[92vh] overflow-y-auto text-gray-900 dark:text-white shadow-[0_25px_80px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_90px_rgba(0,0,0,0.85)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Right Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/15 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer z-20 shadow-sm"
        >
          <X size={18} />
        </button>

        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

        <div className="relative z-10 flex flex-col md:flex-row gap-6 sm:gap-8 lg:gap-10 items-center md:items-start">
          {/* Left Column: Framed Portrait Image */}
          <div className="shrink-0 w-full max-w-[260px] sm:max-w-[280px] md:max-w-[310px]">
            <div className="relative p-1.5 rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-white/20 bg-gray-100/80 dark:bg-white/5 shadow-2xl overflow-hidden group">
              <img
                loading="lazy"
                src={getOptimizedTeamImage(member.image)}
                alt={member.name}
                className="w-full aspect-[3/4] object-cover object-top rounded-xl sm:rounded-2xl transform group-hover:scale-102 transition-transform duration-500"
              />
              {/* Subtle sheen highlight */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none rounded-xl sm:rounded-2xl" />
            </div>
          </div>

          {/* Right Column: Member Details, Crown, Role, Quote & Action Buttons */}
          <div className="flex-1 flex flex-col justify-between w-full pt-1">
            {/* Tag / Category */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
                {isLeader ? 'TEAM LEADER' : 'CORE TEAM MEMBER'}
              </span>
            </div>

            {/* Name + Crown */}
            <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
              {isLeader && (
                <span className="text-2xl sm:text-3xl select-none animate-pulse" title="Team Leader">
                  👑
                </span>
              )}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white">
                {member.name}
              </h2>
            </div>

            {/* Subtitle / Role */}
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium mb-5">
              {member.position || member.role}
            </p>

            {/* Bio / Quote in Quotation Marks */}
            <div className="relative my-2 p-4 sm:p-5 rounded-2xl bg-gray-50/80 dark:bg-white/5 border border-gray-200/80 dark:border-white/10">
              <p className="text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-200 italic font-normal">
                &ldquo;{quoteText}&rdquo;
              </p>
            </div>

            {/* Education & Skills summary if available */}
            {(member.education || (member.skills && member.skills.length > 0)) && (
              <div className="my-3 space-y-2 text-xs sm:text-sm">
                {member.education && (
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong className="text-gray-900 dark:text-white font-semibold">Education:</strong> {member.education}
                  </p>
                )}
                {member.skills && member.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {member.skills.slice(0, 6).map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-200/70 dark:bg-white/10 text-gray-800 dark:text-gray-300 border border-gray-300/60 dark:border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Bottom Action Buttons (Orange Portfolio + Dark GitHub) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-5 mt-auto border-t border-gray-200 dark:border-white/10">
              {/* 1. Portfolio Button (Orange Pill Button like Image 2) */}
              <a
                href={member.portfolio || '#'}
                target={member.portfolio && member.portfolio !== '#' ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-[#f95716] hover:bg-[#ea580c] font-bold text-sm sm:text-base transition-all duration-300 shadow-[0_4px_20px_rgba(249,87,22,0.35)] hover:shadow-[0_6px_25px_rgba(249,87,22,0.5)] transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 cursor-pointer"
                style={{ color: '#ffffff' }}
              >
                <span>Portfolio</span>
                <ExternalLink size={15} />
              </a>

              {/* 2. GitHub Button (Dark Gray Pill Button like Image 2) */}
              <a
                href={member.social?.github || 'https://github.com/Aftab272'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 font-semibold text-sm sm:text-base border border-zinc-700 transition-all duration-300 shadow-md transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 cursor-pointer"
                style={{ color: '#ffffff' }}
              >
                <SiGithub size={16} />
                <span>GitHub</span>
              </a>

              {/* LinkedIn / Email Quick Links */}
              {member.social?.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="p-3.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/15 border border-gray-200 dark:border-white/10 text-[#0A66C2] transition-all transform hover:-translate-y-0.5 shadow-sm"
                >
                  <Linkedin size={18} />
                </a>
              )}

              {member.social?.email && (
                <a
                  href={`mailto:${member.social.email}`}
                  aria-label="Send email"
                  className="p-3.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/15 border border-gray-200 dark:border-white/10 text-blue-600 dark:text-blue-400 transition-all transform hover:-translate-y-0.5 shadow-sm"
                >
                  <Mail size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
