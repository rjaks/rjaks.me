// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

/** @type {Array<{ id: string, nickname: string, message: string, created_at: number }>} */
const devMessages = [
  {
    id: 'genesis-001',
    nickname: 'rjaks',
    message: 'Welcome to my terminal guestbook! Leave a note or say hi.',
    created_at: Date.now() - 3600000,
  },
];

/** @returns {import('vite').Plugin} */
function devChatPlugin() {
  return {
    name: 'dev-chat-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');

        if (req.method === 'GET') {
          res.end(JSON.stringify({ ok: true, messages: devMessages }));
          return;
        }

        if (req.method === 'POST') {
          let bodyStr = '';
          req.on('data', (chunk) => {
            bodyStr += chunk;
          });
          req.on('end', () => {
            try {
              const body = JSON.parse(bodyStr || '{}');
              const nickname = (body.nickname || 'guest').trim().slice(0, 24);
              const message = (body.message || '').trim().slice(0, 280);

              if (!message) {
                res.statusCode = 400;
                res.end(JSON.stringify({ ok: false, error: 'Message cannot be empty' }));
                return;
              }

              const newMsg = {
                id: `dev-${Date.now()}`,
                nickname,
                message,
                created_at: Date.now(),
              };
              devMessages.push(newMsg);
              if (devMessages.length > 50) devMessages.shift();

              res.statusCode = 201;
              res.end(JSON.stringify({ ok: true, message: newMsg }));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ ok: false, error: 'Invalid JSON' }));
            }
          });
          return;
        }

        res.statusCode = 405;
        res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
      });
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://rjaks.me',
  output: 'static',
  redirects: {
    '/experience': '/work',
  },
  vite: {
    plugins: [tailwindcss(), devChatPlugin()],
  },
});
