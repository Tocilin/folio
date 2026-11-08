import resumeData from "@/data/resume.json";

export type ResumeEntry = {
  role: string;
  company: string;
  dates: string;
  // "YYYY-MM". When set, the tenure is calculated live and appended to dates.
  startDate?: string;
  description: string;
};

export type EducationEntry = {
  degree: string;
  school: string;
};

export type Resume = {
  name: string;
  title: string;
  contact: {
    website: string;
    websiteHref: string;
    email: string;
    phone: string;
  };
  linkedinHref: string;
  experience: ResumeEntry[];
  skills: string;
  education: EducationEntry[];
};

export const resume: Resume = resumeData;
