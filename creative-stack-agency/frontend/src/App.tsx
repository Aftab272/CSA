/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProgressBar from './components/ProgressBar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import ReviewsSection from './components/ReviewsSection';
import ContactSection from './components/ContactSection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Projects from './components/Projects';
import FloatingContact from './components/FloatingContact';
import LoadingScreen from './components/LoadingScreen';
import BlogSection from './components/BlogSection';
import ScrollToTop from './components/ScrollToTop';
import { AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { AdminProvider, useAdmin } from './context/AdminContext';
import AdContainer from './components/AdContainer';
import Analytics from './components/Analytics';


import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
import BlogHome from './pages/BlogHome';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsAndConditions from './pages/legal/TermsAndConditions';
import Disclaimer from './pages/legal/Disclaimer';
import CookiePolicy from './pages/legal/CookiePolicy';
import RefundPolicy from './pages/legal/RefundPolicy';
import CancellationPolicy from './pages/legal/CancellationPolicy';
import CopyrightPolicy from './pages/legal/CopyrightPolicy';
import AcceptableUsePolicy from './pages/legal/AcceptableUsePolicy';
import TeamPage from './pages/TeamPage';
import CoursesPage from './pages/CoursesPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function RouteScrollReset() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { footerData, seoData } = useAdmin();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
      <div className="min-h-screen bg-primary text-white transition-colors duration-300">
      <Helmet>
        <title>{seoData.siteTitle}</title>
        <meta name="description" content={seoData.metaDescription} />
        <meta name="keywords" content={seoData.metaKeywords} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={seoData.siteTitle} />
        <meta property="og:description" content={seoData.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.siteTitle} />
        <meta name="twitter:description" content={seoData.metaDescription} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Creative Stack Agency",
            "url": window.location.href,
            "logo": footerData.logoUrl || "",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": footerData.contactInfo.phone,
              "contactType": "customer service"
            }
          })}
        </script>
      </Helmet>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      <Analytics />
      
      <ProgressBar />
      <ScrollToTop />
      <Navbar />
      <Hero />
      <div className="max-w-7xl mx-auto px-6"><AdContainer id="ad-below-hero" /></div>
      <Services />
      <About />
      <div className="max-w-7xl mx-auto px-6"><AdContainer id="ad-between-sections-1" /></div>
      <Projects />
      <ReviewsSection />
      <ContactSection />
      <BlogSection />
      {footerData.sections.newsletter && <Newsletter />}
      <Footer />
      <FloatingContact />
      </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <BlogProvider>
        <Router>
          <RouteScrollReset />
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/admin/login/*" element={<AdminDashboardPage />} />
            <Route path="/admin/*" element={<AdminDashboardPage />} />
            <Route path="/blog" element={<BlogHome />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/cancellation-policy" element={<CancellationPolicy />} />
            <Route path="/copyright-policy" element={<CopyrightPolicy />} />
            <Route path="/acceptable-use-policy" element={<AcceptableUsePolicy />} />
          </Routes>
        </Router>
      </BlogProvider>
    </AdminProvider>
  );
}
