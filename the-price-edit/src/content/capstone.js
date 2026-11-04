// ─────────────────────────────────────────────────────────────
//  CAPSTONE — everything on the capstone page and the homepage
//  capstone section. null shows a [placeholder].
// ─────────────────────────────────────────────────────────────

export const capstone = {
  title: null, // e.g. 'Field Notes'
  brand: null, // the brand you covered
  course: null,
  semester: null, // e.g. 'Spring 2027'
  role: null,
  team: null,
  tools: null,
  made: 'Logo · photoshoot · Instagram content · BTS video',
  standfirst: null, // 1–2 sentences: what it is and why it matters
  brief: null,
  approach: null,
  outcome: null, // real results / feedback only
  note: null, // handwritten aside, e.g. 'my favourite shoot so far'

  hero: {
    src: 'images/cap-onset-wide.jpg',
    alt: 'Cassandra photographing two models, one in a flowing cream hooded gown, beside a collapsed barn in a golden field',
    caption: 'On set',
  },

  // Logo design. Put files in /public/images/capstone/
  logo: null, // e.g. { src: 'images/capstone/logo.svg', alt: '… logo' }
  logoReversed: null,
  logoSecondary: null,
  brandColors: [], // e.g. ['#1E1B1A', '#DFA0B6']
  logoNote: null,

  // THE SHOOT — list every photo. The first `loopCount` play in the
  // homepage strip; all of them appear in the capstone gallery.
  // e.g. { src: 'images/capstone/shoot-001.jpg', alt: 'Model in cream gown' }
  photos: [],
  placeholderPhotoCount: 100, // used only until photos are added
  loopCount: 16,

  // SAMPLE INSTAGRAM POSTS
  // e.g. { src: 'images/capstone/ig-1.jpg', caption: 'Your caption' }
  instagramHandle: null, // e.g. '@brand'
  instagram: [],
  placeholderPostCount: 6,

  // BEHIND-THE-SCENES VIDEO
  // embed: the player URL, e.g. 'https://player.vimeo.com/video/123456'
  //        or 'https://www.youtube.com/embed/VIDEO_ID'
  video: {
    embed: null,
    poster: 'images/cap-onset-wide.jpg',
    posterAlt: 'Behind the scenes of the capstone shoot',
    runtime: null, // e.g. '2:14'
    note: null,
  },
};
