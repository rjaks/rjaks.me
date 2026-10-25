/**
 * src/data/terminalContent.ts
 * Static text content for the interactive terminal (REPL) shell.
 * Dynamic content (projects, skills, experience, writing, now) is generated
 * at build time from the real data files — see src/utils/terminal/fs.ts.
 */

export interface HelpEntry {
  name: string;
  args?: string;
  desc: string;
  group: string;
}

/** Grouped command reference rendered by the `help` command. */
export const HELP: HelpEntry[] = [
  { group: 'Navigate', name: 'ls', args: '[path]', desc: 'list directory contents' },
  { group: 'Navigate', name: 'cd', args: '[path]', desc: 'change directory (~, .., -)' },
  { group: 'Navigate', name: 'pwd', desc: 'print working directory' },
  { group: 'Navigate', name: 'tree', args: '[path]', desc: 'print directory tree' },
  { group: 'Navigate', name: 'find', args: '<term>', desc: 'search files and contents' },
  { group: 'Navigate', name: 'grep', args: '<term> [path]', desc: 'search text (pipe-friendly)' },

  { group: 'Read', name: 'cat', args: '<file>', desc: 'print a file' },
  { group: 'Read', name: 'open', args: '<target>', desc: 'open a page or project' },
  { group: 'Read', name: 'about', desc: 'who is rjaks?' },
  { group: 'Read', name: 'projects', desc: 'list selected projects' },
  { group: 'Read', name: 'skills', desc: 'languages, frameworks & tools' },
  { group: 'Read', name: 'uses', desc: 'models, tooling & my setup' },
  { group: 'Read', name: 'experience', desc: 'work history' },
  { group: 'Read', name: 'writing', desc: 'recent blog posts' },
  { group: 'Read', name: 'now', desc: 'what I am up to lately' },
  { group: 'Read', name: 'contact', desc: 'how to reach me' },
  { group: 'Read', name: 'whoami', desc: 'a very short bio' },
  { group: 'Read', name: 'neofetch', desc: 'system-style info card' },

  { group: 'Shell', name: 'help', args: '[cmd]', desc: 'show this help' },
  { group: 'Shell', name: 'man', args: '<cmd>', desc: 'manual for a command' },
  { group: 'Shell', name: 'echo', args: '<text>', desc: 'print text back' },
  { group: 'Shell', name: 'history', desc: 'recent commands' },
  { group: 'Shell', name: 'theme', args: '[name]', desc: 'switch accent preset' },
  { group: 'Shell', name: 'clear', desc: 'clear the screen' },
  { group: 'Shell', name: 'exit', desc: 'close the shell' },

  { group: 'Play', name: 'guestbook', desc: 'open the community wall' },
  { group: 'Play', name: 'wordle', desc: 'play the daily mini-game' },
  { group: 'Play', name: 'matrix', desc: 'follow the white rabbit' },
  { group: 'Play', name: 'cowsay', args: '<text>', desc: 'a cow says something' },
  { group: 'Play', name: 'sudo', args: '<cmd>', desc: 'with great power…' },
  { group: 'Play', name: 'coffee', desc: 'brew a fresh cup' },
  { group: 'Play', name: 'dog', args: '[on|off]', desc: 'show or hide the dancing dog' },
];

/** Banner printed once per session when the shell boots. */
export const MOTD: string[] = [
  'rjaks.me interactive shell — v1.0.0',
  "type 'help' to see available commands, 'about' to meet the human.",
];

/** Short notice printed when the shell re-opens after the first boot. */
export const MOTD_SHORT = "rjaks shell ready. type 'help' for commands.";

/** Fake boot sequence for flavor (skipped under reduced motion). */
export const BOOT_LINES: string[] = [
  'booting rjaks-os 1.0.0 …',
  'mounting /dev/portfolio  ok',
  'loading edge runtime       ok',
  'starting interactive shell …',
];

/** A tidy ASCII mark used by `neofetch`. */
export const NEOFETCH_LOGO: string[] = [
  '        ▄▄▄▄▄▄▄        ',
  '      ▄█████████▄      ',
  '     ███  ███  ███     ',
  '     █████████████     ',
  '     ██ ███████ ██     ',
  '     █████████████     ',
  '      ▀█████████▀      ',
  '        ▀▀▀▀▀▀▀        ',
];

/** The `~/about.md` file body. */
export const ABOUT_MD = `# Adrian Reforsado (rjaks)

Software Engineer & CS Student.

I build fast, reliable software for real-world problems — mostly on the
web, often at the edge. I care about performance, clean interfaces, and
tools that feel good to use.

Currently:
  - Backend AI Engineer @ FlyRank AI
  - Senior Web Consultant @ ThePILLARS Publication

Off the terminal: hunting for new music, watching film, reading, and
tweaking my terminal (this one, for example).

try: projects · skills · experience · contact · writing`;

/** The welcome `~/README.md` file body. */
export const README_MD = `Welcome to the rjaks.me interactive shell.

This is a real (tiny) shell running entirely in your browser, wired to
the same data that powers the rest of this site. Poke around.

  ls                 list files here
  cd ~/projects      navigate the virtual filesystem
  cat about.md       read a file
  grep <tech>        find which projects use a tech
  open contact       jump to a real page
  help               show every command

Tip: press Tab to autocomplete, ↑ / ↓ to walk your history.
`;
