// Cloudflare Worker Entrypoint with Static Assets
import { handleChat, type Env } from './chat';

export type { Env };

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // API route handling
    if (url.pathname === '/api/chat') {
      return handleChat(request, env);
    }

    // Serve static assets from ./dist
    if (!env.ASSETS) {
      return new Response('Assets binding not configured', { status: 500 });
    }

    return env.ASSETS.fetch(request);
  },
};
