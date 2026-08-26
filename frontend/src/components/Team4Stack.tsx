import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, BookOpen } from 'lucide-react';
const landingPageImg = "https://res.cloudinary.com/z6sk8xam/image/upload/v1787728871/esxzpvvrcgsg2wzu4t6e.png";
const dashboardImg = "https://res.cloudinary.com/z6sk8xam/image/upload/v1787728859/ipu2pvslb0ogjqows63b.png";
const userProfileImg = "https://res.cloudinary.com/z6sk8xam/image/upload/v1787728902/vwt6iylhaqxmqhdpa3i2.png";
const teamWorkImg = "https://res.cloudinary.com/z6sk8xam/image/upload/v1787728892/evrupixae1yi90baxwi4.png";

export default function Team4Stack() {
  const screenshots = [
    { title: 'Landing Page', img: landingPageImg },
    { title: 'Dashboard', img: dashboardImg },
    { title: 'User Profile', img: userProfileImg },
    { title: 'Team Workspace', img: teamWorkImg },
  ];

  return (
    <section id="team4stack" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-primary text-white font-sans">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        <div className="text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white">Contract</h2>
          <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Building the Future of Team Collaboration & Digital Innovation. A centralized ecosystem for project management, learning, and growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <a href="https://www.team4stack.com" target="_blank" rel="noopener noreferrer" className="bg-accent text-primary px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition">
              <ExternalLink size={20} /> Visit Team4Stack
            </a>
            <a href="#" className="border-2 border-accent text-accent px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-accent/10 transition">
              <BookOpen size={20} /> View Documentation
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {screenshots.map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl overflow-hidden border border-white/10 shadow-xl"
            >
              <img loading="lazy" src={item.img} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4 bg-secondary text-center text-sm font-bold">{item.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
