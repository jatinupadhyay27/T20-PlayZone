import type { MatchGroup, LiveMatch, MatchStatus, SupportedSport } from '@/types/match';
import { SPORTSCORE_FIXTURES_URL } from '@/constants/sportscore';

interface SportScoreMatch {
  home: string;
  away: string;
  home_score: string | number | null;
  away_score: string | number | null;
  status: string;
  status_text: string;
  time: string;
}

interface SportScoreResponse {
  sport: string;
  matches: SportScoreMatch[];
}

const STATUS_MAP: Record<string, MatchStatus> = {
  live: 'live',
  upcoming: 'upcoming',
  finished: 'completed',
};

const STATUS_RANK: Record<MatchStatus, number> = {
  live: 0,
  upcoming: 1,
  completed: 2,
};

const SPORT_LABEL: Record<SupportedSport, string> = {
  cricket: 'Cricket',
  football: 'Football',
  tennis: 'Tennis',
};

function formatSchedule(time: string): string {
  const date = new Date(time);
  if (Number.isNaN(date.getTime())) return time;
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function toLiveMatch(match: SportScoreMatch, index: number): LiveMatch {
  const hasScore =
    match.home_score != null && match.home_score !== '-' && match.away_score != null && match.away_score !== '-';
  const scoreLine = hasScore ? ` (${match.home_score} - ${match.away_score})` : '';

  return {
    id: `${match.home}-${match.away}-${index}`,
    fixture: `${match.home} v ${match.away}${scoreLine}`,
    status: STATUS_MAP[match.status] ?? 'upcoming',
    statusLabel: match.status_text || match.status.toUpperCase(),
    schedule: formatSchedule(match.time),
  };
}

// SportScore's free tier sits behind Cloudflare bot-checks that occasionally
// answer a request with a "one moment" HTML challenge page (HTTP 503) instead
// of JSON, or reject the request outright with a network error. Both are
// transient — retrying with backoff almost always succeeds within a couple
// of attempts, so we retry on a thrown network error, a non-2xx status, AND
// a response body that fails to parse as JSON (the 503 challenge page).
async function fetchFixtures(sport: SupportedSport, attempts = 4): Promise<SportScoreResponse> {
  const url = `${SPORTSCORE_FIXTURES_URL}?sport=${sport}&limit=100`;
  let lastError: unknown;

  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`SportScore responded ${response.status}`);
      }
      return (await response.json()) as SportScoreResponse;
    } catch (error) {
      lastError = error;
      if (attempt < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** attempt));
      }
    }
  }

  throw lastError;
}

/**
 * Uses SportScore's free, keyless /api/v1/fixtures/ endpoint (CORS-open, no
 * signup) to load today's live, upcoming and finished matches for a sport.
 * Throws if the request ultimately fails after retries — callers should keep
 * showing the last-known matches rather than clearing them on a transient
 * failure (see matchesSlice, which leaves `groups` untouched on rejection).
 */
export async function fetchLiveMatches(sport: SupportedSport): Promise<MatchGroup[]> {
  const payload = await fetchFixtures(sport);

  const matches = payload.matches
    .map(toLiveMatch)
    .sort((a, b) => STATUS_RANK[a.status] - STATUS_RANK[b.status]);

  if (matches.length === 0) return [];

  return [
    {
      id: `${sport}-fixtures`,
      sport,
      label: `${SPORT_LABEL[sport]} Matches`,
      tag: 'TODAY',
      matches,
    },
  ];
}
