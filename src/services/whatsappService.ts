import { WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_PHONE_NUMBER } from '@/constants/whatsapp';

export function buildWhatsAppUrl(
  phoneNumber: string = WHATSAPP_PHONE_NUMBER,
  message: string = WHATSAPP_DEFAULT_MESSAGE,
): string {
  const sanitizedNumber = phoneNumber.replace(/[^\d]/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${sanitizedNumber}?text=${encodedMessage}`;
}

export function openWhatsAppChat(
  phoneNumber?: string,
  message?: string,
): void {
  const url = buildWhatsAppUrl(phoneNumber, message);
  window.open(url, '_blank', 'noopener,noreferrer');
}
