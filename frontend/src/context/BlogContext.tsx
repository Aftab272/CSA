import React, { createContext, useContext, useState, useEffect } from 'react';

export type Author = {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  socials: { facebook?: string; twitter?: string; linkedin?: string; };
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  order: number;
  isHidden: boolean;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
};

export type Comment = {
  id: string;
  postId: string;
  name: string;
  email: string;
  website?: string;
  content: string;
  createdAt: string;
  parentId?: string;
  status: 'pending' | 'approved' | 'spam';
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  authorId: string;
  categoryId: string;
  tags: string[]; // tag ids
  status: 'draft' | 'published';
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  isFeatured: boolean;
  views: number;
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
};

type BlogContextType = {
  posts: BlogPost[];
  categories: Category[];
  tags: Tag[];
  authors: Author[];
  comments: Comment[];
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  setAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error('useBlog must be used within BlogProvider');
  return context;
};

const defaultAuthors: Author[] = [
  { id: 'a1', name: 'Admin', position: 'Lead Editor', bio: 'Tech enthusiast and content creator.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80', socials: {} }
];

const defaultCategories: Category[] = [
  { id: 'c1', name: 'Web Development', slug: 'web-development', order: 1, isHidden: false },
  { id: 'c2', name: 'React.js', slug: 'react-js', order: 2, isHidden: false },
  { id: 'c3', name: 'JavaScript', slug: 'javascript', order: 3, isHidden: false },
  { id: 'c4', name: 'Node.js', slug: 'node-js', order: 4, isHidden: false },
  { id: 'c5', name: 'Express.js', slug: 'express-js', order: 5, isHidden: false },
  { id: 'c6', name: 'MongoDB', slug: 'mongodb', order: 6, isHidden: false },
  { id: 'c7', name: 'WordPress', slug: 'wordpress', order: 7, isHidden: false },
  { id: 'c8', name: 'Shopify', slug: 'shopify', order: 8, isHidden: false },
  { id: 'c9', name: 'Python', slug: 'python', order: 9, isHidden: false },
  { id: 'c10', name: 'Flask', slug: 'flask', order: 10, isHidden: false },
  { id: 'c11', name: 'UI/UX Design', slug: 'ui-ux-design', order: 11, isHidden: false },
  { id: 'c12', name: 'Graphic Design', slug: 'graphic-design', order: 12, isHidden: false },
  { id: 'c13', name: 'SEO', slug: 'seo', order: 13, isHidden: false },
  { id: 'c14', name: 'Digital Marketing', slug: 'digital-marketing', order: 14, isHidden: false },
  { id: 'c15', name: 'Social Media Marketing', slug: 'social-media-marketing', order: 15, isHidden: false },
  { id: 'c16', name: 'YouTube Automation', slug: 'youtube-automation', order: 16, isHidden: false },
  { id: 'c17', name: 'Career Tips', slug: 'career-tips', order: 17, isHidden: false },
  { id: 'c18', name: 'Freelancing', slug: 'freelancing', order: 18, isHidden: false },
  { id: 'c19', name: 'Fiverr', slug: 'fiverr', order: 19, isHidden: false },
  { id: 'c20', name: 'Upwork', slug: 'upwork', order: 20, isHidden: false },
  { id: 'c21', name: 'AI Tools', slug: 'ai-tools', order: 21, isHidden: false },
  { id: 'c22', name: 'Tech News', slug: 'tech-news', order: 22, isHidden: false }
];


const defaultTags: Tag[] = [
  { id: 't1', name: 'React', slug: 'react' },
  { id: 't2', name: 'SEO', slug: 'seo' }
];

