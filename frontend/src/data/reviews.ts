export type Review = {
  id: number;
  name: string;
  company?: string;
  image: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
};

export const reviews: Review[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    company: 'TechFlow',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120',
    service: 'Web Development',
    rating: 5,
    comment: 'Exceptional service and timely delivery. Highly recommended!',
    date: '2026-06-15'
  },
  {
    id: 2,
    name: 'Mark Davis',
    company: 'InnovateCorp',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120',
    service: 'UI/UX Design',
    rating: 5,
    comment: 'The team understood our vision perfectly. Great design work.',
    date: '2026-07-01'
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    company: 'StartupHub',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120',
    service: 'Mobile App Development',
    rating: 4,
    comment: 'Professional and reliable. Very happy with the final app.',
    date: '2026-07-10'
  }
];
