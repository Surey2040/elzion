// Positions are artboard px from the 1672×941 design (x is relative to the page centre);
// home.css turns them into real sizes via the --u unit.
const card = (x, y, w, tilt, ar) => ({ '--x': x, '--y': y, '--w': w, '--tilt': `${tilt}deg`, '--ar': ar });

const NOTES = [
  { lines: ['Modern', 'Websites'], x: -580, y: 174, r: -8 },
  { lines: ['Online', 'Stores'], x: -712, y: 748, r: -14 },
  { lines: ['Streamline', 'Operations'], x: -700, y: 860, r: -12 },
  { lines: ['Ideas', 'to Apps'], x: 775, y: 250, r: -4 },
  { lines: ['Manage', 'Relationships'], x: 760, y: 860, r: -16 },
];

const ARROWS = [
  { x: -535, y: 199, w: 65, box: '0 0 65 50', line: 'M6 10 C 8 30, 30 40, 58 39', head: 'M49 32 L58 39 L49 45' },
  { x: -700, y: 660, w: 56, box: '0 0 56 56', line: 'M8 52 C 14 34, 30 24, 44 6', head: 'M35 9 L44 6 L44 15', green: true },
  { x: -628, y: 856, w: 100, box: '0 0 100 50', line: 'M4 16 C 30 4, 70 8, 96 44', head: 'M96 35 L96 44 L87 41' },
  { x: 724, y: 262, w: 52, box: '0 0 52 58', line: 'M44 8 C 40 30, 28 44, 10 50', head: 'M19 53 L10 50 L15 43' },
  { x: 670, y: 785, w: 70, box: '0 0 70 50', line: 'M61 42 C 58 22, 40 10, 8 9', head: 'M17 2 L8 9 L17 16', green: true },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-inner">
          <span className="badge">Built for what’s next</span>
          <span className="eyebrow">Think. Design. Build.</span>
          <h1>Your Next Product, <em>Engineered.</em></h1>
          <p className="sub">
            We design and build websites, applications, ERP and CRM systems that help businesses work smarter, faster
            and grow further.
          </p>
          <a href="#contact" className="hero-cta">
            Plan Your Solution <span className="arr" aria-hidden="true">→</span>
          </a>
          <span className="check">
            Free discovery call <span className="sep" aria-hidden="true">·</span> No commitment
          </span>
        </div>

        <div className="shots">
                    <figure className="shot" style={card(-348, 175, 214, 7, 1)}>
            <div className="scr m-site m-estate">
              <div className="bar"><b></b><span></span><span></span><span></span><i></i></div>
              <div className="copy"><strong>Spaces<br />that Inspire</strong><span></span><span></span><em></em></div>
            </div>
            <figcaption>Web Design</figcaption>
          </figure>

          <figure className="shot" style={card(562, 378, 214, 37, 1)}>
            <div className="scr m-app2">
              <div className="ph ph-dark"><b></b><strong>Track<br />Manage<br />Grow</strong><span></span><i></i></div>
              <div className="ph ph-light"><b></b><span></span><span></span><span></span><span></span><span></span></div>
            </div>
            <figcaption>App Development</figcaption>
          </figure>

          <figure className="shot" style={card(-627, 513, 214, -10, 1)}>
            <div className="scr m-site m-shop">
              <div className="bar"><b></b><span></span><span></span><span></span><i></i></div>
              <div className="copy"><strong>New<br />Collection</strong><span></span><em></em></div>
              <div className="row"><i></i><i></i><i></i><i></i><i></i></div>
            </div>
            <figcaption>E-commerce</figcaption>
          </figure>

          <figure className="shot" style={card(533, 785, 214, -13, 1)}>
            <div className="scr m-crm2">
              <div className="hd"><b></b>CRM<i></i></div>
              <div className="cols">
                <div className="col"><small>New Leads</small><p></p><p></p><p></p></div>
                <div className="col"><small>In Progress</small><p></p><p></p><p></p></div>
                <div className="col won"><small>Closed Won</small><p></p><p></p></div>
              </div>
            </div>
            <figcaption>CRM Solutions</figcaption>
          </figure>

          <figure className="shot" style={card(-395, 985, 214, -34, 1)}>
            <div className="scr m-erp2">
              <div className="side"><b></b><span></span><span></span><span></span><span></span><span></span><span></span></div>
              <div className="main">
                <div className="top"><span></span><i></i></div>
                <div className="kpis">
                  <div><small>Revenue</small><strong>₹24,50,000</strong><em></em></div>
                  <div><small>Orders</small><strong>₹3,200</strong><em></em></div>
                </div>
                <div className="row2">
                  <div className="bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
                  <div className="donut"><span></span></div>
                </div>
              </div>
            </div>
            <figcaption>ERP Systems</figcaption>
          </figure>
        </div>

        <div aria-hidden="true">
          {NOTES.map(({ lines, x, y, r }) => (
            <span key={lines[0]} className="hn" style={{ '--x': x, '--y': y, '--r': `${r}deg` }}>
              {lines[0]}<br />{lines[1]}
            </span>
          ))}
          {ARROWS.map(({ x, y, w, box, line, head, green }) => (
            <svg
              key={`${x}-${y}`}
              className={green ? 'hn-arrow g' : 'hn-arrow'}
              style={{ '--x': x, '--y': y, '--w': w }}
              viewBox={box}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={line} pathLength={1} />
              <path d={head} pathLength={1} />
            </svg>
          ))}
        </div>
      </div>
    </section>
  );
}
