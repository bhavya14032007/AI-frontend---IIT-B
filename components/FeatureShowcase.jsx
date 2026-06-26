"use client";

import { useState, useEffect } from 'react';
import styles from './FeatureShowcase.module.css';

const features = [
  { id: 'f1', title: 'Data Pipeline Automation', content: 'Automatically map schemas and normalize incoming streams.' },
  { id: 'f2', title: 'AI Model Training', content: 'Use clean data to fine-tune your bespoke LLMs effortlessly.' },
  { id: 'f3', title: 'Real-time Analytics', content: 'Instant insights delivered through our optimized engine.' },
  { id: 'f4', title: 'Secure Enclaves', content: 'Enterprise-grade security with end-to-end encryption.' },
];

export default function FeatureShowcase() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('activeAccordion');
    if (saved) setActiveAccordion(saved);
  }, []);

  const toggleAccordion = (id) => {
    const nextState = activeAccordion === id ? null : id;
    setActiveAccordion(nextState);
    localStorage.setItem('activeAccordion', nextState);
  };

  return (
    <section className={styles.featureSection}>
      <div className="container">
        <h2 className="font-heading">Powerful Automation</h2>
        <div className={styles.bentoGrid}>
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className={`${styles.bentoItem} ${activeAccordion === feature.id ? styles.active : ''}`}
            >
              <button 
                className={styles.accordionHeader} 
                onClick={() => toggleAccordion(feature.id)}
                aria-expanded={activeAccordion === feature.id}
              >
                <h3>{feature.title}</h3>
                <span className={styles.icon}>{activeAccordion === feature.id ? '-' : '+'}</span>
              </button>
              <div className={styles.accordionContent}>
                <p>{feature.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
