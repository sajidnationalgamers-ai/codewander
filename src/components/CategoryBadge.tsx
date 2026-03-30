import { cn, CATEGORY_COLORS } from '@/lib/utils';

interface CategoryBadgeProps {
  category: string
  active: boolean
  onClick: () => void
}

export default function CategoryBadge({ category, active = false, onClick }: CategoryBadgeProps) {
  const base = 'px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 cursor-pointer select-none';

  if (active) {
    return (
      <button
        onClick={onClick}
        className={cn(
          base,
          'bg-brand-500 text-white border-brand-500 shadow-sm shadow-brand-500/30'
        )}
      >
        {category}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        base,
        category === 'All'
          ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-brand-400'
          : cn(CATEGORY_COLORS[category], 'hover:opacity-80'),
      )}
    >
      {category}
    </button>
  );
}
