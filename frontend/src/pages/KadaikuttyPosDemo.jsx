import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/home/Footer.jsx';
import '../styles/kadaikutty-demo.css';

const MODES = [
  { id: 'sell', no: '01', label: 'Sell', title: 'Make every tap count.', text: 'A focused billing flow keeps the counter moving and the next action obvious.', image: '/assets/projects/namba/screen-12.jpg', color: '#14c47f' },
  { id: 'stock', no: '02', label: 'Stock', title: 'Know what is on every shelf.', text: 'Products, purchases and inward stock stay connected in one dependable record.', image: '/assets/projects/namba/screen-08.jpg', color: '#14c47f' },
  { id: 'insight', no: '03', label: 'Insight', title: 'Read the store in real time.', text: 'Reports turn daily activity into a clear view of what needs attention next.', image: '/assets/projects/namba/screen-11.jpg', color: '#14c47f' },
];

const FLOW_SCREENS = ['screen-01.jpg', 'screen-04.jpg', 'screen-09.jpg', 'screen-17.jpg'];

export default function KadaikuttyPosDemo() {
  const [mode, setMode] = useState(MODES[0]);

  return (
    <div className="kk-page">
      <header className="kk-nav">
        <Link to="/" className="logo" aria-label="Elzion home">elz<b>ion.</b></Link>
        <span>KADAIKUTTY POS / RETAIL SYSTEM</span>
        <div><Link to="/projects/jothi-vel-chits">Previous</Link><Link to="/#work">Close ↗</Link></div>
      </header>

      <main>
        <section className="kk-hero">
          <div className="kk-hero-copy">
            <span className="kk-eyebrow">RETAIL, IN MOTION / 2026</span>
            <h1>Every shelf.<br /><em>One pulse.</em></h1>
            <p>A mobile-first retail system that connects billing, stock, purchases and reports without slowing down the counter.</p>
          </div>
          <div className="kk-hero-stage" aria-label="Kadaikutty POS mobile interface">
            <span className="kk-stage-word">SALE</span>
            <figure><img src="/assets/projects/namba/screen-12.jpg" alt="Kadaikutty POS dashboard" /></figure>
            <div className="kk-receipt">
              <span>LIVE STORE SIGNAL</span>
              <b>STOCK</b><i>CONNECTED</i>
              <b>SALES</b><i>VISIBLE</i>
              <b>REPORTS</b><i>READY</i>
              <small>ONE SYSTEM / NO BLIND SPOTS</small>
            </div>
          </div>
          <div className="kk-ticker" aria-hidden="true"><div>SELL / STOCK / SYNC / UNDERSTAND / SELL / STOCK / SYNC / UNDERSTAND /</div></div>
        </section>

        <section className="kk-switchboard">
          <div className="kk-switch-head">
            <span>THE OPERATING RHYTHM</span>
            <h2>One counter.<br />Three essential moves.</h2>
          </div>
          <div className="kk-switch-grid">
            <nav aria-label="Retail system views">
              {MODES.map((item) => (
                <button key={item.id} className={mode.id === item.id ? 'active' : ''} onClick={() => setMode(item)} style={{ '--mode-color': item.color }}>
                  <span>{item.no}</span><b>{item.label}</b><i>↗</i>
                </button>
              ))}
            </nav>
            <div className="kk-switch-copy" key={`${mode.id}-copy`} style={{ '--mode-color': mode.color }}>
              <span>ACTIVE FLOW / {mode.no}</span><h3>{mode.title}</h3><p>{mode.text}</p>
            </div>
            <figure className="kk-switch-phone" key={mode.id} style={{ '--mode-color': mode.color }}><img src={mode.image} alt={`${mode.label} workflow`} /></figure>
          </div>
        </section>

        <section className="kk-strip">
          <div className="kk-strip-title"><span>FROM OPEN TO CLOSE</span><h2>A full day,<br /><em>beautifully connected.</em></h2></div>
          <div className="kk-strip-screens">
            {FLOW_SCREENS.map((screen, index) => (
              <figure key={screen}><span>0{index + 1}</span><img src={`/assets/projects/namba/${screen}`} alt={`Kadaikutty workflow ${index + 1}`} /></figure>
            ))}
          </div>
        </section>

        <section className="kk-final">
          <span>KADAIKUTTY POS / BUILT BY ELZION</span>
          <h2>Retail clarity,<br />right in your <em>hand.</em></h2>
          <Link to="/#work">Back to all work <b>↗</b></Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
