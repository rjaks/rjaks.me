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
    title: "Apex Workflow",
    description: "A fast, privacy-focused task management system engineered with minimal footprint, intuitive keyboard shortcuts, and real-time offline sync.",
    tags: ["Astro", "TypeScript", "TailwindCSS"],
    link: "#",
    github: "#",
    featured: true
  },
  {
    title: "Lumina Engine",
    description: "High-performance vector rendering canvas library designed for generative algorithmic art and dynamic interactive visualizations.",
    tags: ["React", "WebGL", "TypeScript"],
    link: "#",
    github: "#",
    featured: true
  },
  {
    title: "Kona Cache",
    description: "Lightweight, in-memory distributed key-value store crafted for low-latency edge computing workloads and event streams.",
    tags: ["Go", "gRPC", "Docker"],
    link: "#",
    github: "#",
    featured: true
  },
  {
    title: "Echo Metrics",
    description: "Telemetry and observability dashboard providing real-time log ingestion, alert dispatching, and custom health query visualizers.",
    tags: ["Node.js", "PostgreSQL", "Next.js"],
    link: "#",
    github: "#",
    featured: false
  },
  {
    title: "Solace Audio",
    description: "Ambient audio synthesizer web workstation featuring modular DSP patch nodes and customized waveform automation curves.",
    tags: ["Web Audio API", "Svelte", "Vite"],
    link: "#",
    github: "#",
    featured: false
  },
  {
    title: "Velox CLI",
    description: "Modern command-line developer suite providing project scaffolding, automated git worktree switching, and env orchestration.",
    tags: ["Rust", "Clap", "Linux"],
    link: "#",
    github: "#",
    featured: false
  }
];
