const PHASES = ['Discover', 'Plan', 'Design', 'Build', 'Launch', 'Grow'];

const STEPS = [
  ['Discovery', 'You tell us about the business, the users and the problem. We listen and ask hard questions.'],
  ['Strategy & Architecture', 'Scope, features, tech stack and a clear timeline, agreed before any build starts.'],
  ['UX / UI Design', 'Flows, wireframes and a visual identity you can click through and react to.'],
  ['Build Sprints', 'Front end, back end, AI and integrations, shipped in weekly demos.'],
  ['QA & Launch', 'Testing across devices, cloud deployment, domains and app store releases.'],
  ['Grow & Support', 'Monitoring, updates and new features as your business grows.'],
];

export default function Meet() {
  return (
    <section className="meet" id="process">
      <div className="wrap">
        <div className="meet-head meet-title center">
          <span className="eyebrow">Our process</span>
          <h2>Ideas into Impact.</h2>
        </div>

        <div className="timeline-wrap">
          <div className="note" aria-hidden="true">
            You see progress<br />every single week!
            <svg width="60" height="50" viewBox="0 0 60 50" fill="none">
              <path d="M44 4 C 46 24, 34 38, 8 44" stroke="#111311" strokeWidth="2" />
              <path d="M16 36 L8 44 L18 48" stroke="#111311" strokeWidth="2" />
            </svg>
          </div>
          <div className="phases" aria-hidden="true">
            {PHASES.map((phase) => (
              <div key={phase} className="phase"><div className="ph">{phase}</div></div>
            ))}
          </div>
          <ol className="steps" style={{ listStyle: 'none', margin: 0, paddingLeft: 0 }}>
            {STEPS.map(([title, text], i) => (
              <li key={title} className={`step st${i + 1}`}>
                <h3>{title} <span>{i + 1}</span></h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
