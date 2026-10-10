const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const getUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE}${cleanEndpoint}`;
};

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
  [key: string]: any;
}

import { 
  defaultServices, 
  defaultProjects, 
  defaultTeam, 
  defaultCourses, 
  defaultReviews 
} from './defaultData';

// -------------------------------------------------------------
// PUBLIC DATA APIS (Services, Projects, Team, Courses, Reviews)
// -------------------------------------------------------------
export const fetchPublicServices = async (): Promise<any[]> => {
  try {
    const res = await fetch(getUrl('/api/public/services'));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.success && Array.isArray(data.services) && data.services.length > 0 
      ? data.services 
      : defaultServices;
  } catch (err) {
    return defaultServices;
  }
};

export const fetchPublicProjects = async (): Promise<any[]> => {
  try {
    const res = await fetch(getUrl('/api/public/projects'));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.success && Array.isArray(data.projects) && data.projects.length > 0 
      ? data.projects 
      : defaultProjects;
  } catch (err) {
    return defaultProjects;
  }
};

export const fetchPublicTeam = async (): Promise<any[]> => {
  try {
    const res = await fetch(getUrl('/api/public/team'));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.success && Array.isArray(data.team) && data.team.length > 0 
      ? data.team 
      : defaultTeam;
  } catch (err) {
    return defaultTeam;
  }
};

export const fetchPublicCourses = async (): Promise<any[]> => {
  try {
    const res = await fetch(getUrl('/api/public/courses'));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.success && Array.isArray(data.courses) && data.courses.length > 0 
      ? data.courses 
      : defaultCourses;
  } catch (err) {
    return defaultCourses;
  }
};

export const fetchVerifiedReviews = async (): Promise<any[]> => {
  try {
    const response = await fetch(getUrl('/api/reviews'));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data.success && Array.isArray(data.reviews) && data.reviews.length > 0 
      ? data.reviews 
      : defaultReviews;
  } catch (err) {
    return defaultReviews;
  }
};

// -------------------------------------------------------------
// PUBLIC INQUIRY / CONTACT API
// -------------------------------------------------------------
export const submitInquiry = async (inquiryData: {
  name: string;
  email: string;
  service: string;
  message: string;
}): Promise<ApiResponse> => {
  const response = await fetch(getUrl('/api/inquiries'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inquiryData),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to submit inquiry. Please try again.');
  }
  return data;
};

// -------------------------------------------------------------
// PUBLIC REVIEWS API
// -------------------------------------------------------------
export const submitReview = async (reviewData: {
  name: string;
  comment: string;
  rating: number;
  service?: string;
  image?: string;
  company?: string;
}): Promise<ApiResponse> => {
  const response = await fetch(getUrl('/api/reviews'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to submit review. Please try again.');
  }
  return data;
};

// -------------------------------------------------------------
// NEWSLETTER API
// -------------------------------------------------------------
export const subscribeNewsletter = async (email: string): Promise<ApiResponse> => {
  const response = await fetch(getUrl('/api/newsletter/subscribe'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Subscription failed. Please check your email.');
  }
  return data;
};

// -------------------------------------------------------------
// AUTHENTICATION API (Admin login via backend)
// -------------------------------------------------------------
export const authApi = {
  login: async (email: string, password: string): Promise<{ success: boolean; token?: string; user?: any; error?: string }> => {
    const res = await fetch(getUrl('/api/auth/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },
  getSession: async (token: string): Promise<{ success: boolean; user?: any; error?: string }> => {
    const res = await fetch(getUrl('/api/auth/session'), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
  logout: async (): Promise<void> => {
    await fetch(getUrl('/api/auth/logout'), { method: 'POST' }).catch(() => {});
  },
};

// -------------------------------------------------------------
// ADMIN SECURE OPERATIONS API
// -------------------------------------------------------------
export const adminApi = {
  getAuthHeaders: (token?: string) => ({
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }),

  // Inquiries
  getInquiries: async (token: string) => {
    const res = await fetch(getUrl('/api/inquiries'), {
      headers: adminApi.getAuthHeaders(token),
    });
    return res.json();
  },
  updateInquiry: async (id: string, updates: any, token: string) => {
    const res = await fetch(getUrl(`/api/inquiries/${id}`), {
      method: 'PATCH',
      headers: adminApi.getAuthHeaders(token),
      body: JSON.stringify(updates),
    });
    return res.json();
  },
  deleteInquiry: async (id: string, token: string) => {
    const res = await fetch(getUrl(`/api/inquiries/${id}`), {
      method: 'DELETE',
      headers: adminApi.getAuthHeaders(token),
    });
    return res.json();
  },

  // Services
  getServices: async (token: string) => {
    const res = await fetch(getUrl('/api/admin/services'), {
      headers: adminApi.getAuthHeaders(token),
    });
    return res.json();
  },
  createService: async (payload: any, token: string) => {
    const res = await fetch(getUrl('/api/admin/services'), {
      method: 'POST',
      headers: adminApi.getAuthHeaders(token),
      body: JSON.stringify(payload),
    });
    return res.json();
  },
  updateService: async (id: string, payload: any, token: string) => {
    const res = await fetch(getUrl(`/api/admin/services/${id}`), {
      method: 'PUT',
      headers: adminApi.getAuthHeaders(token),
      body: JSON.stringify(payload),
    });
    return res.json();
  },
  deleteService: async (id: string, token: string) => {
    const res = await fetch(getUrl(`/api/admin/services/${id}`), {
      method: 'DELETE',
      headers: adminApi.getAuthHeaders(token),
    });
    return res.json();
  },

  // Projects
  getProjects: async (token: string) => {
    const res = await fetch(getUrl('/api/admin/projects'), {
      headers: adminApi.getAuthHeaders(token),
    });
    return res.json();
  },
  createProject: async (payload: any, token: string) => {
    const res = await fetch(getUrl('/api/admin/projects'), {
      method: 'POST',
      headers: adminApi.getAuthHeaders(token),
      body: JSON.stringify(payload),
    });
    return res.json();
  },
  updateProject: async (id: string, payload: any, token: string) => {
    const res = await fetch(getUrl(`/api/admin/projects/${id}`), {
      method: 'PUT',
      headers: adminApi.getAuthHeaders(token),
      body: JSON.stringify(payload),
    });
    return res.json();
  },
  deleteProject: async (id: string, token: string) => {
    const res = await fetch(getUrl(`/api/admin/projects/${id}`), {
      method: 'DELETE',
      headers: adminApi.getAuthHeaders(token),
    });
    return res.json();
  },

  // Team
  getTeam: async (token: string) => {
    const res = await fetch(getUrl('/api/admin/team'), {
      headers: adminApi.getAuthHeaders(token),
    });
    return res.json();
  },
  createTeamMember: async (payload: any, token: string) => {
    const res = await fetch(getUrl('/api/admin/team'), {
      method: 'POST',
      headers: adminApi.getAuthHeaders(token),
      body: JSON.stringify(payload),
    });
    return res.json();
  },
  updateTeamMember: async (id: string, payload: any, token: string) => {
    const res = await fetch(getUrl(`/api/admin/team/${id}`), {
      method: 'PUT',
      headers: adminApi.getAuthHeaders(token),
      body: JSON.stringify(payload),
    });
    return res.json();
  },
  deleteTeamMember: async (id: string, token: string) => {
    const res = await fetch(getUrl(`/api/admin/team/${id}`), {
      method: 'DELETE',
      headers: adminApi.getAuthHeaders(token),
    });
    return res.json();
  },

  // Courses
  getCourses: async (token: string) => {
    const res = await fetch(getUrl('/api/admin/courses'), {
      headers: adminApi.getAuthHeaders(token),
    });
    return res.json();
  },
  createCourse: async (payload: any, token: string) => {
    const res = await fetch(getUrl('/api/admin/courses'), {
      method: 'POST',
      headers: adminApi.getAuthHeaders(token),
      body: JSON.stringify(payload),
    });
    return res.json();
  },
  updateCourse: async (id: string, payload: any, token: string) => {
    const res = await fetch(getUrl(`/api/admin/courses/${id}`), {
      method: 'PUT',
      headers: adminApi.getAuthHeaders(token),
      body: JSON.stringify(payload),
    });
    return res.json();
  },
  deleteCourse: async (id: string, token: string) => {
    const res = await fetch(getUrl(`/api/admin/courses/${id}`), {
      method: 'DELETE',
      headers: adminApi.getAuthHeaders(token),
    });
    return res.json();
  },

  // Newsletter Subscribers
  getSubscribers: async (token: string) => {
    const res = await fetch(getUrl('/api/newsletter/subscribers'), {
      headers: adminApi.getAuthHeaders(token),
    });
    return res.json();
  },
  deleteSubscriber: async (id: string, token: string) => {
    const res = await fetch(getUrl(`/api/newsletter/subscribers/${id}`), {
      method: 'DELETE',
      headers: adminApi.getAuthHeaders(token),
    });
    return res.json();
  },
};
