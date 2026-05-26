import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR  = path.join(__dirname, 'data');
const PORT      = process.env.PORT || 3001;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin@portfolio';

const app = express();
app.use(cors());
app.use(express.json());

// ── Helpers ────────────────────────────────────────────────
const readData  = (file) => JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
const writeData = (file, data) => fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));

const auth = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' });
  next();
};

const nextId = (arr) => arr.length ? Math.max(...arr.map(i => i.id)) + 1 : 1;

// ── Auth ────────────────────────────────────────────────────
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) return res.json({ token: ADMIN_PASSWORD });
  res.status(401).json({ error: 'Wrong password' });
});

// ── Profile ─────────────────────────────────────────────────
app.get('/api/profile', (req, res) => res.json(readData('profile.json')));

app.put('/api/profile', auth, (req, res) => {
  writeData('profile.json', req.body);
  res.json(req.body);
});

// ── Projects ────────────────────────────────────────────────
app.get('/api/projects', (req, res) => res.json(readData('projects.json')));

app.post('/api/projects', auth, (req, res) => {
  const list = readData('projects.json');
  const item = { ...req.body, id: nextId(list) };
  list.push(item);
  writeData('projects.json', list);
  res.json(item);
});

app.put('/api/projects/:id', auth, (req, res) => {
  let list = readData('projects.json');
  const idx = list.findIndex(p => p.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  list[idx] = { ...req.body, id: +req.params.id };
  writeData('projects.json', list);
  res.json(list[idx]);
});

app.delete('/api/projects/:id', auth, (req, res) => {
  let list = readData('projects.json');
  list = list.filter(p => p.id !== +req.params.id);
  writeData('projects.json', list);
  res.json({ ok: true });
});

// ── Skills ──────────────────────────────────────────────────
app.get('/api/skills', (req, res) => res.json(readData('skills.json')));

app.post('/api/skills', auth, (req, res) => {
  const list = readData('skills.json');
  const item = { ...req.body, id: nextId(list) };
  list.push(item);
  writeData('skills.json', list);
  res.json(item);
});

app.put('/api/skills/:id', auth, (req, res) => {
  let list = readData('skills.json');
  const idx = list.findIndex(c => c.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  list[idx] = { ...req.body, id: +req.params.id };
  writeData('skills.json', list);
  res.json(list[idx]);
});

app.delete('/api/skills/:id', auth, (req, res) => {
  let list = readData('skills.json');
  list = list.filter(c => c.id !== +req.params.id);
  writeData('skills.json', list);
  res.json({ ok: true });
});

// ── Experience ──────────────────────────────────────────────
app.get('/api/experience', (req, res) => res.json(readData('experience.json')));

app.post('/api/experience', auth, (req, res) => {
  const list = readData('experience.json');
  const item = { ...req.body, id: nextId(list) };
  list.push(item);
  writeData('experience.json', list);
  res.json(item);
});

app.put('/api/experience/:id', auth, (req, res) => {
  let list = readData('experience.json');
  const idx = list.findIndex(e => e.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  list[idx] = { ...req.body, id: +req.params.id };
  writeData('experience.json', list);
  res.json(list[idx]);
});

app.delete('/api/experience/:id', auth, (req, res) => {
  let list = readData('experience.json');
  list = list.filter(e => e.id !== +req.params.id);
  writeData('experience.json', list);
  res.json({ ok: true });
});

// ── Achievements ────────────────────────────────────────────
app.get('/api/achievements', (req, res) => res.json(readData('achievements.json')));

app.post('/api/achievements', auth, (req, res) => {
  const list = readData('achievements.json');
  const item = { ...req.body, id: nextId(list) };
  list.push(item);
  writeData('achievements.json', list);
  res.json(item);
});

app.put('/api/achievements/:id', auth, (req, res) => {
  let list = readData('achievements.json');
  const idx = list.findIndex(a => a.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  list[idx] = { ...req.body, id: +req.params.id };
  writeData('achievements.json', list);
  res.json(list[idx]);
});

app.delete('/api/achievements/:id', auth, (req, res) => {
  let list = readData('achievements.json');
  list = list.filter(a => a.id !== +req.params.id);
  writeData('achievements.json', list);
  res.json({ ok: true });
});

// ── Contact Messages ────────────────────────────────────────
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'All fields required' });
  const list = readData('messages.json');
  const item = { id: nextId(list.length ? list : [{ id: 0 }]), name, email, message, date: new Date().toISOString(), read: false };
  list.unshift(item);
  writeData('messages.json', list);
  res.json({ ok: true });
});

app.get('/api/messages', auth, (req, res) => res.json(readData('messages.json')));

app.patch('/api/messages/:id/read', auth, (req, res) => {
  const list = readData('messages.json');
  const idx  = list.findIndex(m => m.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  list[idx].read = true;
  writeData('messages.json', list);
  res.json(list[idx]);
});

app.delete('/api/messages/:id', auth, (req, res) => {
  let list = readData('messages.json');
  list = list.filter(m => m.id !== +req.params.id);
  writeData('messages.json', list);
  res.json({ ok: true });
});

// ── Serve built frontend in production ──────────────────────
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (_, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));
}

app.listen(PORT, () => console.log(`\n  API  ➜  http://localhost:${PORT}\n`));
