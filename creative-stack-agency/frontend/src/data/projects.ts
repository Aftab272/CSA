export type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  shortDescription: string;
  techStack: { frontend: string[], backend: string[], database: string[], deployment: string[], other: string[] };
  features: string[];
  gallery: string[];
  githubUrl?: string;
  liveUrl?: string;
  clientReview?: {
    name: string;
    text: string;
    rating: number;
  };
  completionDate: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'Team4Stack Platform',
    category: 'Platform',
    shortDescription: 'A centralized ecosystem for project management, learning, and growth.',
    description: 'Building the Future of Team Collaboration & Digital Innovation. A centralized ecosystem featuring a Landing Page, Dashboard, User Profile, and Team Workspace.',
    techStack: { frontend: ['React.js', 'Next.js', 'Tailwind CSS'], backend: ['Node.js', 'Express.js'], database: ['MongoDB'], deployment: ['Vercel'], other: ['Figma'] },
    features: ['Project Management', 'User Profile', 'Team Workspace', 'Dashboard'],
    gallery: ['/src/assets/images/Team4stack.png'],
    liveUrl: 'https://www.team4stack.com',
    completionDate: '2026-07-17'
  },
  {
    id: 2,
    title: 'AURELIUS Collection',
    category: 'Web Development',
    shortDescription: 'Modern collection showcase platform.',
    description: 'A modern web application for showcasing collections with elegant UI and smooth user experience.',
    techStack: { frontend: ['React.js', 'Next.js', 'Tailwind CSS'], backend: ['Node.js', 'Express.js'], database: ['MongoDB'], deployment: ['Vercel'], other: ['Figma'] },
    features: ['Collection Display', 'Modern UI', 'Responsive Design'],
    gallery: ['/src/assets/images/Aurelius.png'],
    liveUrl: 'https://aurelius-collection.vercel.app/',
    githubUrl: 'https://github.com/Ayeshadeveloper14/AURELIUS.Configuration',
    completionDate: '2026-07-15'
  },
  {
    id: 3,
    title: 'Nomi Calculator',
    category: 'Web Development',
    shortDescription: 'Advanced calculator application.',
    description: 'A feature-rich calculator application with modern interface and multiple calculation modes.',
    techStack: { frontend: ['React.js', 'Next.js', 'Tailwind CSS'], backend: [], database: [], deployment: ['Vercel'], other: [] },
    features: ['Advanced Calculations', 'Modern UI', 'Responsive Design'],
    gallery: ['https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=600&h=400'],
    liveUrl: 'https://nomiicalculator.vercel.app/',
    githubUrl: 'https://github.com/mrnomii',
    completionDate: '2026-07-10'
  },
  {
    id: 4,
    title: 'Shopify Store - Custom',
    category: 'E-Commerce',
    shortDescription: 'Custom Shopify e-commerce store.',
    description: 'A fully customized Shopify store with advanced features and modern design.',
    techStack: { frontend: ['React', 'Liquid'], backend: ['Shopify API'], database: ['Shopify DB'], deployment: ['Shopify'], other: ['Figma'] },
    features: ['Custom Theme', 'Payment Integration', 'Product Management'],
    gallery: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=400'],
    liveUrl: 'https://p15xyg-ie.myshopify.com/',
    githubUrl: 'https://github.com/mrnomii',
    completionDate: '2026-07-12'
  },
  {
    id: 5,
    title: 'Prime Estate',
    category: 'Real Estate',
    shortDescription: 'Modern real estate web application.',
    description: 'A comprehensive real estate platform for property listings and management.',
    techStack: { frontend: ['React.js', 'Next.js', 'Tailwind CSS'], backend: ['Node.js', 'Express.js'], database: ['MongoDB'], deployment: ['Vercel'], other: ['Figma'] },
    features: ['Property Listings', 'Search & Filter', 'User Dashboard'],
    gallery: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600&h=400'],
    liveUrl: 'https://prime-estate-psi.vercel.app/',
    githubUrl: 'https://github.com/maryamnawazdev7780-has/PrimeEstate',
    completionDate: '2026-07-08'
  },
  {
    id: 6,
    title: 'Agency123',
    category: 'Web Development',
    shortDescription: 'Professional agency website.',
    description: 'A modern agency website showcasing services and portfolio.',
    techStack: { frontend: ['HTML', 'CSS', 'JavaScript'], backend: ['PHP'], database: ['MySQL'], deployment: ['Shared Hosting'], other: ['WordPress'] },
    features: ['Service Showcase', 'Portfolio Gallery', 'Contact Forms'],
    gallery: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=400'],
    liveUrl: 'https://agency123.infinityfree.me/',
    completionDate: '2026-07-05'
  },
  {
    id: 7,
    title: 'Hamme',
    category: 'Business Website',
    shortDescription: 'Corporate business website.',
    description: 'Professional business website with modern design and functionality.',
    techStack: { frontend: ['HTML', 'CSS', 'JavaScript'], backend: ['PHP'], database: ['MySQL'], deployment: ['Shared Hosting'], other: ['WordPress'] },
    features: ['Business Services', 'About Section', 'Contact Integration'],
    gallery: ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600&h=400'],
    liveUrl: 'https://www.hamme.com.pk/',
    completionDate: '2026-07-03'
  },
  {
    id: 8,
    title: 'Stearns & Co',
    category: 'Business Website',
    shortDescription: 'Professional corporate website.',
    description: 'Modern corporate website with professional design and business functionality.',
    techStack: { frontend: ['React.js', 'Next.js', 'Tailwind CSS'], backend: ['Node.js', 'Express.js'], database: ['MongoDB'], deployment: ['Vercel'], other: ['Figma'] },
    features: ['Corporate Branding', 'Service Display', 'Contact Management'],
    gallery: ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600&h=400'],
    liveUrl: 'https://stearnsandco.com/',
    githubUrl: 'https://github.com/hasnain17576',
    completionDate: '2026-06-28'
  },
  {
    id: 9,
    title: 'US NumHub',
    category: 'Web Application',
    shortDescription: 'Phone number verification and services platform.',
    description: 'A comprehensive platform for phone number verification and related services.',
    techStack: { frontend: ['React.js', 'Next.js', 'Tailwind CSS'], backend: ['Node.js', 'Express.js'], database: ['MongoDB'], deployment: ['Vercel'], other: ['API Integration'] },
    features: ['Number Verification', 'Service Integration', 'User Dashboard'],
    gallery: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400'],
    liveUrl: 'https://USnumhub.com',
    completionDate: '2026-06-25'
  },
  {
    id: 10,
    title: 'Adam Azam',
    category: 'Web Development',
    shortDescription: 'Personal portfolio website.',
    description: 'Modern personal portfolio showcasing skills and projects.',
    techStack: { frontend: ['React.js', 'Next.js', 'Tailwind CSS'], backend: [], database: [], deployment: ['Vercel'], other: ['Figma'] },
    features: ['Portfolio Display', 'Skill Showcase', 'Contact Integration'],
    gallery: ['https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=600&h=400'],
    liveUrl: 'https://adam-azam.vercel.app/',
    completionDate: '2026-06-20'
  },
  {
    id: 11,
    title: 'StylesNest Store',
    category: 'E-Commerce',
    shortDescription: 'Fashion and lifestyle e-commerce store.',
    description: 'Modern e-commerce platform for fashion and lifestyle products.',
    techStack: { frontend: ['React', 'Shopify'], backend: ['Shopify API'], database: ['Shopify DB'], deployment: ['Shopify'], other: ['Payment Gateway'] },
    features: ['Product Catalog', 'Shopping Cart', 'Secure Payments'],
    gallery: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600&h=400'],
    liveUrl: 'https://stylesnest.store',
    completionDate: '2026-06-18'
  },
  {
    id: 12,
    title: 'StylesNest Arabia',
    category: 'E-Commerce',
    shortDescription: 'Arabic fashion e-commerce platform.',
    description: 'Specialized e-commerce platform for Arabic fashion and lifestyle products.',
    techStack: { frontend: ['React', 'Shopify'], backend: ['Shopify API'], database: ['Shopify DB'], deployment: ['Shopify'], other: ['Multi-language'] },
    features: ['Arabic Interface', 'Product Catalog', 'Regional Shipping'],
    gallery: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600&h=400'],
    liveUrl: 'https://StylesNestArabia.com',
    completionDate: '2026-06-15'
  },
  {
    id: 13,
    title: 'Glorya\'s Beauty',
    category: 'E-Commerce',
    shortDescription: 'Beauty products e-commerce store.',
    description: 'Premium beauty products store with elegant design and smooth shopping experience.',
    techStack: { frontend: ['React', 'Shopify'], backend: ['Shopify API'], database: ['Shopify DB'], deployment: ['Shopify'], other: ['Inventory Management'] },
    features: ['Beauty Products', 'Custom Theme', 'Secure Checkout'],
    gallery: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600&h=400'],
    liveUrl: 'https://gloyrasbeauty.com/',
    completionDate: '2026-06-12'
  },
  {
    id: 14,
    title: 'Tapio\'s Provisions',
    category: 'E-Commerce',
    shortDescription: 'Food and provisions e-commerce store.',
    description: 'Specialized e-commerce platform for food products and provisions.',
    techStack: { frontend: ['React', 'Shopify'], backend: ['Shopify API'], database: ['Shopify DB'], deployment: ['Shopify'], other: ['Order Management'] },
    features: ['Food Products', 'Bulk Orders', 'Delivery Tracking'],
    gallery: ['https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600&h=400'],
    liveUrl: 'https://www.tapiosprovisions.com/',
    completionDate: '2026-06-10'
  },
  {
    id: 15,
    title: 'Learning Hub LMS',
    category: 'Education',
    shortDescription: 'Learning Management System.',
    description: 'Comprehensive learning management system for online courses and training.',
    techStack: { frontend: ['React.js', 'Next.js', 'Tailwind CSS'], backend: ['Node.js', 'Express.js'], database: ['MongoDB'], deployment: ['Vercel'], other: ['Video Integration'] },
    features: ['Course Management', 'Video Lectures', 'Student Progress'],
    gallery: ['https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=600&h=400'],
    liveUrl: 'https://learninghub.page.gd/?i=1',
    completionDate: '2026-06-08'
  },
  {
    id: 16,
    title: 'Creative Stack Agency',
    category: 'Business Website',
    shortDescription: 'Official agency website.',
    description: 'Official website for Creative Stack Agency showcasing services, team, and portfolio.',
    techStack: { frontend: ['React.js', 'Next.js', 'Tailwind CSS'], backend: ['Node.js', 'Express.js'], database: ['MongoDB'], deployment: ['Vercel'], other: ['Framer Motion'] },
    features: ['Service Display', 'Team Showcase', 'Portfolio Gallery'],
    gallery: ['/src/assets/images/CSA.png'],
    liveUrl: 'https://creative-stack-agency.vercel.app',
    githubUrl: 'https://github.com/Aftab272',
    completionDate: '2026-07-18'
  },
  {
    id: 17,
    title: 'Curtain Town UAE',
    category: 'E-Commerce',
    shortDescription: 'Curtains and home decor store.',
    description: 'E-commerce platform for curtains and home decoration products in UAE.',
    techStack: { frontend: ['React', 'Shopify'], backend: ['Shopify API'], database: ['Shopify DB'], deployment: ['Shopify'], other: ['Payment Gateway'] },
    features: ['Product Catalog', 'Custom Orders', 'UAE Shipping'],
    gallery: ['/src/assets/images/Curtain.png'],
    liveUrl: 'https://curtaintownuae.com/',
    completionDate: '2026-07-18'
  },
  {
    id: 18,
    title: 'Bright Digital Hub',
    category: 'E-Commerce',
    shortDescription: 'Digital products e-commerce platform.',
    description: 'E-commerce website for digital products and services.',
    techStack: { frontend: ['HTML', 'CSS', 'JavaScript'], backend: ['PHP'], database: ['MySQL'], deployment: ['Shared Hosting'], other: ['WordPress'] },
    features: ['Digital Products', 'Service Integration', 'Payment Processing'],
    gallery: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400'],
    liveUrl: 'https://brightdigitalhub.free.nf/?i=1',
    completionDate: '2026-07-18'
  },
  {
    id: 19,
    title: 'Luxe Realty',
    category: 'Real Estate',
    shortDescription: 'Luxury real estate platform.',
    description: 'Premium real estate platform for luxury properties and listings.',
    techStack: { frontend: ['React.js', 'Next.js', 'Tailwind CSS'], backend: ['Node.js', 'Express.js'], database: ['MongoDB'], deployment: ['Vercel'], other: ['Figma'] },
    features: ['Luxury Listings', 'Property Search', 'Virtual Tours'],
    gallery: ['/src/assets/images/luxerealty.png'],
    liveUrl: 'https://luxerealty-lime.vercel.app/',
    completionDate: '2026-07-18'
  },
  {
    id: 20,
    title: 'Aurelius Food Artistry',
    category: 'Web Development',
    shortDescription: 'Food and culinary showcase platform.',
    description: 'Modern platform showcasing food artistry and culinary creations.',
    techStack: { frontend: ['React.js', 'Next.js', 'Tailwind CSS'], backend: ['Node.js', 'Express.js'], database: ['MongoDB'], deployment: ['Vercel'], other: ['Framer Motion'] },
    features: ['Food Gallery', 'Recipe Display', 'Chef Profiles'],
    gallery: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400'],
    liveUrl: 'https://aurelius-food-artistry.vercel.app/#/',
    completionDate: '2026-07-18'
  },
  {
    id: 21,
    title: 'Sadaf Fashion Store',
    category: 'E-Commerce',
    shortDescription: 'Fashion and clothing e-commerce store.',
    description: 'Modern fashion e-commerce platform for clothing and accessories.',
    techStack: { frontend: ['React.js', 'Next.js', 'Tailwind CSS'], backend: ['Node.js', 'Express.js'], database: ['MongoDB'], deployment: ['Vercel'], other: ['Stripe'] },
    features: ['Fashion Catalog', 'Size Guide', 'Secure Checkout'],
    gallery: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600&h=400'],
    liveUrl: 'https://sadaf-fashion-store.vercel.app/',
    completionDate: '2026-07-18'
  },
  {
    id: 22,
    title: 'Ayesha Blush',
    category: 'Web Development',
    shortDescription: 'Beauty and lifestyle platform.',
    description: 'Modern platform for beauty products and lifestyle content.',
    techStack: { frontend: ['React.js', 'Next.js', 'Tailwind CSS'], backend: ['Node.js', 'Express.js'], database: ['MongoDB'], deployment: ['Vercel'], other: ['Framer Motion'] },
    features: ['Beauty Products', 'Lifestyle Content', 'Modern UI'],
    gallery: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600&h=400'],
    liveUrl: 'https://ayesha-blush.vercel.app/',
    completionDate: '2026-07-18'
  },
  {
    id: 23,
    title: 'Aurelius Food',
    category: 'Web Development',
    shortDescription: 'Food and culinary platform.',
    description: 'Modern platform for food recipes and culinary content.',
    techStack: { frontend: ['React.js', 'Next.js', 'Tailwind CSS'], backend: ['Node.js', 'Express.js'], database: ['MongoDB'], deployment: ['Vercel'], other: ['Framer Motion'] },
    features: ['Food Recipes', 'Culinary Content', 'Recipe Display'],
    gallery: ['https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600&h=400'],
    liveUrl: 'https://aurelius-food.vercel.app/',
    completionDate: '2026-07-18'
  },
  {
    id: 24,
    title: 'Fintech Mobile App Redesign',
    category: 'UI/UX Design',
    shortDescription: 'Complete UI/UX overhaul for a leading financial application.',
    description: 'A comprehensive UX research and UI redesign project for a mobile banking application. The new design improved user retention by 45% and reduced task completion time by 30%.',
    techStack: { frontend: ['Figma', 'Protopie', 'Adobe XD'], backend: [], database: [], deployment: [], other: ['UX Research', 'Wireframing'] },
    features: ['User Research', 'Interactive Prototypes', 'Design System creation'],
    gallery: ['/src/assets/images/User Profile.png'],
    liveUrl: '#',
    completionDate: '2026-07-20'
  },
  {
    id: 25,
    title: 'E-Commerce Dashboard UX',
    category: 'UI/UX Design',
    shortDescription: 'Modern admin dashboard design for e-commerce vendors.',
    description: 'Designed a highly intuitive and data-rich admin dashboard for e-commerce store owners, allowing them to track sales, manage inventory, and view analytics seamlessly.',
    techStack: { frontend: ['Figma', 'Sketch'], backend: [], database: [], deployment: [], other: ['Design System', 'User Testing'] },
    features: ['Data Visualization', 'Component Library', 'Responsive Layouts'],
    gallery: ['/src/assets/images/Dashboard.png'],
    liveUrl: '#',
    completionDate: '2026-07-25'
  }
];
