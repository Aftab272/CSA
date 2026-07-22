export type ServiceContent = {
  _id?: string;
  id?: number;
  title: string;
  category: string;
  description: string;
  benefits: string[];
  fullDescription?: string[];
  image: string;
  isActive?: boolean;
};

export type ProjectContent = {
  _id?: string;
  id?: number;
  title: string;
  category: string;
  description: string;
  shortDescription: string;
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    deployment: string[];
    other: string[];
  };
  features: string[];
  gallery: string[];
  githubUrl?: string;
  liveUrl?: string;
  completionDate?: string;
  isPublished?: boolean;
  clientReview?: {
    name: string;
    text: string;
    rating: number;
  };
};

export type TeamMemberContent = {
  _id?: string;
  id?: number;
  name: string;
  position: string;
  role: string;
  experience: string;
  rating: number;
  testimonial: string;
  image: string;
  intro: string;
  education: string;
  projects: string;
  achievements: string;
  skills: string[];
  certificates: string[];
  social: {
    email?: string;
    linkedin?: string;
    github?: string;
    website?: string;
    whatsapp?: string;
    tiktok?: string;
    facebook?: string;
    instagram?: string;
  };
  resume?: string;
  portfolio?: string;
  isActive?: boolean;
};

export type CourseContent = {
  _id?: string;
  id?: number;
  title: string;
  image: string;
  duration: string;
  instructor: {
    name: string;
    designation: string;
    image: string;
  };
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
  syllabus: string[];
  seats: number;
  hasCertificate: boolean;
  features: string[];
  price: string;
  description: string;
  isActive?: boolean;
};
