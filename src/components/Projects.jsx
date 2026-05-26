import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const fade = { hidden:{opacity:0,y:35}, show:{opacity:1,y:0,transition:{duration:0.7,ease:[0.22,1,0.36,1]}} };

const PROJECTS = [
  {
    num:'01', icon:'🧠', title:'Sentiment Analysis Engine',
    desc:'Real-time NLP pipeline classifying Twitter sentiment using fine-tuned BERT. Processes 10K+ tweets/min via FastAPI microservice backed by Redis caching.',
    tags:['Python','BERT','FastAPI','Redis','Docker'],
    github:'https://github.com/', live:'#',
  },
  {
    num:'02', icon:'📊', title:'Customer Churn Predictor',
    desc:'End-to-end ML system predicting telecom churn with 94% accuracy. Automated feature engineering, XGBoost ensembling, and Flask dashboard for business insights.',
    tags:['XGBoost','Scikit-learn','Pandas','Flask','Plotly'],
    github:'https://github.com/', live:'#',
  },
  {
    num:'03', icon:'⚡', title:'Real-Time Data Pipeline',
    desc:'Distributed streaming with Apache Spark Structured Streaming + Kafka ingesting and transforming 1M+ events/day with sub-second latency.',
    tags:['Spark','Kafka','Python','Hadoop','Airflow'],
    github:'https://github.com/', live:null,
  },
  {
    num:'04', icon:'🔬', title:'Medical Image Classifier',
    desc:'ResNet-50 transfer learning achieving 97% accuracy on chest X-ray pathology detection. Deployed as containerised web service with explainability via Grad-CAM.',
    tags:['TensorFlow','Keras','OpenCV','Docker','GradCAM'],
    github:'https://github.com/', live:'#',
  },
  {
    num:'05', icon:'📈', title:'Stock Price Forecasting',
    desc:'LSTM + Transformer hybrid model forecasting equity prices using 10 years of OHLCV data enriched with news sentiment scores. Backtested on 50+ tickers.',
    tags:['PyTorch','LSTM','Transformers','yfinance','Plotly'],
    github:'https://github.com/', live:null,
  },
  {
    num:'06', icon:'🗂️', title:'ML Feature Store',
    desc:'Lightweight feature store on Apache Hudi + Delta Lake enabling point-in-time feature retrieval for training and inference, eliminating training-serving skew.',
    tags:['Apache Hudi','Delta Lake','Spark','Python','AWS S3'],
    github:'https://github.com/', live:null,
  },
];

function TiltCard({ children }) {
  const ref = useRef(null);

  const onEnter = () => {
    if (ref.current) ref.current.style.transition = 'border-color 0.3s ease, box-shadow 0.3s ease';
  };

  const onMove = (e) => {
    const el   = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
    const y    = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    el.style.transform  = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateZ(8px)`;
    el.style.transition = 'none';
    const glow = el.querySelector('.project-glow');
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(0,255,136,0.11) 0%, transparent 65%)`;
      glow.style.opacity    = '1';
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform  = '';
    el.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, box-shadow 0.3s ease';
    const glow = el.querySelector('.project-glow');
    if (glow) glow.style.opacity = '0';
  };

  return (
    <div
      ref={ref}
      className="project-card"
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="project-glow" />
      <div className="project-card-inner">{children}</div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="section section-alt" id="projects">
      <div className="container">
        <motion.div className="section-header" variants={fade} initial="hidden" whileInView="show" viewport={{once:true}}>
          <span className="section-eyebrow">// what i've built</span>
          <h2 className="section-title">Projects</h2>
        </motion.div>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.num}
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{once:true}}
              transition={{delay: i * 0.07}}
            >
              <TiltCard>
                <div className="project-num">// {p.num}</div>
                <div className="project-icon">{p.icon}</div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map(t => <span key={t} className="p-tag">{t}</span>)}
                </div>
                <div className="project-links">
                  <a href={p.github} target="_blank" rel="noreferrer" className="p-link">
                    <FiGithub /> GitHub
                  </a>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="p-link">
                      <FiExternalLink /> Live Demo
                    </a>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
