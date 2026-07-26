import { useState, type FormEvent } from 'react';
import Button from '@/components/ui/Button';
import { sendContactEmail } from '@/services/emailService';
import styles from './ContactForm.module.css';

type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

interface ContactFormProps {
  heading?: string;
}

export default function ContactForm({ heading = 'Get In Touch' }: ContactFormProps) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<SendStatus>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    try {
      await sendContactEmail(form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {heading ? <h3 className={styles.heading}>{heading}</h3> : null}

      <input
        type="text"
        name="name"
        placeholder="Full name"
        value={form.name}
        onChange={(event) => setForm({ ...form, name: event.target.value })}
        className={styles.input}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email address"
        value={form.email}
        onChange={(event) => setForm({ ...form, email: event.target.value })}
        className={styles.input}
        required
      />
      <textarea
        name="message"
        placeholder="Your message"
        value={form.message}
        onChange={(event) => setForm({ ...form, message: event.target.value })}
        className={styles.textarea}
        rows={4}
        required
      />

      <Button
        type="submit"
        variant="primary"
        disabled={status === 'sending'}
        icon={status === 'sending' ? <span className={styles.spinner} /> : undefined}
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </Button>

      {status === 'sent' ? (
        <p role="status" className={`${styles.confirmation} ${styles.fadeIn}`}>
          Thanks — your message is on its way. We&apos;ll be in touch shortly.
        </p>
      ) : null}
      {status === 'error' ? (
        <p role="alert" className={`${styles.errorText} ${styles.fadeIn}`}>
          Something went wrong sending your message. Please try again.
        </p>
      ) : null}
    </form>
  );
}
