import express, { Response } from 'express';
import Course from '../models/Course';
import { validateCoursePayload } from '../utils/validators';

const router = express.Router();

router.get('/', async (req, res: Response): Promise<void> => {
  try {
    const includeAll = req.query.includeAll === 'true';
    const filter = includeAll ? {} : { isActive: true };
    const courses = await Course.find(filter).sort({ createdAt: 1 }).select('-__v');
    res.json({ success: true, courses });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to fetch courses' });
  }
});

router.post('/', async (req, res: Response): Promise<void> => {
  try {
    const validation = validateCoursePayload(req.body);
    if (!validation.ok) {
      res.status(400).json({ success: false, message: validation.message });
      return;
    }

    const course = await Course.create({
      ...req.body,
      isActive: req.body.isActive ?? true,
    });
    res.status(201).json({ success: true, message: 'Course created', course });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to create course' });
  }
});

router.put('/:id', async (req, res: Response): Promise<void> => {
  try {
    const validation = validateCoursePayload(req.body);
    if (!validation.ok) {
      res.status(400).json({ success: false, message: validation.message });
      return;
    }

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { ...req.body, isActive: req.body.isActive ?? true },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!course) {
      res.status(404).json({ success: false, message: 'Course not found' });
      return;
    }

    res.json({ success: true, message: 'Course updated', course });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to update course' });
  }
});

router.delete('/:id', async (req, res: Response): Promise<void> => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      res.status(404).json({ success: false, message: 'Course not found' });
      return;
    }

    res.json({ success: true, message: 'Course deleted' });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to delete course' });
  }
});

export default router;
