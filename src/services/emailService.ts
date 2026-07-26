import emailjs from '@emailjs/browser';
import {
  CONTACT_RECIPIENT_EMAIL,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  isEmailJsConfigured,
} from '@/constants/email';

export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}

/**
 * Sends the contact form via EmailJS when configured. Falls back to
 * opening the visitor's own email client (mailto:) so the form still
 * "sends" something useful with zero external account setup.
 */
export async function sendContactEmail(payload: ContactFormPayload): Promise<void> {
  const submittedAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  if (isEmailJsConfigured) {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: payload.name,
        from_email: payload.email,
        message: payload.message,
        to_email: CONTACT_RECIPIENT_EMAIL,
        submitted_at: submittedAt,
      },
      { publicKey: EMAILJS_PUBLIC_KEY },
    );
    return;
  }

  const subject = encodeURIComponent(`New contact form message from ${payload.name}`);
  const body = encodeURIComponent(
    `${payload.message}\n\n— ${payload.name} (${payload.email})\nSubmitted: ${submittedAt}`,
  );
  window.open(
    `mailto:${CONTACT_RECIPIENT_EMAIL}?subject=${subject}&body=${body}`,
    '_blank',
  );
}
