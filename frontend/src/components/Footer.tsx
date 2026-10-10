import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, MapPin, Clock, MessageCircle, Linkedin,
  ExternalLink, MessageSquare, 
  Sun, Moon, Shield, Info, FileText, Scale, RotateCcw, X 
} from 'lucide-react';
import { 
  SiFacebook, SiInstagram, SiGithub, SiYoutube, 
  SiWhatsapp, SiFiverr, SiUpwork, SiTelegram, SiTiktok 
} from '@icons-pack/react-simple-icons';
import { motion, AnimatePresence } from 'motion/react';
import { socialPlatforms } from '../data/social';
const logoLight = "/logo.png";
const logoDark = "/logo-white.svg";

// Icon mapping helper for Social Icons (supports both iconName and platform name case-insensitively)
const SocialIcon = ({ name, platform, className }: { name?: string; platform?: string; className?: string }) => {
  const key = `${name || ''} ${platform || ''}`.toLowerCase();
  const cls = className || 'w-4 h-4';
  if (key.includes('facebook') || key.includes('fb')) return <SiFacebook className={cls} />;
  if (key.includes('instagram') || key.includes('insta')) return <SiInstagram className={cls} />;
  if (key.includes('linkedin')) return <Linkedin className={cls} />;
  if (key.includes('github') || key.includes('git')) return <SiGithub className={cls} />;
  if (key.includes('youtube') || key.includes('yt')) return <SiYoutube className={cls} />;
  if (key.includes('whatsapp') || key.includes('wa')) return <SiWhatsapp className={cls} />;
  if (key.includes('fiverr')) return <SiFiverr className={cls} />;
  if (key.includes('upwork')) return <SiUpwork className={cls} />;
  if (key.includes('telegram')) return <SiTelegram className={cls} />;
  if (key.includes('botim')) return <MessageSquare className={cls} />;
  if (key.includes('tiktok')) return <SiTiktok className={cls} />;
  return <SiGithub className={cls} />;
};

const getSocialColor = (name?: string, platform?: string) => {
  const key = `${name || ''} ${platform || ''}`.toLowerCase();
  if (key.includes('facebook')) return 'text-[#1877F2]';
  if (key.includes('instagram')) return 'text-[#E4405F]';
  if (key.includes('linkedin')) return 'text-[#0A66C2]';
  if (key.includes('github')) return 'text-gray-900 dark:text-white';
  if (key.includes('youtube')) return 'text-[#FF0000]';
  if (key.includes('whatsapp')) return 'text-[#25D366]';
  if (key.includes('fiverr')) return 'text-[#00b22d]';
  if (key.includes('upwork')) return 'text-[#14a800]';
  if (key.includes('telegram')) return 'text-[#0088cc]';
  if (key.includes('tiktok')) return 'text-black dark:text-white';
  return 'text-blue-500';
};

type LegalDocType = 'privacy' | 'terms' | 'cookie' | 'disclaimer' | 'refund' | null;

