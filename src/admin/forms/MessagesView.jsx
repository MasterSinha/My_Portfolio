import { useState, useEffect } from 'react';
import { api } from '../../hooks/useApi';
import { SectionHeader } from '../components/FormUI';

export default function MessagesView() {
  const [messages, setMessages] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [expanded, setExpanded] = useState(null);

  const load = () => {
    setLoading(true);
    fetch('/api/messages', { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken') || ''}` } })
      .then(r => r.json())
      .then(d => { setMessages(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await fetch(`/api/messages/${id}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken') || ''}` },
    });
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const remove = async (id) => {
    await api.delete(`/api/messages/${id}`);
    setMessages(prev => prev.filter(m => m.id !== id));
    if (expanded === id) setExpanded(null);
  };

  const toggle = (id) => {
    setExpanded(p => p === id ? null : id);
    const msg = messages.find(m => m.id === id);
    if (msg && !msg.read) markRead(id);
  };

  const unread = messages.filter(m => !m.read).length;

  if (loading) return <div className="text-[#555] font-mono-custom text-sm">Loading…</div>;

  return (
    <div className="max-w-2xl space-y-6">
      <SectionHeader
        title={`Messages ${unread > 0 ? `(${unread} unread)` : ''}`}
        desc="Contact form submissions from your portfolio visitors."
      />

      {messages.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="text-3xl mb-3">📭</div>
          <p className="font-mono-custom text-sm text-[#555]">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map(m => (
            <div key={m.id}
              className="rounded-2xl overflow-hidden transition-all duration-200"
              style={{
                background: m.read ? 'rgba(255,255,255,0.02)' : 'rgba(6,182,212,0.04)',
                border: `1px solid ${m.read ? 'rgba(255,255,255,0.06)' : 'rgba(6,182,212,0.2)'}`,
              }}>

              {/* Header row */}
              <button className="w-full flex items-center gap-4 px-5 py-4 text-left" onClick={() => toggle(m.id)}>
                {!m.read && <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 animate-pulse" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-semibold text-sm text-slate-200">{m.name}</span>
                    <span className="font-mono-custom text-[11px] text-slate-600">{m.email}</span>
                  </div>
                  <p className="font-mono-custom text-[11px] text-slate-600 mt-0.5 truncate">{m.message}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono-custom text-[10px] text-slate-700">
                    {new Date(m.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <span className="text-slate-700 transition-transform duration-200" style={{ transform: expanded === m.id ? 'rotate(180deg)' : 'none' }}>▾</span>
                </div>
              </button>

              {/* Expanded message */}
              {expanded === m.id && (
                <div className="px-5 pb-5 space-y-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <p className="text-slate-400 text-sm leading-relaxed pt-4 whitespace-pre-wrap">{m.message}</p>
                  <div className="flex items-center gap-3">
                    <a href={`mailto:${m.email}?subject=Re: Your message`}
                      className="font-mono-custom text-[11px] px-4 py-2 rounded-lg transition-colors"
                      style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)', color: '#22d3ee' }}>
                      ↩ Reply
                    </a>
                    <button onClick={() => remove(m.id)}
                      className="font-mono-custom text-[11px] px-4 py-2 rounded-lg transition-colors text-red-500/60 hover:text-red-400"
                      style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
