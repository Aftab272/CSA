import { courses } from '../data/courses';
import { projects } from '../data/projects';
import { services } from '../data/services';
import { teamMembers } from '../data/team';

const envBase =
  (import.meta as { env?: { VITE_GITHUB_IMAGE_BASE?: string } }).env?.VITE_GITHUB_IMAGE_BASE?.trim() ||
  '';

const githubImageBase = (
  envBase ||
  'https://raw.githubusercontent.com/Aftab272/CSA/main/creative-stack-agency/frontend/src/assets/images'
).replace(/\/$/, '');

const toGithubImageUrl = (value: string): string => {
  const input = value.trim();
  if (!input) return input;

  if (input.startsWith('/src/assets/images/')) {
    if (!githubImageBase) return input;
    const fileName = input.split('/').pop();
    return fileName ? `${githubImageBase}/${fileName}` : input;
  }

  return input;
};

export const buildContentSeedPayload = () => ({
  services: services.map((item) => ({
    title: item.title,
    category: item.category,
    description: item.description,
    benefits: item.benefits,
    image: toGithubImageUrl(item.image),
    isActive: true,
  })),
  projects: projects.map((item) => ({
    title: item.title,
    category: item.category,
    shortDescription: item.shortDescription,
    description: item.description,
    features: item.features,
    gallery: item.gallery.map((image) => toGithubImageUrl(image)),
    techStack: item.techStack,
    githubUrl: item.githubUrl,
    liveUrl: item.liveUrl,
    completionDate: item.completionDate,
    isPublished: true,
  })),
  team: teamMembers.map((member) => ({
    name: member.name,
    position: member.position,
    role: member.role,
    experience: member.experience,
    rating: member.rating,
    testimonial: member.testimonial,
    image: toGithubImageUrl(member.image),
    intro: member.intro,
    education: member.education,
    projects: member.projects,
    achievements: member.achievements,
    skills: member.skills,
    certificates: member.certificates,
    social: member.social,
    resume: member.resume,
    portfolio: member.portfolio,
    isActive: true,
  })),
  courses: courses.map((course) => ({
    title: course.title,
    image: toGithubImageUrl(course.image),
    duration: course.duration,
    instructor: {
      ...course.instructor,
      image: toGithubImageUrl(course.instructor.image),
    },
    level: course.level,
    syllabus: course.syllabus,
    seats: course.seats,
    hasCertificate: course.hasCertificate,
    features: course.features,
    price: course.price,
    description: course.description,
    isActive: true,
  })),
});
