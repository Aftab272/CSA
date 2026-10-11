import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogSection from '../components/BlogSection';
import { useBlog } from '../context/BlogContext';
import { Link } from 'react-router-dom';
import { Search, Clock, ArrowRight, ChevronRight, AlertTriangle, RefreshCw, ServerOff } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useAdmin } from '../context/AdminContext';

const POSTS_PER_PAGE = 15;

export default function BlogHome() {
  const { posts, categories, authors, isLoading, fetchError, reloadBlogs } = useBlog();
  const { footerData } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsSectionRef = useRef<HTMLDivElement>(null);

  const publishedPosts = posts.filter(p => p.status === 'published');
  
  const featuredPost = publishedPosts.find(p => p.isFeatured) || publishedPosts[0];

  const filteredPosts = publishedPosts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? p.categoryId === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Reset page to 1 whenever search query or category filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (safeCurrentPage - 1) * POSTS_PER_PAGE;
  const endIndex = Math.min(startIndex + POSTS_PER_PAGE, filteredPosts.length);
  const displayedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === safeCurrentPage) return;
    setCurrentPage(page);
    if (postsSectionRef.current) {
      postsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const getAuthor = (id: string) => authors.find(a => a.id === id);
  const getCategory = (id: string) => categories.find(c => c.id === id);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-primary text-gray-900 dark:text-white font-sans transition-colors duration-300 flex flex-col justify-between">
      <Helmet>
        <title>Blog &amp; Tech Insights - Creative Stack Agency</title>
        <meta name="description" content="Read the latest in-depth articles on full stack web development, modern cloud architecture, UI/UX design, and digital business strategies from Creative Stack Agency." />
      </Helmet>
      
      <div>
        <div className="bg-white/80 dark:bg-primary/90 backdrop-blur-md pt-24 pb-4 px-4 border-b border-gray-200/80 dark:border-white/10 shadow-sm transition-colors duration-300">
          <Navbar />
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/20 inline-block mb-3">
              Agency Publication &amp; Guides
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-gray-900 dark:text-white leading-tight">
              The Stack Blog
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-3 leading-relaxed">
              Explore in-depth engineering breakdowns, architecture guides, UX strategies, and digital industry insights written by the Creative Stack Agency team.
            </p>
          </div>
          
          {/* Search & Categories Filter Bar */}
          <div className="mb-12 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full md:w-1/3">
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-secondary/70 border border-gray-200 dark:border-white/10 rounded-2xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm text-sm"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              <div className="w-full md:w-2/3 overflow-x-auto no-scrollbar">
                <div className="flex gap-2 sm:gap-2.5 pb-2">
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 sm:px-5 py-2.5 rounded-xl whitespace-nowrap text-xs sm:text-sm font-bold transition-all shadow-sm ${
                      selectedCategory === null 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/20 shadow-md' 
                        : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
                    }`}
                  >
                    All Articles {publishedPosts.length > 0 && `(${publishedPosts.length})`}
                  </button>
                  {categories.filter(c => !c.isHidden).map(cat => {
                    const count = publishedPosts.filter(p => p.categoryId === cat.id).length;
                    return (
                      <button 
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 sm:px-5 py-2.5 rounded-xl whitespace-nowrap text-xs sm:text-sm font-bold transition-all shadow-sm ${
                          selectedCategory === cat.id 
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/20 shadow-md' 
                            : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
                        }`}
                      >
                        {cat.name} {count > 0 && `(${count})`}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* BACKEND CONNECTION ERROR STATE (NO FAKE / DUMMY DATA FALLBACK) */}
          {!isLoading && fetchError && publishedPosts.length === 0 && (
            <div className="my-10 p-8 sm:p-12 rounded-3xl bg-rose-500/10 border-2 border-rose-500/30 text-center max-w-2xl mx-auto shadow-xl backdrop-blur-xl">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-4">
                <ServerOff size={32} />
              </div>
              <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-2">
                Cannot Fetch Blogs From Server
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
                Backend server is unreachable or offline. Per system security rules, default fake data is not displayed.
              </p>
              <div className="p-3.5 bg-black/10 dark:bg-black/30 rounded-xl text-xs font-mono text-gray-700 dark:text-gray-300 mb-6 inline-block border border-black/10 dark:border-white/10">
                To start backend: <code>cd backend &amp;&amp; npm run dev</code> (Port 3001)
              </div>
              <div>
                <button
                  onClick={() => reloadBlogs()}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg hover:shadow-blue-500/25 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw size={16} />
                  <span>Retry Connection</span>
                </button>
              </div>
            </div>
          )}

          {/* SKELETON LOADING STATE (WHILE FETCHING FROM BACKEND) */}
          {isLoading && (
            <div className="space-y-12">
              {/* Featured Skeleton */}
              <div className="bg-white dark:bg-secondary/40 rounded-3xl overflow-hidden grid md:grid-cols-2 gap-8 p-6 sm:p-8 border border-gray-200 dark:border-white/10 animate-pulse">
                <div className="w-full h-72 md:h-80 bg-slate-200 dark:bg-white/10 rounded-2xl" />
                <div className="flex flex-col justify-center space-y-4">
                  <div className="w-24 h-6 bg-slate-200 dark:bg-white/10 rounded-full" />
                  <div className="w-4/5 h-8 bg-slate-200 dark:bg-white/10 rounded-xl" />
                  <div className="w-full h-16 bg-slate-200 dark:bg-white/10 rounded-xl" />
                  <div className="w-40 h-10 bg-slate-200 dark:bg-white/10 rounded-xl mt-4" />
                </div>
              </div>

              {/* Grid Skeletons */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="bg-white dark:bg-secondary/40 border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden p-5 space-y-4 animate-pulse">
                    <div className="w-full h-52 bg-slate-200 dark:bg-white/10 rounded-2xl" />
                    <div className="w-1/3 h-5 bg-slate-200 dark:bg-white/10 rounded-md" />
                    <div className="w-4/5 h-6 bg-slate-200 dark:bg-white/10 rounded-md" />
                    <div className="w-full h-12 bg-slate-200 dark:bg-white/10 rounded-md" />
                    <div className="flex items-center gap-3 pt-3">
                      <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-white/10" />
                      <div className="w-1/2 h-4 bg-slate-200 dark:bg-white/10 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Featured Post Hero (Only show when not loading, on page 1 and not filtering/searching) */}
          {!isLoading && !searchQuery && !selectedCategory && safeCurrentPage === 1 && featuredPost && (
            <div className="mb-14 sm:mb-16 bg-white dark:bg-secondary/70 rounded-3xl overflow-hidden grid md:grid-cols-2 gap-8 shadow-xl dark:shadow-2xl items-center border border-gray-200 dark:border-white/10">
              <div className="h-full relative overflow-hidden group">
                <img 
                  loading="lazy"
                  src={featuredPost.featuredImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'} 
                  alt={featuredPost.title} 
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('photo-1460925895917-afdab827c52f')) {
                      target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';
                    }
                  }}
                  className="w-full h-72 md:h-full object-cover group-hover:scale-105 transition duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-500/10 text-blue-600 dark:text-cyan-400 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                    {getCategory(featuredPost.categoryId)?.name || 'Featured Story'}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    {featuredPost.readTime} min read
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-display leading-tight">
                  <Link to={`/blog/${featuredPost.slug}`} className="hover:text-blue-600 dark:hover:text-cyan-400 transition duration-300">
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 text-sm sm:text-base leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto gap-4 pt-4 border-t border-gray-100 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <img 
                      src={getAuthor(featuredPost.authorId)?.image || 'https://res.cloudinary.com/z6sk8xam/image/upload/v1791571654/fi3dmmdk8xed5zbkew3s.png'} 
                      alt={getAuthor(featuredPost.authorId)?.name || 'Author'} 
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/20 shadow-sm"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://res.cloudinary.com/z6sk8xam/image/upload/v1791571654/fi3dmmdk8xed5zbkew3s.png';
                      }}
                    />
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                        {getAuthor(featuredPost.authorId)?.name || 'M. Sami Ullah'}
                      </p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                        {getAuthor(featuredPost.authorId)?.position || 'Team Lead'} • {new Date(featuredPost.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <Link 
                    to={`/blog/${featuredPost.slug}`} 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition duration-300"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Section Header: Stories Count & Pagination Summary */}
          {!isLoading && filteredPosts.length > 0 && (
            <div ref={postsSectionRef} className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 border-b border-gray-200 dark:border-white/10 pb-5 gap-3">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-gray-900 dark:text-white">
                  {searchQuery ? 'Search Results' : selectedCategory ? `${getCategory(selectedCategory)?.name}` : 'All Articles'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Showing <span className="font-bold text-gray-800 dark:text-gray-200">{startIndex + 1}–{endIndex}</span> of <span className="font-bold text-gray-800 dark:text-gray-200">{filteredPosts.length}</span> articles (Page {safeCurrentPage} of {totalPages})
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-400 px-3 py-1.5 rounded-xl text-xs font-bold border border-blue-200 dark:border-blue-500/20">
                  15 Posts Per Page
                </span>
                <span className="bg-white dark:bg-white/5 px-3 py-1.5 rounded-xl text-gray-700 dark:text-gray-300 text-xs font-bold border border-gray-200 dark:border-white/10">
                  {filteredPosts.length} Total
                </span>
              </div>
            </div>
          )}

          {/* Posts Grid - 15 posts per page */}
          {!isLoading && displayedPosts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayedPosts.map(post => {
                const author = getAuthor(post.authorId);
                const category = getCategory(post.categoryId);
                
                return (
                  <article 
                    key={post.id} 
                    className="bg-white dark:bg-secondary/70 border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-2xl transition-all duration-300 group flex flex-col hover:-translate-y-1"
                  >
                    <Link to={`/blog/${post.slug}`} className="relative block overflow-hidden h-52 sm:h-56">
                      <img 
                        loading="lazy"
                        src={post.featuredImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'} 
                        alt={post.title} 
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('photo-1460925895917-afdab827c52f')) {
                            target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
                          }
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                      />
                      <div className="absolute top-3.5 left-3.5">
                        <span className="bg-white/95 dark:bg-primary/90 backdrop-blur-md text-blue-600 dark:text-cyan-400 px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider border border-gray-200 dark:border-white/10 shadow-sm">
                          {category?.name || 'Technology'}
                        </span>
                      </div>
                    </Link>

                    <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          <Clock size={12} className="text-blue-500 dark:text-cyan-400" />
                          <span>{post.readTime} min read</span>
                          <span className="mx-1">•</span>
                          <span>{new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>

                        <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white font-display line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition duration-300">
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h4>

                        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Real Author Section & Read Story CTA */}
                      <div className="pt-4 border-t border-gray-100 dark:border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <img 
                              src={author?.image || authors[0]?.image || 'https://res.cloudinary.com/z6sk8xam/image/upload/v1791571654/fi3dmmdk8xed5zbkew3s.png'} 
                              alt={author?.name || 'Author'} 
                              className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20 shadow-sm"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = 'https://res.cloudinary.com/z6sk8xam/image/upload/v1791571654/fi3dmmdk8xed5zbkew3s.png';
                              }}
                            />
                            <div className="leading-tight">
                              <p className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">
                                {author?.name || authors[0]?.name || 'M. Sami Ullah'}
                              </p>
                              <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-1">
                                {author?.position || authors[0]?.position || 'Full Stack Systems Architect'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <Link 
                          to={`/blog/${post.slug}`} 
                          className="w-full text-center py-2.5 px-4 bg-blue-50 dark:bg-white/5 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-blue-600 dark:text-cyan-400 hover:text-white dark:hover:text-white rounded-xl font-bold text-xs sm:text-sm border border-blue-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-1.5"
                        >
                          <span>Read Full Story</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {!isLoading && !fetchError && filteredPosts.length === 0 && (
            <div className="text-center py-24 bg-white dark:bg-secondary/20 rounded-3xl border border-dashed border-gray-300 dark:border-white/10 my-8">
              <Search size={44} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No matching articles found</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto">
                Try searching for a different keyword or choose another category from the filters above.
              </p>
            </div>
          )}

          {/* Interactive Working Pagination: 15 posts per page */}
          {!isLoading && totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-16 pt-8 border-t border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <button 
                  onClick={() => handlePageChange(safeCurrentPage - 1)}
                  disabled={safeCurrentPage === 1}
                  className={`px-4 py-2.5 flex items-center gap-1.5 border rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                    safeCurrentPage === 1 
                      ? 'opacity-40 cursor-not-allowed border-gray-200 dark:border-white/5 bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500'
                      : 'border-gray-200 dark:border-white/10 bg-white dark:bg-secondary text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-white hover:border-blue-500 cursor-pointer shadow-sm'
                  }`}
                  aria-label="Previous page"
                >
                  <ChevronRight size={16} className="rotate-180" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    const isActive = pageNum === safeCurrentPage;
                    return (
                      <button 
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-11 h-11 flex items-center justify-center rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold shadow-md shadow-blue-500/25 scale-105'
                            : 'bg-white dark:bg-secondary border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-blue-500 shadow-sm'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button 
                  onClick={() => handlePageChange(safeCurrentPage + 1)}
                  disabled={safeCurrentPage === totalPages}
                  className={`px-4 py-2.5 flex items-center gap-1.5 border rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                    safeCurrentPage === totalPages 
                      ? 'opacity-40 cursor-not-allowed border-gray-200 dark:border-white/5 bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500'
                      : 'border-gray-200 dark:border-white/10 bg-white dark:bg-secondary text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-white hover:border-blue-500 cursor-pointer shadow-sm'
                  }`}
                  aria-label="Next page"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Insights & Updates compact section */}
        <div className="border-t border-gray-200 dark:border-white/10">
          <BlogSection showViewAll={false} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
