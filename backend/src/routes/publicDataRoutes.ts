import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export const publicDataRouter = Router();

// Fallback seed data if Supabase tables are not migrated or query fails
export const fallbackServices = [
  {
    _id: 'srv-1',
    id: 1,
    title: 'Full-Stack Web Engineering',
    category: 'Engineering',
    description: 'High-performance, scalable web applications engineered with React 19, Next.js, Node.js, and cloud-native serverless architecture.',
    benefits: ['Enterprise scalability & 99.9% uptime', 'Sub-second page speeds & SEO dominance', 'End-to-end security & strict CSP standards'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    _id: 'srv-2',
    id: 2,
    title: 'Enterprise AI & Autonomous Agents',
    category: 'AI & Machine Learning',
    description: 'Custom AI integration, LLM fine-tuning, retrieval-augmented generation (RAG), and autonomous agent workflows tailored to your business operations.',
    benefits: ['Automated business workflows & CRM intelligence', 'Custom LLM agents powered by Gemini & OpenAI', 'Secure, private enterprise data pipelines'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    _id: 'srv-3',
    id: 3,
    title: 'Cross-Platform Mobile Apps',
    category: 'Mobile',
    description: 'Native-feel, silky-smooth mobile applications for iOS and Android built using Flutter and React Native with offline-first sync.',
    benefits: ['Unified codebase with native performance', 'Interactive micro-animations & sleek UI', 'Seamless App Store & Google Play deployments'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    _id: 'srv-4',
    id: 4,
    title: 'UI/UX & Product Design Systems',
    category: 'Design',
    description: 'Human-centered, conversion-focused UI/UX design. We design scalable design systems, interactive prototypes, and high-converting user journeys.',
    benefits: ['Pixel-perfect Figma design systems', 'Proven user retention & higher conversion', 'Comprehensive light and dark mode tokens'],
    image: 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    _id: 'srv-5',
    id: 5,
    title: 'Cloud Architecture & DevOps',
    category: 'Cloud',
    description: 'Robust cloud infrastructure on AWS and Google Cloud, automated CI/CD pipelines, Docker containerization, and zero-downtime deployments.',
    benefits: ['Automated Docker & Kubernetes clusters', 'Continuous integration & rapid delivery', 'Cost-optimized cloud resource allocation'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    _id: 'srv-6',
    id: 6,
    title: 'Custom E-Commerce Solutions',
    category: 'E-Commerce',
    description: 'High-converting custom e-commerce stores, headless Shopify architectures, and multi-currency payment gateway integrations.',
    benefits: ['Lightning-fast product catalog search', 'Global multi-currency checkout gateways', 'Comprehensive inventory & analytics integration'],
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
];

export const fallbackProjects = [
  {
    _id: 'prj-1',
    id: 1,
    title: 'Nexus AI Analytics Suite',
    category: 'Artificial Intelligence',
    shortDescription: 'Enterprise real-time predictive analytics dashboard with multi-model AI forecasting.',
    description: 'Nexus AI provides enterprise organizations with instant insights from millions of data points, featuring automated anomaly detection and interactive visualizations.',
    techStack: {
      frontend: ['React 19', 'TypeScript', 'TailwindCSS'],
      backend: ['Node.js', 'Express', 'Gemini AI API'],
      database: ['Supabase Postgres', 'TimescaleDB'],
      deployment: ['Docker', 'AWS'],
      other: ['WebSocket', 'Chart.js'],
    },
    features: ['Live telemetry streaming', 'Multi-tenant team management', 'Automated executive summary generation'],
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    ],
    liveUrl: 'https://creativestackagency.dev',
    isPublished: true,
  },
  {
    _id: 'prj-2',
    id: 2,
    title: 'Apex Cloud CRM & Workflow Engine',
    category: 'Web App',
    shortDescription: 'High-throughput customer relationship platform with automated pipeline orchestration.',
    description: 'Apex Cloud CRM centralizes sales leads, communication logs, and customer health metrics into a singular real-time workspace.',
    techStack: {
      frontend: ['Next.js', 'React', 'TailwindCSS'],
      backend: ['Node.js', 'Express', 'JWT'],
      database: ['PostgreSQL', 'Redis'],
      deployment: ['Vercel', 'Google Cloud'],
      other: ['OAuth2', 'Stripe'],
    },
    features: ['Kanban sales pipeline', 'Instant email sync', 'Automated recurring billing'],
    gallery: [
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    ],
    liveUrl: 'https://creativestackagency.dev',
    isPublished: true,
  },
  {
    _id: 'prj-3',
    id: 3,
    title: 'Lumina Telehealth Mobile Platform',
    category: 'Mobile',
    shortDescription: 'HIPAA-compliant telemedicine app with HD video consultations and prescription records.',
    description: 'Lumina connects patients with board-certified physicians in under 3 minutes with encrypted video rooms and medical history access.',
    techStack: {
      frontend: ['Flutter', 'Dart', 'Bloc'],
      backend: ['Node.js', 'WebRTC'],
      database: ['Supabase', 'Cloud Storage'],
      deployment: ['App Store', 'Google Play'],
      other: ['WebRTC', 'AES-256'],
    },
    features: ['Encrypted video calling', 'Electronic prescription generation', 'Digital health calendar'],
    gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    ],
    liveUrl: 'https://creativestackagency.dev',
    isPublished: true,
  },
  {
    _id: 'prj-4',
    id: 4,
    title: 'Vanguard Global Fintech Exchange',
    category: 'Fintech',
    shortDescription: 'Multi-asset trading and currency exchange engine with sub-millisecond execution.',
    description: 'Vanguard facilitates instant cross-border settlement and real-time liquidity pooling for institutional and retail traders.',
    techStack: {
      frontend: ['React', 'TypeScript', 'TailwindCSS'],
      backend: ['Go', 'Node.js', 'Express'],
      database: ['PostgreSQL', 'Redis'],
      deployment: ['AWS Fargate', 'Cloudflare'],
      other: ['Fix Protocol', 'WebSockets'],
    },
    features: ['Low latency order matching', 'Multi-currency cold storage', 'Real-time candlestick charts'],
    gallery: [
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    ],
    liveUrl: 'https://creativestackagency.dev',
    isPublished: true,
  },
];

export const fallbackTeam = [
  {
    _id: 'tm-1',
    id: 1,
    name: 'M.Sami Ullah',
    position: 'Full Stack Developer · Team Lead & Client Manager',
    role: 'Team Leader',
    experience: '5+ Years',
    rating: 5,
    testimonial: 'Sami leads the team and communicates directly with clients to understand their requirements. He designs system architecture, oversees deployments, and mentors the team. Alongside leadership, he actively writes code to ensure smooth and timely project delivery.',
    image: 'https://res.cloudinary.com/z6sk8xam/image/upload/v1791571654/fi3dmmdk8xed5zbkew3s.png',
    intro: 'Sami leads the team and communicates directly with clients to understand their requirements. He designs system architecture, oversees deployments, and mentors the team. Alongside leadership, he actively writes code to ensure smooth and timely project delivery.',
    education: 'BS Computer Science (5th Semester) – COMSATS University Islamabad',
    projects: '30+ Production Applications',
    achievements: 'Architected and launched enterprise systems with 99.8% uptime and scalable cloud infrastructure.',
    skills: ['React.js', 'Next.js', 'Node.js', 'Express', 'System Architecture', 'Supabase'],
    certificates: ['Full Stack Systems Architect', 'Enterprise Cloud & DevOps'],
    social: {
      email: 'sami@creativestackagency.dev',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
    portfolio: 'https://creativestackagency.dev',
    isActive: true,
  },
  {
    _id: 'tm-2',
    id: 2,
    name: 'M. Aftab Akram',
    position: 'Full Stack Developer · (Deployment & Integration)',
    role: 'Full Stack Developer',
    experience: '4+ Years',
    rating: 5,
    testimonial: 'Aftab specializes in modern full-stack development, continuous integration, cloud deployments, server optimization, and seamless third-party API architectures.',
    image: 'https://res.cloudinary.com/z6sk8xam/image/upload/v1791571656/coewr6c0n33uytwifryt.png',
    intro: 'Aftab specializes in modern full-stack development, continuous integration, cloud deployments, server optimization, and seamless third-party API architectures.',
    education: 'Bachelor of Science in Computer Science',
    projects: '25+ Web & Cloud Projects',
    achievements: 'Automated CI/CD deployment pipelines reducing release turnaround time by 60%.',
    skills: ['Full Stack Web', 'Cloud Deployments', 'CI/CD', 'Next.js', 'Node.js', 'REST APIs'],
    certificates: ['Cloud DevOps Specialist', 'Modern Full-Stack Engineering'],
    social: {
      github: 'https://github.com/Aftab272',
      linkedin: 'https://www.linkedin.com/in/aftab-akram-3a297b407',
    },
    portfolio: 'https://github.com/Aftab272',
    isActive: true,
  },
  {
    _id: 'tm-3',
    id: 3,
    name: 'Fiaz Ahmad',
    position: 'Full Stack Developer · Backend, QA & Finance Manager',
    role: 'Full Stack Developer',
    experience: '4+ Years',
    rating: 5,
    testimonial: 'Fiaz ensures bulletproof backend architecture, rigorous quality assurance, API security, and streamlined operational execution across client deliverables.',
    image: 'https://res.cloudinary.com/z6sk8xam/image/upload/v1791571658/bhw6qkd9iakzpxdaly2z.png',
    intro: 'Fiaz ensures bulletproof backend architecture, rigorous quality assurance, API security, and streamlined operational execution across client deliverables.',
    education: 'Bachelor of Science in Computer Science',
    projects: '20+ Enterprise Backends',
    achievements: 'Engineered zero-defect backend services and automated test coverage across production portals.',
    skills: ['Backend Architecture', 'QA & Testing', 'PostgreSQL', 'API Security', 'Node.js', 'Finance Ops'],
    certificates: ['QA Automation Specialist', 'Backend Security Professional'],
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
    portfolio: 'https://creativestackagency.dev',
    isActive: true,
  },
  {
    _id: 'tm-4',
    id: 4,
    name: 'M. Hasnain',
    position: 'Full Stack Developer · Frontend Lead',
    role: 'Frontend Lead',
    experience: '4+ Years',
    rating: 5,
    testimonial: 'Hasnain leads frontend engineering, crafting pixel-perfect, hyper-responsive UI/UX, and robust React/Next.js client applications.',
    image: 'https://res.cloudinary.com/z6sk8xam/image/upload/v1791571661/isjb7s3h9inxrsyruugu.png',
    intro: 'Hasnain leads frontend engineering, crafting pixel-perfect, hyper-responsive UI/UX, and robust React/Next.js client applications.',
    education: 'Bachelor of Science in Computer Science',
    projects: '28+ High-Performance Frontends',
    achievements: 'Architected award-winning interactive interfaces with sub-second initial load speeds.',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Motion Animation', 'UI/UX Design'],
    certificates: ['Advanced Frontend Engineering', 'Meta UI/UX Design'],
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
    portfolio: 'https://creativestackagency.dev',
    isActive: true,
  },
];

export const fallbackCourses = [
  {
    _id: 'crs-etsy',
    id: 101,
    title: 'Etsy Digital Products Mastery',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    duration: '4 Weeks',
    level: 'Beginner' as const,
    instructor: {
      name: 'Creative Stack Agency Faculty',
      designation: 'Etsy & Digital Products Mentors',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200',
    },
    syllabus: [
      'MODULE 1: Introduction to Etsy & Marketplace Basics',
      'MODULE 2: Shop Creation & Brand Identity Setup',
      'MODULE 3: Payoneer, Bank & Payment Methods',
      'MODULE 4: Digital Product Research & Niches',
      'MODULE 5: Keyword Research & Etsy SEO',
      'MODULE 6: Canva Mastery for Digital Assets',
      'MODULE 7: AI Tools & Image Generation',
      'MODULE 8: Product Creation & PDF Templates',
      'MODULE 9: Professional Mockups & Listing Covers',
      'MODULE 10: Listing Creation & File Uploads',
      'MODULE 11: Pricing Strategy & Platform Fees',
      'MODULE 12: Shop Growth, Stats & 30-Day Plan',
    ],
    seats: 25,
    hasCertificate: true,
    features: ['10 hands-on portfolio projects', '100% Online Classes', 'Shop & Payoneer verification guidance'],
    originalPrice: 'PKR 10,000',
    price: 'PKR 4,999',
    description: 'Master Etsy shop creation, payment setup, Canva, AI product generation, SEO, and professional mockups in a 1-month intensive live training.',
    isActive: true,
  },
  {
    _id: 'crs-1',
    id: 1,
    title: 'Full-Stack Modern Web Engineering',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    duration: '12 Weeks',
    level: 'All Levels' as const,
    instructor: {
      name: 'Maryam Nawaz',
      designation: 'Senior Architect',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
    },
    syllabus: ['TypeScript & Advanced JavaScript', 'React 19 & Component Architecture', 'Node.js & Express API Security', 'Database Design with Supabase & Postgres', 'Deployment & CI/CD Pipelines'],
    seats: 25,
    hasCertificate: true,
    features: ['Production portfolio projects', '1-on-1 code reviews', 'Job interview preparation'],
    originalPrice: '$499',
    price: 'Free Scholarship Track',
    description: 'Comprehensive, project-first training curriculum designed to transition aspiring developers into production-ready full-stack software engineers.',
    isActive: true,
  },
  {
    _id: 'crs-2',
    id: 2,
    title: 'Applied AI & Autonomous Agent Architecture',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    duration: '8 Weeks',
    level: 'Intermediate' as const,
    instructor: {
      name: 'Sami Khan',
      designation: 'CTO & AI Lead',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
    },
    syllabus: ['LLM APIs (Gemini 2.5 Flash)', 'Prompt Engineering & Structured Outputs', 'Vector Embeddings & RAG Systems', 'Autonomous Tool-Calling Agents', 'Deploying Scalable AI Services'],
    seats: 20,
    hasCertificate: true,
    features: ['Live AI agent building', 'Vector database integration', 'Enterprise security practices'],
    originalPrice: '$599',
    price: 'Free Scholarship Track',
    description: 'Master the next generation of software: build autonomous AI agents, semantic search systems, and production LLM integrations from scratch.',
    isActive: true,
  },
  {
    _id: 'crs-3',
    id: 3,
    title: 'Cross-Platform Mobile Apps with Flutter',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    duration: '10 Weeks',
    level: 'Beginner' as const,
    instructor: {
      name: 'CSA Mobile Faculty',
      designation: 'Mobile Architects',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    },
    syllabus: ['Dart Fundamentals & OOP', 'Flutter Widget System', 'State Management with Bloc/Riverpod', 'REST API & Firebase/Supabase Integration', 'Publishing to iOS & Android'],
    seats: 30,
    hasCertificate: true,
    features: ['2 complete published apps', 'App Store guidelines', 'Responsive tablet/phone layouts'],
    originalPrice: '$450',
    price: 'Free Scholarship Track',
    description: 'Build gorgeous, high-performance native iOS and Android apps with a single codebase using Google Flutter.',
    isActive: true,
  },
];

// GET /api/public/services: Active services
publicDataRouter.get('/services', async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      res.json({ success: true, services: fallbackServices });
      return;
    }

    const services = data.map(item => ({
      ...item,
      isActive: item.is_active,
    }));

    res.json({ success: true, services });
  } catch (err: any) {
    res.json({ success: true, services: fallbackServices });
  }
});

// GET /api/public/projects: Published projects
publicDataRouter.get('/projects', async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      res.json({ success: true, projects: fallbackProjects });
      return;
    }

    const projects = data.map(item => ({
      ...item,
      shortDescription: item.short_description,
      techStack: item.tech_stack,
      githubUrl: item.github_url,
      liveUrl: item.live_url,
      completionDate: item.completion_date,
      isPublished: item.is_published,
    }));

    res.json({ success: true, projects });
  } catch (err: any) {
    res.json({ success: true, projects: fallbackProjects });
  }
});

// GET /api/public/team: Active team members
publicDataRouter.get('/team', async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      res.json({ success: true, team: fallbackTeam });
      return;
    }

    const team = data.map(item => ({
      ...item,
      isActive: item.is_active,
      order: item.order ?? item.social?.order ?? 999,
      badge: item.badge ?? item.social?.badge ?? '',
    }));

    res.json({ success: true, team });
  } catch (err: any) {
    res.json({ success: true, team: fallbackTeam });
  }
});

// GET /api/public/courses: Active courses
publicDataRouter.get('/courses', async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      res.json({ success: true, courses: fallbackCourses });
      return;
    }

    const courses = data.map(item => ({
      ...item,
      isActive: item.is_active,
      originalPrice: item.original_price,
      hasCertificate: item.has_certificate,
    }));

    res.json({ success: true, courses });
  } catch (err: any) {
    res.json({ success: true, courses: fallbackCourses });
  }
});
