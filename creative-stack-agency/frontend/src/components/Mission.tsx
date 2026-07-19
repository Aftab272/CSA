import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, TrendingUp, Lightbulb, BookOpen, Users } from 'lucide-react';
import { missionData } from '../data/mission';

const IconWrapper = ({ icon, className }: { icon: string; className: string }) => {
  switch (icon) {
    case 'target': return <Target className={className} />;
    case 'eye': return <Eye className={className} />;
    case 'trending-up': return <TrendingUp className={className} />;
    case 'lightbulb': return <Lightbulb className={className} />;
    case 'book-open': return <BookOpen className={className} />;
    case 'users': return <Users className={className} />;
    default: return <Target className={className} />;
  }
};

export default function Mission() {
  return (
    <section id="mission" className="px-6 py-16 md:px-8 md:py-24 bg-secondary text-white font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl md:text-5xl font-bold font-display text-white mb-12 md:mb-20">Our Mission & Future Vision</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {missionData.map((item, index) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-primary p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col items-start space-y-4"
            >
              <IconWrapper icon={item.icon} className="w-10 h-10 text-accent" />
              <h3 className="text-2xl font-bold font-display">{item.title}</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                {item.content.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-accent">•</span> {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
