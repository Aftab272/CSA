import React from 'react';
import { motion } from 'motion/react';
import { useBlog } from '../context/BlogContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

interface BlogSectionProps {
  showViewAll?: boolean;
}

export default function BlogSection({ showViewAll = true }: BlogSectionProps) {
  const { posts, categories, isLoading } = useBlog();

  const published = posts.filter(p => p.status === 'published').slice(0, 3);

  const getCategoryName = (catId: string) => {
    return categories.find(c => c.id === catId)?.name || 'Engineering';
  };

  return (
    <section id="blog" className="px-6 py-16 md:px-8 md:py-24 bg-slate-50/50 dark:bg-primary text-gray-900 dark:text-white font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 sm:mb-16 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white text-center md:text-left">
              Insights &amp; Updates
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 text-center md:text-left">
              Latest engineering practices, architectural designs, and technology insights from our team.
            </p>
          </div>
          {showViewAll && (
            <Link to="/blog" className="relative overflow-hidden group/btn px-7 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 text-center flex items-center justify-center text-xs sm:text-sm shrink-0">
              <span className="relative z-10">View All Articles</span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
            </Link>
          )}
        </div>

        {/* Skeleton loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 space-y-4 animate-pulse">
                <div className="flex justify-between">
                  <div className="w-20 h-5 bg-slate-200 dark:bg-white/10 rounded-full" />
                  <div className="w-16 h-5 bg-slate-200 dark:bg-white/10 rounded-full" />
                </div>
                <div className="w-3/4 h-6 bg-slate-200 dark:bg-white/10 rounded-md" />
                <div className="w-full h-12 bg-slate-200 dark:bg-white/10 rounded-md" />
                <div className="pt-4 border-t border-gray-100 dark:border-white/5 w-1/3 h-4 bg-slate-200 dark:bg-white/10 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Published Articles from Backend */}
        {!isLoading && published.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {published.map((post, index) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.3 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl bg-white dark:bg-white/4 border border-gray-200 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Meta Header */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-blue-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/20">
                      {getCategoryName(post.categoryId)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1">
                      <Clock size={12} className="text-blue-500" />
                      {post.readTime} min read
                    </span>
                  </div>

                  {/* Article Title */}
                  <h3 className="text-lg sm:text-xl font-bold font-display text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  {/* Short Excerpt */}
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-white/5">
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-200" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
