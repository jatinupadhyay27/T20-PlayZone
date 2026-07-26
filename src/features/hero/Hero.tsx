import heroData from '@/data/hero.json';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Reveal from '@/components/common/Reveal';
import styles from './Hero.module.css';

const { hero, sidePromoCards } = heroData;

export default function Hero() {
  return (
    <section className={styles.wrapper} aria-label="Featured promotion">
      <div className={styles.heroCard}>
        <div
          className={styles.heroImage}
          style={{ backgroundImage: `url(${hero.image})` }}
        />
        <div className={styles.heroOverlay} />
        <Reveal className={styles.heroContent}>
          <Badge variant="hot" pulse>
            {hero.badge}
          </Badge>
          <h1 className={styles.title}>{hero.title}</h1>
          <p className={styles.description}>{hero.description}</p>
          <Button variant="secondary" className={styles.cta}>
            {hero.ctaLabel}
          </Button>
        </Reveal>
      </div>

      <div className={styles.sideCards}>
        {sidePromoCards.map((card, index) => (
          <Reveal key={card.id} delay={index * 120}>
            <Card
              className={styles.sideCard}
              style={{ backgroundImage: `url(${card.image})` }}
            >
              <div className={styles.sideCardOverlay} />
              <div className={styles.sideCardContent}>
                <h3 className={styles.sideCardTitle}>{card.title}</h3>
                <p className={styles.sideCardSubtitle}>{card.subtitle}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
