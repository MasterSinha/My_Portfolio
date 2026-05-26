import { useState, useEffect } from 'react';
import ProfileForm      from './forms/ProfileForm';
import ProjectsForm     from './forms/ProjectsForm';
import SkillsForm       from './forms/SkillsForm';
import ExperienceForm   from './forms/ExperienceForm';
import AchievementsForm from './forms/AchievementsForm';
import MessagesView     from './forms/MessagesView';

const TABS = [
  { id: 'profile',      label: 'Profile',      icon: '👤' },
  { id: 'projects',     label: 'Projects',     icon: '🚀' },
  { id: 'skills',       label: 'Skills',       icon: '⚡' },
  { id: 'experience',   label: 'Experience',   icon: '💼' },
  { id: 'achievements', label: 'Achievements', icon: '🏆' },
  { id: 'messages',     label: 'Messages',     icon: '✉️'  },
];

export default function Dashboard({ onLogout }) {
  const [tab,    setTab]    = useState('profile');
  const [toast,  setToast]  = useState(null);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const check = () => fetch('/api/messages', { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken') || ''}` } })
      .then(r => r.json()).then(msgs => setUnread(Array.isArray(msgs) ? msgs.filter(m => !m.read).length : 0)).catch(() => {});
    check();
    const id = setInterval(check, 15000);
    return () => clearInterval(id);
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#030303] flex">

      {/* ── Sidebar ── */}
      <aside className="w-56 shrink-0 border-r border-white/5 flex flex-col py-8 px-4 gap-1">
        <div className="px-2 mb-8">
          <div className="font-display text-lg font-semibold gradient-text">Admin</div>
          <div className="font-mono-custom text-[10px] text-[#444] mt-0.5">Portfolio CMS</div>
        </div>

        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 text-left w-full
              ${tab === t.id ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25' : 'text-[#666] hover:text-[#aaa] hover:bg-white/4'}`}>
            <span className="text-base">{t.icon}</span>
            <span className="font-medium flex-1">{t.label}</span>
            {t.id === 'messages' && unread > 0 && (
              <span className="text-[10px] font-mono-custom px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                {unread}
              </span>
            )}
          </button>
        ))}

        <div className="mt-auto space-y-3 px-2">
          <a href="/" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 text-xs text-[#555] hover:text-[#aaa] transition-colors font-mono-custom">
            ↗ View Portfolio
          </a>
          <button onClick={onLogout}
            className="flex items-center gap-2 text-xs text-[#555] hover:text-red-400 transition-colors font-mono-custom">
            ⟵ Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 overflow-y-auto p-8">
        {tab === 'profile'      && <ProfileForm      onSave={showToast} />}
        {tab === 'projects'     && <ProjectsForm     onSave={showToast} />}
        {tab === 'skills'       && <SkillsForm       onSave={showToast} />}
        {tab === 'experience'   && <ExperienceForm   onSave={showToast} />}
        {tab === 'achievements' && <AchievementsForm onSave={showToast} />}
        {tab === 'messages'     && <MessagesView />}
      </main>

      {/* ── Toast ── */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-5 py-3 rounded-xl font-mono-custom text-sm shadow-lg z-50
          ${toast.type === 'success' ? 'bg-green-500/20 border border-green-500/40 text-green-300' : 'bg-red-500/20 border border-red-500/40 text-red-300'}`}>
          {toast.type === 'success' ? '✓ ' : '✗ '}{toast.msg}
        </div>
      )}
    </div>
  );
}
