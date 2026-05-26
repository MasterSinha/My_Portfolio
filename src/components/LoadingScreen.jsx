import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase]       = useState('loading'); // 'loading' | 'exit'

  useEffect(() => {
    const timers = [
      setTimeout(() => setProgress(25),  150),
      setTimeout(() => setProgress(50),  450),
      setTimeout(() => setProgress(72),  750),
      setTimeout(() => setProgress(88),  1050),
      setTimeout(() => setProgress(100), 1350),
      setTimeout(() => setPhase('exit'), 1700),
      setTimeout(() => onComplete?.(),   2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []); // eslint-disable-line

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#070e10' }}
          exit={{ y: '-100%', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(6,182,212,0.12) 0%, transparent 70%)' }} />

          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
            className="mb-8 relative"
          >
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center relative"
              style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(163,230,53,0.12))', border: '1px solid rgba(6,182,212,0.35)', boxShadow: '0 0 60px rgba(6,182,212,0.25)' }}>
              <span style={{ fontFamily: '"Clash Display", sans-serif', fontSize: '1.8rem', fontWeight: 700, background: 'linear-gradient(135deg, #22d3ee, #a3e635)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                AS
              </span>
              {/* Spinning ring */}
              <div className="absolute inset-[-6px] rounded-[20px] border border-dashed animate-spin"
                style={{ borderColor: 'rgba(6,182,212,0.2)', animationDuration: '8s' }} />
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ fontFamily: '"Clash Display", sans-serif', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.15em', color: '#e2e8f0', marginBottom: '0.4rem' }}
          >
            AYUSH SINHA
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.6rem', color: '#22d3ee', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '2.5rem' }}
          >
            Data Scientist · ML Engineer
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            style={{ width: '140px', height: '1.5px', background: 'rgba(255,255,255,0.08)', borderRadius: '1px', overflow: 'hidden', marginBottom: '0.75rem' }}
          >
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #22d3ee, #a3e635)',
              boxShadow: '0 0 10px rgba(6,182,212,0.9)',
              transition: 'width 0.4s cubic-bezier(0.22,1,0.36,1)',
              borderRadius: '1px',
            }} />
          </motion.div>

          {/* Counter */}
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem', color: '#334155', letterSpacing: '0.25em' }}>
            {String(progress).padStart(3, '0')}
          </div>

          {/* Bottom tagline */}
          <div style={{ position: 'absolute', bottom: '2rem', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.55rem', color: 'rgba(51,65,85,0.8)', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
            Building Intelligent Systems
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
