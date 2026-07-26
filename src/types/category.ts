export type CategoryVariant =
  | 'cricket'
  | 'football'
  | 'tennis'
  | 'horseracing'
  | 'greyhound';

export interface SportCategory {
  id: string;
  label: string;
  icon: string;
  variant: CategoryVariant;
  href: string;
}
