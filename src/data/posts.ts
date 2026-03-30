import { Post } from '@/types';

export const posts: Post[] = [
  {
    slug: 'building-ai-apps-with-nextjs',
    title: 'Building Production AI Apps with Next.js 14 and Vercel AI SDK',
    excerpt: 'A deep dive into architecting scalable AI-powered applications using Next.js App Router, streaming responses, and the Vercel AI SDK.',
    content: `
## Introduction

Building AI-powered applications has never been more accessible. With Next.js 14 and the Vercel AI SDK, you can create production-ready apps in hours, not weeks.

## Setting Up the Project

First, create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-ai-app
cd my-ai-app
npm install ai openai
\`\`\`

## Creating Your First AI Route

\`\`\`typescript
// app/api/chat/route.ts
import { OpenAI } from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const client = new OpenAI();

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await client.chat.completions.create({
    model: 'gpt-4-turbo',
    stream: true,
    messages,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
\`\`\`

## The useChat Hook

\`\`\`tsx
'use client';
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          <strong>{m.role}:</strong> {m.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
\`\`\`

## Conclusion

Next.js and the Vercel AI SDK make building AI apps genuinely enjoyable.
    `,
    category: 'AI',
    tags: ['Next.js', 'AI', 'Vercel', 'OpenAI', 'TypeScript'],
    author: {
      name: 'Arjun Mehta',
      avatar: 'https://avatars.githubusercontent.com/u/1234567',
      bio: 'Full-stack developer obsessed with AI and developer tooling.',
    },
    publishedAt: '2026-03-25',
    readTime: 8,
    featured: true,
  },

  {
    slug: 'prompt-engineering-mastery',
    title: 'Prompt Engineering Mastery: From Basics to Chain-of-Thought',
    excerpt: 'The difference between a good and great AI product is almost always the prompts.',
    content: `
## Prompting is a Skill

Anyone can write a prompt. Writing prompts that reliably produce the right output is an engineering discipline.

## The Anatomy of a Great Prompt

\`\`\`
[ROLE] You are an expert TypeScript developer.
[CONTEXT] The user is refactoring a legacy Express codebase.
[TASK] Review the following function and suggest improvements.
[CONSTRAINTS] Keep changes minimal. Preserve the function signature.
[FORMAT] Return a numbered list of suggestions, then the improved code.
\`\`\`

## Chain-of-Thought Prompting

\`\`\`typescript
content: \`
Solve this step by step.

Problem: [Describe the problem here]

Think through this carefully:
1. What are the key constraints?
2. What approaches could work?
3. Which is best and why?
4. Show the solution.
\`;
\`\`\`

## Few-Shot Examples

\`\`\`
Classify the sentiment:
Input: "This product is amazing" → Positive
Input: "Absolute waste of money" → Negative
Input: "It's okay I guess" → Neutral
Input: "[User input here]" →
\`\`\`

## Conclusion

Prompt engineering is part art, part science.
    `,
    category: 'AI',
    tags: ['AI', 'Prompt Engineering', 'LLM', 'GPT'],
    author: {
      name: 'Arjun Mehta',
      avatar: 'https://avatars.githubusercontent.com/u/1234567',
      bio: 'Full-stack developer obsessed with AI and developer tooling.',
    },
    publishedAt: '2026-02-28',
    readTime: 9,
    featured: true,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug);
}

export function getPostsByCategory(category: string): Post[] {
  if (category === 'All') return posts;
  return posts.filter(p => p.category === category);
}

export function getFeaturedPosts(): Post[] {
  return posts.filter(p => p.featured);
}

export function searchPosts(query: string): Post[] {
  const q = query.toLowerCase();
  return posts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.excerpt.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  );
}