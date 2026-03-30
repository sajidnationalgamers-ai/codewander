'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ArrowLeft, Clock, Calendar, Tag, Share2, Copy, Check, Sparkles } from 'lucide-react';
import { Post } from '@/types';
import { formatDate, cn, CATEGORY_COLORS } from '@/lib/utils';
import PostCard from '@/components/PostCard';

interface Props {
  post: Post | null;
  related: Post[];
  isAIGenerated?: boolean;
  slug?: string;
}

export default function BlogPostClient({ post: initialPost, related, isAIGenerated, slug }: Props) {
  const [post, setPost] = useState<Post | null>(initialPost);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(isAIGenerated && !initialPost);

  useEffect(() => {
    if (isAIGenerated && !initialPost && slug) {
      // Load AI generated blog from sessionStorage
      const stored = sessionStorage.getItem(`ai-blog-${slug}`);
      if (stored) {
        setPost(JSON.parse(stored));
      }
      setLoading(false);
    }
  }, [isAIGenerated, initialPost, slug]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-2xl font-bold mb-3">Post not found</h1>
          <Link href="/blog" className="text-brand-500 hover:text-brand-600">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400
              hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10">
          <article>
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              {/* AI Generated Badge */}
              {isAIGenerated && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                  bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800
                  text-brand-700 dark:text-brand-300 text-xs font-medium mb-4">
                  <Sparkles className="w-3 h-3" />
                  AI Generated Content
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={cn(
                  'text-xs font-medium px-2.5 py-1 rounded-full border',
                  CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-600 border-gray-200'
                )}>
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {post.readTime} min read
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  {formatDate(post.publishedAt)}
                </span>
              </div>

              <h1
                className="text-3xl sm:text-4xl font-bold leading-snug mb-4 text-gray-900 dark:text-gray-100"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {post.title}
              </h1>

              <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between flex-wrap gap-4 py-4 border-y border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    {post.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{post.author.name}</p>
                    <p className="text-xs text-gray-500">{post.author.bio}</p>
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-500 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-brand-500" /> : <Share2 className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Share'}
                </button>
              </div>
            </motion.header>

            {/* Markdown content */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="prose-custom"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code(props) {
                    const { children, className } = props;
                    const match = /language-(\w+)/.exec(className || '');
                    if (!match) {
                      return (
                        <code className="font-mono text-sm bg-gray-100 dark:bg-gray-800 text-brand-600 dark:text-brand-400 px-1.5 py-0.5 rounded">
                          {children}
                        </code>
                      );
                    }
                    return (
                      <div className="relative group my-6">
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{ borderRadius: '0.75rem', fontSize: '0.84rem', margin: 0, padding: '1.5rem' }}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </div>
                    );
                  },
                  h2: ({ children }) => <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-gray-100" style={{ fontFamily: 'var(--font-display)' }}>{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">{children}</h3>,
                  p: ({ children }) => <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5 text-[1.05rem]">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-6 mb-5 text-gray-700 dark:text-gray-300 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-6 mb-5 text-gray-700 dark:text-gray-300 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                  a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:text-brand-600 underline underline-offset-2">{children}</a>,
                  blockquote: ({ children }) => <blockquote className="border-l-4 border-brand-400 pl-4 py-1 my-6 italic text-gray-600 dark:text-gray-400">{children}</blockquote>,
                }}
              >
                {post.content}
              </ReactMarkdown>
            </motion.div>

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-gray-400" />
                {post.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/blog?q=${tag}`}
                    className="text-sm px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800
                      text-gray-600 dark:text-gray-300 font-mono hover:bg-brand-50 dark:hover:bg-brand-950/30
                      hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">In this article</h3>
                <div className="space-y-2">
                  {post.content.split('\n').filter(l => l.startsWith('## ')).map(l => l.replace('## ', '')).map((heading, i) => (
                    <p key={i} className="text-xs text-gray-500 dark:text-gray-400 hover:text-brand-500 cursor-pointer transition-colors pl-2 border-l-2 border-transparent hover:border-brand-400">
                      {heading}
                    </p>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Share this post</h3>
                <button
                  onClick={handleCopy}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                    bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300
                    hover:bg-brand-50 dark:hover:bg-brand-950/30 hover:text-brand-600 dark:hover:text-brand-400
                    transition-colors font-medium"
                >
                  {copied ? <Check className="w-4 h-4 text-brand-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Link copied!' : 'Copy link'}
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>Related articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p, i) => (
                <PostCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}