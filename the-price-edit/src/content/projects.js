// ─────────────────────────────────────────────────────────────
//  PROJECTS — one object per project. Add, remove or reorder freely.
//
//  slug       used in the link: #/work/<slug>  (lowercase, dashes)
//  category   one of the categories below (drives the archive tabs)
//  featured   true = shows in "Selected work" on the homepage
//  cover      'images/your-file.jpg' (put the file in /public/images)
//  tone       placeholder colour until a cover exists:
//             rose | stone | ink | smoke | berry | blush | taupe
//  sections   blocks shown on the project page, in order:
//             { type: 'text', heading, body }
//             { type: 'image', src, alt, caption }
//             { type: 'gallery', images: [{ src, alt }] }
//             { type: 'video', embed: 'https://player.vimeo.com/video/…' }
//             { type: 'audio', embed: 'https://open.spotify.com/embed/…' }
//             { type: 'quote', text, source }
//             { type: 'link', label, href }
//  results    only real, verifiable outcomes — leave [] if none
//
//  null values show as [placeholders] until you fill them in.
// ─────────────────────────────────────────────────────────────

export const categories = ['Journalism', 'Marketing', 'Photography', 'Video', 'Podcast', 'Multimedia'];

export const projects = [
  {
    slug: 'capstone',
    capstone: true, // the capstone links to its own page (#/capstone)
    featured: true,
    title: null,
    category: 'Multimedia',
    kind: 'Senior capstone',
    year: null,
    cover: 'images/cap-onset-wide.jpg',
    coverAlt: 'Cassandra photographing two models beside a collapsed barn',
    tone: 'rose',
  },
  {
    slug: 'project-photography',
    featured: true,
    title: null,
    category: 'Photography',
    kind: 'Editorial shoot',
    year: null,
    cover: null,
    tone: 'rose',
    summary: null,
    role: null,
    context: null,
    tools: [],
    sections: [],
    results: [],
  },
  {
    slug: 'project-journalism',
    featured: true,
    title: null,
    category: 'Journalism',
    kind: 'Feature story',
    year: null,
    cover: null,
    tone: 'stone',
    summary: null,
    role: null,
    context: null,
    tools: [],
    sections: [],
    results: [],
  },
  {
    slug: 'project-marketing',
    featured: true,
    title: null,
    category: 'Marketing',
    kind: 'Brand campaign',
    year: null,
    cover: null,
    tone: 'ink',
    summary: null,
    role: null,
    context: null,
    tools: [],
    sections: [],
    results: [],
  },
  {
    slug: 'project-video',
    featured: true,
    title: null,
    category: 'Video',
    kind: 'Short film',
    year: null,
    cover: null,
    tone: 'smoke',
    summary: null,
    role: null,
    context: null,
    tools: [],
    sections: [],
    results: [],
  },
  {
    slug: 'project-podcast',
    featured: true,
    title: null,
    category: 'Podcast',
    kind: 'Episode',
    year: null,
    cover: null,
    tone: 'berry',
    summary: null,
    role: null,
    context: null,
    tools: [],
    sections: [],
    results: [],
  },
  {
    slug: 'project-social',
    featured: false,
    title: null,
    category: 'Marketing',
    kind: 'Social content',
    year: null,
    cover: null,
    tone: 'stone',
    summary: null,
    role: null,
    context: null,
    tools: [],
    sections: [],
    results: [],
  },
];
