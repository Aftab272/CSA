const fs = require('fs');
const path = "d:\\CSA\\creative-stack-agency\\frontend\\src\\pages\\AdminDashboardPage.tsx";
let code = fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

if (!code.includes("import { supabase }")) {
  code = code.replace("import { buildContentSeedPayload } from '../utils/contentSeed';", "import { buildContentSeedPayload } from '../utils/contentSeed';\nimport { supabase } from '../lib/supabase';");
}

const apiLogicRegex = /  const apiBase =[\s\S]*?const api = \(path: string\) => \(apiBase \? `\$\{apiBase\.replace\(\/\\\\\/\\$\/, ''\)\}\$\{path\}` : path\);/;

const newStates = `  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setIsAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: authPassword,
    });
    if (error) {
      setAuthError(error.message);
    }
  };`;

code = code.replace(apiLogicRegex, newStates);

const loginScreen = `  if (isAuthLoading) {
    return <div className="min-h-screen bg-primary flex items-center justify-center text-white">Loading Admin...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-secondary/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="text-accent w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white font-display">Admin Portal</h2>
            <p className="text-sm text-gray-400 mt-2">Sign in to manage Creative Stack Agency</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                value={authEmail}
                onChange={e => setAuthEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full bg-primary/50 border border-white/10 text-white rounded-xl p-4 focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <input
                type="password"
                value={authPassword}
                onChange={e => setAuthPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full bg-primary/50 border border-white/10 text-white rounded-xl p-4 focus:outline-none focus:border-accent"
              />
            </div>
            {authError && <p className="text-rose-400 text-sm font-medium">{authError}</p>}
            <button
              type="submit"
              className="w-full bg-accent text-primary font-bold uppercase tracking-wider py-4 rounded-xl hover:opacity-90 transition"
            >
              Secure Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div
      className="admin-scope admin-page min-h-screen bg-primary text-slate-100 transition-colors duration-300 relative overflow-hidden"
      data-admin-theme={adminTheme}
    >`;

const initialReturnStr = `  return (
    <div
      className="admin-scope admin-page min-h-screen bg-primary text-slate-100 transition-colors duration-300 relative overflow-hidden"
      data-admin-theme={adminTheme}
    >`;

code = code.replace(initialReturnStr, loginScreen);

const oldFunctionsStartIndex = code.indexOf('  const fetchInquiries = async () => {');
const markerIndex = code.indexOf('    if (!editorRouteState) return;');
const oldFunctionsEndIndex = code.lastIndexOf('  useEffect(() => {', markerIndex);

