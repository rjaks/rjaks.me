export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["TypeScript", "JavaScript", "SQL", "PHP", "Python", "C++", "C#", "Java"]
  },
  {
    name: "Frontend",
    skills: ["Nuxt 4", "Vue.js", "React", "Vite", "TailwindCSS", "TanStack", "Framer Motion", "GSAP", "Capacitor"]
  },
  {
    name: "Backend & Cloud",
    skills: ["Hono", "Cloudflare (Workers, D1, KV)", "Prisma", "Drizzle ORM", "Laravel", "Convex", "MySQL", "Oracle", "MongoDB", "Express"]
  },
  {
    name: "DevOps & Tools",
    skills: ["Docker", "Coolify", "Discloud", "Git", "GitHub", "GitLab", "Vercel", "ClickUp"]
  }
];
