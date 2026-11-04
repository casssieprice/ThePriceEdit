import { Link, Reveal, ScrollLink, T, has, useParallax } from '../lib.jsx';
import { InstagramPost, PhotoLoop, ProjectIndex, SectionHead, VideoBlock } from '../components/index.jsx';
import { site, disciplines } from '../content/site.js';
import { projects } from '../content/projects.js';
import { capstone } from '../content/capstone.js';

export default function Home() {
  const { handlers, t } = useParallax();
  const featured = projects.filter((p) => p.featured);
  const img = site.images;
  const posts = capstone.instagram.length ? capstone.instagram.slice(0, 4) : Array.from({ length: 4 }, () => ({}));
  const postTones = ['rose', 'smoke', 'stone', 'berry'];

  return (
    <>
      <div className="wrap">
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-b border-ink pb-3.5 pt-[18px] label">
          <span>Issue N° 01</span>
          <span className="font-serif text-[16px] normal-case italic tracking-normal text-berry">{site.brand}</span>
          <span>Class of {site.classOf}</span>
        </div>

        <section className="hero" {...handlers} aria-label="Introduction">
          <div className="hero-first-wrap par" style={t(-14)} aria-hidden="true">
            <span className="hero-first rise">{site.first}</span>
          </div>

          <div className="hero-frame par" style={t(-14)} aria-hidden="true" />

          <figure className="hero-portrait par m-0" style={t(10)}>
            <div className="wipe absolute inset-0 overflow-hidden bg-ink">
              <img src={img.cover.src} alt={img.cover.alt} className="absolute inset-0 h-full w-full object-cover" fetchpriority="high" />
            </div>
            <figcaption className="label-sm absolute -bottom-[30px] left-0 hidden text-muted desk:block">Fig. 01 — {img.cover.caption}</figcaption>
          </figure>

          <div className="hero-last-wrap par" style={t(26)}>
            <h1 className="hero-last">
              <span className="sr-only">{site.first} </span>
              <span className="rise" style={{ animationDelay: '.25s' }}>{site.last}</span>
            </h1>
          </div>

          <div className="hero-snap par" style={t(26)}>
            <div className="relative bg-paper p-[7px] pb-6 shadow-[0_14px_30px_rgba(30,27,26,0.16)]">
              <span className="tape -top-2.5 left-1/2 -ml-[29px] h-[18px] w-[58px] -rotate-[4deg]" />
              <img src={img.snapshot.src} alt={img.snapshot.alt} className="aspect-[4/5] w-full -rotate-[1.5deg] object-cover" />
              <span className="absolute bottom-[5px] left-2 font-hand text-[10px]">{img.snapshot.caption}</span>
            </div>
          </div>

          <div className="hero-intro flex flex-col gap-3.5">
            <p className="label m-0 leading-[1.7] text-berry">{disciplines.map((d) => d.label).join(' · ')}</p>
            <p className="m-0 font-serif text-[28px] italic leading-[1.15]">{site.tagline}</p>
            <Link to="/work" className="ul cta self-start">Open the archive &darr;</Link>
          </div>

          <div className="hero-side flex flex-col gap-[18px]">
            <p className="m-0 font-serif text-[clamp(26px,2.3vw,34px)] leading-[1.15]">
              {site.descriptor.replace(/visual artistry$/, '')}
              {site.descriptor.endsWith('visual artistry') && <i className="text-berry">visual artistry</i>}
            </p>
            <ScrollLink target="cover-story" className="ul cta self-start">See the capstone &darr;</ScrollLink>
          </div>

          {has(site.heroNote) && (
            <div className="hero-note par fade-late" style={t(40)} aria-hidden="true">
              <p className="m-0 -rotate-[5deg] font-hand text-[15px] leading-[1.6] text-berry">{site.heroNote}</p>
              <svg width="120" height="80" viewBox="0 0 120 80" fill="none" stroke="#9E315C" strokeWidth="1.3" strokeLinecap="round" className="-ml-5">
                <path className="draw" d="M70 6 C 56 30, 34 42, 10 64 M10 64 L 24 60 M10 64 L 13 50" />
              </svg>
            </div>
          )}

          <p className="hero-vert label-sm m-0 tracking-[0.2em] text-muted">
            {site.school} — {site.major} — Class of {site.classOf}
          </p>
        </section>
      </div>

      {/* ── Capstone ── */}
      <section id="cover-story" aria-labelledby="capH" className="relative mt-[clamp(96px,10vw,150px)] scroll-mt-4 bg-ink text-cream">
        <div className="wrap py-[clamp(64px,8vw,120px)]">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-cream pt-[18px] label">
            <span className="text-rose">The cover story · Senior capstone</span>
            <span><T v={capstone.course} label="Course" /> · <T v={capstone.semester} label="Semester" /></span>
          </div>
          <Reveal>
            <h2 id="capH" className="mb-0 mt-7 font-serif text-[clamp(60px,10vw,150px)] font-normal leading-[0.9] tracking-[-0.03em]">
              {has(capstone.title) ? capstone.title : <span className="ph">[Capstone <i className="text-rose">title</i>]</span>}
            </h2>
          </Reveal>

          <div className="mt-12 flex flex-wrap items-start gap-10">
            <Reveal className="min-w-0 flex-[999_1_560px]">
              <VideoBlock video={capstone.video} href="#capstone" big />
              <div className="mt-3.5 flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2">
                <span className="label-sm text-stone">Fig. C1 — Behind the scenes</span>
                {has(capstone.video.note) && <span className="font-hand text-[13px] text-rose">{capstone.video.note}</span>}
              </div>
            </Reveal>

            <Reveal delay={120} className="flex min-w-0 flex-[1_1_340px] flex-col gap-6">
              <Link to="/capstone" className="flex items-center gap-4 border-b border-body pb-5 text-cream no-underline hover:text-rose">
                <span className="flex h-[84px] w-[84px] flex-none items-center justify-center overflow-hidden rounded-full bg-cream">
                  {capstone.logo ? <img src={capstone.logo.src} alt={capstone.logo.alt} className="h-3/4 w-3/4 object-contain" /> : <span className="font-serif text-[15px] italic text-berry">[Logo]</span>}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="label-sm text-rose">Logo design</span>
                  <span className="font-serif text-[22px]"><T v={capstone.brand} label="Brand" /> identity &rarr;</span>
                </span>
              </Link>
              <p className="m-0 font-serif text-[clamp(26px,2.4vw,34px)] leading-[1.2]">
                <T v={capstone.standfirst} label="The standfirst: what the capstone is and why it matters, in two sentences." />
              </p>
              <dl className="m-0 grid grid-cols-[110px_minmax(0,1fr)] text-[15px]">
                {[
                  ['Role', capstone.role, 'Your role'],
                  ['Made', capstone.made, 'What you made'],
                  ['Team', capstone.team, 'Collaborators or solo'],
                  ['Outcome', capstone.outcome, 'Real result, if you have one'],
                ].map(([k, v, l], i, a) => (
                  <div key={k} className="contents">
                    <dt className={'label-sm border-t py-3 text-rose ' + (i === 0 ? 'border-cream' : 'border-body') + (i === a.length - 1 ? ' border-b border-b-body' : '')}>{k}</dt>
                    <dd className={'m-0 border-t py-3 ' + (i === 0 ? 'border-cream' : 'border-body') + (i === a.length - 1 ? ' border-b border-b-body' : '')}><T v={v} label={l} /></dd>
                  </div>
                ))}
              </dl>
              {has(capstone.note) && <p className="m-0 -rotate-3 font-hand text-[14px] leading-[1.8] text-rose">{capstone.note}</p>}
              <Link to="/capstone" className="ul cta self-start text-cream">Read the full case study &rarr;</Link>
            </Reveal>
          </div>
        </div>

        <div className="wrap">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-t border-body pt-[18px]">
            <h3 className="m-0 font-serif text-[clamp(32px,3.4vw,48px)] font-normal">The <i className="text-rose">shoot</i></h3>
            <Link to="/capstone" className="btn btn-cream min-h-12">
              View all {capstone.photos.length || capstone.placeholderPhotoCount} photos <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <div className="mt-7">
          <PhotoLoop photos={capstone.photos} count={capstone.loopCount} placeholderCount={capstone.placeholderPhotoCount} />
        </div>
        <p className="wrap mb-0 mt-3 label-sm text-stone">Hover to pause · click any frame to open the gallery</p>

        <div className="wrap pb-[clamp(64px,8vw,110px)] pt-[72px]">
          <div className="mb-6 flex items-baseline justify-between border-t border-body pt-[18px]">
            <h3 className="m-0 font-serif text-[clamp(32px,3.4vw,48px)] font-normal">On <i className="text-rose">Instagram</i></h3>
            <span className="label-sm text-rose">Sample posts</span>
          </div>
          <div className="grid grid-cols-2 gap-4 desk:grid-cols-4">
            {posts.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <InstagramPost post={p} handle={capstone.instagramHandle} tone={postTones[i % 4]} small />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Selected work ── */}
      <div className="wrap">
        <section aria-labelledby="selH" className="pb-[110px] pt-[clamp(96px,10vw,140px)]">
          <SectionHead id="selH" lead="Selected" accent="work" size="clamp(48px,6vw,88px)" right={<Link to="/work" className="ul cta">Full archive &rarr;</Link>} />
          <Reveal className="mt-8">
            <ProjectIndex projects={featured} />
          </Reveal>
        </section>
      </div>
    </>
  );
}
