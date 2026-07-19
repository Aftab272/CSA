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
  description: string;
};

export const courses: Course[] = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=400',
    duration: '3 Months',
    instructor: { name: 'Muhammad Aftab Akram', designation: 'Founder & Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120' },
    level: 'Advanced',
    syllabus: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Deployment'],
    seats: 15,
    hasCertificate: true,
    features: ['Live Classes', 'Projects', 'Portfolio Building', 'Career Guidance'],
    price: '$500',
    description: 'Master full-stack development with hands-on projects.'
  },
  {
    id: 2,
    title: 'WordPress Development',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600&h=400',
    duration: '4 Weeks',
    instructor: { name: 'Muhammad Aftab Akram', designation: 'Founder & Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120' },
    level: 'Beginner',
    syllabus: ['CMS Basics', 'Themes', 'Plugins', 'E-commerce'],
    seats: 20,
    hasCertificate: true,
    features: ['Practical Labs', 'Certification'],
    price: '$200',
    description: 'Create professional WordPress sites effortlessly.'
  },
  {
    id: 3,
    title: 'Graphic Designing',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600&h=400',
    duration: '6 Weeks',
    instructor: { name: 'Muhammad Aftab Akram', designation: 'Founder & Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120' },
    level: 'Beginner',
    syllabus: ['Adobe Suite', 'Logo Design', 'Branding'],
    seats: 12,
    hasCertificate: true,
    features: ['Portfolio Design', 'Live Sessions'],
    price: '$250',
    description: 'Master branding and visual storytelling.'
  },
  {
    id: 4,
    title: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&q=80&w=600&h=400',
    duration: '6 Weeks',
    instructor: { name: 'Muhammad Aftab Akram', designation: 'Founder & Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120' },
    level: 'Intermediate',
    syllabus: ['Design Principles', 'Figma', 'Prototyping', 'User Research'],
    seats: 10,
    hasCertificate: true,
    features: ['Live Classes', 'Hands-on Projects', 'Certification'],
    price: '$300',
    description: 'Learn user-centric design principles and tools.'
  },
  {
    id: 5,
    title: 'SEO Mastery',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&q=80&w=600&h=400',
    duration: '4 Weeks',
    instructor: { name: 'Muhammad Aftab Akram', designation: 'Founder & Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120' },
    level: 'Intermediate',
    syllabus: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Link Building'],
    seats: 15,
    hasCertificate: true,
    features: ['Live Projects', 'Certification'],
    price: '$200',
    description: 'Improve search rankings and drive traffic.'
  },
  {
    id: 6,
    title: 'Shopify Development',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=600&h=400',
    duration: '4 Weeks',
    instructor: { name: 'Muhammad Aftab Akram', designation: 'Founder & Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120' },
    level: 'Intermediate',
    syllabus: ['Store Setup', 'Themes', 'Liquid', 'Apps'],
    seats: 15,
    hasCertificate: true,
    features: ['Live Projects', 'Certification'],
    price: '$300',
    description: 'Build high-converting Shopify stores.'
  },
  {
    id: 7,
    title: 'YouTube Automation',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=600&h=400',
    duration: '4 Weeks',
    instructor: { name: 'Muhammad Aftab Akram', designation: 'Founder & Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120' },
    level: 'Beginner',
    syllabus: ['Channel Setup', 'Content Creation', 'SEO', 'Monetization'],
    seats: 20,
    hasCertificate: true,
    features: ['Workflow Automation', 'Strategy'],
    price: '$350',
    description: 'Scale YouTube channels efficiently.'
  },
  {
    id: 8,
    title: 'Client Hunting & Marketing',
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&q=80&w=600&h=400',
    duration: '6 Weeks',
    instructor: { name: 'Muhammad Aftab Akram', designation: 'Founder & Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120' },
    level: 'Intermediate',
    syllabus: ['Digital Marketing', 'Social Media Promotion', 'TikTok Marketing (USA/UK)', 'Client Hunting Techniques'],
    seats: 25,
    hasCertificate: true,
    features: ['Lead Generation', 'Sales Funnels'],
    price: '$400',
    description: 'Master social media and client acquisition.'
  },
  {
    id: 9,
    title: 'MS Office & Documentation',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600&h=400',
    duration: '4 Weeks',
    instructor: { name: 'Muhammad Aftab Akram', designation: 'Founder & Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120' },
    level: 'Beginner',
    syllabus: ['Word', 'Excel', 'PowerPoint', 'Documentation'],
    seats: 30,
    hasCertificate: true,
    features: ['Certification', 'Productivity'],
    price: '$150',
    description: 'Enhance your professional document skills.'
  }
];
