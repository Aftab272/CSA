import { Router } from 'express';
import { supabase } from '../config/supabase.js';
import { inquiryLimiter } from '../middleware/rateLimiter.js';
import { requireAuth } from '../middleware/authMiddleware.js';
export const inquiryRouter = Router();
// Helper: Basic input sanitizer
const sanitize = (str) => {
    if (typeof str !== 'string')
        return '';
    return str.trim().replace(/[<>]/g, '');
};
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
// PUBLIC: Submit contact inquiry (with rate limiting & validation)
inquiryRouter.post('/', inquiryLimiter, async (req, res) => {
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
        const newInquiry = {
            name: rawName,
            email: rawEmail,
            service: rawService,
            message: rawMessage,
            status: 'new',
            createdAt: new Date().toISOString(),
        };
        const { data, error } = await supabase.from('inquiries').insert([newInquiry]).select();
        if (error) {
            console.error('Supabase inquiries insert error:', error);
            res.status(500).json({ success: false, error: 'Failed to record inquiry in database.' });
            return;
        }
        res.status(201).json({
            success: true,
            message: 'Thank you! Your inquiry has been received. Our team will contact you shortly.',
            data: data?.[0] || newInquiry,
        });
    }
    catch (err) {
        console.error('Inquiry submission exception:', err);
        res.status(500).json({ success: false, error: 'Internal server error while processing inquiry.' });
    }
});
// ADMIN ONLY: Get all inquiries
inquiryRouter.get('/', requireAuth, async (_req, res) => {
    try {
        const { data, error } = await supabase
            .from('inquiries')
            .select('*')
            .order('createdAt', { ascending: false });
        if (error) {
            res.status(500).json({ success: false, error: error.message });
            return;
        }
        res.json({ success: true, inquiries: data || [] });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// ADMIN ONLY: Update inquiry status / details
inquiryRouter.patch('/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { status, name, email, service, message } = req.body;
        const updates = {};
        if (status)
            updates.status = status;
        if (name)
            updates.name = sanitize(name);
        if (email && isValidEmail(email))
            updates.email = sanitize(email).toLowerCase();
        if (service)
            updates.service = sanitize(service);
        if (message)
            updates.message = sanitize(message);
        const { data, error } = await supabase
            .from('inquiries')
            .update(updates)
            .eq('id', id)
            .select();
        if (error) {
            res.status(500).json({ success: false, error: error.message });
            return;
        }
        res.json({ success: true, inquiry: data?.[0] });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// ADMIN ONLY: Delete inquiry
inquiryRouter.delete('/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase.from('inquiries').delete().eq('id', id);
        if (error) {
            res.status(500).json({ success: false, error: error.message });
            return;
        }
        res.json({ success: true, message: 'Inquiry deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
