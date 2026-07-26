export type MatchStatus = 'live' | 'upcoming' | 'completed';

export interface LiveMatch {
  id: string;
  fixture: string;
  status: MatchStatus;
  statusLabel: string;
  schedule: string;
}

export interface MatchGroup {
  id: string;
  sport: string;
  label: string;
  tag: string;
  matches: LiveMatch[];
}
