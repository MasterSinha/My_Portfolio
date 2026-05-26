import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiPython, SiTensorflow, SiPytorch, SiScikitlearn, SiApachespark, SiApachekafka,
  SiDocker, SiGit, SiPandas, SiNumpy, SiMysql, SiPostgresql, SiFastapi, SiFlask,
  SiJupyter, SiUbuntu, SiHuggingface, SiApacheairflow,
} from 'react-icons/si';
import { AiOutlineDatabase } from 'react-icons/ai';

const fade = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };

const TECHS = [
  { icon: <SiPython />,       name: 'Python',       color: '#3b82f6' },
  { icon: <SiTensorflow />,   name: 'TensorFlow',   color: '#f97316' },
  { icon: <SiPytorch />,      name: 'PyTorch',      color: '#ef4444' },
  { icon: <SiScikitlearn />,  name: 'Scikit-learn', color: '#f59e0b' },
  { icon: <SiPandas />,       name: 'Pandas',       color: '#6366f1' },
  { icon: <SiNumpy />,        name: 'NumPy',        color: '#06b6d4' },
  { icon: <SiApachespark />,  name: 'Spark',        color: '#f97316' },
  { icon: <SiApachekafka />,  name: 'Kafka',        color: '#a855f7' },
  { icon: <SiDocker />,       name: 'Docker',       color: '#06b6d4' },
  { icon: <SiGit />,          name: 'Git',          color: '#ef4444' },
  { icon: <SiMysql />,        name: 'MySQL',        color: '#f97316' },
  { icon: <SiPostgresql />,   name: 'PostgreSQL',   color: '#3b82f6' },
  { icon: <SiFastapi />,      name: 'FastAPI',       color: '#22c55e' },
  { icon: <SiFlask />,        name: 'Flask',        color: '#e2e2e2' },
  { icon: <SiJupyter />,      name: 'Jupyter',      color: '#f97316' },
  { icon: <SiUbuntu />,       name: 'Linux',        color: '#f59e0b' },
  { icon: <SiHuggingface />,  name: 'HuggingFace',  color: '#f59e0b' },
  { icon: <AiOutlineDatabase />, name: 'Hadoop',    color: '#facc15' },
  { icon: <SiApacheairflow />, name: 'Airflow',     color: '#00aae4' },
  { icon: <AiOutlineDatabase />, name: 'Power BI',  color: '#f2c811' },
];

/* Fibonacci sphere — evenly distributes N points on unit sphere */
function fibonacciSphere(n) {
  const phi = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
  });
}

/* Rotate a point around X and Y axes */
function rotate(pt, rx, ry) {
  // rotate Y
  const cosY = Math.cos(ry), sinY = Math.sin(ry);
  const x1 = pt.x * cosY - pt.z * sinY;
  const z1 = pt.x * sinY + pt.z * cosY;
  // rotate X
  const cosX = Math.cos(rx), sinX = Math.sin(rx);
  const y2 = pt.y * cosX - z1 * sinX;
  const z2 = pt.y * sinX + z1 * cosX;
  return { x: x1, y: y2, z: z2 };
}

