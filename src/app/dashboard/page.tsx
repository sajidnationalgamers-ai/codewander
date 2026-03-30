'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PenLine, Eye, BarChart3, FileText, TrendingUp,
  Plus, Check, Loader2, Clock, Users
} from 'lucide-react';
import { posts } from '@/data/posts';
import { CATEGORIES, CATEGORY_COLORS, cn } from '@/lib/utils';
import Link from 'next/link';

const STATS = [
  { label: 'Total Posts', value: posts.length, icon: FileText, color: 'text-brand-500', bg: 'bg-brand-50 dark:bg-brand-950/30' },
  { label: 'Total Reads', value: '12.4k', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
  { label: 'Avg. Read Time', value: '7 min', icon: Clock, color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-950/30' },
  { label: 'This Month', value: '+3', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/30' },
];

type Tab = 'overview' | 'new-post' | 'posts';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <p className="text-xs font-mono text-brand-500 uppercase tracking-widest mb-1">Admin</p>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            Dashboard
          </h1>
        </motion.div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-8 border-b border-gray-200 dark:border-gray-800">
          {[
            { id: 'overview' as Tab, label: 'Overview', icon: BarChart3 },
            { id: 'new-post' as Tab, label: 'New Post', icon: Plus },
            { id: 'posts' as Tab, label: 'All Posts', icon: FileText },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all -mb-px',
                activeTab === tab.id
                  ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'new-post' && <NewPostTab />}
        {activeTab === 'posts' && <AllPostsTab />}
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-8">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5"
          >
            <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center mb-3', stat.bg)}>
              <stat.icon className={cn('w-4 h-4', stat.color)} />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent posts list */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">Recent Posts</h2>
          <button
            onClick={() => {}}
            className="text-xs text-brand-500 hover:text-brand-600 font-medium"
          >
            View all →
          </button>
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          {posts.slice(0, 5).map((post, i) => (
            <div
              key={post.slug}
              className={cn(
                'flex items-center justify-between gap-4 px-5 py-4',
                i !== 0 && 'border-t border-gray-100 dark:border-gray-800'
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={cn(
                  'w-2 h-2 rounded-full flex-shrink-0',
                  post.category === 'AI' && 'bg-violet-500',
                  post.category === 'Web Dev' && 'bg-brand-500',
                  post.category === 'Apps' && 'bg-blue-500',
                  post.category === 'Cybersecurity' && 'bg-red-500',
                  post.category === 'DevOps' && 'bg-orange-500',
                )} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{post.title}</p>
                  <p className="text-xs text-gray-400">{post.publishedAt} · {post.readTime} min</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={cn(
                  'hidden sm:block text-xs px-2 py-0.5 rounded-full border',
                  CATEGORY_COLORS[post.category]
                )}>
                  {post.category}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-brand-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category breakdown */}
      <div>
        <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Posts by Category</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {(['AI', 'Web Dev', 'Apps', 'Cybersecurity', 'DevOps'] as const).map(cat => {
            const count = posts.filter(p => p.category === cat).length;
            const pct = Math.round((count / posts.length) * 100);
            return (
              <div key={cat} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={cn('text-xs px-2 py-0.5 rounded-full border', CATEGORY_COLORS[cat])}>{cat}</span>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{count}</span>
                </div>
                <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="h-full bg-brand-500 rounded-full"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">{pct}% of all posts</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NewPostTab() {
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Web Dev',
    tags: '',
    featured: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);

  const handleChange = (field: string, value: string | boolean) => {
    setForm(f => ({ ...f, [field]: value }));
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.excerpt || !form.content) {
      setError('Title, excerpt, and content are required.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error('Failed to save');
      setSuccess(true);
      setForm({ title: '', excerpt: '', content: '', category: 'Web Dev', tags: '', featured: false });
    } catch {
      setError('Failed to save post. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl"
    >
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <PenLine className="w-4 h-4 text-brand-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">New Article</span>
          </div>
          <button
            onClick={() => setPreview(!preview)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
              preview
                ? 'bg-brand-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            {preview ? 'Edit' : 'Preview'}
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
              Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={e => handleChange('title', e.target.value)}
              placeholder="Your compelling article title..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
                bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400
                text-sm transition-all"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
              Excerpt *
            </label>
            <textarea
              value={form.excerpt}
              onChange={e => handleChange('excerpt', e.target.value)}
              placeholder="A short summary of the article (1-2 sentences)..."
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
                bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400
                text-sm resize-none transition-all"
            />
          </div>

          {/* Category + Tags */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Category *
              </label>
              <select
                value={form.category}
                onChange={e => handleChange('category', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
                  bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm transition-all"
              >
                {CATEGORIES.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={e => handleChange('tags', e.target.value)}
                placeholder="React, TypeScript, API..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
                  bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                  placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400
                  text-sm transition-all"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
              Content (Markdown) *
            </label>
            <textarea
              value={form.content}
              onChange={e => handleChange('content', e.target.value)}
              placeholder="## Introduction&#10;&#10;Write your article in Markdown...&#10;&#10;```javascript&#10;const hello = 'world';&#10;```"
              rows={14}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
                bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400
                text-sm font-mono resize-y transition-all"
            />
          </div>

          {/* Featured toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => handleChange('featured', !form.featured)}
              className={cn(
                'w-10 h-5 rounded-full transition-colors relative',
                form.featured ? 'bg-brand-500' : 'bg-gray-200 dark:bg-gray-700'
              )}
            >
              <div className={cn(
                'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform',
                form.featured ? 'translate-x-5' : 'translate-x-0.5'
              )} />
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Mark as featured</span>
          </label>

          {/* Feedback */}
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 text-sm flex items-center gap-2">
              <Check className="w-4 h-4" />
              Post saved successfully! (In production this would write to MongoDB)
            </div>
          )}

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600',
                'text-white text-sm font-medium shadow-sm transition-all',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {submitting ? 'Saving...' : 'Publish Post'}
            </button>
            <button
              onClick={() => setForm({ title: '', excerpt: '', content: '', category: 'Web Dev', tags: '', featured: false })}
              className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
                text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AllPostsTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">All Posts ({posts.length})</h2>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {posts.map(post => (
            <div key={post.slug} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate mb-1">{post.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{post.excerpt}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className={cn('text-xs px-2 py-0.5 rounded-full border', CATEGORY_COLORS[post.category])}>
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.publishedAt}</span>
                  <span className="text-xs text-gray-400">{post.readTime} min read</span>
                  {post.featured && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
                      Featured
                    </span>
                  )}
                </div>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="flex-shrink-0 p-2 rounded-lg text-gray-400 hover:text-brand-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Eye className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
