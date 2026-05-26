import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiAward, FiStar, FiBookOpen, FiUsers, FiZap, FiExternalLink } from 'react-icons/fi';
import { useApi } from '../../hooks/useApi';

const ICONS = [FiAward, FiStar, FiBookOpen, FiUsers, FiZap];

export default function Achievements() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { data: items, loading } = useApi('/api/achievements', []);

  return (
    <section className="relative py-20 md:py-32 bg-[#070e10] overflow-hidden" ref={ref}>
      <div className="orb orb-cyan absolute" style={{ width: 600, height: 600, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.15 }} />

      <div className="section-divider mb-20 max-w-6xl mx-auto" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-10 md:mb-16">
          <span className="section-eyebrow">recognition</span>
          <h2 className="section-title mt-2">Key <span>Achievements</span></h2>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-3xl h-52 animate-pulse" style={{ background: 'rgba(255,255,255,0.03)' }} />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {items.map((item, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <motion.div key={item.id}
                  className="card-glow rounded-3xl p-6 flex flex-col gap-4 group"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.8, ease: [0.22,1,0.36,1], delay: i * 0.1 }}>

                  {/* Icon + metric row */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `${item.accent}18`,
                        color: item.accent,
                        border: `1px solid ${item.accent}30`,
                        boxShadow: `0 0 20px ${item.accent}20`,
                      }}>
                      <Icon size={20} />
                    </div>
                    <span className="font-mono-custom text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `${item.accent}15`, color: item.accent, border: `1px solid ${item.accent}25` }}>
                      {item.metric}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="flex-1 space-y-2">
                    <h3 className="font-display text-[1.05rem] font-semibold text-slate-100">{item.title}</h3>
                    <p className="text-slate-500 text-[13px] leading-[1.7]">{item.description}</p>
                  </div>

                  {/* Certificate link */}
                  {item.certificationUrl && (
                    <a href={item.certificationUrl} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono-custom text-[11px] font-medium transition-all duration-200 mt-auto group/link"
                      style={{ color: item.accent }}>
                      <FiExternalLink size={11} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      View Certificate
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
