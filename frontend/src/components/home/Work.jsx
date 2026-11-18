import { Link } from 'react-router-dom';

const PROJECTS = [
  {
    number: '01',
    name: 'Jothi Vel Chits',
    kind: 'Fintech · Product OS',
    summary: 'Groups, collections and daily closing shaped into one connected mobile operating system.',
    to: '/projects/jothi-vel-chits',
    tone: 'primary',
  },
  {
    number: '02',
    name: 'Kadaikutty POS',
    kind: 'Retail OS · Android',
    summary: 'Inventory, billing, reports and daily controls connected for a faster store floor.',
    to: '/projects/kadaikutty-pos',
    tone: 'primary',
  },
];

export default function Work() {
  return (
    <section className="work" id="work">
      <div className="wrap">
        <div className="dark-card">
          <div className="work-head">
            <div>
              <h2>See Work</h2>
            </div>
          </div>
          <div className="work-reel">
            {PROJECTS.map((proj) => (
              <article className={`work-project work-project--${proj.tone}`} key={proj.name}>
                <div className="work-project-ghost" aria-hidden="true"><span>{proj.name} · {proj.name} · {proj.name} ·</span></div>
                <span className="work-project-number" aria-hidden="true">{proj.number}</span>
                <div className="work-project-copy">
                  <div className="work-project-meta">
                    <span>{proj.number}</span>
                    <small>{proj.kind}</small>
                  </div>
                  <div className="work-project-main">
                    <h3>{proj.name}</h3>
                    <div className="work-project-foot">
                      <p>{proj.summary}</p>
                      <Link className="work-project-link" to={proj.to} aria-label={`View ${proj.name} project`}>
                        <span>View project</span><i aria-hidden="true">↗</i>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
