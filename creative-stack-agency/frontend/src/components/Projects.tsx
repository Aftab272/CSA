import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectModal from './ProjectModal';
import { Search } from 'lucide-react';
import type { ProjectContent } from '../types/content';
import { projects as staticProjects } from '../data/projects';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectContent | null>(null);
  const [projectsList, setProjectsList] = useState<ProjectContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiBase =
    (import.meta as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL?.trim() || '';
  const api = (path: string) => (apiBase ? `${apiBase.replace(/\/$/, '')}${path}` : path);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(api('/api/projects'));
        const data = await response.json();
        if (data.success && data.projects && data.projects.length > 0) {
          setProjectsList(data.projects);
        } else {
          setProjectsList(staticProjects as any);
        }
      } catch (error) {
        setProjectsList(staticProjects as any);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProjects();
  }, []);

  const filteredProjects = useMemo(
    () =>
      projectsList.filter(
        (p) =>
          (filter === 'All' || p.category === filter) &&
          (p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase()))
      ),
    [projectsList, filter, search]
  );

  const categories = ['All', ...Array.from(new Set(projectsList.map((p) => p.category)))];

  return (
    <section id="projects" className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 bg-primary font-sans text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen hidden dark:block"></div>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-16 sm:mb-20 tracking-tight">Featured Projects</h2>
        {isLoading && <p className="text-center text-sm text-gray-400 mb-8">Loading projects...</p>}
        
        <div className="max-w-4xl mx-auto mb-16 flex flex-col md:flex-row gap-6 items-center justify-center">
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <Search className="absolute left-4 top-3.5 text-blue-400 z-10" size={20} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="relative w-full bg-gray-100 dark:bg-white/5 backdrop-blur-md py-3 pl-12 pr-6 rounded-full border border-gray-300 dark:border-white/10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 transition-all shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(0,0,0,0.2)]"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            {categories.map(c => (
              <button 
                key={c} 
                onClick={() => setFilter(c)} 
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                  filter === c 
                    ? 'bg-blue-600/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4 }}
                key={project._id || project.title} 
                className="group bg-white dark:bg-white/5 dark:backdrop-blur-xl rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_40px_rgba(37,99,235,0.2)] hover:border-blue-500/30 transition-all duration-500 flex flex-col"
              >
                <div className="relative overflow-hidden h-64 sm:h-72">
                  <img
                    loading="eager"
                    src={project.gallery?.[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-80 hidden dark:block" />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-blue-600/80 dark:backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <h3 className="text-2xl font-bold font-display text-white mt-2 mb-6 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <div className="mt-auto flex flex-col sm:flex-row gap-3">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 py-3.5 bg-white/5 border border-white/10 text-gray-300 font-bold rounded-full hover:bg-white/10 hover:text-white transition-all text-center"
                      >
                        Live Site
                      </a>
                    )}
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="relative overflow-hidden group/btn flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all transform hover:-translate-y-0.5 text-center"
                    >
                      <span className="relative z-10">View Details</span>
                      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
