import React, { useState } from 'react';
import { useBlog, BlogPost, Category, Author, Comment } from '../context/BlogContext';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Check, 
  X, 
  Search, 
  Sparkles, 
  ExternalLink, 
  FileText, 
  FolderPlus, 
  Tag as TagIcon,
  AlertCircle,
  Clock,
  Download
} from 'lucide-react';

export default function BlogAdminPanel() {
  const { 
    posts, 
    categories, 
    authors, 
    comments, 
    setPosts, 
    setCategories, 
    setComments,
    createBackendPost,
    updateBackendPost,
    deleteBackendPost
  } = useBlog();
  const [activeSubTab, setActiveSubTab] = useState<'articles' | 'categories' | 'authors' | 'comments'>('articles');
  
  // Articles state
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isNewPost, setIsNewPost] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Categories state
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategorySlug, setNewCategorySlug] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  // Tag input helper for editor
  const [tagsInput, setTagsInput] = useState('');

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleStartCreatePost = () => {
    const template: BlogPost = {
      id: `p_${Date.now()}`,
      title: '',
      slug: '',
      content: '<h2>Introduction</h2>\n<p>Start writing your in-depth guide or article here...</p>\n\n<h2>Key Highlights</h2>\n<p>Add technical details, implementation steps, and insights.</p>',
      excerpt: '',
      featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      authorId: authors[0]?.id || 'auth-sami',
      categoryId: categories[0]?.id || 'cat-engineering',
      tags: ['Engineering', 'Architecture'],
      status: 'published',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readTime: 5,
      isFeatured: false,
      views: 0
    };
    setEditingPost(template);
    setIsNewPost(true);
    setTagsInput(template.tags.join(', '));
  };

  const handleStartEditPost = (post: BlogPost) => {
    setEditingPost({ ...post });
    setIsNewPost(false);
    setTagsInput((post.tags || []).join(', '));
  };

  const handleSavePost = () => {
    if (!editingPost) return;

    if (!editingPost.title.trim()) {
      showToast('Article title is required.', 'error');
      return;
    }

    const slug = editingPost.slug.trim() || generateSlug(editingPost.title);
    const parsedTags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    // Calculate approx read time: 200 words per minute
    const textOnly = editingPost.content.replace(/<[^>]+>/g, ' ');
    const wordCount = textOnly.split(/\s+/).filter(Boolean).length;
    const calculatedReadTime = Math.max(1, Math.ceil(wordCount / 200));

    const finalPost: BlogPost = {
      ...editingPost,
      title: editingPost.title.trim(),
      slug,
      tags: parsedTags,
      readTime: calculatedReadTime,
      updatedAt: new Date().toISOString(),
    };

    if (isNewPost) {
      void createBackendPost(finalPost);
      showToast('New article published and saved to backend!');
    } else {
      void updateBackendPost(finalPost.id, finalPost);
      showToast('Article updated and saved to backend!');
    }

    setEditingPost(null);
    setIsNewPost(false);
  };

  const handleDeletePost = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      void deleteBackendPost(id);
      showToast('Article deleted from backend.');
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      showToast('Category name is required.', 'error');
      return;
    }

    const slug = newCategorySlug.trim() || generateSlug(newCategoryName);
    const newCat: Category = {
      id: `cat_${Date.now()}`,
      name: newCategoryName.trim(),
      slug,
      order: categories.length + 1,
      isHidden: false,
      description: newCategoryDesc.trim() || `${newCategoryName.trim()} articles and updates.`
    };

    setCategories([...categories, newCat]);
    setNewCategoryName('');
    setNewCategorySlug('');
    setNewCategoryDesc('');
    setIsAddingCategory(false);
    showToast(`Category "${newCat.name}" added successfully!`);
  };

  const handleDeleteCategory = (id: string, name: string) => {
    if (categories.length <= 1) {
      showToast('You must have at least one category.', 'error');
      return;
    }
    if (window.confirm(`Delete category "${name}"? Existing articles in this category will keep their content.`)) {
      setCategories(categories.filter(c => c.id !== id));
      showToast(`Category "${name}" deleted.`);
    }
  };

  const handleCommentStatus = (id: string, status: 'approved' | 'spam' | 'pending') => {
    setComments(comments.map(c => (c.id === id ? { ...c, status } : c)));
    showToast(`Comment marked as ${status}.`);
  };

  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' ? true : p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div 
          className={`p-3.5 rounded-xl border flex items-center justify-between text-sm font-semibold transition-all shadow-lg ${
            toastMessage.type === 'success' 
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400' 
              : 'bg-rose-500/15 border-rose-500/40 text-rose-400'
          }`}
        >
          <span>{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="text-white/60 hover:text-white">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex gap-4 border-b border-white/15 pb-2 overflow-x-auto text-sm">
        <button 
          onClick={() => { setActiveSubTab('articles'); setEditingPost(null); }} 
          className={`pb-2 whitespace-nowrap font-bold transition-all ${
            activeSubTab === 'articles' ? 'border-b-2 border-accent text-accent' : 'text-slate-300 hover:text-white'
          }`}
        >
          Articles ({posts.length})
        </button>
        <button 
          onClick={() => { setActiveSubTab('categories'); setEditingPost(null); }} 
          className={`pb-2 whitespace-nowrap font-bold transition-all ${
            activeSubTab === 'categories' ? 'border-b-2 border-accent text-accent' : 'text-slate-300 hover:text-white'
          }`}
        >
          Categories ({categories.length})
        </button>
        <button 
          onClick={() => { setActiveSubTab('authors'); setEditingPost(null); }} 
          className={`pb-2 whitespace-nowrap font-bold transition-all ${
            activeSubTab === 'authors' ? 'border-b-2 border-accent text-accent' : 'text-slate-300 hover:text-white'
          }`}
        >
          Authors ({authors.length})
        </button>
        <button 
          onClick={() => { setActiveSubTab('comments'); setEditingPost(null); }} 
          className={`pb-2 whitespace-nowrap font-bold transition-all ${
            activeSubTab === 'comments' ? 'border-b-2 border-accent text-accent' : 'text-slate-300 hover:text-white'
          }`}
        >
          Comments ({comments.length})
        </button>
      </div>

      {/* ================= ARTICLES TAB: LIST VIEW ================= */}
      {activeSubTab === 'articles' && !editingPost && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h4 className="font-bold text-white text-lg flex items-center gap-2">
                <FileText size={20} className="text-accent" />
                <span>Blog Articles CMS</span>
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Manage, publish, edit, and delete publications across Creative Stack Agency.
              </p>
            </div>
            
            <div className="flex items-center gap-2.5 flex-wrap">
              <button 
                onClick={() => {
                  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${window.location.origin}/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n  <url>\n    <loc>${window.location.origin}/blog</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n${posts.filter(p => p.status === 'published').map(p => `  <url>\n    <loc>${window.location.origin}/blog/${p.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`).join('\n')}\n</urlset>`;
                  const blob = new Blob([sitemap], { type: 'text/xml' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'sitemap.xml';
                  a.click();
                  showToast('Sitemap.xml exported successfully.');
                }} 
                className="flex items-center gap-1.5 bg-white/10 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-white/20 transition cursor-pointer"
              >
                <Download size={14} />
                <span>Export Sitemap</span>
              </button>

              <button 
                onClick={handleStartCreatePost} 
                className="flex items-center gap-1.5 bg-accent text-primary px-4 py-2 rounded-xl text-xs font-black hover:opacity-90 transition shadow-lg shadow-accent/20 cursor-pointer"
              >
                <Plus size={16} />
                <span>New Article</span>
              </button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-primary/40 p-3 rounded-2xl border border-white/10">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input 
                type="text" 
                placeholder="Search articles by title or slug..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-slate-400 outline-none focus:border-accent"
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-slate-300 font-medium">Status:</span>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="bg-white/5 border border-white/15 text-white text-xs rounded-xl px-2.5 py-1.5 outline-none focus:border-accent"
              >
                <option value="all">All ({posts.length})</option>
                <option value="published">Published ({posts.filter(p => p.status === 'published').length})</option>
                <option value="draft">Draft ({posts.filter(p => p.status === 'draft').length})</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="border border-white/15 rounded-2xl overflow-x-auto shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-white/5 text-slate-300 uppercase font-bold text-[11px] border-b border-white/10">
                <tr>
                  <th className="px-4 py-3.5">Article</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Author</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Published</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-100">
                {filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-slate-400">
                      No articles match your filter.
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map(post => {
                    const author = authors.find(a => a.id === post.authorId);
                    const category = categories.find(c => c.id === post.categoryId);
                    return (
                      <tr key={post.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-3">
                            <img 
                              src={post.featuredImage} 
                              alt={post.title} 
                              className="w-10 h-10 rounded-lg object-cover ring-1 ring-white/10 shrink-0" 
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80';
                              }}
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-white text-xs line-clamp-1">{post.title}</p>
                              <p className="text-[10px] text-slate-400 font-mono mt-0.5 line-clamp-1">/{post.slug}</p>
                              {post.isFeatured && (
                                <span className="inline-block mt-1 px-1.5 py-0.5 bg-amber-500/20 text-amber-300 rounded text-[9px] font-bold">
                                  ★ Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-300">
                          <span className="bg-white/10 px-2 py-0.5 rounded text-[11px]">
                            {category?.name || 'General'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-300">
                          {author?.name || 'Staff'}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            post.status === 'published' 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-300 whitespace-nowrap">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-1.5">
                            <a 
                              href={`/blog/${post.slug}`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              title="View Article Live"
                              className="p-1.5 text-cyan-400 hover:bg-cyan-500/20 rounded-lg transition"
                            >
                              <ExternalLink size={15} />
                            </a>
                            <button 
                              onClick={() => handleStartEditPost(post)} 
                              title="Edit Article"
                              className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded-lg transition"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button 
                              onClick={() => handleDeletePost(post.id, post.title)} 
                              title="Delete Article"
                              className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded-lg transition"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= ARTICLES TAB: EDITOR VIEW ================= */}
      {activeSubTab === 'articles' && editingPost && (
        <div className="space-y-5 bg-primary/40 p-5 rounded-2xl border border-white/15">
          <div className="flex justify-between items-center pb-3 border-b border-white/10">
            <div>
              <h4 className="font-bold text-white text-base">
                {isNewPost ? 'Create New Article' : 'Edit Article'}
              </h4>
              <p className="text-xs text-slate-300">
                Configure content, SEO metadata, tags, and publishing status.
              </p>
            </div>
            <button 
              onClick={() => { setEditingPost(null); setIsNewPost(false); }} 
              className="text-xs text-slate-300 hover:text-white px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-xs">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block font-semibold mb-1 text-slate-200">Article Title (H1)</label>
              <input 
                type="text" 
                value={editingPost.title} 
                onChange={(e) => {
                  const val = e.target.value;
                  setEditingPost({
                    ...editingPost,
                    title: val,
                    slug: isNewPost ? generateSlug(val) : editingPost.slug
                  });
                }} 
                placeholder="e.g. Modern Full-Stack Architecture in 2026"
                className="w-full px-3.5 py-2.5 bg-primary border border-white/20 rounded-xl text-white text-sm outline-none focus:border-accent" 
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block font-semibold mb-1 text-slate-200">URL Slug</label>
              <input 
                type="text" 
                value={editingPost.slug} 
                onChange={(e) => setEditingPost({ ...editingPost, slug: generateSlug(e.target.value) })} 
                placeholder="modern-full-stack-architecture-in-2026"
                className="w-full px-3 py-2 bg-primary border border-white/20 rounded-xl text-white outline-none focus:border-accent font-mono" 
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="block font-semibold mb-1 text-slate-200">Featured Image URL</label>
              <input 
                type="text" 
                value={editingPost.featuredImage} 
                onChange={(e) => setEditingPost({ ...editingPost, featuredImage: e.target.value })} 
                placeholder="https://..."
                className="w-full px-3 py-2 bg-primary border border-white/20 rounded-xl text-white outline-none focus:border-accent" 
              />
            </div>

            {/* Excerpt */}
            <div className="md:col-span-2">
              <label className="block font-semibold mb-1 text-slate-200">Excerpt / Meta Description (SEO)</label>
              <textarea 
                rows={2} 
                value={editingPost.excerpt} 
                onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })} 
                placeholder="A compelling 1-2 sentence preview for search engines and social cards..."
                className="w-full px-3 py-2 bg-primary border border-white/20 rounded-xl text-white outline-none focus:border-accent"
              />
            </div>

            {/* Content (HTML) */}
            <div className="md:col-span-2">
              <label className="block font-semibold mb-1 text-slate-200 flex items-center justify-between">
                <span>Article Content (HTML / Rich Format)</span>
                <span className="text-[10px] text-slate-400">Supports standard HTML headings, lists, quotes</span>
              </label>
              <textarea 
                rows={12} 
                value={editingPost.content} 
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })} 
                className="w-full px-3.5 py-2.5 bg-primary border border-white/20 rounded-xl font-mono text-xs text-white outline-none focus:border-accent leading-relaxed"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block font-semibold mb-1 text-slate-200">Author</label>
              <select 
                value={editingPost.authorId} 
                onChange={(e) => setEditingPost({ ...editingPost, authorId: e.target.value })} 
                className="w-full px-3 py-2 bg-primary border border-white/20 rounded-xl text-white outline-none focus:border-accent"
              >
                {authors.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.name} — {a.position}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block font-semibold mb-1 text-slate-200">Category</label>
              <select 
                value={editingPost.categoryId} 
                onChange={(e) => setEditingPost({ ...editingPost, categoryId: e.target.value })} 
                className="w-full px-3 py-2 bg-primary border border-white/20 rounded-xl text-white outline-none focus:border-accent"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block font-semibold mb-1 text-slate-200">Tags (Comma-separated)</label>
              <input 
                type="text" 
                value={tagsInput} 
                onChange={(e) => setTagsInput(e.target.value)} 
                placeholder="Engineering, React, DevOps"
                className="w-full px-3 py-2 bg-primary border border-white/20 rounded-xl text-white outline-none focus:border-accent" 
              />
            </div>

            {/* Status */}
            <div>
              <label className="block font-semibold mb-1 text-slate-200">Publishing Status</label>
              <select 
                value={editingPost.status} 
                onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value as any })} 
                className="w-full px-3 py-2 bg-primary border border-white/20 rounded-xl text-white outline-none focus:border-accent"
              >
                <option value="published">Published</option>
                <option value="draft">Draft (Private)</option>
              </select>
            </div>

            {/* Featured toggle */}
            <div className="md:col-span-2 flex items-center gap-2 pt-2">
              <input 
                type="checkbox" 
                checked={editingPost.isFeatured} 
                onChange={(e) => setEditingPost({ ...editingPost, isFeatured: e.target.checked })} 
                id="isFeatured" 
                className="w-4 h-4 rounded text-accent accent-accent cursor-pointer"
              />
              <label htmlFor="isFeatured" className="font-semibold text-slate-200 cursor-pointer select-none">
                Mark as Featured Article (pinned to top hero of blog page)
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-3 border-t border-white/10">
            <button 
              onClick={() => { setEditingPost(null); setIsNewPost(false); }} 
              className="w-1/3 py-2.5 rounded-xl border border-white/20 text-slate-300 hover:text-white font-bold text-xs transition"
            >
              Cancel
            </button>
            <button 
              onClick={handleSavePost} 
              className="w-2/3 bg-accent text-primary py-2.5 rounded-xl font-black text-xs hover:shadow-lg hover:shadow-accent/20 transition cursor-pointer"
            >
              Save &amp; Publish Article
            </button>
          </div>
        </div>
      )}

      {/* ================= CATEGORIES TAB ================= */}
      {activeSubTab === 'categories' && (
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold text-white text-base flex items-center gap-2">
                <FolderPlus size={18} className="text-accent" />
                <span>Manage Categories</span>
              </h4>
              <p className="text-xs text-slate-300">
                Organize blog articles into topics for easier navigation.
              </p>
            </div>

            {!isAddingCategory && (
              <button 
                onClick={() => setIsAddingCategory(true)}
                className="flex items-center gap-1.5 bg-accent text-primary px-3.5 py-1.5 rounded-xl text-xs font-bold hover:opacity-90 transition cursor-pointer"
              >
                <Plus size={15} />
                <span>Add Category</span>
              </button>
            )}
          </div>

          {/* Add Category Form */}
          {isAddingCategory && (
            <form onSubmit={handleAddCategory} className="bg-primary/40 p-4 rounded-2xl border border-white/15 space-y-3 text-xs">
              <h5 className="font-bold text-white text-sm">Add New Category</h5>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Category Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. AI & Machine Learning"
                    value={newCategoryName}
                    onChange={(e) => {
                      setNewCategoryName(e.target.value);
                      if (!newCategorySlug) setNewCategorySlug(generateSlug(e.target.value));
                    }}
                    className="w-full px-3 py-2 bg-primary border border-white/20 rounded-xl text-white outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Slug</label>
                  <input 
                    type="text" 
                    placeholder="ai-machine-learning"
                    value={newCategorySlug}
                    onChange={(e) => setNewCategorySlug(generateSlug(e.target.value))}
                    className="w-full px-3 py-2 bg-primary border border-white/20 rounded-xl text-white outline-none focus:border-accent font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 mb-1 font-semibold">Description</label>
                  <input 
                    type="text" 
                    placeholder="Brief description of topics covered in this category"
                    value={newCategoryDesc}
                    onChange={(e) => setNewCategoryDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-primary border border-white/20 rounded-xl text-white outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsAddingCategory(false)}
                  className="px-3 py-1.5 rounded-xl text-slate-300 hover:text-white bg-white/5 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-1.5 rounded-xl bg-accent text-primary text-xs font-bold hover:opacity-90"
                >
                  Create Category
                </button>
              </div>
            </form>
          )}

          {/* Categories Grid */}
          <div className="grid sm:grid-cols-2 gap-3">
            {categories.map(cat => {
              const count = posts.filter(p => p.categoryId === cat.id).length;
              return (
                <div 
                  key={cat.id} 
                  className="flex items-center justify-between p-3.5 bg-primary/40 rounded-xl border border-white/10 hover:border-white/20 transition"
                >
                  <div>
                    <p className="font-bold text-white text-sm flex items-center gap-2">
                      <span>{cat.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-normal">
                        {count} {count === 1 ? 'article' : 'articles'}
                      </span>
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">/{cat.slug}</p>
                    {cat.description && (
                      <p className="text-[11px] text-slate-300 mt-1 line-clamp-1">{cat.description}</p>
                    )}
                  </div>
                  <button 
                    onClick={() => handleDeleteCategory(cat.id, cat.name)}
                    className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded-lg transition shrink-0 ml-3"
                    title="Delete Category"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= AUTHORS TAB ================= */}
      {activeSubTab === 'authors' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h4 className="font-bold text-white text-base">Agency Authors &amp; Contributors</h4>
              <p className="text-xs text-slate-300">
                Staff members and mentors eligible to publish articles on the agency blog.
              </p>
            </div>
            <span className="text-xs text-slate-300 bg-white/10 px-3 py-1 rounded-full font-bold">
              {authors.length} Real Authors
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5">
            {authors.map(author => {
              const articleCount = posts.filter(p => p.authorId === author.id).length;
              return (
                <div key={author.id} className="flex items-start gap-3.5 p-3.5 bg-primary/40 rounded-2xl border border-white/10 hover:border-white/20 transition">
                  <img 
                    src={author.image} 
                    alt={author.name} 
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-accent/30 shrink-0" 
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://res.cloudinary.com/z6sk8xam/image/upload/v1791571654/fi3dmmdk8xed5zbkew3s.png';
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-white text-sm">{author.name}</p>
                      <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full font-bold">
                        {articleCount} posts
                      </span>
                    </div>
                    <p className="text-xs text-accent font-medium mt-0.5">{author.position}</p>
                    <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 leading-relaxed">{author.bio}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= COMMENTS TAB ================= */}
      {activeSubTab === 'comments' && (
        <div className="space-y-4">
          <h4 className="font-bold text-white text-base mb-1">Article Comments</h4>
          {comments.length === 0 ? (
            <div className="text-center py-12 bg-primary/20 rounded-2xl border border-dashed border-white/15">
              <p className="text-slate-300 text-sm">No visitor comments recorded yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {comments.map(comment => (
                <div key={comment.id} className="p-4 bg-primary/40 rounded-2xl border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-white text-sm">{comment.name}</p>
                      <p className="text-xs text-slate-400">{comment.email}</p>
                    </div>
                    <span className={`px-2 py-0.5 text-xs rounded-full font-bold uppercase tracking-wider ${
                      comment.status === 'approved' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : comment.status === 'spam' 
                        ? 'bg-rose-500/20 text-rose-400' 
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {comment.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 mb-3">{comment.content}</p>
                  <div className="flex gap-2">
                    {comment.status !== 'approved' && (
                      <button 
                        onClick={() => handleCommentStatus(comment.id, 'approved')} 
                        className="text-xs flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-lg hover:bg-emerald-500/30 font-semibold"
                      >
                        <Check size={12}/> Approve
                      </button>
                    )}
                    {comment.status !== 'spam' && (
                      <button 
                        onClick={() => handleCommentStatus(comment.id, 'spam')} 
                        className="text-xs flex items-center gap-1 bg-rose-500/20 text-rose-400 px-2.5 py-1 rounded-lg hover:bg-rose-500/30 font-semibold"
                      >
                        <X size={12}/> Mark Spam
                      </button>
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