const defaultPosts: BlogPost[] = [
  {
    id: 'p1',
    title: 'Complete Web Development Roadmap for Beginners (2026)',
    slug: 'complete-web-development-roadmap-for-beginners-2026',
    content: `<h2>Introduction</h2>
<p>Web development is one of the most valuable digital skills in 2026. Whether you want to become a freelance web developer, land a remote job, start your own agency, or build online businesses, learning web development opens countless opportunities.</p>
<p>However, many beginners struggle because they don't know what to learn first. There are hundreds of programming languages, frameworks, libraries, and tools available today, making it difficult to choose the right learning path.</p>
<p>This complete roadmap will guide you through every stage of becoming a professional web developer. Instead of randomly watching tutorials, you'll follow a structured learning path from beginner to advanced level.</p>
<p>By the end of this guide, you'll understand exactly what technologies to learn, when to learn them, and how to build real-world projects that help you become job-ready.</p>
<h2>What is Web Development?</h2>
<p>Web development is the process of creating websites and web applications that run inside a web browser.</p>
<p>A website consists of multiple technologies working together.</p>
<ul>
<li>HTML creates the structure.</li>
<li>CSS designs the layout.</li>
<li>JavaScript adds interactivity.</li>
<li>Backend languages process data.</li>
<li>Databases store information.</li>
</ul>
<h2>Types of Web Development</h2>
<h3>Frontend Development</h3>
<p>Frontend is everything users can see and interact with. Frontend developers work with HTML, CSS, JavaScript, React, Vue, Next.js.</p>
<h3>Backend Development</h3>
<p>Backend handles everything behind the scenes. Examples include login systems, databases, APIs, payment processing, authentication, business logic.</p>
<h3>Full Stack Development</h3>
<p>A Full Stack Developer can build both frontend and backend applications.</p>
<h2>Step 1 &mdash; Learn HTML</h2>
<p>HTML is the foundation of every website.</p>
<h2>Step 2 &mdash; Learn CSS</h2>
<p>CSS makes websites beautiful.</p>
<h2>Step 3 &mdash; Learn JavaScript</h2>
<p>JavaScript adds life to websites.</p>
<h2>Step 4 &mdash; Learn Git &amp; GitHub</h2>
<p>Git helps developers manage code. GitHub stores projects online.</p>
<h2>Step 5 &mdash; Responsive Web Design</h2>
<p>Today, most users browse websites on mobile devices.</p>
<h2>Step 6 &mdash; Learn CSS Frameworks</h2>
<p>Popular CSS frameworks include Bootstrap, Tailwind CSS, Bulma.</p>
<h2>Step 7 &mdash; Learn React</h2>
<p>React is the most popular frontend JavaScript library.</p>
<h2>Step 8 &mdash; Learn Backend Development</h2>
<p>Frontend alone isn't enough for dynamic applications.</p>
<h2>Step 9 &mdash; Learn Databases</h2>
<p>Databases store information permanently.</p>
<h2>Step 10 &mdash; Learn APIs</h2>
<p>APIs allow different applications to communicate.</p>
<h2>Step 11 &mdash; Authentication</h2>
<p>Every professional application needs secure authentication.</p>
<h2>Step 12 &mdash; Deployment</h2>
<p>A website isn't complete until it's online.</p>
<h2>Step 13 &mdash; Build Real Projects</h2>
<p>Projects matter more than certificates.</p>
<h2>Step 14 &mdash; Create an Amazing Portfolio</h2>
<p>Your portfolio should include About Me, Skills, Projects, GitHub, Resume, Contact Form, Testimonials.</p>
<h2>Step 15 &mdash; Start Freelancing</h2>
<p>Create profiles on reputable freelance platforms and showcase your best work through a strong portfolio.</p>
<h2>Conclusion</h2>
<p>The web development industry continues to offer exciting opportunities for people who are willing to learn and practice consistently.</p>`,
    excerpt: 'Whether you want to become a freelance web developer, land a remote job, start your own agency, or build online businesses, learning web development opens countless opportunities.',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c1',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-23T07:49:16.720649Z',
    updatedAt: '2026-04-23T07:49:16.720649Z',
    readTime: 5,
    isFeatured: true,
    views: 204
  },
  {
    id: 'p2',
    title: 'Frontend vs Backend Development',
    slug: 'frontend-vs-backend-development',
    content: `<h2>Introduction</h2>
<p>If you're planning to become a web developer, one of the first questions you'll encounter is: Should I become a Frontend Developer or a Backend Developer?</p>
<p>Both roles are essential for building modern websites and web applications, but they focus on different parts of the development process.</p>
<p>The frontend is everything users can see and interact with, while the backend powers the application behind the scenes by managing data, authentication, business logic, and server operations.</p>
<h2>What is Frontend Development?</h2>
<p>Frontend development focuses on everything users see inside a web browser.</p>
<p>A frontend developer is responsible for creating attractive, responsive, and interactive user interfaces.</p>
<h2>What is Backend Development?</h2>
<p>Backend development handles everything users don't see.</p>
<p>Whenever a user logs in, places an order, submits a contact form, or updates a profile, backend code processes the request and communicates with the database.</p>
<h2>Frontend vs Backend Comparison</h2>
<p>Frontend involves User Interface, Responsive Design, Works in browser.</p>
<p>Backend involves Server Logic, Database, Authentication, Builds APIs, Runs on server.</p>
<h2>Which One is Easier?</h2>
<p>Neither frontend nor backend is objectively easier—they simply require different skill sets.</p>
<h2>Should You Learn Both?</h2>
<p>Learning both frontend and backend gives you greater flexibility and allows you to build complete web applications from start to finish.</p>
<h2>Conclusion</h2>
<p>Frontend and backend development are two sides of the same web development process. Frontend focuses on creating engaging user experiences, while backend ensures that applications are secure, reliable, and capable of handling data and business logic.</p>`,
    excerpt: 'If you\'re planning to become a web developer, one of the first questions you\'ll encounter is: Should I become a Frontend Developer or a Backend Developer?',
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c1',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-29T07:49:16.720906Z',
    updatedAt: '2026-05-29T07:49:16.720906Z',
    readTime: 5,
    isFeatured: true,
    views: 1987
  },
  {
    id: 'p3',
    title: 'HTML, CSS & JavaScript Learning Path',
    slug: 'html-css-and-javascript-learning-path',
    content: `<p>This is a placeholder for the article: HTML, CSS & JavaScript Learning Path. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on HTML, CSS & JavaScript Learning Path.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c1',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-17T07:49:16.720944Z',
    updatedAt: '2026-04-17T07:49:16.720944Z',
    readTime: 7,
    isFeatured: true,
    views: 250
  },
  {
    id: 'p4',
    title: 'Common Web Development Mistakes',
    slug: 'common-web-development-mistakes',
    content: `<p>This is a placeholder for the article: Common Web Development Mistakes. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Common Web Development Mistakes.',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c1',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-29T07:49:16.720961Z',
    updatedAt: '2026-04-29T07:49:16.720961Z',
    readTime: 4,
    isFeatured: false,
    views: 955
  },
  {
    id: 'p5',
    title: 'How to Build Your First Portfolio Website',
    slug: 'how-to-build-your-first-portfolio-website',
    content: `<p>This is a placeholder for the article: How to Build Your First Portfolio Website. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on How to Build Your First Portfolio Website.',
    featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c1',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-26T07:49:16.720978Z',
    updatedAt: '2026-04-26T07:49:16.720978Z',
    readTime: 5,
    isFeatured: false,
    views: 3410
  },
  {
    id: 'p6',
    title: 'What is React.js and Why Use It?',
    slug: 'what-is-reactjs-and-why-use-it',
    content: `<p>This is a placeholder for the article: What is React.js and Why Use It?. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on What is React.js and Why Use It?.',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c2',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-27T07:49:16.721004Z',
    updatedAt: '2026-06-27T07:49:16.721004Z',
    readTime: 8,
    isFeatured: false,
    views: 2866
  },
  {
    id: 'p7',
    title: 'React Hooks Explained',
    slug: 'react-hooks-explained',
    content: `<p>This is a placeholder for the article: React Hooks Explained. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on React Hooks Explained.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c2',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-27T07:49:16.721020Z',
    updatedAt: '2026-05-27T07:49:16.721020Z',
    readTime: 5,
    isFeatured: false,
    views: 2358
  },
  {
    id: 'p8',
    title: 'React vs Angular vs Vue',
    slug: 'react-vs-angular-vs-vue',
    content: `<p>This is a placeholder for the article: React vs Angular vs Vue. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on React vs Angular vs Vue.',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c2',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-27T07:49:16.721034Z',
    updatedAt: '2026-06-27T07:49:16.721034Z',
    readTime: 7,
    isFeatured: false,
    views: 1993
  },
  {
    id: 'p9',
    title: 'Best React Project Ideas',
    slug: 'best-react-project-ideas',
    content: `<p>This is a placeholder for the article: Best React Project Ideas. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Best React Project Ideas.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c2',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-17T07:49:16.721053Z',
    updatedAt: '2026-04-17T07:49:16.721053Z',
    readTime: 7,
    isFeatured: false,
    views: 2004
  },
  {
    id: 'p10',
    title: 'React Performance Optimization Tips',
    slug: 'react-performance-optimization-tips',
    content: `<p>This is a placeholder for the article: React Performance Optimization Tips. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on React Performance Optimization Tips.',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c2',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-11T07:49:16.721067Z',
    updatedAt: '2026-04-11T07:49:16.721067Z',
    readTime: 4,
    isFeatured: false,
    views: 957
  },
  {
    id: 'p11',
    title: 'JavaScript Basics for Beginners',
    slug: 'javascript-basics-for-beginners',
    content: `<p>This is a placeholder for the article: JavaScript Basics for Beginners. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on JavaScript Basics for Beginners.',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c3',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-19T07:49:16.721081Z',
    updatedAt: '2026-05-19T07:49:16.721081Z',
    readTime: 3,
    isFeatured: false,
    views: 442
  },
  {
    id: 'p12',
    title: 'ES6 Features Every Developer Should Know',
    slug: 'es6-features-every-developer-should-know',
    content: `<p>This is a placeholder for the article: ES6 Features Every Developer Should Know. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on ES6 Features Every Developer Should Know.',
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c3',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-12T07:49:16.721101Z',
    updatedAt: '2026-05-12T07:49:16.721101Z',
    readTime: 10,
    isFeatured: false,
    views: 1146
  },
  {
    id: 'p13',
    title: 'Async/Await Explained',
    slug: 'async-await-explained',
    content: `<p>This is a placeholder for the article: Async/Await Explained. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Async/Await Explained.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c3',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-25T07:49:16.721115Z',
    updatedAt: '2026-06-25T07:49:16.721115Z',
    readTime: 5,
    isFeatured: false,
    views: 2171
  },
  {
    id: 'p14',
    title: 'JavaScript Interview Questions',
    slug: 'javascript-interview-questions',
    content: `<p>This is a placeholder for the article: JavaScript Interview Questions. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on JavaScript Interview Questions.',
    featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c3',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-02T07:49:16.721127Z',
    updatedAt: '2026-05-02T07:49:16.721127Z',
    readTime: 5,
    isFeatured: false,
    views: 2240
  },
  {
    id: 'p15',
    title: 'DOM Manipulation Guide',
    slug: 'dom-manipulation-guide',
    content: `<p>This is a placeholder for the article: DOM Manipulation Guide. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on DOM Manipulation Guide.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c3',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-02T07:49:16.721145Z',
    updatedAt: '2026-07-02T07:49:16.721145Z',
    readTime: 6,
    isFeatured: false,
    views: 3194
  },
  {
    id: 'p16',
    title: 'What is Node.js?',
    slug: 'what-is-nodejs',
    content: `<p>This is a placeholder for the article: What is Node.js?. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on What is Node.js?.',
    featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c4',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-24T07:49:16.721161Z',
    updatedAt: '2026-06-24T07:49:16.721161Z',
    readTime: 5,
    isFeatured: false,
    views: 913
  },
  {
    id: 'p17',
    title: 'Build a REST API with Node.js',
    slug: 'build-a-rest-api-with-nodejs',
    content: `<p>This is a placeholder for the article: Build a REST API with Node.js. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Build a REST API with Node.js.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c4',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-05T07:49:16.721174Z',
    updatedAt: '2026-05-05T07:49:16.721174Z',
    readTime: 5,
    isFeatured: false,
    views: 2871
  },
  {
    id: 'p18',
    title: 'Node.js Authentication Tutorial',
    slug: 'nodejs-authentication-tutorial',
    content: `<p>This is a placeholder for the article: Node.js Authentication Tutorial. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Node.js Authentication Tutorial.',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c4',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-24T07:49:16.721193Z',
    updatedAt: '2026-05-24T07:49:16.721193Z',
    readTime: 9,
    isFeatured: false,
    views: 4026
  },
  {
    id: 'p19',
    title: 'Best Node.js Packages',
    slug: 'best-nodejs-packages',
    content: `<p>This is a placeholder for the article: Best Node.js Packages. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Best Node.js Packages.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c4',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-03T07:49:16.721206Z',
    updatedAt: '2026-05-03T07:49:16.721206Z',
    readTime: 10,
    isFeatured: false,
    views: 3059
  },
  {
    id: 'p20',
    title: 'Node.js Project Ideas',
    slug: 'nodejs-project-ideas',
    content: `<p>This is a placeholder for the article: Node.js Project Ideas. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Node.js Project Ideas.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c4',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-18T07:49:16.721218Z',
    updatedAt: '2026-04-18T07:49:16.721218Z',
    readTime: 3,
    isFeatured: false,
    views: 841
  },
  {
    id: 'p21',
    title: 'Express.js Complete Guide',
    slug: 'expressjs-complete-guide',
    content: `<p>This is a placeholder for the article: Express.js Complete Guide. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Express.js Complete Guide.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c5',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-08T07:49:16.721238Z',
    updatedAt: '2026-06-08T07:49:16.721238Z',
    readTime: 6,
    isFeatured: false,
    views: 350
  },
  {
    id: 'p22',
    title: 'Express Middleware Explained',
    slug: 'express-middleware-explained',
    content: `<p>This is a placeholder for the article: Express Middleware Explained. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Express Middleware Explained.',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c5',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-04T07:49:16.721252Z',
    updatedAt: '2026-05-04T07:49:16.721252Z',
    readTime: 7,
    isFeatured: false,
    views: 1182
  },
  {
    id: 'p23',
    title: 'Build CRUD API Using Express',
    slug: 'build-crud-api-using-express',
    content: `<p>This is a placeholder for the article: Build CRUD API Using Express. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Build CRUD API Using Express.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c5',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-21T07:49:16.721290Z',
    updatedAt: '2026-05-21T07:49:16.721290Z',
    readTime: 4,
    isFeatured: false,
    views: 3677
  },
  {
    id: 'p24',
    title: 'Error Handling in Express',
    slug: 'error-handling-in-express',
    content: `<p>This is a placeholder for the article: Error Handling in Express. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Error Handling in Express.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c5',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-17T07:49:16.721312Z',
    updatedAt: '2026-04-17T07:49:16.721312Z',
    readTime: 6,
    isFeatured: false,
    views: 4452
  },
  {
    id: 'p25',
    title: 'Express Authentication',
    slug: 'express-authentication',
    content: `<p>This is a placeholder for the article: Express Authentication. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Express Authentication.',
    featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c5',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-28T07:49:16.721326Z',
    updatedAt: '2026-05-28T07:49:16.721326Z',
    readTime: 4,
    isFeatured: false,
    views: 1005
  },
  {
    id: 'p26',
    title: 'MongoDB Basics',
    slug: 'mongodb-basics',
    content: `<p>This is a placeholder for the article: MongoDB Basics. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on MongoDB Basics.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c6',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-09T07:49:16.721341Z',
    updatedAt: '2026-07-09T07:49:16.721341Z',
    readTime: 7,
    isFeatured: false,
    views: 3599
  },
  {
    id: 'p27',
    title: 'CRUD Operations in MongoDB',
    slug: 'crud-operations-in-mongodb',
    content: `<p>This is a placeholder for the article: CRUD Operations in MongoDB. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on CRUD Operations in MongoDB.',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c6',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-08T07:49:16.721352Z',
    updatedAt: '2026-04-08T07:49:16.721352Z',
    readTime: 10,
    isFeatured: false,
    views: 2330
  },
  {
    id: 'p28',
    title: 'MongoDB Aggregation Framework',
    slug: 'mongodb-aggregation-framework',
    content: `<p>This is a placeholder for the article: MongoDB Aggregation Framework. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on MongoDB Aggregation Framework.',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c6',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-27T07:49:16.721371Z',
    updatedAt: '2026-06-27T07:49:16.721371Z',
    readTime: 6,
    isFeatured: false,
    views: 4254
  },
  {
    id: 'p29',
    title: 'MongoDB Atlas Setup',
    slug: 'mongodb-atlas-setup',
    content: `<p>This is a placeholder for the article: MongoDB Atlas Setup. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on MongoDB Atlas Setup.',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c6',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-14T07:49:16.721384Z',
    updatedAt: '2026-07-14T07:49:16.721384Z',
    readTime: 3,
    isFeatured: false,
    views: 4975
  },
  {
    id: 'p30',
    title: 'MongoDB Best Practices',
    slug: 'mongodb-best-practices',
    content: `<p>This is a placeholder for the article: MongoDB Best Practices. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on MongoDB Best Practices.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c6',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-08T07:49:16.721395Z',
    updatedAt: '2026-06-08T07:49:16.721395Z',
    readTime: 4,
    isFeatured: false,
    views: 3771
  },
  {
    id: 'p31',
    title: 'WordPress Beginner Guide',
    slug: 'wordpress-beginner-guide',
    content: `<p>This is a placeholder for the article: WordPress Beginner Guide. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on WordPress Beginner Guide.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c7',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-27T07:49:16.721416Z',
    updatedAt: '2026-06-27T07:49:16.721416Z',
    readTime: 10,
    isFeatured: false,
    views: 3625
  },
  {
    id: 'p32',
    title: 'Best WordPress Themes',
    slug: 'best-wordpress-themes',
    content: `<p>This is a placeholder for the article: Best WordPress Themes. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Best WordPress Themes.',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c7',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-08T07:49:16.721429Z',
    updatedAt: '2026-07-08T07:49:16.721429Z',
    readTime: 5,
    isFeatured: false,
    views: 4105
  },
  {
    id: 'p33',
    title: 'Must-Have Plugins',
    slug: 'must-have-plugins',
    content: `<p>This is a placeholder for the article: Must-Have Plugins. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Must-Have Plugins.',
    featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c7',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-12T07:49:16.721440Z',
    updatedAt: '2026-07-12T07:49:16.721440Z',
    readTime: 3,
    isFeatured: false,
    views: 3882
  },
  {
    id: 'p34',
    title: 'Improve WordPress Speed',
    slug: 'improve-wordpress-speed',
    content: `<p>This is a placeholder for the article: Improve WordPress Speed. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Improve WordPress Speed.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c7',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-10T07:49:16.721458Z',
    updatedAt: '2026-07-10T07:49:16.721458Z',
    readTime: 9,
    isFeatured: false,
    views: 3240
  },
  {
    id: 'p35',
    title: 'WordPress SEO Guide',
    slug: 'wordpress-seo-guide',
    content: `<p>This is a placeholder for the article: WordPress SEO Guide. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on WordPress SEO Guide.',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c7',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-02T07:49:16.721472Z',
    updatedAt: '2026-06-02T07:49:16.721472Z',
    readTime: 8,
    isFeatured: false,
    views: 936
  },
  {
    id: 'p36',
    title: 'Shopify Store Setup Guide',
    slug: 'shopify-store-setup-guide',
    content: `<p>This is a placeholder for the article: Shopify Store Setup Guide. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Shopify Store Setup Guide.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c8',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-26T07:49:16.721486Z',
    updatedAt: '2026-06-26T07:49:16.721486Z',
    readTime: 10,
    isFeatured: false,
    views: 4591
  },
  {
    id: 'p37',
    title: 'Best Shopify Apps',
    slug: 'best-shopify-apps',
    content: `<p>This is a placeholder for the article: Best Shopify Apps. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Best Shopify Apps.',
    featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c8',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-17T07:49:16.721519Z',
    updatedAt: '2026-04-17T07:49:16.721519Z',
    readTime: 4,
    isFeatured: false,
    views: 2297
  },
  {
    id: 'p38',
    title: 'Shopify SEO Tips',
    slug: 'shopify-seo-tips',
    content: `<p>This is a placeholder for the article: Shopify SEO Tips. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Shopify SEO Tips.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c8',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-26T07:49:16.721534Z',
    updatedAt: '2026-05-26T07:49:16.721534Z',
    readTime: 7,
    isFeatured: false,
    views: 2672
  },
  {
    id: 'p39',
    title: 'Dropshipping with Shopify',
    slug: 'dropshipping-with-shopify',
    content: `<p>This is a placeholder for the article: Dropshipping with Shopify. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Dropshipping with Shopify.',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c8',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-17T07:49:16.721546Z',
    updatedAt: '2026-05-17T07:49:16.721546Z',
    readTime: 7,
    isFeatured: false,
    views: 2602
  },
  {
    id: 'p40',
    title: 'Shopify vs WooCommerce',
    slug: 'shopify-vs-woocommerce',
    content: `<p>This is a placeholder for the article: Shopify vs WooCommerce. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Shopify vs WooCommerce.',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c8',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-18T07:49:16.721557Z',
    updatedAt: '2026-04-18T07:49:16.721557Z',
    readTime: 5,
    isFeatured: false,
    views: 2015
  },
  {
    id: 'p41',
    title: 'Python for Beginners',
    slug: 'python-for-beginners',
    content: `<p>This is a placeholder for the article: Python for Beginners. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Python for Beginners.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c9',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-04T07:49:16.721578Z',
    updatedAt: '2026-07-04T07:49:16.721578Z',
    readTime: 8,
    isFeatured: false,
    views: 3337
  },
  {
    id: 'p42',
    title: 'Python Project Ideas',
    slug: 'python-project-ideas',
    content: `<p>This is a placeholder for the article: Python Project Ideas. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Python Project Ideas.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c9',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-28T07:49:16.721591Z',
    updatedAt: '2026-04-28T07:49:16.721591Z',
    readTime: 8,
    isFeatured: false,
    views: 451
  },
  {
    id: 'p43',
    title: 'Best Python Libraries',
    slug: 'best-python-libraries',
    content: `<p>This is a placeholder for the article: Best Python Libraries. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Best Python Libraries.',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c9',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-09T07:49:16.721603Z',
    updatedAt: '2026-05-09T07:49:16.721603Z',
    readTime: 8,
    isFeatured: false,
    views: 4684
  },
  {
    id: 'p44',
    title: 'Python Automation Scripts',
    slug: 'python-automation-scripts',
    content: `<p>This is a placeholder for the article: Python Automation Scripts. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Python Automation Scripts.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c9',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-18T07:49:16.721621Z',
    updatedAt: '2026-05-18T07:49:16.721621Z',
    readTime: 6,
    isFeatured: false,
    views: 4143
  },
  {
    id: 'p45',
    title: 'Python vs JavaScript',
    slug: 'python-vs-javascript',
    content: `<p>This is a placeholder for the article: Python vs JavaScript. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Python vs JavaScript.',
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c9',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-12T07:49:16.721634Z',
    updatedAt: '2026-06-12T07:49:16.721634Z',
    readTime: 6,
    isFeatured: false,
    views: 2961
  },
  {
    id: 'p46',
    title: 'Flask Beginner Tutorial',
    slug: 'flask-beginner-tutorial',
    content: `<p>This is a placeholder for the article: Flask Beginner Tutorial. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Flask Beginner Tutorial.',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c10',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-25T07:49:16.721648Z',
    updatedAt: '2026-04-25T07:49:16.721648Z',
    readTime: 7,
    isFeatured: false,
    views: 1486
  },
  {
    id: 'p47',
    title: 'Flask Authentication',
    slug: 'flask-authentication',
    content: `<p>This is a placeholder for the article: Flask Authentication. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Flask Authentication.',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c10',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-18T07:49:16.721666Z',
    updatedAt: '2026-04-18T07:49:16.721666Z',
    readTime: 5,
    isFeatured: false,
    views: 1690
  },
  {
    id: 'p48',
    title: 'Flask REST API',
    slug: 'flask-rest-api',
    content: `<p>This is a placeholder for the article: Flask REST API. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Flask REST API.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c10',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-13T07:49:16.721679Z',
    updatedAt: '2026-05-13T07:49:16.721679Z',
    readTime: 7,
    isFeatured: false,
    views: 3889
  },
  {
    id: 'p49',
    title: 'Flask vs Django',
    slug: 'flask-vs-django',
    content: `<p>This is a placeholder for the article: Flask vs Django. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Flask vs Django.',
    featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c10',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-13T07:49:16.721691Z',
    updatedAt: '2026-05-13T07:49:16.721691Z',
    readTime: 4,
    isFeatured: false,
    views: 1486
  },
  {
    id: 'p50',
    title: 'Deploy Flask App',
    slug: 'deploy-flask-app',
    content: `<p>This is a placeholder for the article: Deploy Flask App. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Deploy Flask App.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c10',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-26T07:49:16.721708Z',
    updatedAt: '2026-04-26T07:49:16.721708Z',
    readTime: 10,
    isFeatured: false,
    views: 369
  },
  {
    id: 'p51',
    title: 'UI vs UX Explained',
    slug: 'ui-vs-ux-explained',
    content: `<p>This is a placeholder for the article: UI vs UX Explained. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on UI vs UX Explained.',
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c11',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-09T07:49:16.721726Z',
    updatedAt: '2026-04-09T07:49:16.721726Z',
    readTime: 6,
    isFeatured: false,
    views: 2741
  },
  {
    id: 'p52',
    title: 'Color Theory in UI Design',
    slug: 'color-theory-in-ui-design',
    content: `<p>This is a placeholder for the article: Color Theory in UI Design. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Color Theory in UI Design.',
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c11',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-12T07:49:16.721738Z',
    updatedAt: '2026-07-12T07:49:16.721738Z',
    readTime: 10,
    isFeatured: false,
    views: 3316
  },
  {
    id: 'p53',
    title: 'UX Research Guide',
    slug: 'ux-research-guide',
    content: `<p>This is a placeholder for the article: UX Research Guide. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on UX Research Guide.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c11',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-26T07:49:16.721749Z',
    updatedAt: '2026-05-26T07:49:16.721749Z',
    readTime: 5,
    isFeatured: false,
    views: 693
  },
  {
    id: 'p54',
    title: 'Mobile UI Best Practices',
    slug: 'mobile-ui-best-practices',
    content: `<p>This is a placeholder for the article: Mobile UI Best Practices. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Mobile UI Best Practices.',
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c11',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-28T07:49:16.721767Z',
    updatedAt: '2026-05-28T07:49:16.721767Z',
    readTime: 10,
    isFeatured: false,
    views: 2911
  },
  {
    id: 'p55',
    title: 'Figma Beginner Guide',
    slug: 'figma-beginner-guide',
    content: `<p>This is a placeholder for the article: Figma Beginner Guide. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Figma Beginner Guide.',
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c11',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-29T07:49:16.721781Z',
    updatedAt: '2026-05-29T07:49:16.721781Z',
    readTime: 7,
    isFeatured: false,
    views: 2891
  },
  {
    id: 'p56',
    title: 'Canva vs Photoshop',
    slug: 'canva-vs-photoshop',
    content: `<p>This is a placeholder for the article: Canva vs Photoshop. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Canva vs Photoshop.',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c12',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-20T07:49:16.721795Z',
    updatedAt: '2026-06-20T07:49:16.721795Z',
    readTime: 3,
    isFeatured: false,
    views: 3742
  },
  {
    id: 'p57',
    title: 'Graphic Design Trends 2026',
    slug: 'graphic-design-trends-2026',
    content: `<p>This is a placeholder for the article: Graphic Design Trends 2026. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Graphic Design Trends 2026.',
    featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c12',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-04T07:49:16.721858Z',
    updatedAt: '2026-06-04T07:49:16.721858Z',
    readTime: 10,
    isFeatured: false,
    views: 4695
  },
  {
    id: 'p58',
    title: 'Logo Design Tips',
    slug: 'logo-design-tips',
    content: `<p>This is a placeholder for the article: Logo Design Tips. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Logo Design Tips.',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c12',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-16T07:49:16.721873Z',
    updatedAt: '2026-07-16T07:49:16.721873Z',
    readTime: 10,
    isFeatured: false,
    views: 1235
  },
  {
    id: 'p59',
    title: 'Typography Basics',
    slug: 'typography-basics',
    content: `<p>This is a placeholder for the article: Typography Basics. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Typography Basics.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c12',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-28T07:49:16.721885Z',
    updatedAt: '2026-06-28T07:49:16.721885Z',
    readTime: 10,
    isFeatured: false,
    views: 1475
  },
  {
    id: 'p60',
    title: 'Free Design Resources',
    slug: 'free-design-resources',
    content: `<p>This is a placeholder for the article: Free Design Resources. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Free Design Resources.',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c12',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-04T07:49:16.721903Z',
    updatedAt: '2026-07-04T07:49:16.721903Z',
    readTime: 7,
    isFeatured: false,
    views: 922
  },
  {
    id: 'p61',
    title: 'What is SEO?',
    slug: 'what-is-seo',
    content: `<p>This is a placeholder for the article: What is SEO?. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on What is SEO?.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c13',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-02T07:49:16.721920Z',
    updatedAt: '2026-07-02T07:49:16.721920Z',
    readTime: 6,
    isFeatured: false,
    views: 699
  },
  {
    id: 'p62',
    title: 'On-Page SEO Checklist',
    slug: 'on-page-seo-checklist',
    content: `<p>This is a placeholder for the article: On-Page SEO Checklist. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on On-Page SEO Checklist.',
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c13',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-20T07:49:16.721932Z',
    updatedAt: '2026-05-20T07:49:16.721932Z',
    readTime: 4,
    isFeatured: false,
    views: 2258
  },
  {
    id: 'p63',
    title: 'Technical SEO Guide',
    slug: 'technical-seo-guide',
    content: `<p>This is a placeholder for the article: Technical SEO Guide. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Technical SEO Guide.',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c13',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-11T07:49:16.721950Z',
    updatedAt: '2026-07-11T07:49:16.721950Z',
    readTime: 4,
    isFeatured: false,
    views: 1644
  },
  {
    id: 'p64',
    title: 'Keyword Research for Beginners',
    slug: 'keyword-research-for-beginners',
    content: `<p>This is a placeholder for the article: Keyword Research for Beginners. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Keyword Research for Beginners.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c13',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-07T07:49:16.721964Z',
    updatedAt: '2026-07-07T07:49:16.721964Z',
    readTime: 8,
    isFeatured: false,
    views: 166
  },
  {
    id: 'p65',
    title: 'Google Ranking Factors',
    slug: 'google-ranking-factors',
    content: `<p>This is a placeholder for the article: Google Ranking Factors. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Google Ranking Factors.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c13',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-08T07:49:16.721976Z',
    updatedAt: '2026-07-08T07:49:16.721976Z',
    readTime: 10,
    isFeatured: false,
    views: 3425
  },
  {
    id: 'p66',
    title: 'Digital Marketing Basics',
    slug: 'digital-marketing-basics',
    content: `<p>This is a placeholder for the article: Digital Marketing Basics. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Digital Marketing Basics.',
    featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c14',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-25T07:49:16.721990Z',
    updatedAt: '2026-04-25T07:49:16.721990Z',
    readTime: 9,
    isFeatured: false,
    views: 4202
  },
  {
    id: 'p67',
    title: 'Email Marketing Guide',
    slug: 'email-marketing-guide',
    content: `<p>This is a placeholder for the article: Email Marketing Guide. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Email Marketing Guide.',
    featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c14',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-15T07:49:16.722008Z',
    updatedAt: '2026-06-15T07:49:16.722008Z',
    readTime: 4,
    isFeatured: false,
    views: 614
  },
  {
    id: 'p68',
    title: 'PPC vs SEO',
    slug: 'ppc-vs-seo',
    content: `<p>This is a placeholder for the article: PPC vs SEO. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on PPC vs SEO.',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c14',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-20T07:49:16.722022Z',
    updatedAt: '2026-06-20T07:49:16.722022Z',
    readTime: 6,
    isFeatured: false,
    views: 1574
  },
  {
    id: 'p69',
    title: 'Content Marketing Strategy',
    slug: 'content-marketing-strategy',
    content: `<p>This is a placeholder for the article: Content Marketing Strategy. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Content Marketing Strategy.',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c14',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-09T07:49:16.722038Z',
    updatedAt: '2026-06-09T07:49:16.722038Z',
    readTime: 6,
    isFeatured: false,
    views: 783
  },
  {
    id: 'p70',
    title: 'Affiliate Marketing Guide',
    slug: 'affiliate-marketing-guide',
    content: `<p>This is a placeholder for the article: Affiliate Marketing Guide. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Affiliate Marketing Guide.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c14',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-13T07:49:16.722059Z',
    updatedAt: '2026-07-13T07:49:16.722059Z',
    readTime: 4,
    isFeatured: false,
    views: 1417
  },
  {
    id: 'p71',
    title: 'Instagram Growth Tips',
    slug: 'instagram-growth-tips',
    content: `<p>This is a placeholder for the article: Instagram Growth Tips. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Instagram Growth Tips.',
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c15',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-26T07:49:16.722076Z',
    updatedAt: '2026-04-26T07:49:16.722076Z',
    readTime: 7,
    isFeatured: false,
    views: 3414
  },
  {
    id: 'p72',
    title: 'Facebook Marketing Guide',
    slug: 'facebook-marketing-guide',
    content: `<p>This is a placeholder for the article: Facebook Marketing Guide. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Facebook Marketing Guide.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c15',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-03T07:49:16.722087Z',
    updatedAt: '2026-07-03T07:49:16.722087Z',
    readTime: 9,
    isFeatured: false,
    views: 1015
  },
  {
    id: 'p73',
    title: 'LinkedIn Marketing',
    slug: 'linkedin-marketing',
    content: `<p>This is a placeholder for the article: LinkedIn Marketing. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on LinkedIn Marketing.',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c15',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-28T07:49:16.722106Z',
    updatedAt: '2026-04-28T07:49:16.722106Z',
    readTime: 4,
    isFeatured: false,
    views: 3032
  },
  {
    id: 'p74',
    title: 'TikTok Marketing Strategy',
    slug: 'tiktok-marketing-strategy',
    content: `<p>This is a placeholder for the article: TikTok Marketing Strategy. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on TikTok Marketing Strategy.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c15',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-17T07:49:16.722119Z',
    updatedAt: '2026-05-17T07:49:16.722119Z',
    readTime: 3,
    isFeatured: false,
    views: 523
  },
  {
    id: 'p75',
    title: 'Social Media Content Calendar',
    slug: 'social-media-content-calendar',
    content: `<p>This is a placeholder for the article: Social Media Content Calendar. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Social Media Content Calendar.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c15',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-08T07:49:16.722131Z',
    updatedAt: '2026-07-08T07:49:16.722131Z',
    readTime: 8,
    isFeatured: false,
    views: 96
  },
  {
    id: 'p76',
    title: 'What is YouTube Automation?',
    slug: 'what-is-youtube-automation',
    content: `<p>This is a placeholder for the article: What is YouTube Automation?. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on What is YouTube Automation?.',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c16',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-12T07:49:16.722152Z',
    updatedAt: '2026-06-12T07:49:16.722152Z',
    readTime: 8,
    isFeatured: false,
    views: 534
  },
  {
    id: 'p77',
    title: 'Best Niches for 2026',
    slug: 'best-niches-for-2026',
    content: `<p>This is a placeholder for the article: Best Niches for 2026. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Best Niches for 2026.',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c16',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-13T07:49:16.722167Z',
    updatedAt: '2026-05-13T07:49:16.722167Z',
    readTime: 6,
    isFeatured: false,
    views: 3139
  },
  {
    id: 'p78',
    title: 'How to Find Viral Topics',
    slug: 'how-to-find-viral-topics',
    content: `<p>This is a placeholder for the article: How to Find Viral Topics. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on How to Find Viral Topics.',
    featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c16',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-21T07:49:16.722179Z',
    updatedAt: '2026-05-21T07:49:16.722179Z',
    readTime: 8,
    isFeatured: false,
    views: 767
  },
  {
    id: 'p79',
    title: 'YouTube SEO Guide',
    slug: 'youtube-seo-guide',
    content: `<p>This is a placeholder for the article: YouTube SEO Guide. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on YouTube SEO Guide.',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c16',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-02T07:49:16.722196Z',
    updatedAt: '2026-06-02T07:49:16.722196Z',
    readTime: 8,
    isFeatured: false,
    views: 996
  },
  {
    id: 'p80',
    title: 'Monetization Tips',
    slug: 'monetization-tips',
    content: `<p>This is a placeholder for the article: Monetization Tips. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Monetization Tips.',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c16',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-17T07:49:16.722210Z',
    updatedAt: '2026-07-17T07:49:16.722210Z',
    readTime: 5,
    isFeatured: false,
    views: 415
  },
  {
    id: 'p81',
    title: 'Resume Writing Guide',
    slug: 'resume-writing-guide',
    content: `<p>This is a placeholder for the article: Resume Writing Guide. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Resume Writing Guide.',
    featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c17',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-22T07:49:16.722225Z',
    updatedAt: '2026-06-22T07:49:16.722225Z',
    readTime: 6,
    isFeatured: false,
    views: 2447
  },
  {
    id: 'p82',
    title: 'Interview Preparation',
    slug: 'interview-preparation',
    content: `<p>This is a placeholder for the article: Interview Preparation. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Interview Preparation.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c17',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-11T07:49:16.722236Z',
    updatedAt: '2026-04-11T07:49:16.722236Z',
    readTime: 4,
    isFeatured: false,
    views: 4191
  },
  {
    id: 'p83',
    title: 'Remote Jobs Guide',
    slug: 'remote-jobs-guide',
    content: `<p>This is a placeholder for the article: Remote Jobs Guide. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Remote Jobs Guide.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c17',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-11T07:49:16.722253Z',
    updatedAt: '2026-04-11T07:49:16.722253Z',
    readTime: 9,
    isFeatured: false,
    views: 4933
  },
  {
    id: 'p84',
    title: 'Soft Skills for Developers',
    slug: 'soft-skills-for-developers',
    content: `<p>This is a placeholder for the article: Soft Skills for Developers. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Soft Skills for Developers.',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c17',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-09T07:49:16.722267Z',
    updatedAt: '2026-04-09T07:49:16.722267Z',
    readTime: 5,
    isFeatured: false,
    views: 2834
  },
  {
    id: 'p85',
    title: 'Time Management Tips',
    slug: 'time-management-tips',
    content: `<p>This is a placeholder for the article: Time Management Tips. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Time Management Tips.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c17',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-12T07:49:16.722279Z',
    updatedAt: '2026-07-12T07:49:16.722279Z',
    readTime: 5,
    isFeatured: false,
    views: 1064
  },
  {
    id: 'p86',
    title: 'Freelancing for Beginners',
    slug: 'freelancing-for-beginners',
    content: `<p>This is a placeholder for the article: Freelancing for Beginners. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Freelancing for Beginners.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c18',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-27T07:49:16.722329Z',
    updatedAt: '2026-04-27T07:49:16.722329Z',
    readTime: 4,
    isFeatured: false,
    views: 2017
  },
  {
    id: 'p87',
    title: 'How to Get Your First Client',
    slug: 'how-to-get-your-first-client',
    content: `<p>This is a placeholder for the article: How to Get Your First Client. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on How to Get Your First Client.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c18',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-04T07:49:16.722389Z',
    updatedAt: '2026-07-04T07:49:16.722389Z',
    readTime: 7,
    isFeatured: false,
    views: 923
  },
  {
    id: 'p88',
    title: 'Build a Strong Portfolio',
    slug: 'build-a-strong-portfolio',
    content: `<p>This is a placeholder for the article: Build a Strong Portfolio. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Build a Strong Portfolio.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c18',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-15T07:49:16.722403Z',
    updatedAt: '2026-04-15T07:49:16.722403Z',
    readTime: 8,
    isFeatured: false,
    views: 4226
  },
  {
    id: 'p89',
    title: 'Freelancing Mistakes',
    slug: 'freelancing-mistakes',
    content: `<p>This is a placeholder for the article: Freelancing Mistakes. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Freelancing Mistakes.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c18',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-16T07:49:16.722424Z',
    updatedAt: '2026-07-16T07:49:16.722424Z',
    readTime: 8,
    isFeatured: false,
    views: 3183
  },
  {
    id: 'p90',
    title: 'Freelance Pricing Guide',
    slug: 'freelance-pricing-guide',
    content: `<p>This is a placeholder for the article: Freelance Pricing Guide. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Freelance Pricing Guide.',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c18',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-23T07:49:16.722438Z',
    updatedAt: '2026-04-23T07:49:16.722438Z',
    readTime: 3,
    isFeatured: false,
    views: 1651
  },
  {
    id: 'p91',
    title: 'Fiverr Gig SEO',
    slug: 'fiverr-gig-seo',
    content: `<p>This is a placeholder for the article: Fiverr Gig SEO. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Fiverr Gig SEO.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c19',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-03T07:49:16.722453Z',
    updatedAt: '2026-05-03T07:49:16.722453Z',
    readTime: 4,
    isFeatured: false,
    views: 2499
  },
  {
    id: 'p92',
    title: 'Create High-Converting Gigs',
    slug: 'create-high-converting-gigs',
    content: `<p>This is a placeholder for the article: Create High-Converting Gigs. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Create High-Converting Gigs.',
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c19',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-04T07:49:16.722499Z',
    updatedAt: '2026-07-04T07:49:16.722499Z',
    readTime: 10,
    isFeatured: false,
    views: 776
  },
  {
    id: 'p93',
    title: 'Fiverr Profile Optimization',
    slug: 'fiverr-profile-optimization',
    content: `<p>This is a placeholder for the article: Fiverr Profile Optimization. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Fiverr Profile Optimization.',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c19',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-23T07:49:16.722521Z',
    updatedAt: '2026-05-23T07:49:16.722521Z',
    readTime: 6,
    isFeatured: false,
    views: 2363
  },
  {
    id: 'p94',
    title: 'Fiverr Level System',
    slug: 'fiverr-level-system',
    content: `<p>This is a placeholder for the article: Fiverr Level System. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Fiverr Level System.',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c19',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-04T07:49:16.722534Z',
    updatedAt: '2026-05-04T07:49:16.722534Z',
    readTime: 6,
    isFeatured: false,
    views: 1210
  },
  {
    id: 'p95',
    title: 'Get First Order Fast',
    slug: 'get-first-order-fast',
    content: `<p>This is a placeholder for the article: Get First Order Fast. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Get First Order Fast.',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c19',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-01T07:49:16.722558Z',
    updatedAt: '2026-07-01T07:49:16.722558Z',
    readTime: 9,
    isFeatured: false,
    views: 1446
  },
  {
    id: 'p96',
    title: 'Upwork Profile Optimization',
    slug: 'upwork-profile-optimization',
    content: `<p>This is a placeholder for the article: Upwork Profile Optimization. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Upwork Profile Optimization.',
    featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c20',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-10T07:49:16.722576Z',
    updatedAt: '2026-06-10T07:49:16.722576Z',
    readTime: 10,
    isFeatured: false,
    views: 2279
  },
  {
    id: 'p97',
    title: 'Winning Proposal Writing',
    slug: 'winning-proposal-writing',
    content: `<p>This is a placeholder for the article: Winning Proposal Writing. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Winning Proposal Writing.',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c20',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-28T07:49:16.722588Z',
    updatedAt: '2026-05-28T07:49:16.722588Z',
    readTime: 10,
    isFeatured: false,
    views: 4123
  },
  {
    id: 'p98',
    title: 'Upwork Connects Strategy',
    slug: 'upwork-connects-strategy',
    content: `<p>This is a placeholder for the article: Upwork Connects Strategy. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Upwork Connects Strategy.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c20',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-09T07:49:16.722600Z',
    updatedAt: '2026-07-09T07:49:16.722600Z',
    readTime: 7,
    isFeatured: false,
    views: 3260
  },
  {
    id: 'p99',
    title: 'Get Long-Term Clients',
    slug: 'get-long-term-clients',
    content: `<p>This is a placeholder for the article: Get Long-Term Clients. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Get Long-Term Clients.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c20',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-08T07:49:16.722618Z',
    updatedAt: '2026-05-08T07:49:16.722618Z',
    readTime: 3,
    isFeatured: false,
    views: 4424
  },
  {
    id: 'p100',
    title: 'Upwork Interview Tips',
    slug: 'upwork-interview-tips',
    content: `<p>This is a placeholder for the article: Upwork Interview Tips. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Upwork Interview Tips.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c20',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-27T07:49:16.722632Z',
    updatedAt: '2026-04-27T07:49:16.722632Z',
    readTime: 9,
    isFeatured: false,
    views: 3736
  },
  {
    id: 'p101',
    title: 'Best Free AI Tools in 2026',
    slug: 'best-free-ai-tools-in-2026',
    content: `<p>This is a placeholder for the article: Best Free AI Tools in 2026. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Best Free AI Tools in 2026.',
    featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c21',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-10T07:49:16.722648Z',
    updatedAt: '2026-05-10T07:49:16.722648Z',
    readTime: 4,
    isFeatured: false,
    views: 885
  },
  {
    id: 'p102',
    title: 'AI Tools for Developers',
    slug: 'ai-tools-for-developers',
    content: `<p>This is a placeholder for the article: AI Tools for Developers. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on AI Tools for Developers.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c21',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-03T07:49:16.722666Z',
    updatedAt: '2026-06-03T07:49:16.722666Z',
    readTime: 6,
    isFeatured: false,
    views: 1818
  },
  {
    id: 'p103',
    title: 'AI Tools for Designers',
    slug: 'ai-tools-for-designers',
    content: `<p>This is a placeholder for the article: AI Tools for Designers. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on AI Tools for Designers.',
    featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c21',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-17T07:49:16.722681Z',
    updatedAt: '2026-06-17T07:49:16.722681Z',
    readTime: 6,
    isFeatured: false,
    views: 867
  },
  {
    id: 'p104',
    title: 'AI Tools for Students',
    slug: 'ai-tools-for-students',
    content: `<p>This is a placeholder for the article: AI Tools for Students. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on AI Tools for Students.',
    featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c21',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-07-15T07:49:16.722692Z',
    updatedAt: '2026-07-15T07:49:16.722692Z',
    readTime: 3,
    isFeatured: false,
    views: 3137
  },
  {
    id: 'p105',
    title: 'ChatGPT Productivity Tips',
    slug: 'chatgpt-productivity-tips',
    content: `<p>This is a placeholder for the article: ChatGPT Productivity Tips. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on ChatGPT Productivity Tips.',
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c21',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-13T07:49:16.722710Z',
    updatedAt: '2026-04-13T07:49:16.722710Z',
    readTime: 6,
    isFeatured: false,
    views: 2024
  },
  {
    id: 'p106',
    title: 'Weekly AI News Roundup',
    slug: 'weekly-ai-news-roundup',
    content: `<p>This is a placeholder for the article: Weekly AI News Roundup. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Weekly AI News Roundup.',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c22',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-28T07:49:16.722727Z',
    updatedAt: '2026-05-28T07:49:16.722727Z',
    readTime: 5,
    isFeatured: false,
    views: 2476
  },
  {
    id: 'p107',
    title: 'Latest Google Updates',
    slug: 'latest-google-updates',
    content: `<p>This is a placeholder for the article: Latest Google Updates. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Latest Google Updates.',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c22',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-13T07:49:16.722738Z',
    updatedAt: '2026-06-13T07:49:16.722738Z',
    readTime: 8,
    isFeatured: false,
    views: 4782
  },
  {
    id: 'p108',
    title: 'Microsoft AI Updates',
    slug: 'microsoft-ai-updates',
    content: `<p>This is a placeholder for the article: Microsoft AI Updates. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Microsoft AI Updates.',
    featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c22',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-29T07:49:16.722756Z',
    updatedAt: '2026-05-29T07:49:16.722756Z',
    readTime: 6,
    isFeatured: false,
    views: 3312
  },
  {
    id: 'p109',
    title: 'Apple Technology News',
    slug: 'apple-technology-news',
    content: `<p>This is a placeholder for the article: Apple Technology News. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Apple Technology News.',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c22',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-04-11T07:49:16.722769Z',
    updatedAt: '2026-04-11T07:49:16.722769Z',
    readTime: 10,
    isFeatured: false,
    views: 552
  },
  {
    id: 'p110',
    title: 'Web Development Trends',
    slug: 'web-development-trends',
    content: `<p>This is a placeholder for the article: Web Development Trends. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Web Development Trends.',
    featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c22',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-05-31T07:49:16.722781Z',
    updatedAt: '2026-05-31T07:49:16.722781Z',
    readTime: 4,
    isFeatured: false,
    views: 4574
  },
  {
    id: 'p111',
    title: 'Cybersecurity News',
    slug: 'cybersecurity-news',
    content: `<p>This is a placeholder for the article: Cybersecurity News. Full content coming soon.</p>`,
    excerpt: 'Read the full guide on Cybersecurity News.',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    authorId: 'a1',
    categoryId: 'c22',
    tags: ['t1'],
    status: 'published',
    publishedAt: '2026-06-07T07:49:16.722799Z',
    updatedAt: '2026-06-07T07:49:16.722799Z',
    readTime: 3,
    isFeatured: false,
    views: 767
  }
];


