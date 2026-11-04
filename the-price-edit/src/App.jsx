import { useEffect, useRef } from 'react';
import { useHashPath } from './lib.jsx';
import { Footer, Grain, Nav } from './components/index.jsx';
import Home from './pages/Home.jsx';
import Work from './pages/Work.jsx';
import Project, { NotFoundInline } from './pages/Project.jsx';
import Capstone from './pages/Capstone.jsx';
import About from './pages/About.jsx';
import Resume from './pages/Resume.jsx';
import Contact from './pages/Contact.jsx';
import { site } from './content/site.js';

const titles = {
  '/': `${site.first} ${site.last} — ${site.brand}`,
  '/work': 'Work',
  '/capstone': 'Capstone',
  '/about': 'About',
  '/resume': 'Resume',
  '/contact': 'Contact',
};

function route(path) {
  if (path === '/') return <Home />;
  if (path === '/work') return <Work />;
  if (path.startsWith('/work/')) return <Project slug={decodeURIComponent(path.slice(6))} />;
  if (path === '/capstone') return <Capstone />;
  if (path === '/about') return <About />;
  if (path === '/resume') return <Resume />;
  if (path === '/contact') return <Contact />;
  return <NotFoundInline />;
}

export default function App() {
  const path = useHashPath();
  const main = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    const t = titles[path] || 'Work';
    document.title = path === '/' ? t : `${t} — ${site.first} ${site.last}`;
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }, [path]);

  const skip = (e) => {
    e.preventDefault();
    main.current?.focus();
    main.current?.scrollIntoView();
  };

  return (
    <>
      <a href="#main" onClick={skip} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-berry focus:px-5 focus:py-3 focus:text-cream">
        Skip to content
      </a>
      <Grain />
      <Nav path={path} />
      <main id="main" ref={main} tabIndex={-1} key={path} className="page-in outline-none">
        {route(path)}
      </main>
      {path !== '/contact' && <Footer />}
    </>
  );
}
