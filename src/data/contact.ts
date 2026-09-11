export interface ContactLink {
  label: string;
  href: string;
  icon: "email" | "github" | "linkedin" | string;
  external: boolean;
}

export const contactLinks: ContactLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/rjaks",
    icon: "github",
    external: true
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/adrian-reforsado-b15bb5394/",
    icon: "linkedin",
    external: true
  },
  {
    label: "Email",
    href: "mailto:contact@rjaks.me",
    icon: "email",
    external: false
  }
];
