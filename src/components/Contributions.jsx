import { motion } from 'framer-motion';
import { FiGithub } from 'react-icons/fi';

const fade = { hidden: { opacity: 0, y: 35 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } } };

const CONTRIBS = [
  {
    project: 'Open Source · Apache Spark',
    title: 'PySpark ML Pipeline Optimisation',
    desc: 'Contributed patches to the PySpark MLlib module improving gradient boosting cross-validation speed by 22% through vectorised operations and caching improvements.',
    metrics: [
      { val: '8',   lbl: 'PRs Merged' },
      { val: '22%', lbl: 'Speed Gain' },
    ],
    link: 'https://github.com/',
  },
  {
    project: 'Live Product · E-Commerce Platform',
    title: 'Real-Time Recommendation Engine',
    desc: 'Integrated a collaborative-filtering recommender into a production e-commerce platform used by 50K+ daily active users. Increased average order value by 12%.',
    metrics: [
      { val: '50K+', lbl: 'DAU Impact' },
      { val: '+12%', lbl: 'AOV Lift' },
    ],
    link: '#',
  },
  {
    project: 'Open Source · Hugging Face',
    title: 'Custom Tokeniser for Indic Languages',
    desc: 'Built and published a SentencePiece tokeniser supporting Hindi, Marathi, and Bengali for transformer fine-tuning. Used by 200+ developers on Hugging Face Hub.',
    metrics: [
      { val: '200+', lbl: 'Downloads/mo' },
      { val: '3',    lbl: 'Languages' },
    ],
    link: 'https://github.com/',
  },
  {
    project: 'Live Product · FinTech Startup',
    title: 'Fraud Detection ML Service',
    desc: 'Deployed a real-time anomaly detection API (FastAPI + LightGBM) now protecting 2M+ transactions/month. Reduced false-positive rate from 4.2% to 0.8%.',
    metrics: [
      { val: '2M+',  lbl: 'Txns/Month' },
      { val: '0.8%', lbl: 'FP Rate' },
    ],
    link: '#',
  },
  {
    project: 'Open Source · MLflow',
    title: 'Auto-Logging Plugin for Keras',
    desc: 'Authored an MLflow auto-logging extension for Keras training runs capturing per-epoch metrics, hyperparameters, and model artefacts with zero boilerplate.',
    metrics: [
      { val: '500+', lbl: 'GitHub Stars' },
      { val: '15',   lbl: 'Forks' },
    ],
    link: 'https://github.com/',
  },
  {
    project: 'Live Product · Healthcare',
    title: 'Patient Readmission Predictor',
    desc: 'Collaborated on a clinical-grade 30-day readmission risk model using EHR data. Model is live in a hospital system supporting discharge planning for 3 wards.',
    metrics: [
      { val: '91%', lbl: 'AUC-ROC' },
      { val: '3',   lbl: 'Wards Live' },
    ],
    link: '#',
  },
];

export default function Contributions() {
  return (
    <section className="section section-alt" id="contributions">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <span className="section-eyebrow">// real-world impact</span>
          <h2 className="section-title">Live Contributions</h2>
        </motion.div>

        <p className="contrib-intro">
          Beyond personal projects — contributions to open-source ecosystems and
          production systems that run at scale and create tangible impact.
        </p>

        <div className="contrib-grid">
          {CONTRIBS.map((c, i) => (
            <motion.div
              key={i}
              className="contrib-card"
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <div className="contrib-proj">{c.project}</div>
              <div className="contrib-title">{c.title}</div>
              <p className="contrib-desc">{c.desc}</p>
              <div className="contrib-metrics">
                {c.metrics.map(m => (
                  <div key={m.lbl}>
                    <span className="m-val">{m.val}</span>
                    <span className="m-lbl">{m.lbl}</span>
                  </div>
                ))}
                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className="p-link"
                  style={{ marginLeft: 'auto', alignSelf: 'flex-end' }}
                >
                  <FiGithub />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
