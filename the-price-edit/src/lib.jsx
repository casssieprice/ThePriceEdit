import { useCallback, useEffect, useRef, useState } from 'react';

/* ── Tiny hash router (works on any static host, no server config) ── */
// Accepts both '#work' and '#/work'. Plain '#name' links survive being shared.
function readPath() {
  const h = decodeURIComponent(window.location.hash.replace(/^#\/?/, '')).split('?')[0];
  return '/' + h;
}

export function useHashPath() {
  const [path, setPath] = useState(readPath);
  useEffect(() => {
    const onChange = () => setPath(readPath());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return path;
}

export function Link({ to, children, ...rest }) {
  return (
    <a href={'#' + to.replace(/^\//, '')} {...rest}>
      {children}
    </a>
  );
}

/** Scrolls to an element on the current page without touching the route. */
export function ScrollLink({ target, children, ...rest }) {
  const onClick = (e) => {
    e.preventDefault();
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <a href={'#' + target} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}

/* ── Placeholder helper: real value, or a dimmed [label] ── */
export function T({ v, label, className = '' }) {
  if (v !== null && v !== undefined && v !== '') return <>{v}</>;
  return <span className={'ph ' + className}>[{label}]</span>;
}
export const has = (v) => v !== null && v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0);

/* ── Motion helpers ── */
const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

/** Mouse parallax: returns handlers for a container and t(depth) → transform. */
export function useParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const raf = useRef(0);
  const enabled = useRef(false);
  useEffect(() => {
    enabled.current = finePointer() && !reduced();
    return () => cancelAnimationFrame(raf.current);
  }, []);
  const onMouseMove = useCallback((e) => {
    if (!enabled.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => setPos({ x, y }));
  }, []);
  const onMouseLeave = useCallback(() => setPos({ x: 0, y: 0 }), []);
  const t = (d) => ({ transform: `translate3d(${(pos.x * d).toFixed(1)}px, ${(pos.y * d).toFixed(1)}px, 0)` });
  return { handlers: { onMouseMove, onMouseLeave }, t };
}

/** Fades/slides children in when they scroll into view. */
export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced() || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ── Colour tones for placeholders ── */
export const tones = {
  rose: { bg: '#DFA0B6', ink: '#1E1B1A' },
  stone: { bg: '#CFC8C0', ink: '#1E1B1A' },
  ink: { bg: '#1E1B1A', ink: '#DFA0B6' },
  smoke: { bg: '#3A3432', ink: '#DFA0B6' },
  berry: { bg: '#9E315C', ink: '#F7F3ED' },
  blush: { bg: '#E9C6D2', ink: '#1E1B1A' },
  taupe: { bg: '#B8ADA4', ink: '#1E1B1A' },
};
export const toneCycle = ['rose', 'stone', 'smoke', 'blush', 'berry', 'taupe'];

/** An image, or a labelled colour placeholder when there is no image yet. */
export function Media({ src, alt = '', tone = 'rose', label, className = '', imgClassName = '', position = '50% 50%', children }) {
  const c = tones[tone] || tones.rose;
  return (
    <div className={'relative overflow-hidden ' + className} style={{ background: c.bg }}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" className={'absolute inset-0 h-full w-full object-cover ' + imgClassName} style={{ objectPosition: position }} />
      ) : (
        <div className={'absolute inset-0 ' + imgClassName} style={{ background: c.bg }} aria-hidden="true" />
      )}
      {!src && label ? (
        <span className="label-sm absolute left-3.5 bottom-3" style={{ color: c.ink }}>
          [{label}]
        </span>
      ) : null}
      {children}
    </div>
  );
}

export function useKey(handler, active = true) {
  useEffect(() => {
    if (!active) return;
    const fn = (e) => handler(e);
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [handler, active]);
}
