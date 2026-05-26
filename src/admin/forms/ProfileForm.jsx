import { useState, useEffect } from 'react';
import { api } from '../../hooks/useApi';
import { Field, Textarea, Toggle, SectionHeader, ColorPicker } from '../components/FormUI';

export default function ProfileForm({ onSave }) {
  const [form, setForm]     = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/api/profile').then(setForm);
  }, []);

  const set = (key) => (val) => setForm(p => ({ ...p, [key]: val }));

  const setStat = (i, field, val) => setForm(p => {
    const stats = [...(p.stats || [])];
    stats[i] = { ...stats[i], [field]: val };
    return { ...p, stats };
  });

  const setPillar = (i, field, val) => setForm(p => {
    const pillars = [...(p.pillars || [])];
    pillars[i] = { ...pillars[i], [field]: val };
    return { ...p, pillars };
  });

  const addPillar = () => setForm(p => ({
    ...p,
    pillars: [...(p.pillars || []), { label: '', desc: '', color: '#22d3ee' }],
  }));

  const removePillar = (i) => setForm(p => ({
    ...p,
    pillars: (p.pillars || []).filter((_, idx) => idx !== i),
  }));

  const save = async () => {
    setSaving(true);
    try {
      await api.put('/api/profile', form);
      onSave('Profile saved!');
    } catch { onSave('Save failed', 'error'); }
    finally { setSaving(false); }
  };

  if (!form) return <div className="text-[#555] font-mono-custom text-sm">Loading…</div>;

  return (
    <div className="max-w-2xl space-y-8">
      <SectionHeader title="Profile" desc="Your personal info shown across the portfolio." />

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name"       value={form.name}      onChange={set('name')} />
        <Field label="Tagline"         value={form.tagline}   onChange={set('tagline')} />
        <Field label="Email"           value={form.email}     onChange={set('email')}    type="email" />
        <Field label="Location"        value={form.location}  onChange={set('location')} />
        <Field label="Education"       value={form.education} onChange={set('education')} />
        <Field label="Status"          value={form.status}    onChange={set('status')} placeholder="e.g. Open to work" />
        <Field label="GitHub URL"      value={form.github}    onChange={set('github')}   placeholder="https://github.com/username" />
        <Field label="LinkedIn URL"    value={form.linkedin}  onChange={set('linkedin')} placeholder="https://linkedin.com/in/username" />
        <Field label="Kaggle URL"      value={form.kaggle}    onChange={set('kaggle')}   placeholder="https://kaggle.com/username" />
        <Field label="Resume URL"      value={form.resumeUrl} onChange={set('resumeUrl')} placeholder="/resume.pdf" />
      </div>

      <Toggle label="Available for opportunities" checked={form.available} onChange={set('available')} />

      <div className="space-y-3">
        <label className="admin-label">Hero Heading</label>
        <Field value={form.heroHeading} onChange={set('heroHeading')} placeholder="Building Digital Experiences..." />
      </div>

      <div className="space-y-3">
        <label className="admin-label">Typing Roles (one per line)</label>
        <Textarea rows={4} value={(form.roles || []).join('\n')}
          onChange={v => set('roles')(v.split('\n').filter(Boolean))}
          placeholder="Data Scientist&#10;ML Engineer&#10;Big Data Analyst" />
      </div>

      <div className="space-y-3">
        <label className="admin-label">Bio — Paragraph 1</label>
        <Textarea rows={3} value={form.bio?.[0] || ''} onChange={v => setForm(p => ({ ...p, bio: [v, p.bio?.[1] || ''] }))} />
        <label className="admin-label">Bio — Paragraph 2</label>
        <Textarea rows={3} value={form.bio?.[1] || ''} onChange={v => setForm(p => ({ ...p, bio: [p.bio?.[0] || '', v] }))} />
      </div>

      <div className="space-y-3">
        <label className="admin-label">Stats (shown in hero)</label>
        {(form.stats || []).map((s, i) => (
          <div key={i} className="flex gap-3">
            <Field placeholder="Value (e.g. 20+)" value={s.value} onChange={v => setStat(i, 'value', v)} />
            <Field placeholder="Label (e.g. Projects)" value={s.label} onChange={v => setStat(i, 'label', v)} />
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="admin-label">Expertise Pillars (About section)</label>
          <button type="button" onClick={addPillar}
            className="text-[11px] font-mono-custom px-3 py-1.5 rounded-lg transition-colors"
            style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)', color: '#22d3ee' }}>
            + Add Pillar
          </button>
        </div>
        {(form.pillars || []).map((p, i) => (
          <div key={i} className="rounded-xl p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center justify-between">
              <span className="font-mono-custom text-[10px] text-slate-600 uppercase tracking-widest">Pillar {i + 1}</span>
              <button type="button" onClick={() => removePillar(i)}
                className="font-mono-custom text-[10px] text-red-500/60 hover:text-red-400 transition-colors px-2 py-1">
                Remove
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Label" value={p.label} onChange={v => setPillar(i, 'label', v)} placeholder="e.g. Machine Learning" />
              <Field label="Description" value={p.desc}  onChange={v => setPillar(i, 'desc',  v)} placeholder="e.g. End-to-end ML pipelines" />
            </div>
            <ColorPicker label="Accent Color" value={p.color} onChange={v => setPillar(i, 'color', v)} />
          </div>
        ))}
      </div>

      <button onClick={save} disabled={saving} className="btn-primary px-8 py-3 disabled:opacity-60">
        {saving ? 'Saving…' : 'Save Profile'}
      </button>
    </div>
  );
}
