const FAQS = [
  ['What kind of projects does Elzion take on?', 'Websites, mobile apps, AI agents and automation, ERP and business systems, cloud setup and branding. Many projects combine several of these.'],
  ['Do you work with startups or established businesses?', 'Both. We work with founders shaping a first product and with businesses replacing spreadsheets or old software with something built for how they work.'],
  ['How long does a project take?', 'It depends on scope. After the discovery call we share a fixed timeline and milestone plan before any work starts.'],
  ['How is pricing worked out?', 'We scope each project after discovery and send a clear quote with milestones. No hidden extras.'],
  ['Who owns the code and designs?', 'You do. At handover we transfer source code, design files and cloud accounts to you.'],
  ['Can you work with our existing software?', 'Yes. We can extend, integrate with or migrate from your current tools, including data held in Excel or older systems.'],
  ['Do you build AI features?', 'Yes. We design and build AI agents and automations that connect to your data and tools, with guardrails and human approval where it matters.'],
  ['What happens after launch?', 'You can take the product in-house or add Elzion Care+ for monitoring, fixes, updates and new features.'],
  ['How do we get started?', 'Send the form below. We reply to set up a free discovery call and take it from there.'],
];

export default function Faq() {
  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <div className="faq-card">
          <h2>FAQs</h2>
          <div className="faq-list">
            {FAQS.map(([question, answer], i) => (
              <details key={question} open={i === 0}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
