export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  year: string;
  client: string;
  services: string[];
  technologies: string[];
  image: string;
  gallery: string[];
  url?: string;
  github?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "21-days-of-habit",
    title: "21 Days of Habit",
    description: "A habit-building app designed to turn actions into lifestyle with daily streak tracking and psychological triggers.",
    longDescription:
      "Developed a clean, user-centric mobile-first web app that helps users build habits with streak logic, interval tracking, and positive reinforcement. Features include a calendar-based progress view, ad-based streak restore, weekly/monthly habit types, and an AI coach (coming soon).",
    category: "Self-Improvement",
    year: "2025",
    client: "Light X Digital (In-House Product)",
    services: [
      "Frontend Development",
      "Backend Development",
      "Streak Logic Design",
      "AI Integration"
    ],
    technologies: ["React", "Supabase", "Tailwind CSS", "OpenAI", "Filebase"],
    image: "https://play-lh.googleusercontent.com/WOAmhD2lyW9InvMUIAsVsLWEiliJSAvCoQXTUU3Q-F6DPacGIJIslmiNsw9136RTvMRw2Ti8C3TZ52MF-7wK=w480-h960-rw", // replace with real path
    gallery: [
      "https://play-lh.googleusercontent.com/2IS4xQela5NSd3ZakWC0ot1fZI7JL6D1m8uk_xGWS0veLlF9pTbyqhyN2hRQmE5UGjUFc8ona4sFW0DB0FM9zw=w1052-h592-rw",
      "https://play-lh.googleusercontent.com/Lpe9mSnx2i21g2-wawjL7Vs_CqVT-fSbtG2qx8QEuG-9Nq0JncFAOyPuJfQbnXGJBGJoR_pyvEyD4cKBohhN4wM=w1052-h592-rw",
      "https://play-lh.googleusercontent.com/5eUA36S0QGHIqAgmgD5KysDAB22J_ivVL2Lmxn-W0SMWinYKo-6KQZimiEFrxVLo9fmxJBMq9ti0WZrS_HQOdA=w1052-h592-rw",
      "https://play-lh.googleusercontent.com/ajyLFvvuyla0opiSNTc767Ppq3AhQC2PihG_JWpO1CO_epuBqqPaDwInki4zLdXAfPN72l7V_2-u0CN_QsxSbe4=w1052-h592-rw",
      "https://play-lh.googleusercontent.com/LcLqgoUfc5mZCUFLgb7XyPSrUKfxIb84hiY25DNhOcX24jOPssXEbGRhUzLhrZX-tb0dkWT1vt_f8QUi6Dx33A=w1052-h592-rw",
      "https://play-lh.googleusercontent.com/Iefwn5VQ_RcgiaPMUhoNBRYhB6tBMsuwZ-gq9HdHkju_aATdH3-4POjErNAFDrfH8iRco3HtZfN3BaPv_7FVrg=w1052-h592-rw"
    ],
    url: "https://play.google.com/store/apps/details?id=com.light_computers.daysofhabbit",
    featured: true
  },
  {
    id: "gaurav-gadhari-portfolio",
    title: "Gaurav Gadhari — Portfolio Website",
    description: "A bold, high-performance portfolio website showcasing full-stack development, AI projects, and startup vision.",
    longDescription:
      "Built a sleek, modern portfolio website that reflects my personal brand and showcases projects, skills, services, and contact funnels. Smooth animations, responsive design, and magnetic scroll interactions are powered by Lenis and ShadCN UI.",
    category: "Portfolio",
    year: "2025",
    client: "Gaurav Gadhari (You, baby!)",
    services: ["Web Design", "Frontend Development", "Brand Identity"],
    technologies: ["Next.js", "Tailwind CSS", "Lenis", "ShadCN UI", "Vercel"],
    image: "https://media.licdn.com/dms/image/v2/D4D22AQF1qixRNR2klQ/feedshare-shrink_800/B4DZaP3Q_HG8Ag-/0/1746170352979?e=1757548800&v=beta&t=qxYNit_skF7R-14jHMlRnlWsQzHKXf4tQ9Fkg3pM60c", // replace with real path
    gallery: [
      "https://media.licdn.com/dms/image/v2/D4D22AQF1qixRNR2klQ/feedshare-shrink_800/B4DZaP3Q_HG8Ag-/0/1746170352979?e=1757548800&v=beta&t=qxYNit_skF7R-14jHMlRnlWsQzHKXf4tQ9Fkg3pM60c",
    ],
    url: "https://gaurav-gadhari.vercel.app",
    github: "https://github.com/GauravGadhari",
    featured: true
  }
];


export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export const getProjectsByCategory = (category: string): Project[] => {
  return projects.filter(project => project.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(projects.map(project => project.category))];
};