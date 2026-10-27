/**
 * src/utils/terminal/commands.ts
 * The command registry for the interactive terminal. Each command receives a
 * context plus its arguments (and optional piped stdin) and returns lines to
 * print — or performs a side effect (navigation, theme, modals).
 */
import { HELP, NEOFETCH_LOGO } from '../../data/terminalContent';
import {
  HOME,
  getNode,
  listDir,
  prettyPath,
  readFile,
  renderText,
  resolvePath,
  slug,
  walkFiles,
  type DirNode,
  type FsPayload,
  type TermLine,
} from './fs';

export const ACCENTS = ['amber', 'phosphor', 'ice', 'magenta'] as const;
export type Accent = (typeof ACCENTS)[number];

export interface ShellState {
  cwd: string;
  prevCwd: string;
  bootedAt: number;
}

export interface CmdCtx {
  fs: DirNode;
  payload: FsPayload;
  state: ShellState;
  /** Append lines to the scrollback. */
  print: (lines: TermLine[] | string) => void;
  /** Clear the scrollback. */
  clear: () => void;
  /** Move the virtual working directory. */
  setCwd: (path: string) => void;
  /** Client-side navigation to a site route. */
  navigate: (path: string) => void;
  /** Open an external URL in a new tab. */
  openUrl: (url: string) => void;
  /** Open one of the site's existing modals by element id. */
  openModal: (id: string) => void;
  /** Close the shell dialog. */
  closeShell: () => void;
  /** Accent preset helpers. */
  theme: { current: () => string; set: (name: string) => string };
  /** Toggle the matrix easter egg; returns whether it is now active. */
  toggleMatrix: () => boolean;
  /** Show or hide the sticker gifs; returns whether they are now visible. */
  dog: (visible: boolean) => boolean;
  /** Command history, oldest → newest. */
  history: () => string[];
}

