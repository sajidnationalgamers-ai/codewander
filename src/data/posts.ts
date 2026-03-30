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

The Vercel AI SDK provides a powerful useChat hook:

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

Next.js and the Vercel AI SDK make building AI apps genuinely enjoyable. The streaming primitives, edge runtime support, and tight React integration mean you spend time on product logic rather than infrastructure.
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
    slug: 'tailwind-css-advanced-patterns',
    title: 'Advanced Tailwind CSS Patterns That Will Change How You Build UIs',
    excerpt: 'Beyond the basics — explore composable design tokens, plugin authoring, and component patterns that scale across large codebases.',
    content: `
## Why Advanced Tailwind?

Most developers use Tailwind at 30% capacity. Here's how to unlock the rest.

## Design Tokens with CSS Variables

\`\`\`css
/* globals.css */
:root {
  --color-brand: 16 185 129;
  --radius-card: 0.75rem;
}

.dark {
  --color-brand: 52 211 153;
}
\`\`\`

\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: 'rgb(var(--color-brand) / <alpha-value>)',
      }
    }
  }
}
\`\`\`

## The cva Pattern for Component Variants

\`\`\`typescript
import { cva, type VariantProps } from 'class-variance-authority';

const button = cva(
  'inline-flex items-center rounded-lg font-medium transition-all',
  {
    variants: {
      intent: {
        primary: 'bg-brand-500 text-white hover:bg-brand-600',
        ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: { intent: 'primary', size: 'md' },
  }
);
\`\`\`

## Conclusion

These patterns make Tailwind codebases maintainable at scale. The investment pays off massively in larger teams.
    `,
    category: 'Web Dev',
    tags: ['Tailwind CSS', 'CSS', 'Design Systems', 'Frontend'],
    author: {
      name: 'Priya Sharma',
      avatar: 'https://avatars.githubusercontent.com/u/2345678',
      bio: 'UI engineer who loves design systems and CSS wizardry.',
    },
    publishedAt: '2026-03-20',
    readTime: 6,
    featured: true,
  },
  {
    slug: 'zero-trust-security-model',
    title: 'Zero Trust Security: A Practical Guide for Modern Web Apps',
    excerpt: 'Never trust, always verify. Learn how to implement a zero-trust architecture in your Node.js backend with JWTs, mTLS, and rate limiting.',
    content: `
## What is Zero Trust?

Zero trust is a security model that eliminates implicit trust. Every request must be authenticated, authorized, and continuously validated.

## Core Principles

1. **Verify explicitly** — authenticate every request
2. **Least privilege access** — minimal permissions by default
3. **Assume breach** — design for when (not if) something fails

## Implementing JWT Rotation

\`\`\`typescript
import jwt from 'jsonwebtoken';

export function createTokenPair(userId: string) {
  const accessToken = jwt.sign(
    { userId, type: 'access' },
    process.env.JWT_SECRET!,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
}
\`\`\`

## Rate Limiting with Redis

\`\`\`typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function middleware(req: Request) {
  const { success } = await ratelimit.limit(req.ip ?? 'anonymous');
  if (!success) return new Response('Rate limited', { status: 429 });
}
\`\`\`

## Conclusion

Zero trust is not a product, it is a philosophy. Start with authentication, then layer authorization, then add observability.
    `,
    category: 'Cybersecurity',
    tags: ['Security', 'JWT', 'Zero Trust', 'Node.js'],
    author: {
      name: 'Rahul Verma',
      avatar: 'https://avatars.githubusercontent.com/u/3456789',
      bio: 'Security engineer focused on application-layer security.',
    },
    publishedAt: '2026-03-15',
    readTime: 10,
    featured: true,
  },
  {
    slug: 'react-native-performance-tips',
    title: '10 React Native Performance Tips You\'re Probably Ignoring',
    excerpt: 'Your React Native app is slow and you know it. Here are the concrete fixes that actually move the needle on Hermes, FlatList, and JS thread.',
    content: `
## The Performance Problem

React Native apps feel sluggish when developers treat it like React on the web. The mental model must shift.

## 1. Use Hermes Engine

\`\`\`json
// android/app/build.gradle
project.ext.react = [
  enableHermes: true,
]
\`\`\`

## 2. Optimize FlatList

\`\`\`tsx
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={item => item.id}
  getItemLayout={(_, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={10}
/>
\`\`\`

## 3. Memoize Everything

\`\`\`tsx
const renderItem = useCallback(({ item }) => (
  <PostCard post={item} />
), []);

const MemoizedCard = memo(PostCard, (prev, next) =>
  prev.post.id === next.post.id
);
\`\`\`

## Conclusion

Performance in React Native is about reducing JS thread work and maximizing native offloading. These 10 tips apply to 95% of production apps.
    `,
    category: 'Apps',
    tags: ['React Native', 'Performance', 'Mobile', 'JavaScript'],
    author: {
      name: 'Sneha Patel',
      avatar: 'https://avatars.githubusercontent.com/u/4567890',
      bio: 'Mobile developer building cross-platform apps since 2018.',
    },
    publishedAt: '2026-03-10',
    readTime: 7,
    featured: true,
  },
  {
    slug: 'docker-kubernetes-beginners',
    title: 'Docker & Kubernetes: From Zero to Production in One Weekend',
    excerpt: 'Stop being afraid of containers. This guide walks you through Dockerizing a Next.js app and deploying it to a Kubernetes cluster from scratch.',
    content: `
## Why Containers?

Containers solve the "it works on my machine" problem permanently. Let's get practical.

## Dockerfile for Next.js

\`\`\`dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

## Kubernetes Deployment

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: codewander
spec:
  replicas: 3
  selector:
    matchLabels:
      app: codewander
  template:
    spec:
      containers:
      - name: app
        image: codewander:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
\`\`\`

## Conclusion

Kubernetes has a steep learning curve but the operational benefits are transformative. Start with Docker, then graduate to K8s when you need scale.
    `,
    category: 'DevOps',
    tags: ['Docker', 'Kubernetes', 'DevOps', 'Containers'],
    author: {
      name: 'Karan Singh',
      avatar: 'https://avatars.githubusercontent.com/u/5678901',
      bio: 'DevOps engineer helping teams ship faster and more reliably.',
    },
    publishedAt: '2026-03-05',
    readTime: 12,
    featured: true,
  },
  {
    slug: 'prompt-engineering-mastery',
    title: 'Prompt Engineering Mastery: From Basics to Chain-of-Thought',
    excerpt: 'The difference between a good and great AI product is almost always the prompts. Learn the techniques used by AI teams at top companies.',
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
const prompt = \`
Solve this step by step.

Problem: Describe the problem here

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
Input: "[User input]" →
\`\`\`

## Conclusion

Prompt engineering is part art, part science. The best practitioners treat it like software engineering: iterate, test, and measure.
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