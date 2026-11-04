import { useMemo, useState } from 'react';
import { Link, Reveal, T, has, tones, toneCycle } from '../lib.jsx';
import { InstagramPost, Lightbox, SectionHead, VideoBlock } from '../components/index.jsx';
import { capstone as c } from '../content/capstone.js';

const ratios = ['4 / 5', '1 / 1', '2 / 3', '3 / 2', '4 / 5', '3 / 4'];

export default function Capstone() {
  const [limit, setLimit] = useState(24);
  const [open, setOpen] = useState(-1);

  const all = useMemo(() => {
    const src = c.photos.length ? c.photos : Array.from({ length: c.placeholderPhotoCount }, () => ({}));
    return src.map((p, i) => ({ ...p, n: String(i + 1).padStart(3, '0'), ratio: p.src ? null : ratios[(i * 7) % 6], tone: toneCycle[(i * 5 + Math.floor(i / 4)) % 6] }));
  }, []);
  const visible = all.slice(0, limit);
  const posts = c.instagram.length ? c.instagram : Array.from({ length: c.placeholderPostCount }, () => ({}));
  const postTones = ['rose', 'smoke', 'stone', 'berry', 'blush', 'ink'];
  const meta = [
    ['Brand', c.brand, 'Brand name'],
    ['Role', c.role, 'Your role'],
    ['Made', c.made, 'What you made'],
    ['Team', c.team, 'Collaborators or solo'],
    ['Tools', c.tools, 'Tools used'],
  ];

  return (
    <div className="wrap">
      <header className="pb-12 pt-[clamp(48px,6vw,88px)]">
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 label">
          <Link to="/work" className="ul">&larr; The archive</Link>
          <span className="text-berry">The cover story · Senior capstone</span>
          <span><T v={c.course} label="Course" /> · <T v={c.semester} label="Semester" /></span>
        </div>
        <h1 className="mb-0 mt-9 font-normal leading-[0.84]">
          {has(c.title) ? (
            <span className="rise block font-serif text-[clamp(72px,12vw,200px)] tracking-[-0.03em]">{c.title}</span>
          ) : (
            <span className="ph">
              <span className="rise block font-extrabold uppercase tracking-[-0.06em] text-[clamp(64px,12vw,190px)]">[Capstone</span>
              <span className="rise ml-[0.6em] block font-serif italic tracking-[-0.035em] text-berry text-[clamp(68px,12.5vw,200px)]" style={{ animationDelay: '.2s' }}>title]</span>
            </span>
          )}
        </h1>
        <div className="mt-12 flex flex-wrap items-start gap-x-16 gap-y-10">
          <p className="m-0 flex-[999_1_460px] font-serif text-[clamp(26px,2.4vw,34px)] leading-[1.25]">
            <T v={c.standfirst} label="Who the brand is, what you set out to do for them, and what you made." />
          </p>
          <dl className="m-0 grid flex-[1_1_320px] grid-cols-[100px_minmax(0,1fr)] text-[15px]">
            {meta.map(([k, v, l], i) => (
              <div key={k} className="contents">
                <dt className={'label-sm border-t py-[11px] text-berry ' + (i === 0 ? 'border-ink' : 'border-stone') + (i === meta.length - 1 ? ' border-b border-b-stone' : '')}>{k}</dt>
                <dd className={'m-0 border-t py-[11px] ' + (i === 0 ? 'border-ink' : 'border-stone') + (i === meta.length - 1 ? ' border-b border-b-stone' : '')}><T v={v} label={l} /></dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <figure className="m-0">
        <div className="wipe relative h-[clamp(320px,46vw,680px)] overflow-hidden bg-ink">
          <img src={c.hero.src} alt={c.hero.alt} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: '50% 40%' }} />
          <span className="label-sm absolute left-4 top-4 bg-cream px-2.5 py-1.5">Fig. 01 — {c.hero.caption}</span>
        </div>
      </figure>

      <section aria-labelledby="cs-brief" className="pt-[clamp(80px,9vw,130px)]">
        <SectionHead id="cs-brief" num="01" lead="The" accent="brief" />
        <Reveal className="mt-8 flex flex-wrap gap-x-16 gap-y-8">
          <p className="m-0 flex-[1_1_400px] text-[18px] leading-[1.7]"><T v={c.brief} label="The challenge or goal. Who the brand is for, and what they needed." /></p>
          <p className="m-0 flex-[1_1_400px] text-[18px] leading-[1.7] text-body"><T v={c.approach} label="Your approach: research, concept and the creative direction you chose." /></p>
        </Reveal>
      </section>

      <section aria-labelledby="cs-id" className="pt-[clamp(80px,9vw,130px)]">
        <SectionHead id="cs-id" num="02" lead="The" accent="identity" right={<span className="label">Logo design</span>} />
        <Reveal className="mt-8 grid grid-cols-1 gap-4 desk:grid-cols-3">
          <div className="flex h-[clamp(300px,34vw,480px)] items-center justify-center border border-stone bg-paper desk:col-span-3">
            {c.logo ? <img src={c.logo.src} alt={c.logo.alt} className="max-h-[60%] max-w-[60%] object-contain" /> : <span className="ph font-serif text-[clamp(44px,6vw,88px)] italic text-berry">[Primary logo]</span>}
          </div>
          <div className="flex aspect-[4/3] items-center justify-center bg-ink">
            {c.logoReversed ? <img src={c.logoReversed.src} alt={c.logoReversed.alt} className="max-h-[55%] max-w-[60%] object-contain" /> : <span className="ph font-serif text-[32px] italic text-cream">[Logo, reversed]</span>}
          </div>
          <div className="flex aspect-[4/3] items-center justify-center bg-rose">
            {c.logoSecondary ? <img src={c.logoSecondary.src} alt={c.logoSecondary.alt} className="max-h-[55%] max-w-[60%] object-contain" /> : <span className="ph font-serif text-[32px] italic">[Secondary mark]</span>}
          </div>
          <div className="flex aspect-[4/3] flex-col justify-end gap-2.5 border border-stone bg-paper p-[18px]">
            <div className="flex gap-2">
              {(c.brandColors.length ? c.brandColors : ['#CFC8C0', '#DFA0B6', '#3A3432']).map((col, i) => (
                <span key={i} className="h-14 flex-1" style={{ background: col }} title={col} />
              ))}
            </div>
            <span className="label-sm">{c.brandColors.length ? c.brandColors.join(' · ') : '[Brand colours & type]'}</span>
          </div>
        </Reveal>
        {has(c.logoNote) ? <p className="mb-0 mt-4 max-w-[640px] text-[15px] leading-[1.6] text-body">{c.logoNote}</p> : <p className="mb-0 mt-4 max-w-[640px] text-[15px] leading-[1.6] text-body"><span className="ph">[A short note on the thinking behind the logo.]</span></p>}
      </section>

      <section id="photos" aria-labelledby="cs-shoot" className="pt-[clamp(80px,9vw,130px)]">
        <SectionHead id="cs-shoot" num="03" lead="The" accent="shoot" right={<span className="label">{all.length} photos · click to enlarge</span>} />
        <div className="masonry mt-8">
          {visible.map((p, i) => {
            const tc = tones[p.tone];
            return (
              <button key={i} type="button" className="ph-btn" aria-label={`Open photo ${p.n} of ${all.length}`} onClick={() => setOpen(i)} style={p.ratio ? { aspectRatio: p.ratio, background: tc.bg } : undefined}>
                {p.src ? (
                  <img src={p.src} alt={p.alt || ''} loading="lazy" className="zoom w-full" />
                ) : (
                  <>
                    <span className="zoom absolute inset-0" style={{ background: tc.bg }} />
                    <span className="absolute bottom-1.5 left-2 font-mono text-[9px]" style={{ color: tc.ink }}>{p.n}</span>
                  </>
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-7 flex flex-col items-center gap-2.5">
          <span className="label text-muted">Showing {visible.length} of {all.length}</span>
          {limit < all.length && (
            <button type="button" className="btn btn-line" onClick={() => setLimit(all.length)}>Show all {all.length} photos</button>
          )}
        </div>
      </section>

      <section aria-labelledby="cs-ig" className="pt-[clamp(80px,9vw,130px)]">
        <SectionHead id="cs-ig" num="04" lead="On" accent="Instagram" right={<span className="label">Sample posts for <T v={c.instagramHandle} label="@brand" /></span>} />
        <div className="mt-8 grid grid-cols-1 gap-5 min-[560px]:grid-cols-2 desk:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={i} delay={(i % 3) * 80}>
              <InstagramPost post={p} handle={c.instagramHandle} tone={postTones[i % postTones.length]} />
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="cs-bts" className="pt-[clamp(80px,9vw,130px)]">
        <SectionHead id="cs-bts" num="05" lead="Behind the" accent="scenes" right={<span className="label">Video · <T v={c.video.runtime} label="Runtime" /></span>} />
        <Reveal className="mt-8">
          <VideoBlock video={c.video} big />
        </Reveal>
      </section>

      <section aria-labelledby="cs-res" className="pb-[100px] pt-[clamp(80px,9vw,130px)]">
        <SectionHead id="cs-res" num="06" lead="The" accent="outcome" />
        <Reveal className="mt-8 flex flex-wrap items-start gap-x-16 gap-y-8">
          <p className="m-0 flex-[999_1_460px] font-serif text-[clamp(26px,2.4vw,34px)] leading-[1.3]">
            <T v={c.outcome} label="What came of it — real results, feedback from the brand or your professor, and what you learned." />
          </p>
          {has(c.note) && <p className="m-0 flex-[1_1_260px] -rotate-3 font-hand text-[14px] leading-[1.8] text-berry">{c.note}</p>}
        </Reveal>
        <div className="mt-20 flex flex-wrap items-center justify-between gap-5 border-t border-ink pt-6">
          <Link to="/work" className="ul font-serif text-[30px]">&larr; Back to the archive</Link>
          <Link to="/contact" className="btn btn-ink">Get in touch</Link>
        </div>
      </section>

      <Lightbox items={all} index={open} onClose={() => setOpen(-1)} onIndex={setOpen} />
    </div>
  );
}
