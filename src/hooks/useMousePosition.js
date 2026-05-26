import { useState, useEffect } from 'react';

export default function useMousePosition() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    let raf;
    const handle = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener('mousemove', handle);
    return () => { window.removeEventListener('mousemove', handle); cancelAnimationFrame(raf); };
  }, []);

  return pos;
}
