export interface Author {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  socials: { facebook?: string; twitter?: string; linkedin?: string; github?: string; };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  order: number;
  isHidden: boolean;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  authorId: string;
  categoryId: string;
  tags: string[];
  status: 'draft' | 'published';
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  isFeatured: boolean;
  views: number;
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
}

export const initialAuthors: Author[] = [
  {
    id: 'auth-sami',
    name: 'M. Sami Ullah',
    position: 'Full Stack Systems Architect & Team Lead',
    bio: 'Lead Engineer with 5+ years architecting enterprise web systems, high-concurrency Node.js APIs, and scalable React applications. Alumnus of COMSATS University Islamabad.',
    image: 'https://res.cloudinary.com/z6sk8xam/image/upload/v1791571654/fi3dmmdk8xed5zbkew3s.png',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  },
  {
    id: 'auth-aftab',
    name: 'M. Aftab Akram',
    position: 'Full Stack Developer · Cloud & CI/CD Lead',
    bio: 'Specialist in cloud deployment automation, Docker containers, automated CI/CD pipelines, and high-performance full-stack architectures. Focuses on zero-downtime server setups.',
    image: 'https://res.cloudinary.com/z6sk8xam/image/upload/v1791571656/coewr6c0n33uytwifryt.png',
    socials: {
      github: 'https://github.com/Aftab272',
      linkedin: 'https://www.linkedin.com/in/aftab-akram-3a297b407',
    },
  },
  {
    id: 'auth-fiaz',
    name: 'Fiaz Ahmad',
    position: 'Backend Architect & Security Specialist',
    bio: 'Backend engineer focused on database optimization, RESTful API security, JWT authentication protocols, and rigorous quality assurance across production deliverables.',
    image: 'https://res.cloudinary.com/z6sk8xam/image/upload/v1791571658/bhw6qkd9iakzpxdaly2z.png',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  },
  {
    id: 'auth-hasnain',
    name: 'M. Hasnain',
    position: 'Frontend Lead & UI/UX Specialist',
    bio: 'Frontend specialist crafting pixel-perfect, accessible user interfaces with React, Next.js, and modern CSS. Experienced in user psychology, conversion rate optimization, and interaction design.',
    image: 'https://res.cloudinary.com/z6sk8xam/image/upload/v1791571661/isjb7s3h9inxrsyruugu.png',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'auth-shumaila',
    name: 'Shumaila Zulfqar',
    position: 'WordPress Architect & Technical SEO Lead',
    bio: 'Specialist in custom CMS implementations, Core Web Vitals speed optimization, semantic schema markup, and search engine visibility for global digital businesses.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
    socials: {
      linkedin: 'https://linkedin.com',
    },
  },
];

export const initialCategories: Category[] = [
  { id: 'c1', name: 'Web Development', slug: 'web-development', order: 1, isHidden: false },
  { id: 'c2', name: 'React.js', slug: 'react-js', order: 2, isHidden: false },
  { id: 'c3', name: 'JavaScript', slug: 'javascript', order: 3, isHidden: false },
  { id: 'c4', name: 'Node.js', slug: 'node-js', order: 4, isHidden: false },
  { id: 'c5', name: 'Express.js', slug: 'express-js', order: 5, isHidden: false },
  { id: 'c6', name: 'MongoDB & SQL', slug: 'mongodb-sql', order: 6, isHidden: false },
  { id: 'c7', name: 'WordPress', slug: 'wordpress', order: 7, isHidden: false },
  { id: 'c8', name: 'Shopify', slug: 'shopify', order: 8, isHidden: false },
  { id: 'c11', name: 'UI/UX Design', slug: 'ui-ux-design', order: 9, isHidden: false },
  { id: 'c13', name: 'SEO & Speed', slug: 'seo-speed', order: 10, isHidden: false },
  { id: 'c18', name: 'Freelancing', slug: 'freelancing', order: 11, isHidden: false },
  { id: 'c21', name: 'DevOps & Cloud', slug: 'devops-cloud', order: 12, isHidden: false },
];

