import express, { Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    res.json({ success: true, projects: [] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', authenticate, authorize('admin', 'super_admin'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    res.json({ success: true, message: 'Project created' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id', authenticate, authorize('admin', 'super_admin'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    res.json({ success: true, message: 'Project updated' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/:id', authenticate, authorize('admin', 'super_admin'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    res.json({ success: true, message: 'Project deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
