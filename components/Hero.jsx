"use client";
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stats = [
  { value: '10x', label: 'Faster Pipeline Processing' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '500M+', label: 'Data Rows Processed Daily' },
  { value: '40+', label: 'Enterprise Integrations' },
];

export default function Hero() {
  return (
    <header className={styles.hero} id="hero">
      {/* Floating orbs (decorative) */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className="container">
        <motion.div
          className={styles.content}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Label */}
          <motion.span variants={fadeUp} className="section-label">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
              <circle cx="4" cy="4" r="4" fill="#FFC801" />
            </svg>
            Next-Gen AI Platform
          </motion.span>

          {/* Headline */}
          <motion.h1 variants={fadeUp} className={styles.headline}>
            Automate Your Data.<br />
            <span className="gradient-text">Elevate Your&nbsp;AI.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p variants={fadeUp} className={styles.subline}>
            NexaFlow transforms raw, chaotic data into clean, model-ready intelligence—
            at enterprise scale. Build robust pipelines, deploy AI models, and watch
            your business operate at machine speed.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className={styles.actions}>
            <a href="#pricing" id="hero-cta-primary" className={styles.btnPrimary}>
              Start Building Free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#how-it-works" id="hero-cta-secondary" className={styles.btnSecondary}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Watch Demo
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.p variants={fadeUp} className={styles.trustLine}>
            No credit card required · SOC 2 Certified · GDPR Compliant
          </motion.p>
        </motion.div>

        {/* Stats row */}
        <motion.dl
          className={styles.statsRow}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
        >
          {stats.map((stat, i) => (
            <div className={styles.statItem} key={i}>
              <dt className={styles.statValue}>{stat.value}</dt>
              <dd className={styles.statLabel}>{stat.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        aria-hidden="true"
      >
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </motion.div>
    </header>
  );
}
