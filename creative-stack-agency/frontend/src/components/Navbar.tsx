import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const menuItems = [
  'Home', 'About', 'Services', 'Projects', 'Team', 'Team4Stack', 'Courses', 'Blog', 'Reviews', 'Contact'
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const location = useLocation();
  const getHref = (item: string) => {
    const slug = item.toLowerCase();
    if (item === 'Blog') return '/blog';
    if (item === 'About') return '/about';
    if (item === 'Home') return '/';
    
    const target = slug === 'team4stack' ? 'team4stack' : slug;
    
    if (location.pathname === '/') return `#${target}`;
    return `/#${target}`;
  };

  const isLinkActive = (item: string) => {
    if (item === 'Blog' && location.pathname.startsWith('/blog')) return true;
    if (item === 'About' && location.pathname === '/about') return true;
    if (item === 'Home' && location.pathname === '/') return true;
    return false;
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans px-4 md:px-8 py-4 ${isScrolled ? 'bg-primary shadow-md' : 'bg-transparent'}`}>
        <div className="flex items-center justify-between">
          <a href="/" className="text-white text-xl md:text-2xl font-bold font-display hover:text-accent transition">
            CSA
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-6 text-white font-medium text-sm">
            {menuItems.map(item => (
              item === 'Blog' ? (
                <Link 
                  key={item} 
                  to="/blog" 
                  className={`transition ${isLinkActive(item) ? 'text-accent font-bold' : 'hover:text-accent'}`}
                >
                  {item}
                </Link>
              ) : (
                <a 
                  key={item} 
                  href={getHref(item)} 
                  className={`transition ${isLinkActive(item) ? 'text-accent font-bold' : 'hover:text-accent'}`}
                >
                  {item}
                </a>
              )
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-full border border-white/10 text-white hover:text-accent hover:border-accent/40 transition"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a href="#contact" className="bg-gradient-to-r from-accent to-teal-500 text-primary px-6 py-2 rounded-full font-bold hover:shadow-[0_0_15px_rgba(0,212,255,0.5)] transition text-center">
              Hire Us
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-full border border-white/10 text-white hover:text-accent transition"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="text-white" onClick={() => setIsMenuOpen(true)}>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-primary z-[70] p-8 flex flex-col shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-white font-bold text-2xl tracking-tight font-display">CSA Menu</span>
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-white/60 hover:text-accent transition-colors p-2"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    {item === 'Blog' ? (
                      <Link 
                        to="/blog" 
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-2xl font-bold transition flex items-center gap-4 ${isLinkActive(item) ? 'text-accent' : 'text-white hover:text-accent'}`}
                      >
                        <span className="text-xs text-white/20 font-mono">0{index + 1}</span>
                        {item}
                      </Link>
                    ) : (
                      <a 
                        href={getHref(item)} 
                        onClick={() => setIsMenuOpen(false)} 
                        className={`text-2xl font-bold transition flex items-center gap-4 ${isLinkActive(item) ? 'text-accent' : 'text-white hover:text-accent'}`}
                      >
                        <span className="text-xs text-white/20 font-mono">0{index + 1}</span>
                        {item}
                      </a>
                    )}
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + menuItems.length * 0.05 }}
                  className="mt-8"
                >
                  <a 
                    href="#contact" 
                    onClick={() => setIsMenuOpen(false)} 
                    className="block w-full bg-accent text-primary px-8 py-4 rounded-2xl font-black text-center hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition duration-300"
                  >
                    Hire Our Team
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
