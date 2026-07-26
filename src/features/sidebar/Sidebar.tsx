import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setSidebarOpen } from '@/store/slices/navigationSlice';
import { openWhatsAppChat } from '@/services/whatsappService';
import Icon from '@/components/common/Icon';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const { sidebarItems, isSidebarOpen } = useAppSelector((state) => state.navigation);

  function handleItemClick(label: string) {
    openWhatsAppChat(
      undefined,
      `Hi! I'm interested in ${label}. Could you share the available options and help me get started?`,
    );
    dispatch(setSidebarOpen(false));
  }

  return (
    <>
      {isSidebarOpen ? (
        <div
          className={styles.backdrop}
          onClick={() => dispatch(setSidebarOpen(false))}
          aria-hidden="true"
        />
      ) : null}

      <aside
        className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}
        aria-label="Game lobby"
      >
        <p className={styles.heading}>Game Lobby</p>
        <ul className={styles.list}>
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={styles.item}
                onClick={() => handleItemClick(item.label)}
              >
                <Icon name={item.icon} size={18} className={styles.icon} />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
