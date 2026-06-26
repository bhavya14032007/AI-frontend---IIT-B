"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './SocialProof.module.css';

const partners = [
  { name: 'Stripe', abbr: 'STRP' },
  { name: 'Anthropic', abbr: 'ANTH' },
  { name: 'Vercel', abbr: 'VRCL' },
  { name: 'DataBricks', abbr: 'DBRK' },
  { name: 'Snowflake', abbr: 'SNFL' },
  { name: 'Confluent', abbr: 'CNFL' },
];

const testimonials = [
  {
    quote: "NexaFlow cut our model training time by 73%. The automated pipeline builder is shockingly intuitive.",
    author: "Priya Sharma",
    role: "VP of Engineering, Stripe",
    avatar: "PS",
  },
  {
    quote: "We replaced 3 data tools with NexaFlow in a weekend. The ROI was clear within the first month.",
    author: "Marcus Chen",
    role: "CTO, DataBricks",
    avatar: "MC",
  },
  {
    quote: "The real-time analytics engine alone justifies the entire platform investment. Absolutely best-in-class.",
    author: "Aisha Okonkwo",
    role: "Head of Data Science, Snowflake",
    avatar: "AO",
  },
];

export default function SocialProof() {
  return (
    <section className={styles.section} id="testimonials" aria-labelledby="social-proof-heading">
      <div className="container">
        {/* Partner logos */}
        <p className={styles.trustLabel}>Trusted by world-class engineering teams</p>
        <div className={styles.logoGrid} role="list" aria-label="Partner companies">
          {partners.map(p => (
            <div key={p.name} className={styles.logoItem} role="listitem">
              <span className={styles.logoAbbr} aria-hidden="true">{p.abbr}</span>
              <span className={styles.logoName}>{p.name}</span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <h2 id="social-proof-heading" className={styles.heading}>
          Loved by <span className="gradient-text">5,000+ teams</span>
        </h2>

        <div className={styles.testimonialGrid}>
          {testimonials.map((t, i) => (
            <motion.article
              key={i}
              className={`${styles.card} glass`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.175, ease: 'easeOut' } }}
            >
              <div className={styles.stars} aria-label="5 stars">{'★'.repeat(5)}</div>
              <blockquote className={styles.quote}>&ldquo;{t.quote}&rdquo;</blockquote>
              <footer className={styles.cardFooter}>
                <div className={styles.avatar} aria-hidden="true">{t.avatar}</div>
                <div>
                  <p className={styles.author}>{t.author}</p>
                  <p className={styles.role}>{t.role}</p>
                </div>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
