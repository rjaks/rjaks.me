export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

export const experiences: ExperienceItem[] = [
  {
    company: "AdNU Management Information Systems (MIS)",
    role: "Junior Applications Programmer",
    period: "June 2026 — Present",
    description: "Researched and deployed Coolify on a VPS to establish a self-hosted PaaS, automating build and deployment pipelines. Programmed migration scripts to consolidate ~17,000 legacy records into Oracle DB with a 99% success rate, modeled relational ERDs, and built responsive UI components using Laravel and TailwindCSS."
  },
  {
    company: "ThePILLARS Publication",
    role: "Senior Web Consultant (formerly Webmaster)",
    period: "June 2025 — Present",
    description: "Advise editorial board on platform architecture and tech roadmaps while maintaining production infrastructure serving 4,500+ monthly readers with 100% uptime. Spearheaded full-stack platform rebuilds and modern deployment strategies across university-wide coverage."
  }
];
