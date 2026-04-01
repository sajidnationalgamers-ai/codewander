'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Globe, Cpu, TrendingUp, ChevronRight } from 'lucide-react';
import PostCard from '@/components/PostCard';
import { PostCardSkeleton } from '@/components/Skeleton';
import { posts, getFeaturedPosts } from '@/data/posts';
import AIIdeaGenerator from '@/components/AIIdeaGenerator';
import ParticleNetwork from '@/components/ParticleNetwork';

// Marquee words
const MARQUEE_ITEMS = [
  '✦ AI', '✦ Next.js', '✦ TypeScript', '✦ Cybersecurity',
  '✦ Docker', '✦ React', '✦ DevOps', '✦ Web Dev',
  '✦ AI', '✦ Next.js', '✦ TypeScript', '✦ Cybersecurity',
  '✦ Docker', '✦ React', '✦ DevOps', '✦ Web Dev',
];

const CATEGORIES = [
  { icon: Cpu, label: 'AI', desc: 'LLMs, agents, prompt engineering', color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-950/30', border: 'border-violet-200 dark:border-violet-800' },
  { icon: Globe, label: 'Web Dev', desc: 'React, Next.js, CSS, performance', color: 'text-brand-500', bg: 'bg-brand-50 dark:bg-brand-950/30', border: 'border-brand-200 dark:border-brand-800' },
  { icon: Shield, label: 'Cybersecurity', desc: 'Auth, zero trust, pen testing', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/30', border: 'border-red-200 dark:border-red-800' },
  { icon: TrendingUp, label: 'DevOps', desc: 'Docker, K8s, CI/CD pipelines', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/30', border: 'border-orange-200 dark:border-orange-800' },
  { icon: Sparkles, label: 'Apps', desc: 'Mobile, desktop, cross-platform', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30', border: 'border-blue-200 dark:border-blue-800' },
];

// Rotating words for hero
const ROTATING_WORDS = ['wander', 'explore', 'build', 'ship', 'learn'];

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const featured = getFeaturedPosts();
  const recent = posts.slice(0, 6);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % ROTATING_WORDS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-16">

      {/* ─── Hero ─── */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center overflow-hidden">

        {/* Background layers */}
        <div className="absolute inset-0 dot-bg opacity-60 dark:opacity-30" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-400/8 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/6 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/4 rounded-full blur-[120px]" />
        </div>
        <ParticleNetwork />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20 w-full"
        >
          <div className="max-w-4xl">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm
                border border-brand-200/60 dark:border-brand-800/60
                text-brand-700 dark:text-brand-300 text-sm font-medium mb-8
                shadow-sm shadow-brand-500/10"
            >
              <span className="pulse-ring w-2 h-2 rounded-full bg-brand-500 flex-shrink-0" />
              New posts every week — Free forever
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Where developers{' '}
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 20, rotateX: -30 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20, rotateX: 30 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="shimmer-text inline-block"
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-400 to-blue-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
              <br />
              <em className="not-italic text-gray-400 dark:text-gray-600">and find answers</em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-2xl"
            >
              Deep dives into AI, web development, apps, and security.
              Written by developers, for developers. No paywalls, no fluff.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              <Link
                href="/blog"
                className="btn-magnetic inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl
                  bg-brand-500 hover:bg-brand-600 text-white font-semibold text-base
                  shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50
                  transition-all duration-200 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600 skew-x-12" />
                Browse Articles
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="#ai-tool"
                className="btn-magnetic inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl
                  bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800
                  text-gray-800 dark:text-gray-200 font-semibold text-base
                  border border-gray-200 dark:border-gray-700
                  shadow-sm transition-all duration-200"
              >
                <Sparkles className="w-4 h-4 text-brand-500" />
                AI Idea Generator
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap items-center gap-8"
            >
              {[
                { value: `${posts.length}+`, label: 'Articles' },
                { value: '5', label: 'Categories' },
                { value: '100%', label: 'Free forever' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-baseline gap-1.5"
                >
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100"
                    style={{ fontFamily: 'var(--font-display)' }}>
                    {stat.value}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── Marquee ─── */}
      <div className="py-5 border-y border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm overflow-hidden">
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="mx-8 text-sm font-mono text-gray-400 dark:text-gray-600 whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─── Categories ─── */}
      <section className="py-16 bg-white dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <p className="text-xs font-mono text-brand-500 uppercase tracking-widest mb-1">Browse by topic</p>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              What we cover
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <Link
                  href={`/blog?category=${cat.label}`}
                  className={`flex flex-col gap-2.5 p-4 rounded-2xl border ${cat.border} ${cat.bg}
                    hover:shadow-lg transition-all duration-200 group`}
                >
                  <div className={`${cat.color} group-hover:scale-110 transition-transform duration-200 w-fit`}>
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-800 dark:text-gray-200">{cat.label}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 leading-snug">{cat.desc}</div>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <p className="text-xs font-mono text-brand-500 uppercase tracking-widest mb-1">Featured</p>
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                Editors&apos; picks
              </h2>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center gap-1 text-sm text-brand-500 hover:text-brand-600 font-medium transition-colors hover-underline">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

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
      <section id="ai-tool" className="py-16 bg-white dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
              bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800
              text-brand-700 dark:text-brand-300 text-xs font-medium mb-3">
              <Sparkles className="w-3 h-3" />
              Powered by AI
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              Blog Idea Generator
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
              Stuck on what to write? Describe your interest and AI will suggest a complete blog idea.
            </p>
          </motion.div>
          <AIIdeaGenerator />
        </div>
      </section>

      {/* ─── Recent Posts ─── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <p className="text-xs font-mono text-brand-500 uppercase tracking-widest mb-1">Latest</p>
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                Recent articles
              </h2>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center gap-1 text-sm text-brand-500 hover:text-brand-600 font-medium transition-colors hover-underline">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden p-12 sm:p-16 text-center"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500 via-teal-500 to-blue-600" />
            <div className="absolute inset-0 dot-bg opacity-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />

            {/* Floating orbs */}
            <div className="absolute top-8 left-8 w-32 h-32 bg-white/10 rounded-full blur-2xl float" />
            <div className="absolute bottom-8 right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl float" style={{ animationDelay: '-3s' }} />

            <div className="relative">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Start reading today
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/80 text-lg mb-8 max-w-md mx-auto"
              >
                Hundreds of tutorials and deep dives, completely free. No account required.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/blog"
                  className="btn-magnetic inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                    bg-white text-brand-600 font-bold text-base
                    hover:bg-brand-50 transition-colors shadow-xl shadow-black/20"
                >
                  Browse all articles
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}