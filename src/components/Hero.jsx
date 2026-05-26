import { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaKaggle } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { FiArrowRight } from 'react-icons/fi';
import MatrixCanvas  from './MatrixCanvas';
import ParticleCanvas from './ParticleCanvas';
import useTypewriter from '../hooks/useTypewriter';

const ROLES = ['Data Scientist', 'ML Engineer', 'Big Data Analyst', 'AI/ML Developer'];

export default function Hero() {
  const [imgErr, setImgErr] = useState(false);
  const typed = useTypewriter(ROLES);

  return (
    <section className="hero" id="home">

      {/* ── subtle backgrounds ── */}
      <MatrixCanvas opacity={0.14} />
      <ParticleCanvas />

      {/* ── full-bleed photo (right side) ── */}
      <div className="hero-photo-side">
        {!imgErr ? (
          <img
            src="/photo1.jpg"
            alt="Ayush Sinha"
            className="hero-photo-full"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="hero-photo-fallback-full">AS</div>
        )}
        {/* gradient that fades photo into the dark left */}
        <div className="hero-photo-gradient" />
      </div>

      {/* ── diagonal neon slash ── */}
      <div className="hero-slash" />

      {/* ── left-side text ── */}
      <div className="container hero-inner">
        <div className="hero-content">

          {/* eyebrow "— DATA SCIENTIST &amp; ML ENGINEER" */}
          <div className="hero-eyebrow">
            <span className="eyebrow-dash" />
            DATA SCIENTIST &amp; ML ENGINEER
          </div>

          {/* big bold name */}
          <h1 className="hero-name">
            AYUSH<br />
            <span className="hl">SINHA</span>
          </h1>

          {/* typewriter subtitle */}
          <div className="hero-role">
            &lt;&nbsp;<span className="typed">{typed}</span>
            <span className="cursor-blink">|</span>&nbsp;/&gt;
          </div>

          <p className="hero-desc">
            Turning raw data into intelligent systems.&nbsp;
            Machine Learning · Big Data · AI/ML Engineering.
          </p>

          {/* CTAs */}
          <div className="hero-btns">
            <a href="#projects" className="btn-hp">
              View Projects <FiArrowRight />
            </a>
            <a href="#contact" className="btn-hg">
              Get In Touch
            </a>
          </div>

          {/* socials */}
          <div className="hero-socials">
            {[
              { icon: <FaGithub />,   href: 'https://github.com/',           label:'GitHub'   },
              { icon: <FaLinkedin />, href: 'https://linkedin.com/in/',      label:'LinkedIn' },
              { icon: <FaTwitter />,  href: 'https://twitter.com/',          label:'Twitter'  },
              { icon: <FaKaggle />,   href: 'https://kaggle.com/',           label:'Kaggle'   },
              { icon: <HiMail />,     href: 'mailto:sinhayush505@gmail.com', label:'Email'    },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                 className="hero-social" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>

          {/* inline stats */}
          <div className="hero-stats">
            <div className="hs-item">
              <span className="hs-n">20+</span>
              <span className="hs-l">Projects</span>
            </div>
            <div className="hs-sep" />
            <div className="hs-item">
              <span className="hs-n">12+</span>
              <span className="hs-l">Technologies</span>
            </div>
            <div className="hs-sep" />
            <div className="hs-item">
              <span className="hs-n">3+</span>
              <span className="hs-l">Years Exp.</span>
            </div>
          </div>

        </div>
      </div>

      <div className="scroll-hint">
        <div className="scroll-line" />
        <span>SCROLL</span>
      </div>
    </section>
  );
}
