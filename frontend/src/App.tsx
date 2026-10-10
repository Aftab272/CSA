/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProgressBar from './components/ProgressBar';
import Hero from './components/Hero';
import Services from './components/Services';
import Courses from './components/Courses';
import About from './components/About';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import Projects from './components/Projects';
import FloatingContact from './components/FloatingContact';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import { AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { AdminProvider, useAdmin } from './context/AdminContext';
import AdContainer from './components/AdContainer';
import Analytics from './components/Analytics';
import CustomCursor from './components/CustomCursor';
import CookieConsentBanner from './components/CookieConsentBanner';
import { Rocket, Sparkles, ShieldCheck, Zap, ArrowRight, Code2, CheckCircle2 } from 'lucide-react';


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
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
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
      <div className="min-h-screen bg-primary text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
        <CustomCursor />
        {/* Dynamic Animated Background Mesh */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/5 dark:bg-indigo-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      <Helmet>
        <title>{seoData.siteTitle}</title>
        <meta name="description" content={seoData.metaDescription} />
        <link rel="canonical" href={window.location.href} />
        <link rel="icon" type="image/svg+xml" href="/logo-white.svg?v=white4" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png?v=white4" />
        <link rel="shortcut icon" href="/favicon.ico?v=white4" />
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
            "logo": footerData.logoUrl || "https://creativestackagency.dev/logo.png",
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
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6"><AdContainer id="ad-below-hero" /></div>
      <Services limit={3} showExploreLink={true} />
      <About />
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6"><AdContainer id="ad-between-sections-1" /></div>
      <Projects limit={3} showExploreLink={true} />
      <Courses limit={3} showExploreLink={true} />
      <ReviewsSection />

      {/* High-Impact Project Consultation CTA Banner */}
      <section className="relative py-12 sm:py-20 px-3.5 sm:px-6 lg:px-8 overflow-hidden font-sans">
        <div className="max-w-7xl mx-auto relative rounded-2xl sm:rounded-3xl overflow-hidden p-5 sm:p-10 lg:p-14 bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-white dark:from-blue-950/70 dark:via-indigo-950/60 dark:to-[#0c1222] border border-blue-200/80 dark:border-blue-500/30 backdrop-blur-xl shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-300">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, Subtext & Action Buttons */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <span className="px-3.5 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-cyan-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-blue-500/20 dark:border-blue-500/30 inline-block">
                Let's Build Something Great
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-gray-900 dark:text-white tracking-tight leading-tight">
                Ready to Turn Your Vision Into Reality?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                Whether you need a high-performance web platform, modern mobile application, or tailored tech mentorship, our squad is ready to deliver.
              </p>
              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start w-full max-w-md mx-auto lg:mx-0">
                <a
                  href="/contact"
                  className="w-full sm:w-auto py-3.5 px-6 sm:px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <span>Start a Conversation</span>
                  <ArrowRight size={16} />
                </a>
                <a
                  href="/team"
                  className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <span>Meet Our Experts</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* Right Column: Dynamic Tech & Stats Icon Showcase */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="w-full relative max-w-md">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl transform -rotate-2"></div>
                
                <div className="relative bg-white/80 dark:bg-slate-900/80 border border-blue-200 dark:border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl dark:shadow-2xl backdrop-blur-md space-y-4">
                  {/* Top Header Badge */}
                  <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                        <Rocket size={24} className="animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white font-display">Creative Stack Agency</h4>
                        <p className="text-xs text-blue-600 dark:text-cyan-400 font-semibold">Agile Engineering Squad</p>
                      </div>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  </div>

                  {/* Feature Badges Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-2xl bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/5 space-y-1">
                      <div className="flex items-center gap-1.5 text-blue-600 dark:text-cyan-400">
                        <Zap size={15} />
                        <span className="text-[11px] font-extrabold uppercase">Turnaround</span>
                      </div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">2-4 Weeks Fast Track</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-white/5 border border-indigo-100 dark:border-white/5 space-y-1">
                      <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                        <ShieldCheck size={15} />
                        <span className="text-[11px] font-extrabold uppercase">Quality</span>
                      </div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">Enterprise Standards</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-purple-50 dark:bg-white/5 border border-purple-100 dark:border-white/5 space-y-1">
                      <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                        <Code2 size={15} />
                        <span className="text-[11px] font-extrabold uppercase">Tech Stack</span>
                      </div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">React 19 &amp; Cloud Native</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-white/5 border border-emerald-100 dark:border-white/5 space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                        <Sparkles size={15} />
                        <span className="text-[11px] font-extrabold uppercase">Rating</span>
                      </div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">5.0 ★ Client Praise</p>
                    </div>
                  </div>

                  {/* Guaranteed Metrics Footer */}
                  <div className="pt-2 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 size={13} className="text-emerald-500" />
                      100% On-Time Delivery
                    </span>
                    <span>PKR / USD Flexible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
          <CookieConsentBanner />
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/contact" element={<ContactPage />} />
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
