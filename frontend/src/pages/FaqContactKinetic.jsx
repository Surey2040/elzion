import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/faq-contact-kinetic.css';

const QUESTIONS = [
  ['01', 'What can you build for us?', 'Websites, mobile apps, ERP and CRM systems and AI automation. Often all of it, as one connected product.'],
  ['02', 'How much will my project cost?', 'It depends on scope. After a free discovery call you get a clear, itemised quote before any work starts. No hidden fees.'],
  ['03', 'How long will it take?', 'You get a timeline and milestone plan up front, then see working software every week until launch.'],
  ['04', 'Who owns the final product?', 'You do. Source code, design files, cloud accounts and all product IP are handed over to you.'],
  ['05', 'Do you support us after launch?', 'Yes. Run it in-house, or stay with Elzion Care+ for monitoring, fixes, updates and new features.'],
];

const NEEDS = ['Website', 'Mobile app', 'ERP / CRM', 'AI automation', 'Something else'];
const STEPS = [
  ['You send the form', 'Takes about two minutes.'],
  ['We reply with questions', 'So we understand what you really need.'],
  ['Free discovery call', 'Then you get a clear plan and quote.'],
];
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export default function FaqContactKinetic({ embedded = false }) {
  const [active, setActive] = useState(0);
  const [type, setType] = useState('Website');
  const [sent, setSent] = useState(false);
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const pageRef = useRef(null);
  const moveLight = (event) => {
    const box = pageRef.current?.getBoundingClientRect();
    if (!box) return;
    pageRef.current.style.setProperty('--mx', `${event.clientX - box.left}px`);
    pageRef.current.style.setProperty('--my', `${event.clientY - box.top}px`);
    pageRef.current.style.setProperty('--rx', `${((event.clientX / box.width) - .5) * 16}px`);
    pageRef.current.style.setProperty('--ry', `${((event.clientY / window.innerHeight) - .5) * 12}px`);
  };
  const update = (key) => (event) => setFields(current => ({ ...current, [key]: event.target.value }));
  const Content = embedded ? 'div' : 'main';
  const nameOk = fields.name.trim().length > 1;
  const emailOk = isEmail(fields.email);
  const msgOk = fields.message.trim().length > 9;
  const done = [nameOk, emailOk, true, msgOk].filter(Boolean).length;
  const ready = nameOk && emailOk && msgOk;
  return <div className={`fk-page ${embedded ? 'fk-embedded' : ''}`} ref={pageRef} onPointerMove={moveLight}>
    <div className="fk-cursor-light" aria-hidden="true" />
    {!embedded && <header className="fk-nav"><Link to="/" className="logo">elz<b>ion.</b></Link><span>CONCEPT E / KINETIC CONVERSATION</span><div><Link to="/#faq">Close</Link><Link to="/demos/faq-contact-a">Compare ↗</Link></div></header>}
    <Content>
      <section className="fk-faq" id="faq">
        <div className="fk-grid" aria-hidden="true"></div>
        <div className="fq-head">
          <span className="fq-kicker">Common questions</span>
          <h2 className="fq-title"><b>FAQ</b><em>s.</em></h2>
          <p>Five things people usually ask before we start.</p>
        </div>
        <div className="fq-row">
          {QUESTIONS.map(([n, q, a], i) => (
            <article key={n} className={`fq-panel ${active === i ? 'active' : ''}`} style={{ '--n': i }} onClick={() => setActive(i)}>
              <i className="fq-ghost" aria-hidden="true">{n}</i>
              <button className="fq-q" aria-expanded={active === i}>
                <span className="fq-no">{n}</span>
                <span className="fq-text">{q}</span>
                <span className="fq-plus" aria-hidden="true" />
              </button>
              <div className="fq-body">
                <p className="fq-ans">{a.split(' ').map((w, k) => <span key={k} style={{ '--k': k }}>{w + ' '}</span>)}</p>
                {active === i && <b className="fq-timer" aria-hidden="true" onAnimationEnd={() => setActive((i + 1) % QUESTIONS.length)} />}
              </div>
            </article>
          ))}
        </div>
        <div className="fk-ticker"><div>ASK / LISTEN / UNDERSTAND / BUILD / ASK / LISTEN / UNDERSTAND / BUILD /</div></div>
      </section>

      <section className="ct" id="contact" style={{ '--pr': done / 4 }}>
        <div className="ct-marquee" aria-hidden="true"><div>LET’S TALK ✦ LET’S TALK ✦ LET’S TALK ✦ LET’S TALK ✦ LET’S TALK ✦ LET’S TALK ✦ </div></div>
        <div className="ct-intro">
          <span className="ct-kicker">Contact</span>
          <h2 className="ct-title"><span>Have a project?</span><span>Let’s <em>talk.</em></span></h2>
          <p className="ct-lead">Fill in this short form. We read every request and reply with clear next steps.</p>
          <ol className="ct-steps">
            {STEPS.map(([h, q], k) => <li key={h} style={{ '--n': k }}><b>{`0${k + 1}`}</b><div><strong>{h}</strong><span>{q}</span></div></li>)}
          </ol>
        </div>
        <div className={`ct-card ${sent ? 'is-sent' : ''}`}>
          {sent ? (
            <div className="ct-done">
              <svg className="ct-tick" viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="36" /><path d="M24 41 l11 11 l22 -24" /></svg>
              <h3>Thanks{fields.name.trim() ? `, ${fields.name.trim().split(' ')[0]}` : ''}! Request received.</h3>
              <p>We’ll reply to <b>{fields.email.trim()}</b> with the next steps.</p>
              <button type="button" onClick={() => { setFields({ name: '', email: '', message: '' }); setSent(false); }}>Send another request</button>
            </div>
          ) : (
            <form className="ct-form" noValidate onSubmit={(e) => { e.preventDefault(); if (ready) setSent(true); }}>
              <div className="ct-top">
                <div><span>Project request</span><small>{ready ? 'All set. Ready to send.' : `${done} of 4 done`}</small></div>
                <div className="ct-ring">
                  <svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" /><circle cx="20" cy="20" r="17" pathLength="100" style={{ strokeDashoffset: 100 - done * 25 }} /></svg>
                  <b>{done * 25}%</b>
                </div>
              </div>
              <label className={`ct-field ${nameOk ? 'done' : ''}`} style={{ '--n': 0 }}>
                <input type="text" value={fields.name} onChange={update('name')} placeholder=" " autoComplete="name" />
                <span>Your name</span><i className="ct-check" aria-hidden="true" />
              </label>
              <label className={`ct-field ${emailOk ? 'done' : ''}`} style={{ '--n': 1 }}>
                <input type="email" value={fields.email} onChange={update('email')} placeholder=" " autoComplete="email" />
                <span>Email address</span><i className="ct-check" aria-hidden="true" />
              </label>
              <fieldset className="ct-chips" style={{ '--n': 2 }}>
                <legend>What do you need?</legend>
                <div>{NEEDS.map(w => <button type="button" key={w} className={type === w ? 'active' : ''} aria-pressed={type === w} onClick={() => setType(w)}>{w}</button>)}</div>
              </fieldset>
              <label className={`ct-field ct-area ${msgOk ? 'done' : ''}`} style={{ '--n': 3 }}>
                <textarea value={fields.message} onChange={update('message')} placeholder=" " rows={4} maxLength={600} />
                <span>Tell us about your project</span><em>{fields.message.length}/600</em><i className="ct-check" aria-hidden="true" />
              </label>
              <button type="submit" className={`ct-send ${ready ? 'ready' : ''}`} disabled={!ready} style={{ '--n': 4 }}>
                <span>{ready ? 'Send project request' : 'Add your name, email and a short note'}</span><i aria-hidden="true">→</i>
              </button>
            </form>
          )}
        </div>
      </section>
    </Content>
  </div>;
}
