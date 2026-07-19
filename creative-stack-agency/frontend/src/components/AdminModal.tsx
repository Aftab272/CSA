import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdmin } from '../context/AdminContext';
import BlogAdminPanel from './BlogAdminPanel';
import { PenTool } from 'lucide-react';
import { 
  X, Image, Type, Link, Briefcase, BookOpen, Layers, 
  Phone, Share2, Users, FileText, Scale, ToggleLeft, Upload, Plus, Trash2, Edit2, Save, Download, Check, Search
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminModal({ isOpen, onClose }: AdminModalProps) {
  const { footerData, setFooterData, seoData, setSeoData } = useAdmin();
  const [localData, setLocalData] = useState(footerData);
  const [localSeo, setLocalSeo] = useState(seoData);
  const [subscribers, setSubscribers] = React.useState<{email: string; subscribedAt: string}[]>([]);

  // Sync local data when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setLocalData(footerData);
      setLocalSeo(seoData);
      const savedSubs = localStorage.getItem('csa_newsletter_subscribers');
      if (savedSubs) {
        try {
          setSubscribers(JSON.parse(savedSubs));
        } catch(e) {}
      }
    }
  }, [isOpen, footerData, seoData]);
  const [activeTab, setActiveTab] = useState('seo');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const adminControls = [
    { id: 'seo', label: 'Global SEO Settings', icon: Search },
    { id: 'blog', label: 'Blog CMS', icon: PenTool },
    { id: 'logo', label: 'Update Agency Logo', icon: Image },
    { id: 'description', label: 'Edit Company Description', icon: Type },
    { id: 'quicklinks', label: 'Manage Quick Links', icon: Link },
    { id: 'services', label: 'Add/Edit Services', icon: Briefcase },
    { id: 'courses', label: 'Update Course Categories', icon: BookOpen },
    { id: 'projects', label: 'Manage Project Categories', icon: Layers },
    { id: 'contact', label: 'Update Contact Information', icon: Phone },
    { id: 'social', label: 'Change Social Media Links', icon: Share2 },
    { id: 'newsletter', label: 'Manage Newsletter Subscribers', icon: Users },
    { id: 'copyright', label: 'Edit Copyright Text', icon: FileText },
    { id: 'legal', label: 'Update Legal Page Links', icon: Scale },
    { id: 'sections', label: 'Enable/Disable Sections', icon: ToggleLeft },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setFooterData(localData);
    setSeoData(localSeo);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 800);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'blog':
        return <BlogAdminPanel />;
      case 'seo':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website Title Tag</label>
              <input type="text" value={localSeo.siteTitle} onChange={e => setLocalSeo({...localSeo, siteTitle: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-[#0B1120] border border-gray-300 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-gray-900 dark:text-white" />
              <p className="text-xs text-gray-500 mt-1">Keep it under 60 characters for best display in search engines.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Description</label>
              <textarea rows={3} value={localSeo.metaDescription} onChange={e => setLocalSeo({...localSeo, metaDescription: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-[#0B1120] border border-gray-300 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-gray-900 dark:text-white"></textarea>
              <p className="text-xs text-gray-500 mt-1">Keep it between 150-160 characters. This appears in Google search results.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Keywords (Comma separated)</label>
              <input type="text" value={localSeo.metaKeywords} onChange={e => setLocalSeo({...localSeo, metaKeywords: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-[#0B1120] border border-gray-300 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-gray-900 dark:text-white" />
            </div>
          </div>
        );
      case 'logo':
        return (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 dark:border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload size={24} />
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Current Logo Preview</p>
              <div className="p-6 bg-gray-100 dark:bg-white/5 rounded-xl flex justify-center items-center">
                <div className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                  Creative <span className="text-accent">Stack</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'description':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Description (Footer)</label>
              <textarea 
                rows={5} 
                className="w-full px-4 py-3 bg-white dark:bg-[#0B1120] border border-gray-300 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-gray-900 dark:text-white"
                value={localData.description}
                onChange={(e) => setLocalData({...localData, description: e.target.value})}
              ></textarea>
            </div>
          </div>
        );
      case 'quicklinks':
      case 'services':
      case 'courses':
      case 'projects':
      case 'legal':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Current Links</h4>
              <button className="flex items-center gap-2 text-sm text-accent hover:bg-accent/10 px-3 py-1.5 rounded-lg transition-colors">
                <Plus size={16} /> Add New
              </button>
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-200 dark:border-white/10">
                <div className="flex-1">
                  <input type="text" defaultValue={`Link Item ${i}`} className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium text-gray-900 dark:text-white p-0" />
                  <input type="text" defaultValue="/example-url" className="w-full bg-transparent border-none focus:ring-0 text-xs text-gray-500 p-0 mt-1" />
                </div>
                <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors"><Edit2 size={16} /></button>
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input type="email" defaultValue="contact@creativestackagency.com" className="w-full px-4 py-3 bg-white dark:bg-[#0B1120] border border-gray-300 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                <input type="tel" defaultValue="+92 (300) 000-0000" className="w-full px-4 py-3 bg-white dark:bg-[#0B1120] border border-gray-300 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-gray-900 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Physical Address</label>
              <textarea rows={3} defaultValue="123 Creative Street, Tech District, City 10010" className="w-full px-4 py-3 bg-white dark:bg-[#0B1120] border border-gray-300 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-gray-900 dark:text-white"></textarea>
            </div>
          </div>
        );
      case 'social':
        return (
          <div className="space-y-4">
            {localData.socialLinks.map((social, idx) => (
              <div key={social.id} className="flex items-center gap-4">
                <input type="text" value={social.platform} onChange={e => {
                  const newLinks = [...localData.socialLinks];
                  newLinks[idx].platform = e.target.value;
                  setLocalData({...localData, socialLinks: newLinks});
                }} className="w-24 px-2 py-2 text-sm font-medium text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-white/20 focus:outline-none focus:border-accent" />
                <input type="url" value={social.url} onChange={e => {
                  const newLinks = [...localData.socialLinks];
                  newLinks[idx].url = e.target.value;
                  setLocalData({...localData, socialLinks: newLinks});
                }} placeholder={`https://${social.platform.toLowerCase()}.com/...`} className="flex-1 px-4 py-2 bg-white dark:bg-[#0B1120] border border-gray-300 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-sm text-gray-900 dark:text-white" />
                <button 
                  onClick={() => {
                    const newLinks = localData.socialLinks.filter((_, i) => i !== idx);
                    setLocalData({...localData, socialLinks: newLinks});
                  }}
                  className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button onClick={() => setLocalData({...localData, socialLinks: [...localData.socialLinks, {id: Date.now().toString(), platform: 'New Platform', url: '#', enabled: true}]})} className="text-accent text-sm font-medium hover:underline flex items-center gap-2 mt-2">
              <Plus size={16} /> Add Another Platform
            </button>
          </div>
        );
      case 'newsletter':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Recent Subscribers ({subscribers.length} total)</h4>
              <button onClick={() => {
                const csv = 'Email,Date Subscribed\\n' + subscribers.map(s => `${s.email},${s.subscribedAt}`).join('\\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'subscribers.csv';
                a.click();
              }} className="flex items-center gap-2 text-sm bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white px-4 py-2 rounded-lg transition-colors">
                <Download size={16} /> Export CSV
              </button>
            </div>
            <div className="border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden max-h-[400px] overflow-y-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Date Subscribed</th>
                    <th className="px-4 py-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                  {subscribers.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-gray-500">No subscribers yet.</td>
                    </tr>
                  )}
                  {subscribers.map((sub, i) => (
                    <tr key={sub.email + i} className="text-gray-900 dark:text-gray-300">
                      <td className="px-4 py-3">{sub.email}</td>
                      <td className="px-4 py-3 text-gray-500">{sub.subscribedAt}</td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => {
                          const newSubs = subscribers.filter(s => s.email !== sub.email);
                          setSubscribers(newSubs);
                          localStorage.setItem('csa_newsletter_subscribers', JSON.stringify(newSubs));
                        }} className="text-rose-500 hover:text-rose-600 p-1.5 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'copyright':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Copyright Text</label>
              <input type="text" value={localData.copyrightText} onChange={e => setLocalData({...localData, copyrightText: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-[#0B1120] border border-gray-300 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-gray-900 dark:text-white" />
            </div>
            <p className="text-xs text-gray-500">Use {'{year}'} to automatically insert the current year.</p>
          </div>
        );
      case 'sections':
        const sectionsConfig = [
          { id: 'newsletter', label: 'Newsletter Subscription Area' },
          { id: 'quicklinks', label: 'Quick Links Column' },
          { id: 'services', label: 'Services Column' },
          { id: 'contact', label: 'Contact Info Column' },
          { id: 'social', label: 'Social Media Icons' },
          { id: 'legal', label: 'Legal Links (Bottom)' },
        ];
        return (
          <div className="space-y-2">
            {sectionsConfig.map((section) => {
              const isEnabled = localData.sections[section.id];
              return (
              <div key={section.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                <span className="font-medium text-gray-900 dark:text-white">{section.label}</span>
                <button 
                  onClick={() => setLocalData({...localData, sections: {...localData.sections, [section.id]: !isEnabled}})}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isEnabled ? 'bg-accent' : 'bg-gray-300 dark:bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            )})}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-[#0B1120] border border-gray-200 dark:border-white/10 w-full max-w-5xl h-[85vh] md:h-[75vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            {/* Sidebar */}
            <div className="w-full md:w-80 bg-gray-50 dark:bg-white/[0.02] border-b md:border-b-0 md:border-r border-gray-200 dark:border-white/10 flex flex-col max-h-[40vh] md:max-h-none md:h-full overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-white/10 flex items-center justify-between sticky top-0 bg-gray-50 dark:bg-[#0B1120]/95 z-10 backdrop-blur-md">
                <div>
                  <h2 className="text-xl font-bold font-display text-gray-900 dark:text-white">Admin Control</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Footer Management</p>
                </div>
                <button 
                  onClick={onClose}
                  className="md:hidden p-2 bg-gray-200 dark:bg-white/10 rounded-full text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 space-y-1">
                {adminControls.map((ctrl) => {
                  const Icon = ctrl.icon;
                  const isActive = activeTab === ctrl.id;
                  return (
                    <button
                      key={ctrl.id}
                      onClick={() => setActiveTab(ctrl.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                        isActive 
                          ? 'bg-accent text-white dark:text-gray-900 shadow-md' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white dark:text-gray-900' : 'text-gray-500'}`} />
                        {ctrl.label}
                      </div>
                      {isActive && (
                        <motion.div layoutId="activeTabIndicator" className="w-1.5 h-1.5 rounded-full bg-white dark:bg-gray-900" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-h-0 relative bg-white dark:bg-transparent">
              {/* Desktop Close Button */}
              <div className="absolute top-6 right-6 z-10 hidden md:block">
                <button 
                  onClick={onClose}
                  className="p-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors rounded-full text-gray-500 dark:text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 md:p-10">
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                      {React.createElement(adminControls.find(c => c.id === activeTab)?.icon || Image, { className: 'w-6 h-6' })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                        {adminControls.find(c => c.id === activeTab)?.label}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Manage and update your website footer preferences.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-transparent rounded-2xl">
                    {renderContent()}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02] mt-auto">
                <div className="max-w-3xl mx-auto flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    Changes apply immediately to the website footer.
                  </p>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving || showSuccess}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all ${
                      showSuccess 
                        ? 'bg-green-500 text-white' 
                        : 'bg-accent text-white hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20'
                    }`}
                  >
                    {isSaving ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : showSuccess ? (
                      <>
                        <Check size={18} /> Saved Successfully
                      </>
                    ) : (
                      <>
                        <Save size={18} /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
