import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/home/Footer.jsx';
import '../styles/project-concepts.css';

const MODULES = [
  { id: 'overview', n: '01', label: 'Overview', title: 'The whole day, visible.', copy: 'Priorities, recent activity and the next operational move arrive in one composed view.', image: '/assets/projects/jothi/dashboard.jpg' },
  { id: 'groups', n: '02', label: 'Groups', title: 'Every chit, structured.', copy: 'Schedules, terms and member context stay together from setup through the active cycle.', image: '/assets/projects/jothi/screen-3.jpg' },
  { id: 'collect', n: '03', label: 'Collect', title: 'Every payment, traceable.', copy: 'A fast field workflow connects each entry to the member record and the daily close.', image: '/assets/projects/jothi/screen-7.jpg' },
];

export default function JothiVelChitsOS() {
  const [active, setActive] = useState(MODULES[0]);
  return (
    <div className="jvc-page">
      <header className="jvc-nav"><Link to="/" className="logo">elz<b>ion.</b></Link><span>JOTHI VEL CHITS / PRODUCT OS</span><div><Link to="/projects/kadaikutty-pos">Next project</Link><Link to="/#work">All work ↗</Link></div></header>
      <main>
        <section className="jvc-hero">
          <div className="jvc-status"><span><i></i> SYSTEM ONLINE</span><span>JVC / MOBILE OPS / 2026</span></div>
          <div className="jvc-title"><span>JOTHI VEL</span><h1>Product<br />Operating<br /><em>System.</em></h1><p>A modular case study for a mobile product that turns daily chit operations into one connected system.</p></div>
          <div className="jvc-console">
            <aside>
              <span className="jvc-console-label">MODULES</span>
              {MODULES.map((item) => <button key={item.id} className={active.id === item.id ? 'is-active' : ''} onClick={() => setActive(item)}><span>{item.n}</span>{item.label}<i>↗</i></button>)}
              <div className="jvc-console-meta"><span>PLATFORM</span><b>iOS / Android</b><span>SCOPE</span><b>Product / UX / Build</b></div>
            </aside>
            <div className="jvc-console-main">
              <div className="jvc-console-copy" key={`${active.id}-copy`}><span>ACTIVE MODULE / {active.n}</span><h2>{active.title}</h2><p>{active.copy}</p></div>
              <figure className="jvc-console-screen" key={active.id}><img src={active.image} alt={`${active.label} application screen`} /></figure>
              <div className="jvc-crosshair" aria-hidden="true"></div>
            </div>
            <aside className="jvc-console-data"><div><span>CORE FLOW</span><strong>03</strong></div><div><span>CUSTOM UI</span><strong>100%</strong></div><div><span>HAND-OFFS</span><strong>00</strong></div></aside>
          </div>
        </section>

        <section className="jvc-rail">
          <div className="jvc-rail-head"><span>INTERFACE SIGNAL</span><h2>One product.<br />Multiple operating moments.</h2></div>
          <div className="jvc-screen-rail">
            {['screen-1.jpg','screen-2.jpg','screen-4.jpg','screen-8.jpg'].map((file, i) => <figure key={file}><span>0{i + 1}</span><img src={`/assets/projects/jothi/${file}`} alt={`Jothi Vel Chits interface ${i + 1}`} /></figure>)}
          </div>
        </section>

        <section className="jvc-outro"><span>BUILT AROUND THE REAL OPERATION</span><h2>From fragmented tasks<br />to one dependable <em>system.</em></h2><Link to="/projects/kadaikutty-pos">View next project <b>→</b></Link></section>
      </main>
      <Footer />
    </div>
  );
}
