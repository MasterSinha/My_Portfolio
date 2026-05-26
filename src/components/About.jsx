import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import useCounter from '../hooks/useCounter';

const fadeLeft  = { hidden:{opacity:0,x:-45}, show:{opacity:1,x:0,transition:{duration:0.8,ease:[0.22,1,0.36,1]}} };
const fadeRight = { hidden:{opacity:0,x:45},  show:{opacity:1,x:0,transition:{duration:0.8,ease:[0.22,1,0.36,1]}} };
const fade      = { hidden:{opacity:0,y:30},   show:{opacity:1,y:0,transition:{duration:0.7,ease:[0.22,1,0.36,1]}} };

function StatItem({ to, suffix = '+', label }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const val = useCounter(to, 1600, inView);
  return (
    <div className="stat" ref={ref}>
      <span className="stat-n">{val}{suffix}</span>
      <span className="stat-l">{label}</span>
    </div>
  );
}

export default function About() {
  return (
    <section className="section section-alt" id="about">
      <div className="container">
        <motion.div className="section-header" variants={fade} initial="hidden" whileInView="show" viewport={{once:true}}>
          <span className="section-eyebrow">// who am i</span>
          <h2 className="section-title">About Me</h2>
        </motion.div>

        <div className="about-grid">
          {/* Terminal block */}
          <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{once:true}}>
            <div className="about-terminal">
              <div className="terminal-bar">
                <span className="t-dot red"  />
                <span className="t-dot yel"  />
                <span className="t-dot grn"  />
              </div>
              <div className="terminal-body">
                <div><span className="t-prompt">~$&nbsp;</span><span className="t-cmd">whoami</span></div>
                <div><span className="t-output">ayush_sinha</span></div>
                <div style={{marginTop:'8px'}}><span className="t-prompt">~$&nbsp;</span><span className="t-cmd">cat profile.json</span></div>
                <div style={{color:'var(--border)'}}>{'{'}</div>
                <div>&nbsp;&nbsp;<span className="t-val">"role"</span>:&nbsp;<span className="t-output">"Data Scientist &amp; ML Eng"</span>,</div>
                <div>&nbsp;&nbsp;<span className="t-val">"stack"</span>:&nbsp;<span className="t-output">["Python","TF","Spark"]</span>,</div>
                <div>&nbsp;&nbsp;<span className="t-val">"focus"</span>:&nbsp;<span className="t-output">"ML + Big Data"</span>,</div>
                <div>&nbsp;&nbsp;<span className="t-val">"status"</span>:&nbsp;<span className="t-output">"OPEN_TO_WORK"</span></div>
                <div style={{color:'var(--border)'}}>{'}'}</div>
                <div style={{marginTop:'8px'}}><span className="t-prompt">~$&nbsp;</span><span className="t-cursor"/></div>
              </div>
              <div className="terminal-scanline" />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{once:true}}>
            <p className="about-eyebrow">// data · ml · big data</p>
            <h3 className="about-heading">
              Turning Data Into<br />Intelligent Solutions
            </h3>
            <p className="about-bio">
              I'm a Data Scientist and ML Engineer with a passion for transforming raw data
              into intelligent, actionable systems. With hands-on experience across machine
              learning, deep learning, and distributed computing, I build end-to-end pipelines
              and AI models that drive measurable real-world impact.
              <br /><br />
              Currently exploring the frontiers of big data analytics, MLOps, and scalable
              model deployment — bridging the gap between research and production.
            </p>

            <div className="about-stats">
              <StatItem to={20}  label="Projects"    />
              <StatItem to={12}  label="Technologies" />
              <StatItem to={3}   label="Years Exp."   />
            </div>

            <a href="/resume.pdf" className="btn btn-green" download>
              Download Resume
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
