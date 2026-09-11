export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

export const experiences: ExperienceItem[] = [
  {
    company: "FlyRank AI",
    role: "Backend AI Engineer",
    period: "August 2026 — Present",
    description: "Developing backend AI engineering services and pipelines, integrating modern model APIs and edge-ready backend workflows."
  },
  {
    company: "ThePILLARS Publication",
    role: "Senior Web Consultant (formerly Webmaster)",
    period: "September 2024 — Present",
    description: "Overseeing architecture, code reviews, and mentoring dev teams across a 2-year tenure. Spearheaded technical strategy and platform rebuilds serving 4,500+ monthly readers with 100% uptime, and previously built backend services using Express and MongoDB."
  },
  {
    company: "Ateneo de Naga University",
    role: "Junior Application Developer",
    period: "June 2026 — July 2026",
    description: "Researched and deployed Coolify on a VPS to establish a self-hosted PaaS, automating build and deployment pipelines. Programmed database migration scripts consolidating ~17,000 legacy records into central Oracle DB with 99% success rate, modeled ERDs, and built UI with Laravel and TailwindCSS."
  }
];
