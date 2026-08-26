import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle, AlertCircle, Eye, Download, Shield, X, Trash2, Key, ChevronRight } from 'lucide-react';

interface Subscriber {
  email: string;
  subscribedAt: string;
}

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState('');

  // Load existing subscribers
  useEffect(() => {
    const saved = localStorage.getItem('csa_newsletter_subscribers');
    if (saved) {
      try {
        setSubscribers(JSON.parse(saved));
      } catch (e) {
        setSubscribers([]);
      }
    } else {
      // Seed initial dummy subscriber data for rich display in Admin panel
      const seed: Subscriber[] = [
        { email: 'john.doe@example.com', subscribedAt: new Date(Date.now() - 86400000 * 2).toLocaleString() },
        { email: 'hello@creativestack.agency', subscribedAt: new Date(Date.now() - 86400000 * 5).toLocaleString() },
        { email: 'client.success@agency.com', subscribedAt: new Date(Date.now() - 86400000).toLocaleString() }
      ];
      localStorage.setItem('csa_newsletter_subscribers', JSON.stringify(seed));
      setSubscribers(seed);
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');

    const cleanEmail = email.trim().toLowerCase();
    
    // 1. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    // 2. Duplicate detection
    const isDuplicate = subscribers.some(sub => sub.email === cleanEmail);
    if (isDuplicate) {
      setStatus('error');
      setMessage('This email address is already subscribed to our newsletter!');
      return;
    }

    // 3. Register Subscriber
    const newSub: Subscriber = {
      email: cleanEmail,
      subscribedAt: new Date().toLocaleString()
    };
    
    const updated = [newSub, ...subscribers];
    localStorage.setItem('csa_newsletter_subscribers', JSON.stringify(updated));
    setSubscribers(updated);
    
    setStatus('success');
    setMessage('Thank you! You have successfully subscribed to the Creative Stack Agency newsletter.');
    setEmail('');
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'admin' || adminPassword === 'admin123') {
      setIsAdminAuthenticated(true);
      setAdminError('');
    } else {
      setAdminError('Invalid password. Hint: Use "admin"');
    }
  };

  const handleDeleteSubscriber = (emailToDelete: string) => {
    const updated = subscribers.filter(sub => sub.email !== emailToDelete);
    localStorage.setItem('csa_newsletter_subscribers', JSON.stringify(updated));
    setSubscribers(updated);
  };

  const handleExportCSV = () => {
    if (subscribers.length === 0) return;
    
    // Create CSV content
    const headers = ['Email Address', 'Subscription Date'];
    const rows = subscribers.map(sub => [sub.email, sub.subscribedAt]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${val.replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `csa_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="newsletter" className="relative px-6 py-20 md:px-8 bg-primary text-white overflow-hidden border-t border-white/10">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="bg-secondary/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            
            {/* Info Text */}
            <div className="md:col-span-3 space-y-4">
              <span className="text-accent text-xs font-bold tracking-widest uppercase bg-accent/10 px-3 py-1 rounded-full">Stay Updated</span>
              <h3 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-white">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-300 text-base leading-relaxed">
                Stay ahead with digital breakthroughs, exclusive course discounts, premium portfolio showcases, and automation tools from Creative Stack Agency. Delivered straight to your inbox.
              </p>
            </div>

            {/* Form Column */}
            <div className="md:col-span-2 space-y-4">
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status !== 'idle') setStatus('idle');
                    }}
                    placeholder="Enter your email address"
                    className="w-full p-4 pl-12 bg-primary/80 border border-white/10 rounded-2xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition text-white text-sm"
                    required
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <button
                  type="submit"
                  className="w-full p-4 bg-gradient-to-r from-accent to-indigo-500 text-primary font-bold rounded-2xl hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                >
                  <Mail size={16} />
                  <span>Subscribe Now</span>
                </button>
              </form>

              {/* Status Notifications */}
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-start gap-3 text-sm"
                  >
                    <CheckCircle className="shrink-0 text-emerald-400 mt-0.5" size={18} />
                    <div className="flex-grow space-y-2">
                      <p>{message}</p>
                      <button
                        onClick={() => setShowWelcome(true)}
                        className="inline-flex items-center gap-1.5 text-accent hover:underline text-xs font-semibold"
                      >
                        <Eye size={14} />
                        <span>Preview Welcome Email</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl flex items-start gap-3 text-sm animate-shake"
                  >
                    <AlertCircle className="shrink-0 text-rose-400 mt-0.5" size={18} />
                    <p>{message}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Quick Access Actions */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-4 justify-between items-center text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-accent" />
              <span>We respect your privacy. Unsubscribe at any time.</span>
            </div>
            <button
              onClick={() => {
                setShowAdmin(true);
                setAdminPassword('');
                setAdminError('');
              }}
              className="hover:text-accent font-semibold flex items-center gap-1.5 transition"
            >
              <Key size={14} />
              <span>Admin Subscribers Panel</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Welcome Email Simulation Modal */}
      <AnimatePresence>
        {showWelcome && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            >
              {/* Email App Header */}
              <div className="bg-zinc-950 p-4 border-b border-zinc-800 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-zinc-400 text-xs font-mono ml-2">Inbox Preview - Welcome Email</span>
                </div>
                <button
                  onClick={() => setShowWelcome(false)}
                  className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Email Metadata */}
              <div className="p-4 bg-zinc-900/60 border-b border-zinc-800 text-sm space-y-1.5 shrink-0">
                <div><span className="text-zinc-500 font-medium">From:</span> <span className="text-accent">Creative Stack Agency &lt;newsletter@creativestack.agency&gt;</span></div>
                <div><span className="text-zinc-500 font-medium">To:</span> <span className="text-gray-300">Subscriber &lt;your-email@example.com&gt;</span></div>
                <div><span className="text-zinc-500 font-medium">Subject:</span> <span className="text-white font-bold">🚀 Welcome to Creative Stack Agency! (Your 15% Off Code Inside)</span></div>
              </div>

              {/* Email Content Container */}
              <div className="p-6 bg-white text-zinc-800 overflow-y-auto flex-grow font-sans space-y-6">
                <div className="text-center pb-6 border-b border-zinc-100">
                  <div className="inline-block w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-accent text-xl font-bold font-display mx-auto mb-3">
                    CSA
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-900 font-display">Creative Stack Agency</h2>
                  <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1">Design • Development • AI Solutions • Courses</p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-zinc-900">Hello there!</h2>
                  <p className="text-zinc-600 leading-relaxed text-sm">
                    Thank you for subscribing to the Creative Stack Agency newsletter! We're thrilled to have you in our circle. You've officially gained priority access to our weekly insights, custom tools, course announcements, and professional tips.
                  </p>
                  
                  <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 text-center space-y-2">
                    <span className="text-xs text-sky-600 uppercase font-bold tracking-wider">A Special Gift for You</span>
                    <h3 className="text-lg font-bold text-zinc-900">Get 15% Off Your First Course or Development Service!</h3>
                    <div className="inline-block bg-white border-2 border-dashed border-sky-300 px-4 py-2 rounded-xl text-sky-600 font-mono font-bold text-lg tracking-wider">
                      WELCOME15
                    </div>
                    <p className="text-xs text-zinc-500">Apply this coupon code during checkout or reference it in your consulting call.</p>
                  </div>

                  <h3 className="font-bold text-zinc-900 pt-2 text-sm">What to expect next:</h3>
                  <ul className="space-y-2 text-sm text-zinc-600 list-disc list-inside">
                    <li>Exclusive discounts on our professional IT &amp; Marketing courses</li>
                    <li>First-look portfolios and case studies of our latest branding &amp; web builds</li>
                    <li>Weekly curated insights on AI tools, automation, SEO, and web development</li>
                    <li>Direct access to our digital workshops and free consulting templates</li>
                  </ul>
                </div>

                <div className="pt-8 border-t border-zinc-100 text-center text-xs text-zinc-400 space-y-1">
                  <p className="font-bold text-zinc-700">© Creative Stack Agency. All rights reserved.</p>
                  <p>123 Agency Way, New York, NY | info@creativestack.agency</p>
                  <p className="text-sky-500 font-semibold mt-2 cursor-pointer hover:underline">Unsubscribe</p>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="bg-zinc-950 p-4 border-t border-zinc-800 text-center shrink-0">
                <button
                  onClick={() => setShowWelcome(false)}
                  className="px-6 py-2.5 bg-accent text-primary font-bold text-sm rounded-xl hover:opacity-90 transition"
                >
                  Back to Website
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Admin Portal Modal */}
      <AnimatePresence>
        {showAdmin && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-secondary border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-primary/40 shrink-0">
                <div className="flex items-center gap-3">
                  <Shield className="text-accent w-6 h-6" />
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">Subscriber Management Portal</h3>
                    <p className="text-xs text-gray-400">Admin dashboard to manage, analyze, and export list</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAdmin(false);
                    setIsAdminAuthenticated(false);
                  }}
                  className="p-1.5 text-gray-400 hover:text-white rounded-xl hover:bg-white/5 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Authentication Form */}
              {!isAdminAuthenticated ? (
                <div className="p-8 space-y-6 flex-grow overflow-y-auto">
                  <div className="max-w-sm mx-auto space-y-4 py-8">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto text-accent mb-2">
                        <Key size={24} />
                      </div>
                      <h4 className="text-lg font-bold text-white">Enter Admin Password</h4>
                      <p className="text-xs text-gray-400">Authorized personnel only. Password is <strong>admin</strong></p>
                    </div>

                    <form onSubmit={handleAdminLogin} className="space-y-3">
                      <div>
                        <input
                          type="password"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          placeholder="Password (e.g. admin)"
                          className="w-full p-4 bg-primary border border-white/10 rounded-2xl focus:outline-none focus:border-accent text-white text-center text-sm"
                          required
                          autoFocus
                        />
                      </div>
                      {adminError && (
                        <p className="text-rose-400 text-xs text-center font-medium">{adminError}</p>
                      )}
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-accent text-primary font-bold rounded-2xl hover:opacity-90 transition text-sm uppercase tracking-wider"
                      >
                        Verify Access
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                /* Authenticated Admin View */
                <div className="flex flex-col flex-grow overflow-hidden">
                  {/* Stats Bar */}
                  <div className="p-6 bg-primary/30 border-b border-white/5 grid grid-cols-2 md:grid-cols-3 gap-4 shrink-0">
                    <div className="bg-primary/50 border border-white/5 p-4 rounded-2xl">
                      <span className="text-xs text-gray-400 block">Total Subscribers</span>
                      <span className="text-3xl font-bold text-accent font-display">{subscribers.length}</span>
                    </div>
                    <div className="bg-primary/50 border border-white/5 p-4 rounded-2xl">
                      <span className="text-xs text-gray-400 block">Status</span>
                      <span className="text-base font-bold text-emerald-400 flex items-center gap-1.5 mt-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>System Live</span>
                      </span>
                    </div>
                    <div className="col-span-2 md:col-span-1 flex items-center justify-end">
                      <button
                        onClick={handleExportCSV}
                        disabled={subscribers.length === 0}
                        className="w-full md:w-auto px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Download size={16} />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* List Container */}
                  <div className="p-6 flex-grow overflow-y-auto">
                    <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Subscribers Registry</h4>
                    
                    {subscribers.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <Mail className="mx-auto w-12 h-12 mb-2 text-gray-600" />
                        <p className="text-sm">No subscribers registered yet.</p>
                      </div>
                    ) : (
                      <div className="border border-white/5 rounded-2xl overflow-hidden bg-primary/20">
                        <div className="max-h-[300px] overflow-y-auto divide-y divide-white/5">
                          {subscribers.map((sub, i) => (
                            <div key={sub.email} className="p-4 flex items-center justify-between hover:bg-white/5 transition text-sm">
                              <div className="space-y-1">
                                <p className="font-medium text-white font-mono">{sub.email}</p>
                                <p className="text-xs text-gray-500">Subscribed: {sub.subscribedAt}</p>
                              </div>
                              <button
                                onClick={() => handleDeleteSubscriber(sub.email)}
                                className="p-2 text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition"
                                title="Delete Subscriber"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer Action */}
                  <div className="p-4 border-t border-white/10 bg-primary/40 flex justify-end shrink-0">
                    <button
                      onClick={() => {
                        setIsAdminAuthenticated(false);
                        setShowAdmin(false);
                      }}
                      className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-xl transition"
                    >
                      Logout Session
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
