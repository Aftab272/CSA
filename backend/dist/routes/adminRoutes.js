import { Router } from 'express';
import { getAuthSupabase } from '../config/supabase.js';
import { requireAuth } from '../middleware/authMiddleware.js';
export const adminRouter = Router();
// Helper to get authenticated Supabase client using current request's Bearer token
const getClient = (req) => {
    const token = req.headers.authorization?.split(' ')[1];
    return getAuthSupabase(token);
};
// Apply requireAuth to all admin routes
adminRouter.use(requireAuth);
// Verify admin session and return current user
adminRouter.get('/verify-session', (req, res) => {
    res.json({
        success: true,
        user: {
            id: req.user.id,
            email: req.user.email,
            role: req.user.role,
        },
    });
});
/* ==========================================================================
   SERVICES MANAGEMENT
   ========================================================================== */
adminRouter.get('/services', async (req, res) => {
    try {
        const client = getClient(req);
        const { data, error } = await client.from('services').select('*').order('created_at', { ascending: false });
        if (error) {
            res.status(500).json({ success: false, error: error.message });
            return;
        }
        res.json({ success: true, services: data || [] });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
adminRouter.post('/services', async (req, res) => {
    try {
        const client = getClient(req);
        const payload = req.body;
        const { data, error } = await client.from('services').insert([payload]).select();
        if (error) {
            res.status(500).json({ success: false, error: error.message });
            return;
        }
        res.status(201).json({ success: true, service: data?.[0] });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
adminRouter.put('/services/:id', async (req, res) => {
    try {
        const client = getClient(req);
        const { id } = req.params;
        const payload = req.body;
        const { data, error } = await client.from('services').update(payload).eq('id', id).select();
        if (error) {
            res.status(500).json({ success: false, error: error.message });
            return;
        }
        res.json({ success: true, service: data?.[0] });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
adminRouter.delete('/services/:id', async (req, res) => {
    try {
        const client = getClient(req);
        const { id } = req.params;
        const { error } = await client.from('services').delete().eq('id', id);
        if (error) {
            res.status(500).json({ success: false, error: error.message });
            return;
        }
        res.json({ success: true, message: 'Service deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
/* ==========================================================================
   PROJECTS MANAGEMENT
   ========================================================================== */
adminRouter.get('/projects', async (req, res) => {
    try {
        const client = getClient(req);
        const { data, error } = await client.from('projects').select('*').order('created_at', { ascending: false });
        if (error) {
            res.status(500).json({ success: false, error: error.message });
            return;
        }
        res.json({ success: true, projects: data || [] });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
adminRouter.post('/projects', async (req, res) => {
    try {
        const client = getClient(req);
        const payload = req.body;
        const { data, error } = await client.from('projects').insert([payload]).select();
        if (error) {
            res.status(500).json({ success: false, error: error.message });
            return;
        }
        res.status(201).json({ success: true, project: data?.[0] });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
adminRouter.put('/projects/:id', async (req, res) => {
    try {
        const client = getClient(req);
        const { id } = req.params;
        const payload = req.body;
        const { data, error } = await client.from('projects').update(payload).eq('id', id).select();
        if (error) {
            res.status(500).json({ success: false, error: error.message });
            return;
        }
        res.json({ success: true, project: data?.[0] });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
adminRouter.delete('/projects/:id', async (req, res) => {
    try {
        const client = getClient(req);
        const { id } = req.params;
        const { error } = await client.from('projects').delete().eq('id', id);
        if (error) {
            res.status(500).json({ success: false, error: error.message });
            return;
        }
        res.json({ success: true, message: 'Project deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
/* ==========================================================================
   TEAM MEMBERS MANAGEMENT
   ========================================================================== */
adminRouter.get('/team', async (req, res) => {
    try {
        const client = getClient(req);
        const { data, error } = await client.from('team_members').select('*').order('created_at', { ascending: false });
        if (error) {
            res.status(500).json({ success: false, error: error.message });
            return;
        }
        const team = (data || []).map((item) => ({
            ...item,
            order: item.order ?? item.social?.order ?? 999,
            badge: item.badge ?? item.social?.badge ?? '',
        }));
        res.json({ success: true, team });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
adminRouter.post('/team', async (req, res) => {
    try {
        const client = getClient(req);
        const rawPayload = { ...req.body };
        const orderVal = rawPayload.order !== undefined && rawPayload.order !== '' ? Number(rawPayload.order) : 999;
        const badgeVal = rawPayload.badge !== undefined ? String(rawPayload.badge).trim() : '';
        const social = {
            ...(rawPayload.social || {}),
            order: orderVal,
            badge: badgeVal,
        };
        delete rawPayload.order;
        delete rawPayload.badge;
        const payload = {
            ...rawPayload,
            social,
        };
        const { data, error } = await client.from('team_members').insert([payload]).select();
        if (error) {
            res.status(500).json({ success: false, error: error.message });
            return;
        }
        const member = data?.[0] ? { ...data[0], order: orderVal, badge: badgeVal } : null;
        res.status(201).json({ success: true, member });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
adminRouter.put('/team/:id', async (req, res) => {
    try {
        const client = getClient(req);
        const { id } = req.params;
        const rawPayload = { ...req.body };
        const orderVal = rawPayload.order !== undefined && rawPayload.order !== '' ? Number(rawPayload.order) : 999;
        const badgeVal = rawPayload.badge !== undefined ? String(rawPayload.badge).trim() : '';
        const social = {
            ...(rawPayload.social || {}),
            order: orderVal,
            badge: badgeVal,
        };
        delete rawPayload.order;
        delete rawPayload.badge;
        const payload = {
            ...rawPayload,
            social,
        };
        const { data, error } = await client.from('team_members').update(payload).eq('id', id).select();
        if (error) {
            res.status(500).json({ success: false, error: error.message });
            return;
        }
        const member = data?.[0] ? { ...data[0], order: orderVal, badge: badgeVal } : null;
        res.json({ success: true, member });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
adminRouter.delete('/team/:id', async (req, res) => {
    try {
        const client = getClient(req);
        const { id } = req.params;
        const { error } = await client.from('team_members').delete().eq('id', id);
        if (error) {
            res.status(500).json({ success: false, error: error.message });
            return;
        }
        res.json({ success: true, message: 'Team member deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
/* ==========================================================================
   COURSES MANAGEMENT
   ========================================================================== */
adminRouter.get('/courses', async (req, res) => {
    try {
        const client = getClient(req);
        const { data, error } = await client.from('courses').select('*').order('created_at', { ascending: false });
        if (error) {
            res.status(500).json({ success: false, error: error.message });
            return;
        }
        res.json({ success: true, courses: data || [] });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
adminRouter.post('/courses', async (req, res) => {
    try {
        const client = getClient(req);
        const payload = req.body;
        const { data, error } = await client.from('courses').insert([payload]).select();
        if (error) {
            res.status(500).json({ success: false, error: error.message });
            return;
        }
        res.status(201).json({ success: true, course: data?.[0] });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
adminRouter.put('/courses/:id', async (req, res) => {
    try {
        const client = getClient(req);
        const { id } = req.params;
        const payload = req.body;
        const { data, error } = await client.from('courses').update(payload).eq('id', id).select();
        if (error) {
            res.status(500).json({ success: false, error: error.message });
            return;
        }
        res.json({ success: true, course: data?.[0] });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
adminRouter.delete('/courses/:id', async (req, res) => {
    try {
        const client = getClient(req);
        const { id } = req.params;
        const { error } = await client.from('courses').delete().eq('id', id);
        if (error) {
            res.status(500).json({ success: false, error: error.message });
            return;
        }
        res.json({ success: true, message: 'Course deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
