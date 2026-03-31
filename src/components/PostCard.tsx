import Link from 'next/link';
import { Clock, ArrowUpRight } from 'lucide-react';
import { Post } from '@/types';
import { cn, formatDate, CATEGORY_COLORS } from '@/lib/utils';
import { motion } from 'framer-motion';

interface PostCardProps {
  post: Post;
  featured?: boolean;
  index?: number;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  AI: 'from-violet-500 to-purple-600',
  'Web Dev': 'from-brand-400 to-teal-500',
  Apps: 'from-blue-500 to-cyan-500',
  Cybersecurity: 'from-red-500 to-rose-600',
  DevOps: 'from-orange-500 to-amber-500',
};

export default function PostCard({ post, featured = false, index = 0 }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
      className="h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          'group flex flex-col h-full rounded-2xl border',
          'bg-white dark:bg-gray-900/80',
          'border-gray-200/80 dark:border-gray-800/80',
          'hover:border-brand-300/60 dark:hover:border-brand-700/60',
          'transition-all duration-300 hover:-translate-y-2',
          'hover:shadow-2xl hover:shadow-brand-500/8 dark:hover:shadow-brand-500/5',
          'overflow-hidden relative',
          featured && 'md:flex-row'
        )}
      >
        {/* Animated gradient top border */}
        <div className={cn(
          'h-[2px] w-full flex-shrink-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          CATEGORY_GRADIENTS[post.category] ?? 'from-brand-400 to-blue-500',
          featured && 'md:h-full md:w-[2px]'
        )} />

        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className={cn(
            'absolute top-0 left-0 right-0 h-32 bg-gradient-to-b opacity-5',
            post.category === 'AI' && 'from-violet-500',
            post.category === 'Web Dev' && 'from-brand-500',
            post.category === 'Apps' && 'from-blue-500',
            post.category === 'Cybersecurity' && 'from-red-500',
            post.category === 'DevOps' && 'from-orange-500',
          )} />
        </div>

        <div className="flex flex-col flex-1 p-5 sm:p-6 relative">
          {/* Meta */}
          <div className="flex items-center gap-2 mb-3">
            <span className={cn(
              'text-xs font-medium px-2.5 py-1 rounded-full border transition-colors',
              CATEGORY_COLORS[post.category]
            )}>
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              {post.readTime} min
            </span>
          </div>

          {/* Title with hover color */}
          <h3 className={cn(
            'font-bold leading-tight mb-2.5',
            'text-gray-900 dark:text-gray-100',
            'group-hover:text-brand-600 dark:group-hover:text-brand-400',
            'transition-colors duration-200',
            featured ? 'text-xl sm:text-2xl' : 'text-lg',
          )}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-md
                  bg-gray-100 dark:bg-gray-800
                  text-gray-500 dark:text-gray-400 font-mono
                  group-hover:bg-brand-50 dark:group-hover:bg-brand-950/30
                  group-hover:text-brand-600 dark:group-hover:text-brand-400
                  transition-colors duration-200"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className={cn(
                'w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold',
                'bg-gradient-to-br',
                CATEGORY_GRADIENTS[post.category] ?? 'from-brand-400 to-blue-500'
              )}>
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{post.author.name}</p>
                <p className="text-xs text-gray-400">{formatDate(post.publishedAt)}</p>
              </div>
            </div>

            {/* Arrow with animation */}
            <motion.div
              className="w-7 h-7 rounded-lg flex items-center justify-center
                bg-gray-100 dark:bg-gray-800
                group-hover:bg-brand-500 transition-colors duration-200"
              whileHover={{ rotate: 45 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors duration-200" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}