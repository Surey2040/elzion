import { Link } from 'react-router-dom';
import Footer from '../components/home/Footer.jsx';
import '../styles/project-concepts.css';

const SCENES = [
  { n: '01', eyebrow: 'THE OPEN', title: 'Know what needs attention.', copy: 'The home view establishes the day: what is pending, what changed, and where the team should move next.', image: 'dashboard.jpg', tone: 'paper' },
  { n: '02', eyebrow: 'THE BUILD', title: 'Create without second-guessing.', copy: 'A guided sequence gives structure to terms, members and schedules while keeping the product calm.', image: 'screen-2.jpg', tone: 'wine' },
  { n: '03', eyebrow: 'THE CLOSE', title: 'Finish the day with a clear trail.', copy: 'Collections and member history connect naturally, making closing faster and easier to trust.', image: 'screen-8.jpg', tone: 'green' },
];

export default function JothiVelChitsFilm() {
  return (
    <div className="jvd-page">
      <header className="jvd-nav"><Link to="/" className="logo">elz<b>ion.</b></Link><span>A CASE FILM / CONCEPT D</span><div><Link to="/projects/jothi-vel-chits-os">Demo C</Link><Link to="/#work">Close ↑</Link></div></header>
      <main>
        <section className="jvd-hero">
          <span className="jvd-kicker">JOTHI VEL CHITS / MOBILE PRODUCT</span>
          <h1>A clear way<br /><em>forward.</em></h1>
          <p>Not a gallery of screens. A quiet story about how a complicated working day becomes simple to move through.</p>
          <figure><img src="/assets/projects/jothi/screen-1.jpg" alt="Jothi Vel Chits secure login" /></figure>
          <div className="jvd-scroll">SCROLL THROUGH THE STORY <span>↓</span></div>
        </section>

        <section className="jvd-prologue"><span>THE PREMISE</span><p>Financial workflows carry weight. The interface should not add more.</p><small>We designed around confidence, continuity and the rhythm of the real team.</small></section>

        <section className="jvd-scenes">
          {SCENES.map((scene) => (
            <article className={`jvd-scene jvd-scene--${scene.tone}`} key={scene.n}>
              <div className="jvd-scene-copy"><span>{scene.n} / {scene.eyebrow}</span><h2>{scene.title}</h2><p>{scene.copy}</p></div>
              <div className="jvd-scene-frame"><figure><img src={`/assets/projects/jothi/${scene.image}`} alt={`${scene.title} interface`} /></figure><span aria-hidden="true">{scene.n}</span></div>
            </article>
          ))}
        </section>

        <section className="jvd-quote"><span>IN THEIR WORDS</span><blockquote>“They understood how our team<br /><em>actually works.</em>”</blockquote><p>JOTHI VEL / FOUNDER</p><Link to="/projects/jothi-vel-chits">Return to Demo A <b>→</b></Link></section>
      </main>
      <Footer />
    </div>
  );
}
