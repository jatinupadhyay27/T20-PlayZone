import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/features/header/Header';
import Sidebar from '@/features/sidebar/Sidebar';
import WhatsAppButton from '@/features/whatsapp/WhatsAppButton';
import Marquee from '@/components/common/Marquee';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className={styles.layout}>
      <Header />
      <Marquee text="🎉 LIMITED-TIME OFFER: Deposit 2,500 & Get 5% Bonus | Deposit 5,000 & Get 10% Bonus 🔥" />
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
