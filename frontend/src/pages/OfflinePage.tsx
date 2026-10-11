import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import PageShell from './PageShell';
import { 
  WifiOff, 
  RefreshCw, 
  Home, 
  PhoneCall, 
  Mail, 
  MessageSquare, 
  Clock, 
  CheckCircle2,
  AlertTriangle 
} from 'lucide-react';

export default function OfflinePage() {
  const [isChecking, setIsChecking] = useState(false);
  const [checkStatus, setCheckStatus] = useState<'idle' | 'online' | 'offline'>('idle');

  const checkConnection = async () => {
    setIsChecking(true);
    setCheckStatus('idle');

    if (!navigator.onLine) {
      setTimeout(() => {
        setIsChecking(false);
        setCheckStatus('offline');
      }, 700);
      return;
    }

    try {
      // Ping check
      const res = await fetch('/', { method: 'HEAD', cache: 'no-store' });
      if (res.ok || res.type === 'opaque') {
        setCheckStatus('online');
        setTimeout(() => {
          window.location.href = '/';
        }, 1200);
      } else {
        setCheckStatus('offline');
      }
    } catch {
      setCheckStatus('offline');
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      setCheckStatus('online');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  return (
    <PageShell
      title="Offline | Creative Stack Agency"
      description="You are currently disconnected from the internet. Please check your network connection."
    >
      <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full text-center"
        >
          {/* Animated Offline Icon */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-rose-500/10 dark:bg-rose-500/15 border-2 border-rose-500/30 flex items-center justify-center text-rose-500 shadow-xl relative z-10">
              <WifiOff className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2]" />
            </div>
            <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-xl animate-pulse pointer-events-none" />
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>Connection Interrupted</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display text-gray-900 dark:text-white tracking-tight leading-tight mb-3">
            You Are Currently Offline
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-8">
            It looks like your internet connection was lost. While you're offline, you can still view cached materials, but live data, course enrollment, and inquiries require a network connection.
          </p>

          {/* Connection Test Result Feedback */}
          {checkStatus === 'online' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-sm flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={18} />
              <span>Internet connection restored! Redirecting to home...</span>
            </motion.div>
          )}

          {checkStatus === 'offline' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <AlertTriangle size={18} />
              <span>Still disconnected. Please check your Wi-Fi router or cellular data switch.</span>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
            <button
              onClick={() => void checkConnection()}
              disabled={isChecking}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={16} className={isChecking ? 'animate-spin' : ''} />
              <span>{isChecking ? 'Verifying Network...' : 'Retry Connection'}</span>
            </button>

            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/15 text-gray-900 dark:text-white font-bold text-sm border border-gray-300 dark:border-white/20 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Home size={16} />
              <span>Return to Home</span>
            </Link>
          </div>

          {/* Offline Emergency Support Card */}
          <div className="bg-white/80 dark:bg-secondary/70 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-left shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-blue-500" />
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                Urgent Assistance While Offline
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              If you need immediate software consultation, project delivery updates, or admissions support, our team is directly reachable via mobile lines:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="https://wa.me/923194642953"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-emerald-500/40 transition group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-500 dark:text-gray-400 block">WhatsApp Chat</span>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-500 transition">
                    +92 319 4642953
                  </span>
                </div>
              </a>

              <a
                href="mailto:contact@creativestackagency.dev"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-blue-500/40 transition group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-500 dark:text-gray-400 block">Direct Email</span>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition truncate block max-w-[180px]">
                    contact@creativestackagency.dev
                  </span>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </PageShell>
  );
}
