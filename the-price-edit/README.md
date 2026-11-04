# The Price Edit — portfolio of Cassandra Price

React + Tailwind CSS (v4) + Vite. Every word, photo and project lives in
`src/content/`, so you can update the site without touching the design.

## Run it on your computer

1. Install [Node.js](https://nodejs.org) (the LTS version).
2. In this folder, run:
   ```
   npm install
   npm run dev
   ```
3. Open the address it prints (usually http://localhost:5173).

## Put it online (free)

**Netlify, no coding needed:** run `npm run build`, then drag the `dist`
folder onto https://app.netlify.com/drop.

**Vercel or Netlify from GitHub (updates automatically):** push this folder
to a GitHub repo, import it on vercel.com or netlify.com, keep the defaults
(build `npm run build`, output `dist`). Add your own domain in the host's
settings (for example `thepriceedit.com`).

The site uses hash links (`#/work`), so it works on any host with no extra
setup.

## Editing content

| What | Where |
| --- | --- |
| Name, tagline, email, LinkedIn, Instagram, hero photos | `src/content/site.js` |
| About page text, experience, interests | `src/content/site.js` → `about` |
| Resume | `src/content/site.js` → `resume` |
| Projects (archive + Selected work) | `src/content/projects.js` |
| Capstone (photos, logo, Instagram posts, video) | `src/content/capstone.js` |

- Anything set to `null` shows as a dimmed **[placeholder]** until filled in.
- Put images in `public/images/` and refer to them as `'images/file.jpg'`.
- **Selected work** on the homepage shows every project with `featured: true`.
- **Capstone photos:** add files to `public/images/capstone/` and list them in
  `photos`. The first `loopCount` play in the homepage strip; all appear in the
  gallery. Export them at about 2000px on the long edge so the page stays fast.
- **Video:** paste the player URL into `video.embed`
  (Vimeo: `https://player.vimeo.com/video/ID`, YouTube: `https://www.youtube.com/embed/ID`).
- **Resume PDF:** put `resume.pdf` in `public/` and set `resumePdf: 'resume.pdf'`.
  Until then, the button uses the browser's "Save as PDF".
- **Contact form:** it opens the visitor's email app with the letter filled in.
  To receive messages directly instead, create a free form at formspree.io and
  post the form to it in `src/pages/Contact.jsx`.

## Design system

Colors, fonts and the breakpoint are tokens at the top of `src/styles.css`
(cream `#F7F3ED`, ink `#1E1B1A`, berry `#9E315C`, rose `#DFA0B6`,
stone `#CFC8C0`; Instrument Serif, Inter Tight, IBM Plex Mono, Homemade Apple).

Animations (page transitions, scroll reveals, mouse parallax, the photo loop)
are built with CSS and small hooks in `src/lib.jsx`, and all respect
"reduce motion". To use Motion for React later: `npm install motion` and swap
`Reveal` / `useParallax` for `motion` components.

`scripts/build-offline.mjs` is only a fallback build used to make the preview;
normally use `npm run build`.
