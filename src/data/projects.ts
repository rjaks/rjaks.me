export interface Project {
  title: string;
  description: string;
  summary?: string;
  tags: string[];
  link?: string;
  github?: string;
  featured: boolean;
  image?: string;
  imageAlt?: string;
}

export const projects: Project[] = [
  {
    title: "ThePILLARS Publication",
    description: "Official web publication platform for Ateneo de Naga University's student publication. Spearheaded platform architecture and full-stack edge rebuild using Nuxt and Cloudflare serverless primitives (D1, KV, R2, Pages) with Prisma ORM, serving 4,500+ monthly readers with 100% uptime during high-traffic events.",
    summary: "Official university publication platform serving 4.5k+ monthly readers. Built with Nuxt, Prisma, and Cloudflare edge primitives.",
    tags: ["Nuxt", "Vue", "TypeScript", "Cloudflare", "Prisma", "KV", "R2", "Pages", "TailwindCSS"],
    link: "https://thepillarspub.com",
    featured: true,
    image: "/images/projects/thepillars.png",
    imageAlt: "ThePILLARS Publication editorial and journalism web portal"
  },
  {
    title: "PokéBase",
    description: "Refined Pokédex web application featuring lightning-fast search across 1,000+ Pokémon. Includes comprehensive base stats, weakness analyses, dual-type matchups, and interactive evolution chain trees.",
    summary: "Lightning-fast Pokédex web app with real-time search, stats, and evolution trees. Built with Nuxt, TypeScript, and PokéAPI.",
    tags: ["Nuxt", "TypeScript", "TailwindCSS", "PokéAPI"],
    link: "https://pokebase-orpin.vercel.app/",
    github: "https://github.com/rjaks/pokebase",
    featured: true,
    image: "/images/projects/pokebase.png",
    imageAlt: "PokéBase clean Pokédex application interface"
  },
  {
    title: "Tradejaks",
    description: "Real-time market intelligence Discord bot and analytics system integrating TwelveData and Binance APIs to deliver instant crypto and equity trading signals, technical indicators, and automated order book streaming.",
    summary: "Real-time market analytics and trading Discord bot delivering live indicators and signals. Built with TypeScript, Binance, and TwelveData APIs.",
    tags: ["TypeScript", "TwelveData API", "Binance API", "Discloud", "Discord.js"],
    github: "https://github.com/rjaks/tradejaks",
    featured: true,
    image: "/images/projects/tradejaks.png",
    imageAlt: "Tradejaks real-time market trading signals and Discord bot preview"
  },
  {
    title: "AdNUChess",
    description: "Real-time chess platform for internal university matches using a modern reactive web application stack with instantaneous peer matchmaking and live synchronization loops using reactive query states.",
    summary: "Real-time chess platform with instant matchmaking and live game sync. Built with Nuxt 4 and Convex.",
    tags: ["Nuxt 4", "Convex", "TailwindCSS"],
    link: "https://adnuchess.tech",
    featured: false,
    image: "/images/projects/adnuchess.png",
    imageAlt: "AdNUChess real-time interactive chess board and match interface preview"
  },
  {
    title: "Business Inventory Management System",
    description: "Full-stack inventory platform decoupling a React/Vite client from an edge API powered by Cloudflare Workers and Hono. Integrates TanStack for client-side state caching alongside Drizzle ORM querying serverless Cloudflare D1 for low-latency stock tracking.",
    summary: "Full-stack inventory system with low-latency edge stock tracking. Built with React, Hono, and Cloudflare D1.",
    tags: ["React", "Vite", "TanStack", "Hono", "Cloudflare Workers", "Drizzle", "D1"],
    featured: false,
    image: "/images/projects/inventory.svg",
    imageAlt: "Business Inventory Management System dashboard interface preview"
  }
];

