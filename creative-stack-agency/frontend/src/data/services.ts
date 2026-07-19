export type Service = {
  id: number;
  title: string;
  category: string;
  description: string;
  benefits: string[];
  fullDescription?: string[];
  image: string;
};

export const services: Service[] = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    category: 'Development',
    description: 'Complete web solutions from frontend to backend built with modern frameworks.',
    benefits: ['Scalable', 'Secure', 'High Performance'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400&h=300',
  },
  {
    id: 2,
    title: 'WordPress Development',
    category: 'Development',
    description: 'Custom CMS solutions tailored to your business, with customized blocks and admin controls.',
    benefits: ['Easy to Manage', 'SEO Optimized', 'Custom Themes'],
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=400&h=300',
  },
  {
    id: 3,
    title: 'Shopify Store Development',
    category: 'Development',
    description: 'Powerful e-commerce stores designed for high conversions, fast load times, and custom features.',
    benefits: ['Mobile Friendly', 'Payment Gateway Integration', 'Inventory Management'],
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=400&h=300',
  },
  {
    id: 4,
    title: 'Graphic Designing',
    category: 'Design',
    description: 'Stunning visuals, modern layouts, and professional marketing materials for your brand identity.',
    benefits: ['Unique Logos', 'Brand Consistency', 'Eye-catching Graphics'],
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=400&h=300',
  },
  {
    id: 5,
    title: 'UI/UX Design',
    category: 'Design',
    description: 'User-centric research and dynamic prototypes designed for excellent engagement and visual delight.',
    benefits: ['Intuitive Navigation', 'Improved User Journey', 'Modern Aesthetic'],
    image: 'https://images.unsplash.com/photo-1581291518655-9523c932ebcf?auto=format&fit=crop&q=80&w=400&h=300',
  },
  {
    id: 6,
    title: 'Digital Marketing',
    category: 'Marketing',
    description: 'Data-driven paid and organic marketing campaigns designed to scale your business.',
    benefits: ['Increased Traffic', 'Higher ROI', 'Brand Awareness'],
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&q=80&w=400&h=300',
  },
  {
    id: 7,
    title: 'SEO',
    category: 'Marketing',
    description: 'Search engine optimization strategies to rank your website higher and attract high-intent organic traffic.',
    benefits: ['Keyword Research', 'On-page Optimization', 'Better Visibility'],
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&q=80&w=400&h=300',
  },
  {
    id: 8,
    title: 'Content Writing',
    category: 'Marketing',
    description: 'Engaging, creative, and highly polished content that perfectly captures your brand voice.',
    benefits: ['Well-researched', 'Audience-focused', 'SEO Optimized'],
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=400&h=300',
  },
  {
    id: 9,
    title: 'MS Office & Documentation',
    category: 'General',
    description: 'Professional database/sheet management, dynamic presentations, and automated documentation templates.',
    benefits: ['Formatted Reports', 'Efficient Data Entry', 'Professional Resumes'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400&h=300',
  },
];
