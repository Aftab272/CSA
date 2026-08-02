import founderImage from '../assets/images/Founder.jpeg';
import coFounderImage from '../assets/images/CO-Founder1.jpeg';
import ayeshaImage from '../assets/images/Ayesha Aslam.jpeg';
import samiImage from '../assets/images/M SamiUllah.jpeg';
import hasnainImage from '../assets/images/M Hasnain.png';
import shumailaImage from '../assets/images/Shumaila.jpeg';
import nomanImage from '../assets/images/M Noman.jpeg';
import fiazImage from '../assets/images/M Fiaz Ahmed.png';
import khalilImage from '../assets/images/Khalil.jpeg';
import iqraImage from '../assets/images/Iqra-Graphics.jpeg';
import ahmedImage from '../assets/images/Ahmed.jpeg';
import aqsaImage from '../assets/images/Aqsa.jpeg';

export type TeamMember = {
  id: number;
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
};

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Muhammad Aftab Akram',
    position: 'Founder & MERN Stack Developer',
    role: 'MERN Stack Developer | Graphic Designer | YouTube Automation Expert',
    experience: '3+ Years',
    rating: 5,
    testimonial: 'My mission is to create modern, scalable, and impactful digital solutions while continuously improving my skills in software engineering, graphic design, and emerging technologies.',
    image: founderImage,
    intro: 'Hi, I\'m Muhammad Aftab Akram, a passionate MERN Stack Developer and Graphic Designer pursuing a BS in Computer Science (Software Engineering) at COMSATS University Islamabad. I specialize in web development, graphic designing, branding, and YouTube automation.',
    education: 'BS Computer Science (Software Engineering) Student – COMSATS University Islamabad (5th Semester)',
    projects: 'Projects include: web-development-project-ideas.vercel.app',
    achievements: 'Founder & Owner – Creative Stack Agency. Team Member – Team4Stack.',
    skills: ['React.js', 'Next.js', 'Node.js', 'MongoDB', 'Graphic Designing', 'UI/UX Design', 'YouTube Automation', 'SEO Services'],
    certificates: ['AWS Certified Solutions Architect', 'Google Cloud Professional Cloud Developer'],
    social: {
      email: 'ranaaftabakram982@gmail.com',
      linkedin: 'https://www.linkedin.com/in/aftab-akram-3a297b407?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      github: 'https://github.com/',
      website: 'https://web-development-project-ideas.vercel.app',
      whatsapp: 'https://wa.me/923027434569',
      tiktok: 'https://www.tiktok.com/@creativestackagency?_r=1&_t=ZS-981fGZhdZWn',
      facebook: 'https://www.facebook.com/share/1Ef1cWSsJ4/',
      instagram: 'https://www.instagram.com/creativestackagency?utm_source=qr&igsh=N2JkMnVvc2hvYmly'
    },
    resume: '#',
    portfolio: 'https://web-development-project-ideas.vercel.app'
  },
  {
    id: 2,
    name: 'Maryam Nawaz',
    position: 'Co-Founder & Full Stack Developer',
    role: 'Full Stack Developer | Co-Founder',
    experience: '3+ Years',
    rating: 5,
    testimonial: 'Every successful digital product starts with understanding the client\'s vision. My goal is to build secure, scalable, and high-performance solutions.',
    image: coFounderImage,
    intro: 'A passionate Full Stack Developer and Co-Founder. Specializes in MERN stack development, modern UI/UX architecture, team management, and client handling.',
    education: 'Bachelor of Science in Computer Science (BS CS) – University of Okara',
    projects: 'Projects include: PrimeEstate - a modern real estate web application developed using a full-stack JavaScript architecture.',
    achievements: 'Co-Founder of Creative Stack Agency. Expert in Team and Social Media Management.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Git & GitHub'],
    certificates: [],
    social: {
      email: 'maryamnazaw7780@gmail.com',
      linkedin: 'https://www.linkedin.com/in/maryam-nawaz-47643b404',
      github: 'https://github.com/maryamnawazdev7780-has',
      whatsapp: 'https://wa.me/923047556084',
      tiktok: 'https://www.tiktok.com/@mn711395',
      facebook: 'https://www.facebook.com/share/17bXtMmeHN/',
      website: 'https://maryamdev-three.vercel.app/'
    },
    resume: '#',
    portfolio: 'https://maryamdev-three.vercel.app/'
  },
  {
    id: 3,
    name: 'Ayesha Aslam',
    position: 'Full Stack & WordPress Developer',
    role: 'Full Stack Developer | WordPress Developer | UI/UX Designer',
    experience: '1+ Years',
    rating: 5,
    testimonial: 'Creating visually appealing, user-friendly, and highly scalable web applications.',
    image: ayeshaImage,
    intro: 'Full Stack and WordPress Developer at Creative Stack Agency. She specializes in developing responsive, modern, and scalable web applications along with professional WordPress websites.',
    education: 'Bachelor of Arts (BA) – University of Okara',
    projects: 'Builds responsive web applications, modern UIs with React/Next.js, and complete WordPress sites.',
    achievements: 'Skilled in MERN Stack, WordPress, and Figma UI/UX Design with strong client dealing expertise.',
    skills: ['React.js', 'Next.js', 'Node.js', 'MongoDB', 'WordPress', 'Figma', 'UI/UX Design', 'Client Dealing'],
    certificates: [],
    social: {
      email: 'ayeshaweb16@gmail.com',
      github: 'https://github.com/Ayeshadeveloper14',
      linkedin: 'https://www.linkedin.com/in/ayesha-aslam-9971a9397/',
      facebook: 'https://web.facebook.com/profile.php?id=61579189760363',
      website: 'https://ayesha-portfoilo.vercel.app/',
      whatsapp: 'https://wa.me/923298102474'
    },
    resume: '#',
    portfolio: 'https://ayesha-portfoilo.vercel.app/'
  },
  {
    id: 4,
    name: 'Muhammad Sami Ullah Khan',
    position: 'Team Lead & Full Stack Developer',
    role: 'Team Lead | Client Manager | Founder Team4Stack',
    experience: '3+ Years',
    rating: 5,
    testimonial: 'Leadership is about taking care of those in your charge, managing project workflows, and delivering excellence to clients.',
    image: samiImage,
    intro: 'MERN Stack Developer, Founder of Team4Stack, and an experienced Team Lead & Client Manager. He combines technical expertise with leadership skills to deliver modern, scalable web applications.',
    education: 'BS Computer Science (5th Semester) – COMSATS University Islamabad',
    projects: 'Leads software development projects from planning to deployment. Portfolio: https://sami-protfolio-phi.vercel.app/',
    achievements: 'Founder of Team4Stack. Expert in software architecture, project management, and client communication.',
    skills: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Project Management', 'Agile Workflow'],
    certificates: [],
    social: {
      email: 'kk34samikhan@gmail.com',
      github: 'https://github.com/Sami3234',
      website: 'https://sami-protfolio-phi.vercel.app/',
      instagram: 'https://www.instagram.com/samikhandaha?igsh=ZHJocW1jeWh3dzB1',
      tiktok: 'https://www.tiktok.com/@m.sami_daha',
      whatsapp: 'https://wa.me/923405499734'
    },
    resume: '#',
    portfolio: 'https://sami-protfolio-phi.vercel.app/'
  },
  {
    id: 5,
    name: 'M. Hasnain',
    position: 'MERN Stack Developer & Frontend Lead',
    role: 'MERN Stack Developer | Frontend Lead',
    experience: '2+ Years',
    rating: 5,
    testimonial: 'A sharp eye for UI/UX ensures the product looks professional and integrates seamlessly with backend APIs.',
    image: hasnainImage,
    intro: 'Hasnain focuses on crafting responsive and modern user interfaces. He designs authentication flows, dashboards, and scalable components.',
    education: 'Bachelor of Science in Computer Science',
    projects: 'Projects: Stearns & Co (https://stearnsandco.com/). Specializes in authentication flows, interactive dashboards, and seamlessly integrating frontend components with backend APIs.',
    achievements: 'Frontend Lead at Creative Stack Agency ensuring pixel-perfect modern web development.',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'JavaScript', 'UI/UX Design', 'API Integration'],
    certificates: [],
    social: {
      github: 'https://github.com/hasnain17576'
    },
    resume: '#',
    portfolio: 'https://github.com/hasnain17576/Hasnain_portfolio'
  },
  {
    id: 6,
    name: 'Shumaila Zulfqar',
    position: 'WordPress Developer',
    role: 'WordPress Developer | Website Designer',
    experience: '1+ Years',
    rating: 5,
    testimonial: 'Developing modern, responsive, and user-friendly WordPress websites with excellent performance and user experience.',
    image: shumailaImage,
    intro: 'Shumaila specializes in responsive WordPress websites, business portfolios, WooCommerce stores, and landing pages.',
    education: 'Bachelor of Science in English (2nd Semester)',
    projects: 'Projects: Prime Estate (https://prime-estate-psi.vercel.app/), Agency123 (https://agency123.infinityfree.me/), Hamme (https://www.hamme.com.pk/), CyberMart (https://www.cybermart.pk). Builds business sites, portfolios, and WooCommerce stores with custom themes and plugins.',
    achievements: 'Expert in Elementor, website speed optimization, and CMS management.',
    skills: ['WordPress', 'Elementor', 'WooCommerce', 'HTML5', 'CSS3', 'SEO', 'Website Optimization'],
    certificates: [],
    social: {
      email: 'shumailazulfqar927@gmail.com',
      whatsapp: 'https://wa.me/923246987028',
      linkedin: 'https://www.linkedin.com/in/shumaila-zulfqar-531349397',
      facebook: 'https://www.facebook.com/share/1DDWpXx3wB/',
      website: 'https://project.lovestoblog.com/'
    },
    resume: '#',
    portfolio: 'https://project.lovestoblog.com/'
  },
  {
    id: 7,
    name: 'Muhammad Noman',
    position: 'Full Stack MERN Developer',
    role: 'Frontend & MERN Stack Developer',
    experience: '1+ Years',
    rating: 5,
    testimonial: 'Creating intuitive user interfaces and seamlessly integrating APIs to deliver complete, high-quality web solutions.',
    image: nomanImage,
    intro: 'Full Stack MERN Developer focusing on Frontend Development. He develops responsive, scalable, and user-friendly web applications using modern JavaScript technologies.',
    education: 'BS Artificial Intelligence (5th Semester) – The Islamia University of Bahawalpur',
    projects: 'Projects: Nomi Calculator (https://nomiicalculator.vercel.app/), Shopify Store (https://p15xyg-ie.myshopify.com/). Builds modern UIs with React/Next.js, backend APIs with Node/Express, and manages MongoDB databases.',
    achievements: 'Expert in MERN Stack Development, responsive web design, and API integration.',
    skills: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'API Integration'],
    certificates: [],
    social: {
      email: 'muhammadnomansaeed62@gmail.com',
      github: 'https://github.com/mrnomii',
      linkedin: 'https://www.linkedin.com/in/muhammad-noman-b15968362',
      facebook: 'https://www.facebook.com/share/18tQwcyRK3/',
      website: 'https://muhammad-noman-portfolio-five.vercel.app/'
    },
    resume: '#',
    portfolio: 'https://muhammad-noman-portfolio-five.vercel.app/'
  },
  {
    id: 8,
    name: 'Fiaz Ahmad',
    position: 'Full Stack Developer | Backend & QA',
    role: 'Backend, QA & Testing',
    experience: '2+ Years',
    rating: 5,
    testimonial: 'Backend stability and rigorous testing are the backbone of any successful and scalable application.',
    image: fiazImage,
    intro: 'Fiaz specializes in backend development, building secure APIs and managing databases. He takes responsibility for QA/testing and manages project finances, calculating costs and aligning with budgets.',
    education: 'Bachelor of Science in Computer Science',
    projects: 'Specializes in backend API development, QA automation, and financial tracking for projects.',
    achievements: 'Maintains zero critical bugs in production and effectively manages project budgets.',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'QA Automation', 'Testing', 'Project Finance'],
    certificates: [],
    social: {},
    resume: '#'
  },
  {
    id: 9,
    name: 'Khalil Ahmad',
    position: 'Business Website Expert',
    role: 'Business Website Expert',
    experience: '2+ Years',
    rating: 5,
    testimonial: 'A professional business website is the foundation of a strong online presence and digital growth.',
    image: khalilImage,
    intro: 'Business Website Expert specializing in designing and developing modern, responsive, and high-performing websites tailored to the unique needs of businesses, startups, and organizations.',
    education: 'Not Specified',
    projects: 'Develops professional business websites, corporate landing pages, and service-based websites with a focus on performance and SEO.',
    achievements: 'Expert in creating SEO-friendly structures, fast-loading performance, and business lead generation.',
    skills: ['Corporate Websites', 'Landing Pages', 'SEO Optimization', 'Performance Optimization', 'Responsive Design', 'Lead Generation'],
    certificates: [],
    social: {},
    resume: '#'
  },
  {
    id: 10,
    name: 'Iqra',
    position: 'Graphic Designer',
    role: 'Creative Team Member',
    experience: '1+ Years',
    rating: 5,
    testimonial: 'Graphic design is not just about making things look good; it is a powerful tool for communication and building brand identity.',
    image: iqraImage,
    intro: 'Iqra is a Graphic Designer at Creative Stack Agency, focusing on creating modern and engaging visual designs for businesses and brands. She designs social media creatives, logos, and marketing assets.',
    education: 'Government Girls College Bangla Gogera',
    projects: 'Specializes in: Social Media Post Design, Logo Design, Brand Identity Design, Flyer & Brochure Design, Banner & Web Graphics.',
    achievements: 'Contributes to team collaboration, creative idea generation, brand consistency, and marketing campaign support.',
    skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'Social Media Design', 'Branding', 'Logo Design', 'Print Design', 'Typography', 'Color Theory'],
    certificates: [],
    social: {
      whatsapp: 'https://wa.me/923176099755',
      facebook: 'https://www.facebook.com/share/1EdGRoP6oU/',
      linkedin: 'https://www.linkedin.com/in/rai-ali-ahmed-b928a83b7'
    },
    resume: '#'
  },
  {
    id: 11,
    name: 'Ahmad Rafique',
    position: 'Shopify Developer & AI Specialist',
    role: 'Shopify Developer | AI Automation Specialist',
    experience: '1+ Years',
    rating: 5,
    testimonial: 'Helping businesses automate repetitive tasks through AI-powered workflows and scalable eCommerce solutions.',
    image: ahmedImage,
    intro: 'Specializes in building, customizing, and managing Shopify stores while creating AI workflows to automate business processes.',
    education: 'Undergraduate',
    projects: 'Developed eCommerce stores like Glorya\'s Beauty (gloyrasbeauty.com) and Tapio\'s Provisions (tapiosprovisions.com).',
    achievements: 'Expert in eCommerce solutions and AI workflow automation for improved operational efficiency.',
    skills: ['Shopify', 'AI Automation', 'Theme Customization', 'Business Automation', 'Workflow Optimization'],
    certificates: [],
    social: {
      email: 'ahmadrafiquevhr@gmail.com',
      github: 'https://github.com/Ahmad-Rafique-192',
      linkedin: 'https://www.linkedin.com/in/ahmad-rafique-2863823b1/',
      instagram: 'https://www.instagram.com/ahmadrafique804/'
    },
    resume: '#',
    portfolio: 'https://github.com/Ahmad-Rafique-192'
  },
  {
    id: 12,
    name: 'Eng. Aqsa',
    position: 'Flutter App & Frontend Web Developer',
    role: 'Flutter Developer | Frontend Developer',
    experience: '1+ Years',
    rating: 5,
    testimonial: 'Delivering secure, high-performance mobile applications and seamless cross-platform experiences.',
    image: aqsaImage,
    intro: 'Flutter App Developer and Frontend Web Developer specializing in cross-platform mobile applications, Firebase integration, and responsive web interfaces.',
    education: 'BS Software Engineering (5th Semester Completed)',
    projects: 'Builds cross-platform mobile apps with Flutter, integrates Firebase/REST APIs, and develops responsive web interfaces.',
    achievements: 'Expert in Flutter, Firebase Authentication, Cloud Firestore, and scalable UI/UX.',
    skills: ['Flutter', 'Firebase', 'REST API', 'HTML5', 'CSS3', 'JavaScript', 'Mobile UI'],
    certificates: [],
    social: {
      email: 'allahdittaaqsa331@gmail.com',
      github: 'https://github.com/aqsa-bibi2026',
      linkedin: 'https://www.linkedin.com/in/eng-aqsa-2399213a1',
      facebook: 'https://www.facebook.com/profile.php?id=61556577524886'
    },
    resume: '#',
    portfolio: 'https://cosmic-hamster-2eb9d1.netlify.app/'
  }
];
