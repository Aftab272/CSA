export type Instructor = {
  name: string;
  designation: string;
  image: string;
};

export type Course = {
  id: number;
  title: string;
  image: string;
  duration: string;
  instructor: Instructor;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
  syllabus: string[];
  seats: number;
  hasCertificate: boolean;
  features: string[];
  price: string;
  originalPrice?: string;
  description: string;
};

export const courses: Course[] = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&h=400',
    duration: '3 Months',
    instructor: { name: 'Muhammad Aftab Akram', designation: 'Founder & Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120' },
    level: 'Advanced',
    syllabus: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Deployment'],
    seats: 15,
    hasCertificate: true,
    features: ['Live Classes', 'Projects', 'Portfolio Building', 'Career Guidance'],
    price: 'Rs. 14,999',
    originalPrice: 'Rs. 60,000',
    description: 'Master full-stack development with hands-on projects.'
  },
  {
    id: 2,
    title: 'WordPress Development',
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=600&h=400',
    duration: '4 Weeks',
    instructor: { name: 'Muhammad Aftab Akram', designation: 'Founder & Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120' },
    level: 'Beginner',
    syllabus: ['CMS Basics', 'Themes', 'Plugins', 'E-commerce'],
    seats: 20,
    hasCertificate: true,
    features: ['Practical Labs', 'Certification'],
    price: 'Rs. 5,999',
    originalPrice: 'Rs. 25,000',
    description: 'Create professional WordPress sites effortlessly.'
  },
  {
    id: 3,
    title: 'Graphic Designing',
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=600&h=400',
    duration: '6 Weeks',
    instructor: { name: 'Muhammad Aftab Akram', designation: 'Founder & Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120' },
    level: 'Beginner',
    syllabus: ['Adobe Suite', 'Logo Design', 'Branding'],
    seats: 12,
    hasCertificate: true,
    features: ['Portfolio Design', 'Live Sessions'],
    price: 'Rs. 6,999',
    originalPrice: 'Rs. 30,000',
    description: 'Master branding and visual storytelling.'
  },
  {
    id: 4,
    title: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1541462608141-2ff030de4a40?auto=format&fit=crop&q=80&w=600&h=400',
    duration: '6 Weeks',
    instructor: { name: 'Muhammad Aftab Akram', designation: 'Founder & Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120' },
    level: 'Intermediate',
    syllabus: ['Design Principles', 'Figma', 'Prototyping', 'User Research'],
    seats: 10,
    hasCertificate: true,
    features: ['Live Classes', 'Hands-on Projects', 'Certification'],
    price: 'Rs. 7,999',
    originalPrice: 'Rs. 35,000',
    description: 'Learn user-centric design principles and tools.'
  },
  {
    id: 5,
    title: 'SEO Mastery',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400',
    duration: '4 Weeks',
    instructor: { name: 'Muhammad Aftab Akram', designation: 'Founder & Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120' },
    level: 'Intermediate',
    syllabus: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Link Building'],
    seats: 15,
    hasCertificate: true,
    features: ['Live Projects', 'Certification'],
    price: 'Rs. 5,999',
    originalPrice: 'Rs. 25,000',
    description: 'Improve search rankings and drive traffic.'
  },
  {
    id: 6,
    title: 'Shopify Development',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600&h=400',
    duration: '4 Weeks',
    instructor: { name: 'Muhammad Aftab Akram', designation: 'Founder & Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120' },
    level: 'Intermediate',
    syllabus: ['Store Setup', 'Themes', 'Liquid', 'Apps'],
    seats: 15,
    hasCertificate: true,
    features: ['Live Projects', 'Certification'],
    price: 'Rs. 7,999',
    originalPrice: 'Rs. 35,000',
    description: 'Build high-converting Shopify stores.'
  },
  {
    id: 7,
    title: 'YouTube Automation',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600&h=400',
    duration: '4 Weeks',
    instructor: { name: 'Muhammad Aftab Akram', designation: 'Founder & Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120' },
    level: 'Beginner',
    syllabus: ['Channel Setup', 'Content Creation', 'SEO', 'Monetization'],
    seats: 20,
    hasCertificate: true,
    features: ['Workflow Automation', 'Strategy'],
    price: 'Rs. 8,999',
    originalPrice: 'Rs. 40,000',
    description: 'Scale YouTube channels efficiently.'
  },
  {
    id: 8,
    title: 'Client Hunting & Marketing',
    image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=600&h=400',
    duration: '6 Weeks',
    instructor: { name: 'Muhammad Aftab Akram', designation: 'Founder & Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120' },
    level: 'Intermediate',
    syllabus: ['Digital Marketing', 'Social Media Promotion', 'TikTok Marketing (USA/UK)', 'Client Hunting Techniques'],
    seats: 25,
    hasCertificate: true,
    features: ['Lead Generation', 'Sales Funnels'],
    price: 'Rs. 9,999',
    originalPrice: 'Rs. 45,000',
    description: 'Master social media and client acquisition.'
  },
  {
    id: 9,
    title: 'MS Office & Documentation',
    image: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80&w=600&h=400',
    duration: '4 Weeks',
    instructor: { name: 'Muhammad Aftab Akram', designation: 'Founder & Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120' },
    level: 'Beginner',
    syllabus: ['Word', 'Excel', 'PowerPoint', 'Documentation'],
    seats: 30,
    hasCertificate: true,
    features: ['Certification', 'Productivity'],
    price: 'Rs. 2,999',
    originalPrice: 'Rs. 12,000',
    description: 'Enhance your professional document skills.'
  }
];
