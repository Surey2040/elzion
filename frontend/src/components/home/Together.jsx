import HowItWorks from '../ui/HowItWorks.jsx';

// The client journey, in the order it happens. Wording follows the rest of the page (FAQ, plans, Care+).
const STEPS = [
  {
    title: 'Discuss Your Project',
    description: 'Tell us about your idea and your users. We listen, ask the hard questions and say what is realistic.',
    colorTheme: 'green',
  },
  {
    title: 'Scope & quote',
    description: 'Pick Launch, Build or Partner. You get a clear plan, timeline and milestone quote before any work starts.',
    colorTheme: 'cream',
  },
  {
    title: 'Weekly working demos',
    description: 'Click through real, working progress every week and steer the build as we go.',
    colorTheme: 'dark',
  },
  {
    title: 'Launch & handover',
    description: 'We handle hosting and store releases, then hand over the code, designs and cloud accounts. You own it.',
    colorTheme: 'green',
  },
  {
    title: 'Grow with Care+',
    description: 'Add Elzion Care+ for monthly updates, monitoring and fixes, or take it in-house. Your call.',
    colorTheme: 'cream',
  },
];

export default function Together() {
  return (
    <section className="engage together">
      <div className="wrap">
        <div className="engage-head center">
          <h2>How We Work Together</h2>
          <p>Every project starts with understanding your needs.</p>
        </div>
      </div>

      <HowItWorks features={STEPS} />

      <div className="wrap center together-cta">
        <a href="#contact" className="btn btn-green">
          Get a quote <span className="arr" aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
