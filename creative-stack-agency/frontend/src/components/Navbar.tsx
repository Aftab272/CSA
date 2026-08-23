import { useState, useEffect, type MouseEvent } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'Home', to: '/', kind: 'section', sectionId: 'home' },
  { label: 'About', to: '/#about', kind: 'section', sectionId: 'about' },
  { label: 'Services', to: '/#services', kind: 'section', sectionId: 'services' },
  { label: 'Projects', to: '/#projects', kind: 'section', sectionId: 'projects' },
  { label: 'Team', to: '/#team', kind: 'section', sectionId: 'team' },
  { label: 'Team4Stack', to: '/#team4stack', kind: 'section', sectionId: 'team4stack' },
  { label: 'Contact', to: '/#contact', kind: 'section', sectionId: 'contact' },
  { label: 'Courses', to: '/courses', kind: 'page' },
  { label: 'Blog', to: '/blog', kind: 'page' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', '/');
      return;
    }

    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `/#${sectionId}`);
    }
  };

  const handleMenuItemClick = (
    event: MouseEvent<HTMLAnchorElement>,
    item: (typeof menuItems)[number]
  ) => {
    setIsMenuOpen(false);
    if (item.kind !== 'section') return;

    event.preventDefault();
    if (location.pathname !== '/') {
      navigate(item.sectionId === 'home' ? '/' : `/#${item.sectionId}`);
      return;
    }

    scrollToSection(item.sectionId);
  };

  const handleHireUsClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setIsMenuOpen(false);
    event.preventDefault();

    if (location.pathname !== '/') {
      navigate('/#contact');
      return;
    }

    scrollToSection('contact');
  };
  const isLinkActive = (item: (typeof menuItems)[number]) => {
    if (item.kind === 'section') {
      if (location.pathname !== '/') return false;
      if (item.sectionId === 'home') return location.hash === '' || location.hash === '#home';
      return location.hash === `#${item.sectionId}`;
    }

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

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return;
    const sectionId = location.hash.replace('#', '');
    const timer = window.setTimeout(() => {
      scrollToSection(sectionId);
    }, 50);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-sans px-4 md:px-8 py-4 ${isScrolled ? 'bg-primary/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' : 'bg-transparent'}`}>
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white text-xl md:text-2xl font-bold font-display hover:text-accent transition duration-300">
            CSA
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-8 text-white font-medium text-sm">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={(event) => handleMenuItemClick(event, item)}
                className={`transition-all duration-300 relative group ${isLinkActive(item) ? 'text-white' : 'text-gray-300 hover:text-white'}`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-accent transition-all duration-300 ${isLinkActive(item) ? 'w-full shadow-[0_0_10px_rgba(37,99,235,0.8)]' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/#contact"
              onClick={handleHireUsClick}
              className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-2.5 rounded-full font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300 text-center transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">Hire Us</span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-3">
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-primary z-70 p-8 flex flex-col shadow-2xl overflow-y-auto"
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
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      to={item.to}
                      onClick={(event) => handleMenuItemClick(event, item)}
                      className={`text-2xl font-bold transition flex items-center gap-4 ${isLinkActive(item) ? 'text-accent' : 'text-white hover:text-accent'}`}
                    >
                      <span className="text-xs text-white/20 font-mono">0{index + 1}</span>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + menuItems.length * 0.05 }}
                  className="mt-8"
                >
                  <Link
                    to="/#contact"
                    onClick={handleHireUsClick}
                    className="block w-full bg-accent text-primary px-8 py-4 rounded-2xl font-black text-center hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition duration-300"
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
