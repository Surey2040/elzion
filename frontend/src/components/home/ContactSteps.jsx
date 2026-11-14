import { useState } from 'react';

const ICONS = {
  web: 'M3 5h18v14H3z M3 9h18 M6.5 7h.01 M9 7h.01',
  app: 'M8 2.5h8a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 20V4A1.5 1.5 0 0 1 8 2.5z M11 18.5h2',
  erp: 'M4 20V10 M10 20V4 M16 20v-7 M22 20H2',
  ai: 'M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z M19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z',
  other: 'M12 5v14 M5 12h14',
};
const NEEDS = [
  ['web', 'Website', 'Sites, landing pages, e-commerce'],
  ['app', 'Mobile app', 'Android and iOS apps'],
  ['erp', 'ERP / CRM', 'Billing, stock, customers'],
  ['ai', 'AI automation', 'Bots, agents, workflows'],
  ['other', 'Something else', 'Tell us what you have in mind'],
];
const WHEN = ['As soon as possible', 'In 1–3 months', 'Just exploring'];
const STEPS = ['Project', 'Details', 'Contact'];
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

function Icon({ d }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>;
}

export default function ContactSteps() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [need, setNeed] = useState(null);
  const [when, setWhen] = useState(WHEN[1]);
  const [f, setF] = useState({ idea: '', name: '', email: '' });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));
  const go = (n) => { setDir(n > step ? 1 : -1); setStep(n); };
  const ideaOk = f.idea.trim().length > 9;
  const contactOk = f.name.trim().length > 1 && isEmail(f.email);
  const pick = (i) => { setNeed(i); setTimeout(() => go(1), 320); };
  const reset = () => { setF({ idea: '', name: '', email: '' }); setNeed(null); setWhen(WHEN[1]); setSent(false); setDir(-1); setStep(0); };

  return (
    <section className="cw" id="contact">
      <div className="cw-wrap">
        <div className="cw-head">
          <span className="cw-kicker"><i />Contact us</span>
          <h2>Let’s build <em>something</em> together.</h2>
          <p>Three quick steps. It takes about a minute.</p>
        </div>

        <div className="cw-card" style={{ '--p': sent ? 1 : step / 2 }}>
          <ol className="cw-steps" aria-label="Progress">
            {STEPS.map((s, i) => (
              <li key={s} className={`${i < step || sent ? 'done' : ''} ${i === step && !sent ? 'now' : ''}`}>
                <b>{i < step || sent ? '✓' : `0${i + 1}`}</b><span>{s}</span>
              </li>
            ))}
          </ol>

          <div className="cw-stage">
            {sent ? (
              <div className="cw-pane cw-done" key="done">
                <svg className="cw-check" viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="36" /><path d="M24 41l11 11 22-24" /></svg>
                <h3>Thanks, {f.name.trim().split(' ')[0]}!</h3>
                <p>Your <b>{NEEDS[need][1]}</b> request is in. We’ll reply to <b>{f.email.trim()}</b> with the next steps.</p>
                <button type="button" className="cw-ghost" onClick={reset}>Send another request</button>
              </div>
            ) : step === 0 ? (
              <div className={`cw-pane ${dir > 0 ? 'in-r' : 'in-l'}`} key="s0">
                <h3>What do you need?</h3>
                <p className="cw-sub">Pick one. You can explain more in the next step.</p>
                <div className="cw-tiles">
                  {NEEDS.map(([ic, label, desc], i) => (
                    <button type="button" key={label} style={{ '--i': i }} className={`cw-tile ${need === i ? 'on' : ''}`} onClick={() => pick(i)}>
                      <span className="cw-ic"><Icon d={ICONS[ic]} /></span>
                      <strong>{label}</strong><small>{desc}</small>
                      <i className="cw-arrow" aria-hidden="true">→</i>
                    </button>
                  ))}
                </div>
              </div>
            ) : step === 1 ? (
              <div className={`cw-pane ${dir > 0 ? 'in-r' : 'in-l'}`} key="s1">
                <h3>Tell us a bit about it</h3>
                <p className="cw-sub">What should it do, and who is it for? A few lines is enough.</p>
                <label className="cw-field cw-area">
                  <textarea value={f.idea} onChange={set('idea')} placeholder=" " rows={4} maxLength={600} />
                  <span>Your idea</span><em>{f.idea.length}/600</em>
                </label>
                <div className="cw-when">
                  <span>When do you want to start?</span>
                  <div>{WHEN.map((w) => <button type="button" key={w} className={when === w ? 'on' : ''} onClick={() => setWhen(w)}>{w}</button>)}</div>
                </div>
                <div className="cw-nav">
                  <button type="button" className="cw-ghost" onClick={() => go(0)}>← Back</button>
                  <button type="button" className="cw-next" disabled={!ideaOk} onClick={() => go(2)}>
                    <span>{ideaOk ? 'Next' : 'Write a little more'}</span><i aria-hidden="true">→</i>
                  </button>
                </div>
              </div>
            ) : (
              <form className={`cw-pane ${dir > 0 ? 'in-r' : 'in-l'}`} key="s2" noValidate onSubmit={(e) => { e.preventDefault(); if (contactOk) setSent(true); }}>
                <h3>Where can we reach you?</h3>
                <div className="cw-summary">
                  <span>{NEEDS[need][1]}</span><span>{when}</span>
                  <button type="button" onClick={() => go(0)}>Edit</button>
                </div>
                <div className="cw-row">
                  <label className="cw-field">
                    <input type="text" value={f.name} onChange={set('name')} placeholder=" " autoComplete="name" />
                    <span>Your name</span>
                  </label>
                  <label className="cw-field">
                    <input type="email" value={f.email} onChange={set('email')} placeholder=" " autoComplete="email" />
                    <span>Email address</span>
                  </label>
                </div>
                <div className="cw-nav">
                  <button type="button" className="cw-ghost" onClick={() => go(1)}>← Back</button>
                  <button type="submit" className={`cw-next cw-send ${contactOk ? 'ready' : ''}`} disabled={!contactOk}>
                    <span>Send request</span><i aria-hidden="true">↗</i>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
