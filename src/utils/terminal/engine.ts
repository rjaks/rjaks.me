/**
 * src/utils/terminal/engine.ts
 * The browser-side REPL: echoes prompts, runs commands, renders output,
 * handles tab-completion, history, boot animation and the matrix easter egg.
 */
import { navigate } from 'astro:transitions/client';
import { BOOT_LINES, MOTD, MOTD_SHORT } from '../../data/terminalContent';
import {
  buildFs,
  HOME,
  listDir,
  prettyPath,
  resolvePath,
  type FsPayload,
  type TermLine,
  type Tone,
} from './fs';
import { parseCommandLine } from './parse';
import { commands, type CmdCtx, type ShellState } from './commands';

export interface TerminalElements {
  dialog: HTMLDialogElement;
  scrollback: HTMLElement;
  input: HTMLInputElement;
  prompt: HTMLElement;
}

export interface TerminalHandle {
  boot: () => void;
  focus: () => void;
}

const HISTORY_KEY = 'rjaks_terminal_history';
const SEEN_KEY = 'rjaks_terminal_seen';
const ALPHABET = 'アカサタナハマヤラワ0123456789ABCDEF';

function loadHistory(): string[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveHistory(list: string[]): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(-100)));
  } catch {
    /* storage unavailable */
  }
}

function commonPrefix(items: string[]): string {
  let prefix = items[0] ?? '';
  for (const item of items) {
    while (prefix && !item.startsWith(prefix)) prefix = prefix.slice(0, -1);
    if (!prefix) break;
  }
  return prefix;
}

