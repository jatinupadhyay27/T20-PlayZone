import { FaWhatsapp } from 'react-icons/fa';
import { useWhatsApp } from '@/hooks/useWhatsApp';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
  const openWhatsApp = useWhatsApp();

  return (
    <button
      type="button"
      className={styles.button}
      onClick={openWhatsApp}
      aria-label="Get your ID on WhatsApp"
    >
      <FaWhatsapp size={20} />
      <span>Get The ID Now</span>
    </button>
  );
}
