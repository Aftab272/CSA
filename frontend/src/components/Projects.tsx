import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectModal from './ProjectModal';
import { Search, ExternalLink, ArrowRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ProjectContent } from '../types/content';
import { fetchPublicProjects } from '../lib/api';

interface ProjectsProps {
  limit?: number;
  showExploreLink?: boolean;
}

export default function Projects({ limit, showExploreLink }: ProjectsProps) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectContent | null>(null);
  const [projectsList, setProjectsList] = useState<ProjectContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await fetchPublicProjects();
        setProjectsList(data as ProjectContent[]);
      } catch (error) {
        setProjectsList([]);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsList.filter((p) => {
      const matchesFilter = filter === 'All' || p.category === filter;
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(search.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [projectsList, filter, search]);

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;
  const categories = ['All', ...Array.from(new Set(projectsList.map((p) => p.category).filter(Boolean)))];

  return (
    <section id="projects" className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-white dark:bg-primary font-sans text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none hidden dark:block"></div>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-3">
              <Layers size={14} />
              <span>Proven Track Record</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white">
              Featured Case Studies
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-2 max-w-xl">
              High-impact digital platforms, responsive applications, and custom enterprise tools engineered by our team.
            </p>
          </div>

          {showExploreLink && (
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group shrink-0"
            >
              <span>View Full Portfolio</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Filters and search: Only show if not limited or if on dedicated page */}
        {!limit && (
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-12">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-secondary/80 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 focus:border-blue-500 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none transition"
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center sm:justify-end w-full sm:w-auto">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                    filter === c
                      ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                      : 'bg-gray-100 dark:bg-secondary/60 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {displayedProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                key={project._id || project.id || project.title}
                className="group bg-white dark:bg-secondary/70 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-200/90 dark:border-white/10 hover:border-blue-500/40 shadow-[0_4px_25px_rgba(0,0,0,0.06)] dark:shadow-xl hover:shadow-[0_14px_35px_rgba(37,99,235,0.18)] transition-all flex flex-col h-full"
              >
                <div className="relative overflow-hidden h-52 sm:h-56 bg-gray-100 dark:bg-primary/40 shrink-0">
                  <img
                    loading="lazy"
                    src={project.gallery?.[0] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute top-3.5 left-3.5 flex gap-2">
                    <span className="px-3 py-1 bg-blue-600/95 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2 font-light">
                    {project.shortDescription || project.description || 'Custom engineered digital experience.'}
                  </p>

                  {project.techStack && Object.values(project.techStack).flat().length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {Object.values(project.techStack)
                        .flat()
                        .slice(0, 4)
                        .map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[11px] text-gray-700 dark:text-gray-300 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  )}

                  <div className="mt-auto pt-4 border-t border-gray-200 dark:border-white/10 flex items-center gap-3">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transform hover:-translate-y-0.5 flex items-center justify-center gap-1.5"
                      >
                        <span>Live Demo</span>
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transform hover:-translate-y-0.5"
                      >
                        Case Study
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="py-3 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/15 text-gray-800 dark:text-white font-semibold rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
                    >
                      Details
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
