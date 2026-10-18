/**
 * src/utils/terminal/parse.ts
 * Minimal shell-style parser: splits a line into statements (`&&`) made of
 * piped stages (`|`), each stage being a token list that respects quotes.
 */

export interface Stage {
  tokens: string[];
}

export interface Statement {
  stages: Stage[];
}

export function tokenize(input: string): string[] {
  const out: string[] = [];
  let cur = '';
  let quote: string | null = null;
  let has = false;

  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (quote) {
      if (c === quote) quote = null;
      else cur += c;
    } else if (c === '"' || c === "'") {
      quote = c;
      has = true;
    } else if (c === ' ' || c === '\t') {
      if (has || cur.length) {
        out.push(cur);
        cur = '';
        has = false;
      }
    } else {
      cur += c;
      has = true;
    }
  }

  if (has || cur.length) out.push(cur);
  return out;
}

export function parseCommandLine(input: string): Statement[] {
  const statements: Statement[] = [];
  let stages: Stage[] = [];
  let words: string[] = [];
  let cur = '';
  let quote: string | null = null;
  let has = false;

  const endWord = () => {
    if (has || cur.length) words.push(cur);
    cur = '';
    has = false;
  };

  const endStage = () => {
    endWord();
    if (words.length) stages.push({ tokens: words });
    words = [];
  };

  const endStatement = () => {
    endStage();
    if (stages.length) statements.push({ stages });
    stages = [];
  };

  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (quote) {
      if (c === quote) quote = null;
      else cur += c;
      has = true;
      continue;
    }
    if (c === '"' || c === "'") {
      quote = c;
      has = true;
      continue;
    }
    if (c === '|') {
      endStage();
      continue;
    }
    if (c === '&' && input[i + 1] === '&') {
      endStatement();
      i++;
      continue;
    }
    if (c === ' ' || c === '\t') {
      endWord();
      continue;
    }
    cur += c;
    has = true;
  }

  endStatement();
  return statements;
}
