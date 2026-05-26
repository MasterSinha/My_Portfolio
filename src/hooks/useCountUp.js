import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function useCountUp(target, { duration = 1800, delay = 0 } = {}) {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(String(target).replace(/\D/g, '')) || 0;
    if (!num) return;
    let raf;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts + delay;
      if (ts < start) { raf = requestAnimationFrame(step); return; }
      const elapsed  = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, delay]);

  return { count, ref };
}
