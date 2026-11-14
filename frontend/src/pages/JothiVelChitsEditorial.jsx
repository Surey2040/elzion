import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/home/Footer.jsx';
import '../styles/project-editorial.css';

const DECK = [
  { id: 'home', label: 'Home', note: 'The working day at a glance', image: '/assets/projects/jothi/dashboard.jpg' },
  { id: 'chit', label: 'Chit setup', note: 'A guided path from terms to launch', image: '/assets/projects/jothi/screen-2.jpg' },
  { id: 'members', label: 'Members', note: 'Records, tickets and history in context', image: '/assets/projects/jothi/screen-4.jpg' },
  { id: 'collect', label: 'Collection', note: 'Fast field entries with a dependable trail', image: '/assets/projects/jothi/screen-7.jpg' },
];

export default function JothiVelChitsEditorial() {
  const [active, setActive] = useState(DECK[0]);

  useEffect(() => {
    const elements = [...document.querySelectorAll('.jve-reveal')];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="jve-page">
      <header className="jve-nav">
        <Link to="/" className="logo" aria-label="Elzion home">elz<b>ion.</b></Link>
        <div className="jve-nav-mid"><span>CONCEPT B</span><i></i><span>EDITORIAL CASE FILE</span></div>
        <div className="jve-nav-actions">
          <Link to="/projects/jothi-vel-chits">View Demo A</Link>
          <Link to="/#work">All work ↗</Link>
        </div>
      </header>

      <main>
        <section className="jve-hero">
          <div className="jve-hero-title" aria-label="Jothi Vel Chits">
            <span>JOTHI</span><span>VEL</span><span>CHITS</span>
          </div>
          <div className="jve-hero-note">
            <span>01 / FINTECH PRODUCT</span>
            <p>A mobile operating rhythm for groups, members, collections and daily closing.</p>
          </div>
          <div className="jve-hero-art" aria-label="App interface collage">
            <div className="jve-art-disc" aria-hidden="true"><span>PRODUCT<br />STORY<br />2026</span></div>
            <figure className="jve-art-screen jve-art-screen--a"><img src="/assets/projects/jothi/screen-1.jpg" alt="Secure PIN screen" /></figure>
            <figure className="jve-art-screen jve-art-screen--b"><img src="/assets/projects/jothi/dashboard.jpg" alt="Product dashboard" /></figure>
            <figure className="jve-art-screen jve-art-screen--c"><img src="/assets/projects/jothi/screen-3.jpg" alt="Group overview" /></figure>
            <div className="jve-art-caption" aria-hidden="true">REAL SCREENS<br />NO MOCKUP MASKS</div>
          </div>
          <a className="jve-hero-down" href="#case-file">OPEN THE CASE FILE <span>↓</span></a>
        </section>

        <div className="jve-ticker" aria-hidden="true">
          <span>ONE TEAM / ONE PRODUCT / ONE CLEAR DAILY FLOW / </span>
          <span>ONE TEAM / ONE PRODUCT / ONE CLEAR DAILY FLOW / </span>
        </div>

        <section className="jve-case" id="case-file">
          <div className="jve-case-head jve-reveal">
            <span className="jve-kicker">THE CASE FILE</span>
            <h1>Turn a complex<br />working day into<br /><em>three clear moves.</em></h1>
          </div>

          <div className="jve-moves">
            <article className="jve-move jve-reveal">
              <div className="jve-move-copy"><span>MOVE 01</span><h2>See the day.</h2><p>Open to priorities, recent activity and the next action—not a wall of admin.</p></div>
              <div className="jve-move-visual jve-move-visual--wine"><figure><img src="/assets/projects/jothi/dashboard.jpg" alt="Daily dashboard screen" /></figure><b>THE<br />OVERVIEW</b></div>
            </article>
            <article className="jve-move jve-move--reverse jve-reveal">
              <div className="jve-move-copy"><span>MOVE 02</span><h2>Build the group.</h2><p>Terms, schedule and member setup follow one guided sequence with less room for error.</p></div>
              <div className="jve-move-visual jve-move-visual--green"><figure><img src="/assets/projects/jothi/screen-2.jpg" alt="Chit setup screen" /></figure><b>THE<br />SETUP</b></div>
            </article>
            <article className="jve-move jve-reveal">
              <div className="jve-move-copy"><span>MOVE 03</span><h2>Close with confidence.</h2><p>Collection records stay connected to member history and the day’s final reconciliation.</p></div>
              <div className="jve-move-visual jve-move-visual--ink"><figure><img src="/assets/projects/jothi/screen-7.jpg" alt="Collection workflow screen" /></figure><b>THE<br />CLOSE</b></div>
            </article>
          </div>
        </section>

        <section className="jve-deck">
          <div className="jve-deck-head jve-reveal">
            <div><span className="jve-kicker">INTERFACE DECK</span><h2>Pick a screen.<br />Read the intent.</h2></div>
            <p>The interface is presented like a working design review—each screen paired with the job it needs to make easier.</p>
          </div>
          <div className="jve-deck-grid jve-reveal">
            <div className="jve-deck-tabs" role="tablist" aria-label="Interface deck">
              {DECK.map((item, index) => (
                <button key={item.id} type="button" role="tab" aria-selected={active.id === item.id} className={active.id === item.id ? 'is-active' : ''} onClick={() => setActive(item)}>
                  <span>0{index + 1}</span><strong>{item.label}</strong><i>↗</i>
                </button>
              ))}
            </div>
            <div className="jve-deck-stage">
              <div className="jve-deck-copy" key={`${active.id}-copy`}><span>SCREEN INTENT</span><h3>{active.note}</h3></div>
              <figure className="jve-deck-screen" key={active.id}><img src={active.image} alt={`${active.label} app screen`} /></figure>
              <div className="jve-deck-code" aria-hidden="true">JVC / {active.id.toUpperCase()} / 0{DECK.indexOf(active) + 1}</div>
            </div>
          </div>
        </section>

        <section className="jve-outro">
          <div className="jve-reveal">
            <span>THE RESULT</span>
            <p>Less software to learn.<br /><em>More work that simply flows.</em></p>
            <Link to="/projects/jothi-vel-chits">Compare with Demo A <b>→</b></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
