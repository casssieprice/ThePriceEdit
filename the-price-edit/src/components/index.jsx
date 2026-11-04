import { useCallback, useState } from 'react';
import { Link, Media, T, has, tones, toneCycle, useKey } from '../lib.jsx';
import { site } from '../content/site.js';

/* ── Navigation ── */
const navItems = [
  { to: '/work', label: 'Work' },
  { to: '/capstone', label: 'Capstone' },
  { to: '/about', label: 'About' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' },
];

export function Nav({ path }) {
  return (
    <nav aria-label="Main" className="relative z-40 bg-ink text-cream">
      <div className="wrap flex min-h-[60px] flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2">
        <Link to="/" aria-current={path === '/' ? 'page' : undefined} className="font-serif text-[24px] text-cream no-underline hover:text-rose">
          {site.first} {site.last}
        </Link>
        <ul className="m-0 flex list-none flex-wrap gap-x-[clamp(16px,3vw,40px)] gap-y-0 p-0 text-[12px] font-medium uppercase tracking-[0.2em]">
          {navItems.map((n) => {
            const active = path === n.to || (n.to === '/work' && path.startsWith('/work/'));
            return (
              <li key={n.to}>
                <Link to={n.to} aria-current={active ? 'page' : undefined} className={'ul inline-block py-3 ' + (active ? 'text-rose' : 'text-cream')}>
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

/* ── Footer ── */
export function Footer() {
  return (
    <footer className="relative border-t border-ink">
      <div className="wrap flex flex-wrap items-end justify-between gap-8 pt-[72px] pb-10">
        <Link to="/contact" className="font-serif text-[clamp(52px,8vw,120px)] leading-[0.95] tracking-[-0.03em] no-underline">
          Let&rsquo;s make <i className="text-berry">something</i> &rarr;
        </Link>
        <div className="flex flex-col gap-2 font-mono text-[12px] tracking-[0.06em]">
          <a href={`mailto:${site.email}`} className="ul">{site.email}</a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="ul uppercase tracking-[0.1em]">LinkedIn</a>
          {has(site.instagram) && (
            <a href={site.instagram} target="_blank" rel="noreferrer" className="ul uppercase tracking-[0.1em]">Instagram</a>
          )}
          <Link to="/resume" className="ul uppercase tracking-[0.1em]">Resume</Link>
        </div>
      </div>
      <div className="wrap flex flex-wrap justify-between gap-2 border-t border-stone py-4 label-sm text-muted">
        <span>© {new Date().getFullYear()} {site.first} {site.last} · {site.brand}</span>
        <span>{site.school} · Class of {site.classOf}</span>
      </div>
    </footer>
  );
}

/* ── Paper grain overlay ── */
export function Grain() {
  return (
    <svg className="grain" aria-hidden="true">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" opacity="0.5" />
    </svg>
  );
}

/* ── Section heading: big serif with an italic berry word ── */
export function SectionHead({ id, num, lead, accent, right, dark = false, as: Tag = 'h2', size = 'clamp(44px,5vw,72px)' }) {
  return (
    <div className={'flex flex-wrap items-baseline justify-between gap-3 border-t pt-[18px] ' + (dark ? 'border-cream' : 'border-ink')}>
      <Tag id={id} className="m-0 font-serif font-normal leading-none" style={{ fontSize: size }}>
        {num && <span className={'mr-2 align-top font-mono text-[12px] ' + (dark ? 'text-rose' : 'text-berry')}>{num}</span>}
        {lead} {accent && <i className={dark ? 'text-rose' : 'text-berry'}>{accent}</i>}
      </Tag>
      {right}
    </div>
  );
}

/* ── Index list with hover preview ── */
export function ProjectIndex({ projects }) {
  const [active, setActive] = useState(0);
  const href = (p) => (p.capstone ? '#capstone' : `#work/${p.slug}`);
  return (
    <div className="flex flex-wrap items-start gap-12">
      <div className="min-w-0 flex-[999_1_560px] border-b border-stone">
        <div className="row hidden desk:grid py-2.5 label-sm text-muted" style={{ borderTopColor: '#1E1B1A' }} aria-hidden="true">
          <span>No.</span><span>Project</span><span>Discipline</span><span>Year</span><span />
        </div>
        {projects.map((p, i) => (
          <a key={p.slug} href={href(p)} className="row" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
            <span className="font-mono text-[12px]">{String(i + 1).padStart(2, '0')}</span>
            <span className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1.5">
              <span className="row-title font-serif text-[clamp(28px,3.2vw,46px)] leading-[1.05]">
                <T v={p.title} label={p.capstone ? 'Capstone title' : 'Project title'} />
              </span>
              {p.capstone && <span className="rounded-full border border-berry px-2.5 py-1 label-sm text-berry">Capstone</span>}
            </span>
            <span className="row-meta label text-berry">{p.category} — {p.kind}</span>
            <span className="row-meta font-mono text-[12px]"><T v={p.year} label="Year" /></span>
            <span className="row-arrow text-[22px]" aria-hidden="true">&rarr;</span>
          </a>
        ))}
      </div>
      <div className="sticky top-6 hidden min-w-0 flex-[1_1_340px] desk:block">
        <div className="relative aspect-[4/5] overflow-hidden border border-ink bg-cream">
          {projects.map((p, i) => {
            const c = tones[p.tone] || tones.rose;
            return (
              <div key={p.slug} className="layer" style={{ background: c.bg, clipPath: i === active ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }} aria-hidden={i !== active}>
                {p.cover && <img src={p.cover} alt="" className="absolute inset-0 h-full w-full object-cover" />}
                {!p.cover && <span className="label-sm absolute left-3.5 top-3.5" style={{ color: c.ink }}>Fig. {String(i + 1).padStart(2, '0')} — [Project image]</span>}
                <span className="absolute bottom-3 left-3.5 font-serif text-[40px] italic" style={{ color: p.cover ? '#F7F3ED' : c.ink, textShadow: p.cover ? '0 1px 18px rgba(0,0,0,.35)' : 'none' }}>{p.category}</span>
              </div>
            );
          })}
        </div>
        <Link to="/work" className="ul cta mt-3.5">See the full archive &rarr;</Link>
      </div>
    </div>
  );
}

/* ── Archive card ── */
export function ArchiveCard({ p, num, span, h, mt }) {
  const href = p.capstone ? '#capstone' : `#work/${p.slug}`;
  const c = tones[p.tone] || tones.rose;
  return (
    <a href={href} className="card" style={{ '--span': span, '--mt': `${mt}px` }}>
      <Media src={p.cover} alt={p.coverAlt || ''} tone={p.tone} className="card-media" imgClassName="zoom" >
        <div className="card-h" style={{ '--h': `${h}px` }} />
        {!p.cover && <span className="label-sm absolute left-3.5 bottom-3.5" style={{ color: c.ink }}>Fig. {num} — [Project image]</span>}
        {p.capstone && <span className="label-sm absolute right-3.5 top-3.5 rounded-full bg-ink px-3 py-1.5 text-cream">★ Capstone</span>}
      </Media>
      <span className="stamp absolute -mt-[18px] ml-4 rounded-md border border-berry bg-cream px-3 py-1.5 label-sm tracking-[0.16em] text-berry">{p.category}</span>
      <div className="mt-[30px] flex items-baseline justify-between gap-4">
        <span className="card-title font-serif text-[36px] leading-[1.05]"><T v={p.title} label={p.capstone ? 'Capstone title' : 'Project title'} /></span>
        <span className="whitespace-nowrap font-mono text-[11px]">No. {num}</span>
      </div>
      <span className="mt-1.5 block text-[14px] text-muted">{p.kind} · <T v={p.year} label="Year" /></span>
    </a>
  );
}

/* ── Continuous photo loop ── */
export function PhotoLoop({ photos, count, placeholderCount, href = '#capstone' }) {
  const ratios = ['4 / 5', '3 / 2', '2 / 3', '1 / 1', '4 / 5', '3 / 4'];
  const items = (photos.length ? photos.slice(0, count) : Array.from({ length: Math.min(count, placeholderCount) }, () => ({}))).map((p, i) => ({
    ...p,
    n: String(i + 1).padStart(3, '0'),
    ratio: p.src ? '4 / 5' : ratios[i % 6],
    tone: toneCycle[i % 6],
  }));
  const doubled = [...items, ...items];
  return (
    <div className="loopwrap overflow-hidden">
      <div className="loop">
        {doubled.map((p, i) => {
          const c = tones[p.tone];
          return (
            <a key={i} href={href} className="lp" aria-hidden={i >= items.length} tabIndex={i >= items.length ? -1 : undefined} aria-label={`Capstone photo ${p.n} — open the gallery`} style={{ height: 'clamp(220px,24vw,340px)', aspectRatio: p.ratio, background: c.bg }}>
              {p.src ? <img src={p.src} alt={p.alt || ''} loading="lazy" className="h-full w-full object-cover" /> : <span className="absolute bottom-2 left-2.5 font-mono text-[9px] tracking-[0.12em]" style={{ color: c.ink }}>{p.n}</span>}
            </a>
          );
        })}
      </div>
    </div>
  );
}

/* ── Lightbox ── */
export function Lightbox({ items, index, onClose, onIndex }) {
  const total = items.length;
  const prev = useCallback(() => onIndex((index + total - 1) % total), [index, total, onIndex]);
  const next = useCallback(() => onIndex((index + 1) % total), [index, total, onIndex]);
  const onKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    },
    [onClose, prev, next],
  );
  useKey(onKey, index >= 0);
  if (index < 0) return null;
  const cur = items[index];
  const c = tones[cur.tone] || tones.rose;
  const btn = 'min-h-12 min-w-12 cursor-pointer rounded-full border border-cream bg-transparent text-[15px] text-cream transition-colors hover:bg-cream hover:text-ink';
  return (
    <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[100] flex flex-col bg-[rgba(30,27,26,0.96)] text-cream" style={{ animation: 'fade .35s ease both' }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="flex items-center justify-between px-[clamp(16px,4vw,40px)] py-4 label">
        <span>Photo {cur.n} / {total}</span>
        <button type="button" className={btn} aria-label="Close photo viewer" onClick={onClose} autoFocus>✕</button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center gap-4 px-[clamp(8px,3vw,32px)] pb-8" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <button type="button" className={btn} aria-label="Previous photo" onClick={prev}>&larr;</button>
        {cur.src ? (
          <img src={cur.src} alt={cur.alt || ''} className="max-h-[80vh] max-w-[78vw] object-contain" />
        ) : (
          <div className="relative h-[min(78vh,900px)] max-w-[78vw]" style={{ aspectRatio: cur.ratio, background: c.bg }}>
            <span className="label-sm absolute bottom-2.5 left-3" style={{ color: c.ink }}>[Photo {cur.n}]</span>
          </div>
        )}
        <button type="button" className={btn} aria-label="Next photo" onClick={next}>&rarr;</button>
      </div>
    </div>
  );
}

/* ── Instagram post mock ── */
export function InstagramPost({ post, handle, tone, small = false }) {
  const c = tones[tone] || tones.rose;
  return (
    <div className={'post overflow-hidden bg-paper text-ink ' + (small ? 'rounded-[10px]' : 'rounded-xl border border-stone')}>
      <div className={'flex items-center gap-2 ' + (small ? 'px-2.5 py-2' : 'px-3 py-2.5')}>
        <span className={'rounded-full bg-berry ' + (small ? 'h-5 w-5' : 'h-7 w-7')} />
        <span className={'font-semibold ' + (small ? 'text-[11px]' : 'text-[13px]')}><T v={handle} label="@brand" /></span>
      </div>
      <div className="relative aspect-[4/5]" style={{ background: c.bg }}>
        {post?.src && <img src={post.src} alt={post.alt || 'Sample Instagram post'} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
      </div>
      <div className={'flex gap-3 ' + (small ? 'px-2.5 pb-1 pt-2' : 'px-3 pb-1 pt-2.5')} aria-hidden="true">
        <svg width={small ? 16 : 20} height={small ? 16 : 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
        <svg width={small ? 16 : 20} height={small ? 16 : 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>
        <svg width={small ? 16 : 20} height={small ? 16 : 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 3L11 13M22 3l-7 18-4-8-8-4z" /></svg>
      </div>
      <p className={'m-0 text-body ' + (small ? 'px-2.5 pb-2.5 text-[11px] leading-[1.4]' : 'px-3 pb-3.5 text-[13px] leading-normal')}>
        {!small && <strong className="text-ink"><T v={handle} label="@brand" /> </strong>}
        <T v={post?.caption} label="Caption" />
      </p>
    </div>
  );
}

/* ── Video: real embed when provided, poster otherwise ── */
export function VideoBlock({ video, href, big = false }) {
  const playSize = big ? 112 : 96;
  if (video.embed && !href) {
    return (
      <div className="relative aspect-video bg-ink">
        <iframe src={video.embed} title="Behind-the-scenes video" className="absolute inset-0 h-full w-full border-0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
      </div>
    );
  }
  const inner = (
    <>
      {video.poster && <img src={video.poster} alt={video.posterAlt || ''} className="zoom absolute inset-0 h-full w-full object-cover" />}
      <span className="label-sm absolute left-4 top-4 bg-cream px-2.5 py-1.5 text-ink">
        Behind the scenes · <T v={video.runtime} label="Runtime" />
      </span>
      <span className="vid-play absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-ink" style={{ width: `clamp(60px, 9vw, ${playSize}px)`, height: `clamp(60px, 9vw, ${playSize}px)` }}>
        <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
      </span>
      {!video.embed && !href && <span className="label-sm absolute bottom-3.5 left-4 bg-ink px-2.5 py-1.5 text-rose">Video coming soon</span>}
    </>
  );
  return href ? (
    <a href={href} className="vid feat aspect-video bg-smoke" aria-label="Watch the behind-the-scenes video">{inner}</a>
  ) : (
    <div className="vid feat aspect-video bg-smoke">{inner}</div>
  );
}
