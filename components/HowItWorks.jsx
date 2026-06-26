"use client";

import { motion } from 'framer-motion';
import styles from './HowItWorks.module.css';

const steps = [
  {
    step: '01',
    icon: '/assets/link.svg',
    title: 'Connect Your Sources',
    description: 'Link any database, API, cloud storage, or streaming service in minutes using our visual connector library. No code required.',
  },
  {
    step: '02',
    icon: '/assets/cog-8-tooth.svg',
    title: 'Define Your Pipeline',
    description: 'Use our drag-and-drop pipeline builder to define transformations, validations, and enrichment rules. AI-assisted schema mapping handles the hard parts.',
  },
  {
    step: '03',
    icon: '/assets/arrow-path.svg',
    title: 'Automate & Monitor',
    description: 'Deploy your pipeline with one click. NexaFlow handles scheduling, retries, and alerting automatically. Monitor everything from a live dashboard.',
  },
  {
    step: '04',
    icon: '/assets/chart-pie.svg',
    title: 'Analyze & Activate',
    description: 'Query your clean data in real time, feed it to your AI models, or push it downstream to any destination. Your data. Your way.',
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works" aria-labelledby="how-it-works-heading">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Process</span>
          <h2 id="how-it-works-heading" className={styles.heading}>
            From raw data to AI-ready<br />
            <span className="gradient-text">in four steps</span>
          </h2>
        </div>

        <div className={styles.stepsGrid}>
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              className={styles.stepCard}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className={styles.connector} aria-hidden="true" />
              )}

              <div className={styles.stepNumber} aria-hidden="true">{step.step}</div>
              <div className={styles.iconWrap} aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={step.icon} alt="" width={28} height={28} className={styles.icon} />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Terminal demo block */}
        <motion.div
          className={styles.terminalWrap}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.terminalBar} aria-hidden="true">
            <span className={styles.dot} style={{ background: '#ff5f57' }} />
            <span className={styles.dot} style={{ background: '#febc2e' }} />
            <span className={styles.dot} style={{ background: '#28c840' }} />
            <span className={styles.terminalTitle}>nexaflow_pipeline.yml</span>
          </div>
          <pre className={styles.terminalCode} role="img" aria-label="Example NexaFlow pipeline configuration">
{`pipeline:
  name: customer-360-etl
  source:
    type: postgres
    host: prod-db.company.com
    tables: [users, orders, events]
  
  transforms:
    - normalize: schema_v2
    - deduplicate: by [user_id, timestamp]
    - enrich: geo_from_ip
    - filter: "event_type != 'bot'"
  
  destination:
    type: snowflake
    warehouse: analytics-wh
    database: ML_READY
  
  schedule: "*/15 * * * *"    # Every 15 min
  alerts:
    - on: failure
      notify: [slack, pagerduty]`}
          </pre>
        </motion.div>
      </div>
    </section>
  );
}
