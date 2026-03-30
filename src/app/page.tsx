'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Shield, Globe, Cpu } from 'lucide-react';
import PostCard from '@/components/PostCard';
import { PostCardSkeleton } from '@/components/Skeleton';
import CategoryBadge from '@/components/CategoryBadge';
import { posts, getFeaturedPosts } from '@/data/posts';
import { CATEGORIES } from '@/lib/utils';
import AIIdeaGenerator from '@/components/AIIdeaGenerator';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  AI: <Cpu className="w-5 h-5" />,
  'Web Dev': <Globe className="w-5 h-5" />,
  Apps: <Sparkles className="w-5 h-5" />,
  Cybersecurity: <Shield className="w-5 h-5" />,
  DevOps: <TrendingUp className="w-5 h-5" />,
};

const CATEGORY_DESC: Record<string, string> = {
  AI: 'LLMs, agents, prompt engineering',
  'Web Dev': 'React, Next.js, CSS, performance',
  Apps: 'Mobile, desktop, cross-platform',
  Cybersecurity: 'Auth, zero trust, pen testing',
  DevOps: 'Docker, K8s, CI/CD pipelines',
};

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const featured = getFeaturedPosts();
  const recent = posts.slice(0, 6);

  useEffect(() => {
    // Simulate loading state for skeleton demo
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="pt-16">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-brand-400/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                bg-brand-50 dark:bg-brand-950/50
                border border-brand-200 dark:border-brand-800
                text-brand-700 dark:text-brand-300 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              New posts every week
            </motion.div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Where developers{' '}
              <span className="relative">
                <span className="gradient-text">wander</span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-400 to-blue-500 rounded-full" />
              </span>{' '}
              and{' '}
              <em className="not-italic text-gray-400 dark:text-gray-500">find answers</em>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-xl">
              Deep dives into AI, web development, apps, and security.
              Written by developers, for developers. No paywalls, no fluff.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                  bg-brand-500 hover:bg-brand-600 text-white font-medium
                  shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40
                  transition-all duration-200 hover:-translate-y-0.5"
              >
                Browse Articles
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#ai-tool"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                  bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700
                  text-gray-700 dark:text-gray-200 font-medium
                  border border-gray-200 dark:border-gray-700
                  transition-all duration-200 hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-brand-500" />
                AI Idea Generator
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 mt-10 text-sm text-gray-500 dark:text-gray-400">
              {[
                { value: `${posts.length}+`, label: 'Articles' },
                { value: '5', label: 'Categories' },
                { value: '100%', label: 'Free forever' },
              ].map(stat => (
                <div key={stat.label} className="flex items-center gap-1.5">
                  <span className="font-bold text-gray-900 dark:text-gray-100 text-base">{stat.value}</span>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section className="py-12 border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {Object.entries(CATEGORY_DESC).map(([cat, desc], i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <Link
                  href={`/blog?category=${cat}`}
                  className="flex flex-col gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-800
                    hover:border-brand-300 dark:hover:border-brand-700 bg-gray-50 dark:bg-gray-800/50
                    hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 group"
                >
                  <div className="text-gray-500 dark:text-gray-400 group-hover:text-brand-500 transition-colors">
                    {CATEGORY_ICONS[cat]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-800 dark:text-gray-200">{cat}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 leading-snug">{desc}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Posts ─── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-mono text-brand-500 uppercase tracking-widest mb-1">Featured</p>
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                Editors&apos; picks
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-1 text-sm text-brand-500 hover:text-brand-600 font-medium transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(3)].map((_, i) => <PostCardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── AI Idea Generator ─── */}
      <section id="ai-tool" className="py-16 bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <p className="text-xs font-mono text-brand-500 uppercase tracking-widest mb-1">AI-Powered</p>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              Blog Idea Generator
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
              Stuck on what to write next? Describe your interest and our AI will suggest a blog idea with outline.
            </p>
          </div>
          <AIIdeaGenerator />
        </div>
      </section>

      {/* ─── Recent Posts ─── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-mono text-brand-500 uppercase tracking-widest mb-1">Latest</p>
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                Recent articles
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-1 text-sm text-brand-500 hover:text-brand-600 font-medium transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recent.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-500 to-blue-600 p-10 sm:p-14 text-center"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Start reading today
              </h2>
              <p className="text-brand-100 mb-8 max-w-md mx-auto">
                Hundreds of tutorials and deep dives, completely free. No account required.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                  bg-white text-brand-600 font-semibold
                  hover:bg-brand-50 transition-colors duration-150
                  shadow-lg"
              >
                Browse all articles
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
