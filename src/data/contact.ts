export interface ContactLink {
  label: string;
  href: string;
  icon: "email" | "github" | "linkedin" | string;
  external: boolean;
}

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:contact@rjaks.me",
    icon: "email",
    external: false
  },
  {
    label: "GitHub",
    href: "https://github.com/rjaks",
    icon: "github",
    external: true
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: "linkedin",
    external: true
  }
];
