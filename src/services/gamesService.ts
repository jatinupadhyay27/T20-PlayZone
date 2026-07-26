import gamesData from '@/data/games.json';
import type { CardGameIcon, GameCard } from '@/types/game';

export interface GamesResponse {
  casinoGames: GameCard[];
  popularGames: GameCard[];
  cardGames: CardGameIcon[];
}

/**
 * Mimics an API call. Swap the body for a real fetch() once the
 * games catalogue backend is available — the return shape already matches.
 */
export async function fetchGamesCatalogue(): Promise<GamesResponse> {
  return Promise.resolve(gamesData as GamesResponse);
}
