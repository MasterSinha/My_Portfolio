import { useEffect, useRef } from 'react';

const CHARS = 'アイウエオカキクケコ01234ABCDEF#@$%&*ツテトナニ';

export default function MatrixCanvas({ opacity = 0.2 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx    = canvas.getContext('2d');
    let   rafId;

    const setup = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setup();

    const SZ = 14;
    let drops = [];
    const initDrops = () => {
      const cols = Math.floor(canvas.width / SZ);
      drops = Array.from({ length: cols }, () => -Math.floor(Math.random() * 50));
    };
    initDrops();

    window.addEventListener('resize', () => { setup(); initDrops(); });

    const draw = () => {
      ctx.fillStyle = 'rgba(9,9,15,0.065)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${SZ}px monospace`;

      drops.forEach((y, i) => {
        if (y > 0) {
          const ch     = CHARS[Math.floor(Math.random() * CHARS.length)];
          const bright = Math.random() > 0.93;
          ctx.fillStyle = bright
            ? 'rgba(180,255,220,0.85)'
            : 'rgba(0,255,136,0.42)';
          ctx.fillText(ch, i * SZ, y * SZ);
        }

        drops[i] += 0.5;
        if (drops[i] * SZ > canvas.height && Math.random() > 0.975) {
          drops[i] = -Math.floor(Math.random() * 30);
        }
      });

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        opacity,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
