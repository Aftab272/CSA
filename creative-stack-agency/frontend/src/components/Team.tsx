import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Linkedin } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import PortfolioModal from './PortfolioModal';
import type { TeamMemberContent } from '../types/content';
import { teamMembers as staticTeamMembers } from '../data/team';

interface MemberCardProps {
  member: TeamMemberContent;
  onSelect: (member: TeamMemberContent) => void;
  isLeadership?: boolean;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onSelect, isLeadership }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`group bg-white dark:bg-white/5 dark:backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border ${isLeadership ? 'border-blue-500/30 shadow-[0_0_30px_rgba(37,99,235,0.15)]' : 'border-gray-200 dark:border-white/10'} shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_40px_rgba(37,99,235,0.2)] hover:border-blue-500/30 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden h-full`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    {isLeadership && (
      <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm px-6 py-2 rounded-bl-3xl z-10 shadow-[0_0_15px_rgba(37,99,235,0.5)]">
        {member.position.toLowerCase().includes('co-founder') ? 'Co-Founder' : 'Founder'}
      </div>
    )}
    <div className="relative mb-6 group-hover:scale-105 transition-transform duration-500">
      <div className="absolute inset-0 bg-blue-500 rounded-full blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity hidden dark:block"></div>
      <img 
        loading="lazy" 
        src={member.image} 
        alt={member.name} 
        className={`${isLeadership ? 'w-36 h-36 sm:w-48 sm:h-48' : 'w-32 h-32 sm:w-36 sm:h-36'} rounded-full object-cover object-top group-hover:brightness-110 border-4 border-blue-500/30 group-hover:border-blue-500 relative z-10 shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all duration-300`} 
      />
    </div>
    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 dark:text-white tracking-wide group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-2">{member.name}</h3>
    <p className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-xs sm:text-sm mt-2 mb-6">{member.position}</p>
    
    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-6 font-light">
      <p><strong className="text-gray-900 dark:text-gray-300">Education:</strong> {member.education}</p>
      <p><strong className="text-gray-900 dark:text-gray-300">Skills:</strong> {member.skills.slice(0, 3).join(', ')}...</p>
    </div>

    <div className="flex gap-4 mt-auto mb-8 relative z-10">
      {member.social.email && <a href={`mailto:${member.social.email}`} className="p-3 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full hover:bg-blue-600/20 hover:border-blue-500 hover:text-blue-400 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.1)]"><Mail size={18} /></a>}
      {member.social.linkedin && <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full hover:bg-blue-600/20 hover:border-blue-500 hover:text-[#0A66C2] transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.1)]"><Linkedin size={18} /></a>}
      {member.social.github && <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full hover:bg-blue-600/20 hover:border-blue-500 hover:text-gray-900 dark:hover:text-white transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.1)]"><SiGithub size={18} /></a>}
    </div>
    
    <div className="flex w-full gap-3 mt-auto relative z-10">
      <button 
        onClick={() => onSelect(member)}
        className="flex-1 py-3.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-bold rounded-full hover:bg-gray-200 dark:hover:bg-white/10 dark:hover:border-white/20 transition-all duration-300 text-sm"
      >
        View Profile
      </button>
      {member.portfolio ? (
        <a 
          href={member.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden group/btn flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all duration-300 text-sm transform hover:-translate-y-0.5 text-center"
        >
          <span className="relative z-10">Portfolio</span>
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
        </a>
      ) : (
        <button 
          onClick={() => onSelect(member)}
          className="relative overflow-hidden group/btn flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all duration-300 text-sm transform hover:-translate-y-0.5 text-center"
        >
          <span className="relative z-10">Portfolio</span>
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
        </button>
      )}
    </div>
  </motion.div>
);

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMemberContent[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMemberContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiBase =
    (import.meta as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL?.trim() || '';
  const api = (path: string) => (apiBase ? `${apiBase.replace(/\/$/, '')}${path}` : path);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(api('/api/team'));
        const data = await response.json();
        if (data.success && data.members && data.members.length > 0) {
          setTeamMembers(data.members);
        } else {
          // Fallback to static data if API is empty
          setTeamMembers(staticTeamMembers as any);
        }
      } catch (error) {
        // Fallback to static data if API fails
        setTeamMembers(staticTeamMembers as any);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchTeam();
  }, []);

  const leadership = teamMembers.filter((member) =>
    member.position.toLowerCase().includes('founder')
  );
  const team = teamMembers.filter((member) => !member.position.toLowerCase().includes('founder'));

  return (
    <section id="team" className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 bg-primary dark:bg-secondary font-sans text-gray-900 dark:text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-full max-w-2xl h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen hidden dark:block"></div>

      <AnimatePresence>
        {selectedMember && (
          <PortfolioModal member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}
      </AnimatePresence>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-16 sm:mb-20 tracking-tight">Meet The Experts</h2>
        {isLoading && <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">Loading team...</p>}
        
        {/* Founders */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 max-w-4xl mx-auto mb-16 sm:mb-24 border-b border-white/10 pb-16">
          {leadership.map(member => (
            <MemberCard key={member._id || member.name} member={member} onSelect={setSelectedMember} isLeadership={true} />
          ))}
        </div>

        {/* Rest of the Team */}
        <div className="flex overflow-x-auto gap-8 sm:gap-10 pb-12 pt-4 snap-x snap-mandatory hide-scrollbar">
          {team.map(member => (
            <div key={member._id || member.name} className="w-[320px] sm:w-[360px] snap-center flex-shrink-0">
              <MemberCard member={member} onSelect={setSelectedMember} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
