const CARDS = [
  ['c-green', 'One team for design and code'],
  ['c-cream', 'Strategy before a single line of code'],
  ['c-green', 'One point of contact for the whole build'],
  ['c-cream', 'Working demos, every single week'],
  ['c-green', 'Cloud, launch and app stores handled'],
];

export default function Simple() {
  return (
    <section className="simple">
      <div className="wrap">
        <div className="simple-grid">
          <div className="simple-head">
            <span className="eyebrow">One team. Every layer.</span>
            <h2>We Make Building Your Product Simple.</h2>
            <a href="#contact" className="btn btn-green">
              Let’s build <span className="arr" aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="cards">
            {CARDS.map(([tone, title]) => (
              <div key={title} className={`card ${tone}`}>
                <span className="tick" aria-hidden="true">✓</span>
                <h3>{title}</h3>
              </div>
            ))}
            <div className="card c-dark">
              <span className="logo">elz<b>ion.</b></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
