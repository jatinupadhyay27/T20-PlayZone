import type { ReactNode } from 'react';
import styles from './Badge.module.css';

type BadgeVariant = 'hot' | 'live' | 'upcoming' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  pulse?: boolean;
  children: ReactNode;
}

export default function Badge({ variant = 'neutral', pulse = false, children }: BadgeProps) {
  const classNames = [styles.badge, styles[variant], pulse ? styles.pulse : '']
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames}>
      {variant === 'live' ? <span className={styles.dot} /> : null}
      {children}
    </span>
  );
}