export type CommandFn = (
  ctx: CmdCtx,
  args: string[],
  stdin: TermLine[] | null
) => TermLine[] | void;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function splitArgs(args: string[]): { flags: string[]; positional: string[] } {
  const flags: string[] = [];
  const positional: string[] = [];
  for (const a of args) {
    if (a.startsWith('-') && a.length > 1) flags.push(a);
    else positional.push(a);
  }
  return { flags, positional };
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function manFor(name: string): TermLine[] {
  const entry = HELP.find((e) => e.name === name);
  if (!entry) {
    return [
      { text: `man: no manual entry for ${name}`, tone: 'error' },
      { text: "run 'help' to list commands", tone: 'muted' },
    ];
  }
  const usage = `${entry.name}${entry.args ? ' ' + entry.args : ''}`;
  return [
    { text: `NAME`, tone: 'accent' },
    { text: `    ${usage} — ${entry.desc}` },
    { text: '' },
    { text: `USAGE`, tone: 'accent' },
    { text: `    ${usage}` },
  ];
}

function tree(root: DirNode, path: string, out: TermLine[], prefix = ''): void {
  const entries = listDir(root, path);
  if (!entries) return;
  entries.forEach((e, i) => {
    const last = i === entries.length - 1;
    out.push({
      text: `${prefix}${last ? '└── ' : '├── '}${e.name}${e.type === 'dir' ? '/' : ''}`,
      tone: e.type === 'dir' ? 'accent' : 'default',
    });
    if (e.type === 'dir') tree(root, `${path}/${e.name}`, out, prefix + (last ? '    ' : '│   '));
  });
}

function cowsay(text: string): TermLine[] {
  const msg = text || 'moo';
  const border = '_'.repeat(msg.length + 2);
  const dash = '-'.repeat(msg.length + 2);
  return [
    { text: ` ${border}`, tone: 'muted' },
    { text: `< ${msg} >`, tone: 'muted' },
    { text: ` ${dash}`, tone: 'muted' },
    { text: '        \\   ^__^', tone: 'muted' },
    { text: '         \\  (oo)\\_______', tone: 'muted' },
    { text: '            (__)\\       )\\/\\', tone: 'muted' },
    { text: '                ||----w |', tone: 'muted' },
    { text: '                ||     ||', tone: 'muted' },
  ];
}

const ROUTES: Record<string, string> = {
  home: '/',
  projects: '/projects',
  work: '/work',
  experience: '/work',
  writing: '/writing',
  blog: '/writing',
  skills: '/skills',
  contact: '/contact',
};

/* -------------------------------------------------------------------------- */
/* Commands                                                                   */
/* -------------------------------------------------------------------------- */

export const commands: Record<string, CommandFn> = {
  /* ── Shell meta ───────────────────────────────────────────────────────── */

  help(_ctx, args) {
    if (args[0]) return manFor(args[0]);
    const groups: string[] = [];
    const byGroup = new Map<string, typeof HELP>();
    for (const e of HELP) {
      if (!byGroup.has(e.group)) {
        byGroup.set(e.group, []);
        groups.push(e.group);
      }
      byGroup.get(e.group)!.push(e);
    }
    const out: TermLine[] = [{ text: 'rjaks.me shell — available commands', tone: 'accent' }, { text: '' }];
    for (const g of groups) {
      out.push({ text: g, tone: 'secondary' });
      for (const e of byGroup.get(g)!) {
        const name = `${e.name}${e.args ? ' ' + e.args : ''}`.padEnd(20);
        out.push({ text: `  ${name}${e.desc}` });
      }
      out.push({ text: '' });
    }
    out.push({ text: "tip: 'open <page>' to jump · Tab to autocomplete · ↑/↓ history", tone: 'muted' });
    return out;
  },

  man(_ctx, args) {
    if (!args[0]) return [{ text: "man: what manual page do you want? try 'man ls'", tone: 'error' }];
    return manFor(args[0]);
  },

  clear(ctx) {
    ctx.clear();
    return [];
  },

  exit(ctx) {
    ctx.closeShell();
    return [{ text: 'logout — see you around.', tone: 'muted' }];
  },

  echo(_ctx, args) {
    return [{ text: args.join(' ') }];
  },

  date() {
    return [{ text: new Date().toString() }];
  },

  history(ctx) {
    const h = ctx.history();
    if (!h.length) return [{ text: 'no history yet', tone: 'muted' }];
    return h.map((cmd, i) => ({ text: `${String(i + 1).padStart(4)}  ${cmd}`, tone: 'secondary' as const }));
  },

  theme(ctx, args) {
    const name = args[0]?.toLowerCase();
    if (!name) {
      const current = ctx.theme.current();
      const out: TermLine[] = [{ text: 'accent presets:', tone: 'accent' }];
      for (const a of ACCENTS) {
        out.push({ text: `  ${a}${a === current ? '  (current)' : ''}`, tone: a === current ? 'success' : 'default' });
      }
      out.push({ text: "usage: theme <name>", tone: 'muted' });
      return out;
    }
    if (!(ACCENTS as readonly string[]).includes(name)) {
      return [{ text: `theme: unknown preset '${name}'`, tone: 'error' }, { text: `available: ${ACCENTS.join(', ')}`, tone: 'muted' }];
    }
    ctx.theme.set(name);
    return [{ text: `accent set to ${name}.`, tone: 'success' }];
  },

  neofetch(ctx) {
    const info = [
      'guest@rjaks',
      '-----------',
      `os       rjaks-os 1.0.0`,
      `host     rjaks.me`,
      `shell    rj-trash`,
      `uptime   ${Math.max(1, Math.round((Date.now() - ctx.state.bootedAt) / 1000))}s`,
      `theme    ${ctx.theme.current()}`,
      `projects ${ctx.payload.projects.length}`,
      `posts    ${ctx.payload.posts.length}`,
      `skills   ${ctx.payload.skillCategories.reduce((n, c) => n + c.skills.length, 0)}`,
    ];
    const rows = Math.max(NEOFETCH_LOGO.length, info.length);
    const out: TermLine[] = [];
    for (let i = 0; i < rows; i++) {
      const left = (NEOFETCH_LOGO[i] ?? '').padEnd(24);
      const right = info[i] ?? '';
      out.push({ text: `${left}${right}`, tone: i === 0 ? 'accent' : 'default' });
    }
    return out;
  },

  whoami() {
    return [
      { text: 'Adrian Reforsado', tone: 'accent' },
      { text: 'software engineer · cs student · edge-native web', tone: 'secondary' },
      { text: "currently: backend AI @ FlyRank AI · web consultant @ ThePILLARS", tone: 'muted' },
    ];
  },

  /* ── Filesystem ───────────────────────────────────────────────────────── */

  pwd(ctx) {
    return [{ text: ctx.state.cwd }];
  },

  ls(ctx, args) {
    const { positional } = splitArgs(args);
    const target = positional[0];
    const path = target ? resolvePath(ctx.state.cwd, target) : ctx.state.cwd;
    const entries = listDir(ctx.fs, path);
    if (entries === null) {
      const node = getNode(ctx.fs, path);
      if (node && node.type === 'file') {
        return [{ text: path.split('/').pop() || path, tone: 'accent' }];
      }
      return [{ text: `ls: cannot access '${target ?? path}': No such file or directory`, tone: 'error' }];
    }
    if (!entries.length) return [];
    return [
      {
        text: entries.map((e) => (e.type === 'dir' ? `${e.name}/` : e.name)).join('   '),
      },
    ];
  },

  cd(ctx, args) {
    const target = args[0];
    if (!target || target === '~') {
      ctx.setCwd(HOME);
      return [];
    }
    if (target === '-') {
      ctx.setCwd(ctx.state.prevCwd);
      return [{ text: prettyPath(ctx.state.cwd), tone: 'muted' }];
    }
    const path = resolvePath(ctx.state.cwd, target);
    const node = getNode(ctx.fs, path);
    if (!node) return [{ text: `cd: no such file or directory: ${target}`, tone: 'error' }];
    if (node.type !== 'dir') return [{ text: `cd: not a directory: ${target}`, tone: 'error' }];
    ctx.setCwd(path);
    return [];
  },

  cat(ctx, args) {
    if (!args[0]) return [{ text: 'cat: missing file operand', tone: 'error' }];
    const path = resolvePath(ctx.state.cwd, args[0]);
    const file = readFile(ctx.fs, path);
    if (!file) {
      const node = getNode(ctx.fs, path);
      if (node && node.type === 'dir') return [{ text: `cat: ${args[0]}: Is a directory`, tone: 'error' }];
      return [{ text: `cat: ${args[0]}: No such file or directory`, tone: 'error' }];
    }
    return renderText(file.content);
  },

  tree(ctx, args) {
    const { positional } = splitArgs(args);
    const target = positional[0];
    const path = target ? resolvePath(ctx.state.cwd, target) : ctx.state.cwd;
    const node = getNode(ctx.fs, path);
    if (!node || node.type !== 'dir') {
      return [{ text: `tree: '${target ?? path}': not a directory`, tone: 'error' }];
    }
    const out: TermLine[] = [{ text: prettyPath(path), tone: 'accent' }];
    tree(ctx.fs, path, out);
    return out;
  },

  find(ctx, args) {
    const term = args.join(' ').toLowerCase();
    if (!term) return [{ text: 'find: missing search term', tone: 'error' }];
    const matches = walkFiles(ctx.fs, HOME).filter(
      (f) => f.name.toLowerCase().includes(term) || f.content.toLowerCase().includes(term)
    );
    if (!matches.length) return [{ text: `find: no matches for '${term}'`, tone: 'muted' }];
    return matches.map((f) => ({
      text: `${prettyPath(f.path)}`,
      tone: 'default' as const,
      href: f.link,
      external: true,
    }));
  },

  grep(ctx, args, stdin) {
    const pattern = args.find((a) => !a.startsWith('-'));
    if (!pattern) return [{ text: 'grep: missing pattern', tone: 'error' }];
    const insensitive = args.includes('-i');
    const re = new RegExp(escapeRegExp(pattern), insensitive ? 'i' : '');

    if (stdin) {
      return stdin.filter((l) => re.test(l.text));
    }

    const { positional } = splitArgs(args);
    const target = positional[1];
    const start = target ? resolvePath(ctx.state.cwd, target) : HOME;
    const out: TermLine[] = [];
    for (const f of walkFiles(ctx.fs, start)) {
      f.content.split('\n').forEach((line) => {
        if (re.test(line)) {
          out.push({ text: `${prettyPath(f.path)}: ${line.trim()}`, tone: 'default' });
        }
      });
    }
    if (!out.length) return [{ text: `grep: no matches for '${pattern}'`, tone: 'muted' }];
    return out;
  },

  open(ctx, args) {
    const target = args.join(' ').trim();
    if (!target) return [{ text: 'open: specify a page or project', tone: 'error' }];

    const key = target.toLowerCase();
    if (ROUTES[key]) {
      ctx.navigate(ROUTES[key]);
      return [{ text: `→ ${ROUTES[key]}`, tone: 'muted' }];
    }

    const project = ctx.payload.projects.find(
      (p) => slug(p.title) === slug(target) || p.title.toLowerCase() === key
    );
    if (project) {
      const url = project.link || project.github;
      if (!url) return [{ text: `${project.title} has no public link yet.`, tone: 'muted' }];
      ctx.openUrl(url);
      return [{ text: `→ ${url}`, tone: 'muted' }];
    }

    const link = ctx.payload.contactLinks.find((l) => l.label.toLowerCase() === key);
    if (link) {
      ctx.openUrl(link.href);
      return [{ text: `→ ${link.handle}`, tone: 'muted' }];
    }

    if (/^https?:\/\//.test(target)) {
      ctx.openUrl(target);
      return [{ text: `→ ${target}`, tone: 'muted' }];
    }

    return [
      { text: `open: don't know how to open '${target}'`, tone: 'error' },
      { text: 'try: projects · work · writing · skills · contact · or a project name', tone: 'muted' },
    ];
  },

  /* ── Content shortcuts ────────────────────────────────────────────────── */

  about(ctx) {
    return renderText(readFile(ctx.fs, `${HOME}/about.md`)?.content ?? '');
  },

  projects(ctx) {
    const out: TermLine[] = [{ text: `projects (${ctx.payload.projects.length})`, tone: 'accent' }, { text: '' }];
    for (const p of ctx.payload.projects) {
      out.push({ text: `• ${p.title}`, tone: 'default', href: p.link || p.github, external: true });
      out.push({ text: `  ${p.summary || p.description}`, tone: 'secondary' });
      out.push({ text: `  ${p.tags.join(' · ')}`, tone: 'muted' });
      out.push({ text: '' });
    }
    out.push({ text: "tip: 'ls ~/projects' or 'grep <tech>' to search", tone: 'muted' });
    return out;
  },

  skills(ctx) {
    const out: TermLine[] = [{ text: 'skills & technologies', tone: 'accent' }, { text: '' }];
    for (const cat of ctx.payload.skillCategories) {
      out.push({ text: `${cat.name}:`, tone: 'secondary' });
      out.push({ text: `  ${cat.skills.join(' · ')}` });
      out.push({ text: '' });
    }
    return out;
  },

  uses(ctx) {
    const out: TermLine[] = [{ text: 'uses & setup', tone: 'accent' }, { text: '' }];
    for (const group of [...new Set(ctx.payload.uses.map((u) => u.group))]) {
      out.push({ text: `${group}:`, tone: 'secondary' });
      for (const u of ctx.payload.uses.filter((i) => i.group === group)) {
        out.push({ text: `  ${u.name}${u.note ? ` — ${u.note}` : ''}`, href: u.link, external: true });
      }
      out.push({ text: '' });
    }
    out.push({ text: "'cat ~/uses.md' for the same list in the virtual fs", tone: 'muted' });
    return out;
  },

  experience(ctx) {
    const out: TermLine[] = [{ text: 'experience', tone: 'accent' }, { text: '' }];
    for (const e of ctx.payload.experiences) {
      out.push({ text: `• ${e.company}`, tone: 'default' });
      out.push({ text: `  ${e.role} · ${e.period}`, tone: 'secondary' });
      out.push({ text: `  ${e.description}`, tone: 'muted' });
      out.push({ text: '' });
    }
    return out;
  },

  writing(ctx) {
    const posts = ctx.payload.posts;
    if (!posts.length) return [{ text: 'no posts yet.', tone: 'muted' }];
    const out: TermLine[] = [{ text: `writing (${posts.length})`, tone: 'accent' }, { text: '' }];
    for (const p of posts) {
      const date = new Date(p.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      out.push({ text: `• ${p.title}`, tone: 'default', href: `/writing/${p.id}` });
      out.push({ text: `  ${date}`, tone: 'muted' });
      out.push({ text: `  ${p.description}`, tone: 'secondary' });
      out.push({ text: '' });
    }
    return out;
  },

  now(ctx) {
    return renderText(readFile(ctx.fs, `${HOME}/now.md`)?.content ?? '');
  },

  contact(ctx) {
    const out: TermLine[] = [{ text: 'get in touch', tone: 'accent' }, { text: '' }];
    for (const l of ctx.payload.contactLinks) {
      out.push({ text: `• ${l.label}`, tone: 'secondary' });
      out.push({ text: `  ${l.handle}`, tone: 'default', href: l.href, external: l.external });
    }
    out.push({ text: '' });
    out.push({ text: "tip: 'open email' or 'open github' to jump straight there", tone: 'muted' });
    return out;
  },

  /* ── Play ─────────────────────────────────────────────────────────────── */

  guestbook(ctx) {
    ctx.openModal('chat-modal');
    return [{ text: 'opening the community wall…', tone: 'muted' }];
  },

  wordle(ctx) {
    ctx.openModal('wordle-modal');
    return [{ text: 'loading wordle…', tone: 'muted' }];
  },

  matrix(ctx) {
    const on = ctx.toggleMatrix();
    return [{ text: on ? 'wake up, neo…' : 'returning to the real world…', tone: 'success' }];
  },

  cowsay(_ctx, args) {
    return cowsay(args.join(' '));
  },

  boogley(ctx, args) {
    const off = ['off', 'hide', 'no'].includes((args[0] || '').toLowerCase());
    ctx.dog(!off);
    return [
      off
        ? { text: 'sticker gifs hidden. type \'boogley\' to bring them back.', tone: 'muted' }
        : { text: 'sticker gifs are back. type \'boogley off\' to hide them.', tone: 'muted' },
    ];
  },

  sudo(_ctx, args) {
    const joined = args.join(' ').toLowerCase();
    if (joined === 'hire-me' || joined === 'hire me') {
      return [
        { text: '✓ sudo access granted.', tone: 'success' },
        { text: 'offer accepted. reach me at contact@rjaks.me', tone: 'accent' },
      ];
    }
    if (joined.includes('make me a sandwich')) {
      return [{ text: 'okay.', tone: 'default' }];
    }
    if (joined.includes('rm -rf')) {
      return [{ text: 'nice try. 🙂', tone: 'warn' }];
    }
    return [
      { text: 'guest is not in the sudoers file. This incident has been reported.', tone: 'error' },
    ];
  },

  coffee() {
    return [
      { text: '      ( (', tone: 'muted' },
      { text: '       ) )', tone: 'muted' },
      { text: '    ........', tone: 'muted' },
      { text: '    |      |]', tone: 'muted' },
      { text: '    \\      /', tone: 'muted' },
      { text: "     `----'", tone: 'muted' },
      { text: 'brewing… ☕ (this may take a moment)', tone: 'accent' },
    ];
  },

  hack() {
    return [
      { text: 'initializing exploit framework…', tone: 'secondary' },
      { text: 'bypassing mainframe firewall……', tone: 'secondary' },
      { text: 'downloading the internet ██████████ 100%', tone: 'success' },
      { text: "just kidding. it's a portfolio, not the Pentagon.", tone: 'muted' },
    ];
  },

  rm(_ctx, args) {
    const target = args.find((a) => !a.startsWith('-')) || 'this';
    if (args.some((a) => a.includes('rf')) || target.includes('/')) {
      return [{ text: "rm: operation not permitted — nice try though.", tone: 'warn' }];
    }
    return [{ text: `rm: cannot remove '${target}': Permission denied`, tone: 'error' }];
  },

  vim() {
    return [
      { text: 'entering vim…', tone: 'secondary' },
      { text: "good luck getting out. (hint: it's :q)", tone: 'muted' },
    ];
  },

  nano() {
    return [{ text: 'nano is for people who fear commitment. (use vim)', tone: 'muted' }];
  },

  emacs() {
    return [{ text: 'a great operating system, lacking only a decent editor. 😉', tone: 'muted' }];
  },

  banner() {
    return [
      { text: '╭───────────────────────────────╮', tone: 'accent' },
      { text: '│   r j a k s  ·  ~/terminal    │', tone: 'accent' },
      { text: '╰───────────────────────────────╯', tone: 'accent' },
    ];
  },

  42() {
    return [{ text: 'the answer to life, the universe, and everything.', tone: 'accent' }];
  },
};

/* Aliases */
commands['quit'] = commands['exit'];
commands['q'] = commands['exit'];
commands[':q'] = commands['exit'];
commands[':wq'] = commands['exit'];
commands['exp'] = commands['experience'];
commands['cv'] = commands['experience'];
commands['work'] = commands['experience'];
commands['posts'] = commands['writing'];
commands['blog'] = commands['writing'];
commands['email'] = commands['contact'];
commands['chat'] = commands['guestbook'];
commands['gb'] = commands['guestbook'];
commands['play'] = commands['wordle'];
commands['dog'] = commands['boogley'];
commands['sticker'] = commands['boogley'];
