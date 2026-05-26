import { useState, useEffect, useCallback } from 'react';

export function useApi(endpoint, fallback = null, refetchInterval = 10000) {
  const [data,    setData]    = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetchData = useCallback((isInitial = false) => {
    if (isInitial) setLoading(true);
    fetch(endpoint)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(d  => { setData(d); setLoading(false); })
      .catch(e => { setError(e); setLoading(false); });
  }, [endpoint]);

  useEffect(() => {
    fetchData(true);
    if (!refetchInterval) return;
    const id = setInterval(() => fetchData(false), refetchInterval);
    return () => clearInterval(id);
  }, [fetchData, refetchInterval]);

  return { data, loading, error };
}

/* Authenticated mutation helpers */
const token = () => localStorage.getItem('adminToken') || '';

export const api = {
  get:    (url)        => fetch(url).then(r => r.json()),
  put:    (url, body)  => fetch(url, { method: 'PUT',    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` }, body: JSON.stringify(body) }).then(r => r.json()),
  post:   (url, body)  => fetch(url, { method: 'POST',   headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` }, body: JSON.stringify(body) }).then(r => r.json()),
  delete: (url)        => fetch(url, { method: 'DELETE', headers: { Authorization: `Bearer ${token()}` } }).then(r => r.json()),
};
