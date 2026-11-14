import { Link } from 'react-router-dom';
import '../styles/faq-contact-demos.css';

const FAQS = [
  ['What kind of projects does Elzion take on?', 'Websites, mobile apps, AI agents and automation, ERP and business systems, cloud setup and branding. Many projects combine several of these.'],
  ['Do you work with startups or established businesses?', 'Both. We work with founders shaping a first product and with businesses replacing spreadsheets or old software.'],
  ['How long does a project take?', 'After discovery we share a clear timeline and milestone plan before any work starts.'],
  ['Who owns the code and designs?', 'You do. At handover we transfer the source code, design files and cloud accounts to you.'],
  ['What happens after launch?', 'Take the product in-house or add Elzion Care+ for monitoring, fixes, updates and new features.'],
];

const META = {
  a: ['SUPPORT CONSOLE', 'Questions, resolved.', 'Start a project signal.'],
  b: ['EDITORIAL Q&A', 'Everything you need to know.', 'Tell us what comes next.'],
  c: ['SIGNAL BOARD', 'Clear answers. Zero noise.', 'Transmit your idea.'],
  d: ['CONVERSATION FLOW', 'Let’s make this simple.', 'One message can start it.'],
};

export default function FaqContactDemo({ variant }) {
  const [name, faqTitle, contactTitle] = META[variant];
  const next = variant === 'a' ? 'b' : variant === 'b' ? 'c' : variant === 'c' ? 'd' : 'a';
  return <div className={`fc-page fc-${variant}`}>
    <header className="fc-nav"><Link to="/" className="logo">elz<b>ion.</b></Link><span>CONCEPT {variant.toUpperCase()} / {name}</span><div><Link to="/#faq">Close</Link><Link to={`/demos/faq-contact-${next}`}>Next ↗</Link></div></header>
    <main>
      <section className="fc-faq">
        <div className="fc-faq-head"><span>FAQ / 01</span><h1>{faqTitle}</h1><p>Useful answers before we begin building together.</p></div>
        <div className="fc-faq-list">{FAQS.map(([q,a],i)=><details key={q} open={i===0}><summary><span>0{i+1}</span>{q}<i>+</i></summary><p>{a}</p></details>)}</div>
        <div className="fc-orbit" aria-hidden="true"><i></i><b>?</b><span>ASK / ANSWER /</span></div>
      </section>

      <section className="fc-contact">
        <div className="fc-contact-copy"><span>CONTACT / 02</span><h2>{contactTitle}</h2><p>Share the idea, the challenge and where you want to go. We’ll come back with focused questions and a practical next step.</p><div className="fc-status"><i></i> AVAILABLE FOR SELECT PROJECTS</div></div>
        <form className="fc-form" onSubmit={(e)=>e.preventDefault()}>
          <div className="fc-field"><label>Name</label><input placeholder="Your name" /></div>
          <div className="fc-field"><label>Email</label><input type="email" placeholder="you@company.com" /></div>
          <div className="fc-field"><label>Project type</label><select defaultValue=""><option value="" disabled>Select a direction</option><option>Website</option><option>Mobile app</option><option>ERP / business system</option><option>AI automation</option></select></div>
          <div className="fc-field fc-full"><label>About the project</label><textarea placeholder="What are you building, and why now?" /></div>
          <button type="submit">Send the signal <span>↗</span></button>
          <small>NO SPAM / NO SALES SCRIPT / JUST A REAL CONVERSATION</small>
        </form>
      </section>
    </main>
  </div>;
}
