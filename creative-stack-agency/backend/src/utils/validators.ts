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

  return { ok: true };
};
