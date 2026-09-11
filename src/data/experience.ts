export interface SubRole {
  title: string;
  period: string;
  description: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  subRoles?: SubRole[];
}

export const experiences: ExperienceItem[] = [
  {
    company: "ThePILLARS Publication",
    role: "Senior Web Consultant",
    period: "September 2024 — Present",
    description: "Progressed across four key roles over 2+ years—from apprentice developer to webmaster and senior consultant. Maintained 100% uptime for 4,500+ monthly readers, spearheaded full-stack platform rebuilds, and engineered backend services.",
    subRoles: [
      {
        title: "Senior Web Consultant",
        period: "June 2026 — Present",
        description: "Overseeing platform architecture, conducting rigorous code reviews, and mentoring incoming webmasters and developer team members."
      },
      {
        title: "Webmaster",
        period: "June 2025 — June 2026",
        description: "Directed technical strategy and complete structural platform rebuilds, managing 4,500+ monthly readers with 100% uptime during high-traffic events."
      },
      {
        title: "Web Developer",
        period: "January 2025 — June 2025",
        description: "Engineered performant backend services using Express and MongoDB, collaborating closely with editorial boards on design-to-code translations."
      },
      {
        title: "Apprentice / Junior Developer",
        period: "September 2024 — January 2025",
        description: "Maintained CMS infrastructure, pushed site updates, and shadowed senior developers on server orchestration and deployment."
      }
    ]
  },
  {
    company: "FlyRank AI",
    role: "Backend AI Engineer",
    period: "August 2026 — Present",
    description: "Developing backend AI engineering services and pipelines, integrating modern model APIs and edge-ready backend workflows."
  },
  {
    company: "Ateneo de Naga University",
    role: "Junior Application Developer",
    period: "June 2026 — July 2026",
    description: "Researched and deployed Coolify on a VPS to establish a self-hosted PaaS, automating build and deployment pipelines. Programmed database migration scripts consolidating ~17,000 legacy records into central Oracle DB with 99% success rate, modeled ERDs, and built UI with Laravel and TailwindCSS."
  }
];
