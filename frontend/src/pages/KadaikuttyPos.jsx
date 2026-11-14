import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/home/Footer.jsx';
import '../styles/project-page.css';

const SCREEN_SETS = [
  {
    id: 'core',
    label: 'Overview & Billing',
    a: '/assets/projects/namba/screen-02.jpg',
    b: '/assets/projects/namba/screen-12.jpg',
    c: '/assets/projects/namba/screen-08.jpg',
  },
  {
    id: 'inventory',
    label: 'Inventory & Purchases',
    a: '/assets/projects/namba/screen-01.jpg',
    b: '/assets/projects/namba/screen-08.jpg',
    c: '/assets/projects/namba/screen-04.jpg',
  },
  {
    id: 'analytics',
    label: 'Reports & Audits',
    a: '/assets/projects/namba/screen-11.jpg',
    b: '/assets/projects/namba/screen-12.jpg',
    c: '/assets/projects/namba/screen-17.jpg',
  },
];

export default function KadaikuttyPos() {
  const [activeSet, setActiveSet] = useState(SCREEN_SETS[0].id);
  const currentSet = SCREEN_SETS.find((s) => s.id === activeSet) || SCREEN_SETS[0];

  return (
    <div className="proj-page">
      {/* Top Navigation */}
      <header className="proj-header">
        <div className="wrap">
          <Link to="/" className="logo" aria-label="Elzion home">
            elz<b>ion.</b>
          </Link>
          <div className="proj-header-actions">
            <Link to="/#work" className="proj-back-btn">
              <span aria-hidden="true">←</span> Back to Projects
            </Link>
            <a href="/#contact" className="proj-nav-talk">
              Let’s talk <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Showcase */}
      <section className="proj-hero">
        <div className="wrap">
          <div className="proj-hero-head">
            <span className="proj-badge">Retail Technology · Mobile Product</span>
            <h1>Kadaikutty POS</h1>
            <p className="proj-tagline">Every shelf. One pulse.</p>
            <p className="proj-lead">
              A connected operating system for stock, purchases, customers, reports and the people
              running the store. Engineered for fast touch interaction and rock-solid local offline reliability.
            </p>

            <div className="proj-meta-grid">
              <div className="proj-meta-item">
                <span className="proj-meta-label">Client</span>
                <span className="proj-meta-val">Kadaikutty Retail</span>
              </div>
              <div className="proj-meta-item">
                <span className="proj-meta-label">Platforms</span>
                <span className="proj-meta-val">Android POS, Tablet & Mobile</span>
              </div>
              <div className="proj-meta-item">
                <span className="proj-meta-label">Scope</span>
                <span className="proj-meta-val">Full OS Architecture & App Engineering</span>
              </div>
              <div className="proj-meta-item">
                <span className="proj-meta-label">Architecture</span>
                <span className="proj-meta-val">Offline-First with Cloud Sync</span>
              </div>
            </div>
          </div>

          {/* Interactive Screen Preview */}
          <div className="proj-showcase">
            <div className="proj-screens-nav" role="tablist" aria-label="Project screen views">
              {SCREEN_SETS.map((set) => (
                <button
                  key={set.id}
                  type="button"
                  role="tab"
                  aria-selected={activeSet === set.id}
                  className={`proj-screen-tab ${activeSet === set.id ? 'active' : ''}`}
                  onClick={() => setActiveSet(set.id)}
                >
                  {set.label}
                </button>
              ))}
            </div>

            <div className="proj-phones-trio">
              <figure className="proj-phone-trio-item">
                <div className="phone-screen-wrap">
                  <img
                    className="phone-screen-img"
                    src={currentSet.a}
                    alt="Kadaikutty POS screen 1"
                  />
                </div>
                <img
                  className="phone-frame"
                  src="/assets/mockups/iphone-17-pro-silver.png"
                  alt=""
                  aria-hidden="true"
                />
              </figure>

              <figure className="proj-phone-trio-item" style={{ transform: 'translateY(-12px)' }}>
                <div className="phone-screen-wrap">
                  <img
                    className="phone-screen-img"
                    src={currentSet.b}
                    alt="Kadaikutty POS screen 2"
                  />
                </div>
                <img
                  className="phone-frame"
                  src="/assets/mockups/iphone-17-pro-blue.png"
                  alt=""
                  aria-hidden="true"
                />
              </figure>

              <figure className="proj-phone-trio-item">
                <div className="phone-screen-wrap">
                  <img
                    className="phone-screen-img"
                    src={currentSet.c}
                    alt="Kadaikutty POS screen 3"
                  />
                </div>
                <img
                  className="phone-frame"
                  src="/assets/mockups/iphone-17-pro-silver.png"
                  alt=""
                  aria-hidden="true"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* System Stats & Overview */}
      <section className="proj-section dark">
        <div className="wrap">
          <div className="proj-section-head center">
            <span className="proj-badge">The Product System</span>
            <h2>Built for the <em>rhythm of retail.</em></h2>
            <p style={{ margin: '10px auto 0' }}>
              Kadaikutty POS brings master data, inward inventory, billing, reporting, backup and staff control into one dependable mobile workspace.
            </p>
          </div>

          <div className="proj-stats-bar">
            <div className="proj-stat-box">
              <div className="proj-stat-num">20</div>
              <div className="proj-stat-desc">Core Screens</div>
            </div>
            <div className="proj-stat-box">
              <div className="proj-stat-num">06</div>
              <div className="proj-stat-desc">Connected Flows</div>
            </div>
            <div className="proj-stat-box">
              <div className="proj-stat-num">01</div>
              <div className="proj-stat-desc">Calm System</div>
            </div>
          </div>

          {/* Connected Workflows */}
          <div className="proj-section-head" style={{ marginTop: '50px' }}>
            <span className="proj-badge">From Stock-In To Store Insight</span>
            <h2>One system. <em>No blind spots.</em></h2>
          </div>

          <div className="proj-flows-grid">
            <article className="proj-flow-card">
              <span className="proj-flow-step">01 / ORGANISE</span>
              <div className="proj-flow-phone">
                <div className="phone-screen-wrap">
                  <img
                    className="phone-screen-img"
                    src="/assets/projects/namba/screen-01.jpg"
                    alt="Organise products"
                  />
                </div>
                <img
                  className="phone-frame"
                  src="/assets/mockups/iphone-17-pro-blue.png"
                  alt=""
                  aria-hidden="true"
                />
              </div>
              <h3>Master every detail.</h3>
              <p>Products, categories, suppliers and customer records stay structured and instantly searchable.</p>
            </article>

            <article className="proj-flow-card">
              <span className="proj-flow-step">02 / RECEIVE</span>
              <div className="proj-flow-phone">
                <div className="phone-screen-wrap">
                  <img
                    className="phone-screen-img"
                    src="/assets/projects/namba/screen-08.jpg"
                    alt="Inward stock purchase"
                  />
                </div>
                <img
                  className="phone-frame"
                  src="/assets/mockups/iphone-17-pro-silver.png"
                  alt=""
                  aria-hidden="true"
                />
              </div>
              <h3>Move stock inward.</h3>
              <p>Draft purchases, log supplier bills, and build an airtight inward audit trail without friction.</p>
            </article>

            <article className="proj-flow-card">
              <span className="proj-flow-step">03 / UNDERSTAND</span>
              <div className="proj-flow-phone">
                <div className="phone-screen-wrap">
                  <img
                    className="phone-screen-img"
                    src="/assets/projects/namba/screen-11.jpg"
                    alt="Business reports"
                  />
                </div>
                <img
                  className="phone-frame"
                  src="/assets/mockups/iphone-17-pro-blue.png"
                  alt=""
                  aria-hidden="true"
                />
              </div>
              <h3>See the store clearly.</h3>
              <p>Live inventory valuations, daily gross margins, sales breakdowns, and dead-stock alerts.</p>
            </article>

            <article className="proj-flow-card">
              <span className="proj-flow-step">04 / PROTECT</span>
              <div className="proj-flow-phone">
                <div className="phone-screen-wrap">
                  <img
                    className="phone-screen-img"
                    src="/assets/projects/namba/screen-17.jpg"
                    alt="Security and backup"
                  />
                </div>
                <img
                  className="phone-frame"
                  src="/assets/mockups/iphone-17-pro-silver.png"
                  alt=""
                  aria-hidden="true"
                />
              </div>
              <h3>Keep records safe.</h3>
              <p>Automated local backups, cloud sync checkpoints, role-based pin locks and thermal printer drivers.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Client Feedback */}
      <section className="proj-section">
        <div className="wrap">
          <div className="proj-feedback-box">
            <div className="proj-feedback-quote-mark">“</div>
            <h2 className="proj-feedback-quote">
              Now we know what the store is doing—<em>before the day ends.</em>
            </h2>
            <p className="proj-feedback-body">
              ELZION brought inventory, purchases, reports and daily controls into one system
              our team can actually use. The workflow feels faster, clearer and far easier to trust.
            </p>
            <div className="proj-feedback-author">
              <div className="proj-author-info">
                <strong>SASI</strong>
                <span>STORE OWNER · KADAIKUTTY POS</span>
              </div>
              <div className="proj-feedback-wave" aria-hidden="true">
                <i></i><i></i><i></i><i></i><i></i>
              </div>
            </div>
          </div>

          {/* Bottom Switcher */}
          <div className="proj-bottom-nav">
            <Link to="/projects/jothi-vel-chits" className="proj-other-link back">
              <span aria-hidden="true">←</span> Previous Project: <strong>Jothi Vel Chits</strong>
            </Link>
            <Link to="/#work" className="proj-other-link">
              Back to all work <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
