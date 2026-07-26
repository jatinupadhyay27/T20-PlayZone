import { Link } from 'react-router-dom';
import categoriesData from '@/data/categories.json';
import type { SportCategory } from '@/types/category';
import Icon from '@/components/common/Icon';
import Reveal from '@/components/common/Reveal';
import styles from './CategoryPills.module.css';

const categories = categoriesData as SportCategory[];

export default function CategoryPills() {
  return (
    <ul className={styles.list} aria-label="Sport categories">
      {categories.map((category, index) => (
        <li key={category.id}>
          <Reveal delay={index * 60} className={styles.item}>
            <Link to={category.href} className={`${styles.pill} ${styles[category.variant]}`}>
              <Icon name={category.icon} size={20} />
              <span>{category.label}</span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
