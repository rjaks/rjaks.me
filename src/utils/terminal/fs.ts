/**
 * src/utils/terminal/fs.ts
 * A tiny in-memory virtual filesystem for the interactive terminal.
 * The tree is generated from the site's real data payload so the shell and
 * the rest of the site never drift apart.
 */
import { ABOUT_MD, README_MD } from '../../data/terminalContent';

export type Tone =
  | 'default'
  | 'secondary'
  | 'muted'
  | 'accent'
  | 'success'
  | 'error'
  | 'warn';

export interface TermLine {
  text: string;
  tone?: Tone;
  href?: string;
  external?: boolean;
}

export interface FileNode {
  type: 'file';
  content: string;
  link?: string;
}

export interface DirNode {
  type: 'dir';
  children: Record<string, FsNode>;
}

export type FsNode = FileNode | DirNode;

/** The virtual home directory. */
export const HOME = '/home/guest';

export interface FsPayload {
  projects: {
    title: string;
    description: string;
    summary?: string;
    tags: string[];
    link?: string;
    github?: string;
  }[];
  skillCategories: { name: string; skills: string[] }[];
  uses: { group: string; name: string; note: string; link?: string }[];
  experiences: {
    company: string;
    role: string;
    period: string;
    description: string;
    subRoles?: { title: string; period: string; description: string }[];
  }[];
  contactLinks: {
    label: string;
    href: string;
    external: boolean;
    handle: string;
    description?: string;
  }[];
  nowItems: {
    category: string;
    label: string;
    detail?: string;
    link?: string;
  }[];
  hobbies: {
    title: string;
    description: string;
    link?: string;
    linkLabel?: string;
  }[];
  posts: {
    id: string;
    title: string;
    description: string;
    pubDate: string;
    tags: string[];
  }[];
}

