'use client';

import { useState } from 'react';
import { Sparkles, Loader2, Tag, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { cn, CATEGORY_COLORS } from '@/lib/utils';

interface BlogIdea {
  title: string;
  outline: string[];
  category: string;
  tags: string[];
}

export default function AIIdeaGenerator() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [idea, setIdea] = useState<BlogIdea | null>(null);
  const [error, setError] = useState('');
  const [outlineOpen, setOutlineOpen] = useState(true);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setIdea(null);

    try {
      const res = await fetch('/api/generate-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate idea');
      setIdea(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      {/* Input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleGenerate()}
            placeholder="e.g. 'React server components', 'API security', 'Flutter animations'..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent
              text-sm transition-all"
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading || !input.trim()}
          className={cn(
            'flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm',
            'bg-brand-500 hover:bg-brand-600 text-white',
            'shadow-sm shadow-brand-500/20',
            'transition-all duration-150 hover:-translate-y-0.5',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0'
          )}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          Generate
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Idea result */}
      {idea && (
        <div className="mt-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-brand-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Suggested title</p>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                  {idea.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Meta */}
          <div className="px-5 py-3 flex flex-wrap items-center gap-3 border-b border-gray-100 dark:border-gray-800">
            <span className={cn(
              'text-xs font-medium px-2.5 py-1 rounded-full border',
              CATEGORY_COLORS[idea.category] || 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
            )}>
              {idea.category}
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Tag className="w-3 h-3 text-gray-400" />
              {idea.tags.map(tag => (
                <span key={tag} className="text-xs font-mono text-gray-500 dark:text-gray-400">#{tag}</span>
              ))}
            </div>
          </div>

          {/* Outline */}
          <div>
            <button
              onClick={() => setOutlineOpen(!outlineOpen)}
              className="w-full px-5 py-3 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <span className="flex items-center gap-2 font-medium">
                <BookOpen className="w-4 h-4" />
                Article outline
              </span>
              {outlineOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {outlineOpen && (
              <div className="px-5 pb-5">
                <ol className="space-y-2 pl-4">
                  {idea.outline.map((section, i) => (
                    <li key={i} className="text-sm text-gray-600 dark:text-gray-400 list-decimal">
                      {section}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
