import esportsData from '@/data/esports.json';
import type { GameCard } from '@/types/game';
import SectionHeading from '@/components/common/SectionHeading';
import GameTile from '@/components/ui/GameTile';
import Reveal from '@/components/common/Reveal';
import styles from './EsportsPage.module.css';

const esportsTitles = esportsData as GameCard[];

export default function EsportsPage() {
  return (
    <section aria-label="E-Sports">
      <SectionHeading>E-Sports</SectionHeading>
      <Reveal>
        <p className={styles.intro}>
          Bet on the biggest esports tournaments as they happen — from CS2
          majors to PUBG Mobile world finals — with live odds updated in
          real time.
        </p>
      </Reveal>
      <div className={styles.grid}>
        {esportsTitles.map((title, index) => (
          <Reveal key={title.id} delay={(index % 6) * 60}>
            <GameTile game={title} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
