// Cloudflare Worker: Community Chat API Handler
export interface Env {
  ASSETS?: {
    fetch: (request: Request | string) => Promise<Response>;
  };
  DB?: {
    prepare: (query: string) => {
      bind: (...args: any[]) => {
        all: <T = any>() => Promise<{ results: T[] }>;
        first: <T = any>() => Promise<T | null>;
        run: () => Promise<{ success: boolean }>;
      };
    };
  };
  IP_SALT?: string;
}

export interface MessageRow {
  id: string;
  nickname: string;
  message: string;
  created_at: number;
}

const memoryStore: MessageRow[] = [
  {
    id: 'welcome-1',
    nickname: 'rjaks',
    message: 'Welcome to my terminal guestbook! Leave a note, ask a question, or just say hi.',
    created_at: Date.now() - 3600000,
  },
];

// Strip unprintable control characters, preserving normal text and newlines
export function sanitizeText(str: string): string {
  return str.replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F-\u009F]/g, '');
}

export async function hashIp(ip: string, salt: string = 'salt_'): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(`${salt}${ip}`);
  const hashBuf = await crypto.subtle.digest('SHA-256', data);
  const hashArr = Array.from(new Uint8Array(hashBuf));
  return hashArr.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function handleGetChat(env: Env): Promise<Response> {
  try {
    if (env.DB) {
      const { results } = await env.DB.prepare(
        'SELECT id, nickname, message, created_at FROM messages ORDER BY created_at DESC LIMIT 50'
      )
        .bind()
        .all<MessageRow>();

      const chronological = (results || []).slice().reverse();
      return new Response(JSON.stringify({ ok: true, messages: chronological }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      });
    }

    return new Response(JSON.stringify({ ok: true, messages: memoryStore, fallback: true }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ ok: false, error: error?.message || 'Failed to fetch messages' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function handlePostChat(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { nickname, message, honeypot } = body as {
      nickname?: string;
      message?: string;
      honeypot?: string;
    };

    // Honeypot spam trap
    if (honeypot && honeypot.trim().length > 0) {
      return new Response(JSON.stringify({ ok: false, error: 'Spam detected' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let cleanNick = sanitizeText((nickname || 'guest').trim().slice(0, 24));
    if (!cleanNick) cleanNick = 'guest';

    const rawMessage = (message || '').trim();
    if (!rawMessage) {
      return new Response(JSON.stringify({ ok: false, error: 'Message cannot be empty' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (rawMessage.length > 280) {
      return new Response(JSON.stringify({ ok: false, error: 'Message exceeds 280 characters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const cleanMessage = sanitizeText(rawMessage);
    const clientIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || '127.0.0.1';
    const ipHash = await hashIp(clientIp, env.IP_SALT || 'salt_');
    const now = Date.now();
    const id = crypto.randomUUID();

    if (env.DB) {
      const recent = await env.DB.prepare(
        'SELECT created_at FROM messages WHERE ip_hash = ? AND created_at > ? LIMIT 1'
      )
        .bind(ipHash, now - 10000)
        .first<{ created_at: number }>();

      if (recent) {
        return new Response(
          JSON.stringify({ ok: false, error: 'Slow down! Please wait 10 seconds between messages.' }),
          {
            status: 429,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      await env.DB.prepare(
        'INSERT INTO messages (id, nickname, message, created_at, ip_hash) VALUES (?, ?, ?, ?, ?)'
      )
        .bind(id, cleanNick, cleanMessage, now, ipHash)
        .run();
    } else {
      memoryStore.push({
        id,
        nickname: cleanNick,
        message: cleanMessage,
        created_at: now,
      });
      if (memoryStore.length > 50) memoryStore.shift();
    }

    return new Response(
      JSON.stringify({
        ok: true,
        message: {
          id,
          nickname: cleanNick,
          message: cleanMessage,
          created_at: now,
        },
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ ok: false, error: error?.message || 'Failed to post message' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function handleChat(request: Request, env: Env): Promise<Response> {
  if (request.method === 'GET') {
    return handleGetChat(env);
  }
  if (request.method === 'POST') {
    return handlePostChat(request, env);
  }
  return new Response(JSON.stringify({ ok: false, error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
}
