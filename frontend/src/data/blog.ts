export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  readTime: string;
  author: string;
  authorRole: string;
  date: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of AI in Web Development & Automated Workflows',
    excerpt: 'Exploring how AI tooling, LLM integrations, and automated testing are actively transforming modern software development.',
    content: 'Artificial Intelligence is no longer just an abstract concept—it is actively reshaping how engineering teams build, optimize, and maintain production web platforms. From intelligent linting and automated unit test generation to semantic search and autonomous customer workflows, AI is reducing repetitive cognitive overhead while accelerating delivery speed.\n\nIn our client engagements at Creative Stack Agency, we integrate practical AI capabilities into existing web architectures without sacrificing system security or type safety. In this guide, we explore the primary ways engineering teams can safely adopt AI assistants, sanitize structured JSON outputs, and deploy reliable user-facing interfaces.',
    category: 'AI Solutions',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600&h=400',
    readTime: '5 min read',
    author: 'M. Sami Ullah',
    authorRole: 'Full Stack Systems Architect',
    date: 'August 14, 2026',
  },
  {
    id: 2,
    title: 'Modern UI/UX Design Trends: Crafting Intuitive Interfaces',
    excerpt: 'Key design principles for 2026: Accessibility tokens, micro-interactions, dark mode harmony, and user conversion psychology.',
    content: 'User experience is the single most decisive factor for digital product retention. As digital products mature, users expect interfaces that respond instantaneously with natural tactile feedback.\n\nThis year, the industry is moving away from flat, lifeless layouts toward sophisticated glassmorphic cards, contextual micro-interactions that guide users organically, and accessible typography scales that adhere to WCAG standards. This article breaks down our agency framework for translating brand identity into responsive design systems that captivate users and elevate key conversion metrics.',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600&h=400',
    readTime: '4 min read',
    author: 'M. Hasnain',
    authorRole: 'Frontend Lead & UI/UX Specialist',
    date: 'August 22, 2026',
  },
  {
    id: 3,
    title: 'Optimizing Website Performance for SEO & Core Web Vitals',
    excerpt: 'Actionable techniques to achieve 95+ PageSpeed scores, reduce server response latencies, and dominate organic search rankings.',
    content: 'A visually stunning web application delivers zero business value if your target audience cannot find it on search engines. Google’s ranking systems place immense weight on user experience, page speed, and interactive responsiveness.\n\nThis guide covers technical strategies to achieve pristine Core Web Vitals (LCP under 2.5s, INP under 200ms, CLS at 0), optimize server-side response times through edge caching, structure rich semantic schema markup, and ensure total mobile accessibility across all device viewports.',
    category: 'SEO',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400',
    readTime: '6 min read',
    author: 'Shumaila Zulfqar',
    authorRole: 'WordPress & Technical SEO Lead',
    date: 'September 01, 2026',
  },
];
