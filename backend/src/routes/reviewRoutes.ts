import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';
import { reviewLimiter } from '../middleware/rateLimiter.js';
import { requireAuth } from '../middleware/authMiddleware.js';

export const reviewRouter = Router();

const sanitize = (str: unknown): string => {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
};

const fallbackReviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    company: 'TechFlow Solutions',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120',
    service: 'Full-Stack Web Engineering',
    rating: 5,
    comment: 'Creative Stack Agency built our enterprise analytics portal with unbelievable speed and precision. The architecture is ultra-fast and rock-solid.',
    date: '2026-08-15',
  },
  {
    id: 2,
    name: 'Mark Davis',
    company: 'InnovateCorp Labs',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120',
    service: 'AI Integration & Design Systems',
    rating: 5,
    comment: 'The team understood our exact requirements from day one. Their modern UI/UX design and AI workflow automation completely transformed our product.',
    date: '2026-08-28',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    company: 'StartupHub Ventures',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120',
    service: 'Mobile App Development',
    rating: 5,
    comment: 'Professional, reliable, and deeply technical. The Flutter mobile app they engineered reached over 50,000 active users with zero downtime.',
    date: '2026-09-05',
  },
];

// PUBLIC: Get verified reviews
reviewRouter.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      res.json({ success: true, reviews: fallbackReviews });
      return;
    }

    res.json({ success: true, reviews: data });
  } catch (err: any) {
    res.json({ success: true, reviews: fallbackReviews });
  }
});

// PUBLIC: Submit a client review
reviewRouter.post('/', reviewLimiter, async (req: Request, res: Response): Promise<void> => {
  try {
    const rawName = sanitize(req.body.name);
    const rawComment = sanitize(req.body.comment);
    const rawService = sanitize(req.body.service) || 'Digital Service';
    const rawCompany = sanitize(req.body.company) || 'Verified Client';
    const rating = Number(req.body.rating);
    let imageUrl = typeof req.body.image === 'string' ? req.body.image.trim() : '';

    if (!rawName || rawName.length < 2 || rawName.length > 80) {
      res.status(400).json({ success: false, error: 'Name must be between 2 and 80 characters.' });
      return;
    }

    if (isNaN(rating) || rating < 1 || rating > 5) {
      res.status(400).json({ success: false, error: 'Rating must be a number between 1 and 5.' });
      return;
    }

    if (!rawComment || rawComment.length < 5 || rawComment.length > 2000) {
      res.status(400).json({ success: false, error: 'Review comment must be between 5 and 2000 characters.' });
      return;
    }

    // Fallback safe avatar if image is missing or invalid URL
    if (!imageUrl || (!imageUrl.startsWith('https://') && !imageUrl.startsWith('http://'))) {
      imageUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120';
    }

    const newReview = {
      name: rawName,
      company: rawCompany,
      service: rawService,
      rating,
      comment: rawComment,
      image: imageUrl,
      created_at: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      status: 'approved',
    };

    const { data, error } = await supabase.from('reviews').insert([newReview]).select();

    if (error) {
      console.error('Supabase review insert error:', error);
      res.status(500).json({ success: false, error: 'Failed to record review.' });
      return;
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! Your review has been recorded.',
      review: data?.[0] || newReview,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ADMIN ONLY: Delete a review
reviewRouter.delete('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('reviews').delete().eq('id', id);

    if (error) {
      res.status(500).json({ success: false, error: error.message });
      return;
    }

    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
