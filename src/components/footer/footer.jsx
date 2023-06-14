import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerColumns}>
        <div className={styles.footerColumn}>
          <h5>Timing</h5>
          <p>Monday - Friday: 9am - 5pm</p>
          <p>Saturday: 10am - 2pm</p>
          <p>Sunday: Closed</p>
        </div>
        <div className={styles.footerColumn}>
          <h5>Social Accounts</h5>
          <ul className={styles.socialAccounts}>
            <li>
              <a href="https://example.com">Facebook</a>
            </li>
            <li>
              <a href="https://example.com">Twitter</a>
            </li>
            <li>
              <a href="https://example.com">Instagram</a>
            </li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h5>Links</h5>
          <ul className={styles.pageLinks}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footerCopyRight}>
        <p>&copy; 2023 Beyond Pages. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
