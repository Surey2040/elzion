import '../../styles/footer.css';

const COLS = [
  ['Explore', [['How we work', '#process'], ['Services', '#services'], ['Work', '#work'], ['FAQs', '#faq']]],
  ['Services', [['Websites', '#services'], ['Mobile apps', '#services'], ['ERP & CRM', '#services'], ['AI automation', '#services']]],
  ['Follow', [['LinkedIn', '#top'], ['Instagram', '#top'], ['Behance', '#top'], ['GitHub', '#top']]],
];

export default function Footer() {
  return (
    <footer className="ft">
      <div className="wrap ft-top">
        <div className="ft-cta">
          <h2>Got an idea?<br />Let’s make it <em>real.</em></h2>
          <a href="#contact" className="ft-btn">
            <span className="ft-btn-text" data-text="Start a project">Start a project</span>
            <i aria-hidden="true">↗</i>
          </a>
        </div>
        <nav className="ft-cols" aria-label="Footer">
          {COLS.map(([title, links], c) => (
            <div className="ft-col" key={title} style={{ '--c': c }}>
              <h4>{title}</h4>
              <ul>
                {links.map(([label, href]) => (
                  <li key={label}><a href={href}><span>{label}</span></a></li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="giant" aria-hidden="true">elz<b>ion.</b></div>

      <div className="wrap ft-legal">
        <span>© 2026 ELZION. All rights reserved.</span>
        <span className="ft-legal-links"><a href="#top">Privacy Policy</a><a href="#top">Terms</a></span>
        <a href="#top" className="ft-top-btn">Back to top <i aria-hidden="true">↑</i></a>
      </div>
    </footer>
  );
}
