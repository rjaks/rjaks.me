export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    title: "Business Inventory Management System",
    description: "Full-stack inventory platform decoupling a React/Vite client from an edge API powered by Cloudflare Workers and Hono. Integrates TanStack for client-side state caching alongside Drizzle ORM querying serverless Cloudflare D1 for low-latency stock tracking.",
    tags: ["React", "Vite", "TanStack", "Hono", "Cloudflare Workers", "Drizzle", "D1"],
    featured: true
  },
  {
    title: "TradeJaks",
    description: "Automated market intelligence application integrating Binance API and TwelveData API for real-time crypto and equity market streams, with resilient background polling services.",
    tags: ["TypeScript", "TwelveData API", "Binance API", "Discloud"],
    github: "https://github.com/rjaks/tradejaks",
    featured: true
  },
  {
    title: "AdNUChess",
    description: "Real-time chess platform for internal university matches using a modern reactive web application stack with instantaneous peer matchmaking and live synchronization loops using reactive query states.",
    tags: ["Nuxt 4", "Convex", "TailwindCSS"],
    link: "https://adnuchess.tech",
    featured: true
  }
];
