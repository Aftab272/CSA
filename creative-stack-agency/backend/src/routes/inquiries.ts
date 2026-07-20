import express, { Request, Response } from 'express';
import Inquiry, { InquiryStatus } from '../models/Inquiry';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { validateContactPayload } from '../utils/validators';

const router = express.Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = validateContactPayload(req.body);
    if (!validation.ok) {
      res.status(400).json({ success: false, message: validation.message });
      return;
    }

    const inquiry = await Inquiry.create({
      name: req.body.name.trim(),
      email: req.body.email.trim().toLowerCase(),
      service: req.body.service.trim(),
      message: req.body.message.trim(),
      source: 'website',
      status: 'new',
      ipAddress: req.ip,
      userAgent: req.get('user-agent') || '',
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      inquiryId: inquiry._id,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: 'Unable to process your request right now',
    });
  }
});

router.get(
  '/',
  authenticate,
  authorize('admin', 'super_admin'),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const status = (req.query.status as InquiryStatus | undefined) || undefined;
      const query = status ? { status } : {};

      const inquiries = await Inquiry.find(query)
        .sort({ createdAt: -1 })
        .limit(200)
        .select('-__v');

      res.json({ success: true, inquiries });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Unable to fetch inquiries',
      });
    }
  }
);

router.patch(
  '/:id/status',
  authenticate,
  authorize('admin', 'super_admin'),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const allowedStatuses: InquiryStatus[] = ['new', 'in_progress', 'resolved', 'spam'];
      const status = req.body?.status as InquiryStatus;

      if (!allowedStatuses.includes(status)) {
        res.status(400).json({
          success: false,
          message: 'Invalid status value',
        });
        return;
      }

      const inquiry = await Inquiry.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      ).select('-__v');

      if (!inquiry) {
        res.status(404).json({
          success: false,
          message: 'Inquiry not found',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Inquiry status updated',
        inquiry,
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Unable to update inquiry status',
      });
    }
  }
);

export default router;
