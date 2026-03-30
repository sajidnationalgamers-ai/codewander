'use client';

import { motion } from 'framer-motion';
import { Zap, Target, Users, BookOpen, Code, Shield, Cpu, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const topics = [
  { icon: Cpu, label: 'Artificial Intelligence', desc: 'LLMs, agents, prompt engineering', color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-950/30', border: 'border-violet-200 dark:border-violet-800' },
  { icon: Globe, label: 'Web Development', desc: 'React, Next.js, CSS, performance', color: 'text-brand-500', bg: 'bg-brand-50 dark:bg-brand-950/30', border: 'border-brand-200 dark:border-brand-800' },
  { icon: Code, label: 'Apps & Mobile', desc: 'Mobile, desktop, cross-platform', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30', border: 'border-blue-200 dark:border-blue-800' },
  { icon: Shield, label: 'Cybersecurity', desc: 'Auth, zero trust, pen testing', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/30', border: 'border-red-200 dark:border-red-800' },
];

const values = [
  {
    icon: BookOpen,
    title: 'Free Forever',
    desc: 'All content on CodeWander is completely free. No paywalls, no subscriptions, no hidden fees.',
    color: 'text-brand-500',
    bg: 'bg-brand-50 dark:bg-brand-950/30',
  },
  {
    icon: Target,
    title: 'Practical First',
    desc: 'Every article is written with real-world use cases in mind. No fluff, just working code and clear explanations.',
    color: 'text-violet-500',
    bg: 'bg-violet-50 dark:bg-violet-950/30',
  },
  {
    icon: Users,
    title: 'For Developers',
    desc: 'Written by developers, for developers. We speak your language and understand your problems.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
  },
];

const stats = [
  { value: '6+', label: 'Articles Published' },
  { value: '5', label: 'Tech Categories' },
  { value: '100%', label: 'Free Content' },
  { value: '2026', label: 'Year Founded' },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-brand-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-500" />
            Our Story
          </motion.div>

          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-400 to-blue-500 flex items-center justify-center shadow-2xl shadow-brand-500/30"
            >
              <Zap className="w-10 h-10 text-white" strokeWidth={2.5} />
            </motion.div>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 text-gray-900 dark:text-gray-100 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            About{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-blue-500">
              CodeWander
            </span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
            A free tech blog built for developers who love to learn, build, and ship real things.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.06 }}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 text-center"
            >
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* What is CodeWander */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 mb-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100" style={{ fontFamily: 'var(--font-display)' }}>
            What is CodeWander?
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[1.05rem]">
              CodeWander is a technical blog dedicated to helping developers grow their skills. We publish in-depth tutorials, guides, and articles covering the most important topics in modern software development.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[1.05rem]">
              Whether you are just starting your coding journey or are an experienced engineer looking to stay up to date — CodeWander has something for you. Our content is always practical, always free, and always focused on helping you build real things.
            </p>
          </div>
        </motion.div>

        {/* Topics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 mb-6"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100" style={{ fontFamily: 'var(--font-display)' }}>
            What We Cover
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topics.map((topic, i) => (
              <motion.div
                key={topic.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.07 }}
                className={`flex items-start gap-4 p-4 rounded-xl border ${topic.border} ${topic.bg}`}
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-900 flex items-center justify-center shadow-sm flex-shrink-0">
                  <topic.icon className={`w-5 h-5 ${topic.color}`} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{topic.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{topic.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 mb-6"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100" style={{ fontFamily: 'var(--font-display)' }}>
            Our Values
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.07 }}
                className="flex flex-col gap-3"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${value.bg}`}>
                  <value.icon className={`w-5 h-5 ${value.color}`} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{value.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-500 to-blue-600 p-10 text-center"
        >
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.07)_0%,transparent_100%)]" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Our Mission
            </h2>
            <p className="text-brand-100 leading-relaxed max-w-xl mx-auto mb-8">
              To make high-quality tech education accessible to every developer, regardless of their background or budget. Code has the power to change lives — and CodeWander exists to help more people unlock that power.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-600 font-semibold text-sm hover:bg-brand-50 transition-colors shadow-lg"
            >
              Start Reading
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}