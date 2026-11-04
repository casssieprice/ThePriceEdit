import { Link, Reveal, T, has, tones, useParallax } from '../lib.jsx';
import { SectionHead } from '../components/index.jsx';
import { about, disciplines, site } from '../content/site.js';

const interestTones = ['rose', 'stone', 'ink'];
const tilts = ['-3deg', '2deg', '-1.5deg'];

export default function About() {
  const { handlers, t } = useParallax();
  return (
    <>
      <div className="wrap">
        <section {...handlers} className="flex flex-wrap items-start gap-[clamp(40px,6vw,96px)] pb-[clamp(80px,8vw,120px)] pt-[clamp(56px,7vw,100px)]">
          <div className="relative min-w-0 max-w-[560px] flex-[1_1_380px]">
            <div className="par absolute -bottom-[22px] -right-[22px] left-[22px] top-[22px] hidden border border-ink desk:block" style={t(-10)} aria-hidden="true" />
            <figure className="par relative m-0 aspect-[4/5]" style={t(8)}>
              <div className="wipe absolute inset-0 overflow-hidden bg-ink">
                <img src={site.images.about.src} alt={site.images.about.alt} className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </figure>
            <div className="par absolute -bottom-10 -right-[30px] hidden w-[36%] bg-paper p-2 pb-[26px] shadow-[0_14px_30px_rgba(30,27,26,0.16)] desk:block" style={t(24)}>
              <span className="tape -top-2.5 left-1/2 -ml-[30px] h-[18px] w-[60px] -rotate-[4deg]" />
              <img src={site.images.snapshot.src} alt={site.images.snapshot.alt} className="aspect-square w-full object-cover" />
              <span className="absolute bottom-1.5 left-2.5 font-hand text-[11px]">off duty</span>
            </div>
            <p className="label-sm mb-0 mt-[34px] text-muted">Fig. 01 — {site.images.about.caption}</p>
          </div>

          <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-7">
            <p className="label m-0 text-berry">Letter from the editor · {site.brand}</p>
            <h1 className="m-0 font-normal leading-[0.86]">
              <span className="rise block font-extrabold uppercase tracking-[-0.05em] text-[clamp(60px,8vw,120px)]">Hello, I&rsquo;m</span>
              <span className="rise block font-serif italic tracking-[-0.035em] text-berry text-[clamp(68px,9vw,136px)]" style={{ animationDelay: '.2s' }}>{site.first}.</span>
            </h1>
            <p className="dropcap mb-0 mt-3 max-w-[640px] font-serif text-[clamp(22px,1.9vw,27px)] leading-[1.45]">
              <T v={about.opening} label="Your opening paragraph — where you're from, how you found storytelling, and what drew you to Journalism & Media Communications at Colorado State University." />
            </p>
            {about.paragraphs.map((p, i) => (
              <p key={i} className="m-0 max-w-[620px] text-[17px] leading-[1.7] text-body">
                <T v={p} label={i === 0 ? 'How you work across writing, photography, video, podcasting and marketing — and what ties it together.' : "What you want to do next: the roles, teams and kinds of work you're looking for."} />
              </p>
            ))}
            <div className="mt-2 flex items-center gap-5">
              <span className="font-hand text-[24px] text-berry"><T v={about.signature} label="your signature" /></span>
              <span className="h-px max-w-[240px] flex-auto bg-stone" />
            </div>
          </div>
        </section>

        <section aria-labelledby="doH" className="pb-[clamp(80px,8vw,120px)]">
          <SectionHead id="doH" lead="What I" accent="do" right={<span className="label">Six disciplines, one storyteller</span>} />
          <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-12">
            {disciplines.map((d, i) => (
              <Reveal key={d.label} delay={(i % 3) * 70} className="disc">
                <div className="flex items-baseline gap-3.5">
                  <span className="font-mono text-[11px]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="disc-name font-serif text-[36px] transition-colors">{d.label}</span>
                </div>
                <p className="mb-0 ml-[34px] mt-2.5 text-[15px] leading-[1.6] text-body">
                  {has(about.disciplineNotes[d.label]) ? about.disciplineNotes[d.label] : d.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <section aria-labelledby="xpH" className="pb-[clamp(80px,8vw,120px)]">
          <SectionHead id="xpH" lead="Experience," accent="briefly" right={<Link to="/resume" className="ul cta">Full resume &rarr;</Link>} />
          <div className="mt-5 border-b border-stone">
            {about.experience.map((x, i) => (
              <div key={i} className="grid items-baseline gap-1 border-t border-stone py-[22px] desk:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_180px] desk:gap-5">
                <span className="font-serif text-[30px] leading-[1.1]"><T v={x.role} label="Role / position" /></span>
                <span className="text-[16px]"><T v={x.org} label="Organization or publication" /></span>
                <span className="font-mono text-[12px] text-muted"><T v={x.dates} label="Start – End" /></span>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="offH" className="pb-[clamp(80px,8vw,120px)]">
          <SectionHead id="offH" lead="Off the" accent="clock" />
          <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-start gap-12">
            {about.interests.map((it, i) => {
              const c = tones[interestTones[i % 3]];
              return (
                <div key={i} className="snap" style={{ transform: `rotate(${tilts[i % 3]})`, marginTop: i === 1 ? 40 : 0 }}>
                  <span className="tape -top-3 left-1/2 -ml-10" style={{ transform: `rotate(${i % 2 ? 3 : -4}deg)` }} />
                  <div className="relative aspect-square" style={{ background: c.bg }}>
                    {it.src && <img src={it.src} alt={it.caption || ''} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
                  </div>
                  <span className="absolute bottom-3.5 left-4 font-hand text-[14px]"><T v={it.caption} label={['an interest', 'another one', 'what inspires you'][i % 3]} /></span>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="bg-ink text-cream">
        <div className="wrap flex flex-wrap items-center justify-between gap-7 py-[72px]">
          <p className="m-0 font-serif text-[clamp(40px,5vw,72px)] leading-none">Want the <i className="text-rose">details?</i></p>
          <div className="flex flex-wrap gap-3">
            <Link to="/resume" className="btn btn-cream">View resume</Link>
            <Link to="/contact" className="btn btn-line text-cream hover:bg-cream hover:text-ink">Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
