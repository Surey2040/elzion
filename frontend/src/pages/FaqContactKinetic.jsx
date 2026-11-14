import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/faq-contact-kinetic.css';
import ContactSteps from '../components/home/ContactSteps.jsx';

const QUESTIONS = [
  ['01', 'What can you build for us?', 'Websites, mobile apps, ERP and CRM systems and AI automation. Often all of it, as one connected product.'],
  ['02', 'How much will my project cost?', 'It depends on scope. After a free discovery call you get a clear, itemised quote before any work starts. No hidden fees.'],
  ['03', 'How long will it take?', 'You get a timeline and milestone plan up front, then see working software every week until launch.'],
  ['04', 'Who owns the final product?', 'You do. Source code, design files, cloud accounts and all product IP are handed over to you.'],
  ['05', 'Do you support us after launch?', 'Yes. Run it in-house, or stay with Elzion Care+ for monitoring, fixes, updates and new features.'],
];

export default function FaqContactKinetic({ embedded = false }) {
  const [active, setActive] = useState(0);
  const pageRef = useRef(null);
  const moveLight = (event) => {
    const box = pageRef.current?.getBoundingClientRect();
    if (!box) return;
    pageRef.current.style.setProperty('--mx', `${event.clientX - box.left}px`);
    pageRef.current.style.setProperty('--my', `${event.clientY - box.top}px`);
    pageRef.current.style.setProperty('--rx', `${((event.clientX / box.width) - .5) * 16}px`);
    pageRef.current.style.setProperty('--ry', `${((event.clientY / window.innerHeight) - .5) * 12}px`);
  };
  const Content = embedded ? 'div' : 'main';
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

      <ContactSteps />
    </Content>
  </div>;
}
