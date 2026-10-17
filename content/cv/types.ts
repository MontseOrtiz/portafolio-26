export type CvEntry = {
  dates: string;
  title: string;
  company: string;
  bullets: string[];
};

export type CvSkillGroup = { label: string; items: string[] };

export type CvLanguage = { name: string; level: string };

// Contenido del CV en un idioma; transcrito de public/cv/montse-ortiz-cv-<locale>.pdf.
export type CvContent = {
  name: string;
  location: string;
  summary: string;
  labels: { experience: string; education: string; skills: string; languages: string };
  experience: CvEntry[];
  education: CvEntry[];
  skills: CvSkillGroup[];
  languages: CvLanguage[];
};