export const initialTags: Tag[] = [
  { id: 't1', name: 'Full Stack', slug: 'full-stack' },
  { id: 't2', name: 'React 19', slug: 'react-19' },
  { id: 't3', name: 'TypeScript', slug: 'typescript' },
  { id: 't4', name: 'Backend Security', slug: 'backend-security' },
  { id: 't5', name: 'SEO Optimization', slug: 'seo-optimization' },
  { id: 't6', name: 'DevOps & CI/CD', slug: 'devops-ci-cd' },
  { id: 't7', name: 'Career & Freelancing', slug: 'career-freelancing' },
];

export const initialPosts: BlogPost[] = [
  {
    id: 'p1',
    title: 'Complete Web Development Roadmap for Beginners (2026)',
    slug: 'complete-web-development-roadmap-for-beginners-2026',
    excerpt: 'A structured, practical step-by-step roadmap to go from total beginner to job-ready full stack software engineer in 2026.',
    content: `
      <h2>Introduction: Navigating Modern Web Engineering</h2>
      <p>Entering the software development landscape in 2026 can feel overwhelming. With hundreds of frameworks, cloud providers, and AI tooling emerging weekly, the biggest challenge aspiring engineers face is not finding information—it is filtering out noise and following a clear, coherent roadmap.</p>
      <p>Over the past five years leading engineering projects at Creative Stack Agency, our team has interviewed and onboarded dozens of developers. The engineers who succeed consistently are those who master fundamental problem-solving, clean code architecture, and practical full-stack deployment rather than chasing every fleeting micro-framework.</p>
      
      <h2>Phase 1: The Core Foundation (HTML5, Semantic UI, & Modern CSS)</h2>
      <p>Before jumping into React or cloud databases, you must develop an instinctive understanding of how the browser renders documents. The core fundamentals you must master include:</p>
      <ul>
        <li><strong>Semantic HTML5:</strong> Structuring pages using proper elements (<code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;section&gt;</code>) to guarantee accessibility (a11y) and SEO compliance.</li>
        <li><strong>Modern CSS &amp; Flexbox/Grid:</strong> Understanding the difference between one-dimensional Flexbox layouts and two-dimensional CSS Grid layouts.</li>
        <li><strong>Responsive Design:</strong> Mobile-first media queries, fluid typography using clamp(), and container queries.</li>
        <li><strong>Tailwind CSS &amp; Design Systems:</strong> Utilizing utility-first styling to maintain design consistency and speed up production delivery.</li>
      </ul>

      <h2>Phase 2: Deep JavaScript &amp; TypeScript Mastery</h2>
      <p>JavaScript remains the bedrock of modern software. To build resilient applications, invest heavily in mastering:</p>
      <ul>
        <li><strong>ES6+ Syntax:</strong> Destructuring, spread operators, optional chaining, and arrow functions.</li>
        <li><strong>Asynchronous JS:</strong> Event loops, Callbacks, Promises, and <code>async/await</code> error handling patterns.</li>
        <li><strong>TypeScript Fundamentals:</strong> Static typing, interfaces, generics, and strict type checking to eliminate runtime errors before shipping to production.</li>
      </ul>

      <h2>Phase 3: Component Architecture with React 19 &amp; Next.js</h2>
      <p>React is the undisputed industry standard for web applications. Focus your learning on:</p>
      <ul>
        <li>Reusable functional components and pure functions.</li>
        <li>React Hooks: <code>useState</code>, <code>useEffect</code>, <code>useCallback</code>, <code>useMemo</code>, and custom hooks.</li>
        <li>Next.js App Router, Server Components (RSC), and Server Actions for optimal performance.</li>
      </ul>

      <h2>Phase 4: Robust Backend Engineering &amp; RESTful APIs</h2>
      <p>A true full-stack engineer knows how to model data and engineer secure servers. Focus on Node.js with Express, relational databases like PostgreSQL, ORMs like Prisma or Drizzle, and authentication via JWT and session cookies.</p>

      <h2>Phase 5: Deployments, CI/CD, &amp; The Portfolio</h2>
      <p>A project that only lives on <code>localhost:3000</code> does not help you get hired. Deploy your applications on Vercel, Supabase, or AWS, configure continuous integration pipelines, and write clear README documentation.</p>

      <h2>Conclusion</h2>
      <p>Consistency beats intensity. Spend 90 minutes every day writing code, building real client applications, and deploying them publicly. That is the exact formula that turns beginners into high-earning software professionals.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    authorId: 'auth-sami',
    categoryId: 'c1',
    tags: ['t1', 't3'],
    status: 'published',
    publishedAt: '2026-08-10T10:00:00.000Z',
    updatedAt: '2026-08-10T10:00:00.000Z',
    readTime: 8,
    isFeatured: true,
    views: 1420,
    seoTitle: 'Web Development Roadmap 2026: Step-by-Step Guide',
    seoDescription: 'Master modern full-stack web engineering in 2026. A detailed roadmap covering HTML, CSS, TypeScript, React, Node.js, and cloud deployments.',
  },
  {
    id: 'p2',
    title: 'Frontend vs Backend Development: An In-Depth Comparison',
    slug: 'frontend-vs-backend-development-engineering-guide',
    excerpt: 'Detailed technical analysis of frontend vs backend engineering roles, required toolsets, salary dynamics, and day-to-day responsibilities.',
    content: `
      <h2>The Great Divide: Understanding Both Ends of the Stack</h2>
      <p>Every time a user visits a modern web platform, two distinct software ecosystems work in perfect harmony: the client-facing application running in the user's browser, and the server infrastructure running in the cloud.</p>
      <p>As an aspiring software engineer, deciding whether to specialize in frontend, backend, or full-stack engineering is one of the most critical decisions in your career. Let's break down the realities of both disciplines.</p>

      <h2>Frontend Engineering: Crafting the User Experience</h2>
      <p>Frontend developers are responsible for everything the user touches, sees, and interacts with. It is a unique combination of visual design, state management, and client-side computational efficiency.</p>
      <h3>Key Responsibilities:</h3>
      <ul>
        <li>Translating Figma designs into responsive, pixel-perfect code.</li>
        <li>Managing complex client-side application states.</li>
        <li>Optimizing Core Web Vitals (LCP, INP, CLS) to ensure instantaneous interaction.</li>
        <li>Guaranteeing cross-browser and cross-device compatibility.</li>
      </ul>

      <h2>Backend Engineering: Powering Business Logic &amp; Reliability</h2>
      <p>Backend developers focus on data integrity, API communication, security, authentication, and database efficiency. They ensure that systems do not crash under high traffic spikes.</p>
      <h3>Key Responsibilities:</h3>
      <ul>
        <li>Designing resilient RESTful and GraphQL API endpoints.</li>
        <li>Database schema modeling, indexing, and migration management.</li>
        <li>Authentication protocols (OAuth2, JWT, multi-factor auth).</li>
        <li>Server caching with Redis and asynchronous message queuing.</li>
      </ul>

      <h2>Which One Should You Choose?</h2>
      <p>If you love visual feedback, interactive design, and crafting experiences that delight human beings, start with frontend. If you thrive on algorithms, database architecture, and security protocols, dive into backend. At Creative Stack Agency, our most versatile team members understand both disciplines.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    authorId: 'auth-hasnain',
    categoryId: 'c1',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-08-15T12:30:00.000Z',
    updatedAt: '2026-08-15T12:30:00.000Z',
    readTime: 6,
    isFeatured: true,
    views: 1890,
    seoTitle: 'Frontend vs Backend Development: Which Path Should You Choose?',
    seoDescription: 'Comprehensive technical breakdown of frontend vs backend web development, tools, workflow, and career path options.',
  },
  {
    id: 'p3',
    title: 'Mastering Modern React & Next.js: Architecture & Performance',
    slug: 'mastering-modern-react-nextjs-architecture',
    excerpt: 'Architectural patterns for scalable React and Next.js applications: Server Components, atomic folder structures, and state management.',
    content: `
      <h2>The Evolution of the React Ecosystem</h2>
      <p>React has shifted dramatically over the past two years. The days of giant client-side JavaScript bundles and scattered <code>useEffect</code> data fetches are officially behind us. With React 19 and Next.js App Router, full-stack component architecture is the modern standard.</p>
      
      <h2>1. Embracing React Server Components (RSC)</h2>
      <p>Server Components allow developers to render components on the server without shipping JavaScript to the client. This results in dramatically smaller bundle sizes, near-instant initial page loads, and superior SEO performance.</p>

      <h2>2. Clean Project Folder Architecture</h2>
      <p>At Creative Stack Agency, our client projects adhere to a strict modular folder architecture: features grouped with hooks, UI primitives isolated, and shared library clients abstracted cleanly.</p>

      <h2>3. Modern State Management: Keep It Local</h2>
      <p>Over-engineering state with bulky global stores often hurts performance. Prioritize URL search parameters for filter states, local component state for UI toggles, and server caches for data fetching.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    authorId: 'auth-sami',
    categoryId: 'c2',
    tags: ['t2', 't3'],
    status: 'published',
    publishedAt: '2026-08-20T09:00:00.000Z',
    updatedAt: '2026-08-20T09:00:00.000Z',
    readTime: 7,
    isFeatured: true,
    views: 1240,
    seoTitle: 'React & Next.js Architecture: Scale & Performance Guide',
    seoDescription: 'Learn how to architect high-performance React and Next.js applications using Server Components, clean folders, and state management.',
  },
  {
    id: 'p4',
    title: 'Node.js & Express API Security: Hardening Techniques',
    slug: 'nodejs-express-api-security-hardening-techniques',
    excerpt: 'Essential security checklist for Node.js backends: Rate limiting, JWT protection, helmet headers, and database sanitization.',
    content: `
      <h2>Why API Security Must Be Built-in, Not Bolted-on</h2>
      <p>When launching backend services in production, functional correctness is only half the battle. Insecure APIs are actively probed by automated bots within seconds of deployment. Securing your Node.js and Express backend requires defense-in-depth.</p>

      <h2>1. Enforcing HTTP Security Headers with Helmet</h2>
      <p>By default, Express leaks server implementation details through headers like <code>X-Powered-By: Express</code>. Installing Helmet blocks clickjacking, MIME sniffing, and enforces HTTPS policies automatically.</p>

      <h2>2. Rate Limiting to Thwart Brute Force &amp; DDoS</h2>
      <p>Without rate limiting, any attacker can flood authentication endpoints with millions of requests. Using Redis-backed or memory rate limiters restricts each IP to realistic thresholds, preserving uptime.</p>

      <h2>3. Stateless JWT Security &amp; Token Rotation</h2>
      <p>Never store sensitive access tokens in <code>localStorage</code>, where they are vulnerable to XSS. Instead, issue tokens inside <code>httpOnly</code>, <code>secure</code>, and <code>sameSite: 'strict'</code> cookies with short expiration windows.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    authorId: 'auth-fiaz',
    categoryId: 'c4',
    tags: ['t4'],
    status: 'published',
    publishedAt: '2026-08-25T14:15:00.000Z',
    updatedAt: '2026-08-25T14:15:00.000Z',
    readTime: 8,
    isFeatured: false,
    views: 980,
    seoTitle: 'Node.js Express Security: Hardening APIs for Production',
    seoDescription: 'Battle-tested security checklist for Node.js and Express APIs. Rate limiting, JWT cookie security, Helmet headers, and input sanitization.',
  },
  {
    id: 'p5',
    title: 'Technical SEO & Core Web Vitals: Passing 95+ PageSpeed',
    slug: 'technical-seo-core-web-vitals-speed-optimization',
    excerpt: 'Actionable techniques to optimize Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).',
    content: `
      <h2>The Direct Correlation Between Page Speed and Organic Rankings</h2>
      <p>Google's search algorithm heavily favors websites that deliver exceptional user experience. If your platform takes more than 2.5 seconds to load or experiences layout shifts while scrolling, your search visibility and user conversion rates plummet.</p>
      
      <h2>1. Largest Contentful Paint (LCP) Optimization</h2>
      <p>Serve modern image formats (AVIF and WebP), preload the hero image with link tags, and use global Content Delivery Networks for edge caching.</p>

      <h2>2. Eliminating Cumulative Layout Shift (CLS)</h2>
      <p>Always provide explicit width and height attributes on all images and video containers, and reserve space for dynamic ad banners using min-height containers.</p>

      <h2>3. Interaction to Next Paint (INP)</h2>
      <p>Ensure that clicks respond within 200 milliseconds by avoiding long synchronous JavaScript tasks on the main browser thread.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    authorId: 'auth-shumaila',
    categoryId: 'c13',
    tags: ['t5'],
    status: 'published',
    publishedAt: '2026-08-28T16:00:00.000Z',
    updatedAt: '2026-08-28T16:00:00.000Z',
    readTime: 7,
    isFeatured: false,
    views: 1670,
    seoTitle: 'Core Web Vitals Guide 2026: Achieve 95+ Google PageSpeed',
    seoDescription: 'Master technical SEO and Core Web Vitals. Step-by-step optimization for LCP, INP, and CLS to boost your organic search rankings.',
  },
  {
    id: 'p6',
    title: 'Automated CI/CD Pipelines & Cloud Deployments Guide',
    slug: 'automated-cicd-pipelines-cloud-deployments-guide',
    excerpt: 'How our engineering team automates testing, Docker containerization, and continuous cloud deployments with zero downtime.',
    content: `
      <h2>The Shift to Continuous Delivery</h2>
      <p>Manual deployments over FTP or SSH are dangerous and error-prone. Modern software teams ship code safely through automated CI/CD pipelines that run linting, test suites, and staging builds on every pull request.</p>

      <h2>1. The Anatomy of a High-Speed Pipeline</h2>
      <p>A production GitHub Actions workflow should run lint checks and TypeScript verification, execute automated unit tests, build minimal Alpine Docker images, and deploy with automated health checks.</p>

      <h2>2. Secrets Management &amp; Environment Isolation</h2>
      <p>Never commit environment variables or private API keys to git repositories. Inject environment variables securely via cloud provider secret managers.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80',
    authorId: 'auth-aftab',
    categoryId: 'c1',
    tags: ['t6'],
    status: 'published',
    publishedAt: '2026-09-02T11:00:00.000Z',
    updatedAt: '2026-09-02T11:00:00.000Z',
    readTime: 8,
    isFeatured: false,
    views: 890,
    seoTitle: 'Automated CI/CD Pipelines: Zero-Downtime Cloud Deployment Guide',
    seoDescription: 'Learn how to build resilient CI/CD pipelines with GitHub Actions, Docker, and cloud hosting for fast and safe production releases.',
  },
  {
    id: 'p7',
    title: 'Modern UI/UX Design Systems: From Wireframes to Production',
    slug: 'modern-ui-ux-design-systems-guide',
    excerpt: 'Design system fundamentals: typography scales, WCAG accessibility, micro-animations, and reusable component tokens.',
    content: `
      <h2>Design Systems: The Bridge Between Designers and Engineers</h2>
      <p>As digital products scale, ad-hoc styling and inconsistent UI components lead to visual degradation and developer friction. A comprehensive design system solves this by creating a shared language of design tokens and reusable components.</p>

      <h2>1. Design Tokens: Establishing the Single Source of Truth</h2>
      <p>Codifying colors, typography, spacing, and shadows into CSS tokens enables global brand updates across hundreds of pages in seconds.</p>

      <h2>2. Contrast &amp; Accessibility (WCAG 2.1 Compliance)</h2>
      <p>Ensure a minimum 4.5:1 contrast ratio for body text, test with screen readers, and support clear keyboard navigation focus states.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    authorId: 'auth-hasnain',
    categoryId: 'c11',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-09-08T09:30:00.000Z',
    updatedAt: '2026-09-08T09:30:00.000Z',
    readTime: 6,
    isFeatured: false,
    views: 1120,
    seoTitle: 'Modern UI/UX Design Systems: Tokens, Accessibility & Flow',
    seoDescription: 'Learn how to build modern UI/UX design systems with design tokens, WCAG compliance, and engaging micro-interactions.',
  },
  {
    id: 'p8',
    title: 'The Freelance Engineer’s Blueprint: Landing High-Ticket Clients',
    slug: 'freelance-developer-blueprint-landing-high-ticket-clients',
    excerpt: 'Proven strategies for software developers to win premium international contracts on Upwork, LinkedIn, and direct agency outreach.',
    content: `
      <h2>Moving Beyond Low-Paying Gigs</h2>
      <p>The biggest trap freelance developers fall into is competing on price. When you offer generic services, you attract difficult clients. To command premium $2,000 to $10,000+ contracts, you must position yourself as an investment that solves expensive business problems.</p>

      <h2>1. Specialist Positioning</h2>
      <p>Position yourself around solving specific business problems rather than generalist skills. High-ticket clients look for domain expertise.</p>

      <h2>2. Winning Proposals</h2>
      <p>Focus on understanding the client's business bottleneck, demonstrating past proof of work, and outlining clear, actionable next steps.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    authorId: 'auth-sami',
    categoryId: 'c18',
    tags: ['t7'],
    status: 'published',
    publishedAt: '2026-09-15T15:00:00.000Z',
    updatedAt: '2026-09-15T15:00:00.000Z',
    readTime: 8,
    isFeatured: false,
    views: 2150,
    seoTitle: 'Freelance Developer Playbook: How to Win High-Ticket Contracts',
    seoDescription: 'Practical guide for software engineers to land premium international clients on Upwork and LinkedIn through expert positioning.',
  },
  {
    id: 'p9',
    title: 'TypeScript Best Practices: Strict Typing, Generics & Utility Types',
    slug: 'typescript-best-practices-strict-typing-generics',
    excerpt: 'Write robust, maintainable code with advanced TypeScript: Discriminated unions, template literal types, and generic constraints.',
    content: `
      <h2>Why TypeScript Has Become Mandatory</h2>
      <p>Catching errors at compile time rather than in production saves thousands of engineering hours. Mastering strict TypeScript transforms large codebases into self-documenting, resilient systems.</p>

      <h2>1. Eliminating <code>any</code> with Generics &amp; <code>unknown</code></h2>
      <p>Avoid using <code>any</code> as an escape hatch. Use <code>unknown</code> for unvalidated input and narrow with type guards or schema libraries like Zod.</p>

      <h2>2. Discriminated Unions for Clean State Modeling</h2>
      <p>Model loading, error, and success states with discriminated unions to prevent impossible UI states across your application.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1516116211227-bbc13c75d4a1?auto=format&fit=crop&w=1200&q=80',
    authorId: 'auth-sami',
    categoryId: 'c3',
    tags: ['t3'],
    status: 'published',
    publishedAt: '2026-09-18T10:00:00.000Z',
    updatedAt: '2026-09-18T10:00:00.000Z',
    readTime: 7,
    isFeatured: false,
    views: 940,
    seoTitle: 'TypeScript Best Practices Guide: Generics, Unions & Strict Types',
    seoDescription: 'Advanced TypeScript patterns for enterprise web applications: generics, discriminated unions, and utility types.',
  },
  {
    id: 'p10',
    title: 'Database Design Mastery: PostgreSQL Indexing & Query Tuning',
    slug: 'database-design-postgresql-indexing-query-tuning',
    excerpt: 'Optimize relational database queries: B-Tree indexes, EXPLAIN ANALYZE profiling, connection pooling, and normalization.',
    content: `
      <h2>The Real Bottleneck in Production Backends</h2>
      <p>In 90% of slow web applications, the bottleneck is not Node.js—it is an unindexed database query scanning millions of rows. Understanding database execution plans is essential for senior backend engineers.</p>

      <h2>1. Effective Indexing Strategies</h2>
      <p>Add B-Tree indexes on foreign keys, filtering columns used in WHERE clauses, and composite indexes on columns frequently sorted together.</p>

      <h2>2. Connection Pooling with PgBouncer</h2>
      <p>PostgreSQL forks a process for each connection. Utilize connection poolers to handle traffic spikes without exhausting database memory limits.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
    authorId: 'auth-fiaz',
    categoryId: 'c6',
    tags: ['t4'],
    status: 'published',
    publishedAt: '2026-09-22T13:45:00.000Z',
    updatedAt: '2026-09-22T13:45:00.000Z',
    readTime: 8,
    isFeatured: false,
    views: 820,
    seoTitle: 'PostgreSQL Indexing & Query Optimization: Production Guide',
    seoDescription: 'Master database performance: B-Tree indexes, connection pooling, and EXPLAIN ANALYZE profiling for PostgreSQL backends.',
  },
  {
    id: 'p11',
    title: 'Docker & Containerization for Full-Stack Developers',
    slug: 'docker-containerization-full-stack-developers-guide',
    excerpt: 'Streamline local development and deployments: Multi-stage Dockerfiles, Docker Compose setups, and image size reduction.',
    content: `
      <h2>Eliminating "It Works on My Machine"</h2>
      <p>Containerization packages your application code alongside runtime binaries and libraries, guaranteeing identical behavior across developer laptops, staging clusters, and production environments.</p>

      <h2>1. Multi-Stage Dockerfile Optimization</h2>
      <p>Separate build tools from runtime artifacts. Use multi-stage builds to compile TypeScript and bundle assets, shipping only compiled artifacts in a lightweight Alpine base container.</p>

      <h2>2. Local Development with Docker Compose</h2>
      <p>Spin up frontend, backend, PostgreSQL, and Redis with a single command, making team onboarding instantaneous and reliable.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1200&q=80',
    authorId: 'auth-aftab',
    categoryId: 'c21',
    tags: ['t6'],
    status: 'published',
    publishedAt: '2026-09-25T11:20:00.000Z',
    updatedAt: '2026-09-25T11:20:00.000Z',
    readTime: 7,
    isFeatured: false,
    views: 1040,
    seoTitle: 'Docker for Full-Stack Developers: Multi-Stage Builds & Compose',
    seoDescription: 'Practical guide to Docker containerization: multi-stage Dockerfiles, image optimization, and Docker Compose development setups.',
  },
  {
    id: 'p12',
    title: 'Headless Shopify & Next.js: Architecture for 3x Faster Checkouts',
    slug: 'headless-shopify-nextjs-ecommerce-architecture',
    excerpt: 'Build ultra-fast e-commerce platforms using Shopify Storefront API, Next.js incremental static regeneration, and edge caching.',
    content: `
      <h2>Why Top E-Commerce Brands Go Headless</h2>
      <p>Traditional monolithic themes often suffer from bloated scripts and slow mobile loading speeds. Decoupling the frontend storefront with Next.js while leveraging Shopify’s robust checkout backend unlocks sub-second page transitions and higher conversion rates.</p>

      <h2>1. Querying the Storefront GraphQL API</h2>
      <p>Fetch products and collections using typed GraphQL queries, caching responses at the CDN edge with Incremental Static Regeneration (ISR).</p>

      <h2>2. Optimized Cart &amp; Checkout Flow</h2>
      <p>Maintain client-side cart states with instant optimism, directing shoppers seamlessly to Shopify’s PCI-compliant hosted checkout.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
    authorId: 'auth-aftab',
    categoryId: 'c8',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-09-28T16:10:00.000Z',
    updatedAt: '2026-09-28T16:10:00.000Z',
    readTime: 7,
    isFeatured: false,
    views: 1330,
    seoTitle: 'Headless Shopify with Next.js: Fast E-Commerce Architecture',
    seoDescription: 'Learn how to engineer headless Shopify stores using Next.js, Storefront API, and edge caching for maximum conversion velocity.',
  },
];
