import '../../styles/footer.css';

const COLS = [
  ['Explore', [['How we work', '#process'], ['Services', '#services'], ['Work', '#work'], ['FAQs', '#faq']]],
  ['Services', [['Websites', '#services'], ['Mobile apps', '#services'], ['ERP & CRM', '#services'], ['AI automation', '#services']]],
  ['Follow', [['LinkedIn', 'https://www.linkedin.com/in/elzion-technologies-543662450/'], ['Instagram', '#top']]],
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
          <div className="ft-contact">
            <a href="tel:+917548885886" className="ft-contact-item">
              <small>Call us</small>
              <span>+91 75488 85886</span>
            </a>
            <a href="https://www.elziontechnologies.com" target="_blank" rel="noopener noreferrer" className="ft-contact-item">
              <small>Website</small>
              <span>www.elziontechnologies.com</span>
            </a>
          </div>
        </div>
        <nav className="ft-cols" aria-label="Footer">
          {COLS.map(([title, links], c) => (
            <div className="ft-col" key={title} style={{ '--c': c }}>
              <h4>{title}</h4>
              <ul>
                {links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      <span>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="wrap ft-legal">
        <span>© 2026 ELZION. All rights reserved.</span>
        <span className="ft-legal-links"><a href="#top">Privacy Policy</a><a href="#top">Terms</a></span>
        <a href="#top" className="ft-top-btn">Back to top <i aria-hidden="true">↑</i></a>
      </div>
    </footer>
  );
}
