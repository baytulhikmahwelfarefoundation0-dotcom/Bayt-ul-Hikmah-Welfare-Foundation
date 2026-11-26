import {
  Accessibility,
  BookOpen,
  Briefcase,
  Droplets,
  HeartPulse,
  Home,
  Snowflake,
  Sparkles,
  Utensils,
} from 'lucide-react';
import type { ActivityItem } from '../data/foundationData';

interface ActivityIconProps {
  name: ActivityItem['iconName'];
  className?: string;
}

export function ActivityIcon({ name, className = 'h-5 w-5' }: ActivityIconProps) {
  switch (name) {
    case 'utensils':
      return <Utensils className={className} />;
    case 'book':
      return <BookOpen className={className} />;
    case 'heart-pulse':
      return <HeartPulse className={className} />;
    case 'droplets':
      return <Droplets className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'snowflake':
      return <Snowflake className={className} />;
    case 'briefcase':
      return <Briefcase className={className} />;
    case 'accessibility':
      return <Accessibility className={className} />;
    case 'home':
      return <Home className={className} />;
  }
}
