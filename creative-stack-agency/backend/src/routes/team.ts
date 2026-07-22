import express, { Response } from 'express';
import TeamMember from '../models/TeamMember';
import { validateTeamMemberPayload } from '../utils/validators';

const router = express.Router();

router.get('/', async (req, res: Response): Promise<void> => {
  try {
    const includeAll = req.query.includeAll === 'true';
    const filter = includeAll ? {} : { isActive: true };
    const members = await TeamMember.find(filter).sort({ createdAt: 1 }).select('-__v');
    res.json({ success: true, members });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to fetch team members' });
  }
});

router.post('/', async (req, res: Response): Promise<void> => {
  try {
    const validation = validateTeamMemberPayload(req.body);
    if (!validation.ok) {
      res.status(400).json({ success: false, message: validation.message });
      return;
    }

    const member = await TeamMember.create({
      ...req.body,
      isActive: req.body.isActive ?? true,
    });
    res.status(201).json({ success: true, message: 'Team member created', member });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to create team member' });
  }
});

router.put('/:id', async (req, res: Response): Promise<void> => {
  try {
    const validation = validateTeamMemberPayload(req.body);
    if (!validation.ok) {
      res.status(400).json({ success: false, message: validation.message });
      return;
    }

    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      { ...req.body, isActive: req.body.isActive ?? true },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!member) {
      res.status(404).json({ success: false, message: 'Team member not found' });
      return;
    }

    res.json({ success: true, message: 'Team member updated', member });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to update team member' });
  }
});

router.delete('/:id', async (req, res: Response): Promise<void> => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) {
      res.status(404).json({ success: false, message: 'Team member not found' });
      return;
    }

    res.json({ success: true, message: 'Team member deleted' });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to delete team member' });
  }
});

export default router;
