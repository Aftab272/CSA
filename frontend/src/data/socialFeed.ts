export type SocialFeedItem = {
  id: number;
  title: string;
  thumbnail: string;
  category: 'Agency' | 'Project' | 'Promotion' | 'Course' | 'Client Work';
  description: string;
  platform: 'YouTube' | 'Facebook' | 'Instagram' | 'LinkedIn' | 'TikTok';
  url: string;
};

export const socialFeedItems: SocialFeedItem[] = [
  { id: 1, title: 'Modern E-Commerce Website', thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600&h=400', category: 'Project', description: 'A high-converting store build.', platform: 'YouTube', url: '#' },
  { id: 2, title: 'Agency Introduction', thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600&h=400', category: 'Agency', description: 'Who we are and what we do.', platform: 'Facebook', url: '#' },
  { id: 3, title: 'SEO Masterclass', thumbnail: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&q=80&w=600&h=400', category: 'Course', description: 'Rank higher in search results.', platform: 'YouTube', url: '#' },
  { id: 4, title: 'Client Success Story', thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600&h=400', category: 'Client Work', description: 'See how we helped our client grow.', platform: 'LinkedIn', url: '#' },
  { id: 5, title: 'Summer Sale Promotion', thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=600&h=400', category: 'Promotion', description: 'Check out our latest offers.', platform: 'Instagram', url: '#' },
];
