import { useState } from 'react';

const PROJECT_TYPES = [
  'Website',
  'Mobile app',
  'AI agent / automation',
  'ERP / business system',
  'Branding',
  'Not sure yet',
];

export default function Contact() {
  const [message, setMessage] = useState('');

  // Demo behaviour carried over from the standalone page: validates, then
  // shows a notice. There is no contact endpoint in the backend yet.
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const project = String(data.get('message') || '').trim();

    if (!name || !email || !project) {
      setMessage('Add your name, email and a few lines about the project.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage('That email address looks incomplete. Check it and try again.');
      return;
    }
    setMessage(
      `Thanks, ${name.split(' ')[0]}. This preview form isn’t connected yet. Wire it to your email service or API before launch.`
    );
    form.reset();
  }

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="contact-head">
          <span className="eyebrow">Start something meaningful</span>
          <h2>Let’s Build What’s Next.</h2>
          <p>Tell us about your idea. We’ll come back with questions, a plan and a timeline.</p>
        </div>
        <form id="contactForm" noValidate onSubmit={handleSubmit}>
          <h3>Contact us</h3>
          <div className="field">
            <label htmlFor="f-name">Name</label>
            <input id="f-name" name="name" autoComplete="name" required />
          </div>
          <div className="field">
            <label htmlFor="f-email">Email</label>
            <input id="f-email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="field">
            <label htmlFor="f-company">Company</label>
            <input id="f-company" name="company" autoComplete="organization" />
          </div>
          <div className="field">
            <label htmlFor="f-type">Project type</label>
            <select id="f-type" name="type">
              {PROJECT_TYPES.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="field full">
            <label htmlFor="f-msg">About your project</label>
            <textarea id="f-msg" name="message" required></textarea>
          </div>
          <button type="submit" className="btn">
            Send message <span className="arr" aria-hidden="true">→</span>
          </button>
          <p className="form-msg" id="formMsg" role="status" hidden={!message}>{message}</p>
        </form>
      </div>
    </section>
  );
}
