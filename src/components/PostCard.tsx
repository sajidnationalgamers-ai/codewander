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

export default function PostCard({ post, featured = false, index = 0 }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          'group flex flex-col h-full rounded-2xl border bg-white dark:bg-gray-900',
          'border-gray-200 dark:border-gray-800',
          'hover:border-brand-300 dark:hover:border-brand-700',
          'transition-all duration-300 hover:-translate-y-1',
          'hover:shadow-xl hover:shadow-brand-500/5',
          'overflow-hidden',
          featured && 'md:flex-row'
        )}
      >
        {/* Category stripe */}
        <div className={cn(
          'h-1 w-full flex-shrink-0',
          featured && 'md:h-full md:w-1'
        )}>
          <div className={cn(
            'h-full w-full',
            post.category === 'AI' && 'bg-gradient-to-r from-violet-500 to-purple-600',
            post.category === 'Web Dev' && 'bg-gradient-to-r from-brand-400 to-teal-500',
            post.category === 'Apps' && 'bg-gradient-to-r from-blue-500 to-cyan-500',
            post.category === 'Cybersecurity' && 'bg-gradient-to-r from-red-500 to-rose-600',
            post.category === 'DevOps' && 'bg-gradient-to-r from-orange-500 to-amber-500',
          )} />
        </div>

        <div className="flex flex-col flex-1 p-5 sm:p-6">
          {/* Meta */}
          <div className="flex items-center gap-2 mb-3">
            <span className={cn(
              'text-xs font-medium px-2.5 py-1 rounded-full border',
              CATEGORY_COLORS[post.category]
            )}>
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              {post.readTime} min
            </span>
          </div>

          {/* Title */}
          <h3 className={cn(
            'font-bold leading-tight mb-2 text-gray-900 dark:text-gray-100',
            'group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors',
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
                className="text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800
                  text-gray-500 dark:text-gray-400 font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-400 to-blue-500 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{post.author.name}</p>
                <p className="text-xs text-gray-400">{formatDate(post.publishedAt)}</p>
              </div>
            </div>
            <ArrowUpRight
              className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-brand-500
                group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
