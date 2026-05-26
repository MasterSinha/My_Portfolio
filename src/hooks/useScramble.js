import { useState, useEffect } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%!?<>{}[]|~';

export default function useScramble(original, trigger = true, speed = 28) {
  const [text, setText] = useState(original);

  useEffect(() => {
    if (!trigger) { setText(original); return; }

    let i = 0;
    let raf;

    const tick = () => {
      setText(
        original
          .split('')
          .map((ch, idx) => {
            if (ch === ' ') return ' ';
            return idx < i
              ? ch
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );
      i += 0.45;
      if (i <= original.length + 4) {
        raf = setTimeout(() => requestAnimationFrame(tick), speed);
      } else {
        setText(original);
      }
    };

    tick();
    return () => clearTimeout(raf);
  }, [original, trigger, speed]);

  return text;
}
