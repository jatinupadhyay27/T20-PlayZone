import SectionHeading from '@/components/common/SectionHeading';
import Reveal from '@/components/common/Reveal';
import styles from './About.module.css';

export default function About() {
  return (
    <section aria-label="About T20 Play Zone" className={styles.wrapper}>
      <Reveal className={styles.copy}>
        <SectionHeading>About T20 Playzone</SectionHeading>
        <p className={styles.paragraph}>
          T20 Play Zone brings you the complete IPL and international cricket
          betting experience, alongside live casino tables, sportsbook odds
          for every major league, and a full library of slot and card games —
          all in one platform designed for speed, security, and 24/7 access.
        </p>
      </Reveal>
      <Reveal delay={150} className={styles.imageWrapper}>
        <img
          src="/images/about-t20-playzone.jpg"
          alt="Cricket stadium filled with fans"
          className={styles.image}
        />
      </Reveal>
    </section>
  );
}
