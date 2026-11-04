import { useState } from 'react';
import { has } from '../lib.jsx';
import { site } from '../content/site.js';

const reasons = ['Full-time role', 'Internship', 'Freelance project', 'Just saying hi'];

export default function Contact() {
  const [reason, setReason] = useState(reasons[0]);
  const [letter, setLetter] = useState(null); // { subject, body, href }
  const [copied, setCopied] = useState('');

  // No server needed: the form prepares the letter and hands it to the
  // visitor's email app, with the text shown so it can be copied too.
  // (To receive messages directly instead, see the README for Formspree.)
  const onSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `${reason} — from ${f.get('name') || 'your portfolio'}`;
    const body = [
      `Name: ${f.get('name') || ''}`,
      `Email: ${f.get('email') || ''}`,
      `Company / team: ${f.get('org') || ''}`,
      `About: ${reason}`,
      '',
      f.get('message') || '',
    ].join('\n');
    setLetter({ subject, body, href: `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` });
  };

  const copy = async (text, what) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(what);
    } catch {
      setCopied('select');
    }
  };

  const links = [
    { k: 'Email', v: site.email, href: `mailto:${site.email}` },
    { k: 'LinkedIn', v: site.linkedinLabel, href: site.linkedin, ext: true },
    has(site.instagram) && { k: 'Instagram', v: site.instagramLabel || 'Instagram', href: site.instagram, ext: true },
    { k: 'Resume', v: 'View & download', href: '#resume' },
  ].filter(Boolean);

  return (
    <div className="wrap flex flex-wrap items-start gap-[clamp(48px,6vw,96px)] pb-[110px] pt-[clamp(48px,6vw,96px)]">
      <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-8">
        <p className="label m-0 text-berry">Contact · Letters to {site.brand}</p>
        <h1 className="m-0 font-normal leading-[0.84]">
          <span className="rise block font-extrabold uppercase tracking-[-0.06em] text-[clamp(72px,11vw,170px)]">Let&rsquo;s make</span>
          <span className="rise block font-serif italic tracking-[-0.035em] text-berry text-[clamp(76px,11.5vw,180px)]" style={{ animationDelay: '.2s' }}>something.</span>
        </h1>
        <p className="m-0 max-w-[500px] text-[17px] leading-[1.65] text-body">{site.lookingFor}</p>
        <div className="max-w-[560px] border-b border-stone">
          {links.map((l) => (
            <a key={l.k} href={l.href} className="link-row" {...(l.ext ? { target: '_blank', rel: 'noreferrer' } : {})}>
              <span className="label text-muted">{l.k}</span>
              <span className="lr-v font-serif text-[clamp(20px,2vw,26px)] [overflow-wrap:anywhere]">{l.v}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="relative min-w-0 max-w-[560px] flex-[1_1_420px]">
        <div className="lined relative rotate-1 bg-paper py-10 pl-14 pr-9 shadow-[0_24px_60px_rgba(30,27,26,0.14)]">
          <span aria-hidden="true" className="absolute bottom-0 left-9 top-0 w-px bg-rose" />
          <span aria-hidden="true" className="tape -top-3.5 left-1/2 -ml-[60px] h-7 w-[120px] -rotate-3" />

          {!letter ? (
            <form onSubmit={onSubmit} className="flex flex-col gap-[22px]">
              <p className="m-0 font-serif text-[30px] leading-[1.1]">Dear {site.first},</p>
              <div>
                <label className="label block text-muted" htmlFor="c-name">Your name</label>
                <input id="c-name" name="name" className="field" type="text" autoComplete="name" required />
              </div>
              <div>
                <label className="label block text-muted" htmlFor="c-email">Email</label>
                <input id="c-email" name="email" className="field" type="email" autoComplete="email" required />
              </div>
              <div>
                <label className="label block text-muted" htmlFor="c-org">Company or team</label>
                <input id="c-org" name="org" className="field" type="text" autoComplete="organization" />
              </div>
              <fieldset className="m-0 border-0 p-0">
                <legend className="label mb-2.5 text-muted">I&rsquo;m reaching out about</legend>
                <div className="flex flex-wrap gap-2">
                  {reasons.map((r) => (
                    <button key={r} type="button" className="chip" aria-pressed={reason === r} onClick={() => setReason(r)}>{r}</button>
                  ))}
                </div>
              </fieldset>
              <div>
                <label className="label block text-muted" htmlFor="c-msg">Message</label>
                <textarea id="c-msg" name="message" className="field resize-y p-0 leading-10" rows={4} />
              </div>
              <button type="submit" className="btn btn-ink self-start">Send the letter &rarr;</button>
            </form>
          ) : (
            <div role="status" className="flex min-h-[520px] flex-col items-start justify-center gap-5">
              <span className="seal flex h-[120px] w-[120px] items-center justify-center rounded-full bg-berry text-center font-serif text-[24px] italic leading-none text-cream">Sealed</span>
              <p className="m-0 font-serif text-[38px] leading-[1.05]">Your letter is <i className="text-berry">ready to send.</i></p>
              <a href={letter.href} className="btn btn-ink">Open in your email app &rarr;</a>
              <p className="m-0 text-[15px] leading-[1.6] text-body">
                If no email app opens, copy the letter and send it to <span className="select-all font-medium text-ink">{site.email}</span>.
              </p>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="chip" onClick={() => copy(`${letter.subject}\n\n${letter.body}`, 'letter')}>{copied === 'letter' ? 'Letter copied' : 'Copy the letter'}</button>
                <button type="button" className="chip" onClick={() => copy(site.email, 'email')}>{copied === 'email' ? 'Email copied' : 'Copy email address'}</button>
              </div>
              {copied === 'select' && (
                <textarea readOnly className="field h-40 text-[14px] leading-normal" value={`${letter.subject}\n\n${letter.body}`} onFocus={(e) => e.target.select()} aria-label="Your letter" />
              )}
              <button type="button" onClick={() => { setLetter(null); setCopied(''); }} className="label min-h-11 cursor-pointer border-0 bg-transparent p-0 text-ink underline">Write a new letter</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
