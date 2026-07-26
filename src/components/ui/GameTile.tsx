import type { GameCard } from '@/types/game';
import styles from './GameTile.module.css';

interface GameTileProps {
  game: GameCard;
}

export default function GameTile({ game }: GameTileProps) {
  return (
    <a href="#" className={styles.tile}>
      <div className={styles.imageWrapper}>
        <img src={game.thumbnail} alt={game.title} loading="lazy" className={styles.thumbnail} />
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{game.title}</p>
        <p className={styles.provider}>{game.provider}</p>
      </div>
    </a>
  );
}
