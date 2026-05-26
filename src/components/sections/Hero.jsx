import { useRef, Component, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaKaggle } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { FiArrowRight, FiDownload, FiMapPin, FiCode, FiCpu, FiDatabase } from 'react-icons/fi';
import { SiPython, SiTensorflow, SiApachespark } from 'react-icons/si';
import { useApi } from '../../hooks/useApi';
import useTypewriter from '../../hooks/useTypewriter';
import useCountUp from '../../hooks/useCountUp';
import MagneticButton from '../MagneticButton';

const FloatingGeometry = lazy(() => import('../effects/FloatingGeometry'));
class GeometryBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

const DEFAULT_ROLES = ['Data Scientist', 'ML Engineer', 'Big Data Analyst', 'AI / ML Developer'];

function StatCounter({ stat, index, total }) {
  const suffix = String(stat.value).replace(/[0-9]/g, '');
  const { count, ref } = useCountUp(stat.value, { duration: 1600, delay: index * 150 });
  return (
    <div ref={ref} className={`${index < total - 1 ? 'pr-7 mr-7 border-r' : ''}`}
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
      <div className="font-display text-[1.75rem] font-bold leading-none gradient-text">
        {count}{suffix}
      </div>
      <div className="font-mono-custom text-[10px] tracking-widest uppercase mt-1" style={{ color: '#334155' }}>
        {stat.label}
      </div>
    </div>
  );
}

