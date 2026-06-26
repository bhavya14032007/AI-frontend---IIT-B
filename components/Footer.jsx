"use client";
import styles from './Footer.module.css';

const navGroups = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Changelog', 'Roadmap', 'Status'],
  },
  {
    title: 'Solutions',
    links: ['Data Engineering', 'ML Teams', 'Analytics', 'Enterprise', 'Startups'],
  },
  {
    title: 'Developers',
    links: ['Documentation', 'API Reference', 'SDK', 'Open Source', 'Community'],
  },
  {
    title: 'Company',
    links: ['About', 'Blog', 'Careers', 'Press Kit', 'Contact'],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo" id="contact">
      <div className={styles.top}>
        <div className="container">
          {/* Newsletter */}
          <div className={styles.newsletterWrap}>
            <div className={styles.newsletterText}>
              <h2 className={styles.newsletterHeading}>Stay ahead of the curve.</h2>
              <p className={styles.newsletterSub}>
                Get weekly insights on AI data engineering, product updates, and industry news.
              </p>
            </div>
            <form className={styles.newsletterForm} onSubmit={e => e.preventDefault()} aria-label="Newsletter signup">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                type="email"
                id="newsletter-email"
                name="email"
                placeholder="you@company.com"
                className={styles.emailInput}
                autoComplete="email"
                required
              />
              <button type="submit" className={styles.subscribeBtn}>Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.middle}>
        <div className="container">
          <div className={styles.middleGrid}>
            {/* Brand */}
            <div className={styles.brand}>
              <a href="/" className={styles.logo} aria-label="NexaFlow Home">
                <span className={styles.logoDot} aria-hidden="true" />
                <span className={styles.logoText}>NexaFlow</span>
                <span className={styles.logoBadge}>AI</span>
              </a>
              <p className={styles.brandTagline}>
                Advanced AI-driven data automation for the modern enterprise.
              </p>
              <div className={styles.socials} aria-label="Social links">
                {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map(s => (
                  <a key={s} href="#" className={styles.socialLink} aria-label={s} rel="noopener noreferrer">
                    {s[0]}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav groups */}
            {navGroups.map(group => (
              <nav key={group.title} aria-label={group.title}>
                <h3 className={styles.groupTitle}>{group.title}</h3>
                <ul>
                  {group.links.map(link => (
                    <li key={link}>
                      <a href="#" className={styles.footerLink}>{link}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} NexaFlow AI, Inc. All rights reserved.
            </p>
            <div className={styles.legalLinks}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                <a key={l} href="#" className={styles.legalLink}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
