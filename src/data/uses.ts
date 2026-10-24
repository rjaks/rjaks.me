export type UseGroup = 'Models' | 'Model tooling' | 'Editor & shell' | 'Stack' | 'Workstation';

export interface UseItem {
  group: UseGroup;
  name: string;
  note: string;
  /** Filename in /public/logos — omit when there is no real logo. */
  icon?: string;
  link?: string;
}

export const useGroups: UseGroup[] = ['Models', 'Model tooling', 'Editor & shell', 'Stack', 'Workstation'];

/** One-line clarifiers, shown under a group heading. */
export const groupNotes: Partial<Record<UseGroup, string>> = {
  Stack: 'Default picks for new work. This site itself is Astro + Tailwind + TypeScript on Cloudflare Pages; Docker and Coolify are for other projects.'
};

export const uses: UseItem[] = [
  {
    group: 'Models',
    name: 'DeepSeek V4.1 Flash',
    note: 'Daily driver for edits and refactors — fast and cheap.',
    icon: 'deepseek.svg'
  },
  {
    group: 'Models',
    name: 'Gemini via gemini-cli',
    note: 'Long-context reads and research dumps from the terminal.',
    icon: 'googlegemini.svg'
  },
  {
    group: 'Model tooling',
    name: 'opencode',
    note: 'Agent harness for everything in this repo.',
    icon: 'opencode.svg',
    link: 'https://opencode.ai'
  },
  {
    group: 'Model tooling',
    name: 'ponytail',
    note: 'Plugin that keeps diffs small and replies short.',
    icon: 'ponytail.png',
    link: 'https://github.com/dietrichgebert/ponytail'
  },
  {
    group: 'Model tooling',
    name: 'Playwright MCP',
    note: 'Lets the agent drive a browser and check its own work.',
    icon: 'playwright.svg'
  },
  {
    group: 'Editor & shell',
    name: 'VS Code + WSL Remote',
    note: 'Windows host, Linux toolchain.',
    icon: 'visualstudiocode.svg'
  },
  {
    group: 'Editor & shell',
    name: 'bash',
    note: 'Default shell, kept boring on purpose.',
    icon: 'gnubash.svg'
  },
  {
    group: 'Editor & shell',
    name: 'vim',
    note: 'For quick edits over SSH.',
    icon: 'vim.svg'
  },
  {
    group: 'Stack',
    name: 'Astro',
    note: 'Static-first sites, islands only where they earn their keep.',
    icon: 'astro.svg',
    link: 'https://astro.build'
  },
  {
    group: 'Stack',
    name: 'Tailwind CSS v4',
    note: 'Tokens and layout live in CSS variables, not in a config file.',
    icon: 'tailwindcss.svg'
  },
  {
    group: 'Stack',
    name: 'TypeScript',
    note: 'Strict enough that the data files stay honest.',
    icon: 'typescript.svg'
  },
  {
    group: 'Stack',
    name: 'pnpm',
    note: 'Package manager of choice; npm only when CI insists.',
    icon: 'pnpm.svg'
  },
  {
    group: 'Stack',
    name: 'Cloudflare Pages',
    note: 'Static hosting plus D1, KV, R2 and Workers when a project needs state.',
    icon: 'cloudflare.svg'
  },
  {
    group: 'Stack',
    name: 'Docker',
    note: 'Containers for anything that outgrows a static deploy.',
    icon: 'docker.svg'
  },
  {
    group: 'Stack',
    name: 'Coolify',
    note: 'Self-hosted deployments on a VPS.',
    icon: 'coolify.svg'
  },
  {
    group: 'Workstation',
    name: 'Windows 11 + WSL2',
    note: 'Ubuntu on WSL2 — every build and dev server runs here.',
    icon: 'windows11.svg'
  }
];
