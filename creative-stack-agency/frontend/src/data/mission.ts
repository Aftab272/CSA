export type MissionItem = {
  title: string;
  icon: string;
  content: string[];
};

export const missionData: MissionItem[] = [
  { 
    title: 'Mission', 
    icon: 'target', 
    content: ['Empower businesses and individuals.', 'Deliver innovative digital solutions.', 'Solve real-world challenges.'] 
  },
  { 
    title: 'Vision', 
    icon: 'eye', 
    content: ['Globally recognized for excellence.', 'Leading innovation and satisfaction.', 'Shape the future of digital business.'] 
  },
  { 
    title: 'Goals', 
    icon: 'trending-up', 
    content: ['Expand digital portfolio.', 'Exceptional client experiences.', 'Build passionate team.', 'Develop SaaS/AI solutions.'] 
  },
  { 
    title: 'Innovation', 
    icon: 'lightbulb', 
    content: ['Explore new technologies.', 'Scalable solutions.', 'Stay ahead of trends.'] 
  },
  { 
    title: 'Education', 
    icon: 'book-open', 
    content: ['Professional training programs.', 'Mentorship initiatives.', 'Industry-ready skills.'] 
  },
  { 
    title: 'Community', 
    icon: 'users', 
    content: ['Encourage collaboration.', 'Support open-source.', 'Share technical knowledge.'] 
  },
];
