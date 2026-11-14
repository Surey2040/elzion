import '../../styles/footer.css';

const NAV = [
  ['How we work', '#process'],
  ['Services', '#services'],
  ['Work', '#work'],
  ['FAQs', '#faq'],
];

const SERVICES = ['Websites', 'Mobile apps', 'ERP & CRM systems', 'AI automation'];

const SOCIALS = ['LinkedIn', 'Instagram', 'Behance', 'GitHub'];

const TAPE = ['Let’s build', 'Design', 'Engineer', 'Launch', 'Grow', 'Repeat'];

function Tape({ className }) {
  const group = (hidden) => (
    <div className="ft-tape-group" aria-hidden={hidden || undefined}>
      {TAPE.map((word) => (
        <span key={word}>{word}<i>✦</i></span>
      ))}
    </div>
  );
  return (
    <div className={`ft-tape ${className}`}>
      <div className="ft-tape-track">{group(false)}{group(true)}</div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-cta">
            <h2>
              Got an idea?
              <br />
              Let’s make it <em>real.</em>
            </h2>
          </div>
          <a href="#contact" className="ft-orb" aria-label="Start a project">
            <svg viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="ft-orb-path" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
              </defs>
              <text>
                <textPath href="#ft-orb-path">START A PROJECT • START A PROJECT • </textPath>
              </text>
            </svg>
            <span className="ft-orb-core" aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="ft-grid">
          <div className="ft-brand">
            <span className="logo">elz<b>ion.</b></span>
            <p>
              ELZION is an independent technology startup building intelligent software, immersive interfaces and
              scalable digital systems.
            </p>
          </div>
          <div className="ft-col">
            <h4>Navigation</h4>
            <ul>
              {NAV.map(([label, href]) => (
                <li key={label}><a href={href}><span>{label}</span></a></li>
              ))}
            </ul>
          </div>
          <div className="ft-col">
            <h4>Services</h4>
            <ul>
              {SERVICES.map((label) => (
                <li key={label}><a href="#services"><span>{label}</span></a></li>
              ))}
            </ul>
          </div>
          <div className="ft-col">
            <h4>Socials</h4>
            <ul>
              {SOCIALS.map((label) => (
                <li key={label}><a href="#top"><span>{label}</span><i aria-hidden="true">↗</i></a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ft-legal">
          <span>© 2026 ELZION. All rights reserved.</span>
          <span className="ft-legal-links"><a href="#top">Privacy Policy</a><a href="#top">Terms</a></span>
          <a href="#top" className="ft-top-btn">Back to top <i aria-hidden="true">↑</i></a>
        </div>
      </div>
      <div className="giant" aria-hidden="true">elz<b>ion.</b></div>
    </footer>
  );
}
