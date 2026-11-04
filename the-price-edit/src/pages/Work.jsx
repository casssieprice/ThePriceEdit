import { useState } from 'react';
import { Reveal } from '../lib.jsx';
import { ArchiveCard, ProjectIndex } from '../components/index.jsx';
import { categories, projects } from '../content/projects.js';

// Editorial rhythm for the "All" view: column spans and offsets repeat.
const pattern = [
  { span: 7, h: 560, mt: 0 },
  { span: 5, h: 380, mt: 150 },
  { span: 4, h: 440, mt: 0 },
  { span: 5, h: 520, mt: 90 },
  { span: 3, h: 340, mt: 30 },
  { span: 5, h: 320, mt: 0 },
  { span: 7, h: 420, mt: 110 },
];

export default function Work() {
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState('gallery');
  const shown = filter === 'All' ? projects : projects.filter((p) => p.category === filter);
  const tabs = ['All', ...categories];

  return (
    <div className="wrap">
      <header className="relative pb-10 pt-[clamp(48px,6vw,88px)]">
        <p className="label m-0 mb-3 text-berry">Work · The archive</p>
        <h1 className="m-0 font-normal leading-[0.82]">
          <span className="rise font-extrabold uppercase tracking-[-0.06em] text-[clamp(84px,15vw,220px)]">The</span>{' '}
          <span className="rise ml-[0.18em] font-serif italic tracking-[-0.035em] text-berry text-[clamp(84px,15vw,220px)]" style={{ animationDelay: '.2s' }}>archive</span>
        </h1>
        <p className="mb-0 mt-6 max-w-[540px] text-[17px] leading-[1.6] text-body">
          Four years of work across journalism, marketing, photography, video, podcasting and multimedia — start with the capstone.
        </p>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-y border-b-stone border-t-ink py-2.5">
        <div role="group" aria-label="Filter by discipline" className="flex flex-wrap gap-x-[26px]">
          {tabs.map((n) => (
            <button key={n} type="button" className="flt" aria-pressed={filter === n} onClick={() => setFilter(n)}>
              {n}
            </button>
          ))}
        </div>
        <div role="group" aria-label="View" className="flex">
          <button type="button" className="vw" aria-pressed={view === 'gallery'} onClick={() => setView('gallery')}>Gallery</button>
          <button type="button" className="vw -ml-px" aria-pressed={view === 'list'} onClick={() => setView('list')}>Index</button>
        </div>
      </div>
      <p className="label mb-0 mt-3.5 text-muted" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? 'project' : 'projects'} · {filter === 'All' ? 'All disciplines' : filter}
      </p>

      {shown.length === 0 && <p className="py-24 text-center font-serif text-[32px] italic text-muted">More {filter.toLowerCase()} work coming soon.</p>}

      {view === 'gallery' ? (
        <div className="archive-grid mt-10" key={filter}>
          {shown.map((p, i) => {
            const pat = filter === 'All' ? pattern[i % pattern.length] : { span: 6, h: 440, mt: 0 };
            return <ArchiveCard key={p.slug} p={p} num={String(projects.indexOf(p) + 1).padStart(2, '0')} {...pat} />;
          })}
        </div>
      ) : (
        <Reveal className="mt-8 mb-24" key={'l' + filter}>
          <ProjectIndex projects={shown} />
        </Reveal>
      )}
    </div>
  );
}
