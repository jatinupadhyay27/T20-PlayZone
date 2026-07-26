import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { loadLiveMatches } from '@/store/slices/matchesSlice';
import SectionHeading from '@/components/common/SectionHeading';
import Icon from '@/components/common/Icon';
import Badge from '@/components/ui/Badge';
import Reveal from '@/components/common/Reveal';
import styles from './LiveMatches.module.css';

export default function LiveMatches() {
  const dispatch = useAppDispatch();
  const { groups, status } = useAppSelector((state) => state.matches);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadLiveMatches());
    }
  }, [dispatch, status]);

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

      {groups.map((group) => (
        <Reveal key={group.id} className={styles.group}>
          <div className={styles.groupHeader}>
            <span className={styles.groupLabel}>
              <Icon name="cricket" size={16} />
              {group.label}
            </span>
            <span className={styles.groupTag}>{group.tag}</span>
          </div>

          <div className={styles.table} role="table">
            <div className={styles.tableHead} role="row">
              <span role="columnheader">Fixture</span>
              <span role="columnheader">Status</span>
              <span role="columnheader">Schedule</span>
            </div>

            {group.matches.map((match) => (
              <div key={match.id} className={styles.tableRow} role="row">
                <span role="cell" className={styles.fixture}>
                  {match.fixture}
                </span>
                <span role="cell">
                  <Badge variant={match.status === 'live' ? 'live' : 'upcoming'}>
                    {match.statusLabel}
                  </Badge>
                </span>
                <span role="cell" className={styles.schedule}>
                  {match.schedule}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      ))}
    </section>
  );
}
