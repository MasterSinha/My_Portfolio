import { useRef } from 'react';

export default function MagneticButton({ children, className, style, href, onClick, strength = 0.35, ...rest }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el   = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x    = (e.clientX - rect.left - rect.width  / 2) * strength;
    const y    = (e.clientY - rect.top  - rect.height / 2) * strength;
    el.style.transform  = `translate(${x}px, ${y}px)`;
    el.style.transition = 'transform 0.1s ease';
  };

  const onLeave = () => {
    if (ref.current) {
      ref.current.style.transform  = 'translate(0,0)';
      ref.current.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
    }
  };

  const Tag = href ? 'a' : 'button';

  return (
    <Tag ref={ref} className={className} style={style} href={href} onClick={onClick}
      onMouseMove={onMove} onMouseLeave={onLeave} {...rest}>
      {children}
    </Tag>
  );
}
