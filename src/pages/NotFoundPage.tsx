import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section>
      <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700 }}>
        Page not found
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-3)' }}>
        <Link to="/" style={{ color: 'var(--color-primary)' }}>
          Go back home
        </Link>
      </p>
    </section>
  );
}
