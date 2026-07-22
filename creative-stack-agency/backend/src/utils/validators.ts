export type ContactPayload = {
  name: string;
  email: string;
  service: string;
  message: string;
  honeypot?: string;
};

export type ValidationResult =
  | { ok: true }
  | { ok: false; message: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const MAX_URL_LENGTH = 500;

const ALLOWED_SERVICES = new Set([
  'Full Stack Web Development',
  'WordPress Development',
  'Shopify Store Development',
  'Graphic Designing',
  'UI/UX Design',
  'Digital Marketing',
  'SEO Optimization',
  'Content Writing',
  'MS Office & Documentation',
  'Web Development Course',
  'Shopify Masterclass Course',
  'Website Development',
]);

export const validateContactPayload = (payload: ContactPayload): ValidationResult => {
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    return { ok: false, message: 'Invalid submission' };
  }

  const name = payload.name?.trim() || '';
  const email = payload.email?.trim() || '';
  const service = payload.service?.trim() || '';
  const message = payload.message?.trim() || '';

  if (name.length < 2 || name.length > 80) {
    return { ok: false, message: 'Name must be between 2 and 80 characters' };
  }

  if (!EMAIL_REGEX.test(email) || email.length > 120) {
    return { ok: false, message: 'Please provide a valid email address' };
  }

  if (!ALLOWED_SERVICES.has(service)) {
    return { ok: false, message: 'Please select a valid service' };
  }

  if (message.length < 10 || message.length > 2000) {
    return { ok: false, message: 'Message must be between 10 and 2000 characters' };
  }

  return { ok: true };
};

export const validateInquiryPayload = (payload: Record<string, unknown>): ValidationResult => {
  const name = String(payload.name || '').trim();
  const email = String(payload.email || '').trim();
  const service = String(payload.service || '').trim();
  const message = String(payload.message || '').trim();
  const allowedStatuses = new Set(['new', 'in_progress', 'resolved', 'spam']);
  const status = String(payload.status || 'new').trim();

  if (name.length < 2 || name.length > 80) {
    return { ok: false, message: 'Name must be between 2 and 80 characters' };
  }
  if (!EMAIL_REGEX.test(email) || email.length > 120) {
    return { ok: false, message: 'Please provide a valid email address' };
  }
  if (service.length < 2 || service.length > 120) {
    return { ok: false, message: 'Service must be between 2 and 120 characters' };
  }
  if (message.length < 10 || message.length > 2000) {
    return { ok: false, message: 'Message must be between 10 and 2000 characters' };
  }
  if (!allowedStatuses.has(status)) {
    return { ok: false, message: 'Invalid inquiry status' };
  }

  return { ok: true };
};

export const validateServicePayload = (payload: Record<string, unknown>): ValidationResult => {
  const title = String(payload.title || '').trim();
  const category = String(payload.category || '').trim();
  const description = String(payload.description || '').trim();
  const image = String(payload.image || '').trim();
  const benefits = Array.isArray(payload.benefits) ? payload.benefits : [];

  if (title.length < 3 || title.length > 120) {
    return { ok: false, message: 'Service title must be between 3 and 120 characters' };
  }
  if (category.length < 2 || category.length > 80) {
    return { ok: false, message: 'Service category must be between 2 and 80 characters' };
  }
  if (description.length < 15 || description.length > 1200) {
    return { ok: false, message: 'Service description must be between 15 and 1200 characters' };
  }
  if (image.length < 5 || image.length > 500) {
    return { ok: false, message: 'Service image URL is required' };
  }
  if (!isSafeUrl(image)) {
    return { ok: false, message: 'Service image must be a valid http/https URL' };
  }
  if (!benefits.every((item) => typeof item === 'string' && item.trim().length > 0)) {
    return { ok: false, message: 'Benefits must be a non-empty string array' };
  }

  return { ok: true };
};

