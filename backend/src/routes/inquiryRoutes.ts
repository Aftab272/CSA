import { Router, Request, Response } from 'express';
import { inquiryLimiter } from '../middleware/rateLimiter.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { inquiryService, Inquiry } from '../services/inquiryService.js';

export const inquiryRouter = Router();

// Helper: Basic input sanitizer
const sanitize = (str: unknown): string => {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
};

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// PUBLIC: Submit contact inquiry (with rate limiting & validation)
inquiryRouter.post('/', inquiryLimiter, async (req: Request, res: Response): Promise<void> => {
  try {
    const rawName = sanitize(req.body.name);
    const rawEmail = sanitize(req.body.email).toLowerCase();
    const rawService = sanitize(req.body.service) || 'General Inquiry';
    const rawMessage = sanitize(req.body.message);

    if (!rawName || rawName.length < 2 || rawName.length > 100) {
      res.status(400).json({ success: false, error: 'Please provide a valid name (2-100 characters).' });
      return;
    }

    if (!isValidEmail(rawEmail)) {
      res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
      return;
    }

    if (!rawMessage || rawMessage.length < 5 || rawMessage.length > 5000) {
      res.status(400).json({ success: false, error: 'Message must be between 5 and 5000 characters.' });
      return;
    }

    const savedInquiry = await inquiryService.createInquiryAsync({
      name: rawName,
      email: rawEmail,
      service: rawService,
      message: rawMessage,
      status: 'new',
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been received. Our team will contact you shortly.',
      data: savedInquiry,
    });
  } catch (err: any) {
    console.error('Inquiry submission exception:', err);
    res.status(500).json({ success: false, error: 'Internal server error while processing inquiry.' });
  }
});

// ADMIN ONLY: Get all inquiries
inquiryRouter.get('/', requireAuth, async (_req: Request, res: Response): Promise<void> => {
  try {
    const inquiries = await inquiryService.getInquiriesAsync();
    res.json({ success: true, inquiries });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ADMIN ONLY: Update inquiry status / details
inquiryRouter.patch('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { status, name, email, service, message } = req.body;

    const updates: Partial<Inquiry> = {};
    if (status) updates.status = status as Inquiry['status'];
    if (name) updates.name = sanitize(name);
    if (email && isValidEmail(email)) updates.email = sanitize(email).toLowerCase();
    if (service) updates.service = sanitize(service);
    if (message) updates.message = sanitize(message);

    const updated = await inquiryService.updateInquiryAsync(id, updates);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Inquiry not found' });
      return;
    }

    res.json({ success: true, inquiry: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ADMIN ONLY: Delete inquiry
inquiryRouter.delete('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const deleted = await inquiryService.deleteInquiryAsync(id);

    if (!deleted) {
      res.status(404).json({ success: false, error: 'Inquiry not found' });
      return;
    }

    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
