import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import { useBlog } from '../context/BlogContext';
import { Link } from 'react-router-dom';
import { Search, Clock, User, ArrowRight, Tag, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useAdmin } from '../context/AdminContext';

export default function BlogHome() {
  const { posts, categories, authors } = useBlog();
  const { footerData } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const publishedPosts = posts.filter(p => p.status === 'published');
  
  const featuredPost = publishedPosts.find(p => p.isFeatured) || publishedPosts[0];
  const otherPosts = publishedPosts.filter(p => p.id !== featuredPost?.id);

  const filteredPosts = publishedPosts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? p.categoryId === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const getAuthor = (id: string) => authors.find(a => a.id === id);
  const getCategory = (id: string) => categories.find(c => c.id === id);

  return (
    <div className="min-h-screen bg-primary">
      <Helmet>
        <title>Blog - Creative Stack Agency</title>
        <meta name="description" content="Read the latest articles on web development, UI/UX design, and digital marketing from Creative Stack Agency." />
      </Helmet>
      
      <div className="bg-primary pt-24 pb-4 px-4 shadow-md">
        <Navbar />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-white mb-12 text-center">The Stack Blog</h1>
        
        {/* Horizontal Search and Categories Bar */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-1/3">
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-secondary border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition shadow-lg"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            </div>
            
            <div className="w-full md:w-2/3 overflow-x-auto no-scrollbar">
              <div className="flex gap-3 pb-2">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`px-6 py-4 rounded-2xl whitespace-nowrap transition font-bold shadow-lg ${selectedCategory === null ? 'bg-accent text-primary' : 'bg-secondary text-gray-300 hover:bg-white/5 border border-white/10'}`}
                >
                  All Articles
                </button>
                {categories.filter(c => !c.isHidden).map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-6 py-4 rounded-2xl whitespace-nowrap transition font-bold shadow-lg ${selectedCategory === cat.id ? 'bg-accent text-primary' : 'bg-secondary text-gray-300 hover:bg-white/5 border border-white/10'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Post Hero (Only show when not searching/filtering) */}
        {!searchQuery && !selectedCategory && featuredPost && (
          <div className="mb-16 bg-secondary rounded-3xl overflow-hidden grid md:grid-cols-2 gap-8 shadow-2xl items-center border border-white/5">
            <div className="h-full relative overflow-hidden group">
              <img src={featuredPost.featuredImage} alt={featuredPost.title} className="w-full h-80 md:h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-accent/20 text-accent px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-accent/30">{getCategory(featuredPost.categoryId)?.name}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">
                <Link to={`/blog/${featuredPost.slug}`} className="hover:text-accent transition duration-300">{featuredPost.title}</Link>
              </h2>
              <p className="text-gray-400 mb-8 line-clamp-3 text-lg leading-relaxed">{featuredPost.excerpt}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-4">
                  <img src={getAuthor(featuredPost.authorId)?.image} alt="Author" className="w-12 h-12 rounded-full object-cover ring-2 ring-accent/20" />
                  <div>
                    <p className="text-sm font-bold text-white">{getAuthor(featuredPost.authorId)?.name}</p>
                    <p className="text-xs text-gray-500 font-medium">{new Date(featuredPost.publishedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
                <Link to={`/blog/${featuredPost.slug}`} className="bg-accent text-primary px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition duration-300">
                  Read Article <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
          <h3 className="text-3xl font-bold font-display text-white">
            {searchQuery ? 'Search Results' : selectedCategory ? `${getCategory(selectedCategory)?.name}` : 'Latest Stories'}
          </h3>
          <span className="bg-secondary px-4 py-2 rounded-xl text-gray-400 text-sm font-bold border border-white/5">{filteredPosts.length} Articles</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-secondary/40 border border-white/5 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col hover:-translate-y-2">
              <div className="relative overflow-hidden h-64">
                <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary/80 backdrop-blur-md text-accent px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10">
                    {getCategory(post.categoryId)?.name}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                  <Clock size={12} className="text-accent" />
                  <span>{post.readTime} min read</span>
                  <span className="mx-1">•</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-4 font-display line-clamp-2 leading-snug group-hover:text-accent transition duration-300">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h4>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="w-full text-center py-4 bg-white/5 rounded-2xl text-white font-bold text-sm hover:bg-accent hover:text-primary transition duration-300 border border-white/5">
                  Read Full Story
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-32 bg-secondary/20 rounded-3xl border border-dashed border-white/10">
            <Search size={48} className="mx-auto text-gray-600 mb-6 opacity-20" />
            <h3 className="text-2xl font-bold text-white mb-2">No matches found</h3>
            <p className="text-gray-500 max-w-xs mx-auto">Try a different keyword or explore our categories above.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredPosts.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-24">
            <button className="w-14 h-14 flex items-center justify-center border border-white/10 rounded-2xl text-gray-400 hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300 shadow-lg group">
              <ChevronRight size={24} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button className="w-14 h-14 flex items-center justify-center bg-accent text-primary rounded-2xl font-black shadow-[0_0_20px_rgba(0,212,255,0.4)] transform hover:scale-105 transition-all">1</button>
            <button className="w-14 h-14 flex items-center justify-center bg-secondary border border-white/10 text-gray-400 rounded-2xl font-bold hover:bg-white/10 hover:text-white transition-all duration-300">2</button>
            <button className="w-14 h-14 flex items-center justify-center bg-secondary border border-white/10 text-gray-400 rounded-2xl font-bold hover:bg-white/10 hover:text-white transition-all duration-300">3</button>
            <button className="w-14 h-14 flex items-center justify-center border border-white/10 rounded-2xl text-gray-400 hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300 shadow-lg group">
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </main>

      {footerData.sections.newsletter && <Newsletter />}
      <Footer />
    </div>
  );
}
