import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, Check, ShieldCheck } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'csa_cookie_consent_status';

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) {
        // Show after a slight delay to allow smooth page load
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case of restricted localStorage
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'all');
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  const handleNecessaryOnly = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'necessary');
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-lg z-50 pointer-events-auto"
        >
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-white/95 dark:bg-[#0c1222]/95 backdrop-blur-xl border border-blue-500/20 dark:border-cyan-500/20 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-gray-800 dark:text-gray-100 transition-colors">
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600" />

            {/* Close button */}
            <button
              onClick={handleNecessaryOnly}
              aria-label="Dismiss cookie notice"
              className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition"
            >
              <X size={16} />
            </button>

            <div className="flex items-start gap-3.5 mb-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 shrink-0">
                <Cookie size={22} />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white flex items-center gap-2">
                  <span>Cookie &amp; Privacy Choices</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                    GDPR / AdSense
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                  We use cookies and similar technologies to enhance user experience, analyze web traffic, and display personalized ads via{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">Google AdSense</span> and advertising partners.
                </p>
              </div>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 pl-0 sm:pl-12 flex flex-wrap gap-x-3 gap-y-1">
              <Link to="/privacy-policy" className="underline hover:text-blue-600 dark:hover:text-cyan-400 transition">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/cookie-policy" className="underline hover:text-blue-600 dark:hover:text-cyan-400 transition">
                Cookie Policy
              </Link>
              <span>•</span>
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-600 dark:hover:text-cyan-400 transition inline-flex items-center gap-1"
              >
                Google Ad Settings
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 pl-0 sm:pl-12">
              <button
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-1.5"
              >
                <Check size={16} />
                <span>Accept All Cookies</span>
              </button>
              <button
                onClick={handleNecessaryOnly}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-300 dark:border-white/15 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 font-medium text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-1.5"
              >
                <ShieldCheck size={16} />
                <span>Essential Only</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
