import express, { Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import Service from '../models/Service';
import { validateServicePayload } from '../utils/validators';

const router = express.Router();

router.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const services = await Service.find({ isActive: true }).sort({ createdAt: -1 }).select('-__v');
    res.json({ success: true, services });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to fetch services' });
  }
});

router.post('/', authenticate, authorize('admin', 'super_admin'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const validation = validateServicePayload(req.body);
    if (!validation.ok) {
      res.status(400).json({ success: false, message: validation.message });
      return;
    }

    const service = await Service.create({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      benefits: req.body.benefits,
      image: req.body.image,
      isActive: req.body.isActive ?? true,
    });

    res.status(201).json({ success: true, message: 'Service created', service });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to create service' });
  }
});

router.put('/:id', authenticate, authorize('admin', 'super_admin'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const validation = validateServicePayload(req.body);
    if (!validation.ok) {
      res.status(400).json({ success: false, message: validation.message });
      return;
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        benefits: req.body.benefits,
        image: req.body.image,
        isActive: req.body.isActive ?? true,
      },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!service) {
      res.status(404).json({ success: false, message: 'Service not found' });
      return;
    }

    res.json({ success: true, message: 'Service updated', service });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to update service' });
  }
});

router.delete('/:id', authenticate, authorize('admin', 'super_admin'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      res.status(404).json({ success: false, message: 'Service not found' });
      return;
    }

    res.json({ success: true, message: 'Service deleted' });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to delete service' });
  }
});

export default router;
