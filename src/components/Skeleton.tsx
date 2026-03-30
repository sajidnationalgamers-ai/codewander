import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'skeleton animate-pulse',
        className
      )}
    />
  );
}

export function PostCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="h-1 w-full bg-gray-100 dark:bg-gray-800" />
      <div className="p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
        <Skeleton className="h-7 w-full rounded-lg" />
        <Skeleton className="h-5 w-3/4 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-14 rounded-md" />
          <Skeleton className="h-5 w-14 rounded-md" />
          <Skeleton className="h-5 w-14 rounded-md" />
        </div>
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-24 rounded" />
            <Skeleton className="h-3 w-20 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="space-y-6 max-w-2xl">
      <Skeleton className="h-8 w-40 rounded-full" />
      <Skeleton className="h-16 w-full rounded-xl" />
      <Skeleton className="h-16 w-4/5 rounded-xl" />
      <Skeleton className="h-6 w-full rounded" />
      <Skeleton className="h-6 w-3/4 rounded" />
      <div className="flex gap-4">
        <Skeleton className="h-12 w-36 rounded-xl" />
        <Skeleton className="h-12 w-36 rounded-xl" />
      </div>
    </div>
  );
}
