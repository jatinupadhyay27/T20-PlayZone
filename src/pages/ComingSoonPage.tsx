import { Link } from 'react-router-dom';
import Icon from '@/components/common/Icon';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Reveal from '@/components/common/Reveal';
import styles from './ComingSoonPage.module.css';

interface ComingSoonPageProps {
  title: string;
  icon?: string;
}

export default function ComingSoonPage({ title, icon }: ComingSoonPageProps) {
  return (
    <section className={styles.wrapper} aria-label={`${title} — coming soon`}>
      <Reveal className={styles.content}>
        {icon ? (
          <div className={styles.iconCircle}>
            <Icon name={icon} size={36} />
          </div>
        ) : null}
        <Badge variant="upcoming">Coming Soon</Badge>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>
          We&apos;re building this out. {title} will be live here soon — check
          back shortly.
        </p>
        <Link to="/">
          <Button variant="secondary">Back to Dashboard</Button>
        </Link>
      </Reveal>
    </section>
  );
}
