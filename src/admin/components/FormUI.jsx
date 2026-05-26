export function SectionHeader({ title, desc }) {
  return (
    <div className="mb-2">
      <h2 className="font-display text-2xl font-semibold text-[#f0f0f0]">{title}</h2>
      {desc && <p className="font-mono-custom text-xs text-[#555] mt-1">{desc}</p>}
    </div>
  );
}

export function Field({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="admin-label">{label}</label>}
      <input
        type={type}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="admin-input w-full"
      />
    </div>
  );
}

export function Textarea({ label, value, onChange, rows = 3, placeholder = '' }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="admin-label">{label}</label>}
      <textarea
        rows={rows}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="admin-input w-full resize-none"
      />
    </div>
  );
}

export function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${checked ? 'bg-indigo-500' : 'bg-white/10'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${checked ? 'translate-x-5' : ''}`} />
      </div>
      <span className="font-mono-custom text-xs text-[#888]">{label}</span>
    </label>
  );
}

export function ColorPicker({ label, value, onChange }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="admin-label">{label}</label>}
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value || '#818cf8'}
          onChange={e => onChange(e.target.value)}
          className="w-10 h-10 rounded-lg cursor-pointer border border-white/10 bg-transparent"
        />
        <input
          type="text"
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          className="admin-input w-36 font-mono-custom text-xs"
          placeholder="#818cf8"
        />
        <div className="w-8 h-8 rounded-lg border border-white/10" style={{ background: value }} />
      </div>
    </div>
  );
}

export function TagInput({ label, value = [], onChange, placeholder = 'Add tag, press Enter' }) {
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = e.target.value.trim().replace(/,$/, '');
      if (tag && !value.includes(tag)) onChange([...value, tag]);
      e.target.value = '';
    } else if (e.key === 'Backspace' && !e.target.value && value.length) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div className="space-y-1.5">
      {label && <label className="admin-label">{label}</label>}
      <div className="admin-input flex flex-wrap gap-1.5 min-h-[42px]">
        {value.map((tag, i) => (
          <span key={i} className="inline-flex items-center gap-1 bg-indigo-500/20 text-indigo-300 text-xs px-2 py-0.5 rounded-md font-mono-custom">
            {tag}
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="hover:text-white">×</button>
          </span>
        ))}
        <input
          type="text"
          onKeyDown={handleKey}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-[#e2e2e2] placeholder-[#444]"
        />
      </div>
    </div>
  );
}