export function createTerminal(els: TerminalElements, payload: FsPayload): TerminalHandle {
  const { dialog, scrollback, input, prompt } = els;
  const fs = buildFs(payload);
  const state: ShellState = { cwd: HOME, prevCwd: HOME, bootedAt: Date.now() };

  let history = loadHistory();
  let histIndex = history.length;
  let draft = '';
  let matrix: { stop: () => void } | null = null;

  const reduceMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Rendering ──────────────────────────────────────────────────────── */

  function scrollToBottom(): void {
    scrollback.scrollTop = scrollback.scrollHeight;
  }

  function renderLine(line: TermLine): HTMLElement {
    const row = document.createElement('div');
    row.className = 'term-line' + (line.tone ? ` term-tone-${line.tone}` : '');
    if (line.href) {
      const a = document.createElement('a');
      a.href = line.href;
      a.className = 'term-link';
      a.textContent = line.text;
      if (line.external) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      row.appendChild(a);
    } else {
      row.textContent = line.text === '' ? '\u00A0' : line.text;
    }
    return row;
  }

  function appendLines(lines: TermLine[]): void {
    if (!lines.length) return;
    const fragment = document.createDocumentFragment();
    for (const line of lines) fragment.appendChild(renderLine(line));
    scrollback.appendChild(fragment);
    scrollToBottom();
  }

  function echoCommand(raw: string): void {
    const row = document.createElement('div');
    row.className = 'term-line term-echo';

    const user = document.createElement('span');
    user.className = 'term-user';
    user.textContent = 'guest@rjaks';

    const path = document.createElement('span');
    path.className = 'term-path';
    path.textContent = `:${prettyPath(state.cwd)}`;

    const dollar = document.createElement('span');
    dollar.className = 'term-user';
    dollar.textContent = '$';

    const cmd = document.createElement('span');
    cmd.className = 'term-cmd';
    cmd.textContent = ` ${raw}`;

    row.append(user, path, dollar, cmd);
    scrollback.appendChild(row);
  }

  function updatePrompt(): void {
    prompt.textContent = `guest@rjaks:${prettyPath(state.cwd)}$`;
  }

  /* ── Command context ────────────────────────────────────────────────── */

  const ctx: CmdCtx = {
    fs,
    payload,
    state,
    print: (lines) => appendLines(typeof lines === 'string' ? [{ text: lines }] : lines),
    clear: () => scrollback.replaceChildren(),
    setCwd: (path) => {
      if (path === state.cwd) return;
      state.prevCwd = state.cwd;
      state.cwd = path;
      updatePrompt();
    },
    navigate: (path) => navigate(path),
    openUrl: (url) => window.open(url, '_blank', 'noopener,noreferrer'),
    openModal: (id) => {
      const el = document.getElementById(id) as HTMLDialogElement | null;
      if (!el) return;
      if (dialog.open) {
        dialog.close();
        window.setTimeout(() => {
          if (!el.open) el.showModal();
        }, 180);
      } else if (!el.open) {
        el.showModal();
      }
    },
    closeShell: () => dialog.close(),
    theme: {
      current: () => document.documentElement.getAttribute('data-accent') || 'amber',
      set: (name) => {
        if (name === 'amber') {
          document.documentElement.removeAttribute('data-accent');
          try {
            localStorage.removeItem('accent');
          } catch {
            /* noop */
          }
        } else {
          document.documentElement.setAttribute('data-accent', name);
          try {
            localStorage.setItem('accent', name);
          } catch {
            /* noop */
          }
        }
        return name;
      },
    },
    toggleMatrix: () => {
      if (matrix) {
        matrix.stop();
        matrix = null;
        return false;
      }
      return startMatrix();
    },
    history: () => history,
  };

  /* ── Execution ──────────────────────────────────────────────────────── */

  function pushHistory(cmd: string): void {
    if (history[history.length - 1] !== cmd) {
      history.push(cmd);
      if (history.length > 100) history.shift();
      saveHistory(history);
    }
    histIndex = history.length;
    draft = '';
  }

  function execute(raw: string): void {
    echoCommand(raw);
    const trimmed = raw.trim();
    if (!trimmed) {
      scrollToBottom();
      return;
    }
    pushHistory(trimmed);

    const statements = parseCommandLine(trimmed);
    const output: TermLine[] = [];

    for (const statement of statements) {
      let stdin: TermLine[] | null = null;
      for (const stage of statement.stages) {
        const [name, ...args] = stage.tokens;
        const fn = commands[name];
        if (!fn) {
          output.push({ text: `rjaks: command not found: ${name}`, tone: 'error' });
          output.push({ text: "type 'help' to see what's available", tone: 'muted' });
          stdin = null;
          break;
        }
        const result = fn(ctx, args, stdin);
        stdin = (result as TermLine[] | undefined) ?? [];
      }
      if (stdin && stdin.length) output.push(...stdin);
    }

    if (output.length) appendLines(output);
    else scrollToBottom();
  }

  /* ── History navigation ─────────────────────────────────────────────── */

  function navHistory(dir: number): void {
    if (!history.length) return;
    if (dir < 0) {
      if (histIndex === history.length) draft = input.value;
      histIndex = Math.max(0, histIndex - 1);
    } else {
      histIndex = Math.min(history.length, histIndex + 1);
    }
    input.value = histIndex === history.length ? draft : history[histIndex];
    requestAnimationFrame(() => input.setSelectionRange(input.value.length, input.value.length));
  }

  /* ── Tab completion ─────────────────────────────────────────────────── */

  function pathCandidates(token: string): string[] {
    const slash = token.lastIndexOf('/');
    const dirPart = slash >= 0 ? token.slice(0, slash + 1) : '';
    const dirPath = resolvePath(state.cwd, dirPart || '.');
    const entries = listDir(fs, dirPath);
    if (!entries) return [];
    return entries.map((e) => `${dirPart}${e.name}${e.type === 'dir' ? '/' : ''}`);
  }

  function applyCompletion(prefix: string, candidates: string[]): void {
    const matches = candidates.filter((c) => c.startsWith(prefix)).sort();
    if (!matches.length) return;
    const completion = matches.length === 1 ? matches[0] : commonPrefix(matches);
    const value = input.value;
    const index = value.lastIndexOf(prefix);
    input.value = value.slice(0, index) + completion;
    if (matches.length > 1 && completion === prefix) {
      appendLines([{ text: matches.join('   '), tone: 'muted' }]);
    }
    requestAnimationFrame(() => input.setSelectionRange(input.value.length, input.value.length));
  }

  function complete(): void {
    const value = input.value;
    const endsWithSpace = /\s$/.test(value);
    if (value.trim() && !value.includes(' ') && !endsWithSpace) {
      const names = Object.keys(commands).filter((k) => !k.startsWith(':')).sort();
      applyCompletion(value, names);
      return;
    }
    const lastToken = endsWithSpace ? '' : value.slice(value.lastIndexOf(' ') + 1);
    applyCompletion(lastToken, pathCandidates(lastToken));
  }

  /* ── Matrix easter egg ──────────────────────────────────────────────── */

  function startMatrix(): boolean {
    const canvas = document.createElement('canvas');
    canvas.className = 'term-matrix';
    dialog.appendChild(canvas);
    const context = canvas.getContext('2d');
    if (!context) {
      canvas.remove();
      return false;
    }

    const fontSize = 14;
    let columns = 1;
    let drops: number[] = [];

    const resize = (): void => {
      canvas.width = dialog.clientWidth;
      canvas.height = dialog.clientHeight;
      columns = Math.max(1, Math.floor(canvas.width / fontSize));
      drops = new Array(columns).fill(0).map(() => Math.random() * -50);
    };
    resize();

    let raf = 0;
    let last = 0;
    let stopped = false;

    const draw = (t: number): void => {
      if (stopped) return;
      raf = requestAnimationFrame(draw);
      if (t - last < 55) return;
      last = t;
      context.fillStyle = 'rgba(0, 0, 0, 0.08)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#22c55e';
      context.font = `${fontSize}px monospace`;
      for (let i = 0; i < columns; i++) {
        const glyph = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        context.fillText(glyph, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    raf = requestAnimationFrame(draw);

    const timeout = window.setTimeout(() => {
      if (matrix) {
        matrix.stop();
        matrix = null;
      }
    }, 15000);

    matrix = {
      stop: () => {
        stopped = true;
        cancelAnimationFrame(raf);
        window.clearTimeout(timeout);
        window.removeEventListener('resize', resize);
        canvas.remove();
      },
    };
    window.addEventListener('resize', resize);
    return true;
  }

  /* ── Input handling ─────────────────────────────────────────────────── */

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = input.value;
      input.value = '';
      execute(value);
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      navHistory(-1);
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      navHistory(1);
      return;
    }
    if (event.key === 'Tab') {
      event.preventDefault();
      complete();
      return;
    }
    if (event.key.toLowerCase() === 'l' && event.ctrlKey) {
      event.preventDefault();
      ctx.clear();
      return;
    }
    if (event.key.toLowerCase() === 'c' && event.ctrlKey) {
      event.preventDefault();
      appendLines([{ text: '^C', tone: 'muted' }]);
      input.value = '';
    }
  });

  scrollback.addEventListener('click', (event) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    if ((event.target as HTMLElement).closest('a')) return;
    input.focus();
  });

  dialog.addEventListener('close', () => {
    if (matrix) {
      matrix.stop();
      matrix = null;
    }
  });

  /* ── Boot ───────────────────────────────────────────────────────────── */

  function boot(): void {
    updatePrompt();
    if (dialog.dataset.booted === 'true') return;
    dialog.dataset.booted = 'true';

    if (sessionStorage.getItem(SEEN_KEY) === '1') {
      appendLines([{ text: MOTD_SHORT, tone: 'muted' }]);
      return;
    }
    sessionStorage.setItem(SEEN_KEY, '1');

    const motd = MOTD.map<TermLine>((text, i) => ({ text, tone: (i === 0 ? 'accent' : 'muted') as Tone }));

    if (reduceMotion()) {
      appendLines(BOOT_LINES.map<TermLine>((text) => ({ text, tone: 'muted' })));
      appendLines(motd);
      return;
    }

    let index = 0;
    const step = (): void => {
      if (index < BOOT_LINES.length) {
        appendLines([{ text: BOOT_LINES[index], tone: 'muted' }]);
        index += 1;
        window.setTimeout(step, 110);
      } else {
        appendLines(motd);
      }
    };
    step();
  }

  return {
    boot,
    focus: () => input.focus(),
  };
}
