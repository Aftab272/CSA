import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const LegalLayout: React.FC<LegalLayoutProps> = ({ title, lastUpdated, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-primary text-gray-900 dark:text-white font-sans transition-colors duration-300">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors mb-8 font-bold group text-sm"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>

            <h1 className="text-3xl md:text-5xl font-extrabold font-display mb-4 text-gray-900 dark:text-white">
              {title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-10 italic text-sm">Last Updated: {lastUpdated}</p>
            
            <div className="prose prose-slate dark:prose-invert prose-lg max-w-none text-gray-800 dark:text-gray-200 prose-headings:text-blue-600 dark:prose-headings:text-cyan-400 prose-a:text-blue-600 dark:prose-a:text-cyan-400">
              {children}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalLayout;
