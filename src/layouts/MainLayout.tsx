import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/features/header/Header';
import Sidebar from '@/features/sidebar/Sidebar';
import WhatsAppButton from '@/features/whatsapp/WhatsAppButton';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.content}>
          <div key={location.pathname} className={`pageFade ${styles.pageInner}`}>
            <Outlet />
          </div>
        </main>
      </div>
      <WhatsAppButton />
    </div>
  );
}
