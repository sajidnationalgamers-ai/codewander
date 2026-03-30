'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import PostCard from '@/components/PostCard';
import CategoryBadge from '@/components/CategoryBadge';
import { PostCardSkeleton } from '@/components/Skeleton';
import { Post } from '@/types';
import { CATEGORIES } from '@/lib/utils';

export default function BlogPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get('category') ?? 'All'
  );

  const fetchPosts = useCallback(async (cat: string, q: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (cat !== 'All') params.set('category', cat);
      if (q) params.set('q', q);
      const res = await fetch(`/api/posts?${params}`);
      const data = await res.json();
      setPosts(data.posts ?? []);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchPosts(activeCategory, search);
    }, search ? 300 : 0);
    return () => clearTimeout(debounce);
  }, [activeCategory, search, fetchPosts]);

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setSearch('');
    const params = new URLSearchParams();
    if (cat !== 'All') params.set('category', cat);
    router.push(`/blog?${params}`, { scroll: false });
  };

  const clearSearch = () => setSearch('');

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-xs font-mono text-brand-500 uppercase tracking-widest mb-2">All Articles</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            The Blog
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {posts.length} article{posts.length !== 1 ? 's' : ''} on AI, web development, apps, and security.
          </p>
        </motion.div>

        {/* Search + Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100
                placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400
                transition-all"
            />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal className="w-4 h-4 text-gray-400 hidden sm:block" />
            {CATEGORIES.map(cat => (
              <CategoryBadge
                key={cat}
                category={cat}
                active={activeCategory === cat && !search}
                onClick={() => handleCategory(cat)}
              />
            ))}
          </div>
        </motion.div>

        {/* Posts grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <PostCardSkeleton key={i} />)}
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">No articles found</h3>
            <p className="text-sm text-gray-500">
              Try a different search term or category.
            </p>
            <button
              onClick={() => { clearSearch(); handleCategory('All'); }}
              className="mt-4 px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors"
            >
              Reset filters
            </button>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
