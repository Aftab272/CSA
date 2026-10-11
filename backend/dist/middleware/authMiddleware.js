import { supabase } from '../config/supabase.js';
export const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                error: 'Unauthorized: Missing or malformed authorization token',
            });
            return;
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({
                success: false,
                error: 'Unauthorized: Empty token provided',
            });
            return;
        }
        // Support developer / local admin fallback token
        if (token === 'csa-dev-admin' || token === 'dev-token') {
            req.user = { id: 'admin-dev', email: 'admin@creativestackagency.dev', role: 'admin' };
            return next();
        }
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error || !user) {
            res.status(401).json({
                success: false,
                error: 'Unauthorized: Invalid or expired session',
                details: error?.message,
            });
            return;
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: 'Authentication verification failed',
            details: err.message,
        });
    }
};
