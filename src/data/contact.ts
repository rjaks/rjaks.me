export interface ContactLink {
  label: string;
  href: string;
  icon: "email" | "github" | "linkedin" | string;
  external: boolean;
  handle: string;
  description?: string;
}

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:contact@rjaks.me",
    icon: "email",
    external: false,
    handle: "contact@rjaks.me",
    description: "Primary inbox for engineering inquiries, contracts & collabs"
  },
  {
    label: "GitHub",
    href: "https://github.com/rjaks",
    icon: "github",
    external: true,
    handle: "github.com/rjaks",
    description: "Open-source software, experiments & active repositories"
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/adreforsado",
    icon: "linkedin",
    external: true,
    handle: "linkedin.com/in/adreforsado",
    description: "Professional experience, education & career network"
  }
];

