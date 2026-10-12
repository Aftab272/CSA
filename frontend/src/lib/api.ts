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

// -------------------------------------------------------------
// PUBLIC DATA APIS (Services, Projects, Team, Courses, Reviews)
// -------------------------------------------------------------
export const fetchPublicServices = async (): Promise<any[]> => {
  const res = await fetch(getUrl('/api/public/services'));
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    throw new Error(data.error || `Failed to fetch services (HTTP ${res.status})`);
  }
  return Array.isArray(data.services) ? data.services : [];
};

export const fetchPublicProjects = async (): Promise<any[]> => {
  const res = await fetch(getUrl('/api/public/projects'));
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    throw new Error(data.error || `Failed to fetch projects (HTTP ${res.status})`);
  }
  return Array.isArray(data.projects) ? data.projects : [];
};

export const fetchPublicTeam = async (): Promise<any[]> => {
  const res = await fetch(getUrl('/api/public/team'));
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    throw new Error(data.error || `Failed to fetch team members (HTTP ${res.status})`);
  }
  return Array.isArray(data.team) ? data.team : [];
};

export const fetchPublicCourses = async (): Promise<any[]> => {
  const res = await fetch(getUrl('/api/public/courses'));
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    throw new Error(data.error || `Failed to fetch courses (HTTP ${res.status})`);
  }
  return Array.isArray(data.courses) ? data.courses : [];
};

export const fetchVerifiedReviews = async (): Promise<any[]> => {
  const response = await fetch(getUrl('/api/reviews'));
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.error || `Failed to fetch reviews (HTTP ${response.status})`);
  }
  return Array.isArray(data.reviews) ? data.reviews : [];
};

export const fetchPublicBlogs = async (): Promise<{
  posts: any[];
  categories: any[];
  authors: any[];
  tags: any[];
}> => {
  const res = await fetch(getUrl('/api/public/blogs'));
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    throw new Error(data.error || `Failed to fetch blogs (HTTP ${res.status})`);
  }
  return {
    posts: Array.isArray(data.posts) ? data.posts : [],
    categories: Array.isArray(data.categories) ? data.categories : [],
    authors: Array.isArray(data.authors) ? data.authors : [],
    tags: Array.isArray(data.tags) ? data.tags : [],
  };
};

export const fetchPublicBlogBySlug = async (slug: string): Promise<any> => {
  const res = await fetch(getUrl(`/api/public/blogs/${slug}`));
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    throw new Error(data.error || `Failed to fetch article (HTTP ${res.status})`);
  }
  return data;
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
  try {
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
  } catch (err: any) {
    if (typeof window !== 'undefined') {
      try {
        const queueKey = 'csa_offline_inquiries';
        const raw = localStorage.getItem(queueKey);
        const list = raw ? JSON.parse(raw) : [];
        list.push({ ...inquiryData, queuedAt: new Date().toISOString() });
        localStorage.setItem(queueKey, JSON.stringify(list));
        return {
          success: true,
          message: 'Thank you! Your inquiry has been saved and will sync automatically once connected.',
          offline: true,
        };
      } catch {
        // ignore
      }
    }
    throw err;
  }
};

// Automatic sync of offline inquiries when connection is restored
if (typeof window !== 'undefined') {
  window.addEventListener('online', async () => {
    try {
      const queueKey = 'csa_offline_inquiries';
      const raw = localStorage.getItem(queueKey);
      if (!raw) return;
      const list = JSON.parse(raw);
      if (!Array.isArray(list) || list.length === 0) return;
      localStorage.removeItem(queueKey);
      for (const item of list) {
        await fetch(getUrl('/api/inquiries'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        }).catch(() => {});
      }
    } catch {
      // ignore
    }
  });
}

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
  changePassword: async (token: string, newPassword: string, currentPassword?: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    const res = await fetch(getUrl('/api/auth/change-password'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newPassword, currentPassword }),
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
  seedEtsyCourse: async (token: string) => {
    const res = await fetch(getUrl('/api/admin/courses/seed-etsy'), {
      method: 'POST',
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

  // Blogs Management
  getAdminBlogs: async (token: string) => {
    const res = await fetch(getUrl('/api/admin/blogs'), {
      headers: adminApi.getAuthHeaders(token),
    });
    return res.json();
  },
  createBlog: async (payload: any, token: string) => {
    const res = await fetch(getUrl('/api/admin/blogs'), {
      method: 'POST',
      headers: adminApi.getAuthHeaders(token),
      body: JSON.stringify(payload),
    });
    return res.json();
  },
  updateBlog: async (id: string, payload: any, token: string) => {
    const res = await fetch(getUrl(`/api/admin/blogs/${id}`), {
      method: 'PUT',
      headers: adminApi.getAuthHeaders(token),
      body: JSON.stringify(payload),
    });
    return res.json();
  },
  deleteBlog: async (id: string, token: string) => {
    const res = await fetch(getUrl(`/api/admin/blogs/${id}`), {
      method: 'DELETE',
      headers: adminApi.getAuthHeaders(token),
    });
    return res.json();
  },
  createCategory: async (payload: any, token: string) => {
    const res = await fetch(getUrl('/api/admin/blogs/categories'), {
      method: 'POST',
      headers: adminApi.getAuthHeaders(token),
      body: JSON.stringify(payload),
    });
    return res.json();
  },
  deleteCategory: async (id: string, token: string) => {
    const res = await fetch(getUrl(`/api/admin/blogs/categories/${id}`), {
      method: 'DELETE',
      headers: adminApi.getAuthHeaders(token),
    });
    return res.json();
  },
};
