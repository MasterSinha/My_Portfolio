import { motion } from 'framer-motion';
import { SiPython, SiTensorflow, SiApachespark } from 'react-icons/si';
import { AiOutlineDatabase } from 'react-icons/ai';

const fade    = { hidden:{opacity:0,y:35}, show:{opacity:1,y:0,transition:{duration:0.7,ease:[0.22,1,0.36,1]}} };

const CATEGORIES = [
  {
    icon: <SiPython />,
    title: 'Programming Languages',
    skills: [
      { name:'Python',  pct:93 },
      { name:'SQL',     pct:86 },
      { name:'R',       pct:72 },
      { name:'Scala',   pct:62 },
    ],
  },
  {
    icon: <SiTensorflow />,
    title: 'ML / Deep Learning',
    skills: [
      { name:'Scikit-learn', pct:92 },
      { name:'TensorFlow',   pct:88 },
      { name:'PyTorch',      pct:83 },
      { name:'Keras',        pct:85 },
    ],
  },
  {
    icon: <SiApachespark />,
    title: 'Big Data & Engineering',
    skills: [
      { name:'Apache Spark', pct:80 },
      { name:'Kafka',        pct:73 },
      { name:'Hadoop',       pct:67 },
      { name:'Airflow',      pct:74 },
    ],
  },
  {
    icon: <AiOutlineDatabase />,
    title: 'Data & Visualisation',
    skills: [
      { name:'Pandas / NumPy', pct:96 },
      { name:'Matplotlib',     pct:88 },
      { name:'Power BI',       pct:79 },
      { name:'Docker / Git',   pct:82 },
    ],
  },
];

function SkillBox({ cat, delay }) {
  return (
    <motion.div
      className="skill-box"
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{once:true}}
      transition={{delay}}
    >
      <div className="skill-box-title">
        <span style={{fontSize:'1rem',color:'var(--green)'}}>{cat.icon}</span>
        {cat.title}
      </div>

      {cat.skills.map((s, si) => (
        <div key={s.name} className="skill-row">
          <div className="skill-meta">
            <span className="skill-nm">{s.name}</span>
            <span className="skill-pct">{s.pct}%</span>
          </div>
          <div className="bar-bg">
            <motion.div
              className="bar-fill"
              initial={{ width: 0 }}
              whileInView={{ width: `${s.pct}%` }}
              viewport={{once:true}}
              transition={{ duration: 1.3, ease:[0.22,1,0.36,1], delay: delay + si * 0.08 }}
            />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <motion.div className="section-header" variants={fade} initial="hidden" whileInView="show" viewport={{once:true}}>
          <span className="section-eyebrow">// what i know</span>
          <h2 className="section-title">Tech Stack</h2>
        </motion.div>

        <div className="skills-grid">
          {CATEGORIES.map((cat, i) => (
            <SkillBox key={cat.title} cat={cat} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
