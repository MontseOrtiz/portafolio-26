import type { CvContent } from "./types";

// Transcrito tal cual de montse-ortiz-cv-en.pdf.
// TODO (fase 6, brief.md): alinear con el PDF en español y con el sitio (Library Diary → Book Diary,
// X Eleva → Xeleva, Independiente → Independent) y revisar las habilidades que no se puedan respaldar
// en una entrevista (Redux, Material UI, Ant Design, JWT, OAuth 2.0, React Testing Library).
export const cvEn: CvContent = {
  name: "Montserrat Ortiz",
  location: "Querétaro, México",
  summary:
    "Frontend Developer with more than 4 years building production interfaces with React, Next.js, TypeScript and Tailwind CSS, integrated with REST APIs. Experience improving performance, accessibility and SEO (mobile Lighthouse up to 100/95/100) and working in full stack architectures. I adapt quickly to new stacks and deliver quality features in agile environments.",
  labels: { experience: "Work experience", education: "Education", skills: "Skills", languages: "Languages" },
  experience: [
    {
      dates: "2025 – Present",
      title: "Frontend Developer (Freelance)",
      company: "Independiente · Querétaro, México",
      bullets: [
        "I built and deployed Library Diary and WOD Tracker with React, Next.js and TypeScript.",
        "I integrated REST APIs and SSR in both full stack applications, end to end.",
        "I optimized WOD Tracker to 100 in performance, 95 in accessibility and 100 in mobile SEO.",
      ],
    },
    {
      dates: "2023 – 2025",
      title: "Full Stack Developer",
      company: "X Eleva · Querétaro, México",
      bullets: [
        "I developed more than 10 full stack applications for clients from different sectors with React and TypeScript, integrating REST APIs under the Scrum methodology.",
        "I optimized frontends in several projects through themed components and CSS frameworks, reducing by ~30% the implementation time of frequent visual changes.",
        "I implemented in OxProx package- and account-type-based permissions, controlling access to pages according to the user role.",
      ],
    },
    {
      dates: "2021 – 2023",
      title: "Full Stack Developer and Programming Instructor",
      company: "DEV.F · Querétaro, México",
      bullets: [
        "I developed the campus app with React, Context API and MongoDB, integrating a REST API so students could consult classes and upload projects.",
        "I optimized images, CSS, accessibility and SEO through alternative texts and metadata provided by the team.",
        "I wrote unit tests with Jest in a CI/CD pipeline with a minimum coverage of 75%; mentored more than 60 students.",
      ],
    },
    {
      dates: "2019 – 2020",
      title: "Frontend Developer",
      company: "Soy Agencia · México",
      bullets: [
        "I developed more than 20 responsive landing pages mainly with HTML and CSS, applying performance optimization (image compression, lazy loading).",
        "I converted Figma and Zeplin designs into web implementations faithful to the design, working under agile Scrum methodologies.",
      ],
    },
  ],
  education: [
    {
      dates: "2020 – 2021",
      title: "Master’s in Full Stack Web Development",
      company: "DEV.F · México",
      bullets: [
        "Intensive training in full stack web development with modern JavaScript, React, Node.js and relational databases.",
        "Building web applications from scratch, from frontend component design to the creation and consumption of REST APIs.",
        "Practice with version control using Git/GitHub, collaborative work and deployment of projects to production.",
      ],
    },
    {
      dates: "2018 – 2020",
      title: "Master’s in Administration, Specialization in International Logistics",
      company: "Universidad del Valle de México · México",
      bullets: [
        "Focus on international logistics, supply chain management and process optimization.",
        "Development of projects oriented toward operational efficiency, basic data analysis and decision-making based on indicators.",
        "Teamwork and executive presentations of proposals for improving logistics processes.",
      ],
    },
    {
      dates: "2018 – 2019",
      title: "Web Development Bootcamp",
      company: "Ironhack · México",
      bullets: [
        "Intensive web development bootcamp with the MERN stack (MongoDB, Express, React, Node.js).",
        "Building full stack applications, from interface design in React to API creation with Node.js/Express and persistence in MongoDB.",
        "Teamwork in short sprints, focused on delivering MVPs and presenting final projects to a technical panel.",
      ],
    },
    {
      dates: "2013 – 2016",
      title: "Bachelor’s in International Business",
      company: "Universidad del Valle de México · México",
      bullets: [
        "Training in foreign trade, international business and operations management between different markets.",
        "Development of projects focused on market analysis, import/export processes and cost optimization.",
        "Multidisciplinary teamwork and presentations of business proposals to executive profiles.",
      ],
    },
  ],
  skills: [
    {
      label: "Frontend",
      items: [
        "React", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "Next.js", "Redux", "React Hooks", "React Context",
        "React Server Components", "Web performance optimization", "Web accessibility", "Technical SEO", "Lighthouse",
        "Material UI", "Ant Design", "UI design systems", "Server-side rendering", "Static site generation",
        "Advanced state management",
      ],
    },
    {
      label: "Backend",
      items: ["Node.js", "Express", "Design and Integration of REST APIs", "REST", "Authentication and authorization", "JWT", "OAuth 2.0"],
    },
    { label: "Databases", items: ["SQL", "MySQL", "Relational Databases"] },
    { label: "Containers", items: ["Docker"] },
    {
      label: "Autonomous Full Stack Work",
      items: ["Problem Solving in Frontend, Backend and Data Integration, Without Constant Supervision"],
    },
    {
      label: "Testing and CI/CD",
      items: ["Jest", "Continuous Integration Pipelines with Test Coverage Gates", "React Testing Library", "CI/CD"],
    },
    { label: "AI Applied to Development", items: ["Claude Code", "ChatGPT", "GitHub Copilot"] },
    { label: "Other", items: ["Version control"] },
  ],
  languages: [
    { name: "Spanish", level: "Native speaker" },
    { name: "English", level: "Elementary" },
  ],
};
