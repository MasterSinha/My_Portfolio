import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaKaggle } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { FiSend, FiArrowUpRight, FiCheckCircle, FiX, FiAlertCircle } from 'react-icons/fi';
import { useApi } from '../../hooks/useApi';

function InputField({ label, type = 'text', value, onChange, ...rest }) {
  const [focused, setFocused] = useState(false);
  const style = {
    background: focused ? 'rgba(6,182,212,0.06)' : 'rgba(255,255,255,0.03)',
    border: `1px solid ${focused ? 'rgba(6,182,212,0.5)' : 'rgba(255,255,255,0.07)'}`,
    boxShadow: focused ? '0 0 0 3px rgba(6,182,212,0.08)' : 'none',
    borderRadius: '14px',
    padding: '12px 16px',
    width: '100%',
    fontSize: '14px',
    color: '#e2e8f0',
    outline: 'none',
    transition: 'all 0.2s',
  };

  return (
    <div className="space-y-2">
      <label className="font-mono-custom text-[10px] tracking-widest text-slate-500 uppercase">{label}</label>
      {type === 'textarea' ? (
        <textarea value={value} onChange={onChange} rows={5} required
          style={{ ...style, resize: 'none' }}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          {...rest} />
      ) : (
        <input type={type} value={value} onChange={onChange} required
          style={style}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          {...rest} />
      )}
    </div>
  );
}

function Toast({ toast, onClose }) {
  const isSuccess = toast.type === 'success';
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={{ opacity: 1, y: 0,  scale: 1   }}
      exit={{    opacity: 0, y: 80, scale: 0.9  }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className="fixed bottom-8 left-1/2 z-[9998] flex items-start gap-4 px-5 py-4 rounded-2xl shadow-2xl"
      style={{
        translateX: '-50%',
        background: isSuccess ? 'rgba(6,20,18,0.97)' : 'rgba(20,6,6,0.97)',
        border: `1px solid ${isSuccess ? 'rgba(6,182,212,0.4)' : 'rgba(239,68,68,0.4)'}`,
        backdropFilter: 'blur(24px)',
        boxShadow: isSuccess
          ? '0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(6,182,212,0.2), 0 0 40px rgba(6,182,212,0.12)'
          : '0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(239,68,68,0.2)',
        minWidth: '300px', maxWidth: '420px',
      }}
    >
      {/* Icon */}
      <div className="shrink-0 mt-0.5" style={{ color: isSuccess ? '#22d3ee' : '#f87171' }}>
        {isSuccess ? <FiCheckCircle size={20} /> : <FiAlertCircle size={20} />}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="font-display text-sm font-semibold text-slate-100">
          {isSuccess ? 'Message Sent!' : 'Failed to send'}
        </p>
        <p className="font-mono-custom text-[11px] mt-0.5" style={{ color: isSuccess ? '#64748b' : '#f87171' }}>
          {toast.message}
        </p>
      </div>

      {/* Close */}
      <button onClick={onClose} className="shrink-0 mt-0.5 text-slate-600 hover:text-slate-300 transition-colors">
        <FiX size={15} />
      </button>

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] rounded-b-2xl"
        style={{ background: isSuccess ? 'linear-gradient(90deg, #22d3ee, #a3e635)' : '#ef4444' }}
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 4, ease: 'linear' }}
      />
    </motion.div>
  );
}

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast]   = useState(null);
  const { data: profile } = useApi('/api/profile', {});

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4200);
  };

  const socials = [
    { icon: <FaGithub size={16} />,   href: profile?.github,   label: 'GitHub',   color: '#e2e8f0' },
    { icon: <FaLinkedin size={16} />, href: profile?.linkedin, label: 'LinkedIn', color: '#0a66c2' },
    { icon: <FaKaggle size={16} />,   href: profile?.kaggle,   label: 'Kaggle',   color: '#20beff' },
    { icon: <HiMail size={16} />,     href: profile?.email ? `mailto:${profile.email}` : null, label: 'Email', color: '#a3e635' },
  ].filter(s => s.href);

  const set = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      showToast('success', `Thanks ${form.name || 'there'}! I'll get back to you soon.`);
      setTimeout(() => setSent(false), 4000);
    } catch {
      showToast('error', 'Could not send your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <AnimatePresence>
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
    </AnimatePresence>
    <section id="contact" className="relative py-20 md:py-32 bg-[#070e10] overflow-hidden" ref={ref}>
      <div className="orb orb-cyan absolute" style={{ width: 700, height: 700, bottom: '-20%', left: '-10%', opacity: 0.2 }} />
      <div className="orb orb-cyan   absolute" style={{ width: 500, height: 500, top: '-10%',   right: '-5%',  opacity: 0.15 }} />
      <div className="orb orb-lime   absolute" style={{ width: 400, height: 400, top: '50%',    left: '50%',   transform: 'translate(-50%,-50%)', opacity: 0.1 }} />

      <div className="section-divider mb-20 max-w-6xl mx-auto" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-10 md:mb-16">
          <span className="section-eyebrow justify-center">get in touch</span>
          <h2 className="section-title mt-2">Let's Work <span>Together</span></h2>
          <p className="text-slate-500 text-sm mt-4 max-w-md mx-auto">
            Open to full-time roles, internships, and freelance ML/Data Science projects.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-6">

          {/* ── Left: info ── */}
          <motion.div className="space-y-4"
            initial={{ opacity: 0, x: -28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.15 }}>

            {/* CTA card */}
            <div className="card-glow rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="space-y-2">
                <div className="text-2xl">👋</div>
                <h3 className="font-display text-xl font-semibold text-slate-100">Say Hello</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Have a project in mind, a role to discuss, or just want to connect? I'd love to hear from you.
                </p>
              </div>
              {profile?.email && (
                <a href={`mailto:${profile.email}`}
                  className="group flex items-center gap-2 font-mono-custom text-sm text-cyan-400 hover:text-cyan-400 transition-colors duration-300">
                  {profile.email}
                  <FiArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>

            {/* Social grid */}
            <div className="grid grid-cols-2 gap-3">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  className="card-glow rounded-2xl p-4 flex items-center gap-3 group">
                  <span className="text-slate-500 group-hover:text-white transition-colors duration-200">{s.icon}</span>
                  <span className="font-mono-custom text-xs text-slate-500 group-hover:text-slate-300 transition-colors duration-200">{s.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.form onSubmit={handleSubmit}
            className="card-glow rounded-3xl p-5 sm:p-8 space-y-5"
            initial={{ opacity: 0, x: 28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.25 }}>

            <div className="grid sm:grid-cols-2 gap-5">
              <InputField label="Your Name" placeholder={profile?.name || 'Name'} value={form.name} onChange={set('name')} />
              <InputField label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
            </div>
            <InputField label="Message" type="textarea" placeholder="Tell me about your project or opportunity…" value={form.message} onChange={set('message')} />

            <button type="submit" disabled={loading || sent}
              className="btn-primary w-full justify-center py-4 text-sm disabled:opacity-60 disabled:cursor-not-allowed">
              {sent
                ? '✓ Message Sent!'
                : loading
                  ? <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </span>
                  : <><FiSend size={14} /> Send Message</>
              }
            </button>
          </motion.form>
        </div>
      </div>
    </section>
    </>
  );
}
