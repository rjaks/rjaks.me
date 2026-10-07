// Cloudflare Pages Function: /api/chat
interface Env {
  DB?: {
    prepare: (query: string) => {
      bind: (...args: any[]) => {
        all: <T = any>() => Promise<{ results: T[] }>;
        first: <T = any>() => Promise<T | null>;
        run: () => Promise<{ success: boolean }>;
      };
    };
  };
}

interface MessageRow {
  id: string;
  nickname: string;
  message: string;
  created_at: number;
}

// In-memory fallback if D1 is not bound yet (e.g. during initial local dev)
const memoryStore: MessageRow[] = [
  {
    id: 'welcome-1',
    nickname: 'rjaks',
    message: 'Welcome to my terminal guestbook! Leave a note, ask a question, or just say hi.',
    created_at: Date.now() - 3600000,
  },
];

function sanitizeString(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function hashIp(ip: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(`salt_${ip}`);
  const hashBuf = await crypto.subtle.digest('SHA-256', data);
  const hashArr = Array.from(new Uint8Array(hashBuf));
  return hashArr.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const onRequestGet = async (context: { env: Env }) => {
  const { env } = context;

  try {
    if (env.DB) {
      const { results } = await env.DB.prepare(
        'SELECT id, nickname, message, created_at FROM messages ORDER BY created_at DESC LIMIT 50'
      )
        .bind()
        .all<MessageRow>();

      // Return chronological order (oldest to newest)
      const chronological = (results || []).slice().reverse();
      return new Response(JSON.stringify({ ok: true, messages: chronological }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      });
    }

    // Fallback if D1 is not attached
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
};

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

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

    // Bot detection via honeypot
    if (honeypot && honeypot.trim().length > 0) {
      return new Response(JSON.stringify({ ok: false, error: 'Spam detected' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Clean & validate nickname
    let cleanNick = (nickname || 'guest').trim().slice(0, 24);
    cleanNick = sanitizeString(cleanNick);
    if (!cleanNick) cleanNick = 'guest';

    // Clean & validate message
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

    const cleanMessage = sanitizeString(rawMessage);
    const clientIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || '127.0.0.1';
    const ipHash = await hashIp(clientIp);
    const now = Date.now();
    const id = crypto.randomUUID();

    if (env.DB) {
      // Rate limit check: max 1 message every 10 seconds per IP
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

      // Insert message
      await env.DB.prepare(
        'INSERT INTO messages (id, nickname, message, created_at, ip_hash) VALUES (?, ?, ?, ?, ?)'
      )
        .bind(id, cleanNick, cleanMessage, now, ipHash)
        .run();
    } else {
      // Memory store fallback
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
};
