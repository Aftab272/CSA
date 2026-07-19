import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { teamMembers } from '../data/team';

export default function TeamSection() {
  return (
    <section id="team" className="px-6 py-16 md:px-8 md:py-24 bg-secondary text-white font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl md:text-5xl font-bold font-display text-white mb-12 md:mb-20">Meet Our Team</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-primary p-6 rounded-3xl border border-white/10 shadow-xl flex flex-col items-center text-center space-y-4 hover:shadow-2xl transition-shadow"
            >
              <img loading="lazy" src={member.image} alt={member.name} className="w-32 h-32 rounded-full mb-4 border-4 border-accent" />
              <h3 className="text-xl font-bold font-display">{member.name}</h3>
              <p className="text-accent text-sm font-bold">{member.position}</p>
              <p className="text-gray-400 text-xs">Experience: {member.experience}</p>
              <div className="flex text-accent">
                {[...Array(member.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 text-sm italic">"{member.testimonial}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
