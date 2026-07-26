import type { ReactNode } from 'react';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  children: ReactNode;
  action?: ReactNode;
}

export default function SectionHeading({ children, action }: SectionHeadingProps) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{children}</h2>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
