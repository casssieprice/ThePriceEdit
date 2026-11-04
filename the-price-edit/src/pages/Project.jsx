import { Link, Media, Reveal, T, has } from '../lib.jsx';
import { SectionHead } from '../components/index.jsx';
import { projects } from '../content/projects.js';

function Block({ b, i }) {
  switch (b.type) {
    case 'text':
      return (
        <Reveal className="grid gap-6 desk:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          {b.heading ? <h3 className="m-0 font-serif text-[34px] font-normal">{b.heading}</h3> : <span />}
          <div className="max-w-[680px] whitespace-pre-line text-[18px] leading-[1.7]">{b.body}</div>
        </Reveal>
      );
    case 'image':
      return (
        <Reveal as="figure" className="m-0">
          <img src={b.src} alt={b.alt || ''} loading="lazy" className="w-full" />
          {b.caption && <figcaption className="label-sm mt-3 text-muted">Fig. {String(i + 1).padStart(2, '0')} — {b.caption}</figcaption>}
        </Reveal>
      );
    case 'gallery':
      return (
        <Reveal className="masonry">
          {b.images.map((im, k) => (
            <img key={k} src={im.src} alt={im.alt || ''} loading="lazy" className="mb-3 w-full break-inside-avoid" />
          ))}
        </Reveal>
      );
    case 'video':
    case 'audio':
      return (
        <Reveal className={'relative bg-ink ' + (b.type === 'video' ? 'aspect-video' : 'h-[232px]')}>
          <iframe src={b.embed} title={b.title || (b.type === 'video' ? 'Video' : 'Audio')} className="absolute inset-0 h-full w-full border-0" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen />
        </Reveal>
      );
    case 'quote':
      return (
        <Reveal as="blockquote" className="m-0 border-l-0 py-6">
          <p className="m-0 max-w-[900px] font-serif text-[clamp(32px,4vw,56px)] italic leading-[1.15]">&ldquo;{b.text}&rdquo;</p>
          {b.source && <p className="label mt-4 text-berry">— {b.source}</p>}
        </Reveal>
      );
    case 'link':
      return (
        <a href={b.href} target="_blank" rel="noreferrer" className="btn btn-ink self-start">
          {b.label} &rarr;
        </a>
      );
    default:
      return null;
  }
}

export default function Project({ slug }) {
  const idx = projects.findIndex((p) => p.slug === slug);
  const p = projects[idx];
  if (!p) return <NotFoundInline />;
  const next = projects[(idx + 1) % projects.length];
  const nextHref = next.capstone ? '/capstone' : `/work/${next.slug}`;

  return (
    <div className="wrap">
      <header className="pb-12 pt-[clamp(48px,6vw,88px)]">
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 label">
          <Link to="/work" className="ul">&larr; The archive</Link>
          <span className="text-berry">{p.category} — {p.kind}</span>
          <span><T v={p.year} label="Year" /></span>
        </div>
        <h1 className="mb-0 mt-9 font-serif text-[clamp(64px,10vw,160px)] font-normal leading-[0.9] tracking-[-0.03em]">
          {has(p.title) ? p.title : <span className="ph">[Project <i className="text-berry">title</i>]</span>}
        </h1>
        <div className="mt-12 flex flex-wrap items-start gap-x-16 gap-y-10">
          <p className="m-0 flex-[999_1_460px] font-serif text-[clamp(26px,2.4vw,34px)] leading-[1.25]">
            <T v={p.summary} label="A one- or two-sentence summary, like a magazine standfirst." />
          </p>
          <dl className="m-0 grid flex-[1_1_320px] grid-cols-[100px_minmax(0,1fr)] text-[15px]">
            {[
              ['Role', p.role, 'Your role'],
              ['For', p.context, 'Class, publication or client'],
              ['Tools', p.tools?.length ? p.tools.join(', ') : null, 'Tools used'],
            ].map(([k, v, l], i, a) => (
              <div key={k} className="contents">
                <dt className={'label-sm border-t py-3 text-berry ' + (i === 0 ? 'border-ink' : 'border-stone') + (i === a.length - 1 ? ' border-b border-b-stone' : '')}>{k}</dt>
                <dd className={'m-0 border-t py-3 ' + (i === 0 ? 'border-ink' : 'border-stone') + (i === a.length - 1 ? ' border-b border-b-stone' : '')}><T v={v} label={l} /></dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <Media src={p.cover} alt={p.coverAlt || ''} tone={p.tone} label="Lead image" className="wipe h-[clamp(320px,46vw,680px)]" />

      <div className="flex flex-col gap-[clamp(56px,7vw,100px)] py-[clamp(72px,9vw,130px)]">
        {p.sections?.length ? (
          p.sections.map((b, i) => <Block key={i} b={b} i={i} />)
        ) : (
          <Reveal className="grid gap-6 desk:grid-cols-2">
            <p className="m-0 text-[18px] leading-[1.7]"><span className="ph">[The story behind the project — the brief, your idea and how you made it.]</span></p>
            <p className="m-0 text-[18px] leading-[1.7] text-body"><span className="ph">[Images, video, audio or links go here — add them as sections in projects.js.]</span></p>
          </Reveal>
        )}

        {p.results?.length > 0 && (
          <section aria-labelledby="resH">
            <SectionHead id="resH" lead="The" accent="results" />
            <ul className="m-0 mt-8 grid list-none gap-6 p-0 desk:grid-cols-3">
              {p.results.map((r, i) => (
                <li key={i} className="border-t border-stone pt-4 text-[18px] leading-[1.6]">{r}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <Link to={nextHref} className="group mb-24 flex flex-wrap items-baseline justify-between gap-4 border-t border-ink pt-6 no-underline">
        <span className="label text-muted">Next story</span>
        <span className="font-serif text-[clamp(36px,5vw,72px)] leading-none group-hover:italic">
          <T v={next.title} label={next.capstone ? 'Capstone' : next.category} /> &rarr;
        </span>
      </Link>
    </div>
  );
}

export function NotFoundInline() {
  return (
    <div className="wrap py-40 text-center">
      <p className="label text-berry">Page not found</p>
      <h1 className="font-serif text-[clamp(56px,8vw,120px)] font-normal italic">This page is off the press.</h1>
      <Link to="/" className="btn btn-ink mt-6">Back to the cover</Link>
    </div>
  );
}
