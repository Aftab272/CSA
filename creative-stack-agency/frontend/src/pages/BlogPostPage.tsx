import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
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
        // We'd ideally dispatch to setPosts here but let's just keep it simple
      }
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-primary flex flex-col">
        <div className="bg-primary pt-24 pb-4 px-4"><Navbar /></div>
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <Link to="/blog" className="text-accent hover:underline">Return to Blog</Link>
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
    <div className="min-h-screen bg-primary">
      <Helmet>
        <title>{post.seoTitle || post.title} - Creative Stack Agency</title>
        <meta name="description" content={post.seoDescription || post.excerpt} />
        <meta property="og:image" content={post.featuredImage} />
        <meta property="og:type" content="article" />
      </Helmet>
      
      <div className="bg-primary pt-24 pb-4 px-4 shadow-md">
        <Navbar />
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-accent transition mb-8">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
        
        <div className="mb-8">
          <span className="bg-accent/10 text-accent font-bold uppercase tracking-wider px-3 py-1 rounded-full text-sm">
            {category?.name}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display text-white mt-4 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm border-b border-white/10 pb-8">
            {author && (
              <div className="flex items-center gap-3">
                <img src={author.image} alt={author.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-white">{author.name}</p>
                  <p className="text-xs">{author.position}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar size={16} /> {new Date(post.publishedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} /> {post.readTime} min read
            </div>
          </div>
        </div>

        <img src={post.featuredImage} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-3xl mb-12 shadow-xl" />
        
        <AdContainer id="ad-post-top" label="Advertisement - Story Start" />

        <div className="prose prose-lg prose-invert max-w-none text-gray-200 font-sans" dangerouslySetInnerHTML={{ __html: post.content }} />
        
        <AdContainer id="ad-post-bottom" label="Advertisement - Related Content" />
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {postTags.map(tag => (
              <span key={tag.id} className="bg-secondary text-gray-300 px-3 py-1 rounded-full text-sm border border-white/10">
                #{tag.name}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-white mr-2">Share:</span>
            <button onClick={() => handleShare('facebook')} className="p-2 bg-secondary hover:bg-[#1877F2] hover:text-white rounded-full transition text-gray-300"><Facebook size={18} /></button>
            <button onClick={() => handleShare('twitter')} className="p-2 bg-secondary hover:bg-[#1DA1F2] hover:text-white rounded-full transition text-gray-300"><Twitter size={18} /></button>
            <button onClick={() => handleShare('linkedin')} className="p-2 bg-secondary hover:bg-[#0A66C2] hover:text-white rounded-full transition text-gray-300"><Linkedin size={18} /></button>
            <button onClick={() => handleShare('copy')} className="p-2 bg-secondary hover:bg-white/10 rounded-full transition text-gray-300"><LinkIcon size={18} /></button>
          </div>
        </div>
        
        {author && (
          <div className="mt-12 bg-secondary p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6">
            <img src={author.image} alt={author.name} className="w-24 h-24 rounded-full object-cover shadow-md" />
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Written by {author.name}</h4>
              <p className="text-gray-300 mb-4">{author.bio}</p>
            </div>
          </div>
        )}
        
        
        {/* Related Articles */}
        <div className="mt-16 border-t border-white/10 pt-16">
          <h3 className="text-2xl font-bold font-display text-white mb-8">Related Articles</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.filter(p => p.id !== post.id && p.status === 'published' && p.categoryId === post.categoryId).slice(0, 3).map(related => (
              <div key={related.id} className="bg-secondary rounded-2xl overflow-hidden hover:shadow-md transition group">
                <img src={related.featuredImage} alt={related.title} className="w-full h-40 object-cover group-hover:scale-105 transition duration-500" />
                <div className="p-4">
                  <h4 className="font-bold text-white line-clamp-2 mb-2 group-hover:text-accent transition">
                    <Link to={`/blog/${related.slug}`}>{related.title}</Link>
                  </h4>
                  <p className="text-xs text-gray-500">{new Date(related.publishedAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="mt-16 border-t border-white/10 pt-16">
          <h3 className="text-2xl font-bold font-display text-white mb-8 flex items-center gap-2">
            <MessageSquare /> Comments ({postComments.length})
          </h3>
          
          {postComments.map(comment => (
            <div key={comment.id} className="mb-6 bg-secondary p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-white">{comment.name}</span>
                <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-200">{comment.content}</p>
            </div>
          ))}
          
          <div className="mt-12">
            <h4 className="text-xl font-bold text-white mb-6">Leave a Reply</h4>
            {commentStatus && (
              <div className="mb-6 p-4 bg-teal-50 text-teal-700 rounded-xl border border-teal-100">
                {commentStatus}
              </div>
            )}
            <form onSubmit={handleComment} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input required type="text" placeholder="Name *" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-2 focus:ring-accent outline-none" />
                <input required type="email" placeholder="Email *" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-2 focus:ring-accent outline-none" />
              </div>
              <textarea required rows={5} placeholder="Your Comment *" value={content} onChange={e => setContent(e.target.value)} className="w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-2 focus:ring-accent outline-none"></textarea>
              <button type="submit" className="bg-accent text-primary px-8 py-3 rounded-full font-bold hover:shadow-lg transition">
                Post Comment
              </button>
            </form>
          </div>
        </div>

      </main>

      {footerData.sections.newsletter && <Newsletter />}
      <Footer />
    </div>
  );
}