export const validateProjectPayload = (payload: Record<string, unknown>): ValidationResult => {
  const title = String(payload.title || '').trim();
  const category = String(payload.category || '').trim();
  const shortDescription = String(payload.shortDescription || '').trim();
  const description = String(payload.description || '').trim();
  const gallery = Array.isArray(payload.gallery) ? payload.gallery : [];
  const features = Array.isArray(payload.features) ? payload.features : [];
  const stack = payload.techStack as Record<string, unknown> | undefined;

  if (title.length < 3 || title.length > 160) {
    return { ok: false, message: 'Project title must be between 3 and 160 characters' };
  }
  if (category.length < 2 || category.length > 80) {
    return { ok: false, message: 'Project category must be between 2 and 80 characters' };
  }
  if (shortDescription.length < 10 || shortDescription.length > 300) {
    return { ok: false, message: 'Short description must be between 10 and 300 characters' };
  }
  if (description.length < 20 || description.length > 2500) {
    return { ok: false, message: 'Project description must be between 20 and 2500 characters' };
  }
  if (!Array.isArray(gallery) || !gallery.every((item) => typeof item === 'string' && item.trim())) {
    return { ok: false, message: 'Gallery must be a string array' };
  }
  if (!gallery.every((item) => isSafeUrl(String(item)))) {
    return { ok: false, message: 'Each gallery image must be a valid http/https URL' };
  }
  if (!Array.isArray(features) || !features.every((item) => typeof item === 'string' && item.trim())) {
    return { ok: false, message: 'Features must be a string array' };
  }
  if (!stack || typeof stack !== 'object') {
    return { ok: false, message: 'Project tech stack is required' };
  }

  const keys = ['frontend', 'backend', 'database', 'deployment', 'other'];
  for (const key of keys) {
    const value = stack[key];
    if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) {
      return { ok: false, message: `Tech stack field "${key}" must be a string array` };
    }
  }

  const githubUrl = typeof payload.githubUrl === 'string' ? payload.githubUrl.trim() : '';
  const liveUrl = typeof payload.liveUrl === 'string' ? payload.liveUrl.trim() : '';

  if (githubUrl && !isSafeUrl(githubUrl)) {
    return { ok: false, message: 'GitHub URL must be a valid http/https URL' };
  }
  if (liveUrl && !isSafeUrl(liveUrl)) {
    return { ok: false, message: 'Live URL must be a valid http/https URL' };
  }

  return { ok: true };
};

export const isSafeUrl = (value: string): boolean => {
  const urlValue = value.trim();
  if (!urlValue || urlValue.length > MAX_URL_LENGTH) return false;

  try {
    const parsed = new URL(urlValue);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
};

export const validateTeamMemberPayload = (payload: Record<string, unknown>): ValidationResult => {
  const name = String(payload.name || '').trim();
  const position = String(payload.position || '').trim();
  const role = String(payload.role || '').trim();
  const image = String(payload.image || '').trim();
  const intro = String(payload.intro || '').trim();
  const education = String(payload.education || '').trim();
  const projects = String(payload.projects || '').trim();
  const achievements = String(payload.achievements || '').trim();
  const skills = Array.isArray(payload.skills) ? payload.skills : [];
  const certificates = Array.isArray(payload.certificates) ? payload.certificates : [];
  const experience = String(payload.experience || '').trim();
  const resume = typeof payload.resume === 'string' ? payload.resume.trim() : '';
  const portfolio = typeof payload.portfolio === 'string' ? payload.portfolio.trim() : '';

  if (name.length < 2 || name.length > 120) {
    return { ok: false, message: 'Team member name must be between 2 and 120 characters' };
  }
  if (position.length < 2 || position.length > 120) {
    return { ok: false, message: 'Position must be between 2 and 120 characters' };
  }
  if (role.length < 2 || role.length > 200) {
    return { ok: false, message: 'Role must be between 2 and 200 characters' };
  }
  if (!isSafeUrl(image)) {
    return { ok: false, message: 'Profile image must be a valid http/https URL' };
  }
  if (intro.length < 10 || intro.length > 3000) {
    return { ok: false, message: 'Intro must be between 10 and 3000 characters' };
  }
  if (education.length < 2 || education.length > 500) {
    return { ok: false, message: 'Education must be between 2 and 500 characters' };
  }
  if (projects.length < 2 || projects.length > 2000) {
    return { ok: false, message: 'Projects summary must be between 2 and 2000 characters' };
  }
  if (achievements.length < 2 || achievements.length > 2000) {
    return { ok: false, message: 'Achievements must be between 2 and 2000 characters' };
  }
  if (experience.length < 2 || experience.length > 120) {
    return { ok: false, message: 'Experience must be between 2 and 120 characters' };
  }
  if (!Array.isArray(skills) || !skills.every((s) => typeof s === 'string' && s.trim().length > 0)) {
    return { ok: false, message: 'Skills must be a non-empty string array' };
  }
  if (!Array.isArray(certificates) || !certificates.every((c) => typeof c === 'string')) {
    return { ok: false, message: 'Certificates must be a string array' };
  }

  const rating = Number(payload.rating ?? 5);
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return { ok: false, message: 'Rating must be a number between 1 and 5' };
  }

  const social = (payload.social || {}) as Record<string, unknown>;
  const socialKeys = [
    'linkedin',
    'github',
    'website',
    'whatsapp',
    'tiktok',
    'facebook',
    'instagram',
  ] as const;

  for (const key of socialKeys) {
    const value = typeof social[key] === 'string' ? String(social[key]).trim() : '';
    if (value && !isSafeUrl(value)) {
      return { ok: false, message: `${key} must be a valid http/https URL` };
    }
  }

  if (resume && resume !== '#' && !isSafeUrl(resume)) {
    return { ok: false, message: 'Resume link must be a valid http/https URL or #' };
  }
  if (portfolio && !isSafeUrl(portfolio)) {
    return { ok: false, message: 'Portfolio must be a valid http/https URL' };
  }

  return { ok: true };
};

