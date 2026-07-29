import ContactForm from '@/features/contact/ContactForm';
import { CONTACT_RECIPIENT_EMAIL } from '@/constants/email';
import { WHATSAPP_PHONE_NUMBER } from '@/constants/whatsapp';
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
          <p className={styles.contactLine}>{CONTACT_RECIPIENT_EMAIL}</p>
          <p className={styles.contactLine}>+{WHATSAPP_PHONE_NUMBER}</p>
        </div>

        <ContactForm />
      </div>

      <p className={styles.copyright}>
        © {new Date().getFullYear()} T20 Play Zone. All rights reserved.
      </p>
    </footer>
  );
}
