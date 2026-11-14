import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/faq-contact-kinetic.css';

const QUESTIONS = [
  ['01', 'What can we build together?', 'Websites, mobile products, AI automation, ERP and connected business systems—often as one complete product.'],
  ['02', 'How long will it take?', 'After discovery, you receive a clear timeline and milestone plan before the first build sprint starts.'],
  ['03', 'Who owns the final product?', 'You do. Source code, design files, cloud accounts and product IP are handed over to you.'],
  ['04', 'What happens after launch?', 'Run it in-house or continue with Elzion Care+ for monitoring, fixes, updates and new features.'],
  ['05', 'How do we begin?', 'Send a short project signal below. We respond with useful questions and the clearest next step.'],
];

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
  return <div className={`fk-page ${embedded ? 'fk-embedded' : ''}`} ref={pageRef} onPointerMove={moveLight}>
    <div className="fk-cursor-light" aria-hidden="true" />
    {!embedded && <header className="fk-nav"><Link to="/" className="logo">elz<b>ion.</b></Link><span>CONCEPT E / KINETIC CONVERSATION</span><div><Link to="/#faq">Close</Link><Link to="/demos/faq-contact-a">Compare ↗</Link></div></header>}
    <Content>
      <section className="fk-faq" id="faq">
        <div className="fk-grid" aria-hidden="true"></div>
        <div className="fk-heading"><span>QUESTIONS / LIVE CHANNEL</span><h1><b>ASK</b><br /><em>ANYTHING.</em></h1><p>Select a signal. The answer arrives in the centre.</p></div>
        <div className="fk-console">
          <div className="fk-question-cloud">
            {QUESTIONS.map(([n,q],i)=><button key={n} className={`fk-q fk-q-${i+1} ${active===i?'active':''}`} onClick={()=>setActive(i)}><span>{n}</span>{q}<i>↗</i><b aria-hidden="true" /></button>)}
          </div>
          <article className="fk-answer" key={active}>
            <i className="fk-answer-no" aria-hidden="true">{QUESTIONS[active][0]}</i>
            <div className="fk-answer-top"><span>ANSWER / {QUESTIONS[active][0]}</span><div>{QUESTIONS.map((_,i)=><b className={active===i?'active':''} key={i} />)}</div></div>
            <h2>{QUESTIONS[active][1]}</h2><p>{QUESTIONS[active][2]}</p>
            <small><i /> ELZION RESPONSE / LIVE</small>
          </article>
        </div>
        <div className="fk-ticker"><div>ASK / LISTEN / UNDERSTAND / BUILD / ASK / LISTEN / UNDERSTAND / BUILD /</div></div>
      </section>

      <section className="fk-contact" id="contact">
        <div className="fk-contact-orbit" aria-hidden="true"><i /><i /><i /><span>LET'S<br />BUILD</span></div>
        <div className="fk-float-tags" aria-hidden="true"><span>IDEA</span><span>DESIGN</span><span>CODE</span><span>LAUNCH</span></div>
        <div className="fk-contact-title"><span>START A CONVERSATION</span><h2>Send us<br />a <em>signal.</em></h2><p>No long brief needed. Start with the shape of the idea.</p></div>
        <div className="fk-conversation">
          <div className="fk-console-head"><div><i /> ACCEPTING NEW PROJECTS</div><span>ELZION / PROJECT INTAKE</span></div>
          <div className="fk-bubble fk-bubble-system"><span>01 / NAME</span><p>What should we call you?</p><input aria-label="Your name" placeholder="Your name" value={fields.name} onChange={update('name')} /></div>
          <div className="fk-bubble fk-bubble-user"><span>02 / EMAIL</span><p>Where can we reach you?</p><input aria-label="Your email" type="email" placeholder="you@company.com" value={fields.email} onChange={update('email')} /></div>
          <div className="fk-bubble fk-bubble-system fk-project"><span>03</span><p>What are we making?</p><div>{['Website','Mobile app','Business system','AI automation'].map(item=><button className={type===item?'active':''} onClick={()=>setType(item)} key={item}>{item}</button>)}</div></div>
          <div className="fk-bubble fk-bubble-user fk-message"><span>04 / PROJECT NOTE</span><p>Give us the short version.</p><textarea aria-label="Project message" placeholder="The problem, the idea, and why now…" value={fields.message} onChange={update('message')} /></div>
          <button className={`fk-send ${sent?'sent':''}`} onClick={()=>setSent(true)}><span>{sent ? 'SIGNAL RECEIVED — WE’LL BE IN TOUCH' : 'TRANSMIT PROJECT SIGNAL'}</span><i>{sent ? '✓' : '↗'}</i></button>
        </div>
        {sent && <div className="fk-transmission" onClick={()=>setSent(false)}><div><span>TRANSMISSION / 001</span><b>YOUR IDEA<br />IS IN MOTION.</b><p>Signal received. Tap anywhere to return.</p></div></div>}
        <div className="fk-pulse" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
      </section>
    </Content>
  </div>;
}
