import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, FileText, Globe, Linkedin, Facebook, Instagram } from 'lucide-react';
import { SiGithub, SiWhatsapp, SiTiktok } from '@icons-pack/react-simple-icons';
import type { TeamMemberContent } from '../types/content';

type PortfolioModalProps = {
  member: TeamMemberContent;
  onClose: () => void;
};

export default function PortfolioModal({ member, onClose }: PortfolioModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-110 flex items-center justify-center p-4 bg-primary/80 backdrop-blur-sm"
      onClick={onClose}
    >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-secondary border border-white/10 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto text-white"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="float-right text-gray-400 hover:text-white"><X /></button>
          
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            <img loading="lazy" src={member.image} alt={member.name} className="w-40 h-40 rounded-full border-4 border-accent object-cover" />
            <div>
              <h2 className="text-4xl font-bold font-display">{member.name}</h2>
              <p className="text-accent text-xl">{member.role}</p>
              <p className="text-gray-300 mt-2">{member.intro}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-display text-accent">Professional Details</h3>
              <p><strong>Education:</strong> {member.education}</p>
              <p><strong>Experience:</strong> {member.experience}</p>
              <p><strong>Projects:</strong> {member.projects}</p>
              <p><strong>Achievements:</strong> {member.achievements}</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-display text-accent">Skills & Certificates</h3>
              <div className="flex flex-wrap gap-2">
                {member.skills.map(s => <span key={s} className="bg-primary px-3 py-1 rounded-full text-sm">{s}</span>)}
              </div>
              <ul className="list-disc list-inside text-gray-400 text-sm">
                {member.certificates.map(c => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-white/10">
            {member.social.email && <a href={`mailto:${member.social.email}`} className="flex items-center gap-2 bg-primary px-4 py-2 rounded-full hover:text-accent"><Mail size={16} /> Email</a>}
            {member.social.linkedin && <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-primary px-4 py-2 rounded-full hover:text-[#0A66C2]"><Linkedin size={16} /> LinkedIn</a>}
            {member.social.github && <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-primary px-4 py-2 rounded-full hover:text-white"><SiGithub size={16} /> GitHub</a>}
            {member.social.website && <a href={member.social.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-primary px-4 py-2 rounded-full hover:text-accent"><Globe size={16} /> Website</a>}
            {member.social.whatsapp && <a href={member.social.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-primary px-4 py-2 rounded-full hover:text-[#25D366]"><SiWhatsapp size={16} /> WhatsApp</a>}
            {member.social.tiktok && <a href={member.social.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-primary px-4 py-2 rounded-full hover:text-white"><SiTiktok size={16} /> TikTok</a>}
            {member.social.facebook && <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-primary px-4 py-2 rounded-full hover:text-[#1877F2]"><Facebook size={16} /> Facebook</a>}
            {member.social.instagram && <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-primary px-4 py-2 rounded-full hover:text-[#E4405F]"><Instagram size={16} /> Instagram</a>}
            {member.resume && <a href={member.resume} className="flex items-center gap-2 bg-accent text-primary px-4 py-2 rounded-full font-bold hover:shadow-lg"><FileText size={16} /> Resume</a>}
          </div>
        </motion.div>
    </motion.div>
  );
}
