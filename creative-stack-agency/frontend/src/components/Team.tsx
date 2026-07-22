import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Linkedin } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import PortfolioModal from './PortfolioModal';
import type { TeamMemberContent } from '../types/content';

interface MemberCardProps {
  member: TeamMemberContent;
  onSelect: (member: TeamMemberContent) => void;
  isLeadership?: boolean;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onSelect, isLeadership }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`bg-primary p-5 sm:p-8 rounded-3xl border ${isLeadership ? 'border-accent/50 shadow-[0_0_20px_rgba(0,212,255,0.15)]' : 'border-white/10'} shadow-xl hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition flex flex-col items-center text-center relative overflow-hidden`}
  >
    {isLeadership && (
      <div className="absolute top-0 right-0 bg-accent text-primary font-bold text-xs sm:text-sm px-4 sm:px-6 py-1.5 rounded-bl-2xl z-10 shadow-lg">
        {member.position.toLowerCase().includes('co-founder') ? 'Co-Founder' : 'Founder'}
      </div>
    )}
    <img 
      loading="lazy" 
      src={member.image} 
      alt={member.name} 
      className={`${isLeadership ? 'w-32 h-32 sm:w-44 sm:h-44' : 'w-28 h-28 sm:w-32 sm:h-32'} rounded-full object-cover object-top border-4 border-accent mb-6 shadow-lg`} 
    />
    <h3 className="text-xl sm:text-2xl font-bold font-display text-white">{member.name}</h3>
    <p className="text-accent font-bold mb-4">{member.position}</p>
    
    <div className="text-sm text-gray-400 space-y-2 mb-6">
      <p><strong>Education:</strong> {member.education}</p>
      <p><strong>Skills:</strong> {member.skills.slice(0, 3).join(', ')}...</p>
    </div>

    <div className="flex gap-4 mt-auto mb-6">
      {member.social.email && <a href={`mailto:${member.social.email}`} className="p-2 bg-secondary rounded-full hover:text-accent transition"><Mail size={18} /></a>}
      {member.social.linkedin && <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary rounded-full hover:text-[#0A66C2] transition"><Linkedin size={18} /></a>}
      {member.social.github && <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary rounded-full hover:text-white transition"><SiGithub size={18} /></a>}
    </div>
    
    <div className="flex w-full gap-2 mt-auto">
      <button 
        onClick={() => onSelect(member)}
        className="flex-1 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white hover:text-primary transition-all duration-300 text-sm"
      >
        View Profile
      </button>
      {member.portfolio ? (
        <a 
          href={member.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 text-center bg-accent/10 text-accent font-bold rounded-full hover:bg-accent hover:text-primary transition-all duration-300 text-sm"
        >
          Portfolio
        </a>
      ) : (
        <button 
          onClick={() => onSelect(member)}
          className="flex-1 py-3 bg-accent/10 text-accent font-bold rounded-full hover:bg-accent hover:text-primary transition-all duration-300 text-sm"
        >
          Portfolio
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
        if (data.success) {
          setTeamMembers(data.members || []);
        }
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
    <section id="team" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-secondary text-white font-sans">
      <AnimatePresence>
        {selectedMember && (
          <PortfolioModal member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}
      </AnimatePresence>
      
      <h2 className="text-center text-3xl sm:text-4xl font-bold font-display text-white mb-10 sm:mb-16">Meet Our Team</h2>
      {isLoading && <p className="text-center text-sm text-gray-400 mb-8">Loading team...</p>}
      
      {/* Founders */}
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-12 sm:mb-16 border-b border-white/10 pb-10 sm:pb-12">
        {leadership.map(member => (
          <MemberCard key={member._id || member.name} member={member} onSelect={setSelectedMember} isLeadership={true} />
        ))}
      </div>

      {/* Rest of the Team */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {team.map(member => (
          <MemberCard key={member._id || member.name} member={member} onSelect={setSelectedMember} />
        ))}
      </div>
    </section>
  );
}
