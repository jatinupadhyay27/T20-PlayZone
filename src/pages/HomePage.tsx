import Hero from '@/features/hero/Hero';
import CategoryPills from '@/features/categories/CategoryPills';
import LiveMatches from '@/features/liveMatches/LiveMatches';
import GamesShowcase from '@/features/casino/GamesShowcase';
import About from '@/features/about/About';
import Footer from '@/features/footer/Footer';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryPills />
      <LiveMatches />
      <GamesShowcase />
      <About />
      <Footer />
    </>
  );
}
