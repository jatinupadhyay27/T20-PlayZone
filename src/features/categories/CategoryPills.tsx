import categoriesData from '@/data/categories.json';
import type { SportCategory } from '@/types/category';
import { openWhatsAppChat } from '@/services/whatsappService';
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
            <button
              type="button"
              className={`${styles.pill} ${styles[category.variant]}`}
              onClick={() =>
                openWhatsAppChat(
                  undefined,
                  `Hi! I'm interested in ${category.label}. Could you share the available options and help me get started?`,
                )
              }
            >
              <Icon name={category.icon} size={20} />
              <span>{category.label}</span>
            </button>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
