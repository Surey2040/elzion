import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/home/Footer.jsx';
import '../styles/kadaikutty-control.css';

const COMMANDS = [
  { id: 'billing', index: '01', label: 'Billing', title: 'The counter never waits.', copy: 'A direct, touch-first flow keeps the next action obvious from first item to final bill.', image: '/assets/projects/namba/screen-12.jpg' },
  { id: 'inventory', index: '02', label: 'Inventory', title: 'Every shelf stays visible.', copy: 'Products, inward stock and purchase activity live together in one operational view.', image: '/assets/projects/namba/screen-08.jpg' },
  { id: 'reports', index: '03', label: 'Reports', title: 'The day explains itself.', copy: 'Store activity becomes a clear report the team can read before the shutters come down.', image: '/assets/projects/namba/screen-11.jpg' },
];

const MOMENTS = [
  { n: '01', overline: 'OPEN', title: 'Set the store in motion.', image: 'screen-01.jpg' },
  { n: '02', overline: 'MOVE', title: 'Stock comes in. Sales go out.', image: 'screen-09.jpg' },
  { n: '03', overline: 'KNOW', title: 'See what changed today.', image: 'screen-17.jpg' },
];

export default function KadaikuttyPosControl() {
  const [active, setActive] = useState(COMMANDS[0]);

  return (
    <div className="kc-page">
      <header className="kc-nav">
        <Link to="/" className="logo" aria-label="Elzion home">elz<b>ion.</b></Link>
        <span>KADAIKUTTY / RETAIL CONTROL SYSTEM</span>
        <div><Link to="/projects/jothi-vel-chits">Previous</Link><Link to="/#work">All work ↗</Link></div>
      </header>

      <main>
        <section className="kc-hero">
          <div className="kc-grid" aria-hidden="true"></div>
          <div className="kc-hero-meta"><span><i></i> SYSTEM LIVE</span><span>ANDROID / OFFLINE-FIRST / RETAIL</span></div>
          <div className="kc-hero-title">
            <span>KADAIKUTTY POS</span>
            <h1>THE STORE<br /><em>HAS A PULSE.</em></h1>
            <p>One connected workspace for billing, stock, purchases and reports—made for the speed of a real retail floor.</p>
          </div>
          <div className="kc-orbit" aria-label="Kadaikutty POS interface constellation">
            <div className="kc-orbit-ring"><span>ONE STORE / ONE SIGNAL /</span></div>
            <figure className="kc-phone kc-phone--main"><img src="/assets/projects/namba/screen-12.jpg" alt="Kadaikutty business reports" /></figure>
            <figure className="kc-phone kc-phone--left"><img src="/assets/projects/namba/screen-02.jpg" alt="Kadaikutty master data" /></figure>
            <figure className="kc-phone kc-phone--right"><img src="/assets/projects/namba/screen-08.jpg" alt="Kadaikutty purchase workflow" /></figure>
            <span className="kc-orbit-signal">SYNC<br /><b>READY</b></span>
          </div>
          <div className="kc-scroll">SCROLL TO ENTER <span>↓</span></div>
        </section>

        <section className="kc-manifesto">
          <span>THE PRODUCT IDEA</span>
          <p>A store is not a collection of screens.<br />It is a <em>living sequence</em> of decisions.</p>
          <div className="kc-manifesto-line"><b>SELL</b><i></i><b>STOCK</b><i></i><b>SYNC</b><i></i><b>KNOW</b></div>
        </section>

        <section className="kc-command">
          <div className="kc-command-head"><span>COMMAND DECK / INTERACTIVE</span><h2>Choose a signal.<br />See the system respond.</h2></div>
          <div className="kc-command-console">
            <nav aria-label="Kadaikutty system modules">
              {COMMANDS.map((command) => (
                <button key={command.id} onClick={() => setActive(command)} className={active.id === command.id ? 'active' : ''}>
                  <span>{command.index}</span><b>{command.label}</b><i>↗</i>
                </button>
              ))}
            </nav>
            <div className="kc-command-copy" key={`${active.id}-copy`}>
              <span>ACTIVE SIGNAL / {active.index}</span>
              <h3>{active.title}</h3>
              <p>{active.copy}</p>
              <small>TOUCH-FIRST / FAST / CONNECTED</small>
            </div>
            <div className="kc-command-view" key={active.id}>
              <div className="kc-scanline" aria-hidden="true"></div>
              <figure><img src={active.image} alt={`${active.label} product screen`} /></figure>
              <span>0{active.index} / LIVE VIEW</span>
            </div>
          </div>
        </section>

        <section className="kc-day">
          <div className="kc-day-head"><span>ONE WORKING DAY</span><h2>From open<br />to <em>understood.</em></h2></div>
          <div className="kc-moments">
            {MOMENTS.map((moment) => (
              <article key={moment.n}>
                <div><span>{moment.n} / {moment.overline}</span><h3>{moment.title}</h3></div>
                <figure><img src={`/assets/projects/namba/${moment.image}`} alt={moment.title} /></figure>
              </article>
            ))}
          </div>
        </section>

        <section className="kc-outro">
          <span>BUILT FOR THE REAL FLOOR</span>
          <h2>Less chasing.<br />More <em>knowing.</em></h2>
          <Link to="/#work">Back to all projects <b>↗</b></Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
