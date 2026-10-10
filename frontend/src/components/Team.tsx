import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import PortfolioModal from './PortfolioModal';
import type { TeamMemberContent } from '../types/content';
import { fetchPublicTeam } from '../lib/api';

interface MemberCardProps {
  member: TeamMemberContent;
  onSelect: (member: TeamMemberContent) => void;
}

// Helper to determine leadership weight so Team Leads & Founders are sorted to the top
const getLeaderWeight = (m: TeamMemberContent): number => {
  const name = (m.name || '').toLowerCase();
  const pos = (m.position || '').toLowerCase();
  const role = (m.role || '').toLowerCase();

  // Primary Team Lead / Client Manager
  if (name.includes('sami') || pos.includes('team lead') || role.includes('team lead')) return 10;
  // Founders
  if (name.includes('aftab') || pos.includes('founder') || role.includes('founder')) return 9;
  if (name.includes('maryam') || pos.includes('co-founder') || role.includes('co-founder')) return 8;
  // Other Leads
  if (pos.includes('lead') || role.includes('lead') || pos.includes('head') || role.includes('head')) return 7;
  return 0;
};

const getLeaderBadgeLabel = (m: TeamMemberContent): string => {
  const pos = (m.position || '').toLowerCase();
  const role = (m.role || '').toLowerCase();

  if (pos.includes('co-founder') || role.includes('co-founder')) return 'Co-Founder';
  if (pos.includes('founder') || role.includes('founder')) return 'Founder';
  if (pos.includes('team lead') || role.includes('team lead')) return 'Team Lead';
  if (pos.includes('lead') || role.includes('lead')) return 'Team Lead';
  return 'Team Lead';
};

const getOptimizedTeamImage = (url?: string): string => {
  if (!url) return '';
  if (url.includes('res.cloudinary.com') && url.includes('/upload/') && !url.includes('c_fill') && !url.includes('c_crop')) {
    return url.replace('/upload/', '/upload/c_fill,ar_3:4,g_auto/');
  }
  return url;
};

const MemberCard: React.FC<MemberCardProps> = ({ member, onSelect }) => {
  const leaderWeight = getLeaderWeight(member);
  const isLeader = leaderWeight > 0;
  const customBadge = member.badge || member.social?.badge;
  const badgeLabel = customBadge || getLeaderBadgeLabel(member);
  const showBadge = Boolean(customBadge || isLeader);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={() => onSelect(member)}
      className="team-card group relative rounded-3xl overflow-hidden cursor-pointer aspect-[3/4] w-full border border-gray-200 dark:border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:border-blue-500/60 dark:hover:border-blue-500/60 hover:shadow-[0_20px_50px_rgba(37,99,235,0.3)] transition-all duration-500 bg-slate-900"
    >
      {/* 1. Full-Bleed Member Photo */}
      <img
        loading="lazy"
        src={getOptimizedTeamImage(member.image)}
        alt={member.name}
        className="absolute inset-0 w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
      />

      {/* Floating Card Badge on Photo (e.g. Co-Founder, Founder, Team Lead) */}
      {showBadge && (
        <div className="absolute top-3.5 left-3.5 z-20 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-amber-400/50 text-amber-300 text-xs font-bold flex items-center gap-1.5 shadow-[0_4px_14px_rgba(0,0,0,0.6)]">
          <span className="select-none">👑</span>
          <span className="tracking-wide uppercase text-[10px] sm:text-[11px]">{badgeLabel}</span>
        </div>
      )}

      {/* 2. Soft Bottom-Only Gradient (Leaves top 65%+ completely clean, bright & natural; only gently darkens bottom 36% for crystal-clear name readability) */}
      <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

      {/* 3. Subtle ambient hover glow */}
      <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* 5. Bottom Overlay Info (100% Crisp White text with text-shadow in both Light & Dark mode) */}
      <div className="team-overlay absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 flex flex-col justify-end text-white pointer-events-none">
        {/* Crown & Name Header */}
        <div className="flex items-center gap-2 mb-1">
          {showBadge && (
            <span className="text-xl sm:text-2xl select-none" title={badgeLabel}>
              👑
            </span>
          )}
          <h3
            className="team-card-name text-lg sm:text-xl font-bold font-display tracking-tight transition-colors drop-shadow-md"
            style={{ color: '#ffffff' }}
          >
            {member.name}
          </h3>
        </div>

        {/* Subtitle / Role Line */}
        <p
          className="team-card-role text-xs sm:text-sm font-normal leading-snug line-clamp-2"
          style={{ color: 'rgba(255, 255, 255, 0.92)' }}
        >
          {member.position || member.role}
        </p>
      </div>
    </motion.div>
  );
};

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMemberContent[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMemberContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await fetchPublicTeam();
        setTeamMembers(data as TeamMemberContent[]);
      } catch (error) {
        console.error('Team fetch failed:', error);
        setTeamMembers([]);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchTeam();
  }, []);

  // Sort Team Members by admin defined order (1, 2, 3...) then leadership weight
  const sortedTeam = useMemo(() => {
    return [...teamMembers].sort((a, b) => {
      const orderA = a.order !== undefined ? Number(a.order) : (a.social?.order !== undefined ? Number(a.social.order) : 999);
      const orderB = b.order !== undefined ? Number(b.order) : (b.social?.order !== undefined ? Number(b.social.order) : 999);
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return getLeaderWeight(b) - getLeaderWeight(a);
    });
  }, [teamMembers]);

  return (
    <section id="team" className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 bg-slate-50/60 dark:bg-primary font-sans text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none hidden dark:block" />

      {/* Selected Member Modal (Image 2 style) */}
      <AnimatePresence>
        {selectedMember && (
          <PortfolioModal member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-4 shadow-sm">
            <Sparkles size={14} />
            <span>The Minds Behind Creative Stack Agency</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white">
            Meet The Experts
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto leading-relaxed">
            Architects, full-stack engineers, and digital specialists engineering scalable software and intelligent client solutions.
          </p>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500" />
          </div>
        )}

        {/* Team Members Responsive Gallery Grid with Leads at the Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-center">
          {sortedTeam.map((member) => (
            <MemberCard
              key={member._id || member.id || member.name}
              member={member}
              onSelect={setSelectedMember}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
