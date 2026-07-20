import React, { createContext, useContext, useState, useEffect } from 'react';

type SectionVisibility = {
  newsletter: boolean;
  quicklinks: boolean;
  services: boolean;
  contact: boolean;
  social: boolean;
  legal: boolean;
};

type FooterData = {
  logoUrl: string | null;
  description: string;
  quickLinks: { id: string; label: string; url: string }[];
  services: { id: string; label: string; url: string }[];
  courses: { id: string; label: string; url: string }[];
  projects: { id: string; label: string; url: string }[];
  legalLinks: { id: string; label: string; url: string }[];
  contactInfo: { email: string; phone: string; address: string; hours: string };
  socialLinks: { id: string; platform: string; url: string; enabled: boolean }[];
  copyrightText: string;
  sections: SectionVisibility;
};

const defaultFooterData: FooterData = {
  logoUrl: null,
  description: "We are a creative digital agency providing modern web solutions to help your business grow online.",
  quickLinks: [
    { id: '1', label: 'Home', url: '/' },
    { id: '2', label: 'About', url: '/#about' },
    { id: '3', label: 'Services', url: '/#services' },
    { id: '4', label: 'Projects', url: '/#projects' },
    { id: '5', label: 'Contact', url: '/#contact' },
    { id: '6', label: 'Blog', url: '/blog' },
  ],
  services: [
    { id: '1', label: 'Web Development', url: '/#services' },
    { id: '2', label: 'UI/UX Design', url: '/#services' },
    { id: '3', label: 'Digital Marketing', url: '/#services' },
    { id: '4', label: 'Branding', url: '/#services' },
  ],
  courses: [
    { id: '1', label: 'Frontend Mastery', url: '/courses' },
    { id: '2', label: 'Backend Architecture', url: '/courses' },
    { id: '3', label: 'UI/UX Fundamentals', url: '/courses' },
    { id: '4', label: 'Full Stack Development', url: '/courses' },
  ],
  projects: [
    { id: '1', label: 'E-commerce', url: '/#projects' },
    { id: '2', label: 'Corporate', url: '/#projects' },
    { id: '3', label: 'Startups', url: '/#projects' },
    { id: '4', label: 'Education', url: '/#projects' },
  ],
  legalLinks: [
    { id: '1', label: 'Privacy Policy', url: '#privacy' },
    { id: '2', label: 'Terms of Service', url: '#terms' },
    { id: '3', label: 'Cookie Policy', url: '#cookie' },
  ],
  contactInfo: {
    email: 'contact@creativestackagency.com',
    phone: '+92 (300) 000-0000',
    address: '123 Innovation Drive, Tech City, TC 10010',
    hours: 'Mon - Fri: 9:00 AM - 6:00 PM',
  },
  socialLinks: [
    { id: '1', platform: 'Facebook', url: '#', enabled: true },
    { id: '2', platform: 'Instagram', url: '#', enabled: true },
    { id: '3', platform: 'LinkedIn', url: '#', enabled: true },
    { id: '4', platform: 'GitHub', url: '#', enabled: true },
  ],
  copyrightText: '© {year} Creative Stack Agency. All Rights Reserved.',
  sections: {
    newsletter: true,
    quicklinks: true,
    services: true,
    contact: true,
    social: true,
    legal: true,
  },
};

type SeoData = {
  siteTitle: string;
  metaDescription: string;
  metaKeywords: string;
};

const defaultSeoData: SeoData = {
  siteTitle: 'Creative Stack Agency | Modern Digital Solutions',
  metaDescription: 'Creative Stack Agency delivers next-generation web & mobile engineering, premium brand aesthetics, customized AI automations, and elite tech training globally.',
  metaKeywords: 'web development, software engineering, digital marketing, AI automation, branding, UI/UX design, mobile apps'
};

type AdminContextType = {
  footerData: FooterData;
  setFooterData: React.Dispatch<React.SetStateAction<FooterData>>;
  seoData: SeoData;
  setSeoData: React.Dispatch<React.SetStateAction<SeoData>>;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [footerData, setFooterData] = useState<FooterData>(() => {
    const saved = localStorage.getItem('csa_footer_data');
    if (saved) {
      try {
        return { ...defaultFooterData, ...JSON.parse(saved) };
      } catch (e) {
        return defaultFooterData;
      }
    }
    return defaultFooterData;
  });

  const [seoData, setSeoData] = useState<SeoData>(() => {
    const saved = localStorage.getItem('csa_seo_data');
    if (saved) {
      try {
        return { ...defaultSeoData, ...JSON.parse(saved) };
      } catch (e) {
        return defaultSeoData;
      }
    }
    return defaultSeoData;
  });

  useEffect(() => {
    localStorage.setItem('csa_footer_data', JSON.stringify(footerData));
  }, [footerData]);

  useEffect(() => {
    localStorage.setItem('csa_seo_data', JSON.stringify(seoData));
  }, [seoData]);

  return (
    <AdminContext.Provider value={{ footerData, setFooterData, seoData, setSeoData }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
