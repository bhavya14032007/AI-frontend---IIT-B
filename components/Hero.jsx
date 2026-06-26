import styles from './Hero.module.css';

export default function Hero() {
  return (
    <header className={styles.heroSection}>
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Automate Your Data,<br/> Elevate Your AI.</h1>
          <p className={styles.subtitle}>
            The premium AI-driven data automation platform that unifies your workflows 
            and prepares your enterprise for the future.
          </p>
          <div className={styles.actions}>
            <button className={styles.primaryBtn}>Start Building</button>
            <button className={styles.secondaryBtn}>View Documentation</button>
          </div>
        </div>
      </div>
    </header>
  );
}
