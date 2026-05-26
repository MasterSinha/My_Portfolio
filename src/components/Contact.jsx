import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiLocationMarker } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter, FaKaggle } from 'react-icons/fa';

const fade      = { hidden: { opacity: 0, y: 35 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } } };
const fadeLeft  = { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22,1,0.36,1] } } };
const fadeRight = { hidden: { opacity: 0, x: 40 },  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22,1,0.36,1] } } };

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = e => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <span className="section-eyebrow">// get in touch</span>
          <h2 className="section-title">Contact</h2>
        </motion.div>

        <div className="contact-grid">
          {/* Info */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="contact-eyebrow">// Let's build something together</p>
            <h3 className="contact-heading">
              Open To New<br />Opportunities
            </h3>
            <p className="contact-text">
              I'm currently open to full-time roles, freelance projects, and research
              collaborations in Data Science, ML Engineering, and Big Data. Whether you
              have a project in mind or just want to connect — my inbox is always open!
            </p>

            <div className="contact-info">
              <div className="ci-item">
                <div className="ci-icon"><HiMail /></div>
                <div className="ci-text">
                  <strong>Email</strong>
                  <span>sinhayush505@gmail.com</span>
                </div>
              </div>
              <div className="ci-item">
                <div className="ci-icon"><HiLocationMarker /></div>
                <div className="ci-text">
                  <strong>Location</strong>
                  <span>India — Open to Remote / Relocation</span>
                </div>
              </div>
            </div>

            <div className="social-row">
              {[
                { icon: <FaGithub />,   label: 'GitHub',   href: 'https://github.com/' },
                { icon: <FaLinkedin />, label: 'LinkedIn', href: 'https://linkedin.com/in/' },
                { icon: <FaTwitter />,  label: 'Twitter',  href: 'https://twitter.com/' },
                { icon: <FaKaggle />,   label: 'Kaggle',   href: 'https://kaggle.com/' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-pill">
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {sent ? (
              <div className="form-success">
                ✓ Message received!<br />
                I'll get back to you within 24 hours.
              </div>
            ) : (
              <form className="contact-form" onSubmit={onSubmit}>
                <div className="form-row">
                  <div className="fg">
                    <label>Name</label>
                    <input
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="fg">
                    <label>Email</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                <div className="fg">
                  <label>Subject</label>
                  <input
                    name="subject"
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="fg">
                  <label>Message</label>
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message}
                    onChange={onChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-green form-submit">
                  Send Message →
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
