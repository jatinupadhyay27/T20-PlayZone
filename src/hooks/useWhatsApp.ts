import { useCallback } from 'react';
import { openWhatsAppChat } from '@/services/whatsappService';

export function useWhatsApp(phoneNumber?: string, message?: string) {
  return useCallback(
    () => openWhatsAppChat(phoneNumber, message),
    [phoneNumber, message],
  );
}
