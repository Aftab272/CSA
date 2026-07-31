import type { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';
import ScrollToTop from '../components/ScrollToTop';
import FloatingContact from '../components/FloatingContact';

type PageShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function PageShell({ title, description, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-primary text-white transition-colors duration-300 relative overflow-hidden">
      {/* Dynamic Animated Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden dark:block">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      
      <div className="relative z-10">
        <ProgressBar />
        <ScrollToTop />
        <Navbar />
        <main className="pt-24">{children}</main>
        <Footer />
        <FloatingContact />
      </div>
    </div>
  );
}
