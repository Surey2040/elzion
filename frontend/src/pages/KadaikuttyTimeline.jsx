import { Link } from 'react-router-dom';
import Footer from '../components/home/Footer.jsx';
import '../styles/kadaikutty-timeline.css';

const EVENTS = [
  { time: '08:00', label: 'OPEN', title: 'The store wakes up organised.', copy: 'Products, categories and staff access are ready before the first customer arrives.', screen: 'screen-01.jpg' },
  { time: '11:30', label: 'RECEIVE', title: 'New stock enters one clear record.', copy: 'Purchases and inward inventory move together without a disconnected paper trail.', screen: 'screen-08.jpg' },
  { time: '16:45', label: 'SELL', title: 'The counter keeps its rhythm.', copy: 'Touch-first actions keep billing and daily store operations moving.', screen: 'screen-12.jpg' },
  { time: '21:00', label: 'KNOW', title: 'The day closes with an answer.', copy: 'Reports reveal what moved, what remains and what needs attention tomorrow.', screen: 'screen-11.jpg' },
];

export default function KadaikuttyTimeline() {
  return <div className="kt-page">
    <header className="kt-nav"><Link to="/" className="logo">elz<b>ion.</b></Link><span>CONCEPT E / RETAIL TIMELINE</span><div><Link to="/projects/kadaikutty-pos-d">Previous</Link><Link to="/#work">All work ↗</Link></div></header>
    <main>
      <section className="kt-hero">
        <div className="kt-hero-top"><span>KADAIKUTTY POS / ONE WORKING DAY</span><b>08:00—21:00</b></div>
        <h1>A STORE<br />IN <em>MOTION.</em></h1>
        <p>Follow one retail day through a connected system—from opening setup to the final report.</p>
        <div className="kt-clock" aria-hidden="true"><i></i><b>LIVE</b><span>13H</span></div>
        <figure className="kt-hero-phone"><img src="/assets/projects/namba/screen-12.jpg" alt="Kadaikutty POS reports" /></figure>
        <div className="kt-scroll">ENTER THE TIMELINE ↓</div>
      </section>

      <section className="kt-timeline">
        <div className="kt-line" aria-hidden="true"></div>
        {EVENTS.map((event, index) => <article key={event.time} className={index % 2 ? 'reverse' : ''}>
          <div className="kt-time"><b>{event.time}</b><span>{event.label}</span></div>
          <div className="kt-copy"><span>EVENT / 0{index + 1}</span><h2>{event.title}</h2><p>{event.copy}</p></div>
          <figure><img src={`/assets/projects/namba/${event.screen}`} alt={event.title} /></figure>
          <i className="kt-node" aria-hidden="true"></i>
        </article>)}
      </section>

      <section className="kt-summary"><span>21:01 / SYSTEM READY FOR TOMORROW</span><h2>Every moment<br />leaves a <em>clear signal.</em></h2><div><b>01</b><span>Connected retail system</span><b>04</b><span>Essential daily movements</span><b>00</b><span>Blind spots</span></div><Link to="/#work">Back to projects ↗</Link></section>
    </main>
    <Footer />
  </div>;
}
