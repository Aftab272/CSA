import React, { useState } from 'react';
import { motion } from 'motion/react';
import { blogPosts, BlogPost } from '../data/blog';
import { Link } from 'react-router-dom';
import BlogModal from './BlogModal';

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="px-6 py-16 md:px-8 md:py-24 bg-primary text-white font-sans">
      {selectedPost && <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-center md:text-left">Insights & Updates</h2>
          <Link to="/blog" className="relative overflow-hidden group/btn px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 text-center flex items-center justify-center">
            <span className="relative z-10">View All Articles</span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary rounded-3xl border border-white/10 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow flex flex-col h-full"
            >
              <img loading="lazy" src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6 space-y-4 flex flex-col flex-grow justify-between">
                <div className="space-y-2">
                  <span className="text-accent text-xs font-bold uppercase">{post.category}</span>
                  <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">{post.excerpt}</p>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-white/5 mt-auto flex flex-col gap-3">
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="relative overflow-hidden group/btn w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 text-center flex items-center justify-center"
                  >
                    <span className="relative z-10">Read More</span>
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
