export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: ["TypeScript", "JavaScript (ES6+)", "Astro", "React", "Next.js", "TailwindCSS", "HTML5/CSS3", "WebGL"]
  },
  {
    name: "Backend",
    skills: ["Node.js", "Go", "Python", "FastAPI", "PostgreSQL", "Redis", "REST APIs", "GraphQL"]
  },
  {
    name: "Tools & DevOps",
    skills: ["Git", "GitHub Actions", "Docker", "Linux", "Vite", "Turborepo", "Vercel", "Bash Scripting"]
  },
  {
    name: "Design & UX",
    skills: ["Figma", "Design Systems", "Typography", "Responsive Layouts", "Accessibility (a11y)", "Micro-interactions"]
  }
];
