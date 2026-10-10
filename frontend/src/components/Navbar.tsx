import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const logoLight = "/logo.png";
const logoDark = "/logo-white.svg";

const menuItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Team', to: '/team' },
  { label: 'Courses', to: '/courses' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const currentLogo = theme === 'dark' ? logoDark : logoLight;

  const location = useLocation();

  const isLinkActive = (item: (typeof menuItems)[number]) => {
    if (item.to === '/') return location.pathname === '/';
    return location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-sans px-4 md:px-8 py-4 ${
        isScrolled 
          ? 'bg-white/85 dark:bg-primary/85 backdrop-blur-xl border-b border-gray-200/80 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)]' 
          : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3.5 hover:opacity-90 transition duration-300">
            <img 
              src={currentLogo} 
              alt="Creative Stack Agency Logo" 
              className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain transition-transform duration-300 hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className="text-gray-900 dark:text-white text-lg md:text-xl font-bold font-display leading-none tracking-wide hidden sm:block">
                Creative Stack <span className="text-blue-600 dark:text-accent">Agency</span>
              </span>
              <span className="text-gray-900 dark:text-white text-lg font-bold font-display leading-none tracking-wide sm:hidden">
                CSA
              </span>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-8 text-gray-700 dark:text-white font-medium text-sm">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`transition-all duration-300 relative group py-1 ${
                  isLinkActive(item) 
                    ? 'text-blue-600 dark:text-blue-400 font-bold' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-blue-600 dark:bg-blue-500 transition-all duration-300 ${
                  isLinkActive(item) ? 'w-full shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2.5 rounded-full border border-gray-200 dark:border-white/15 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-800 dark:text-yellow-400 transition-all duration-300 shadow-sm cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun size={18} className="animate-spin-slow" />
              ) : (
                <Moon size={18} className="text-gray-700" />
              )}
            </button>

            <Link
              to="/contact"
              className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-7 py-2.5 rounded-full font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300 text-center transform hover:-translate-y-0.5 text-sm"
            >
              <span className="relative z-10">Hire Us</span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          </div>

          {/* Mobile Actions: Theme Toggle + Menu */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-full border border-gray-200 dark:border-white/15 bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-yellow-400 transition"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              className="text-gray-900 dark:text-white p-1" 
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-primary z-70 p-8 flex flex-col shadow-2xl overflow-y-auto border-l border-gray-200 dark:border-white/10"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-gray-900 dark:text-white font-bold text-2xl tracking-tight font-display">CSA Menu</span>
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-gray-500 dark:text-white/60 hover:text-blue-600 dark:hover:text-accent transition-colors p-2"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              {/* Mobile theme switch option */}
              <div className="mb-6 pb-6 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Appearance</span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white text-xs font-semibold shadow-sm"
                >
                  {theme === 'dark' ? <Sun size={14} className="text-yellow-400" /> : <Moon size={14} />}
                  <span>{theme === 'dark' ? 'Dark' : 'Light'} Mode</span>
                </button>
              </div>

              <nav className="flex flex-col gap-5">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.04 }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-xl font-bold transition flex items-center gap-4 ${
                        isLinkActive(item) 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      <span className="text-xs text-gray-400 dark:text-white/20 font-mono">0{index + 1}</span>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + menuItems.length * 0.04 }}
                  className="mt-6"
                >
                  <Link
                    to="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold text-center shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:opacity-95 transition duration-300"
                  >
                    Hire Our Team
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
