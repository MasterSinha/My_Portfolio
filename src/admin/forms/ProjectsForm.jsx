import { useState, useEffect } from 'react';
import { api } from '../../hooks/useApi';
import { Field, Textarea, Toggle, SectionHeader, ColorPicker, TagInput } from '../components/FormUI';

const EMPTY = { title: '', desc: '', tags: [], metric: '', accent: '#818cf8', featured: false, githubUrl: '', liveUrl: '' };

export default function ProjectsForm({ onSave }) {
  const [list,    setList]    = useState([]);
  const [editing, setEditing] = useState(null); // null | 'new' | id
  const [form,    setForm]    = useState(EMPTY);
  const [saving,  setSaving]  = useState(false);

  useEffect(() => { api.get('/api/projects').then(setList); }, []);

  const set = (key) => (val) => setForm(p => ({ ...p, [key]: val }));

  const startEdit = (proj) => { setEditing(proj.id); setForm({ ...proj }); };
  const startNew  = ()     => { setEditing('new'); setForm(EMPTY); };
  const cancel    = ()     => { setEditing(null); };

  const save = async () => {
    setSaving(true);
    try {
      if (editing === 'new') {
        const item = await api.post('/api/projects', form);
        setList(p => [...p, item]);
      } else {
        const item = await api.put(`/api/projects/${editing}`, form);
        setList(p => p.map(x => x.id === editing ? item : x));
      }
      setEditing(null);
      onSave('Project saved!');
    } catch { onSave('Save failed', 'error'); }
    finally { setSaving(false); }
  };

  const del = async (id) => {
    if (!confirm('Delete this project?')) return;
    await api.delete(`/api/projects/${id}`);
    setList(p => p.filter(x => x.id !== id));
    onSave('Project deleted');
  };

  return (
    <div className="max-w-2xl space-y-6">
      <SectionHeader title="Projects" desc="Manage portfolio projects. The featured project appears large." />

      {/* List */}
      {editing === null && (
        <>
          <button onClick={startNew} className="btn-primary px-5 py-2.5 text-sm">+ Add Project</button>
          <div className="space-y-3">
            {list.map(p => (
              <div key={p.id} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: p.accent }} />
                  <div>
                    <div className="text-sm font-medium text-[#e2e2e2] truncate">{p.title}</div>
                    <div className="font-mono-custom text-[10px] text-[#555]">{p.metric} {p.featured ? '· Featured' : ''}</div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => startEdit(p)} className="admin-btn-sm">Edit</button>
                  <button onClick={() => del(p.id)}    className="admin-btn-sm danger">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Edit / New form */}
      {editing !== null && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-[#f0f0f0]">{editing === 'new' ? 'New Project' : 'Edit Project'}</h3>
            <button onClick={cancel} className="admin-btn-sm">Cancel</button>
          </div>

          <Field label="Title"         value={form.title}     onChange={set('title')} />
          <Textarea label="Description" rows={3} value={form.desc} onChange={set('desc')} />
          <Field label="Metric badge"  value={form.metric}    onChange={set('metric')}    placeholder="e.g. 96% Accuracy" />
          <TagInput label="Tech Tags"  value={form.tags}      onChange={set('tags')}       placeholder="Add tag, press Enter" />
          <ColorPicker label="Accent Color" value={form.accent} onChange={set('accent')} />
          <Field label="GitHub URL"    value={form.githubUrl} onChange={set('githubUrl')} placeholder="https://github.com/..." />
          <Field label="Live URL"      value={form.liveUrl}   onChange={set('liveUrl')}   placeholder="https://..." />
          <Toggle label="Featured project (displayed large)" checked={form.featured} onChange={set('featured')} />

          <div className="flex gap-3">
            <button onClick={save} disabled={saving} className="btn-primary px-6 py-2.5 disabled:opacity-60">
              {saving ? 'Saving…' : 'Save Project'}
            </button>
            <button onClick={cancel} className="btn-ghost px-6 py-2.5">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
