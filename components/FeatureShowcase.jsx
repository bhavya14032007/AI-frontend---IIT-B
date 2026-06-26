"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FeatureShowcase.module.css';

const features = [
  {
    id: 'f1',
    icon: '⚡',
    tag: 'Automation',
    title: 'Data Pipeline Automation',
    description: 'Define once, run forever. NexaFlow automatically maps schemas, normalizes incoming streams, and handles schema drift without a single line of code.',
    detail: 'Supports 200+ data connectors, real-time and batch modes, intelligent retry logic, and full audit trails. Build production-grade pipelines in minutes, not months.',
    highlight: true,
  },
  {
    id: 'f2',
    icon: '🧠',
    tag: 'Intelligence',
    title: 'AI Model Training Hub',
    description: 'Clean data flows directly into your model training environment. Fine-tune LLMs, manage datasets, and track experiments from a single dashboard.',
    detail: 'Integrates with Hugging Face, OpenAI fine-tuning, and custom training infrastructure. Version-controlled datasets with lineage tracking.',
  },
  {
    id: 'f3',
    icon: '📊',
    tag: 'Analytics',
    title: 'Real-time Analytics Engine',
    description: 'Sub-second query latency on billion-row datasets. Instant insights delivered through our hyper-optimized streaming engine.',
    detail: 'Powered by Apache Flink and our proprietary columnar store. Live dashboards, alerting, and embeddable charts with no additional infrastructure.',
  },
  {
    id: 'f4',
    icon: '🔒',
    tag: 'Security',
    title: 'Secure Enclaves & Governance',
    description: 'Enterprise-grade security with end-to-end encryption, row-level access controls, and fully auditable data lineage.',
    detail: 'SOC 2 Type II certified. GDPR, HIPAA, and CCPA compliant out-of-the-box. Data never leaves your configured cloud region.',
  },
  {
    id: 'f5',
    icon: '🔗',
    tag: 'Integration',
    title: '200+ Native Integrations',
    description: 'Connect to Snowflake, BigQuery, Kafka, S3, and 196 more data sources without writing ETL scripts.',
    detail: 'Webhook support, REST & GraphQL APIs, and event-driven triggers. Build custom connectors in under 30 minutes using our SDK.',
  },
  {
    id: 'f6',
    icon: '🚀',
    tag: 'Scale',
    title: 'Elastic Horizontal Scaling',
    description: 'Scale from prototype to petabyte seamlessly. Your pipelines auto-scale with demand — you only pay for what you use.',
    detail: 'Multi-region deployments, zero-downtime migrations, and automatic capacity management. Start at zero and scale to millions of events per second.',
  },
];

export default function FeatureShowcase() {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('nexaflow-active-feature');
    if (saved) setActiveId(saved);
  }, []);

  const toggle = (id) => {
    const next = activeId === id ? null : id;
    setActiveId(next);
    if (next) localStorage.setItem('nexaflow-active-feature', next);
    else localStorage.removeItem('nexaflow-active-feature');
  };

  return (
    <section className={styles.section} id="features" aria-labelledby="features-heading">
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className="section-label">Core Capabilities</span>
          <h2 id="features-heading" className={styles.heading}>
            Everything you need to build<br />
            <span className="gradient-text">AI-ready data infrastructure</span>
          </h2>
          <p className={styles.subheading}>
            Stop stitching together fragile point solutions. NexaFlow gives you
            a unified platform that handles every stage of the data-to-AI journey.
          </p>
        </div>

        {/* Bento Grid (desktop) / Accordion (mobile) */}
        <div className={styles.bentoGrid} role="list">
          {features.map((feat, i) => (
            <motion.div
              key={feat.id}
              className={`${styles.bentoItem} ${feat.highlight ? styles.highlight : ''} ${activeId === feat.id ? styles.active : ''}`}
              role="listitem"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.175, ease: 'easeOut' } }}
            >
              {/* Accordion button (mobile) */}
              <button
                className={styles.itemHeader}
                onClick={() => toggle(feat.id)}
                aria-expanded={activeId === feat.id}
                id={`feature-btn-${feat.id}`}
                aria-controls={`feature-panel-${feat.id}`}
              >
                <span className={styles.iconWrap} aria-hidden="true">{feat.icon}</span>
                <div className={styles.itemMeta}>
                  <span className={styles.itemTag}>{feat.tag}</span>
                  <h3 className={styles.itemTitle}>{feat.title}</h3>
                </div>
                <span className={styles.chevron} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </span>
              </button>

              {/* Content panel */}
              <div
                className={styles.itemBody}
                id={`feature-panel-${feat.id}`}
                role="region"
                aria-labelledby={`feature-btn-${feat.id}`}
              >
                <p className={styles.itemDesc}>{feat.description}</p>
                <AnimatePresence>
                  {activeId === feat.id && (
                    <motion.p
                      className={styles.itemDetail}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      {feat.detail}
                    </motion.p>
                  )}
                </AnimatePresence>
                <button
                  className={styles.learnMore}
                  onClick={() => toggle(feat.id)}
                  aria-label={`${activeId === feat.id ? 'Collapse' : 'Expand'} ${feat.title}`}
                >
                  {activeId === feat.id ? 'Show less ↑' : 'Learn more →'}
                </button>
              </div>

              {feat.highlight && <div className={styles.glowBorder} aria-hidden="true" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
