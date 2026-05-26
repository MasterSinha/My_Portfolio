import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const LINKS = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [open,      setOpen]      = useState(false);
  const [active,    setActive]    = useState('Home');
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.dataset.nav || '')),
      { threshold: 0.35 }
    );
    LINKS.forEach(l => {
      const el = document.getElementById(l.toLowerCase());
      if (el) { el.dataset.nav = l; obs.observe(el); }
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none">
        <div
          className="h-full transition-all duration-150"
          style={{
            width: `${scrollPct}%`,
            background: 'linear-gradient(90deg, #06b6d4, #22d3ee, #a3e635)',
            opacity: scrolled ? 1 : 0,
            boxShadow: '0 0 8px rgba(6,182,212,0.7)',
          }}
        />
      </div>

      <motion.header
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 lg:px-10"
        style={{ paddingTop: scrolled ? '14px' : '24px', paddingBottom: scrolled ? '14px' : '24px', transition: 'padding 0.4s cubic-bezier(0.22,1,0.36,1)' }}
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >

        {/* ── Logo ── */}
        <a href="#home" className="group flex items-center gap-2.5 select-none">
          <div className="relative w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.25), rgba(163,230,53,0.15))', border: '1px solid rgba(6,182,212,0.3)' }}>
            <span className="font-display text-[13px] font-bold gradient-text">AS</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.35), rgba(163,230,53,0.25))' }} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-semibold text-[#e2e2e2] tracking-tight group-hover:gradient-text transition-all duration-300">
              Ayush Sinha
            </span>
            <span className="font-mono-custom text-[9px] text-[#444] tracking-widest uppercase">Portfolio</span>
          </div>
        </a>

        {/* ── Floating pill nav (desktop) ── */}
        <nav className="hidden md:flex">
          <div className={cn(
            'flex items-center gap-1 px-2 py-2 rounded-2xl transition-all duration-500',
            scrolled
              ? 'bg-[#0a0a0a]/80 border border-white/8 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : 'bg-transparent'
          )}>
            {LINKS.map(l => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="relative px-4 py-2 rounded-xl font-mono-custom text-[11px] tracking-[0.1em] uppercase transition-colors duration-200 z-0"
                style={{ color: active === l ? '#e2e2e2' : '#555' }}
                onMouseEnter={e => { if (active !== l) e.currentTarget.style.color = '#999'; }}
                onMouseLeave={e => { if (active !== l) e.currentTarget.style.color = '#555'; }}
              >
                {active === l && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl -z-10"
                    style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.18), rgba(163,230,53,0.12))', border: '1px solid rgba(6,182,212,0.22)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                {l}
              </a>
            ))}
          </div>
        </nav>

        {/* ── Right: Resume + Hamburger ── */}
        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 font-mono-custom text-[11px] tracking-wider px-5 py-2.5 rounded-xl transition-all duration-300 group"
            style={{
              background: 'rgba(6,182,212,0.1)',
              border: '1px solid rgba(6,182,212,0.25)',
              color: '#22d3ee',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(6,182,212,0.18)';
              e.currentTarget.style.borderColor = 'rgba(6,182,212,0.5)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(6,182,212,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(6,182,212,0.1)';
              e.currentTarget.style.borderColor = 'rgba(6,182,212,0.25)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Resume
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(p => !p)}
            className="md:hidden relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{ background: open ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            aria-label="menu"
          >
            <div className="w-4 flex flex-col gap-[5px]">
              <span className={cn('block h-[1.5px] bg-[#aaa] rounded-full transition-all duration-300 origin-center', open ? 'rotate-45 translate-y-[6.5px]' : 'w-4')} />
              <span className={cn('block h-[1.5px] bg-[#aaa] rounded-full transition-all duration-300', open ? 'opacity-0 scale-x-0' : 'w-2.5')} />
              <span className={cn('block h-[1.5px] bg-[#aaa] rounded-full transition-all duration-300 origin-center', open ? '-rotate-45 -translate-y-[6.5px] w-4' : 'w-3.5')} />
            </div>
          </button>
        </div>
      </motion.header>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'rgba(3,3,3,0.97)', backdropFilter: 'blur(28px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* top gradient line */}
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.6), rgba(163,230,53,0.6), transparent)' }} />

            <div className="flex-1 flex flex-col items-center justify-center gap-2 px-8">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="group w-full max-w-xs flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-200"
                  style={{ background: active === l ? 'rgba(6,182,212,0.1)' : 'transparent', border: active === l ? '1px solid rgba(6,182,212,0.2)' : '1px solid transparent' }}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <span className={cn('font-display text-2xl font-semibold transition-colors', active === l ? 'gradient-text' : 'text-[#555] group-hover:text-[#e2e2e2]')}>
                    {l}
                  </span>
                  <span className="font-mono-custom text-[10px] text-[#333]">0{i + 1}</span>
                </motion.a>
              ))}
            </div>

            <div className="pb-10 flex flex-col items-center gap-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="btn-primary px-8 py-3 font-mono-custom text-[11px] tracking-wider"
              >
                View Resume ↗
              </a>
              <p className="font-mono-custom text-[10px] text-[#333] tracking-widest">AYUSH SINHA · PORTFOLIO</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
