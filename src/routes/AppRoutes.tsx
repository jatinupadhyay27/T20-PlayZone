import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/HomePage';
import EsportsPage from '@/pages/EsportsPage';
import IdProvidersPage from '@/pages/IdProvidersPage';
import T20PlayZonePage from '@/pages/T20PlayZonePage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import ComingSoonPage from '@/pages/ComingSoonPage';
import NotFoundPage from '@/pages/NotFoundPage';
import navigationData from '@/data/navigation.json';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/e-sports" element={<EsportsPage />} />
        <Route path="/id-providers" element={<IdProvidersPage />} />
        <Route path="/t20-play-zone" element={<T20PlayZonePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {navigationData.sidebarItems.map((item) => (
          <Route
            key={item.id}
            path={item.href}
            element={<ComingSoonPage title={item.label} icon={item.icon} />}
          />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
