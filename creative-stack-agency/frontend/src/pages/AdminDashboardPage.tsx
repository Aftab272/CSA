import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { useTheme } from '../context/ThemeContext';
import BlogAdminPanel from '../components/BlogAdminPanel';
import {
  ArrowLeft,
  Briefcase,
  GraduationCap,
  FileStack,
  LayoutDashboard,
  LogOut,
  Mail,
  Save,
  Settings,
  ShieldCheck,
  Sun,
  Moon,
  Trash2,
  Database,
  Users,
} from 'lucide-react';
import { buildContentSeedPayload } from '../utils/contentSeed';

type Inquiry = {
  _id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved' | 'spam';
  createdAt: string;
};

type ServiceItem = {
  _id: string;
  title: string;
  category: string;
  description: string;
  benefits: string[];
  image: string;
  isActive: boolean;
};

type ProjectItem = {
  _id: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  features: string[];
  gallery: string[];
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    deployment: string[];
    other: string[];
  };
  githubUrl?: string;
  liveUrl?: string;
  completionDate?: string;
  isPublished: boolean;
};

type TeamItem = {
  _id: string;
  name: string;
  position: string;
  role: string;
  experience: string;
  rating: number;
  testimonial: string;
  image: string;
  intro: string;
  education: string;
  projects: string;
  achievements: string;
  skills: string[];
  certificates: string[];
  social: {
    email?: string;
    linkedin?: string;
    github?: string;
    website?: string;
    whatsapp?: string;
    tiktok?: string;
    facebook?: string;
    instagram?: string;
  };
  resume?: string;
  portfolio?: string;
  isActive: boolean;
};

type CourseItem = {
  _id: string;
  title: string;
  image: string;
  duration: string;
  instructor: {
    name: string;
    designation: string;
    image: string;
  };
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
  syllabus: string[];
  seats: number;
  hasCertificate: boolean;
  features: string[];
  price: string;
  description: string;
  isActive: boolean;
};

type AdminTab =
  | 'overview'
  | 'inquiries'
  | 'services'
  | 'projects'
  | 'team'
  | 'courses'
  | 'site'
  | 'blog';

type CrudTab = 'inquiries' | 'services' | 'projects' | 'team' | 'courses';

type EditorRouteState =
  | {
      tab: CrudTab;
      mode: 'new';
      id?: undefined;
    }
  | {
      tab: CrudTab;
      mode: 'edit';
      id: string;
    };

const tabItems: { id: AdminTab; label: string; icon: any }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'inquiries', label: 'Inquiries', icon: Mail },
  { id: 'services', label: 'Services', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FileStack },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'courses', label: 'Courses', icon: GraduationCap },
  { id: 'site', label: 'Site Settings', icon: Settings },
  { id: 'blog', label: 'Blog CMS', icon: ShieldCheck },
];

const initialServiceForm = {
  title: '',
  category: '',
  description: '',
  benefits: '',
  image: '',
  isActive: true,
};

const initialProjectForm = {
  title: '',
  category: '',
  shortDescription: '',
  description: '',
  features: '',
  gallery: '',
  frontend: '',
  backend: '',
  database: '',
  deployment: '',
  other: '',
  githubUrl: '',
  liveUrl: '',
  completionDate: '',
  isPublished: true,
};

const initialTeamForm = {
  name: '',
  position: '',
  role: '',
  experience: '',
  rating: '5',
  testimonial: '',
  image: '',
  intro: '',
  education: '',
  projects: '',
  achievements: '',
  skills: '',
  certificates: '',
  email: '',
  linkedin: '',
  github: '',
  website: '',
  whatsapp: '',
  tiktok: '',
  facebook: '',
  instagram: '',
  resume: '',
  portfolio: '',
  isActive: true,
};

const initialCourseForm = {
  title: '',
  image: '',
  duration: '',
  instructorName: '',
  instructorDesignation: '',
  instructorImage: '',
  level: 'Beginner' as CourseItem['level'],
  syllabus: '',
  seats: '10',
  hasCertificate: true,
  features: '',
  price: '',
  description: '',
  isActive: true,
};

const initialInquiryForm = {
  name: '',
  email: '',
  service: '',
  message: '',
  status: 'new' as Inquiry['status'],
};

