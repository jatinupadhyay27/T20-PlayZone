import SectionHeading from '@/components/common/SectionHeading';
import Card from '@/components/ui/Card';
import Reveal from '@/components/common/Reveal';
import ContactForm from '@/features/contact/ContactForm';
import { CONTACT_RECIPIENT_EMAIL } from '@/constants/email';
import { WHATSAPP_PHONE_NUMBER } from '@/constants/whatsapp';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  return (
    <section aria-label="Contact Us">
      <SectionHeading>Contact Us</SectionHeading>
      <div className={styles.layout}>
        <Reveal>
          <Card className={styles.infoCard}>
            <h3 className={styles.infoHeading}>Reach Out Me</h3>
            <p className={styles.infoText}>
              Questions about IPL Cricket, live casino tables, or getting
              your ID? Send us a message and our team will get back to you.
            </p>
            <p className={styles.contactLine}>{CONTACT_RECIPIENT_EMAIL}</p>
            <p className={styles.contactLine}>+{WHATSAPP_PHONE_NUMBER}</p>
          </Card>
        </Reveal>

        <Reveal delay={120}>
          <Card className={styles.formCard}>
            <ContactForm />
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