import { useAdmin } from '../context/AdminContext';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { footerData } = useAdmin();
  const { theme, toggleTheme } = useTheme();
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>(null);

  const isInternalLink = (url: string) => url.startsWith('/') || url.startsWith('#');
  const normalizeInternalUrl = (url: string) => (url.startsWith('#') ? `/${url}` : url);

  const displayQuickLinks = React.useMemo(() => {
    return [
      { id: '1', label: 'Home', url: '/' },
      { id: '2', label: 'About Agency', url: '/about' },
      { id: '3', label: 'Meet the Team', url: '/team' },
      { id: '4', label: 'Client Reviews', url: '/#reviews' },
      { id: '5', label: 'Blog & Insights', url: '/blog' },
      { id: '6', label: 'Get in Touch', url: '/contact' },
    ];
  }, []);

  const handleToggleTheme = () => {
    toggleTheme();
  };

  const getLegalTitle = (type: LegalDocType) => {
    switch (type) {
      case 'privacy': return 'Privacy Policy';
      case 'terms': return 'Terms & Conditions';
      case 'cookie': return 'Cookie Policy';
      case 'disclaimer': return 'Disclaimer Notice';
      case 'refund': return 'Refund Policy';
      default: return '';
    }
  };

  return (
    <footer 
      role="contentinfo"
      className={`relative border-t w-full transition-all duration-500 overflow-hidden font-sans ${
          theme === 'dark' 
            ? 'bg-primary text-white border-white/10' 
            : 'bg-[#f8fafc] text-gray-800 border-gray-200'
        }`}
      >
        {/* 1. Premium Gradient Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient-xy" />

        {/* Background Ambient Blur Blobs */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen hidden dark:block" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen hidden dark:block" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 relative z-10">
          
          {/* Modern Sleek Agency Footer Layout (Borderless, Unified Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-10">
            
            {/* Column 1: Brand & Identity (4 Columns) */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-3">
                {footerData.logoUrl && footerData.logoUrl !== '/logo.png' && footerData.logoUrl !== '/logo-white.png' ? (
                  <img loading="lazy" src={footerData.logoUrl} alt="Logo" className="w-12 h-12 object-contain" />
                ) : (
                  <img 
                    loading="lazy" 
                    src={theme === 'dark' ? logoDark : logoLight} 
                    alt="Creative Stack Agency" 
                    className="w-12 h-12 object-contain" 
                  />
                )}
                <div>
                  <span className="text-lg font-bold font-display tracking-tight text-gray-900 dark:text-white block">
                    Creative Stack <span className="text-blue-600 dark:text-accent">Agency</span>
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block">
                    Digital Excellence &amp; Systems
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-400 max-w-sm">
                {footerData.description}
              </p>

              {/* Social Channels Row */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                {footerData.socialLinks.map((platform) => (
                  <a
                    key={platform.id || platform.platform}
                    href={platform.url === '#' ? `https://${platform.platform.toLowerCase()}.com` : platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Creative Stack Agency on ${platform.platform}`}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200/80 dark:border-white/10 hover:scale-110 shadow-sm cursor-pointer"
                  >
                    <SocialIcon 
                      name={platform.iconName} 
                      platform={platform.platform}
                      className={`w-4 h-4 transition-all duration-300 ${getSocialColor(platform.iconName, platform.platform)}`} 
                    />
                  </a>
                ))}
              </div>

              {/* Theme Preference Pill */}
              <div className="pt-0.5">
                <button 
                  onClick={handleToggleTheme}
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border-gray-300/80 dark:border-white/10 text-gray-700 dark:text-gray-300 shadow-sm cursor-pointer"
                >
                  {theme === 'dark' ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-indigo-600" />}
                  <span className="capitalize">{theme} Mode</span>
                  <span className="text-[10px] opacity-60 ml-1">Toggle</span>
                </button>
              </div>
            </div>

            {/* Column 2: Quick Links (2 Columns) */}
            {footerData.sections.quicklinks && (
              <div className="lg:col-span-2 space-y-4">
                <h4 className="text-xs font-bold font-display uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-accent" />
                  <span>Quick Links</span>
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm">
                  {displayQuickLinks.map((link) => (
                    <li key={link.id}>
                      {isInternalLink(link.url) ? (
                        <Link
                          to={normalizeInternalUrl(link.url)}
                          className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-accent transition-all duration-200 inline-block hover:translate-x-1"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-accent transition-all duration-200 inline-block hover:translate-x-1"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Column 3: Services (2 Columns) */}
            {footerData.sections.services && (
              <div className="lg:col-span-2 space-y-4">
                <h4 className="text-xs font-bold font-display uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-accent" />
                  <span>Services</span>
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm">
                  {footerData.services.map((service) => (
                    <li 
                      key={service.id}
                      className="text-gray-600 dark:text-gray-400 cursor-default select-text"
                    >
                      {service.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Column 4: Projects (2 Columns) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-bold font-display uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-accent" />
                <span>Projects</span>
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {footerData.projects.map((project) => (
                  <li key={project.id}>
                    {isInternalLink(project.url) ? (
                      <Link
                        to={normalizeInternalUrl(project.url)}
                        className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-accent transition-all duration-200 inline-block hover:translate-x-1"
                      >
                        {project.label}
                      </Link>
                    ) : (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-accent transition-all duration-200 inline-block hover:translate-x-1"
                      >
                        {project.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <div className="pt-1">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-accent hover:underline"
                >
                  <span>View All Projects</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            </div>

            {/* Column 5: Contact Us (2 Columns) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-bold font-display uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-accent" />
                <span>Contact Us</span>
              </h4>
              <ul className="space-y-3 text-xs">
                <li className="flex items-start gap-2.5">
                  <MapPin className="shrink-0 text-blue-600 dark:text-accent mt-0.5" size={15} />
                  <a 
                    href="https://maps.google.com/?q=123+Agency+Way+New+York+NY" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-600 dark:hover:text-accent transition text-gray-600 dark:text-gray-400 leading-snug"
                  >
                    123 Agency Way, New York, NY
                  </a>
                </li>

                <li className="flex items-start gap-2.5">
                  <Mail className="shrink-0 text-blue-600 dark:text-accent mt-0.5" size={15} />
                  <div className="flex flex-col space-y-1 font-mono">
                    <a 
                      href="mailto:creativestackagency513@gmail.com" 
                      className="hover:text-blue-600 dark:hover:text-accent transition text-gray-600 dark:text-gray-400 break-all"
                    >
                      creativestackagency513@gmail.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <SiWhatsapp className="shrink-0 text-emerald-500 mt-0.5" size={14} />
                  <div className="flex flex-col space-y-1">
                    <a 
                      href="https://wa.me/923027434569" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-emerald-500 transition text-gray-600 dark:text-gray-400 font-medium"
                    >
                      WhatsApp (Aftab)
                    </a>
                    <a 
                      href="https://wa.me/923047556084" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-emerald-500 transition text-gray-600 dark:text-gray-400 font-medium"
                    >
                      WhatsApp (Maryam)
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-2.5 pt-1 text-gray-500 dark:text-gray-400">
                  <Clock className="shrink-0 text-blue-600 dark:text-accent mt-0.5" size={15} />
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Mon - Fri:</span> 9:00am – 6:00pm
                  </div>
                </li>
              </ul>
            </div>

          </div>

        {/* 4. Bottom sub-footer containing copyright notice & essential Legal links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          
          {/* Copyright description & Powered by */}
          <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
            <span className="font-medium text-gray-600 dark:text-gray-400">
              &copy; 2025–{new Date().getFullYear()} Creative Stack Agency. All Rights Reserved.
            </span>
            <span className="hidden sm:inline text-gray-300 dark:text-gray-700">•</span>
            <span className="font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
              Powered by <span className="font-bold text-blue-600 dark:text-accent">Team4Stack</span>
            </span>
          </div>

          {/* Clean essential legal links */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-medium">
            {[
              { path: '/privacy-policy', name: 'Privacy Policy' },
              { path: '/terms-and-conditions', name: 'Terms of Service' },
              { path: '/cookie-policy', name: 'Cookie Policy' },
              { path: '/refund-policy', name: 'Refund Policy' },
            ].map((doc) => (
              <Link
                key={doc.path}
                to={doc.path}
                className="text-gray-500 hover:text-blue-600 dark:hover:text-accent transition-colors duration-200"
              >
                {doc.name}
              </Link>
            ))}
          </div>

        </div>

      </div>

      {/* 5. Interactive Legal Policy Modals - Ensures links are fully workable */}
      <AnimatePresence>
        {activeLegalDoc && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-60 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-secondary border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] text-gray-100"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
                    {activeLegalDoc === 'privacy' && <Shield size={20} />}
                    {activeLegalDoc === 'terms' && <Scale size={20} />}
                    {activeLegalDoc === 'cookie' && <Info size={20} />}
                    {activeLegalDoc === 'disclaimer' && <FileText size={20} />}
                    {activeLegalDoc === 'refund' && <RotateCcw size={20} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">
                      {getLegalTitle(activeLegalDoc)}
                    </h3>
                    <p className="text-xs text-gray-400">Creative Stack Agency Legal Documents • Latest Update: July 2026</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveLegalDoc(null)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Document Content */}
              <div className="p-6 md:p-8 overflow-y-auto grow space-y-6 text-sm leading-relaxed text-gray-300">
                {activeLegalDoc === 'privacy' && (
                  <>
                    <h4 className="text-white font-bold text-base">1. Introduction &amp; Consent</h4>
                    <p>At Creative Stack Agency, we prioritize the confidentiality and safety of our customers' and visitors' data. This Privacy Policy details how we accumulate, utilize, disclose, and secure your personal details when you interact with our website, subscribe to our newsletters, or sign up for our professional training cohorts.</p>
                    <h4 className="text-white font-bold text-base">2. Information We Collect</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>Personal Credentials:</strong> Your name, email address, contact number, and professional details upon subscribing or registering.</li>
                      <li><strong>Device Data:</strong> IP addresses, browser specifications, operating systems, and page navigation logs through cookies.</li>
                      <li><strong>Payment Information:</strong> Secure tokens used to authorize premium subscriptions and course registration fees (processed via certified gateways).</li>
                    </ul>
                    <h4 className="text-white font-bold text-base">3. How We Use Information</h4>
                    <p>We process collected data to supply services, respond to customized inquiries, deliver course curricula, optimize web performance, track digital campaigns, and emit essential newsletter alerts. We do not sell or lease user credentials to third-party brokers.</p>
                    <h4 className="text-white font-bold text-base mt-6">4. Data Retention and Security Measures</h4>
                    <p>Creative Stack Agency adheres to the highest industry standards for data protection and cybersecurity. We utilize enterprise-grade encryption algorithms, including AES-256 and SSL/TLS protocols, to ensure that all data transmitted between your browser and our servers remains secure and impenetrable by unauthorized entities. Our cloud infrastructure is built on highly resilient and redundant architecture, guaranteeing maximum uptime and reliability while safeguarding your information against potential breaches. We strictly comply with global data protection regulations, including the GDPR (General Data Protection Regulation) and CCPA (California Consumer Privacy Act). By implementing rigorous access controls, multi-factor authentication for administrative accounts, and continuous vulnerability scanning, we maintain a secure environment for all user data. Data is retained only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, after which it is securely deleted or anonymized. We also conduct regular privacy impact assessments and employee training to foster a culture of privacy awareness throughout our organization.</p>
                    <h4 className="text-white font-bold text-base mt-6">5. Your Privacy Rights</h4>
                    <p>Depending on your jurisdiction, you possess specific rights regarding your personal information. These rights may include the right to access the personal data we hold about you, the right to request the correction of inaccurate or incomplete data, and the right to request the deletion of your personal information. You also have the right to object to the processing of your data for direct marketing purposes and the right to data portability, allowing you to obtain a copy of your data in a structured, machine-readable format. To exercise any of these rights, please contact our Data Protection Officer at privacy@creativestackagency.dev. We are committed to responding to all legitimate requests promptly and transparently, without any discrimination. Furthermore, you have the right to withdraw your consent at any time, where we rely on consent to process your personal data, although this will not affect the lawfulness of processing based on consent before its withdrawal.</p>
                    <h4 className="text-white font-bold text-base mt-6">6. Google AdSense &amp; Advertising Cookies</h4>
                    <p>We work with third-party vendors including Google to serve advertisements when you visit our website. Google uses cookies, including the DoubleClick DART cookie, to serve ads based on prior visits to our site or other websites on the internet. You can opt out of personalized ads by visiting <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Google Ads Settings</a> or <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">www.aboutads.info</a>.</p>
                  </>
                )}

                {activeLegalDoc === 'terms' && (
                  <>
                    <h4 className="text-white font-bold text-base">1. Acceptance of Terms</h4>
                    <p>By entering and browsing the Creative Stack Agency portal, you agree to comply with our Terms &amp; Conditions and intellectual property boundaries. If you do not accept these policies, you must restrict your browsing instantly.</p>
                    <h4 className="text-white font-bold text-base">2. Intellectual Property</h4>
                    <p>All design tokens, layout mockups, text blocks, code structures, logo assets, video courses, and graphic materials hosted under the CSA umbrella are proprietary creations of Creative Stack Agency. Unauthorized reproduction, modification, or redistribution is strictly prohibited.</p>
                    <h4 className="text-white font-bold text-base">3. Professional Training Policy</h4>
                    <p>Registered course students are provided single-user licenses to view curriculum resources. Class recordings, code bases, and training credentials cannot be shared with secondary parties. Creative Stack Agency reserves the right to terminate access for violating student conduct.</p>
                    <h4 className="text-white font-bold text-base mt-6">4. User Conduct and Responsibilities</h4>
                    <p>As a user of the Creative Stack Agency website and its associated services, you agree to engage with our platform in a lawful, respectful, and ethical manner. You are strictly prohibited from utilizing our website to distribute malicious software, engage in unauthorized data scraping, attempt unauthorized access to our secure servers, or participate in any activity that could disrupt or impair the functionality of our digital infrastructure. Furthermore, any attempt to reverse engineer our proprietary codebases, exploit security vulnerabilities, or conduct unauthorized penetration testing will result in immediate termination of access and potential legal action. We expect all users, including those participating in our training cohorts and community forums, to maintain professional decorum, refrain from harassment, and respect the diverse perspectives of our global community. Failure to adhere to these standards constitutes a material breach of these Terms and Conditions.</p>
                    <h4 className="text-white font-bold text-base mt-6">5. Limitation of Liability and Indemnification</h4>
                    <p>To the maximum extent permitted by applicable law, Creative Stack Agency, its affiliates, directors, employees, and agents shall not be held liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising out of or in connection with your use of our website, services, or educational materials. This includes, but is not limited to, damages for loss of profits, goodwill, data, or other intangible losses, resulting from system failures, unauthorized access to your transmissions, or reliance on information provided on our platform. You agree to indemnify, defend, and hold harmless Creative Stack Agency from any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) that such parties may incur as a result of or arising from your violation of these Terms, your misuse of our services, or your infringement of any intellectual property or privacy rights of a third party.</p>

                  </>
                )}

                {activeLegalDoc === 'cookie' && (
                  <>
                    <h4 className="text-white font-bold text-base">1. What Are Cookies?</h4>
                    <p>Cookies are minute text fragments stored on your local browser by servers. They help websites retrieve state preferences, remember subscription logs, and analyze traffic volumes.</p>
                    <h4 className="text-white font-bold text-base">2. How We Employ Cookies</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>Essential Cookies:</strong> Vital for user authentication, security, and accessing custom portals.</li>
                      <li><strong>Performance &amp; Analytics:</strong> Monitors bounce rates, visitor sessions, and module engagement via services such as Google Analytics.</li>
                      <li><strong>Preference Customizer:</strong> Remembers your light/dark mode selection so the site displays correctly upon return.</li>
                    </ul>
                    <h4 className="text-white font-bold text-base">3. Managing Settings</h4>
                    <p>You can choose to disable cookies through your personal browser's settings panels. However, please note that turning off cookies may limit some features of the Creative Stack Agency workspace.</p>
                    <h4 className="text-white font-bold text-base mt-6">4. Third-Party Cookies and Tracking Technologies</h4>
                    <p>In addition to our proprietary cookies, Creative Stack Agency integrates selectively with trusted third-party partners to enhance the functionality and analytical capabilities of our website. These partners, which may include analytics providers, advertising networks, and social media platforms, may set their own cookies on your device when you interact with our content. For instance, we utilize Google Analytics to gather anonymized data regarding website traffic patterns, user engagement metrics, and conversion rates. This data empowers us to optimize our user interface, refine our content strategy, and deliver a more personalized browsing experience. Please note that these third-party cookies are governed by the respective privacy policies of the providing organizations. We recommend reviewing the privacy and cookie policies of these external partners to fully understand how your data is processed and utilized across different digital ecosystems.</p>
                    <h4 className="text-white font-bold text-base mt-6">5. Detailed Control Over Your Cookie Preferences</h4>
                    <p>We respect your right to privacy and offer robust mechanisms for controlling your cookie preferences. Upon your initial visit to our website, you are presented with a cookie consent banner that allows you to accept all cookies, reject non-essential cookies, or customize your preferences based on specific cookie categories (e.g., functional, analytical, marketing). You can revisit and modify these preferences at any time by accessing the 'Cookie Settings' link located in our website footer. Additionally, most modern web browsers provide built-in controls that allow you to block or delete cookies entirely. However, we advise caution when employing these global browser settings, as indiscriminately blocking all cookies may impede the functionality of our website and restrict access to specific features, such as personalized dashboards and secure user portals. For comprehensive guidance on managing cookies across various browsers, please consult the official support documentation provided by your browser's developer.</p>

                  </>
                )}

                {activeLegalDoc === 'disclaimer' && (
                  <>
                    <h4 className="text-white font-bold text-base">1. No Financial or Professional Guarantee</h4>
                    <p>All informational assets, articles, blogs, tools, and technical courses supplied by Creative Stack Agency are meant for educational and demonstrational purposes only. We make no specific promises of financial gain, job employment, or revenue increases.</p>
                    <h4 className="text-white font-bold text-base">2. Accuracy &amp; Liability</h4>
                    <p>While we strive to keep technical codes, marketing methodologies, and tutorial scripts accurate, technology is continuously evolving. We assume no legal responsibility for technical errors, database failures, or digital losses resulting from implementing agency codes or templates.</p>
                  </>
                )}

                {activeLegalDoc === 'refund' && (
                  <>
                    <h4 className="text-white font-bold text-base">1. Professional Development Services</h4>
                    <p>Due to the customized nature of custom software engineering, website development, branding blueprints, and UI/UX case studies, initial design deposits are non-refundable once engineering phases commence.</p>
                    <h4 className="text-white font-bold text-base">2. Course Tuition Refunds</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>Cancellation before Cohort Starts:</strong> Full tuition refund up to 7 days prior to course launch.</li>
                      <li><strong>Mid-course withdrawals:</strong> Refundable on a pro-rata basis if requested within the first 48 hours of instruction. No refunds thereafter.</li>
                    </ul>
                    <p>Please send all clear refund inquiries with verified receipts to <a href="mailto:info@creativestack.agency" className="text-accent underline font-mono">info@creativestack.agency</a>.</p>
                  </>
                )}
              </div>

              {/* Close Button Footer */}
              <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end shrink-0">
                <button
                  onClick={() => setActiveLegalDoc(null)}
                  className="relative overflow-hidden group/btn px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm rounded-xl hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all transform hover:-translate-y-0.5"
                >
                  <span className="relative z-10">Close Document</span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
