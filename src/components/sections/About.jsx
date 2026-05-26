import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCpu, FiDatabase, FiCode, FiTrendingUp } from 'react-icons/fi';
import { useApi } from '../../hooks/useApi';

const fade = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22,1,0.36,1], delay } },
});

const PILLAR_ICONS = [<FiCpu size={16}/>, <FiDatabase size={16}/>, <FiCode size={16}/>, <FiTrendingUp size={16}/>];

const DEFAULT_PILLARS = [
  { label: 'Machine Learning',  desc: 'End-to-end ML pipelines',    color: '#a3e635' },
  { label: 'Big Data',          desc: 'Spark, Kafka, Hadoop',        color: '#22d3ee' },
  { label: 'Deep Learning',     desc: 'PyTorch, TensorFlow',         color: '#a3e635' },
  { label: 'Data Analytics',    desc: 'Insights & Visualisation',    color: '#4ade80' },
];

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { data: profile } = useApi('/api/profile', {});
  const [imgErr, setImgErr] = useState(false);

  const pillars = (profile?.pillars?.length ? profile.pillars : DEFAULT_PILLARS);

  const facts = [
    { label: 'Location',  value: profile?.location  || '—', icon: '📍' },
    { label: 'Focus',     value: profile?.tagline    || '—', icon: '🎯' },
    { label: 'Education', value: profile?.education  || '—', icon: '🎓' },
    { label: 'Status',    value: profile?.status     || '—', icon: '✦' },
  ];

  return (
    <section id="about" className="relative py-20 md:py-32 bg-[#070e10] overflow-hidden" ref={ref}>
      {/* Background orbs */}
      <div className="orb orb-cyan absolute" style={{ width: 500, height: 500, top: '10%', right: '-15%', opacity: 0.3 }} />
      <div className="orb orb-cyan absolute"   style={{ width: 400, height: 400, bottom: '5%', left: '-10%', opacity: 0.25 }} />

      <div className="section-divider mb-20 max-w-6xl mx-auto" />

      <div className="relative max-w-6xl mx-auto px-6">

        <motion.div variants={fade(0)} initial="hidden" animate={inView ? 'show' : 'hidden'} className="mb-10 md:mb-16">
          <span className="section-eyebrow">who i am</span>
          <h2 className="section-title mt-2">About <span>Me</span></h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16 items-start">

          {/* ── Photo column ── */}
          <motion.div variants={fade(0.15)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <div className="relative w-full max-w-sm mx-auto lg:mx-0"
              onMouseMove={e => {
                const el = e.currentTarget;
                const r  = el.getBoundingClientRect();
                const x  = (e.clientX - r.left) / r.width  - 0.5;
                const y  = (e.clientY - r.top)  / r.height - 0.5;
                el.style.transform  = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
                el.style.transition = 'transform 0.1s ease';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform  = '';
                e.currentTarget.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)';
              }}
            >

              {/* Glow ring */}
              <div className="absolute -inset-4 rounded-3xl opacity-60"
                style={{ background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.25) 0%, transparent 70%)' }} />

              {/* Photo card */}
              <div className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(6,182,212,0.25)', boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(6,182,212,0.15)' }}>
                {!imgErr ? (
                  <img src="/photo1.jpg" alt={profile?.name || 'Profile'}
                    className="w-full h-full object-cover object-top"
                    style={{ filter: 'brightness(0.92) contrast(1.08) saturate(0.9)' }}
                    onError={() => setImgErr(true)} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-display text-8xl font-semibold gradient-text"
                    style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(6,182,212,0.1))' }}>
                    {(profile?.name || 'AS').split(' ').map(w => w[0]).join('')}
                  </div>
                )}
                {/* Bottom overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070e10]/90 via-[#070e10]/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="font-display text-xl font-semibold text-white">{profile?.name || '—'}</div>
                  <div className="font-mono-custom text-xs text-cyan-300/80 mt-1">{profile?.tagline || '—'}</div>
                </div>
              </div>

              {/* Floating exp badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 glass-vivid rounded-2xl px-5 py-4 text-center shadow-xl"
                style={{ boxShadow: '0 8px 32px rgba(6,182,212,0.3)' }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
              >
                <div className="font-display text-3xl font-semibold gradient-text">{profile?.stats?.[2]?.value || '3+'}</div>
                <div className="font-mono-custom text-[10px] text-slate-500 tracking-widest mt-0.5">Years Exp</div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Content column ── */}
          <motion.div variants={fade(0.28)} initial="hidden" animate={inView ? 'show' : 'hidden'} className="space-y-8">

            {/* Bio */}
            <div className="space-y-4">
              {(profile?.bio || ['—', '—']).map((para, i) => (
                <p key={i} className="text-slate-400 text-[15px] leading-[1.9]">{para}</p>
              ))}
            </div>

            {/* Expertise pillars */}
            <div className="grid grid-cols-2 gap-3">
              {pillars.map((p, i) => (
                <motion.div key={p.label}
                  className="card-glow rounded-2xl p-4 flex items-start gap-3 group cursor-default"
                  initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.07 }}>
                  <div className="mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}30` }}>
                    {PILLAR_ICONS[i % PILLAR_ICONS.length]}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-slate-200">{p.label}</div>
                    <div className="font-mono-custom text-[10px] text-slate-600 mt-0.5">{p.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Fact chips */}
            <div className="grid grid-cols-2 gap-2.5">
              {facts.map((f, i) => (
                <motion.div key={f.label}
                  className="rounded-xl px-4 py-3 flex items-center gap-3"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.55 + i * 0.07 }}>
                  <span className="text-base shrink-0">{f.icon}</span>
                  <div className="min-w-0">
                    <div className="font-mono-custom text-[9px] text-slate-600 tracking-widest uppercase">{f.label}</div>
                    <div className="text-[13px] font-medium text-slate-300 mt-0.5 truncate">{f.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <a href="#contact" className="btn-primary text-sm px-6 py-3">Get In Touch</a>
              <a href={profile?.resumeUrl || '/resume.pdf'} target="_blank" rel="noreferrer" className="btn-glass text-sm px-6 py-3">View Resume ↗</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
