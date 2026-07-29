import type { IconType } from 'react-icons';
import {
  FaStar,
  FaFutbol,
  FaTableTennis,
  FaHorseHead,
  FaDog,
  FaDice,
  FaChartLine,
  FaSlidersH,
  FaVideo,
  FaBars,
  FaSyncAlt,
} from 'react-icons/fa';
import { GiCricketBat, GiCardAceSpades, GiRunningShoe } from 'react-icons/gi';
import { MdSportsCricket, MdSportsHandball } from 'react-icons/md';

const ICON_MAP: Record<string, IconType> = {
  star: FaStar,
  kabaddi: MdSportsHandball,
  cricket: GiCricketBat,
  football: FaFutbol,
  tennis: FaTableTennis,
  horseracing: FaHorseHead,
  greyhound: FaDog,
  cards: GiCardAceSpades,
  sportsbook: MdSportsCricket,
  casino: FaDice,
  binary: FaChartLine,
  slots: GiRunningShoe,
  filter: FaSlidersH,
  live: FaVideo,
  menu: FaBars,
  refresh: FaSyncAlt,
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export default function Icon({ name, size = 16, className }: IconProps) {
  const IconComponent = ICON_MAP[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} className={className} aria-hidden="true" />;
}
