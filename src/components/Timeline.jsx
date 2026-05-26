import { motion } from 'framer-motion';

const fadeLeft  = { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } } };
const fadeRight = { hidden: { opacity: 0, x: 40 },  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } } };
const fadeUp    = { hidden: { opacity: 0, y: 30 },   show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } } };

const ITEMS = [
  {
    date: '2022 — Present',
    type: 'EDUCATION',
    title: 'B.Tech in Computer Science & Engineering',
    org: 'Your University, India',
    desc: 'Specialisation in Data Science & Artificial Intelligence. Relevant coursework: Machine Learning, Deep Learning, Big Data Systems, Statistical Computing, NLP.',
  },
  {
    date: 'Jun 2024 — Sep 2024',
    type: 'INTERNSHIP',
    title: 'Data Science Intern',
    org: 'TechCorp Analytics Pvt. Ltd.',
    desc: 'Built automated ETL pipelines in PySpark reducing daily data processing time by 40%. Deployed a customer segmentation model that improved targeted campaign ROI by 18%.',
  },
  {
    date: 'Jan 2024 — May 2024',
    type: 'PROJECT',
    title: 'ML Research Project',
    org: 'University AI Lab',
    desc: 'Designed a transformer-based anomaly detection system for network intrusion data achieving 96% F1-score. Presented findings at the departmental research symposium.',
  },
  {
    date: 'Jul 2023 — Dec 2023',
    type: 'INTERNSHIP',
    title: 'Data Analyst Intern',
    org: 'StartupXYZ',
    desc: 'Developed interactive Power BI dashboards for real-time sales monitoring. Automated weekly reporting pipelines using Python + SQL, saving 8+ hours/week.',
  },
  {
    date: '2023',
    type: 'CERTIFICATION',
    title: 'Google Professional Data Engineer',
    org: 'Google Cloud',
    desc: 'Certified in designing, building, and operationalising data processing systems on Google Cloud Platform including BigQuery, Dataflow, and Vertex AI.',
  },
];

export default function Timeline() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <span className="section-eyebrow">// my journey</span>
          <h2 className="section-title">Experience</h2>
        </motion.div>

        <div className="timeline-wrap">
          <div className="tl-line" />

          {ITEMS.map((item, i) => {
            const isOdd  = i % 2 === 0;
            const card = (
              <div className="tl-card">
                <span className="tl-tag">{item.type}</span>
                <div className="tl-date">{item.date}</div>
                <div className="tl-title">{item.title}</div>
                <div className="tl-org">{item.org}</div>
                <div className="tl-desc">{item.desc}</div>
              </div>
            );

            return (
              <div key={i} className="tl-item">
                <motion.div
                  className="tl-left"
                  variants={fadeLeft}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  {isOdd && card}
                </motion.div>

                <div className="tl-dot">
                  <div className="tl-dot-circle" />
                </div>

                <motion.div
                  className="tl-right"
                  variants={fadeRight}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  {!isOdd && card}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
