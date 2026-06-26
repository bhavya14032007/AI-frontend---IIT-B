"use client";

import { useState, useMemo } from 'react';
import styles from './PricingMatrix.module.css';

const pricingTiers = [
  { name: 'Starter', priceUSD: 49, features: ['10k Data Rows', 'Basic Support', 'Standard Automation'] },
  { name: 'Professional', priceUSD: 149, features: ['1M Data Rows', 'Priority Support', 'Advanced Pipelines'] },
  { name: 'Enterprise', priceUSD: 499, features: ['Unlimited', '24/7 Support', 'Dedicated Enclaves'] },
];

const conversionRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
};

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
};

export default function PricingMatrix() {
  const [currency, setCurrency] = useState('USD');

  // Performance-Isolated Currency Switcher
  const convertedPrices = useMemo(() => {
    return pricingTiers.map(tier => ({
      ...tier,
      price: Math.round(tier.priceUSD * conversionRates[currency])
    }));
  }, [currency]);

  return (
    <section className={styles.pricingSection}>
      <div className="container">
        <h2 className="font-heading">Transparent Pricing</h2>
        <div className={styles.currencyToggle}>
          {Object.keys(conversionRates).map(curr => (
            <button 
              key={curr}
              className={`${styles.toggleBtn} ${currency === curr ? styles.active : ''}`}
              onClick={() => setCurrency(curr)}
            >
              {curr}
            </button>
          ))}
        </div>
        <div className={styles.matrixGrid}>
          {convertedPrices.map((tier) => (
            <div key={tier.name} className={styles.pricingCard}>
              <h3 className={styles.tierName}>{tier.name}</h3>
              <div className={styles.price}>
                <span className={styles.symbol}>{currencySymbols[currency]}</span>
                <span className={styles.amount}>{tier.price}</span>
                <span className={styles.period}>/mo</span>
              </div>
              <ul className={styles.featureList}>
                {tier.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
              <button className={styles.ctaBtn}>Choose {tier.name}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
