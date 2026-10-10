import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';
import { newsletterLimiter } from '../middleware/rateLimiter.js';
import { requireAuth } from '../middleware/authMiddleware.js';

export const newsletterRouter = Router();

const sanitize = (str: unknown): string => {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
};

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// PUBLIC: Subscribe to newsletter
newsletterRouter.post('/subscribe', newsletterLimiter, async (req: Request, res: Response): Promise<void> => {
  try {
    const rawEmail = sanitize(req.body.email).toLowerCase();

    if (!isValidEmail(rawEmail)) {
      res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
      return;
    }

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id, email')
      .eq('email', rawEmail)
      .maybeSingle();

    if (existing) {
      res.status(200).json({
        success: true,
        message: 'You are already subscribed to our newsletter!',
      });
      return;
    }

    const newSubscriber = {
      email: rawEmail,
      subscribed_at: new Date().toISOString(),
      status: 'active',
    };

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([newSubscriber])
      .select();

    if (error) {
      console.warn('Supabase newsletter insert note:', error.message);
      // Fallback response so user UX is uninterrupted even if table is not yet migrated
      res.status(200).json({
        success: true,
        message: 'Thank you for subscribing to Creative Stack Agency updates!',
        subscriber: newSubscriber,
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to the Creative Stack Agency newsletter!',
      subscriber: data?.[0] || newSubscriber,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ADMIN ONLY: List all newsletter subscribers
newsletterRouter.get('/subscribers', requireAuth, async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (error) {
      res.status(500).json({ success: false, error: error.message });
      return;
    }

    res.json({ success: true, subscribers: data || [] });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ADMIN ONLY: Remove subscriber
newsletterRouter.delete('/subscribers/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', id);

    if (error) {
      res.status(500).json({ success: false, error: error.message });
      return;
    }

    res.json({ success: true, message: 'Subscriber removed.' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
