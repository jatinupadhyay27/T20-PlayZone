import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { loadLiveMatches } from '@/store/slices/matchesSlice';
import type { SupportedSport } from '@/types/match';
import SectionHeading from '@/components/common/SectionHeading';
import Icon from '@/components/common/Icon';
import Badge from '@/components/ui/Badge';
import Reveal from '@/components/common/Reveal';
import styles from './LiveMatches.module.css';

const SPORTS: { id: SupportedSport; label: string }[] = [
  { id: 'cricket', label: 'Cricket' },
  { id: 'football', label: 'Football' },
  { id: 'tennis', label: 'Tennis' },
];

const BADGE_VARIANT = {
  live: 'live',
  upcoming: 'upcoming',
  completed: 'neutral',
} as const;

const PAGE_SIZE = 8;

// SportScore's free tier allows ~10,000 requests/24h per IP. Polling one
// sport every 45s is ~1,900 requests/day if a tab is left open around the
// clock — comfortably inside the limit with headroom for tab switches,
// manual refreshes and other visitors sharing the same IP.
const POLL_INTERVAL_MS = 45_000;

function formatUpdatedAt(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export default function LiveMatches() {
  const dispatch = useAppDispatch();
  const { groups, status, isLive, lastUpdated } = useAppSelector((state) => state.matches);
  const [sport, setSport] = useState<SupportedSport>('cricket');
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(loadLiveMatches(sport));
    setPage(1);

    const intervalId = window.setInterval(() => {
      if (document.hidden) return;
      dispatch(loadLiveMatches(sport));
    }, POLL_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [dispatch, sport]);

  const group = groups[0];
  const matches = group?.matches ?? [];
  const totalPages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const pageMatches = matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section aria-label="Live matches">
      <SectionHeading
        action={
          <button type="button" className={styles.filterButton} aria-label="Filter matches">
            <Icon name="filter" size={16} />
          </button>
        }
      >
        Live Matches
      </SectionHeading>

      <div className={styles.sportTabs} role="tablist" aria-label="Sport">
        {SPORTS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={sport === s.id}
            className={`${styles.sportTab} ${sport === s.id ? styles.sportTabActive : ''}`}
            onClick={() => setSport(s.id)}
          >
            <Icon name={s.id} size={16} />
            {s.label}
          </button>
        ))}
      </div>

      {status === 'loading' && matches.length === 0 ? (
        <p className={styles.empty}>Loading {sport} matches…</p>
      ) : null}

      {status === 'succeeded' && matches.length === 0 ? (
        <p className={styles.empty}>No {sport} matches found for today.</p>
      ) : null}

      {status === 'failed' && matches.length === 0 ? (
        <p className={styles.empty}>
          Couldn't load {sport} matches right now.{' '}
          <button
            type="button"
            className={styles.retryLink}
            onClick={() => dispatch(loadLiveMatches(sport))}
          >
            Try again
          </button>
        </p>
      ) : null}

      {group && pageMatches.length > 0 ? (
        <Reveal className={styles.group}>
          <div className={styles.groupHeader}>
            <span className={styles.groupLabel}>
              <Icon name={sport} size={16} />
              {group.label}
            </span>
            <span className={styles.groupHeaderRight}>
              <span className={styles.groupTag}>{group.tag}</span>
              <button
                type="button"
                className={styles.refreshButton}
                aria-label="Refresh matches"
                disabled={status === 'loading'}
                onClick={() => dispatch(loadLiveMatches(sport))}
              >
                <Icon name="refresh" size={14} className={status === 'loading' ? styles.spinning : ''} />
              </button>
            </span>
          </div>

          {!isLive ? (
            <p className={styles.staleBanner}>
              This isn't real-time data{lastUpdated ? ` (last updated ${formatUpdatedAt(lastUpdated)})` : ''} —
              please refresh.
            </p>
          ) : null}

          <div className={styles.table} role="table">
            <div className={styles.tableHead} role="row">
              <span role="columnheader">Fixture</span>
              <span role="columnheader">Status</span>
              <span role="columnheader">Schedule</span>
            </div>

            {pageMatches.map((match) => (
              <div key={match.id} className={styles.tableRow} role="row">
                <span role="cell" className={styles.fixture}>
                  {match.fixture}
                </span>
                <span role="cell">
                  <Badge variant={BADGE_VARIANT[match.status]}>{match.statusLabel}</Badge>
                </span>
                <span role="cell" className={styles.schedule}>
                  {match.schedule}
                </span>
              </div>
            ))}
          </div>

          {totalPages > 1 ? (
            <div className={styles.pagination}>
              <button
                type="button"
                className={styles.pageButton}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>
              <span className={styles.pageIndicator}>
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                className={styles.pageButton}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          ) : null}
        </Reveal>
      ) : null}

      <a href="https://sportscore.com" target="_blank" rel="noopener noreferrer" className={styles.attribution}>
        Powered by SportScore
      </a>
    </section>
  );
}
