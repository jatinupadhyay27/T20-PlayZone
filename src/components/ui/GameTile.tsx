import type { GameCard } from '@/types/game';
import { openWhatsAppChat } from '@/services/whatsappService';
import styles from './GameTile.module.css';

interface GameTileProps {
  game: GameCard;
}

export default function GameTile({ game }: GameTileProps) {
  return (
    <button
      type="button"
      className={styles.tile}
      onClick={() =>
        openWhatsAppChat(
          undefined,
          `Hi! I'm interested in playing ${game.title}. Could you share the available options and help me get started?`,
        )
      }
    >
      <div className={styles.imageWrapper}>
        <img src={game.thumbnail} alt={game.title} loading="lazy" className={styles.thumbnail} />
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{game.title}</p>
        <p className={styles.provider}>{game.provider}</p>
      </div>
    </button>
  );
}
