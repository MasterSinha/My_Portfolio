import { FaGithub, FaLinkedin, FaKaggle } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { useApi } from '../hooks/useApi';

const NAV = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

export default function Footer() {
  const { data: profile } = useApi('/api/profile', {});

  const socials = [
    { icon: <FaGithub size={14} />,   href: profile?.github,   label: 'GitHub'   },
    { icon: <FaLinkedin size={14} />, href: profile?.linkedin, label: 'LinkedIn' },
    { icon: <FaKaggle size={14} />,   href: profile?.kaggle,   label: 'Kaggle'   },
    { icon: <HiMail size={14} />,     href: profile?.email ? `mailto:${profile.email}` : null, label: 'Email' },
  ].filter(s => s.href);

  return (
    <footer className="relative bg-[#070e10] overflow-hidden">
      {/* Top gradient border */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.5), rgba(6,182,212,0.4), transparent)' }} />

      {/* Subtle orb */}
      <div className="orb orb-cyan absolute" style={{ width: 600, height: 300, bottom: 0, left: '50%', transform: 'translateX(-50%)', opacity: 0.12 }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-8">

        <div className="grid md:grid-cols-[1.5fr_auto_auto] gap-10 items-start pb-10 border-b border-white/5">

          {/* Brand */}
          <div className="space-y-4 max-w-xs">
            <a href="#home" className="font-display text-2xl font-semibold gradient-text block">
              {profile?.name || 'Ayush Sinha'}
            </a>
            <p className="font-mono-custom text-xs text-slate-600 leading-relaxed">
              {profile?.tagline || 'Data Scientist & ML Engineer'} — turning raw data into intelligent systems.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="w-9 h-9 glass rounded-xl flex items-center justify-center text-slate-600 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_16px_rgba(6,182,212,0.2)]">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <div className="font-mono-custom text-[10px] tracking-widest text-slate-700 uppercase mb-4">Navigate</div>
            <ul className="space-y-2.5">
              {NAV.map(l => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`}
                    className="font-mono-custom text-xs text-slate-600 hover:text-cyan-400 transition-colors duration-200">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <div className="font-mono-custom text-[10px] tracking-widest text-slate-700 uppercase mb-4">Contact</div>
            <div className="space-y-2.5">
              {profile?.email && (
                <a href={`mailto:${profile.email}`} className="block font-mono-custom text-xs text-slate-600 hover:text-cyan-400 transition-colors duration-200">
                  {profile.email}
                </a>
              )}
              {profile?.location && (
                <p className="font-mono-custom text-xs text-slate-700">{profile.location}</p>
              )}
              {profile?.available && (
                <div className="inline-flex items-center gap-1.5 font-mono-custom text-[10px] text-emerald-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Open to work
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono-custom text-[10px] text-slate-700">
            Designed & built by <span className="text-slate-500">{profile?.name || 'Ayush Sinha'}</span>
          </p>
          <p className="font-mono-custom text-[10px] text-slate-800">
            © {new Date().getFullYear()} — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
