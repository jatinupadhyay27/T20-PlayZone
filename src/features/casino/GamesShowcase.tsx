import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { loadGamesCatalogue } from '@/store/slices/gamesSlice';
import SectionHeading from '@/components/common/SectionHeading';
import GameTile from '@/components/ui/GameTile';
import Icon from '@/components/common/Icon';
import Reveal from '@/components/common/Reveal';
import styles from './GamesShowcase.module.css';

const STAGGER_STEP = 60;
const STAGGER_MAX = 6;

export default function GamesShowcase() {
  const dispatch = useAppDispatch();
  const { casinoGames, popularGames, cardGames, status } = useAppSelector(
    (state) => state.games,
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadGamesCatalogue());
    }
  }, [dispatch, status]);

  return (
    <>
      <section aria-label="Casino games on the platform">
        <SectionHeading>Casino Games On The Platform</SectionHeading>
        <div className={styles.grid}>
          {casinoGames.map((game, index) => (
            <Reveal key={game.id} delay={(index % STAGGER_MAX) * STAGGER_STEP}>
              <GameTile game={game} />
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-label="Popular games">
        <SectionHeading>Popular Games</SectionHeading>
        <div className={styles.grid}>
          {popularGames.map((game, index) => (
            <Reveal key={game.id} delay={(index % STAGGER_MAX) * STAGGER_STEP}>
              <GameTile game={game} />
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-label="International card games">
        <SectionHeading>International Card Games</SectionHeading>
        <ul className={styles.iconGrid}>
          {cardGames.map((card, index) => (
            <li key={card.id}>
              <Reveal delay={(index % STAGGER_MAX) * STAGGER_STEP} className={styles.iconTile}>
                <Icon name="cards" size={24} />
                <span>{card.label}</span>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
