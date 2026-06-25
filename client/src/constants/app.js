export const APP_NAME = 'CodeRevise AI';
import {
  LayoutDashboard,
  BookOpen,
  CirclePlus,
  Brain,
  CalendarClock,
  History,
} from 'lucide-react';
export const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Problems',
    href: '/problems',
    icon: BookOpen,
  },
  {
    label: 'Add Problem',
    href: '/problems/new',
    icon: CirclePlus,
  },
  {
    label: 'Revision Queue',
    href: '/revisions',
    icon: Brain,
  },
  {
    label: 'Due Today',
    href: '/due-today',
    icon: CalendarClock,
  },
  {
    label: 'Revision Sessions',
    href: '/revision-sessions',
    icon: History,
  },
];