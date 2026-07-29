import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Reveal from '@/components/common/Reveal';
import LiveMatches from '@/features/liveMatches/LiveMatches';
import { openWhatsAppChat } from '@/services/whatsappService';
import styles from './T20PlayZonePage.module.css';

export default function T20PlayZonePage() {
  return (
    <>
      <section className={styles.banner} aria-label="T20 Play Zone cricket hub">
        <div
          className={styles.bannerImage}
          style={{ backgroundImage: 'url(/images/hero-cricket.jpg)' }}
        />
        <div className={styles.overlay} />
        <Reveal className={styles.content}>
          <Badge variant="hot" pulse>
            IPL Season
          </Badge>
          <h1 className={styles.title}>T20 Play Zone</h1>
          <p className={styles.description}>
            Every IPL fixture, ball-by-ball odds, and international T20
            series in one place. Follow live matches below or get your ID
            to start betting.
          </p>
          <Button
            variant="secondary"
            onClick={() =>
              openWhatsAppChat(undefined, "Hi! I'd like to get ID. Could you help me get started?")
            }
          >
            Get ID
          </Button>
        </Reveal>
      </section>

      <LiveMatches />
    </>
  );
}
