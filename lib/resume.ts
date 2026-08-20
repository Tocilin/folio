import resumeData from "@/data/resume.json";

export type ResumeEntry = {
  role: string;
  company: string;
  dates: string;
  description: string;
};

export type EducationEntry = {
  degree: string;
  school: string;
  dates: string;
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
  education: EducationEntry[];
};

export const resume: Resume = resumeData;