export const BlogProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('csa_blog_posts');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length >= defaultPosts.length) return parsed;
    }
    return defaultPosts;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('csa_blog_categories');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length >= defaultCategories.length) return parsed;
    }
    return defaultCategories;
  });

  const [tags, setTags] = useState<Tag[]>(() => {
    const saved = localStorage.getItem('csa_blog_tags');
    return saved ? JSON.parse(saved) : defaultTags;
  });

  const [authors, setAuthors] = useState<Author[]>(() => {
    const saved = localStorage.getItem('csa_blog_authors');
    return saved ? JSON.parse(saved) : defaultAuthors;
  });

  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem('csa_blog_comments');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => { localStorage.setItem('csa_blog_posts', JSON.stringify(posts)); }, [posts]);
  useEffect(() => { localStorage.setItem('csa_blog_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('csa_blog_tags', JSON.stringify(tags)); }, [tags]);
  useEffect(() => { localStorage.setItem('csa_blog_authors', JSON.stringify(authors)); }, [authors]);
  useEffect(() => { localStorage.setItem('csa_blog_comments', JSON.stringify(comments)); }, [comments]);

  return (
    <BlogContext.Provider value={{ posts, categories, tags, authors, comments, setPosts, setCategories, setTags, setAuthors, setComments }}>
      {children}
    </BlogContext.Provider>
  );
};
