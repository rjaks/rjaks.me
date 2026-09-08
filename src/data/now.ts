export interface NowItem {
  category: 'building' | 'working' | 'studying' | 'reading' | 'watching' | 'listening';
  label: string;
  detail?: string;
  link?: string;
}

export interface HobbyItem {
  title: string;
  description: string;
  link?: string;
  linkLabel?: string;
}

export const nowItems: NowItem[] = [
  {
    category: 'building',
    label: 'Modern developer tooling & terminal portfolio experiences',
    detail: 'Astro, TypeScript, Tailwind CSS',
    link: 'https://github.com/rjaks/rjaks.me'
  },
  {
    category: 'studying',
    label: 'Computer Science & Distributed Systems',
    detail: 'Algorithmic efficiency and low-latency services'
  },
  {
    category: 'reading',
    label: 'Designing Data-Intensive Applications',
    detail: 'by Martin Kleppmann',
    link: 'https://www.goodreads.com/book/show/17347634-designing-data-intensive-applications'
  },
  {
    category: 'watching',
    label: 'Sci-fi cinema & technical conference keynotes',
    detail: 'Letterboxd diary',
    link: 'https://letterboxd.com'
  },
  {
    category: 'listening',
    label: 'Late-night lofi & ambient synthwave coding sessions',
    detail: 'Spotify focus playlists'
  }
];

export const hobbies: HobbyItem[] = [
  {
    title: 'Open Source Exploration',
    description: 'Tinkering with CLI utilities, experimental JavaScript runtimes, and contributing to developer ecosystem tools.',
    link: 'https://github.com/rjaks',
    linkLabel: 'GitHub Activity'
  },
  {
    title: 'Coffee & Late Night Hacking',
    description: 'Dialing in espresso beans while debugging race conditions and optimizing core web vitals.'
  }
];
