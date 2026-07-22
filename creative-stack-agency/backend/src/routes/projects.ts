import express, { Response } from 'express';
import Project from '../models/Project';
import { validateProjectPayload } from '../utils/validators';

const router = express.Router();

router.get('/', async (req, res: Response): Promise<void> => {
  try {
    const includeAll = req.query.includeAll === 'true';
    const filter = includeAll ? {} : { isPublished: true };
    const projects = await Project.find(filter).sort({ completionDate: -1, createdAt: -1 }).select('-__v');
    res.json({ success: true, projects });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to fetch projects' });
  }
});

router.post('/', async (req, res: Response): Promise<void> => {
  try {
    const validation = validateProjectPayload(req.body);
    if (!validation.ok) {
      res.status(400).json({ success: false, message: validation.message });
      return;
    }

    const project = await Project.create({
      title: req.body.title,
      category: req.body.category,
      shortDescription: req.body.shortDescription,
      description: req.body.description,
      techStack: req.body.techStack,
      features: req.body.features,
      gallery: req.body.gallery,
      githubUrl: req.body.githubUrl,
      liveUrl: req.body.liveUrl,
      completionDate: req.body.completionDate,
      isPublished: req.body.isPublished ?? true,
    });

    res.status(201).json({ success: true, message: 'Project created', project });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to create project' });
  }
});

router.put('/:id', async (req, res: Response): Promise<void> => {
  try {
    const validation = validateProjectPayload(req.body);
    if (!validation.ok) {
      res.status(400).json({ success: false, message: validation.message });
      return;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        category: req.body.category,
        shortDescription: req.body.shortDescription,
        description: req.body.description,
        techStack: req.body.techStack,
        features: req.body.features,
        gallery: req.body.gallery,
        githubUrl: req.body.githubUrl,
        liveUrl: req.body.liveUrl,
        completionDate: req.body.completionDate,
        isPublished: req.body.isPublished ?? true,
      },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }

    res.json({ success: true, message: 'Project updated', project });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to update project' });
  }
});

router.delete('/:id', async (req, res: Response): Promise<void> => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }

    res.json({ success: true, message: 'Project deleted' });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to delete project' });
  }
});

export default router;
