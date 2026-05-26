import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApi } from '../../hooks/useApi';

function SkillBar({ skill, color, delay }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="space-y-2 group">
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-slate-300 group-hover:text-white transition-colors">{skill.name}</span>
        <span className="font-mono-custom text-[10px] tabular-nums font-medium" style={{ color }}>{skill.level}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})`, boxShadow: `0 0 8px ${color}60` }}
          initial={{ width: 0 }} animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.4, ease: [0.22,1,0.36,1], delay }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { data: categories, loading } = useApi('/api/skills', []);

  return (
    <section id="skills" className="relative py-20 md:py-32 bg-[#070e10] overflow-hidden" ref={ref}>
      {/* Background orbs */}
      <div className="orb orb-lime absolute"   style={{ width: 500, height: 500, top: '0%', left: '50%', transform: 'translateX(-50%)', opacity: 0.2 }} />
      <div className="orb orb-cyan absolute" style={{ width: 400, height: 400, bottom: '-10%', right: '-5%', opacity: 0.25 }} />

      <div className="section-divider mb-20 max-w-6xl mx-auto" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-10 md:mb-16">
          <span className="section-eyebrow">what i know</span>
          <h2 className="section-title mt-2">Tech <span>Skills</span></h2>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl h-72 animate-pulse" style={{ background: 'rgba(255,255,255,0.03)' }} />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat, ci) => (
              <motion.div key={cat.id}
                className="card-glow rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, ease: [0.22,1,0.36,1], delay: ci * 0.1 }}>

                {/* Colored top stripe */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}50)` }} />

                <div className="p-6 space-y-5">
                  {/* Category header */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold font-display"
                      style={{ background: `${cat.color}18`, color: cat.color, border: `1px solid ${cat.color}28`, boxShadow: `0 0 16px ${cat.color}20` }}>
                      {cat.category?.charAt(0) || '?'}
                    </div>
                    <div>
                      <div className="font-mono-custom text-[10px] tracking-widest uppercase" style={{ color: cat.color }}>
                        {cat.category}
                      </div>
                      <div className="font-mono-custom text-[9px] text-slate-600 mt-0.5">{cat.items?.length || 0} skills</div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-1">
                    {(cat.items || []).map((s, si) => (
                      <SkillBar key={s.name} skill={s} color={cat.color} delay={ci * 0.1 + si * 0.09} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
