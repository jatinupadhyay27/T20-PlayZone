import idProvidersData from '@/data/idProviders.json';
import type { IdProvider } from '@/types/idProvider';
import SectionHeading from '@/components/common/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Reveal from '@/components/common/Reveal';
import { FaWhatsapp } from 'react-icons/fa';
import { openWhatsAppChat } from '@/services/whatsappService';
import styles from './IdProvidersPage.module.css';

const providers = idProvidersData as IdProvider[];

export default function IdProvidersPage() {
  return (
    <section aria-label="ID Providers">
      <SectionHeading>ID Providers</SectionHeading>
      <Reveal>
        <p className={styles.intro}>
          Get a verified T20 Play Zone ID in minutes. Pick the desk that
          matches what you need and message them directly on WhatsApp —
          no waiting in a queue.
        </p>
      </Reveal>
      <div className={styles.grid}>
        {providers.map((provider, index) => (
          <Reveal key={provider.id} delay={index * 100}>
            <Card className={styles.card}>
              <h3 className={styles.name}>{provider.name}</h3>
              <p className={styles.tagline}>{provider.tagline}</p>
              <p className={styles.responseTime}>{provider.responseTime}</p>
              <Button
                variant="whatsapp"
                icon={<FaWhatsapp />}
                onClick={() =>
                  openWhatsAppChat(
                    undefined,
                    `Hi! I'd like to get my ID through the ${provider.name}. Could you help me get started?`,
                  )
                }
              >
                Message on WhatsApp
              </Button>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
