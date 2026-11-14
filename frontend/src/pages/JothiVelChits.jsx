import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/home/Footer.jsx';
import '../styles/project-page.css';

const CHAPTERS = [
  {
    id: 'organise', number: '01', label: 'Organise',
    title: 'Every group, in one calm view.',
    copy: 'Managers can move from today’s work to member records and active chit groups without losing context.',
    screen: '/assets/projects/jothi/dashboard.jpg', detail: '/assets/projects/jothi/screen-3.jpg',
  },
  {
    id: 'create', number: '02', label: 'Create',
    title: 'Set up a chit without the paperwork maze.',
    copy: 'A guided creation flow keeps contribution values, schedules and group details clear from the first step.',
    screen: '/assets/projects/jothi/screen-2.jpg', detail: '/assets/projects/jothi/screen-4.jpg',
  },
  {
    id: 'collect', number: '03', label: 'Collect',
    title: 'Field collections that close cleanly.',
    copy: 'Agents can record collections quickly, while managers retain a dependable trail for daily closing.',
    screen: '/assets/projects/jothi/screen-7.jpg', detail: '/assets/projects/jothi/screen-8.jpg',
  },
];

export default function JothiVelChits() {
  const [activeChapter, setActiveChapter] = useState(CHAPTERS[0]);

  useEffect(() => {
    const elements = [...document.querySelectorAll('.jv-reveal')];
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
    }, { threshold: 0.16 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="proj-page jv-page">
      <header className="proj-header jv-header">
        <div className="wrap">
          <Link to="/" className="logo" aria-label="Elzion home">elz<b>ion.</b></Link>
          <div className="proj-header-actions">
            <Link to="/#work" className="proj-back-btn"><span aria-hidden="true">←</span> All work</Link>
            <a href="/#contact" className="proj-nav-talk">Let’s talk <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </header>

      <main>
        <section className="jv-hero">
          <div className="jv-hero-grid wrap">
            <div className="jv-hero-copy">
              <div className="jv-case-line"><span>CASE / 01</span><i aria-hidden="true"></i><span>FINTECH · MOBILE</span></div>
              <h1>Money moves.<br /><em>People connect.</em></h1>
              <p>A focused mobile product for chit groups, member records, field collections and daily closing—built around how the team actually works.</p>
              <div className="jv-hero-tags" aria-label="Project scope">
                <span>Product strategy</span><span>UX / UI</span><span>Mobile engineering</span>
              </div>
              <a className="jv-scroll-cue" href="#jv-story">Explore the product <span aria-hidden="true">↓</span></a>
            </div>

            <div className="jv-hero-stage" aria-label="Jothi Vel Chits app interface preview">
              <div className="jv-orbit jv-orbit--one" aria-hidden="true"></div>
              <div className="jv-orbit jv-orbit--two" aria-hidden="true"></div>
              <figure className="jv-device jv-device--left"><img src="/assets/projects/jothi/screen-1.jpg" alt="Jothi Vel Chits secure login screen" /></figure>
              <figure className="jv-device jv-device--center"><img src="/assets/projects/jothi/dashboard.jpg" alt="Jothi Vel Chits dashboard" /></figure>
              <figure className="jv-device jv-device--right"><img src="/assets/projects/jothi/screen-3.jpg" alt="Jothi Vel Chits group overview screen" /></figure>
              <div className="jv-stage-stamp" aria-hidden="true">DESIGNED<br />FOR THE<br />REAL DAY</div>
            </div>
          </div>
          <div className="jv-marquee" aria-hidden="true">
            <span>GROUPS · MEMBERS · COLLECTIONS · CLOSING · GROUPS · MEMBERS · COLLECTIONS · CLOSING · </span>
            <span>GROUPS · MEMBERS · COLLECTIONS · CLOSING · GROUPS · MEMBERS · COLLECTIONS · CLOSING · </span>
          </div>
        </section>

        <section className="jv-story" id="jv-story">
          <div className="wrap jv-reveal">
            <div className="jv-story-intro">
              <span className="jv-eyebrow">THE PRODUCT IDEA</span>
              <h2>Complex operations.<br /><em>One clear rhythm.</em></h2>
              <p>Instead of translating paper ledgers into another crowded dashboard, the experience follows the natural sequence of a working day.</p>
            </div>
            <div className="jv-story-metrics" aria-label="Project highlights">
              <div><strong>01</strong><span>Shared mobile workflow</span></div>
              <div><strong>03</strong><span>Core operating moments</span></div>
              <div><strong>100%</strong><span>Custom product design</span></div>
            </div>
          </div>
        </section>

        <section className="jv-explorer">
          <div className="wrap">
            <div className="jv-explorer-head jv-reveal">
              <div><span className="jv-eyebrow">INTERACTIVE PRODUCT WALKTHROUGH</span><h2>Follow the workflow.</h2></div>
              <p>Choose a chapter to see how the interface changes with the job at hand.</p>
            </div>

            <div className="jv-explorer-grid jv-reveal">
              <div className="jv-chapter-tabs" role="tablist" aria-label="Product workflow chapters">
                {CHAPTERS.map((chapter) => (
                  <button key={chapter.id} type="button" role="tab" aria-selected={activeChapter.id === chapter.id} className={activeChapter.id === chapter.id ? 'is-active' : ''} onClick={() => setActiveChapter(chapter)}>
                    <span>{chapter.number}</span><strong>{chapter.label}</strong><i aria-hidden="true">→</i>
                  </button>
                ))}
              </div>

              <div className="jv-chapter-stage">
                <div className="jv-chapter-copy" key={`${activeChapter.id}-copy`}>
                  <span>CHAPTER {activeChapter.number}</span><h3>{activeChapter.title}</h3><p>{activeChapter.copy}</p>
                </div>
                <div className="jv-chapter-visual" key={activeChapter.id}>
                  <figure className="jv-product-screen jv-product-screen--main"><img src={activeChapter.screen} alt={`${activeChapter.label} primary app screen`} /></figure>
                  <figure className="jv-product-screen jv-product-screen--detail"><img src={activeChapter.detail} alt={`${activeChapter.label} detail app screen`} /></figure>
                  <span className="jv-chapter-index" aria-hidden="true">{activeChapter.number}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="jv-impact">
          <div className="wrap jv-reveal">
            <p className="jv-impact-quote">“They understood how our team <em>actually works.</em>”</p>
            <div className="jv-impact-foot">
              <span><strong>JOTHI VEL</strong><small>FOUNDER · JOTHI VEL CHITS</small></span>
              <Link to="/projects/kadaikutty-pos">Next project <strong>Kadaikutty POS</strong> <i aria-hidden="true">→</i></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
