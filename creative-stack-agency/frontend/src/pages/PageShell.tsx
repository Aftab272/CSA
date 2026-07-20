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
    <div className="min-h-screen bg-primary text-white transition-colors duration-300">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <ProgressBar />
      <ScrollToTop />
      <Navbar />
      <main className="pt-24">{children}</main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