export const validateCoursePayload = (payload: Record<string, unknown>): ValidationResult => {
  const title = String(payload.title || '').trim();
  const image = String(payload.image || '').trim();
  const duration = String(payload.duration || '').trim();
  const price = String(payload.price || '').trim();
  const description = String(payload.description || '').trim();
  const level = String(payload.level || '').trim();
  const syllabus = Array.isArray(payload.syllabus) ? payload.syllabus : [];
  const features = Array.isArray(payload.features) ? payload.features : [];
  const instructor = (payload.instructor || {}) as Record<string, unknown>;
  const seats = Number(payload.seats);

  if (title.length < 2 || title.length > 180) {
    return { ok: false, message: 'Course title must be between 2 and 180 characters' };
  }
  if (!isSafeUrl(image)) {
    return { ok: false, message: 'Course image must be a valid http/https URL' };
  }
  if (duration.length < 2 || duration.length > 80) {
    return { ok: false, message: 'Duration must be between 2 and 80 characters' };
  }
  if (price.length < 1 || price.length > 80) {
    return { ok: false, message: 'Price is required' };
  }
  if (description.length < 10 || description.length > 1200) {
    return { ok: false, message: 'Description must be between 10 and 1200 characters' };
  }
  if (!['Beginner', 'Intermediate', 'Advanced', 'Professional'].includes(level)) {
    return { ok: false, message: 'Invalid course level' };
  }
  if (!Number.isFinite(seats) || seats < 1 || seats > 500) {
    return { ok: false, message: 'Seats must be between 1 and 500' };
  }
  if (!Array.isArray(syllabus) || !syllabus.every((s) => typeof s === 'string' && s.trim().length > 0)) {
    return { ok: false, message: 'Syllabus must be a non-empty string array' };
  }
  if (!Array.isArray(features) || !features.every((f) => typeof f === 'string' && f.trim().length > 0)) {
    return { ok: false, message: 'Features must be a non-empty string array' };
  }

  const instructorName = String(instructor.name || '').trim();
  const instructorDesignation = String(instructor.designation || '').trim();
  const instructorImage = String(instructor.image || '').trim();
  if (instructorName.length < 2 || instructorName.length > 120) {
    return { ok: false, message: 'Instructor name must be between 2 and 120 characters' };
  }
  if (instructorDesignation.length < 2 || instructorDesignation.length > 120) {
    return { ok: false, message: 'Instructor designation must be between 2 and 120 characters' };
  }
  if (!isSafeUrl(instructorImage)) {
    return { ok: false, message: 'Instructor image must be a valid http/https URL' };
  }

  return { ok: true };
};
