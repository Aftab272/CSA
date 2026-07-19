import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Globe, Star } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { Project } from '../data/projects';

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-primary/90 backdrop-blur-md"
      onClick={onClose}
    >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-secondary border border-white/10 rounded-3xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto text-white"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="float-right text-gray-400 hover:text-white"><X /></button>
          
          <img loading="lazy" src={project.gallery[0]} alt={project.title} className="w-full h-64 object-cover rounded-2xl mb-8" />
          
          <h2 className="text-4xl font-bold font-display mb-2">{project.title}</h2>
          <p className="text-accent text-lg mb-6">{project.category} • {project.completionDate}</p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-display text-accent">Description</h3>
              <p className="text-gray-300">{project.description}</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-display text-accent">Tech Stack</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                {Object.entries(project.techStack).map(([key, value]) => (
                  <div key={key}>
                    <strong className="capitalize text-white">{key}:</strong> {value.join(', ')}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {project.clientReview && (
            <div className="bg-primary p-6 rounded-2xl border border-white/5 mb-8">
              <div className="flex text-accent mb-2">{[...Array(project.clientReview.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
              <p className="italic text-gray-300 mb-2">"{project.clientReview.text}"</p>
              <p className="text-sm font-bold">— {project.clientReview.name}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {project.githubUrl && <a href={project.githubUrl} className="flex items-center gap-2 bg-primary px-6 py-3 rounded-full hover:text-white"><SiGithub size={18} /> View Source</a>}
            {project.liveUrl && <a href={project.liveUrl} className="flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-full font-bold hover:shadow-lg"><Globe size={18} /> Live Demo</a>}
          </div>
        </motion.div>
    </motion.div>
  );
}