const newFunctions = `  const fetchInquiries = async () => {
    const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
    if (data && !error) {
      setInquiries(data.map(item => ({
        ...item,
        _id: item.id
      })) as Inquiry[]);
    }
  };

  const fetchServices = async () => {
    const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: false });
    if (data && !error) {
      setServices(data.map(item => ({
        ...item,
        _id: item.id,
        isActive: item.is_active
      })) as ServiceItem[]);
    }
  };

  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data && !error) {
      setProjects(data.map(item => ({
        ...item,
        _id: item.id,
        shortDescription: item.short_description,
        techStack: item.tech_stack,
        githubUrl: item.github_url,
        liveUrl: item.live_url,
        completionDate: item.completion_date,
        isPublished: item.is_published
      })) as ProjectItem[]);
    }
  };

  const fetchTeam = async () => {
    const { data, error } = await supabase.from('team_members').select('*').order('created_at', { ascending: false });
    if (data && !error) {
      setTeam(data.map(item => ({
        ...item,
        _id: item.id,
        isActive: item.is_active
      })) as TeamItem[]);
    }
  };

  const fetchCourses = async () => {
    const { data, error } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
    if (data && !error) {
      setCourses(data.map(item => ({
        ...item,
        _id: item.id,
        hasCertificate: item.has_certificate,
        isActive: item.is_active
      })) as CourseItem[]);
    }
  };

  const seedExistingContent = async () => {
    setFlash('Seeding is not supported in the Supabase integration.');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    navigate('/');
  };

  const updateInquiryStatus = async (id: string, status: Inquiry['status']) => {
    const { error } = await supabase.from('inquiries').update({ status }).eq('id', id);
    if (!error) {
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
    let error;
    if (isEdit) {
      const res = await supabase.from('inquiries').update(payload).eq('id', editingInquiryId);
      error = res.error;
    } else {
      const res = await supabase.from('inquiries').insert(payload);
      error = res.error;
    }
    
    if (!error) {
      setFlash(isEdit ? 'Inquiry updated' : 'Inquiry created');
      setInquiryForm(initialInquiryForm);
      setEditingInquiryId(null);
      await fetchInquiries();
      backToList('inquiries');
    } else {
      setFlash(error?.message || 'Unable to save inquiry');
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
    navigate(\`/admin/inquiries/\${item._id}/edit\`);
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (!error) {
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
      is_active: serviceForm.isActive,
    };

    const isEdit = Boolean(editingServiceId);
    let error;
    if (isEdit) {
      const res = await supabase.from('services').update(payload).eq('id', editingServiceId);
      error = res.error;
    } else {
      const res = await supabase.from('services').insert(payload);
      error = res.error;
    }
    
    if (!error) {
      setFlash(isEdit ? 'Service updated' : 'Service created');
      setServiceForm(initialServiceForm);
      setEditingServiceId(null);
      await fetchServices();
      backToList('services');
    } else {
      setFlash(error?.message || 'Unable to save service');
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
    navigate(\`/admin/services/\${item._id}/edit\`);
  };

  const deleteService = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (!error) {
      setFlash('Service deleted');
      await fetchServices();
    }
  };

  const submitProject = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      title: projectForm.title,
      category: projectForm.category,
      short_description: projectForm.shortDescription,
      description: projectForm.description,
      features: splitCsv(projectForm.features),
      gallery: splitCsv(projectForm.gallery),
      tech_stack: {
        frontend: splitCsv(projectForm.frontend),
        backend: splitCsv(projectForm.backend),
        database: splitCsv(projectForm.database),
        deployment: splitCsv(projectForm.deployment),
        other: splitCsv(projectForm.other),
      },
      github_url: projectForm.githubUrl || null,
      live_url: projectForm.liveUrl || null,
      completion_date: projectForm.completionDate || null,
      is_published: projectForm.isPublished,
    };

    const isEdit = Boolean(editingProjectId);
    let error;
    if (isEdit) {
      const res = await supabase.from('projects').update(payload).eq('id', editingProjectId);
      error = res.error;
    } else {
      const res = await supabase.from('projects').insert(payload);
      error = res.error;
    }
    
    if (!error) {
      setFlash(isEdit ? 'Project updated' : 'Project created');
      setProjectForm(initialProjectForm);
      setEditingProjectId(null);
      await fetchProjects();
      backToList('projects');
    } else {
      setFlash(error?.message || 'Unable to save project');
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
    navigate(\`/admin/projects/\${item._id}/edit\`);
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) {
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
      resume: teamForm.resume || null,
      portfolio: teamForm.portfolio || null,
      is_active: teamForm.isActive,
    };

    const isEdit = Boolean(editingTeamId);
    let error;
    if (isEdit) {
      const res = await supabase.from('team_members').update(payload).eq('id', editingTeamId);
      error = res.error;
    } else {
      const res = await supabase.from('team_members').insert(payload);
      error = res.error;
    }
    
    if (!error) {
      setFlash(isEdit ? 'Team member updated' : 'Team member created');
      setTeamForm(initialTeamForm);
      setEditingTeamId(null);
      await fetchTeam();
      backToList('team');
    } else {
      setFlash(error?.message || 'Unable to save team member');
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
    navigate(\`/admin/team/\${item._id}/edit\`);
  };

  const deleteTeam = async (id: string) => {
    if (!confirm('Delete this team member?')) return;
    const { error } = await supabase.from('team_members').delete().eq('id', id);
    if (!error) {
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
      has_certificate: courseForm.hasCertificate,
      features: splitCsv(courseForm.features),
      price: courseForm.price,
      description: courseForm.description,
      is_active: courseForm.isActive,
    };

    const isEdit = Boolean(editingCourseId);
    let error;
    if (isEdit) {
      const res = await supabase.from('courses').update(payload).eq('id', editingCourseId);
      error = res.error;
    } else {
      const res = await supabase.from('courses').insert(payload);
      error = res.error;
    }

    if (!error) {
      setFlash(isEdit ? 'Course updated' : 'Course created');
      setCourseForm(initialCourseForm);
      setEditingCourseId(null);
      await fetchCourses();
      backToList('courses');
    } else {
      setFlash(error?.message || 'Unable to save course');
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
    navigate(\`/admin/courses/\${item._id}/edit\`);
  };

  const deleteCourse = async (id: string) => {
    if (!confirm('Delete this course?')) return;
    const { error } = await supabase.from('courses').delete().eq('id', id);
    if (!error) {
      setFlash('Course deleted');
      await fetchCourses();
    }
  };
`;

if (oldFunctionsStartIndex !== -1 && oldFunctionsEndIndex !== -1) {
  code = code.substring(0, oldFunctionsStartIndex) + newFunctions + "\n" + code.substring(oldFunctionsEndIndex);
  fs.writeFileSync(path, code);
  console.log("Successfully replaced API functions with Supabase queries and added Auth UI!");
} else {
  console.error("Could not find function bounds! " + oldFunctionsStartIndex + " " + oldFunctionsEndIndex);
}
