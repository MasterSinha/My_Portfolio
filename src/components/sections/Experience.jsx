import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApi } from '../../hooks/useApi';

export default function Experience() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { data: timeline, loading } = useApi('/api/experience', []);

  return (
    <section id="experience" className="relative py-20 md:py-32 bg-[#070e10] overflow-hidden" ref={ref}>
      <div className="orb orb-lime   absolute" style={{ width: 500, height: 500, top: '10%', right: '-10%', opacity: 0.18 }} />
      <div className="orb orb-cyan   absolute" style={{ width: 400, height: 400, bottom: '5%',  left: '-8%',  opacity: 0.18 }} />

      <div className="section-divider mb-20 max-w-4xl mx-auto" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-10 md:mb-16">
          <span className="section-eyebrow">my journey</span>
          <h2 className="section-title mt-2">Work <span>Experience</span></h2>
        </motion.div>

        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-3xl h-40 animate-pulse" style={{ background: 'rgba(255,255,255,0.03)' }} />
            ))}
          </div>
        ) : (
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <motion.div key={item.id} className="relative flex gap-6 md:gap-10"
                initial={{ opacity: 0, x: -28 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22,1,0.36,1], delay: i * 0.15 }}>

                {/* Timeline spine */}
                <div className="relative flex flex-col items-center shrink-0">
                  {/* Glowing dot */}
                  <div className="relative z-10 w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center mt-6"
                    style={{
                      background: `${item.accent}18`,
                      border: `1.5px solid ${item.accent}60`,
                      boxShadow: `0 0 20px ${item.accent}35, 0 0 40px ${item.accent}15`,
                    }}>
                    <div className="w-3 h-3 rounded-full" style={{ background: item.accent, boxShadow: `0 0 8px ${item.accent}` }} />
                  </div>
                  {/* Connector line */}
                  {i < timeline.length - 1 && (
                    <motion.div className="w-px flex-1 mt-2 mb-0"
                      style={{ background: `linear-gradient(to bottom, ${item.accent}50, rgba(255,255,255,0.04))`, minHeight: '40px' }}
                      initial={{ scaleY: 0, originY: 0 }}
                      animate={inView ? { scaleY: 1 } : {}}
                      transition={{ duration: 1.2, delay: i * 0.15 + 0.3 }} />
                  )}
                </div>

                {/* Card */}
                <div className={`flex-1 ${i < timeline.length - 1 ? 'pb-10' : 'pb-0'}`}>
                  <motion.div className="card-glow rounded-3xl p-4 sm:p-7 space-y-4 sm:space-y-5 group"
                    whileHover={{ y: -4, transition: { duration: 0.25 } }}>

                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-semibold text-slate-100">{item.role}</h3>
                        <p className="font-mono-custom text-sm mt-1 font-medium" style={{ color: item.accent }}>{item.company}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        <span className="font-mono-custom text-[10px] px-3 py-1.5 rounded-full"
                          style={{ background: `${item.accent}15`, color: item.accent, border: `1px solid ${item.accent}30` }}>
                          {item.type}
                        </span>
                        <span className="font-mono-custom text-[10px] px-3 py-1.5 rounded-full"
                          style={{ background: 'rgba(255,255,255,0.04)', color: '#64748b', border: '1px solid rgba(255,255,255,0.08)' }}>
                          {item.period}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 text-[14px] leading-[1.8]">{item.description}</p>

                    {/* Tech tags */}
                    {(item.technologies || []).length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {item.technologies.map(t => (
                          <span key={t} className="tag text-[10px]"
                            style={{ borderColor: `${item.accent}30`, color: `${item.accent}bb`, background: `${item.accent}08` }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
