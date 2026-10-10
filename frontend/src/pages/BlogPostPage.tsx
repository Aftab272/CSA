import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { useAdmin } from '../context/AdminContext';
import { ArrowLeft, Clock, Calendar, Facebook, Twitter, Linkedin, Link as LinkIcon, MessageSquare } from 'lucide-react';
import AdContainer from '../components/AdContainer';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { posts, categories, authors, tags, comments, setComments } = useBlog();
  const { footerData } = useAdmin();
  
  const post = posts.find(p => p.slug === slug);
  const author = post ? authors.find(a => a.id === post.authorId) : null;
  const category = post ? categories.find(c => c.id === post.categoryId) : null;
  const postTags = post ? tags.filter(t => post.tags.includes(t.id)) : [];
  
  const postComments = comments.filter(c => c.postId === post?.id && c.status === 'approved');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [commentStatus, setCommentStatus] = useState('');

  // Update views
  useEffect(() => {
    if (post) {
      const viewKey = `viewed_${post.id}`;
      if (!sessionStorage.getItem(viewKey)) {
        sessionStorage.setItem(viewKey, 'true');
      }
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-primary text-gray-900 dark:text-white flex flex-col justify-between">
        <div className="bg-white/80 dark:bg-primary/90 pt-24 pb-4 px-4 border-b border-gray-200 dark:border-white/10"><Navbar /></div>
        <div className="grow flex items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 font-display">Article Not Found</h1>
            <p className="text-gray-500 mb-6 text-sm">The article you are looking for does not exist or has been removed.</p>
            <Link to="/blog" className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition">
              Return to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    const newComment = {
      id: `c_${Date.now()}`,
      postId: post.id,
      name,
      email,
      content,
      createdAt: new Date().toISOString(),
      status: 'pending' as const
    };
    setComments([...comments, newComment]);
    setCommentStatus('Your comment has been submitted and is awaiting moderation.');
    setName('');
    setEmail('');
    setContent('');
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    if (platform === 'copy') navigator.clipboard.writeText(url);
    if (platform === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?url=${url}&text=${post.title}`, '_blank');
    if (platform === 'linkedin') window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-primary text-gray-900 dark:text-white font-sans transition-colors duration-300 flex flex-col justify-between">
      <Helmet>
        <title>{post.seoTitle || post.title} - Creative Stack Agency</title>
        <meta name="description" content={post.seoDescription || post.excerpt} />
        <meta property="og:image" content={post.featuredImage} />
        <meta property="og:type" content="article" />
      </Helmet>
      
      <div>
        <div className="bg-white/80 dark:bg-primary/90 backdrop-blur-md pt-24 pb-4 px-4 border-b border-gray-200/80 dark:border-white/10 shadow-sm transition-colors duration-300">
          <Navbar />
        </div>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition mb-8"
          >
            <ArrowLeft size={16} /> Back to All Articles
          </Link>
          
          <div className="mb-8">
            <span className="bg-blue-500/10 text-blue-600 dark:text-cyan-400 font-bold uppercase tracking-wider px-3.5 py-1 rounded-full text-xs border border-blue-500/20">
              {category?.name || 'Article'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-gray-900 dark:text-white mt-4 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400 text-xs sm:text-sm border-b border-gray-200 dark:border-white/10 pb-6">
              {author && (
                <div className="flex items-center gap-3">
                  <img src={author.image || 'https://res.cloudinary.com/z6sk8xam/image/upload/v1791571654/fi3dmmdk8xed5zbkew3s.png'} alt={author.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20" />
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{author.name}</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{author.position}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-blue-500 dark:text-cyan-400" /> 
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-blue-500 dark:text-cyan-400" /> 
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>

          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="w-full h-auto max-h-[460px] object-cover rounded-3xl mb-10 shadow-lg border border-gray-200 dark:border-white/10" 
          />
          
          <AdContainer id="ad-post-top" label="Advertisement - Story Start" />

          <div 
            className="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 font-sans leading-relaxed pt-4" 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
          
          <AdContainer id="ad-post-bottom" label="Advertisement - Related Content" />
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {postTags.map(tag => (
                <span 
                  key={tag.id} 
                  className="bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 dark:border-white/10"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">Share Article:</span>
              <button onClick={() => handleShare('facebook')} className="p-2.5 bg-white dark:bg-white/5 hover:bg-[#1877F2] hover:text-white rounded-full transition text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10"><Facebook size={16} /></button>
              <button onClick={() => handleShare('twitter')} className="p-2.5 bg-white dark:bg-white/5 hover:bg-[#1DA1F2] hover:text-white rounded-full transition text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10"><Twitter size={16} /></button>
              <button onClick={() => handleShare('linkedin')} className="p-2.5 bg-white dark:bg-white/5 hover:bg-[#0A66C2] hover:text-white rounded-full transition text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10"><Linkedin size={16} /></button>
              <button onClick={() => handleShare('copy')} className="p-2.5 bg-white dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10"><LinkIcon size={16} /></button>
            </div>
          </div>
          
          {author && (
            <div className="mt-12 bg-white dark:bg-secondary/70 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6 border border-gray-200 dark:border-white/10 shadow-sm">
              <img src={author.image || 'https://res.cloudinary.com/z6sk8xam/image/upload/v1791571654/fi3dmmdk8xed5zbkew3s.png'} alt={author.name} className="w-20 h-20 rounded-full object-cover shadow-sm ring-2 ring-blue-500/20" />
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1.5">Written by {author.name}</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{author.bio}</p>
              </div>
            </div>
          )}
          
          {/* Related Articles */}
          <div className="mt-16 border-t border-gray-200 dark:border-white/10 pt-12">
            <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">Related Articles</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {posts.filter(p => p.id !== post.id && p.status === 'published' && p.categoryId === post.categoryId).slice(0, 3).map(related => (
                <div key={related.id} className="bg-white dark:bg-secondary/70 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-white/10">
                  <img src={related.featuredImage} alt={related.title} className="w-full h-36 object-cover group-hover:scale-105 transition duration-500" />
                  <div className="p-4">
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition">
                      <Link to={`/blog/${related.slug}`}>{related.title}</Link>
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{new Date(related.publishedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-16 border-t border-gray-200 dark:border-white/10 pt-12">
            <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <MessageSquare size={20} className="text-blue-500" /> Comments ({postComments.length})
            </h3>
            
            {postComments.map(comment => (
              <div key={comment.id} className="mb-4 bg-white dark:bg-secondary/60 p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-sm text-gray-900 dark:text-white">{comment.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{comment.content}</p>
              </div>
            ))}
            
            <div className="mt-10 p-6 sm:p-8 bg-white dark:bg-secondary/50 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Leave a Comment</h4>
              {commentStatus && (
                <div className="mb-4 p-3.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs">
                  {commentStatus}
                </div>
              )}
              <form onSubmit={handleComment} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    required 
                    type="text" 
                    placeholder="Your Name *" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-primary/50 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none text-xs sm:text-sm" 
                  />
                  <input 
                    required 
                    type="email" 
                    placeholder="Your Email *" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-primary/50 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none text-xs sm:text-sm" 
                  />
                </div>
                <textarea 
                  required 
                  rows={4} 
                  placeholder="Your Comment *" 
                  value={content} 
                  onChange={e => setContent(e.target.value)} 
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-primary/50 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none text-xs sm:text-sm"
                ></textarea>
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-7 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition"
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
