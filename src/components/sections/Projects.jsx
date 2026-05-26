import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiExternalLink, FiGithub, FiStar } from 'react-icons/fi';
import { useApi } from '../../hooks/useApi';

const BG_GRADIENTS = [
  'rgba(6,182,212,0.3), rgba(6,182,212,0.15)',
  'rgba(6,182,212,0.3), rgba(14,116,144,0.15)',
  'rgba(163,230,53,0.3), rgba(219,39,119,0.15)',
  'rgba(74,222,128,0.3), rgba(16,185,129,0.15)',
  'rgba(251,191,36,0.3), rgba(245,158,11,0.15)',
  'rgba(163,230,53,0.3), rgba(6,182,212,0.15)',
];

function FeaturedCard({ proj, i }) {
  const cardRef = useRef(null);
  const onMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    cardRef.current.style.transform = `perspective(1200px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) scale(1.01)`;
  };
  const onLeave = () => { if (cardRef.current) cardRef.current.style.transform = ''; };

  return (
    <motion.div ref={cardRef}
      className="col-span-full lg:col-span-2 rounded-3xl overflow-hidden cursor-pointer group"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: `1px solid ${proj.accent}40`,
        boxShadow: `0 4px 40px rgba(0,0,0,0.5), 0 0 0 1px ${proj.accent}15`,
        transition: 'transform 0.2s ease, box-shadow 0.4s ease',
        willChange: 'transform',
      }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      onMouseEnter={e => { if (cardRef.current) cardRef.current.style.boxShadow = `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${proj.accent}25`; }}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}>

      <div className="grid md:grid-cols-[1.2fr_1fr]">
        {/* Visual area */}
        <div className="relative h-56 md:h-auto flex items-center justify-center overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${BG_GRADIENTS[i % BG_GRADIENTS.length]})` }}>
          <div className="absolute inset-0 bg-grid opacity-30" />
          {/* Big number watermark */}
          <span className="font-display text-[8rem] font-bold opacity-[0.08] text-white select-none leading-none">
            {String((i || 0) + 1).padStart(2,'0')}
          </span>
          {/* Metric badge */}
          <div className="absolute top-5 left-5 flex items-center gap-1.5 font-mono-custom text-xs px-3 py-1.5 rounded-full"
            style={{ background: `${proj.accent}25`, border: `1px solid ${proj.accent}50`, color: proj.accent }}>
            <FiStar size={10} /> {proj.metric}
          </div>
          {/* Featured pill */}
          <div className="absolute bottom-5 left-5 font-mono-custom text-[10px] px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#e2e8f0' }}>
            ★ Featured
          </div>
        </div>

        {/* Content area */}
        <div className="p-5 sm:p-8 flex flex-col justify-between gap-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: proj.accent }} />
              <span className="font-mono-custom text-[10px] tracking-widest text-slate-500 uppercase">Featured Project</span>
            </div>
            <h3 className="font-display text-2xl font-semibold text-slate-100 leading-snug">{proj.title}</h3>
            <p className="text-slate-400 text-sm leading-[1.8]">{proj.desc}</p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {(proj.tags || []).map(t => (
                <span key={t} className="tag text-[10px]"
                  style={{ borderColor: `${proj.accent}40`, color: `${proj.accent}cc`, background: `${proj.accent}0d` }}>
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-5 pt-1 border-t border-white/5">
              {proj.githubUrl && (
                <a href={proj.githubUrl} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono-custom text-xs text-slate-500 hover:text-white transition-colors">
                  <FiGithub size={13} /> Source
                </a>
              )}
              {proj.liveUrl && (
                <a href={proj.liveUrl} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono-custom text-xs text-slate-500 hover:text-white transition-colors">
                  <FiExternalLink size={13} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ proj, idx, delay }) {
  const cardRef = useRef(null);
  const onMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    cardRef.current.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) scale(1.02)`;
  };
  const onLeave = () => { if (cardRef.current) cardRef.current.style.transform = ''; };

  return (
    <motion.div ref={cardRef}
      className="rounded-3xl flex flex-col overflow-hidden cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        transition: 'transform 0.18s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        willChange: 'transform',
      }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      onMouseEnter={e => {
        if (cardRef.current) {
          cardRef.current.style.borderColor = `${proj.accent}50`;
          cardRef.current.style.boxShadow = `0 16px 48px rgba(0,0,0,0.5), 0 0 30px ${proj.accent}20`;
        }
      }}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22,1,0.36,1], delay }}>

      {/* Top gradient line */}
      <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${proj.accent}, ${proj.accent}40)` }} />

      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between">
          <span className="font-mono-custom text-[10px] tracking-wider px-2.5 py-1 rounded-full"
            style={{ background: `${proj.accent}15`, color: proj.accent, border: `1px solid ${proj.accent}30` }}>
            {proj.metric || 'Project'}
          </span>
          <span className="font-display text-4xl font-bold leading-none select-none"
            style={{ color: `${proj.accent}18` }}>
            {String(idx + 1).padStart(2,'0')}
          </span>
        </div>

        <div className="flex-1 space-y-2">
          <h3 className="font-display text-lg font-semibold text-slate-100 leading-snug">{proj.title}</h3>
          <p className="text-slate-500 text-[13px] leading-[1.75] line-clamp-3">{proj.desc}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(proj.tags || []).map(t => (
            <span key={t} className="tag text-[10px]"
              style={{ borderColor: `${proj.accent}28`, color: `${proj.accent}bb`, background: `${proj.accent}08` }}>
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-1 border-t border-white/5">
          {proj.githubUrl && (
            <a href={proj.githubUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono-custom text-[11px] text-slate-600 hover:text-white transition-colors">
              <FiGithub size={12} /> Code
            </a>
          )}
          {proj.liveUrl && (
            <a href={proj.liveUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono-custom text-[11px] text-slate-600 hover:text-white transition-colors">
              <FiExternalLink size={12} /> Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { data: projects, loading } = useApi('/api/projects', []);

  const featured = projects.find(p => p.featured) || projects[0];
  const rest      = projects.filter(p => p !== featured);

  return (
    <section id="projects" className="relative py-20 md:py-32 bg-[#070e10] overflow-hidden" ref={ref}>
      <div className="orb orb-cyan   absolute" style={{ width: 600, height: 600, top: '-10%', left: '-10%', opacity: 0.2 }} />
      <div className="orb orb-cyan absolute" style={{ width: 500, height: 500, bottom: '-10%', right: '-5%', opacity: 0.2 }} />

      <div className="section-divider mb-20 max-w-6xl mx-auto" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-10 md:mb-16">
          <span className="section-eyebrow">what i've built</span>
          <h2 className="section-title mt-2">Featured <span>Projects</span></h2>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-3xl h-64 animate-pulse" style={{ background: 'rgba(255,255,255,0.03)' }} />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured && <FeaturedCard proj={featured} i={0} />}
            {rest.map((p, i) => (
              <ProjectCard key={p.id} proj={p} idx={i + 1} delay={i * 0.07} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
