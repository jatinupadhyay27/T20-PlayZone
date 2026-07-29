import type { MatchGroup, SupportedSport } from '@/types/match';

interface CachedMatches {
  groups: MatchGroup[];
  savedAt: string;
}

function cacheKey(sport: SupportedSport): string {
  return `t20-live-matches:${sport}`;
}

/**
 * Persists the last successful fetch per sport so that if a later fetch
 * fails — even after a page reload, when there's no in-memory data left to
 * fall back on — we can still show the last known state instead of nothing.
 */
export function saveCachedMatches(sport: SupportedSport, groups: MatchGroup[]): void {
  try {
    const entry: CachedMatches = { groups, savedAt: new Date().toISOString() };
    localStorage.setItem(cacheKey(sport), JSON.stringify(entry));
  } catch {
    // localStorage can throw (private browsing, quota) — it's only a cache, safe to skip.
  }
}

export function loadCachedMatches(sport: SupportedSport): CachedMatches | null {
  try {
    const raw = localStorage.getItem(cacheKey(sport));
    return raw ? (JSON.parse(raw) as CachedMatches) : null;
  } catch {
    return null;
  }
}
