import { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

export default function AdminApp() {
  const [authed, setAuthed] = useState(!!localStorage.getItem('adminToken'));

  const onLogin = (token) => {
    localStorage.setItem('adminToken', token);
    setAuthed(true);
  };
  const onLogout = () => {
    localStorage.removeItem('adminToken');
    setAuthed(false);
  };

  return authed ? <Dashboard onLogout={onLogout} /> : <Login onLogin={onLogin} />;
}
