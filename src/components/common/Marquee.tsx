import styles from './Marquee.module.css';

interface MarqueeProps {
  text: string;
  repeat?: number;
}

export default function Marquee({ text, repeat = 6 }: MarqueeProps) {
  const items = Array.from({ length: repeat * 2 }, (_, index) => index);

  return (
    <div className={styles.wrapper}>
      <span className={styles.srOnly}>{text}</span>
      <div className={styles.track} aria-hidden="true">
        {items.map((index) => (
          <span key={index} className={styles.item}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
