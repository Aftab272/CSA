import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WifiOff, Wifi, RefreshCw, AlertCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

export default function OfflineNoticeBanner() {
  const isOnline = useNetworkStatus();
  const [showRestored, setShowRestored] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setIsDismissed(false);
      setShowRestored(false);
    } else {
      // If we just transitioned back online
      setShowRestored(true);
      const timer = setTimeout(() => {
        setShowRestored(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      if (navigator.onLine) {
        await fetch('/', { method: 'HEAD', cache: 'no-store' });
        window.location.reload();
      }
    } catch {
      // Still offline
    } finally {
      setTimeout(() => setIsRetrying(false), 600);
    }
  };

  if (isOnline && !showRestored) return null;
  if (!isOnline && isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.aside
        aria-label={isOnline ? "Network status: Online" : "Network status: Offline"}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-[100] px-3 py-2.5 sm:py-3 backdrop-blur-md shadow-xl text-xs sm:text-sm font-medium border-b transition-colors duration-300 ${
          isOnline
            ? 'bg-emerald-600/95 dark:bg-emerald-900/95 text-white border-emerald-500/40'
            : 'bg-amber-600/95 dark:bg-amber-950/95 text-amber-50 border-amber-500/40'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
          <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
            {isOnline ? (
              <div className="p-1 rounded-full bg-emerald-400/20 text-white shrink-0">
                <Wifi size={16} className="animate-pulse" />
              </div>
            ) : (
              <div className="p-1 rounded-full bg-rose-500/20 text-white shrink-0">
                <WifiOff size={16} />
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 truncate">
              <span className="font-bold shrink-0">
                {isOnline ? 'Connection Restored' : 'You are currently offline'}
              </span>
              <span className="hidden sm:inline opacity-60">·</span>
              <span className="opacity-90 truncate text-[11px] sm:text-xs">
                {isOnline
                  ? 'All services and database connections are synced.'
                  : 'Cached content is available. Inquiries and live modules will sync once reconnected.'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!isOnline && (
              <>
                <button
                  onClick={() => void handleRetry()}
                  disabled={isRetrying}
                  className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold text-[11px] sm:text-xs transition flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw size={12} className={isRetrying ? 'animate-spin' : ''} />
                  <span>Retry</span>
                </button>

                <Link
                  to="/offline"
                  className="px-2.5 py-1 rounded-lg bg-black/20 hover:bg-black/30 text-white font-bold text-[11px] sm:text-xs transition hidden md:inline-block"
                >
                  Offline Info
                </Link>

                <button
                  onClick={() => setIsDismissed(true)}
                  className="p-1 text-white/80 hover:text-white transition"
                  title="Dismiss notification"
                >
                  <X size={15} />
                </button>
              </>
            )}
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
