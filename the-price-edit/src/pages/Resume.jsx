import { Link, T, has } from '../lib.jsx';
import { resume as r, site } from '../content/site.js';

function H({ id, children }) {
  return <h3 id={id} className="label m-0 font-medium tracking-[0.16em] text-berry">{children}</h3>;
}

export default function Resume() {
  const download = has(site.resumePdf) ? (
    <a href={site.resumePdf} download className="btn btn-ink">Download PDF <span aria-hidden="true">&darr;</span></a>
  ) : typeof window !== 'undefined' && window.self === window.top ? (
    <button type="button" onClick={() => window.print()} className="btn btn-ink">Save as PDF <span aria-hidden="true">&darr;</span></button>
  ) : null;

  return (
    <div className="wrap">
      <header className="no-print flex flex-wrap items-end justify-between gap-7 pb-[clamp(40px,5vw,64px)] pt-[clamp(48px,6vw,88px)]">
        <h1 className="m-0 font-normal leading-[0.82]">
          <span className="rise font-extrabold uppercase tracking-[-0.06em] text-[clamp(80px,13vw,200px)]">The</span>{' '}
          <span className="rise ml-[0.18em] font-serif italic tracking-[-0.035em] text-berry text-[clamp(80px,13vw,200px)]" style={{ animationDelay: '.2s' }}>masthead</span>
        </h1>
        <div className="flex flex-col items-start gap-3">
          {download}
          <span className="label text-muted">Résumé · {site.first} {site.last}</span>
        </div>
      </header>

      <div className="relative mx-auto mb-[120px] max-w-[1040px]">
        <article aria-label="Resume" className="print-sheet relative -rotate-[0.4deg] bg-paper p-[clamp(24px,5vw,72px)] shadow-[0_24px_60px_rgba(30,27,26,0.12)]">
          <span className="tape no-print -top-3.5 left-[12%] h-7 w-[120px] -rotate-[4deg]" aria-hidden="true" />
          <span className="tape no-print -top-3.5 right-[12%] h-7 w-[120px] rotate-[5deg]" aria-hidden="true" />

          <div className="flex flex-wrap items-end justify-between gap-5 pb-[26px]">
            <div>
              <h2 className="m-0 font-normal leading-[0.9]">
                <span className="font-extrabold uppercase tracking-[-0.04em] text-[clamp(40px,5vw,68px)]">{site.first}</span>{' '}
                <span className="font-serif italic text-berry text-[clamp(44px,5.4vw,74px)]">{site.last}</span>
              </h2>
              <p className="mb-0 mt-2.5 font-serif text-[22px]">{site.descriptor}</p>
            </div>
            <div className="flex flex-col gap-1 font-mono text-[12px] desk:text-right">
              <a href={`mailto:${site.email}`} className="no-underline">{site.email}</a>
              <span><T v={site.location} label="City, State" /></span>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="no-underline">linkedin.com{site.linkedinLabel}</a>
            </div>
          </div>

          <section className="rsec" aria-labelledby="r-edu">
            <H id="r-edu">Education</H>
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1.5">
                <span className="font-serif text-[26px] leading-[1.1]">{site.school}</span>
                <span className="font-mono text-[12px] text-muted">{r.graduation}</span>
              </div>
              <span className="text-[15px]"><T v={r.degree} label="Degree" />, {site.major}</span>
              <span className="text-[14px] text-body"><T v={r.educationNotes} label="Minor / concentration · honors · relevant coursework" /></span>
            </div>
          </section>

          <section className="rsec" aria-labelledby="r-exp">
            <H id="r-exp">Experience</H>
            <div className="flex flex-col gap-[22px]">
              {r.jobs.map((j, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex flex-wrap justify-between gap-x-4 gap-y-1.5">
                    <span className="font-serif text-[24px] leading-[1.1]"><T v={j.role} label="Role" /> · <i><T v={j.org} label="Organization" /></i></span>
                    <span className="font-mono text-[12px] text-muted"><T v={j.dates} label="Start – End" /></span>
                  </div>
                  <ul className="mb-0 mt-1.5 pl-[18px] text-[15px] leading-[1.6] text-body">
                    {j.bullets.map((b, k) => (
                      <li key={k}><T v={b} label={k === 0 ? 'What you did and the impact — a real, specific result' : 'A second accomplishment'} /></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="rsec" aria-labelledby="r-lead">
            <H id="r-lead">Campus &amp; leadership</H>
            <div className="flex flex-col gap-[22px]">
              {r.leadership.map((l, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex flex-wrap justify-between gap-x-4 gap-y-1.5">
                    <span className="font-serif text-[24px]"><T v={l.role} label="Position" /> · <i><T v={l.org} label="Club, student media or org" /></i></span>
                    <span className="font-mono text-[12px] text-muted"><T v={l.dates} label="Dates" /></span>
                  </div>
                  <span className="text-[15px] text-body"><T v={l.note} label="One line on what you led or created" /></span>
                </div>
              ))}
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap justify-between gap-x-4 gap-y-1.5">
                  <span className="font-serif text-[24px]">Senior capstone · <Link to="/capstone"><i>See the case study</i></Link></span>
                </div>
              </div>
            </div>
          </section>

          <section className="rsec" aria-labelledby="r-skills">
            <H id="r-skills">Skills</H>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-8 gap-y-5">
              {r.skills.map((s) => (
                <div key={s.group}>
                  <p className="mb-1.5 mt-0 text-[14px] font-semibold">{s.group}</p>
                  <p className="m-0 text-[14px] leading-[1.6] text-body">{s.items.length ? s.items.join(' · ') : <span className="ph">[Skill] · [Skill] · [Skill]</span>}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rsec border-b border-b-stone" aria-labelledby="r-tools">
            <H id="r-tools">Tools &amp; awards</H>
            <div className="flex flex-col gap-3.5">
              <div className="flex flex-wrap gap-2">
                {(r.tools.length ? r.tools : ['[Tool]', '[Tool]', '[Tool]', '[Tool]', '[Tool]']).map((tl, i) => (
                  <span key={i} className={'rounded-full border border-ink px-3.5 py-1.5 text-[13px] ' + (r.tools.length ? '' : 'ph')}>{tl}</span>
                ))}
              </div>
              <span className="text-[15px] text-body"><T v={r.awards} label="Award or recognition, year · certification, if any" /></span>
            </div>
          </section>
        </article>

        <div className="no-print mt-12 flex flex-wrap justify-center gap-3">
          {download}
          <Link to="/contact" className="btn btn-line">Contact me</Link>
        </div>
      </div>
    </div>
  );
}
