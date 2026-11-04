// ─────────────────────────────────────────────────────────────
//  SITE DETAILS — edit anything here and the whole site updates.
//  Leave a value as null (or '') to show a [placeholder] / hide it.
// ─────────────────────────────────────────────────────────────

export const site = {
  first: 'Cassandra',
  last: 'Price',
  brand: 'The Price Edit',
  descriptor: 'A creative storyteller blending media, marketing & visual artistry',
  tagline: 'Good stories deserve good strategy.',
  classOf: '2027',
  school: 'Colorado State University',
  major: 'Journalism & Media Communications',
  location: null, // e.g. 'Fort Collins, CO'
  lookingFor:
    'Open to roles in marketing, advertising, social media and creative communications.',

  email: 'casssandraprice@gmail.com', // ← double-check the spelling
  linkedin: 'https://www.linkedin.com/in/cassandra-price-922566301',
  linkedinLabel: '/in/cassandra-price',
  instagram: null, // e.g. 'https://instagram.com/yourhandle'
  instagramLabel: null, // e.g. '@yourhandle'
  resumePdf: null, // put resume.pdf in /public and set this to 'resume.pdf'

  // Small handwritten notes. null hides them.
  heroNote: null, // e.g. 'hi, welcome in!'

  images: {
    cover: {
      src: 'images/hero-bookshop.jpg',
      alt: 'Cassandra Price reading a magazine in an orange velvet chair beside a bookshelf',
      caption: 'Cover, The Price Edit',
    },
    snapshot: {
      src: 'images/snap-camera.jpg',
      alt: 'Cassandra laughing with a blue point-and-shoot camera held to her eye',
      caption: 'behind the lens',
    },
    about: {
      src: 'images/about-onset.jpg',
      alt: 'Cassandra photographing two models beside a collapsed barn',
      caption: 'On set',
    },
  },
};

export const disciplines = [
  { label: 'Journalism', desc: 'Features & reporting' },
  { label: 'Marketing', desc: 'Social, PR & brand' },
  { label: 'Photography', desc: 'Editorial shoots' },
  { label: 'Video', desc: 'Short film' },
  { label: 'Podcast', desc: 'Audio storytelling' },
  { label: 'Multimedia', desc: 'Web & creative direction' },
];

// ABOUT PAGE — write in your own voice. null shows a placeholder.
export const about = {
  opening: null,
  paragraphs: [null, null],
  signature: null, // e.g. 'xo, Cassandra'
  disciplineNotes: {
    Journalism: null,
    Marketing: null,
    Photography: null,
    Video: null,
    Podcast: null,
    Multimedia: null,
  },
  experience: [
    // { role: 'Social Media Intern', org: 'Company', dates: 'May – Aug 2025' },
    { role: null, org: null, dates: null },
    { role: null, org: null, dates: null },
    { role: null, org: null, dates: null },
  ],
  interests: [
    // { src: 'images/interest-1.jpg', caption: 'film cameras' },
    { src: null, caption: null },
    { src: null, caption: null },
    { src: null, caption: null },
  ],
};

// RESUME PAGE
export const resume = {
  degree: null, // e.g. 'B.A.'
  graduation: '[Month] 2027',
  educationNotes: null, // minor, honors, coursework
  jobs: [
    // { role, org, dates, bullets: ['...', '...'] }
    { role: null, org: null, dates: null, bullets: [null, null] },
    { role: null, org: null, dates: null, bullets: [null, null] },
    { role: null, org: null, dates: null, bullets: [null, null] },
  ],
  leadership: [{ role: null, org: null, dates: null, note: null }],
  skills: [
    { group: 'Writing & reporting', items: [] },
    { group: 'Social & marketing', items: [] },
    { group: 'Visual & video', items: [] },
    { group: 'Audio & multimedia', items: [] },
  ],
  tools: [],
  awards: null,
};
