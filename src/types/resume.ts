export interface Basic {
  name: string;
  jobIntent: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  blog: string;
  yearsExperience: number;
}

export interface Education {
  school: string;
  major: string;
  degree: string;
  start: string;
  end: string;
  note?: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillGroup {
  group: string;
  items: SkillItem[];
}

export interface Experience {
  company: string;
  role: string;
  start: string;
  end: string;
  highlights: string[];
}

export interface Project {
  id: string;
  name: string;
  role: string;
  start: string;
  end: string;
  description: string;
  highlights: string[];
  techStack: string[];
  links: { demo?: string; github?: string };
}

export interface ResumeData {
  basic: Basic;
  summary: string;
  education: Education[];
  skills: SkillGroup[];
  experience: Experience[];
  projects: Project[];
}
