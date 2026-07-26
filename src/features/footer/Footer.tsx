import ContactForm from '@/features/contact/ContactForm';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.panel}>
        <div className={styles.reachOut}>
          <h3 className={styles.heading}>Reach Out Me</h3>
          <p className={styles.text}>
            Questions about IPL Cricket, live casino tables, or getting your
            ID? Send us a message and our team will get back to you.
          </p>
          <p className={styles.contactLine}>support@t20playzone.example</p>
          <p className={styles.contactLine}>+91 70146 77238</p>
        </div>

        <ContactForm />
      </div>

      <p className={styles.copyright}>
        © {new Date().getFullYear()} T20 Play Zone. All rights reserved.
      </p>
    </footer>
  );
}
