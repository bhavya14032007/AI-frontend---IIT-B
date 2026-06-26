"use client";

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PricingMatrix.module.css';

const currencies = {
  USD: { symbol: '$', rate: 1,    label: 'US Dollar' },
  EUR: { symbol: '€', rate: 0.92, label: 'Euro' },
  GBP: { symbol: '£', rate: 0.79, label: 'Pound' },
  INR: { symbol: '₹', rate: 83.5, label: 'Indian Rupee' },
};

const tiers = [
  {
    id: 'starter',
    name: 'Starter',
    priceUSD: 0,
    label: 'Free forever',
    description: 'Perfect for solo developers and small experiments.',
    cta: 'Start Free',
    features: [
      '5k Data Rows / month',
      '3 Pipeline runs / day',
      '2 Connectors',
      'Community support',
      '7-day data retention',
      'Basic analytics',
    ],
    featured: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    priceUSD: 149,
    label: '/month',
    description: 'For growing teams that need power without the complexity.',
    cta: 'Start 14-day Trial',
    badge: 'Most Popular',
    features: [
      '10M Data Rows / month',
      'Unlimited pipeline runs',
      '50 Connectors',
      'Priority email support',
      '90-day data retention',
      'Advanced analytics',
      'Custom transformations',
      'API access',
    ],
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceUSD: 599,
    label: '/month',
    description: 'Custom solutions for enterprises with strict compliance needs.',
    cta: 'Contact Sales',
    features: [
      'Unlimited data rows',
      'Unlimited everything',
      '200+ Connectors',
      '24/7 dedicated support',
      'Unlimited retention',
      'Real-time analytics',
      'Secure enclaves',
      'HIPAA / SOC 2 / GDPR',
      'Custom SLAs',
      'Dedicated infra',
    ],
    featured: false,
  },
];

// Animated price counter
function AnimatedPrice({ value, symbol }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={`${symbol}${value}`}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={styles.priceValue}
      >
        {value === 0 ? 'Free' : `${symbol}${value.toLocaleString()}`}
      </motion.span>
    </AnimatePresence>
  );
}

export default function PricingMatrix() {
  const [currency, setCurrency] = useState('USD');
  const [billing, setBilling] = useState('monthly'); // monthly | annual

  const convertedTiers = useMemo(() => {
    const { rate, symbol } = currencies[currency];
    const discount = billing === 'annual' ? 0.8 : 1;
    return tiers.map(t => ({
      ...t,
      price: t.priceUSD === 0 ? 0 : Math.round(t.priceUSD * rate * discount),
      symbol,
    }));
  }, [currency, billing]);

  const handleCurrency = useCallback((c) => setCurrency(c), []);
  const handleBilling  = useCallback((b) => setBilling(b), []);

  return (
    <section className={styles.section} id="pricing" aria-labelledby="pricing-heading">
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className="section-label">Pricing</span>
          <h2 id="pricing-heading" className={styles.heading}>
            Simple, <span className="gradient-text">transparent</span> pricing
          </h2>
          <p className={styles.subheading}>
            No hidden fees. No surprise bills. Scale up or down at any time.
          </p>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          {/* Billing toggle */}
          <div className={styles.billingToggle} role="group" aria-label="Billing period">
            <button
              className={`${styles.billingBtn} ${billing === 'monthly' ? styles.billingActive : ''}`}
              onClick={() => handleBilling('monthly')}
              id="billing-monthly"
            >
              Monthly
            </button>
            <button
              className={`${styles.billingBtn} ${billing === 'annual' ? styles.billingActive : ''}`}
              onClick={() => handleBilling('annual')}
              id="billing-annual"
            >
              Annual
              <span className={styles.saveBadge}>Save 20%</span>
            </button>
          </div>

          {/* Currency switcher */}
          <div className={styles.currencyGroup} role="group" aria-label="Currency selector">
            {Object.entries(currencies).map(([key, cur]) => (
              <button
                key={key}
                className={`${styles.currencyBtn} ${currency === key ? styles.currencyActive : ''}`}
                onClick={() => handleCurrency(key)}
                id={`currency-${key.toLowerCase()}`}
                title={cur.label}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Grid */}
        <div className={styles.matrixGrid}>
          {convertedTiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              className={`${styles.card} ${tier.featured ? styles.featuredCard : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: tier.featured ? -8 : -4, transition: { duration: 0.175, ease: 'easeOut' } }}
            >
              {tier.badge && (
                <div className={styles.badge} aria-label="Most popular plan">{tier.badge}</div>
              )}
              {tier.featured && <div className={styles.featuredGlow} aria-hidden="true" />}

              <header className={styles.cardHeader}>
                <h3 className={styles.tierName}>{tier.name}</h3>
                <p className={styles.tierDesc}>{tier.description}</p>
              </header>

              <div className={styles.priceRow}>
                <AnimatedPrice value={tier.price} symbol={tier.symbol} />
                {tier.priceUSD !== 0 && (
                  <span className={styles.priceLabel}>{tier.label}</span>
                )}
              </div>

              <a
                href={tier.id === 'enterprise' ? '#contact' : '#signup'}
                id={`pricing-cta-${tier.id}`}
                className={`${styles.cardCta} ${tier.featured ? styles.ctaFeatured : styles.ctaDefault}`}
                aria-label={`${tier.cta} for ${tier.name} plan`}
              >
                {tier.cta}
              </a>

              <ul className={styles.featureList} aria-label={`${tier.name} plan features`}>
                {tier.features.map((f, j) => (
                  <li key={j} className={styles.featureItem}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" className={styles.checkIcon}>
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Comparison note */}
        <p className={styles.note}>
          All plans include SSL encryption, 99.9% uptime SLA, and access to NexaFlow's core data quality engine.
          <a href="#contact" className={styles.noteLink}> Need a custom plan? Talk to us →</a>
        </p>
      </div>
    </section>
  );
}
