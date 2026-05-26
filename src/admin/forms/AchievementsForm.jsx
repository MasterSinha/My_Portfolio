import { useState, useEffect } from 'react';
import { api } from '../../hooks/useApi';
import { Field, Textarea, SectionHeader, ColorPicker } from '../components/FormUI';

const EMPTY = { title: '', description: '', metric: '', accent: '#818cf8', certificationUrl: '' };

export default function AchievementsForm({ onSave }) {
  const [list,    setList]    = useState([]);
  const [editing, setEditing] = useState(null);
  const [form,    setForm]    = useState(EMPTY);
  const [saving,  setSaving]  = useState(false);

  useEffect(() => { api.get('/api/achievements').then(setList); }, []);

  const set = (key) => (val) => setForm(p => ({ ...p, [key]: val }));

  const startEdit = (item) => { setEditing(item.id); setForm({ ...item }); };
  const startNew  = ()     => { setEditing('new'); setForm(EMPTY); };
  const cancel    = ()     => setEditing(null);

  const save = async () => {
    setSaving(true);
    try {
      if (editing === 'new') {
        const item = await api.post('/api/achievements', form);
        setList(p => [...p, item]);
      } else {
        const item = await api.put(`/api/achievements/${editing}`, form);
        setList(p => p.map(x => x.id === editing ? item : x));
      }
      setEditing(null);
      onSave('Achievement saved!');
    } catch { onSave('Save failed', 'error'); }
    finally { setSaving(false); }
  };

  const del = async (id) => {
    if (!confirm('Delete this achievement?')) return;
    await api.delete(`/api/achievements/${id}`);
    setList(p => p.filter(x => x.id !== id));
    onSave('Achievement deleted');
  };

  return (
    <div className="max-w-2xl space-y-6">
      <SectionHeader title="Achievements" desc="Certifications, awards, and notable accomplishments." />

      {editing === null && (
        <>
          <button onClick={startNew} className="btn-primary px-5 py-2.5 text-sm">+ Add Achievement</button>
          <div className="space-y-3">
            {list.map(item => (
              <div key={item.id} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: item.accent }} />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-[#e2e2e2] truncate">{item.title}</div>
                    <div className="font-mono-custom text-[10px] text-[#555]">{item.metric}</div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => startEdit(item)} className="admin-btn-sm">Edit</button>
                  <button onClick={() => del(item.id)}    className="admin-btn-sm danger">Delete</button>
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
              {editing === 'new' ? 'New Achievement' : 'Edit Achievement'}
            </h3>
            <button onClick={cancel} className="admin-btn-sm">Cancel</button>
          </div>

          <Field label="Title" value={form.title} onChange={set('title')} placeholder="e.g. AWS Certified Solutions Architect" />
          <Textarea label="Description" rows={3} value={form.description} onChange={set('description')} placeholder="Brief description of the achievement..." />
          <Field label="Metric / Badge" value={form.metric} onChange={set('metric')} placeholder="e.g. Score: 920/1000 · 2024" />
          <Field label="Certification URL" value={form.certificationUrl} onChange={set('certificationUrl')} placeholder="https://credentials.example.com/..." />
          <ColorPicker label="Accent Color" value={form.accent} onChange={set('accent')} />

          <div className="flex gap-3">
            <button onClick={save} disabled={saving} className="btn-primary px-6 py-2.5 disabled:opacity-60">
              {saving ? 'Saving…' : 'Save Achievement'}
            </button>
            <button onClick={cancel} className="btn-ghost px-6 py-2.5">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
