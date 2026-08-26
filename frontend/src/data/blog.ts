const userProfileImage = "https://res.cloudinary.com/z6sk8xam/image/upload/v1787728902/vwt6iylhaqxmqhdpa3i2.png";

export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  readTime: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of AI in Web Development',
    excerpt: 'Exploring how AI is transforming the way we build modern websites.',
    content: 'Artificial Intelligence is no longer just a futuristic concept—it is actively reshaping how we build, optimize, and maintain web platforms today. From intelligent design assistants to code generation engines and personalized user experiences, AI is accelerating our development cycles while driving higher business performance. In this article, we explore the primary ways AI is transforming the web development landscape in 2026, including automated testing, smart layouts, real-time translations, and interactive customer portals.',
    category: 'AI Solutions',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600&h=400',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Modern UI/UX Design Trends 2026',
    excerpt: 'Top trends in UI/UX design to keep your website looking fresh.',
    content: 'User experience is the single most important factor for online success. As digital products evolve, designers are turning toward highly immersive, responsive, and tactile interfaces that capture human emotion. This year, we are seeing a shift toward sophisticated glassmorphic cards, hyper-personalized dashboard designs, micro-interactions that guide users organically, and minimalist bento grids. Learn how you can implement these top UX patterns to engage your audience and dramatically increase key performance metrics.',
    category: 'UI/UX Design',
    image: userProfileImage,
    readTime: '4 min read'
  },
  {
    id: 3,
    title: 'Optimizing Website Performance for SEO',
    excerpt: 'Proven strategies to improve your Google ranking.',
    content: 'A stunning website is only effective if your target audience can find it. SEO is a constantly shifting landscape, and search engines are prioritizing user experience, page speed, and interactive accessibility more than ever. This guide covers actionable strategies to achieve pristine Core Web Vitals, optimize server-side response times, map semantic keyword layouts, build natural link relationships, and ensure your site is completely mobile-responsive.',
    category: 'SEO',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400',
    readTime: '6 min read'
  }
];