export function slug(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function dir(): DirNode {
  return { type: 'dir', children: {} };
}

function file(content: string, link?: string): FileNode {
  return { type: 'file', content, link };
}

/* -------------------------------------------------------------------------- */
/* File-body builders                                                         */
/* -------------------------------------------------------------------------- */

function projectFile(p: FsPayload['projects'][number]): string {
  const lines = [`# ${p.title}`, '', p.description, '', `tags    ${p.tags.join(', ')}`];
  if (p.github) lines.push(`code    ${p.github}`);
  if (p.link) lines.push(`live    ${p.link}`);
  return lines.join('\n');
}

function skillFile(cat: FsPayload['skillCategories'][number]): string {
  return [`# ${cat.name}`, '', ...cat.skills.map((s) => `- ${s}`)].join('\n');
}

function experienceFile(exp: FsPayload['experiences'][number]): string {
  const lines = [`# ${exp.company}`, `${exp.role} · ${exp.period}`, '', exp.description];
  if (exp.subRoles?.length) {
    lines.push('', '## progression');
    for (const r of exp.subRoles) {
      lines.push(`- ${r.title} (${r.period})`, `  ${r.description}`);
    }
  }
  return lines.join('\n');
}

function contactFile(links: FsPayload['contactLinks']): string {
  const lines = ['# Contact', '', 'The fastest ways to reach me:', ''];
  for (const l of links) {
    lines.push(`## ${l.label}`, l.handle, ...(l.description ? [l.description] : []), '');
  }
  return lines.join('\n').trimEnd();
}

function nowFile(p: FsPayload): string {
  const lines = ['# Now', '', "A snapshot of what I'm building, exploring and tuned into.", ''];
  for (const item of p.nowItems) {
    lines.push(`[${item.category}] ${item.label}${item.detail ? ` — ${item.detail}` : ''}`);
  }
  if (p.hobbies.length) {
    lines.push('', '## Off the terminal');
    for (const h of p.hobbies) lines.push(`- ${h.title}: ${h.description}`);
  }
  return lines.join('\n');
}

function usesFile(p: FsPayload): string {
  const lines = ['# Uses', '', 'Models, tooling, editor and stack — no wishlist.', ''];
  for (const group of [...new Set(p.uses.map((u) => u.group))]) {
    lines.push(`## ${group}`);
    for (const u of p.uses.filter((i) => i.group === group)) {
      lines.push(`- ${u.name}${u.note ? ` — ${u.note}` : ''}${u.link ? ` (${u.link})` : ''}`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

function postFile(post: FsPayload['posts'][number]): string {
  const date = new Date(post.pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const tags = post.tags.length ? ` · ${post.tags.join(', ')}` : '';
  return [`# ${post.title}`, `${date}${tags}`, '', post.description].join('\n');
}

/* -------------------------------------------------------------------------- */
/* Tree builder                                                               */
/* -------------------------------------------------------------------------- */

export function buildFs(payload: FsPayload): DirNode {
  const home = dir();

  home.children['about.md'] = file(ABOUT_MD);
  home.children['README.md'] = file(README_MD);
  home.children['contact.md'] = file(contactFile(payload.contactLinks));
  home.children['now.md'] = file(nowFile(payload));
  home.children['uses.md'] = file(usesFile(payload));

  const projects = dir();
  for (const p of payload.projects) {
    projects.children[`${slug(p.title)}.md`] = file(projectFile(p), p.link || p.github);
  }
  home.children['projects'] = projects;

  const skills = dir();
  for (const cat of payload.skillCategories) {
    skills.children[`${slug(cat.name)}.md`] = file(skillFile(cat));
  }
  home.children['skills'] = skills;

  const experience = dir();
  for (const exp of payload.experiences) {
    experience.children[`${slug(exp.company)}.md`] = file(experienceFile(exp));
  }
  home.children['experience'] = experience;

  const writing = dir();
  for (const post of payload.posts) {
    writing.children[`${slug(post.id)}.md`] = file(postFile(post));
  }
  home.children['writing'] = writing;

  const root = dir();
  const homeDir = dir();
  const guest = dir();
  guest.children = home.children;
  homeDir.children = { guest };
  root.children = { home: homeDir };

  return root;
}

/* -------------------------------------------------------------------------- */
/* Path helpers                                                               */
/* -------------------------------------------------------------------------- */

export function resolvePath(cwd: string, input: string, home: string = HOME): string {
  if (!input) return home;

  let base: string[];
  let rest = input;

  if (rest === '~' || rest.startsWith('~/')) {
    base = home.split('/').filter(Boolean);
    rest = rest.slice(1);
  } else if (rest.startsWith('/')) {
    base = [];
  } else {
    base = cwd.split('/').filter(Boolean);
  }

  for (const seg of rest.split('/')) {
    if (seg === '' || seg === '.') continue;
    if (seg === '..') base.pop();
    else base.push(seg);
  }

  return '/' + base.join('/');
}

export function getNode(root: DirNode, path: string): FsNode | null {
  const segs = path.split('/').filter(Boolean);
  let node: FsNode = root;
  for (const seg of segs) {
    if (node.type !== 'dir') return null;
    const next: FsNode | undefined = node.children[seg];
    if (!next) return null;
    node = next;
  }
  return node;
}

export interface DirEntry {
  name: string;
  type: 'dir' | 'file';
  link?: string;
}

export function listDir(root: DirNode, path: string): DirEntry[] | null {
  const node = getNode(root, path);
  if (!node || node.type !== 'dir') return null;
  return Object.entries(node.children)
    .map(([name, child]) => ({
      name,
      type: child.type,
      link: child.type === 'file' ? child.link : undefined,
    }))
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
}

export function readFile(root: DirNode, path: string): FileNode | null {
  const node = getNode(root, path);
  return node && node.type === 'file' ? node : null;
}

export interface WalkedFile {
  path: string;
  name: string;
  content: string;
  link?: string;
}

export function walkFiles(root: DirNode, start = '/'): WalkedFile[] {
  const out: WalkedFile[] = [];
  const base = getNode(root, start);
  if (!base) return out;

  const visit = (node: FsNode, path: string) => {
    if (node.type === 'file') {
      out.push({ path, name: path.split('/').pop() || path, content: node.content, link: node.link });
      return;
    }
    for (const [name, child] of Object.entries(node.children)) {
      visit(child, `${path === '/' ? '' : path}/${name}`);
    }
  };

  visit(base, start === '/' ? '' : start);
  return out;
}

/** Render a path for display, collapsing the home dir to `~`. */
export function prettyPath(path: string, home: string = HOME): string {
  if (path === home) return '~';
  if (path.startsWith(home + '/')) return '~' + path.slice(home.length);
  return path;
}

/** Turn a file body into terminal lines with light markdown styling. */
export function renderText(content: string): TermLine[] {
  return content.split('\n').map((text) => {
    if (text.startsWith('#')) return { text, tone: 'accent' as Tone };
    return { text };
  });
}