export default function TechStack() {
  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const RADIUS = Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.38;
    const CX = canvas.offsetWidth  / 2;
    const CY = canvas.offsetHeight / 2;

    const pts = fibonacciSphere(TECHS.length);

    let rx = 0.3, ry = 0;
    let dragActive = false;
    let lastX = 0, lastY = 0;
    let velX = 0, velY = 0.003;
    let animId;

    /* Pre-render each tech pill to an offscreen canvas */
    const pillCache = TECHS.map((t) => {
      const w = 110, h = 36;
      const off = document.createElement('canvas');
      off.width = w; off.height = h;
      const c = off.getContext('2d');

      // glass pill bg
      c.beginPath();
      c.roundRect(0, 0, w, h, 10);
      c.fillStyle = 'rgba(255,255,255,0.06)';
      c.fill();
      c.strokeStyle = 'rgba(255,255,255,0.1)';
      c.lineWidth = 1;
      c.stroke();

      // icon placeholder dot
      c.beginPath();
      c.arc(18, h / 2, 5, 0, Math.PI * 2);
      c.fillStyle = t.color;
      c.fill();

      // label
      c.fillStyle = '#e2e2e2';
      c.font = '500 11px Inter, sans-serif';
      c.textBaseline = 'middle';
      c.fillText(t.name, 30, h / 2);

      return { img: off, w, h };
    });

    const draw = () => {
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width  = W;
        canvas.height = H;
      }
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2, cy = H / 2;
      const r = Math.min(W, H) * 0.38;

      // compute rotated positions + sort by z (painter's algorithm)
      const items = pts.map((pt, i) => {
        const { x, y, z } = rotate(pt, rx, ry);
        return { x, y, z, i };
      }).sort((a, b) => a.z - b.z);

      items.forEach(({ x, y, z, i }) => {
        const sc = (z + 1.6) / 2.6;         // 0.23 … 1.0
        const alpha = 0.15 + sc * 0.85;
        const { img, w, h } = pillCache[i];
        const dw = w * sc * 0.9;
        const dh = h * sc * 0.9;
        const px = cx + x * r - dw / 2;
        const py = cy + y * r - dh / 2;

        ctx.globalAlpha = alpha;
        ctx.drawImage(img, px, py, dw, dh);
      });

      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (!dragActive) {
        ry += velY;
        rx += 0.0005;
      }
      draw();
      animId = requestAnimationFrame(loop);
    };

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    loop();

    /* Drag to rotate */
    const onDown = (e) => {
      dragActive = true;
      lastX = e.touches ? e.touches[0].clientX : e.clientX;
      lastY = e.touches ? e.touches[0].clientY : e.clientY;
      velX = 0; velY = 0;
    };
    const onMove = (e) => {
      if (!dragActive) return;
      const mx = e.touches ? e.touches[0].clientX : e.clientX;
      const my = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = mx - lastX, dy = my - lastY;
      ry += dx * 0.006;
      rx += dy * 0.006;
      velX = dy * 0.006;
      velY = dx * 0.006;
      lastX = mx; lastY = my;
    };
    const onUp = () => { dragActive = false; };

    canvas.addEventListener('mousedown',  onDown);
    canvas.addEventListener('mousemove',  onMove);
    canvas.addEventListener('mouseup',    onUp);
    canvas.addEventListener('mouseleave', onUp);
    canvas.addEventListener('touchstart', onDown, { passive: true });
    canvas.addEventListener('touchmove',  onMove, { passive: true });
    canvas.addEventListener('touchend',   onUp);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown',  onDown);
      canvas.removeEventListener('mousemove',  onMove);
      canvas.removeEventListener('mouseup',    onUp);
      canvas.removeEventListener('mouseleave', onUp);
      canvas.removeEventListener('touchstart', onDown);
      canvas.removeEventListener('touchmove',  onMove);
      canvas.removeEventListener('touchend',   onUp);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="relative py-28 bg-bg overflow-hidden" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={fade}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mb-12 text-center"
        >
          <span className="section-eyebrow">// tools of the trade</span>
          <h2 className="section-title">Technologies</h2>
          <p className="text-muted text-sm mt-3">Drag the sphere to explore</p>
        </motion.div>

        <motion.div
          variants={fade}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          transition={{ delay: 0.2 }}
          className="relative w-full mx-auto"
          style={{ height: '520px' }}
        >
          {/* Glow behind sphere */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 0 }}
          >
            <div style={{
              width: '380px', height: '380px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.06) 50%, transparent 70%)',
              filter: 'blur(40px)',
            }} />
          </div>

          {/* Sphere canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ cursor: 'grab', position: 'relative', zIndex: 1 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
