import { useState, useEffect } from 'react';
import { api } from '../../hooks/useApi';
import { Field, Textarea, SectionHeader, ColorPicker, TagInput } from '../components/FormUI';

const EMPTY = { period: '', role: '', company: '', type: 'Internship', description: '', technologies: [], accent: '#818cf8' };

export default function ExperienceForm({ onSave }) {
  const [list,    setList]    = useState([]);
  const [editing, setEditing] = useState(null);
  const [form,    setForm]    = useState(EMPTY);
  const [saving,  setSaving]  = useState(false);

  useEffect(() => { api.get('/api/experience').then(setList); }, []);

  const set = (key) => (val) => setForm(p => ({ ...p, [key]: val }));

  const startEdit = (exp) => { setEditing(exp.id); setForm({ ...exp }); };
  const startNew  = ()    => { setEditing('new'); setForm(EMPTY); };
  const cancel    = ()    => setEditing(null);

  const save = async () => {
    setSaving(true);
    try {
      if (editing === 'new') {
        const item = await api.post('/api/experience', form);
        setList(p => [...p, item]);
      } else {
        const item = await api.put(`/api/experience/${editing}`, form);
        setList(p => p.map(x => x.id === editing ? item : x));
      }
      setEditing(null);
      onSave('Experience saved!');
    } catch { onSave('Save failed', 'error'); }
    finally { setSaving(false); }
  };

  const del = async (id) => {
    if (!confirm('Delete this experience?')) return;
    await api.delete(`/api/experience/${id}`);
    setList(p => p.filter(x => x.id !== id));
    onSave('Experience deleted');
  };

  return (
    <div className="max-w-2xl space-y-6">
      <SectionHeader title="Experience" desc="Manage your work experience and internship timeline." />

      {editing === null && (
        <>
          <button onClick={startNew} className="btn-primary px-5 py-2.5 text-sm">+ Add Experience</button>
          <div className="space-y-3">
            {list.map(exp => (
              <div key={exp.id} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: exp.accent }} />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-[#e2e2e2] truncate">{exp.role}</div>
                    <div className="font-mono-custom text-[10px] text-[#555]">{exp.company} · {exp.period}</div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => startEdit(exp)} className="admin-btn-sm">Edit</button>
                  <button onClick={() => del(exp.id)}    className="admin-btn-sm danger">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {editing !== null && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-[#f0f0f0]">
              {editing === 'new' ? 'New Experience' : 'Edit Experience'}
            </h3>
            <button onClick={cancel} className="admin-btn-sm">Cancel</button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Role / Title"  value={form.role}    onChange={set('role')}    placeholder="e.g. ML Engineer Intern" />
            <Field label="Company"       value={form.company} onChange={set('company')} placeholder="e.g. Acme Corp" />
            <Field label="Period"        value={form.period}  onChange={set('period')}  placeholder="e.g. Jun 2024 – Aug 2024" />
            <div className="space-y-1.5">
              <label className="admin-label">Type</label>
              <select
                value={form.type}
                onChange={e => set('type')(e.target.value)}
                className="admin-input w-full"
              >
                {['Internship', 'Part-time', 'Full-time', 'Contract', 'Freelance', 'Research'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <Textarea label="Description" rows={3} value={form.description} onChange={set('description')} placeholder="What did you work on?" />
          <TagInput label="Technologies Used" value={form.technologies} onChange={set('technologies')} placeholder="Add tech, press Enter" />
          <ColorPicker label="Accent Color" value={form.accent} onChange={set('accent')} />

          <div className="flex gap-3">
            <button onClick={save} disabled={saving} className="btn-primary px-6 py-2.5 disabled:opacity-60">
              {saving ? 'Saving…' : 'Save Experience'}
            </button>
            <button onClick={cancel} className="btn-ghost px-6 py-2.5">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
