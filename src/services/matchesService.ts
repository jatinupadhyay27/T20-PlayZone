import liveMatchesData from '@/data/liveMatches.json';
import type { MatchGroup } from '@/types/match';

/**
 * Mimics an API call. Swap the body for a real fetch() once the
 * matches backend is available — the return shape already matches.
 */
export async function fetchLiveMatches(): Promise<MatchGroup[]> {
  return Promise.resolve(liveMatchesData as MatchGroup[]);
}
