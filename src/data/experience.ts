export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

export const experiences: ExperienceItem[] = [
  {
    company: "Acme Innovations Corp.",
    role: "Full Stack Developer",
    period: "2024 — Present",
    description: "Architected modular micro-frontend components, improved core web vitals by 38%, and led migration of internal API microservices to high-throughput endpoints."
  },
  {
    company: "Nexus Digital Labs",
    role: "Frontend Engineer Intern",
    period: "2023 — 2024",
    description: "Built responsive client portals with modern TypeScript frameworks, integrated real-time websocket updates, and contributed to canonical design system components."
  },
  {
    company: "Freelance & Open Source",
    role: "Independent Software Consultant",
    period: "2022 — 2023",
    description: "Delivered customized web applications for local businesses and contributed to developer tooling packages within the open-source ecosystem."
  }
];
