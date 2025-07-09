export type Theme = 'blue' | 'green' | 'purple';

export const themeColors: Record<Theme, {
  border: string;
  title: string;
  heading: string;
}> = {
  blue: {
    border: '#3b82f6',
    title: '#2563eb',
    heading: '#3b82f6',
  },
  green: {
    border: '#10b981',
    title: '#059669',
    heading: '#10b981',
  },
  purple: {
    border: '#8b5cf6',
    title: '#7c3aed',
    heading: '#8b5cf6',
  },
};