const splitCsv = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { footerData, setFooterData, seoData, setSeoData } = useAdmin();
  const { theme, setTheme } = useTheme();
  const previousThemeRef = useRef(theme);
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [editorRouteState, setEditorRouteState] = useState<EditorRouteState | null>(null);
  const [adminTheme, setAdminTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('csa_admin_theme') === 'light' ? 'light' : 'dark';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const apiBase =
    (import.meta as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL?.trim() || '';
  const api = (path: string) => (apiBase ? `${apiBase.replace(/\/$/, '')}${path}` : path);

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [team, setTeam] = useState<TeamItem[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [inquiryForm, setInquiryForm] = useState(initialInquiryForm);
  const [editingInquiryId, setEditingInquiryId] = useState<string | null>(null);

  const [serviceForm, setServiceForm] = useState(initialServiceForm);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  const [projectForm, setProjectForm] = useState(initialProjectForm);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [teamForm, setTeamForm] = useState(initialTeamForm);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [courseForm, setCourseForm] = useState(initialCourseForm);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

  useEffect(() => {
    void Promise.all([
      fetchInquiries(),
      fetchServices(),
      fetchProjects(),
      fetchTeam(),
      fetchCourses(),
    ]);
  }, []);

  useEffect(() => {
    const pathWithoutBase = location.pathname.replace(/^\/admin\/?/, '');
    const [tabSegment, actionSegment, modeSegment] = pathWithoutBase
      .split('/')
      .filter(Boolean);

    const availableTabs = new Set<AdminTab>(tabItems.map((item) => item.id));
    const routeTab = (tabSegment && availableTabs.has(tabSegment as AdminTab)
      ? (tabSegment as AdminTab)
      : 'overview') as AdminTab;

    let nextEditorState: EditorRouteState | null = null;
    if (
      ['inquiries', 'services', 'projects', 'team', 'courses'].includes(routeTab) &&
      actionSegment === 'new'
    ) {
      nextEditorState = { tab: routeTab as CrudTab, mode: 'new' };
    } else if (
      ['inquiries', 'services', 'projects', 'team', 'courses'].includes(routeTab) &&
      actionSegment &&
      modeSegment === 'edit'
    ) {
      nextEditorState = {
        tab: routeTab as CrudTab,
        mode: 'edit',
        id: actionSegment,
      };
    }

    setActiveTab(routeTab);
    setEditorRouteState(nextEditorState);
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem('csa_admin_theme', adminTheme);
  }, [adminTheme]);

  useEffect(() => {
    previousThemeRef.current = theme;
    setTheme(adminTheme);
    return () => {
      setTheme(previousThemeRef.current);
    };
  }, []);

  useEffect(() => {
    setTheme(adminTheme);
  }, [adminTheme, setTheme]);

  const stats = useMemo(
    () => ({
      inquiries: inquiries.length,
      pendingInquiries: inquiries.filter((i) => i.status === 'new' || i.status === 'in_progress')
        .length,
      services: services.length,
      projects: projects.length,
      team: team.length,
      courses: courses.length,
    }),
    [inquiries, services, projects, team, courses]
  );

  const setFlash = (value: string) => {
    setMessage(value);
    window.setTimeout(() => setMessage(''), 2000);
  };

  const navigateToTab = (tab: AdminTab) => {
    if (tab === 'overview') {
      navigate('/admin');
      return;
    }
    navigate(`/admin/${tab}`);
  };

  const openCreatePage = (tab: CrudTab) => {
    navigate(`/admin/${tab}/new`);
  };

  const backToList = (tab: CrudTab) => {
    navigate(`/admin/${tab}`);
  };

  const fetchInquiries = async () => {
    const res = await fetch(api('/api/inquiries'));
    const data = await res.json();
    if (data.success) setInquiries(data.inquiries || []);
  };

  const fetchServices = async () => {
    const res = await fetch(api('/api/services?includeAll=true'));
    const data = await res.json();
    if (data.success) setServices(data.services || []);
  };

  const fetchProjects = async () => {
    const res = await fetch(api('/api/projects?includeAll=true'));
    const data = await res.json();
    if (data.success) setProjects(data.projects || []);
  };

  const fetchTeam = async () => {
    const res = await fetch(api('/api/team?includeAll=true'));
    const data = await res.json();
    if (data.success) setTeam(data.members || []);
  };

  const fetchCourses = async () => {
    const res = await fetch(api('/api/courses?includeAll=true'));
    const data = await res.json();
    if (data.success) setCourses(data.courses || []);
  };

  const seedExistingContent = async () => {
    const shouldContinue = confirm(
      'This will sync current site services, projects, team, and courses into MongoDB and update existing records by title. Continue?'
    );
    if (!shouldContinue) return;

    const payload = buildContentSeedPayload();
    const res = await fetch(api('/api/content/seed'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!data.success) {
      setFlash(data.message || 'Unable to seed content');
      return;
    }

    setFlash(
      `Seed complete: ${data.servicesUpserted ?? 0} services, ${data.projectsUpserted ?? 0} projects, ${data.teamUpserted ?? 0} team, ${data.coursesUpserted ?? 0} courses`
    );
    await Promise.all([fetchServices(), fetchProjects(), fetchTeam(), fetchCourses()]);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const updateInquiryStatus = async (id: string, status: Inquiry['status']) => {
    const res = await fetch(api(`/api/inquiries/${id}/status`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.success) {
      setFlash('Inquiry updated');
      await fetchInquiries();
    }
  };

  const submitInquiry = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      name: inquiryForm.name,
      email: inquiryForm.email,
      service: inquiryForm.service,
      message: inquiryForm.message,
      status: inquiryForm.status,
    };

    const isEdit = Boolean(editingInquiryId);
    const res = await fetch(api(isEdit ? `/api/inquiries/${editingInquiryId}` : '/api/inquiries/admin'), {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.success) {
      setFlash(isEdit ? 'Inquiry updated' : 'Inquiry created');
      setInquiryForm(initialInquiryForm);
      setEditingInquiryId(null);
      await fetchInquiries();
      backToList('inquiries');
    } else {
      setFlash(data.message || 'Unable to save inquiry');
    }
  };

  const editInquiry = (item: Inquiry) => {
    setEditingInquiryId(item._id);
    setInquiryForm({
      name: item.name,
      email: item.email,
      service: item.service,
      message: item.message,
      status: item.status,
    });
    navigate(`/admin/inquiries/${item._id}/edit`);
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    const res = await fetch(api(`/api/inquiries/${id}`), { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setFlash('Inquiry deleted');
      await fetchInquiries();
    }
  };

  const submitService = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      title: serviceForm.title,
      category: serviceForm.category,
      description: serviceForm.description,
      benefits: splitCsv(serviceForm.benefits),
      image: serviceForm.image,
      isActive: serviceForm.isActive,
    };

    const isEdit = Boolean(editingServiceId);
    const res = await fetch(
      api(isEdit ? `/api/services/${editingServiceId}` : '/api/services'),
      {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    if (data.success) {
      setFlash(isEdit ? 'Service updated' : 'Service created');
      setServiceForm(initialServiceForm);
      setEditingServiceId(null);
      await fetchServices();
      backToList('services');
    } else {
      setFlash(data.message || 'Unable to save service');
    }
  };

  const editService = (item: ServiceItem) => {
    setEditingServiceId(item._id);
    setServiceForm({
      title: item.title,
      category: item.category,
      description: item.description,
      benefits: item.benefits.join(', '),
      image: item.image,
      isActive: item.isActive,
    });
    navigate(`/admin/services/${item._id}/edit`);
  };

  const deleteService = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    const res = await fetch(api(`/api/services/${id}`), { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setFlash('Service deleted');
      await fetchServices();
    }
  };

  const submitProject = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      title: projectForm.title,
      category: projectForm.category,
      shortDescription: projectForm.shortDescription,
      description: projectForm.description,
      features: splitCsv(projectForm.features),
      gallery: splitCsv(projectForm.gallery),
      techStack: {
        frontend: splitCsv(projectForm.frontend),
        backend: splitCsv(projectForm.backend),
        database: splitCsv(projectForm.database),
        deployment: splitCsv(projectForm.deployment),
        other: splitCsv(projectForm.other),
      },
      githubUrl: projectForm.githubUrl || undefined,
      liveUrl: projectForm.liveUrl || undefined,
      completionDate: projectForm.completionDate || undefined,
      isPublished: projectForm.isPublished,
    };

    const isEdit = Boolean(editingProjectId);
    const res = await fetch(
      api(isEdit ? `/api/projects/${editingProjectId}` : '/api/projects'),
      {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    if (data.success) {
      setFlash(isEdit ? 'Project updated' : 'Project created');
      setProjectForm(initialProjectForm);
      setEditingProjectId(null);
      await fetchProjects();
      backToList('projects');
    } else {
      setFlash(data.message || 'Unable to save project');
    }
  };

  const editProject = (item: ProjectItem) => {
    setEditingProjectId(item._id);
    setProjectForm({
      title: item.title,
      category: item.category,
      shortDescription: item.shortDescription,
      description: item.description,
      features: item.features.join(', '),
      gallery: item.gallery.join(', '),
      frontend: item.techStack.frontend.join(', '),
      backend: item.techStack.backend.join(', '),
      database: item.techStack.database.join(', '),
      deployment: item.techStack.deployment.join(', '),
      other: item.techStack.other.join(', '),
      githubUrl: item.githubUrl || '',
      liveUrl: item.liveUrl || '',
      completionDate: item.completionDate ? item.completionDate.slice(0, 10) : '',
      isPublished: item.isPublished,
    });
    navigate(`/admin/projects/${item._id}/edit`);
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    const res = await fetch(api(`/api/projects/${id}`), { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setFlash('Project deleted');
      await fetchProjects();
    }
  };

  const submitTeam = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      name: teamForm.name,
      position: teamForm.position,
      role: teamForm.role,
      experience: teamForm.experience,
      rating: Number(teamForm.rating || 5),
      testimonial: teamForm.testimonial,
      image: teamForm.image,
      intro: teamForm.intro,
      education: teamForm.education,
      projects: teamForm.projects,
      achievements: teamForm.achievements,
      skills: splitCsv(teamForm.skills),
      certificates: splitCsv(teamForm.certificates),
      social: {
        email: teamForm.email || undefined,
        linkedin: teamForm.linkedin || undefined,
        github: teamForm.github || undefined,
        website: teamForm.website || undefined,
        whatsapp: teamForm.whatsapp || undefined,
        tiktok: teamForm.tiktok || undefined,
        facebook: teamForm.facebook || undefined,
        instagram: teamForm.instagram || undefined,
      },
      resume: teamForm.resume || undefined,
      portfolio: teamForm.portfolio || undefined,
      isActive: teamForm.isActive,
    };

    const isEdit = Boolean(editingTeamId);
    const res = await fetch(api(isEdit ? `/api/team/${editingTeamId}` : '/api/team'), {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.success) {
      setFlash(isEdit ? 'Team member updated' : 'Team member created');
      setTeamForm(initialTeamForm);
      setEditingTeamId(null);
      await fetchTeam();
      backToList('team');
    } else {
      setFlash(data.message || 'Unable to save team member');
    }
  };

  const editTeam = (item: TeamItem) => {
    setEditingTeamId(item._id);
    setTeamForm({
      name: item.name,
      position: item.position,
      role: item.role,
      experience: item.experience,
      rating: String(item.rating ?? 5),
      testimonial: item.testimonial,
      image: item.image,
      intro: item.intro,
      education: item.education,
      projects: item.projects,
      achievements: item.achievements,
      skills: item.skills.join(', '),
      certificates: item.certificates.join(', '),
      email: item.social.email || '',
      linkedin: item.social.linkedin || '',
      github: item.social.github || '',
      website: item.social.website || '',
      whatsapp: item.social.whatsapp || '',
      tiktok: item.social.tiktok || '',
      facebook: item.social.facebook || '',
      instagram: item.social.instagram || '',
      resume: item.resume || '',
      portfolio: item.portfolio || '',
      isActive: item.isActive,
    });
    navigate(`/admin/team/${item._id}/edit`);
  };

  const deleteTeam = async (id: string) => {
    if (!confirm('Delete this team member?')) return;
    const res = await fetch(api(`/api/team/${id}`), { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setFlash('Team member deleted');
      await fetchTeam();
    }
  };

  const submitCourse = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      title: courseForm.title,
      image: courseForm.image,
      duration: courseForm.duration,
      instructor: {
        name: courseForm.instructorName,
        designation: courseForm.instructorDesignation,
        image: courseForm.instructorImage,
      },
      level: courseForm.level,
      syllabus: splitCsv(courseForm.syllabus),
      seats: Number(courseForm.seats || 0),
      hasCertificate: courseForm.hasCertificate,
      features: splitCsv(courseForm.features),
      price: courseForm.price,
      description: courseForm.description,
      isActive: courseForm.isActive,
    };

    const isEdit = Boolean(editingCourseId);
    const res = await fetch(api(isEdit ? `/api/courses/${editingCourseId}` : '/api/courses'), {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.success) {
      setFlash(isEdit ? 'Course updated' : 'Course created');
      setCourseForm(initialCourseForm);
      setEditingCourseId(null);
      await fetchCourses();
      backToList('courses');
    } else {
      setFlash(data.message || 'Unable to save course');
    }
  };

  const editCourse = (item: CourseItem) => {
    setEditingCourseId(item._id);
    setCourseForm({
      title: item.title,
      image: item.image,
      duration: item.duration,
      instructorName: item.instructor.name,
      instructorDesignation: item.instructor.designation,
      instructorImage: item.instructor.image,
      level: item.level,
      syllabus: item.syllabus.join(', '),
      seats: String(item.seats),
      hasCertificate: item.hasCertificate,
      features: item.features.join(', '),
      price: item.price,
      description: item.description,
      isActive: item.isActive,
    });
    navigate(`/admin/courses/${item._id}/edit`);
  };

  const deleteCourse = async (id: string) => {
    if (!confirm('Delete this course?')) return;
    const res = await fetch(api(`/api/courses/${id}`), { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setFlash('Course deleted');
      await fetchCourses();
    }
  };

  useEffect(() => {
    if (!editorRouteState) return;

    if (editorRouteState.mode === 'new') {
      if (editorRouteState.tab === 'inquiries') {
        setEditingInquiryId(null);
        setInquiryForm(initialInquiryForm);
      }
      if (editorRouteState.tab === 'services') {
        setEditingServiceId(null);
        setServiceForm(initialServiceForm);
      }
      if (editorRouteState.tab === 'projects') {
        setEditingProjectId(null);
        setProjectForm(initialProjectForm);
      }
      if (editorRouteState.tab === 'team') {
        setEditingTeamId(null);
        setTeamForm(initialTeamForm);
      }
      if (editorRouteState.tab === 'courses') {
        setEditingCourseId(null);
        setCourseForm(initialCourseForm);
      }
      return;
    }

    if (editorRouteState.tab === 'inquiries') {
      const item = inquiries.find((entry) => entry._id === editorRouteState.id);
      if (item) {
        setEditingInquiryId(item._id);
        setInquiryForm({
          name: item.name,
          email: item.email,
          service: item.service,
          message: item.message,
          status: item.status,
        });
      }
    }
    if (editorRouteState.tab === 'services') {
      const item = services.find((entry) => entry._id === editorRouteState.id);
      if (item) {
        setEditingServiceId(item._id);
        setServiceForm({
          title: item.title,
          category: item.category,
          description: item.description,
          benefits: item.benefits.join(', '),
          image: item.image,
          isActive: item.isActive,
        });
      }
    }
    if (editorRouteState.tab === 'projects') {
      const item = projects.find((entry) => entry._id === editorRouteState.id);
      if (item) {
        setEditingProjectId(item._id);
        setProjectForm({
          title: item.title,
          category: item.category,
          shortDescription: item.shortDescription,
          description: item.description,
          features: item.features.join(', '),
          gallery: item.gallery.join(', '),
          frontend: item.techStack.frontend.join(', '),
          backend: item.techStack.backend.join(', '),
          database: item.techStack.database.join(', '),
          deployment: item.techStack.deployment.join(', '),
          other: item.techStack.other.join(', '),
          githubUrl: item.githubUrl || '',
          liveUrl: item.liveUrl || '',
          completionDate: item.completionDate ? item.completionDate.slice(0, 10) : '',
          isPublished: item.isPublished,
        });
      }
    }
    if (editorRouteState.tab === 'team') {
      const item = team.find((entry) => entry._id === editorRouteState.id);
      if (item) {
        setEditingTeamId(item._id);
        setTeamForm({
          name: item.name,
          position: item.position,
          role: item.role,
          experience: item.experience,
          rating: String(item.rating ?? 5),
          testimonial: item.testimonial,
          image: item.image,
          intro: item.intro,
          education: item.education,
          projects: item.projects,
          achievements: item.achievements,
          skills: item.skills.join(', '),
          certificates: item.certificates.join(', '),
          email: item.social.email || '',
          linkedin: item.social.linkedin || '',
          github: item.social.github || '',
          website: item.social.website || '',
          whatsapp: item.social.whatsapp || '',
          tiktok: item.social.tiktok || '',
          facebook: item.social.facebook || '',
          instagram: item.social.instagram || '',
          resume: item.resume || '',
          portfolio: item.portfolio || '',
          isActive: item.isActive,
        });
      }
    }
    if (editorRouteState.tab === 'courses') {
      const item = courses.find((entry) => entry._id === editorRouteState.id);
      if (item) {
        setEditingCourseId(item._id);
        setCourseForm({
          title: item.title,
          image: item.image,
          duration: item.duration,
          instructorName: item.instructor.name,
          instructorDesignation: item.instructor.designation,
          instructorImage: item.instructor.image,
          level: item.level,
          syllabus: item.syllabus.join(', '),
          seats: String(item.seats),
          hasCertificate: item.hasCertificate,
          features: item.features.join(', '),
          price: item.price,
          description: item.description,
          isActive: item.isActive,
        });
      }
    }
  }, [editorRouteState, inquiries, services, projects, team, courses]);

  const isInquiryEditor = editorRouteState?.tab === 'inquiries';
  const isServiceEditor = editorRouteState?.tab === 'services';
  const isProjectEditor = editorRouteState?.tab === 'projects';
  const isTeamEditor = editorRouteState?.tab === 'team';
  const isCourseEditor = editorRouteState?.tab === 'courses';

  const actionButtonClass =
    adminTheme === 'light'
      ? 'px-3 py-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-sm hover:bg-slate-200 transition'
      : 'px-3 py-2 rounded-lg bg-white/10 text-sm text-white hover:bg-white/20 transition';

  const dangerButtonClass =
    adminTheme === 'light'
      ? 'px-3 py-2 rounded-lg bg-red-50 text-red-600 border border-red-100 text-sm flex items-center gap-1 hover:bg-red-100 transition'
      : 'px-3 py-2 rounded-lg bg-red-500/20 text-red-200 text-sm flex items-center gap-1 hover:bg-red-500/30 transition';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary text-white flex items-center justify-center">
        Loading admin panel...
      </div>
    );
  }

  return (
    <div
      className="admin-scope admin-page min-h-screen bg-primary text-slate-100 transition-colors duration-300"
      data-admin-theme={adminTheme}
    >
      <div className="max-w-360 mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="admin-sidebar w-full lg:w-72 bg-secondary/95 border border-white/15 rounded-3xl p-4 shadow-xl">
            <div className="px-2 py-3 border-b border-white/10 mb-4">
              <h1 className="text-xl font-bold font-display text-white">Admin Panel</h1>
              <p className="text-xs text-slate-300 mt-1">Management Console</p>
            </div>
            <nav className="space-y-2">
              {tabItems.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateToTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-left ${
                      active
                        ? 'bg-accent text-primary font-bold'
                        : 'hover:bg-white/10 text-slate-200'
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
            <button
              onClick={() => setAdminTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              className="mt-4 w-full flex items-center justify-center gap-2 border border-white/15 rounded-xl py-2.5 hover:bg-white/10 transition text-slate-100"
            >
              {adminTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              {adminTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button
              onClick={handleLogout}
              className="mt-6 w-full flex items-center justify-center gap-2 border border-white/15 rounded-xl py-2.5 hover:bg-white/10 transition text-slate-100"
            >
              <LogOut size={16} />
              Logout
            </button>
          </aside>

          <main className="admin-main flex-1 bg-secondary/95 border border-white/15 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl">
            {message && (
              <div className="mb-5 rounded-xl bg-accent/15 border border-accent/30 text-accent px-4 py-2 text-sm">
                {message}
              </div>
            )}

            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display mb-6">Overview</h2>
                <div className="mb-6 bg-primary border border-white/10 rounded-2xl p-4 sm:p-5">
                  <p className="text-sm text-gray-300 mb-3">
                    Use GitHub raw image links in admin forms. Existing site data (services,
                    projects, team, and courses) can be synced into MongoDB with one click.
                  </p>
                  <button
                    onClick={() => void seedExistingContent()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-primary font-bold"
                  >
                    <Database size={16} />
                    Sync Current Site Data to Database
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {[
                    ['Total Inquiries', stats.inquiries],
                    ['Pending Inquiries', stats.pendingInquiries],
                    ['Services', stats.services],
                    ['Projects', stats.projects],
                    ['Team Members', stats.team],
                    ['Courses', stats.courses],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-primary border border-white/10 rounded-2xl p-4">
                      <p className="text-sm text-slate-300">{label}</p>
                      <p className="text-2xl font-bold mt-1 text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-bold font-display text-white">
                    {isInquiryEditor ? 'Inquiry Editor' : 'Inquiries'}
                  </h2>
                  {!isInquiryEditor && (
                    <button
                      onClick={() => openCreatePage('inquiries')}
                      className="px-4 py-2 rounded-xl bg-accent text-primary font-bold"
                    >
                      Add Inquiry
                    </button>
                  )}
                </div>

                {isInquiryEditor ? (
                  <div className="space-y-4">
                    <button
                      onClick={() => backToList('inquiries')}
                      className="inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white"
                    >
                      <ArrowLeft size={14} /> Back to Inquiries
                    </button>
                    <form onSubmit={submitInquiry} className="grid md:grid-cols-2 gap-4">
                      <input
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Full name"
                        className="px-4 py-3 rounded-xl bg-primary border border-white/10"
                        required
                      />
                      <input
                        type="email"
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm((p) => ({ ...p, email: e.target.value }))}
                        placeholder="Email"
                        className="px-4 py-3 rounded-xl bg-primary border border-white/10"
                        required
                      />
                      <input
                        value={inquiryForm.service}
                        onChange={(e) =>
                          setInquiryForm((p) => ({ ...p, service: e.target.value }))
                        }
                        placeholder="Service / Course"
                        className="px-4 py-3 rounded-xl bg-primary border border-white/10 md:col-span-2"
                        required
                      />
                      <textarea
                        value={inquiryForm.message}
                        onChange={(e) =>
                          setInquiryForm((p) => ({ ...p, message: e.target.value }))
                        }
                        placeholder="Message"
                        className="px-4 py-3 rounded-xl bg-primary border border-white/10 md:col-span-2"
                        rows={4}
                        required
                      />
                      <select
                        value={inquiryForm.status}
                        onChange={(e) =>
                          setInquiryForm((p) => ({
                            ...p,
                            status: e.target.value as Inquiry['status'],
                          }))
                        }
                        className="px-4 py-3 rounded-xl bg-primary border border-white/10"
                      >
                        <option value="new">new</option>
                        <option value="in_progress">in_progress</option>
                        <option value="resolved">resolved</option>
                        <option value="spam">spam</option>
                      </select>
                      <div className="md:col-span-2 flex gap-3">
                        <button className="px-5 py-2.5 bg-accent text-primary font-bold rounded-xl">
                          {editingInquiryId ? 'Update Inquiry' : 'Create Inquiry'}
                        </button>
                        <button
                          type="button"
                          onClick={() => backToList('inquiries')}
                          className="px-5 py-2.5 border border-white/15 rounded-xl"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map((inq) => (
                      <div key={inq._id} className="bg-primary border border-white/10 rounded-2xl p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <p className="font-semibold">{inq.name}</p>
                            <p className="text-sm text-gray-400">{inq.email}</p>
                          </div>
                          <div className="flex gap-2">
                            <select
                              value={inq.status}
                              onChange={(e) =>
                                void updateInquiryStatus(
                                  inq._id,
                                  e.target.value as Inquiry['status']
                                )
                              }
                              className="bg-secondary border border-white/10 rounded-lg px-3 py-2 text-sm"
                            >
                              <option value="new">new</option>
                              <option value="in_progress">in_progress</option>
                              <option value="resolved">resolved</option>
                              <option value="spam">spam</option>
                            </select>
                            <button onClick={() => editInquiry(inq)} className={actionButtonClass}>
                              Edit
                            </button>
                            <button onClick={() => void deleteInquiry(inq._id)} className={dangerButtonClass}>
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-accent mt-3">{inq.service}</p>
                        <p className="text-sm text-gray-300 mt-1">{inq.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'services' && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-bold font-display text-white">
                    {isServiceEditor ? 'Service Editor' : 'Services Management'}
                  </h2>
                  {!isServiceEditor && (
                    <button
                      onClick={() => openCreatePage('services')}
                      className="px-4 py-2 rounded-xl bg-accent text-primary font-bold"
                    >
                      Add Service
                    </button>
                  )}
                </div>
                {isServiceEditor ? (
                  <div className="space-y-4">
                    <button onClick={() => backToList('services')} className="inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white">
                      <ArrowLeft size={14} /> Back to Services
                    </button>
                    <form onSubmit={submitService} className="grid md:grid-cols-2 gap-4 mb-2">
                      <input value={serviceForm.title} onChange={(e) => setServiceForm((p) => ({ ...p, title: e.target.value }))} placeholder="Service title" className="px-4 py-3 rounded-xl bg-primary border border-white/10" required />
                      <input value={serviceForm.category} onChange={(e) => setServiceForm((p) => ({ ...p, category: e.target.value }))} placeholder="Category" className="px-4 py-3 rounded-xl bg-primary border border-white/10" required />
                      <input value={serviceForm.image} onChange={(e) => setServiceForm((p) => ({ ...p, image: e.target.value }))} placeholder="GitHub raw image URL (https://raw.githubusercontent.com/...)" className="px-4 py-3 rounded-xl bg-primary border border-white/10 md:col-span-2" required />
                      <textarea value={serviceForm.description} onChange={(e) => setServiceForm((p) => ({ ...p, description: e.target.value }))} placeholder="Description" className="px-4 py-3 rounded-xl bg-primary border border-white/10 md:col-span-2" rows={3} required />
                      <input value={serviceForm.benefits} onChange={(e) => setServiceForm((p) => ({ ...p, benefits: e.target.value }))} placeholder="Benefits (comma separated)" className="px-4 py-3 rounded-xl bg-primary border border-white/10 md:col-span-2" required />
                      <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={serviceForm.isActive} onChange={(e) => setServiceForm((p) => ({ ...p, isActive: e.target.checked }))} />Active</label>
                      <div className="md:col-span-2 flex gap-3">
                        <button className="px-5 py-2.5 bg-accent text-primary font-bold rounded-xl">{editingServiceId ? 'Update Service' : 'Create Service'}</button>
                        <button type="button" onClick={() => backToList('services')} className="px-5 py-2.5 border border-white/15 rounded-xl">Cancel</button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {services.map((item) => (
                      <div key={item._id} className="bg-primary border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-gray-400">{item.category}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => editService(item)} className={actionButtonClass}>Edit</button>
                          <button onClick={() => void deleteService(item._id)} className={dangerButtonClass}><Trash2 size={14} /> Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'projects' && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-bold font-display text-white">
                    {isProjectEditor ? 'Project Editor' : 'Projects Management'}
                  </h2>
                  {!isProjectEditor && (
                    <button onClick={() => openCreatePage('projects')} className="px-4 py-2 rounded-xl bg-accent text-primary font-bold">
                      Add Project
                    </button>
                  )}
                </div>
                {isProjectEditor && (
                  <button onClick={() => backToList('projects')} className="inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white mb-4">
                    <ArrowLeft size={14} /> Back to Projects
                  </button>
                )}
                {isProjectEditor && (
                <form onSubmit={submitProject} className="grid md:grid-cols-2 gap-4 mb-8">
                  <input
                    value={projectForm.title}
                    onChange={(e) => setProjectForm((p) => ({ ...p, title: e.target.value }))}
                    placeholder="Project title"
                    className="px-4 py-3 rounded-xl bg-primary border border-white/10"
                    required
                  />
                  <input
                    value={projectForm.category}
                    onChange={(e) => setProjectForm((p) => ({ ...p, category: e.target.value }))}
                    placeholder="Category"
                    className="px-4 py-3 rounded-xl bg-primary border border-white/10"
                    required
                  />
                  <input
                    value={projectForm.shortDescription}
                    onChange={(e) =>
                      setProjectForm((p) => ({ ...p, shortDescription: e.target.value }))
                    }
                    placeholder="Short description"
                    className="px-4 py-3 rounded-xl bg-primary border border-white/10 md:col-span-2"
                    required
                  />
                  <textarea
                    value={projectForm.description}
                    onChange={(e) =>
                      setProjectForm((p) => ({ ...p, description: e.target.value }))
                    }
                    placeholder="Full description"
                    className="px-4 py-3 rounded-xl bg-primary border border-white/10 md:col-span-2"
                    rows={3}
                    required
                  />
                  <input
                    value={projectForm.features}
                    onChange={(e) => setProjectForm((p) => ({ ...p, features: e.target.value }))}
                    placeholder="Features (comma separated)"
                    className="px-4 py-3 rounded-xl bg-primary border border-white/10 md:col-span-2"
                    required
                  />
                  <input
                    value={projectForm.gallery}
                    onChange={(e) => setProjectForm((p) => ({ ...p, gallery: e.target.value }))}
                    placeholder="GitHub raw image URLs (comma separated)"
                    className="px-4 py-3 rounded-xl bg-primary border border-white/10 md:col-span-2"
                    required
                  />
                  <input
                    value={projectForm.frontend}
                    onChange={(e) => setProjectForm((p) => ({ ...p, frontend: e.target.value }))}
                    placeholder="TechStack frontend (comma separated)"
                    className="px-4 py-3 rounded-xl bg-primary border border-white/10"
                    required
                  />
                  <input
                    value={projectForm.backend}
                    onChange={(e) => setProjectForm((p) => ({ ...p, backend: e.target.value }))}
                    placeholder="TechStack backend (comma separated)"
                    className="px-4 py-3 rounded-xl bg-primary border border-white/10"
                    required
                  />
                  <input
                    value={projectForm.database}
                    onChange={(e) => setProjectForm((p) => ({ ...p, database: e.target.value }))}
                    placeholder="TechStack database (comma separated)"
                    className="px-4 py-3 rounded-xl bg-primary border border-white/10"
                    required
                  />
                  <input
                    value={projectForm.deployment}
                    onChange={(e) =>
                      setProjectForm((p) => ({ ...p, deployment: e.target.value }))
                    }
                    placeholder="TechStack deployment (comma separated)"
                    className="px-4 py-3 rounded-xl bg-primary border border-white/10"
                    required
                  />
                  <input
                    value={projectForm.other}
                    onChange={(e) => setProjectForm((p) => ({ ...p, other: e.target.value }))}
                    placeholder="TechStack other (comma separated)"
                    className="px-4 py-3 rounded-xl bg-primary border border-white/10 md:col-span-2"
                    required
                  />
                  <input
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm((p) => ({ ...p, githubUrl: e.target.value }))}
                    placeholder="GitHub URL"
                    className="px-4 py-3 rounded-xl bg-primary border border-white/10"
                  />
                  <input
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm((p) => ({ ...p, liveUrl: e.target.value }))}
                    placeholder="Live URL"
                    className="px-4 py-3 rounded-xl bg-primary border border-white/10"
                  />
                  <input
                    type="date"
                    value={projectForm.completionDate}
                    onChange={(e) =>
                      setProjectForm((p) => ({ ...p, completionDate: e.target.value }))
                    }
                    className="px-4 py-3 rounded-xl bg-primary border border-white/10"
                  />
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={projectForm.isPublished}
                      onChange={(e) =>
                        setProjectForm((p) => ({ ...p, isPublished: e.target.checked }))
                      }
                    />
                    Published
                  </label>
                  <div className="md:col-span-2 flex gap-3">
                    <button className="px-5 py-2.5 bg-accent text-primary font-bold rounded-xl">
                      {editingProjectId ? 'Update Project' : 'Create Project'}
                    </button>
                    {editingProjectId && (
                      <button
                        type="button"
                        onClick={() => backToList('projects')}
                        className="px-5 py-2.5 border border-white/15 rounded-xl"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
                )}

                {!isProjectEditor && <div className="space-y-3">
                  {projects.map((item) => (
                    <div
                      key={item._id}
                      className="bg-primary border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-400">{item.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => editProject(item)}
                          className={actionButtonClass}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => void deleteProject(item._id)}
                          className={dangerButtonClass}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>}
              </div>
            )}

            {activeTab === 'team' && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-bold font-display text-white">
                    {isTeamEditor ? 'Team Member Editor' : 'Team Management'}
                  </h2>
                  {!isTeamEditor && (
                    <button onClick={() => openCreatePage('team')} className="px-4 py-2 rounded-xl bg-accent text-primary font-bold">
                      Add Team Member
                    </button>
                  )}
                </div>
                {isTeamEditor && (
                  <button onClick={() => backToList('team')} className="inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white mb-4">
                    <ArrowLeft size={14} /> Back to Team
                  </button>
                )}
                {isTeamEditor && (
                <form onSubmit={submitTeam} className="grid md:grid-cols-2 gap-4 mb-8">
                  <input value={teamForm.name} onChange={(e) => setTeamForm((p) => ({ ...p, name: e.target.value }))} placeholder="Full name" className="px-4 py-3 rounded-xl bg-primary border border-white/15" required />
                  <input value={teamForm.position} onChange={(e) => setTeamForm((p) => ({ ...p, position: e.target.value }))} placeholder="Position" className="px-4 py-3 rounded-xl bg-primary border border-white/15" required />
                  <input value={teamForm.role} onChange={(e) => setTeamForm((p) => ({ ...p, role: e.target.value }))} placeholder="Role/Title" className="px-4 py-3 rounded-xl bg-primary border border-white/15 md:col-span-2" required />
                  <input value={teamForm.image} onChange={(e) => setTeamForm((p) => ({ ...p, image: e.target.value }))} placeholder="Profile image URL (GitHub raw link)" className="px-4 py-3 rounded-xl bg-primary border border-white/15 md:col-span-2" required />
                  <input value={teamForm.experience} onChange={(e) => setTeamForm((p) => ({ ...p, experience: e.target.value }))} placeholder="Experience (e.g. 3+ Years)" className="px-4 py-3 rounded-xl bg-primary border border-white/15" required />
                  <input type="number" min={1} max={5} value={teamForm.rating} onChange={(e) => setTeamForm((p) => ({ ...p, rating: e.target.value }))} placeholder="Rating (1-5)" className="px-4 py-3 rounded-xl bg-primary border border-white/15" required />
                  <textarea value={teamForm.testimonial} onChange={(e) => setTeamForm((p) => ({ ...p, testimonial: e.target.value }))} placeholder="Testimonial" className="px-4 py-3 rounded-xl bg-primary border border-white/15 md:col-span-2" rows={2} required />
                  <textarea value={teamForm.intro} onChange={(e) => setTeamForm((p) => ({ ...p, intro: e.target.value }))} placeholder="Intro/Bio" className="px-4 py-3 rounded-xl bg-primary border border-white/15 md:col-span-2" rows={3} required />
                  <textarea value={teamForm.education} onChange={(e) => setTeamForm((p) => ({ ...p, education: e.target.value }))} placeholder="Education" className="px-4 py-3 rounded-xl bg-primary border border-white/15 md:col-span-2" rows={2} required />
                  <textarea value={teamForm.projects} onChange={(e) => setTeamForm((p) => ({ ...p, projects: e.target.value }))} placeholder="Projects summary" className="px-4 py-3 rounded-xl bg-primary border border-white/15 md:col-span-2" rows={2} required />
                  <textarea value={teamForm.achievements} onChange={(e) => setTeamForm((p) => ({ ...p, achievements: e.target.value }))} placeholder="Achievements" className="px-4 py-3 rounded-xl bg-primary border border-white/15 md:col-span-2" rows={2} required />
                  <input value={teamForm.skills} onChange={(e) => setTeamForm((p) => ({ ...p, skills: e.target.value }))} placeholder="Skills (comma separated)" className="px-4 py-3 rounded-xl bg-primary border border-white/15 md:col-span-2" required />
                  <input value={teamForm.certificates} onChange={(e) => setTeamForm((p) => ({ ...p, certificates: e.target.value }))} placeholder="Certificates (comma separated, optional)" className="px-4 py-3 rounded-xl bg-primary border border-white/15 md:col-span-2" />
                  <input value={teamForm.email} onChange={(e) => setTeamForm((p) => ({ ...p, email: e.target.value }))} placeholder="Email" className="px-4 py-3 rounded-xl bg-primary border border-white/15" />
                  <input value={teamForm.linkedin} onChange={(e) => setTeamForm((p) => ({ ...p, linkedin: e.target.value }))} placeholder="LinkedIn URL" className="px-4 py-3 rounded-xl bg-primary border border-white/15" />
                  <input value={teamForm.github} onChange={(e) => setTeamForm((p) => ({ ...p, github: e.target.value }))} placeholder="GitHub URL" className="px-4 py-3 rounded-xl bg-primary border border-white/15" />
                  <input value={teamForm.website} onChange={(e) => setTeamForm((p) => ({ ...p, website: e.target.value }))} placeholder="Website URL" className="px-4 py-3 rounded-xl bg-primary border border-white/15" />
                  <input value={teamForm.whatsapp} onChange={(e) => setTeamForm((p) => ({ ...p, whatsapp: e.target.value }))} placeholder="WhatsApp URL" className="px-4 py-3 rounded-xl bg-primary border border-white/15" />
                  <input value={teamForm.tiktok} onChange={(e) => setTeamForm((p) => ({ ...p, tiktok: e.target.value }))} placeholder="TikTok URL" className="px-4 py-3 rounded-xl bg-primary border border-white/15" />
                  <input value={teamForm.facebook} onChange={(e) => setTeamForm((p) => ({ ...p, facebook: e.target.value }))} placeholder="Facebook URL" className="px-4 py-3 rounded-xl bg-primary border border-white/15" />
                  <input value={teamForm.instagram} onChange={(e) => setTeamForm((p) => ({ ...p, instagram: e.target.value }))} placeholder="Instagram URL" className="px-4 py-3 rounded-xl bg-primary border border-white/15" />
                  <input value={teamForm.resume} onChange={(e) => setTeamForm((p) => ({ ...p, resume: e.target.value }))} placeholder="Resume URL or #" className="px-4 py-3 rounded-xl bg-primary border border-white/15" />
                  <input value={teamForm.portfolio} onChange={(e) => setTeamForm((p) => ({ ...p, portfolio: e.target.value }))} placeholder="Portfolio URL" className="px-4 py-3 rounded-xl bg-primary border border-white/15" />
                  <label className="inline-flex items-center gap-2 text-sm text-slate-200">
                    <input type="checkbox" checked={teamForm.isActive} onChange={(e) => setTeamForm((p) => ({ ...p, isActive: e.target.checked }))} />
                    Active
                  </label>
                  <div className="md:col-span-2 flex gap-3">
                    <button className="px-5 py-2.5 bg-accent text-primary font-bold rounded-xl">
                      {editingTeamId ? 'Update Team Member' : 'Create Team Member'}
                    </button>
                    <button type="button" onClick={() => backToList('team')} className="px-5 py-2.5 border border-white/20 rounded-xl">
                      Cancel
                    </button>
                  </div>
                </form>
                )}

                {!isTeamEditor && <div className="space-y-3">
                  {team.map((item) => (
                    <div key={item._id} className="bg-primary border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="text-sm text-slate-300">{item.position}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => editTeam(item)} className={actionButtonClass}>
                          Edit
                        </button>
                        <button onClick={() => void deleteTeam(item._id)} className={dangerButtonClass}>
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>}
              </div>
            )}

            {activeTab === 'courses' && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-bold font-display text-white">
                    {isCourseEditor ? 'Course Editor' : 'Courses Management'}
                  </h2>
                  {!isCourseEditor && (
                    <button onClick={() => openCreatePage('courses')} className="px-4 py-2 rounded-xl bg-accent text-primary font-bold">
                      Add Course
                    </button>
                  )}
                </div>
                {isCourseEditor && (
                  <button onClick={() => backToList('courses')} className="inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white mb-4">
                    <ArrowLeft size={14} /> Back to Courses
                  </button>
                )}
                {isCourseEditor && (
                <form onSubmit={submitCourse} className="grid md:grid-cols-2 gap-4 mb-8">
                  <input value={courseForm.title} onChange={(e) => setCourseForm((p) => ({ ...p, title: e.target.value }))} placeholder="Course title" className="px-4 py-3 rounded-xl bg-primary border border-white/15" required />
                  <input value={courseForm.duration} onChange={(e) => setCourseForm((p) => ({ ...p, duration: e.target.value }))} placeholder="Duration (e.g. 6 Weeks)" className="px-4 py-3 rounded-xl bg-primary border border-white/15" required />
                  <input value={courseForm.image} onChange={(e) => setCourseForm((p) => ({ ...p, image: e.target.value }))} placeholder="Course image URL (GitHub raw link)" className="px-4 py-3 rounded-xl bg-primary border border-white/15 md:col-span-2" required />
                  <input value={courseForm.instructorName} onChange={(e) => setCourseForm((p) => ({ ...p, instructorName: e.target.value }))} placeholder="Instructor name" className="px-4 py-3 rounded-xl bg-primary border border-white/15" required />
                  <input value={courseForm.instructorDesignation} onChange={(e) => setCourseForm((p) => ({ ...p, instructorDesignation: e.target.value }))} placeholder="Instructor designation" className="px-4 py-3 rounded-xl bg-primary border border-white/15" required />
                  <input value={courseForm.instructorImage} onChange={(e) => setCourseForm((p) => ({ ...p, instructorImage: e.target.value }))} placeholder="Instructor image URL" className="px-4 py-3 rounded-xl bg-primary border border-white/15 md:col-span-2" required />
                  <select value={courseForm.level} onChange={(e) => setCourseForm((p) => ({ ...p, level: e.target.value as CourseItem['level'] }))} className="px-4 py-3 rounded-xl bg-primary border border-white/15" required>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Professional">Professional</option>
                  </select>
                  <input type="number" min={1} value={courseForm.seats} onChange={(e) => setCourseForm((p) => ({ ...p, seats: e.target.value }))} placeholder="Seats" className="px-4 py-3 rounded-xl bg-primary border border-white/15" required />
                  <input value={courseForm.price} onChange={(e) => setCourseForm((p) => ({ ...p, price: e.target.value }))} placeholder="Price (e.g. $300)" className="px-4 py-3 rounded-xl bg-primary border border-white/15" required />
                  <label className="inline-flex items-center gap-2 text-sm text-slate-200">
                    <input type="checkbox" checked={courseForm.hasCertificate} onChange={(e) => setCourseForm((p) => ({ ...p, hasCertificate: e.target.checked }))} />
                    Has Certificate
                  </label>
                  <input value={courseForm.syllabus} onChange={(e) => setCourseForm((p) => ({ ...p, syllabus: e.target.value }))} placeholder="Syllabus (comma separated)" className="px-4 py-3 rounded-xl bg-primary border border-white/15 md:col-span-2" required />
                  <input value={courseForm.features} onChange={(e) => setCourseForm((p) => ({ ...p, features: e.target.value }))} placeholder="Features (comma separated)" className="px-4 py-3 rounded-xl bg-primary border border-white/15 md:col-span-2" required />
                  <textarea value={courseForm.description} onChange={(e) => setCourseForm((p) => ({ ...p, description: e.target.value }))} placeholder="Description" className="px-4 py-3 rounded-xl bg-primary border border-white/15 md:col-span-2" rows={3} required />
                  <label className="inline-flex items-center gap-2 text-sm text-slate-200">
                    <input type="checkbox" checked={courseForm.isActive} onChange={(e) => setCourseForm((p) => ({ ...p, isActive: e.target.checked }))} />
                    Active
                  </label>
                  <div className="md:col-span-2 flex gap-3">
                    <button className="px-5 py-2.5 bg-accent text-primary font-bold rounded-xl">
                      {editingCourseId ? 'Update Course' : 'Create Course'}
                    </button>
                    <button type="button" onClick={() => backToList('courses')} className="px-5 py-2.5 border border-white/20 rounded-xl">
                      Cancel
                    </button>
                  </div>
                </form>
                )}

                {!isCourseEditor && <div className="space-y-3">
                  {courses.map((item) => (
                    <div key={item._id} className="bg-primary border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="text-sm text-slate-300">{item.level} · {item.duration}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => editCourse(item)} className={actionButtonClass}>
                          Edit
                        </button>
                        <button onClick={() => void deleteCourse(item._id)} className={dangerButtonClass}>
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>}
              </div>
            )}

            {activeTab === 'site' && (
              <div>
                <h2 className="text-2xl font-bold font-display mb-5">Site Settings</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    value={seoData.siteTitle}
                    onChange={(e) => setSeoData((p) => ({ ...p, siteTitle: e.target.value }))}
                    placeholder="Site title"
                    className="px-4 py-3 rounded-xl bg-primary border border-white/10 md:col-span-2"
                  />
                  <textarea
                    value={seoData.metaDescription}
                    onChange={(e) =>
                      setSeoData((p) => ({ ...p, metaDescription: e.target.value }))
                    }
                    placeholder="Meta description"
                    className="px-4 py-3 rounded-xl bg-primary border border-white/10 md:col-span-2"
                    rows={3}
                  />
                  <input
                    value={seoData.metaKeywords}
                    onChange={(e) =>
                      setSeoData((p) => ({ ...p, metaKeywords: e.target.value }))
                    }
                    placeholder="Meta keywords"
                    className="px-4 py-3 rounded-xl bg-primary border border-white/10 md:col-span-2"
                  />
                  <textarea
                    value={footerData.description}
                    onChange={(e) =>
                      setFooterData((p) => ({ ...p, description: e.target.value }))
                    }
                    placeholder="Footer description"
                    className="px-4 py-3 rounded-xl bg-primary border border-white/10 md:col-span-2"
                    rows={3}
                  />
                  <button
                    onClick={() => setFlash('Site settings saved')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-accent text-primary font-bold rounded-xl w-fit"
                  >
                    <Save size={16} />
                    Save
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'blog' && <BlogAdminPanel />}
          </main>
        </div>
      </div>
    </div>
  );
}
