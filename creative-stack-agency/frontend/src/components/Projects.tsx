import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects, Project } from '../data/projects';
import ProjectModal from './ProjectModal';
import { Search } from 'lucide-react';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(p => 
    (filter === 'All' || p.category === filter) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
  );

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  return (
    <section id="projects" className="px-8 py-24 bg-primary text-white font-sans">
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
      
      <h2 className="text-center text-4xl font-bold font-display text-white mb-12">Our Projects</h2>
      
      <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row gap-4 items-center justify-center">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full bg-secondary py-2 pl-10 pr-4 rounded-full border border-white/10"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-full text-sm font-bold transition ${filter === c ? 'bg-accent text-primary' : 'bg-secondary hover:bg-white/10'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={project.id} 
              className="group bg-secondary rounded-3xl overflow-hidden border border-white/10 shadow-xl hover:shadow-[0_0_30px_rgba(0,212,255,0.15)] transition"
            >
              <div className="relative overflow-hidden h-64">
                <img loading="eager" src={project.gallery[0]} alt={project.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <span className="text-accent text-xs font-bold uppercase tracking-wider">{project.category}</span>
                <h3 className="text-xl font-bold font-display text-white mt-2 mb-4">{project.title}</h3>
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-green-500/10 text-green-400 font-bold rounded-full hover:bg-green-500 hover:text-primary transition text-center"
                    >
                      Live Site
                    </a>
                  )}
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 py-3 bg-accent/10 text-accent font-bold rounded-full hover:bg-accent hover:text-primary transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
