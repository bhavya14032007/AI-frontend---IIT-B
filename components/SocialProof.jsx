import styles from './SocialProof.module.css';

const partners = ['Acme Corp', 'Globex', 'Soylent', 'Initech', 'Umbrella'];

export default function SocialProof() {
  return (
    <section className={styles.socialSection}>
      <div className="container">
        <p className={styles.trustText}>Trusted by leading enterprises globally</p>
        <div className={styles.logoGrid}>
          {partners.map(partner => (
            <div key={partner} className={styles.logoItem}>
              <span className="font-heading">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
