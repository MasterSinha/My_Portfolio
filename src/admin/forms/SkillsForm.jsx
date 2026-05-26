import { useState, useEffect } from 'react';
import { api } from '../../hooks/useApi';
import { Field, SectionHeader, ColorPicker } from '../components/FormUI';

const EMPTY_CAT = { category: '', color: '#818cf8', items: [] };

export default function SkillsForm({ onSave }) {
  const [list,    setList]    = useState([]);
  const [editing, setEditing] = useState(null);
  const [form,    setForm]    = useState(EMPTY_CAT);
  const [saving,  setSaving]  = useState(false);

  useEffect(() => { api.get('/api/skills').then(setList); }, []);

  const set = (key) => (val) => setForm(p => ({ ...p, [key]: val }));

  const setItem = (i, field, val) => setForm(p => {
    const items = [...p.items];
    items[i] = { ...items[i], [field]: val };
    return { ...p, items };
  });

  const addItem  = () => setForm(p => ({ ...p, items: [...p.items, { name: '', level: 80 }] }));
  const delItem  = (i) => setForm(p => ({ ...p, items: p.items.filter((_, j) => j !== i) }));

  const startEdit = (cat) => { setEditing(cat.id); setForm({ ...cat, items: [...cat.items] }); };
  const startNew  = ()    => { setEditing('new'); setForm(EMPTY_CAT); };
  const cancel    = ()    => setEditing(null);

  const save = async () => {
    setSaving(true);
    try {
      if (editing === 'new') {
        const item = await api.post('/api/skills', form);
        setList(p => [...p, item]);
      } else {
        const item = await api.put(`/api/skills/${editing}`, form);
        setList(p => p.map(x => x.id === editing ? item : x));
      }
      setEditing(null);
      onSave('Skills saved!');
    } catch { onSave('Save failed', 'error'); }
    finally { setSaving(false); }
  };

  const del = async (id) => {
    if (!confirm('Delete this skill category?')) return;
    await api.delete(`/api/skills/${id}`);
    setList(p => p.filter(x => x.id !== id));
    onSave('Category deleted');
  };

  return (
    <div className="max-w-2xl space-y-6">
      <SectionHeader title="Skills" desc="Manage skill categories and individual skill levels." />

      {editing === null && (
        <>
          <button onClick={startNew} className="btn-primary px-5 py-2.5 text-sm">+ Add Category</button>
          <div className="space-y-3">
            {list.map(cat => (
              <div key={cat.id} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: cat.color }} />
                  <div>
                    <div className="text-sm font-medium text-[#e2e2e2]">{cat.category}</div>
                    <div className="font-mono-custom text-[10px] text-[#555]">{cat.items?.length || 0} skills</div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => startEdit(cat)} className="admin-btn-sm">Edit</button>
                  <button onClick={() => del(cat.id)}    className="admin-btn-sm danger">Delete</button>
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
              {editing === 'new' ? 'New Category' : 'Edit Category'}
            </h3>
            <button onClick={cancel} className="admin-btn-sm">Cancel</button>
          </div>

          <Field label="Category Name" value={form.category} onChange={set('category')} placeholder="e.g. Machine Learning" />
          <ColorPicker label="Accent Color" value={form.color} onChange={set('color')} />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="admin-label">Skills</label>
              <button onClick={addItem} className="admin-btn-sm">+ Add Skill</button>
            </div>
            {form.items.map((item, i) => (
              <div key={i} className="glass rounded-xl p-3 space-y-2">
                <div className="flex gap-3 items-start">
                  <div className="flex-1">
                    <Field placeholder="Skill name (e.g. Python)" value={item.name} onChange={v => setItem(i, 'name', v)} />
                  </div>
                  <button onClick={() => delItem(i)} className="admin-btn-sm danger mt-6">×</button>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <label className="admin-label">Level</label>
                    <span className="font-mono-custom text-[10px] text-[#555]">{item.level}%</span>
                  </div>
                  <input
                    type="range" min="0" max="100"
                    value={item.level || 80}
                    onChange={e => setItem(i, 'level', Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                  <div className="h-1 rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-indigo-500/60 transition-all" style={{ width: `${item.level}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={save} disabled={saving} className="btn-primary px-6 py-2.5 disabled:opacity-60">
              {saving ? 'Saving…' : 'Save Category'}
            </button>
            <button onClick={cancel} className="btn-ghost px-6 py-2.5">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
