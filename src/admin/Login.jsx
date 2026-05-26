import { useState } from 'react';

export default function Login({ onLogin }) {
  const [pw, setPw]   = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setErr('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      });
      if (!res.ok) throw new Error('Wrong password');
      const { token } = await res.json();
      onLogin(token);
    } catch {
      setErr('Incorrect password. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="font-display text-4xl font-semibold gradient-text mb-2">Admin Panel</div>
          <p className="text-[#555] font-mono-custom text-xs tracking-widest">PORTFOLIO CMS</p>
        </div>

        <form onSubmit={submit} className="glass-strong rounded-2xl p-8 space-y-5">
          <div className="space-y-1.5">
            <label className="font-mono-custom text-[10px] tracking-widest text-[#555] uppercase">Password</label>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="Enter admin password"
              required
              className="w-full rounded-xl px-4 py-3 text-sm text-[#e2e2e2] placeholder-[#444] focus:outline-none transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            />
          </div>

          {err && <p className="text-red-400 text-xs font-mono-custom">{err}</p>}

          <button type="submit" disabled={loading}
            className="btn-primary w-full justify-center py-3.5 disabled:opacity-60">
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>

          <p className="text-center font-mono-custom text-[10px] text-[#333]">
            Default password: <span className="text-[#555]">admin@portfolio</span>
          </p>
        </form>

        <div className="text-center mt-6">
          <a href="/" className="font-mono-custom text-[11px] text-[#444] hover:text-[#888] transition-colors">
            ← Back to portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
