import express, { Response } from 'express';
import Project from '../models/Project';
import Service from '../models/Service';
import Course from '../models/Course';
import TeamMember from '../models/TeamMember';
import {
  validateCoursePayload,
  validateProjectPayload,
  validateServicePayload,
  validateTeamMemberPayload,
} from '../utils/validators';

const router = express.Router();

type SeedPayload = {
  services?: Record<string, unknown>[];
  projects?: Record<string, unknown>[];
  team?: Record<string, unknown>[];
  courses?: Record<string, unknown>[];
};

router.post('/seed', async (req, res: Response): Promise<void> => {
  try {
    const payload = (req.body || {}) as SeedPayload;
    const incomingServices = Array.isArray(payload.services) ? payload.services : [];
    const incomingProjects = Array.isArray(payload.projects) ? payload.projects : [];
    const incomingTeam = Array.isArray(payload.team) ? payload.team : [];
    const incomingCourses = Array.isArray(payload.courses) ? payload.courses : [];

    if (
      incomingServices.length === 0 &&
      incomingProjects.length === 0 &&
      incomingTeam.length === 0 &&
      incomingCourses.length === 0
    ) {
      res.status(400).json({
        success: false,
        message: 'No services, projects, team, or courses provided for seed',
      });
      return;
    }

    if (
      incomingServices.length > 200 ||
      incomingProjects.length > 300 ||
      incomingTeam.length > 200 ||
      incomingCourses.length > 200
    ) {
      res.status(400).json({ success: false, message: 'Seed payload is too large' });
      return;
    }

    for (const service of incomingServices) {
      const validation = validateServicePayload(service);
      if (!validation.ok) {
        res.status(400).json({ success: false, message: `Service seed validation failed: ${validation.message}` });
        return;
      }
    }

    for (const project of incomingProjects) {
      const validation = validateProjectPayload(project);
      if (!validation.ok) {
        res.status(400).json({ success: false, message: `Project seed validation failed: ${validation.message}` });
        return;
      }
    }

    for (const member of incomingTeam) {
      const validation = validateTeamMemberPayload(member);
      if (!validation.ok) {
        res.status(400).json({
          success: false,
          message: `Team seed validation failed: ${validation.message}`,
        });
        return;
      }
    }

    for (const course of incomingCourses) {
      const validation = validateCoursePayload(course);
      if (!validation.ok) {
        res.status(400).json({
          success: false,
          message: `Course seed validation failed: ${validation.message}`,
        });
        return;
      }
    }

    let servicesUpserted = 0;
    let projectsUpserted = 0;
    let teamUpserted = 0;
    let coursesUpserted = 0;

    for (const service of incomingServices) {
      await Service.findOneAndUpdate(
        { title: String(service.title).trim() },
        {
          title: String(service.title).trim(),
          category: String(service.category).trim(),
          description: String(service.description).trim(),
          benefits: Array.isArray(service.benefits) ? service.benefits : [],
          image: String(service.image).trim(),
          isActive: service.isActive !== false,
        },
        { upsert: true, new: true, runValidators: true }
      );
      servicesUpserted += 1;
    }

    for (const project of incomingProjects) {
      await Project.findOneAndUpdate(
        { title: String(project.title).trim() },
        {
          title: String(project.title).trim(),
          category: String(project.category).trim(),
          shortDescription: String(project.shortDescription).trim(),
          description: String(project.description).trim(),
          features: Array.isArray(project.features) ? project.features : [],
          gallery: Array.isArray(project.gallery) ? project.gallery : [],
          techStack: project.techStack,
          githubUrl: typeof project.githubUrl === 'string' ? project.githubUrl.trim() : undefined,
          liveUrl: typeof project.liveUrl === 'string' ? project.liveUrl.trim() : undefined,
          completionDate: project.completionDate || undefined,
          isPublished: project.isPublished !== false,
        },
        { upsert: true, new: true, runValidators: true }
      );
      projectsUpserted += 1;
    }

    for (const member of incomingTeam) {
      await TeamMember.findOneAndUpdate(
        { name: String(member.name).trim() },
        { ...member, isActive: member.isActive !== false },
        { upsert: true, new: true, runValidators: true }
      );
      teamUpserted += 1;
    }

    for (const course of incomingCourses) {
      await Course.findOneAndUpdate(
        { title: String(course.title).trim() },
        { ...course, isActive: course.isActive !== false },
        { upsert: true, new: true, runValidators: true }
      );
      coursesUpserted += 1;
    }

    res.json({
      success: true,
      message: 'Content seed completed',
      servicesUpserted,
      projectsUpserted,
      teamUpserted,
      coursesUpserted,
    });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to seed content' });
  }
});

export default router;
