// Default categories for events

export const DEFAULT_CATEGORIES = [
  'Work',
  'Health',
  'Leisure',
  'Transport',
  'Social',
  'Personal',
  'Other',
] as const;

export type Category = typeof DEFAULT_CATEGORIES[number];

export const CATEGORY_ICONS: Record<string, string> = {
  Work: '💼',
  Health: '🏋️',
  Leisure: '🎮',
  Transport: '🚗',
  Social: '👥',
  Personal: '🏠',
  Other: '📝',
};

export const CATEGORY_COLORS: Record<string, string> = {
  Work: '#4A90E2',
  Health: '#7ED321',
  Leisure: '#F5A623',
  Transport: '#BD10E0',
  Social: '#50E3C2',
  Personal: '#B8E986',
  Other: '#9013FE',
};