/* ── Floating visual card (right side) ── */
function HeroVisual({ profile, stats }) {
  const skills = [
    { name: 'Machine Learning', pct: 92, color: '#22d3ee', icon: <FiCpu size={12}/> },
    { name: 'Deep Learning',    pct: 85, color: '#22d3ee', icon: <FiCode size={12}/> },
    { name: 'Big Data',         pct: 78, color: '#a3e635', icon: <FiDatabase size={12}/> },
  ];

  const tools = [
    { icon: <SiPython size={14}/>,       label: 'Python',      color: '#3b82f6' },
    { icon: <SiTensorflow size={14}/>,   label: 'TensorFlow',  color: '#f59e0b' },
    { icon: <SiApachespark size={14}/>,  label: 'Spark',       color: '#ef4444' },
  ];

  return (
    <div className="relative w-full max-w-[400px] mx-auto">

      {/* Soft glow behind cards */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(6,182,212,0.18) 0%, rgba(6,182,212,0.08) 55%, transparent 80%)', filter: 'blur(40px)' }} />

      {/* ── Main profile card ── */}
      <motion.div
        className="relative rounded-3xl p-6 space-y-5"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.09)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22,1,0.36,1], delay: 0.6 }}
      >
        {/* Card header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-amber-500/70" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
          </div>
          <span className="font-mono-custom text-[10px]" style={{ color: '#334155' }}>profile.json</span>
        </div>

        {/* Code-style content */}
        <div className="font-mono-custom text-[12px] leading-[1.9] space-y-1">
          <div style={{ color: '#475569' }}>{'{'}</div>
          <div className="pl-4">
            <span style={{ color: '#22d3ee' }}>"name"</span>
            <span style={{ color: '#475569' }}>: </span>
            <span style={{ color: '#4ade80' }}>"{profile?.name || 'Ayush Sinha'}"</span>
            <span style={{ color: '#475569' }}>,</span>
          </div>
          <div className="pl-4">
            <span style={{ color: '#22d3ee' }}>"role"</span>
            <span style={{ color: '#475569' }}>: </span>
            <span style={{ color: '#f59e0b' }}>"{profile?.tagline || 'Data Scientist'}"</span>
            <span style={{ color: '#475569' }}>,</span>
          </div>
          <div className="pl-4">
            <span style={{ color: '#22d3ee' }}>"location"</span>
            <span style={{ color: '#475569' }}>: </span>
            <span style={{ color: '#4ade80' }}>"{profile?.location || 'India'}"</span>
            <span style={{ color: '#475569' }}>,</span>
          </div>
          <div className="pl-4 flex items-center gap-2">
            <span style={{ color: '#22d3ee' }}>"available"</span>
            <span style={{ color: '#475569' }}>: </span>
            <span style={{ color: profile?.available ? '#4ade80' : '#f87171' }}>
              {profile?.available ? 'true' : 'false'}
            </span>
          </div>
          <div style={{ color: '#475569' }}>{'}'}</div>
        </div>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Skill bars */}
        <div className="space-y-3">
          <p className="font-mono-custom text-[10px] tracking-widest uppercase" style={{ color: '#334155' }}>Expertise</p>
          {skills.map((s, i) => (
            <motion.div key={s.name} className="space-y-1.5"
              initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + i * 0.1 }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5" style={{ color: s.color }}>
                  {s.icon}
                  <span className="font-mono-custom text-[11px]" style={{ color: '#64748b' }}>{s.name}</span>
                </div>
                <span className="font-mono-custom text-[10px]" style={{ color: s.color }}>{s.pct}%</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <motion.div className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${s.color}80, ${s.color})`, boxShadow: `0 0 6px ${s.color}60` }}
                  initial={{ width: 0 }} animate={{ width: `${s.pct}%` }}
                  transition={{ duration: 1.4, ease: [0.22,1,0.36,1], delay: 1.1 + i * 0.12 }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tool badges */}
        <div className="flex flex-wrap gap-2">
          {tools.map(t => (
            <span key={t.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono-custom text-[11px]"
              style={{ background: `${t.color}12`, border: `1px solid ${t.color}28`, color: t.color }}>
              {t.icon} {t.label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Floating stat cards ── */}
      <motion.div
        className="absolute -top-5 -right-4 rounded-2xl px-5 py-3.5"
        style={{
          background: 'rgba(6,6,20,0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(6,182,212,0.3)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
        }}
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 150 }}
      >
        <div className="font-display text-2xl font-bold"
          style={{ background: 'linear-gradient(135deg, #22d3ee, #a3e635)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {stats[0]?.value || '20+'}
        </div>
        <div className="font-mono-custom text-[10px] mt-0.5" style={{ color: '#334155' }}>Projects</div>
      </motion.div>

    </div>
  );
}

/* ── Main Hero ── */
export default function Hero() {
  const { data: profile } = useApi('/api/profile', {});
  const roles  = profile?.roles?.length ? profile.roles : DEFAULT_ROLES;
  const typed  = useTypewriter(roles);

  const socials = [
    { icon: <FaGithub size={15}/>,   href: profile?.github   || '#', label: 'GitHub'   },
    { icon: <FaLinkedin size={15}/>, href: profile?.linkedin || '#', label: 'LinkedIn' },
    { icon: <FaKaggle size={15}/>,   href: profile?.kaggle   || '#', label: 'Kaggle'   },
    { icon: <HiMail size={15}/>,     href: `mailto:${profile?.email || ''}`, label: 'Email' },
  ];

  const stats = profile?.stats || [
    { value: '20+', label: 'Projects' },
    { value: '12+', label: 'Technologies' },
    { value: '3+',  label: 'Years Exp.' },
  ];

  const firstName = (profile?.name || 'Ayush Sinha').split(' ')[0];
  const lastName  = (profile?.name || 'Ayush Sinha').split(' ').slice(1).join(' ') || 'Sinha';

  return (
    <section id="home" className="relative min-h-screen bg-[#070e10] overflow-hidden flex items-center">

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(6,182,212,0.14) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)',
        }} />

      {/* Ambient glow — right half */}
      <div className="absolute right-0 top-0 bottom-0 w-2/3 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 80% at 75% 50%, rgba(6,182,212,0.11) 0%, rgba(6,182,212,0.06) 55%, transparent 80%)' }} />

      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #070e10, transparent)' }} />

      <GeometryBoundary>
        <Suspense fallback={null}><FloatingGeometry /></Suspense>
      </GeometryBoundary>

      {/* ══ Content ══ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-24 pb-16">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 xl:gap-20 items-center">

          {/* ── Left: Text ── */}
          <div className="flex flex-col gap-6">

            {/* Status badge */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="w-fit">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.28)' }}>
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className={`animate-ping absolute h-full w-full rounded-full opacity-75 ${profile?.available ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <span className={`relative rounded-full h-2 w-2 ${profile?.available ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                </span>
                <span className="font-mono-custom text-[11px] tracking-wider" style={{ color: '#a5f3fc' }}>
                  {profile?.available ? 'Available for opportunities' : 'Currently unavailable'}
                </span>
              </div>
            </motion.div>

            {/* Greeting + Name */}
            <div>
              <motion.p className="font-mono-custom text-xs sm:text-sm tracking-[0.25em] mb-3" style={{ color: '#475569' }}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                Hello, I'm
              </motion.p>

              <h1 className="font-display font-bold leading-[0.9] tracking-[-0.02em]">
                <motion.span
                  className="block text-white"
                  style={{ fontSize: 'clamp(2.8rem, 11vw, 7rem)' }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, ease: [0.22,1,0.36,1], delay: 0.32 }}>
                  {firstName}
                </motion.span>
                <motion.span
                  className="block gradient-text"
                  style={{ fontSize: 'clamp(2.8rem, 11vw, 7rem)' }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, ease: [0.22,1,0.36,1], delay: 0.44 }}>
                  {lastName}.
                </motion.span>
              </h1>
            </div>

            {/* Typing role */}
            <motion.div className="flex items-center gap-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
              <div className="w-8 h-px flex-shrink-0" style={{ background: 'linear-gradient(90deg, #06b6d4, #22d3ee)' }} />
              <span className="font-mono-custom text-[15px]" style={{ color: '#22d3ee' }}>
                {typed}<span className="ml-0.5 animate-pulse" style={{ color: '#22d3ee' }}>_</span>
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p className="text-[14px] sm:text-[15px] leading-[1.85] max-w-[500px]" style={{ color: '#64748b' }}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}>
              {profile?.bio?.[0]
                ? profile.bio[0].substring(0, 155) + '…'
                : 'Turning raw data into intelligent systems — ML pipelines, deep learning models, and big-data architectures that scale.'}
            </motion.p>

            {/* CTAs */}
            <motion.div className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
              <MagneticButton href="#projects" className="btn-primary">View Projects <FiArrowRight size={14} /></MagneticButton>
              <MagneticButton href={profile?.resumeUrl || '/resume.pdf'} target="_blank" rel="noreferrer" className="btn-glass">
                <FiDownload size={14} /> Resume
              </MagneticButton>
            </motion.div>

            {/* Socials + Location */}
            <motion.div className="flex items-center gap-3 flex-wrap"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35 }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#475569' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#f1f5f9'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.5)'; e.currentTarget.style.boxShadow = '0 0 18px rgba(6,182,212,0.25)'; e.currentTarget.style.background = 'rgba(6,182,212,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}>
                  {s.icon}
                </a>
              ))}
              {profile?.location && (
                <>
                  <div className="w-px h-5" style={{ background: 'rgba(255,255,255,0.08)' }} />
                  <span className="font-mono-custom text-[11px] flex items-center gap-1.5" style={{ color: '#334155' }}>
                    <FiMapPin size={11} /> {profile.location}
                  </span>
                </>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div className="flex items-center flex-wrap gap-y-3 pt-2"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
              {stats.map((s, i) => (
                <StatCounter key={i} stat={s} index={i} total={stats.length} />
              ))}
            </motion.div>
          </div>

          {/* ── Right: Visual card (no photo) ── */}
          <div className="hidden lg:block">
            <HeroVisual profile={profile} stats={stats} />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
        <div className="w-px h-12"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(6,182,212,0.8))', animation: 'scroll-pulse 2.2s ease-in-out infinite' }} />
        <span className="font-mono-custom text-[9px] tracking-[0.45em] uppercase" style={{ color: '#1e293b' }}>Scroll</span>
      </motion.div>
    </section>
  );
}
