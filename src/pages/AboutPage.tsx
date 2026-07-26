import aboutHighlights from '@/data/aboutHighlights.json';
import About from '@/features/about/About';
import SectionHeading from '@/components/common/SectionHeading';
import Card from '@/components/ui/Card';
import Reveal from '@/components/common/Reveal';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  return (
    <>
      <About />

      <section aria-label="Why choose T20 Play Zone">
        <SectionHeading>Why Choose T20 Play Zone</SectionHeading>
        <div className={styles.grid}>
          {aboutHighlights.map((highlight, index) => (
            <Reveal key={highlight.id} delay={index * 90}>
              <Card className={styles.card}>
                <h3 className={styles.title}>{highlight.title}</h3>
                <p className={styles.description}>{highlight.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
