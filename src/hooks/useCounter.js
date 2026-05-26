import { useState, useEffect } from 'react';

export default function useCounter(to, duration = 1600, trigger = true) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = null;

    const step = (ts) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      setVal(Math.round(ease * to));
      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [to, duration, trigger]);

  return val;
}
