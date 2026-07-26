export const CONTACT_RECIPIENT_EMAIL = import.meta.env.VITE_CONTACT_RECIPIENT_EMAIL ?? '';

// EmailJS lets a static frontend send real email without a backend.
// Create a free account at https://www.emailjs.com, add an email service +
// template, then set these in a local .env file (see .env.example).
export const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
export const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
export const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';

export const isEmailJsConfigured = Boolean(
  EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY,
);
