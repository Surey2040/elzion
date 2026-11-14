import { useState } from 'react';

const PLANS = {
  launch: {
    label: 'Launch',
    title: 'Website & Brand',
    meta: 'For businesses that need a fast, custom site that wins trust.',
    list: [
      'Brand identity or refresh',
      'Custom website design',
      'Responsive build, all devices',
      'SEO fundamentals',
      'Hosting & domain setup',
      'Content you can edit yourself',
      'Analytics setup',
      'One focused revision round',
    ],
  },
  build: {
    label: 'Build',
    title: 'Product & App',
    meta: 'For founders and teams turning an idea into a working product.',
    list: [
      'Product strategy workshop',
      'UX flows & clickable prototype',
      'Web or mobile app build',
      'Back end, APIs & database',
      'AI features where they help',
      'Weekly working demos',
      'QA across devices',
      'Cloud deployment & store release',
    ],
  },
  partner: {
    label: 'Partner',
    title: 'Ongoing Tech Team',
    meta: 'For businesses that need a long-term product and engineering partner.',
    list: [
      'Dedicated product lead',
      'Monthly roadmap planning',
      'ERP & system integrations',
      'AI agents & automation',
      'Continuous releases',
      'Performance & security reviews',
      'Priority support',
      'Quarterly growth review',
    ],
  },
};

export default function Engage() {
  const [active, setActive] = useState('launch');
  const plan = PLANS[active];

  return (
    <section className="engage">
      <div className="wrap">
        <div className="engage-head center">
          <h2>Pick How We Work Together</h2>
          <p>Every project starts with understanding your needs.</p>
        </div>

        <div className="dark-card plan">
          <div className="plan-top">
            <div>
              <span className="tag" id="planTag">{plan.label}</span>
              <p className="big" id="planTitle">{plan.title}</p>
              <p className="meta" id="planMeta">{plan.meta}</p>
            </div>
            <div className="toggle" role="group" aria-label="Engagement type">
              {Object.entries(PLANS).map(([key, { label }]) => (
                <button
                  key={key}
                  type="button"
                  data-plan={key}
                  aria-pressed={active === key}
                  onClick={() => setActive(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <a href="#contact" className="go">Get a quote</a>
          <p className="small">Got questions? <a href="#contact">Book a call</a></p>
          <hr />
          <p className="eyebrow" style={{ color: 'var(--dim)' }}>What’s included</p>
          <ul className="incl" id="planList">
            {plan.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="duo">
          <div className="addon">
            <h3>Elzion Care+</h3>
            <p>Add it at any stage. Our team stays on call after go-live.</p>
            <ul>
              <li>Monthly updates and fixes</li>
              <li>Uptime and error monitoring</li>
              <li>Content and feature changes</li>
              <li>Monthly health report</li>
            </ul>
          </div>
          <div className="own">
            <span className="ex">!</span>
            <p>
              You own what we build. At handover we transfer the source code, design files and cloud accounts to you.
              Stay with us for the next version, or take it in-house. Your call.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
