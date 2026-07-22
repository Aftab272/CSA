import React, { useState } from 'react';
import { useBlog, BlogPost, Category, Author, Tag, Comment } from '../context/BlogContext';
import { Plus, Edit2, Trash2, Eye, MessageSquare, Check, X } from 'lucide-react';

export default function BlogAdminPanel() {
  const { posts, categories, authors, comments, setPosts, setCategories, setAuthors, setComments } = useBlog();
  const [activeSubTab, setActiveSubTab] = useState<'articles' | 'categories' | 'authors' | 'comments'>('articles');

  // Simple state for forms (a full CMS would have complex forms, we do simple versions)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const handleCreatePost = () => {
    const newPost: BlogPost = {
      id: `p_${Date.now()}`,
      title: 'New Article Title',
      slug: `new-article-${Date.now()}`,
      content: '<p>Start writing your article here...</p>',
      excerpt: 'A brief summary of your article.',
      featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      authorId: authors[0]?.id || '',
      categoryId: categories[0]?.id || '',
      tags: [],
      status: 'draft',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readTime: 5,
      isFeatured: false,
      views: 0
    };
    setPosts([newPost, ...posts]);
    setEditingPost(newPost);
  };

  const handleUpdatePost = (updated: BlogPost) => {
    setPosts(posts.map(p => p.id === updated.id ? updated : p));
    setEditingPost(null);
  };

  const handleDeletePost = (id: string) => {
    if(confirm('Delete this article?')) setPosts(posts.filter(p => p.id !== id));
  };

  const handleCommentStatus = (id: string, status: 'approved' | 'spam' | 'pending') => {
    setComments(comments.map(c => c.id === id ? { ...c, status } : c));
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b border-white/15 pb-2 overflow-x-auto">
        <button onClick={() => {setActiveSubTab('articles'); setEditingPost(null);}} className={`pb-2 whitespace-nowrap ${activeSubTab === 'articles' ? 'border-b-2 border-accent text-accent font-bold' : 'text-slate-300 hover:text-white'}`}>Articles</button>
        <button onClick={() => {setActiveSubTab('categories'); setEditingPost(null);}} className={`pb-2 whitespace-nowrap ${activeSubTab === 'categories' ? 'border-b-2 border-accent text-accent font-bold' : 'text-slate-300 hover:text-white'}`}>Categories</button>
        <button onClick={() => {setActiveSubTab('authors'); setEditingPost(null);}} className={`pb-2 whitespace-nowrap ${activeSubTab === 'authors' ? 'border-b-2 border-accent text-accent font-bold' : 'text-slate-300 hover:text-white'}`}>Authors</button>
        <button onClick={() => {setActiveSubTab('comments'); setEditingPost(null);}} className={`pb-2 whitespace-nowrap ${activeSubTab === 'comments' ? 'border-b-2 border-accent text-accent font-bold' : 'text-slate-300 hover:text-white'}`}>Comments</button>
      </div>

      {activeSubTab === 'articles' && !editingPost && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-white">Manage Articles</h4>
            
        <button onClick={() => {
          const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${window.location.origin}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${window.location.origin}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  ${posts.filter(p => p.status === 'published').map(p => `
  <url>
    <loc>${window.location.origin}/blog/${p.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  `).join('')}
</urlset>`;
          const blob = new Blob([sitemap], { type: 'text/xml' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'sitemap.xml';
          a.click();
        }} className="flex items-center gap-2 bg-white/10 text-slate-100 px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/20">
          Download Sitemap
        </button>

            <button onClick={handleCreatePost} className="flex items-center gap-2 bg-accent text-primary px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90">
              <Plus size={16} /> New Article
            </button>
          </div>
          <div className="border border-white/15 rounded-xl overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-white/5 text-slate-300">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-100">
                {posts.map(post => (
                  <tr key={post.id}>
                    <td className="px-4 py-3 font-medium line-clamp-1">{post.title}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{new Date(post.publishedAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingPost(post)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit2 size={16} /></button>
                        <button onClick={() => handleDeletePost(post.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'articles' && editingPost && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-white">Edit Article</h4>
            <button onClick={() => setEditingPost(null)} className="text-slate-300 hover:text-white">Cancel</button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-200">Title (H1)</label>
              <input type="text" value={editingPost.title} onChange={e => setEditingPost({...editingPost, title: e.target.value})} className="w-full px-3 py-2 bg-primary border border-white/20 rounded-lg text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-200">Slug</label>
              <input type="text" value={editingPost.slug} onChange={e => setEditingPost({...editingPost, slug: e.target.value})} className="w-full px-3 py-2 bg-primary border border-white/20 rounded-lg text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-slate-200">Excerpt / Meta Description</label>
              <textarea rows={2} value={editingPost.excerpt} onChange={e => setEditingPost({...editingPost, excerpt: e.target.value})} className="w-full px-3 py-2 bg-primary border border-white/20 rounded-lg text-white"></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-slate-200">Content (HTML)</label>
              <textarea rows={10} value={editingPost.content} onChange={e => setEditingPost({...editingPost, content: e.target.value})} className="w-full px-3 py-2 bg-primary border border-white/20 rounded-lg font-mono text-xs text-white"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-200">Featured Image URL</label>
              <input type="text" value={editingPost.featuredImage} onChange={e => setEditingPost({...editingPost, featuredImage: e.target.value})} className="w-full px-3 py-2 bg-primary border border-white/20 rounded-lg text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-200">Category</label>
              <select value={editingPost.categoryId} onChange={e => setEditingPost({...editingPost, categoryId: e.target.value})} className="w-full px-3 py-2 bg-primary border border-white/20 rounded-lg text-white">
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-200">Status</label>
              <select value={editingPost.status} onChange={e => setEditingPost({...editingPost, status: e.target.value as any})} className="w-full px-3 py-2 bg-primary border border-white/20 rounded-lg text-white">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <input type="checkbox" checked={editingPost.isFeatured} onChange={e => setEditingPost({...editingPost, isFeatured: e.target.checked})} id="isFeatured" />
              <label htmlFor="isFeatured" className="text-sm font-medium text-slate-200">Featured Post</label>
            </div>
          </div>
          
          <button onClick={() => handleUpdatePost(editingPost)} className="w-full bg-accent text-primary py-3 rounded-xl font-bold hover:shadow-lg transition mt-4">
            Save Article
          </button>
        </div>
      )}

      {activeSubTab === 'categories' && (
        <div className="space-y-4">
          <h4 className="font-bold text-white mb-4">Manage Categories</h4>
          <div className="grid gap-2">
            {categories.map(cat => (
              <div key={cat.id} className="flex justify-between items-center p-3 bg-primary rounded-lg border border-white/10">
                <span className="font-medium text-white">{cat.name}</span>
                <span className="text-xs text-slate-300">{cat.slug}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-300 mt-2">More extensive category management can be built out here.</p>
        </div>
      )}

      {activeSubTab === 'authors' && (
        <div className="space-y-4">
          <h4 className="font-bold text-white mb-4">Manage Authors</h4>
          <div className="grid gap-2">
            {authors.map(author => (
              <div key={author.id} className="flex items-center gap-4 p-3 bg-primary rounded-lg border border-white/10">
                <img src={author.image} alt={author.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-white">{author.name}</p>
                  <p className="text-xs text-slate-300">{author.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'comments' && (
        <div className="space-y-4">
          <h4 className="font-bold text-white mb-4">Manage Comments</h4>
          {comments.length === 0 ? (
            <p className="text-slate-300 text-sm">No comments yet.</p>
          ) : (
            <div className="space-y-3">
              {comments.map(comment => (
                <div key={comment.id} className="p-4 bg-primary rounded-xl border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-white text-sm">{comment.name}</p>
                      <p className="text-xs text-slate-300">{comment.email}</p>
                    </div>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${comment.status === 'approved' ? 'bg-green-100 text-green-700' : comment.status === 'spam' ? 'bg-rose-100 text-rose-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {comment.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-100 mb-3">{comment.content}</p>
                  <div className="flex gap-2">
                    {comment.status !== 'approved' && (
                      <button onClick={() => handleCommentStatus(comment.id, 'approved')} className="text-xs flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"><Check size={12}/> Approve</button>
                    )}
                    {comment.status !== 'spam' && (
                      <button onClick={() => handleCommentStatus(comment.id, 'spam')} className="text-xs flex items-center gap-1 bg-rose-100 text-rose-700 px-2 py-1 rounded hover:bg-rose-200"><X size={12}/> Spam</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
