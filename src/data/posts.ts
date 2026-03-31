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

\`\`\`bash
npx create-next-app@latest my-ai-app
cd my-ai-app
npm install ai openai
\`\`\`

## Creating Your First AI Route

\`\`\`typescript
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
        <div key={m.id}><strong>{m.role}:</strong> {m.content}</div>
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
    author: { name: 'Arjun Mehta', avatar: '', bio: 'Full-stack developer obsessed with AI and developer tooling.' },
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
:root {
  --color-brand: 16 185 129;
}
.dark {
  --color-brand: 52 211 153;
}
\`\`\`

\`\`\`javascript
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

## The cva Pattern

\`\`\`typescript
import { cva } from 'class-variance-authority';

const button = cva('inline-flex items-center rounded-lg font-medium', {
  variants: {
    intent: {
      primary: 'bg-brand-500 text-white hover:bg-brand-600',
      ghost: 'bg-transparent hover:bg-gray-100',
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
    },
  },
  defaultVariants: { intent: 'primary', size: 'md' },
});
\`\`\`

## Conclusion

These patterns make Tailwind codebases maintainable at scale.
    `,
    category: 'Web Dev',
    tags: ['Tailwind CSS', 'CSS', 'Design Systems', 'Frontend'],
    author: { name: 'Priya Sharma', avatar: '', bio: 'UI engineer who loves design systems and CSS wizardry.' },
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

Zero trust eliminates implicit trust. Every request must be authenticated, authorized, and continuously validated.

## Core Principles

1. **Verify explicitly** — authenticate every request
2. **Least privilege access** — minimal permissions by default
3. **Assume breach** — design for when things fail

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

## Conclusion

Zero trust is a philosophy. Start with authentication, layer authorization, then add observability.
    `,
    category: 'Cybersecurity',
    tags: ['Security', 'JWT', 'Zero Trust', 'Node.js'],
    author: { name: 'Rahul Verma', avatar: '', bio: 'Security engineer focused on application-layer security.' },
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

React Native apps feel sluggish when developers treat it like React on the web.

## 1. Use Hermes Engine

\`\`\`json
project.ext.react = [enableHermes: true]
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
/>
\`\`\`

## 3. Memoize Everything

\`\`\`tsx
const renderItem = useCallback(({ item }) => (
  <PostCard post={item} />
), []);
\`\`\`

## Conclusion

Performance is about reducing JS thread work and maximizing native offloading.
    `,
    category: 'Apps',
    tags: ['React Native', 'Performance', 'Mobile', 'JavaScript'],
    author: { name: 'Sneha Patel', avatar: '', bio: 'Mobile developer building cross-platform apps since 2018.' },
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

Containers solve the "it works on my machine" problem permanently.

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
\`\`\`

## Conclusion

Start with Docker, graduate to K8s when you need scale.
    `,
    category: 'DevOps',
    tags: ['Docker', 'Kubernetes', 'DevOps', 'Containers'],
    author: { name: 'Karan Singh', avatar: '', bio: 'DevOps engineer helping teams ship faster and more reliably.' },
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

Writing prompts that reliably produce the right output is an engineering discipline.

## The Anatomy of a Great Prompt

\`\`\`
[ROLE] You are an expert TypeScript developer.
[CONTEXT] The user is refactoring a legacy Express codebase.
[TASK] Review the following function and suggest improvements.
[CONSTRAINTS] Keep changes minimal.
[FORMAT] Return a numbered list of suggestions, then the improved code.
\`\`\`

## Chain-of-Thought Prompting

\`\`\`typescript
const prompt = \`
Solve this step by step:
1. What are the key constraints?
2. What approaches could work?
3. Which is best and why?
4. Show the solution.
\`;
\`\`\`

## Conclusion

Prompt engineering is part art, part science. Iterate, test, and measure.
    `,
    category: 'AI',
    tags: ['AI', 'Prompt Engineering', 'LLM', 'GPT'],
    author: { name: 'Arjun Mehta', avatar: '', bio: 'Full-stack developer obsessed with AI and developer tooling.' },
    publishedAt: '2026-02-28',
    readTime: 9,
    featured: true,
  },

  // ─── 10 NEW POSTS ───

  {
    slug: 'how-to-use-chatgpt-for-coding',
    title: 'How to Use ChatGPT for Coding (Beginner Guide 2026)',
    excerpt: 'ChatGPT can write code, fix bugs, explain errors, and review projects. Here is exactly how beginners can use it to dramatically speed up their coding.',
    content: `
## Why Every Developer Should Use ChatGPT

ChatGPT is like having a senior developer available 24/7 — for free. It saves hours every single day.

## 1. Writing Code from Scratch

\`\`\`
Prompt: Write a JavaScript function that takes an array of numbers 
and returns the average. Include error handling for empty arrays.
\`\`\`

\`\`\`javascript
function calculateAverage(numbers) {
  if (!numbers || numbers.length === 0) {
    throw new Error('Array cannot be empty');
  }
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

console.log(calculateAverage([1, 2, 3, 4, 5])); // 3
\`\`\`

## 2. Fixing Bugs

Paste your broken code and ask: "Why is this not working?"

\`\`\`javascript
// Broken
function greet(name) {
  console.log("Hello " + nme); // typo: nme instead of name
}
\`\`\`

ChatGPT instantly spots the typo and fixes it.

## 3. Understanding Error Messages

Copy any error into ChatGPT:

\`\`\`
TypeError: Cannot read properties of undefined (reading 'map')
\`\`\`

ChatGPT explains what went wrong and shows the fix.

## 4. Learning Concepts Fast

\`\`\`
Explain async/await in JavaScript like I am 10 years old
\`\`\`

## Best Prompting Tips

1. **Be specific** — Include language and context
2. **Share your code** — Paste what you have
3. **Ask for explanations** — "Explain each line"
4. **Iterate** — "That's not quite right, try again"

## Conclusion

ChatGPT is the most powerful free coding tool in 2026. Use it to write faster, debug faster, and learn faster.
    `,
    category: 'AI',
    tags: ['ChatGPT', 'AI', 'Coding', 'Beginner', 'Productivity'],
    author: { name: 'CodeWander Team', avatar: '', bio: 'Practical guides for modern developers.' },
    publishedAt: '2026-03-28',
    readTime: 6,
    featured: true,
  },
  {
    slug: 'best-free-ai-tools-2026',
    title: 'Best Free AI Tools for Students and Developers (2026)',
    excerpt: 'From code generation to design — these are the best completely free AI tools that every student and developer should be using right now.',
    content: `
## The AI Revolution is Free

You do not need to spend money to access powerful AI tools in 2026.

## 1. ChatGPT (Free tier)

Best for writing code, debugging, and learning concepts. GPT-4o is available free.

## 2. Google Gemini

\`\`\`
Free tier: 1500 requests per day
Best for: Research, long documents, coding help
\`\`\`

## 3. GitHub Copilot (Free for students)

In-editor code completion. If you are a student, it is completely free.

## 4. Vercel v0

Describe a UI and get React + Tailwind code instantly. Free to use at v0.dev.

## 5. Perplexity AI

Better than Google for technical research — direct answers with citations.

## 6. Claude (Anthropic)

Excellent for explaining complex code, writing documentation, and solving tricky bugs.

## 7. Canva AI

Generate images, design social posts, create presentations — all free.

## Developer Workflow with AI Tools

\`\`\`
1. ChatGPT — Write the initial code
2. GitHub Copilot — Get suggestions while coding
3. Perplexity — Research best practices
4. v0 — Generate UI components
5. Claude — Review and improve code quality
\`\`\`

## Conclusion

These free AI tools can dramatically accelerate your development speed. Learn to use the right tool for each task.
    `,
    category: 'AI',
    tags: ['AI Tools', 'Free', 'Students', 'Developers', '2026'],
    author: { name: 'CodeWander Team', avatar: '', bio: 'Practical guides for modern developers.' },
    publishedAt: '2026-03-27',
    readTime: 7,
    featured: true,
  },
  {
    slug: 'build-website-using-ai',
    title: 'How to Build a Website Using AI (Step-by-Step Guide)',
    excerpt: 'You do not need to be an expert developer to build a website in 2026. With AI tools like v0, ChatGPT, and Vercel, anyone can build and launch a website today.',
    content: `
## Building Websites with AI in 2026

The barrier to building websites has never been lower.

## Tools You Need (All Free)

- **Vercel v0** — Generate UI with AI
- **ChatGPT** — Write and fix code
- **GitHub** — Store code
- **Vercel** — Deploy free

## Step 1: Generate Your Website with v0

Go to v0.dev and describe your site:

\`\`\`
Create a modern personal portfolio with:
- Hero section with name and bio
- Projects section with cards
- Contact section
- Dark mode support
- React and Tailwind CSS
\`\`\`

## Step 2: Set Up Your Project

\`\`\`bash
npx create-next-app@latest my-website
cd my-website
\`\`\`

## Step 3: Customize with ChatGPT

\`\`\`
Change the hero background to a dark gradient from purple to blue.
Keep all other styles the same.
\`\`\`

## Step 4: Deploy to Vercel

\`\`\`bash
git init
git add .
git commit -m "my website"
git push origin main
\`\`\`

Connect GitHub repo to Vercel — live in minutes!

## Tips for Using AI Effectively

1. Be very specific in prompts
2. Iterate — refine if result is not right
3. Ask for explanations to learn
4. Fix errors with ChatGPT

## Conclusion

AI has completely changed how websites are built. What used to take days now takes hours.
    `,
    category: 'Web Dev',
    tags: ['AI', 'Website', 'Beginner', 'v0', 'Next.js'],
    author: { name: 'CodeWander Team', avatar: '', bio: 'Practical guides for modern developers.' },
    publishedAt: '2026-03-26',
    readTime: 8,
    featured: false,
  },
  {
    slug: 'top-10-websites-every-developer-should-know',
    title: 'Top 10 Websites Every Developer Should Know',
    excerpt: 'These websites will save you hours every week. From documentation to tools — every developer needs these bookmarked right now.',
    content: `
## The Developer Essential Bookmarks

These 10 websites become indispensable once you discover them.

## 1. MDN Web Docs (developer.mozilla.org)

The gold standard for web documentation. HTML, CSS, JavaScript — everything is here.

## 2. Stack Overflow (stackoverflow.com)

The largest developer Q&A community. Someone has already solved your problem here.

## 3. GitHub (github.com)

Where the entire open source world lives. Explore repos, contribute, and build your portfolio.

## 4. Can I Use (caniuse.com)

Check browser support for any CSS or JavaScript feature before using it.

\`\`\`css
/* Check caniuse.com before using new CSS features */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
\`\`\`

## 5. CSS-Tricks (css-tricks.com)

The best resource for CSS techniques, flexbox, grid, and frontend tips.

## 6. DevDocs (devdocs.io)

All API documentation in one searchable place. Works offline.

## 7. Regex101 (regex101.com)

Test and debug regular expressions with real-time explanations.

## 8. Excalidraw (excalidraw.com)

Free whiteboard for sketching system designs and architecture.

## 9. Coolors (coolors.co)

Generate beautiful color palettes for your projects instantly.

## 10. Roadmap.sh (roadmap.sh)

Visual learning roadmaps for every developer path — frontend, backend, DevOps, and more.

## Conclusion

Bookmark these websites. The best developers know where to find answers quickly.
    `,
    category: 'Web Dev',
    tags: ['Resources', 'Websites', 'Tools', 'Developer', 'Productivity'],
    author: { name: 'CodeWander Team', avatar: '', bio: 'Practical guides for modern developers.' },
    publishedAt: '2026-03-24',
    readTime: 5,
    featured: false,
  },
  {
    slug: 'deploy-website-on-vercel',
    title: 'How to Deploy a Website on Vercel (Beginner Guide)',
    excerpt: 'Vercel makes deploying websites incredibly simple and completely free. Go from zero to a live website in under 10 minutes with this step-by-step guide.',
    content: `
## Why Vercel?

Vercel is the easiest way to deploy in 2026. Free, fast, and perfect for Next.js.

## Step 1: Prepare Your Project

\`\`\`json
{
  "scripts": {
    "build": "next build",
    "dev": "next dev",
    "start": "next start"
  }
}
\`\`\`

## Step 2: Push to GitHub

\`\`\`bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/username/project.git
git branch -M main
git push -u origin main
\`\`\`

## Step 3: Deploy on Vercel

1. Go to **vercel.com** — sign up with GitHub
2. Click **New Project**
3. Select your repository
4. Click **Deploy**

Vercel auto-detects your framework and deploys!

## Step 4: Add Environment Variables

1. Project Settings → Environment Variables
2. Add your API keys
3. Redeploy

## Automatic Deployments

\`\`\`bash
git add .
git commit -m "new feature"
git push
# Vercel auto-deploys in ~1 minute
\`\`\`

## Conclusion

Vercel removed all complexity from deploying websites. What used to require DevOps knowledge now takes 5 minutes. Completely free.
    `,
    category: 'DevOps',
    tags: ['Vercel', 'Deployment', 'Hosting', 'Beginner', 'Free'],
    author: { name: 'CodeWander Team', avatar: '', bio: 'Practical guides for modern developers.' },
    publishedAt: '2026-03-23',
    readTime: 6,
    featured: false,
  },
  {
    slug: 'github-for-beginners-2026',
    title: 'GitHub for Beginners – Complete Guide (2026)',
    excerpt: 'GitHub is the most important platform every developer must know. This complete guide covers everything from your first repository to collaborating on projects.',
    content: `
## What is GitHub?

GitHub is where developers store, share, and collaborate on code. Think of it as Google Drive for code — but much more powerful.

## Setting Up Git

\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
\`\`\`

## The 5 Commands You Use Every Day

\`\`\`bash
git init                    # Start tracking a project
git add .                   # Stage all changes
git commit -m "message"     # Save changes
git remote add origin URL   # Connect to GitHub
git push origin main        # Upload to GitHub
\`\`\`

## Your Daily Workflow

\`\`\`bash
# After making changes:
git add .
git commit -m "added login page"
git push
\`\`\`

## Using Branches

\`\`\`bash
git checkout -b new-feature    # Create branch
git add .
git commit -m "new feature"    # Commit changes
git checkout main
git merge new-feature          # Merge back
\`\`\`

## Building Your GitHub Profile

- Pin your best projects
- Write good README files
- Commit code regularly
- Contribute to open source

## Conclusion

Git and GitHub are non-negotiable skills. Start using them today — even for small personal projects.
    `,
    category: 'Web Dev',
    tags: ['GitHub', 'Git', 'Beginner', 'Version Control', '2026'],
    author: { name: 'CodeWander Team', avatar: '', bio: 'Practical guides for modern developers.' },
    publishedAt: '2026-03-22',
    readTime: 8,
    featured: false,
  },
  {
    slug: 'earn-money-online-with-coding',
    title: 'How to Earn Money Online with Coding (No Experience Needed)',
    excerpt: 'You do not need years of experience to start earning with code. Here are the most practical ways beginners are making money with coding skills in 2026.',
    content: `
## Can You Earn Money as a Beginner Coder?

Yes — absolutely. The demand for developers has never been higher.

## 1. Freelancing (Fastest Way to Start)

**Best beginner services on Fiverr/Upwork:**
- Simple websites — ₹5,000 to ₹20,000 per project
- Landing pages — ₹3,000 to ₹15,000
- Bug fixes — ₹500 to ₹2,000 per fix

**How to start:**
1. Create profiles on Fiverr and Upwork
2. Offer one simple service at a low price
3. Collect reviews and raise prices

## 2. Selling Website Templates

Create templates and sell on Gumroad or ThemeForest. Passive income for years.

## 3. Tech Blog or YouTube

Start a blog or YouTube channel teaching coding:
- Google AdSense — earn from ads
- Affiliate marketing — earn commission
- Sponsorships — companies pay to reach your audience

## 4. Building SaaS Products

\`\`\`
Simple SaaS ideas:
- Invoice generator
- Resume builder
- QR code generator
- URL shortener
\`\`\`

Even 50 users at ₹500/month = ₹25,000/month passive income.

## 5. Teaching Coding

Once you know basics, teach others:
- Udemy course — create once, earn forever
- Direct tutoring — ₹500 to ₹2,000 per hour

## Getting Started

1. Pick ONE method to focus on
2. Build 2-3 portfolio projects
3. Start before you feel ready

## Conclusion

You just need to know more than your clients. Start today.
    `,
    category: 'Web Dev',
    tags: ['Freelancing', 'Money', 'Beginner', 'Career', 'SaaS'],
    author: { name: 'CodeWander Team', avatar: '', bio: 'Practical guides for modern developers.' },
    publishedAt: '2026-03-21',
    readTime: 9,
    featured: false,
  },
  {
    slug: 'best-programming-languages-2026',
    title: 'Best Programming Languages to Learn in 2026',
    excerpt: 'With so many languages available, which ones are worth your time in 2026? Our data-driven guide for beginners and experienced developers.',
    content: `
## Choosing the Right Language

The language you choose can shape your entire career.

## 1. JavaScript / TypeScript — Most In-Demand

Runs everywhere: browsers, servers, mobile, desktop.

\`\`\`javascript
// JavaScript
function greet(name) {
  return \`Hello, \${name}!\`;
}

// TypeScript — safer
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\`

**Average salary:** ₹6-25 LPA

## 2. Python — Best for AI/ML

Simplest syntax. Dominates AI and data science.

\`\`\`python
def greet(name):
    return f"Hello, {name}!"

# AI in just a few lines
from transformers import pipeline
classifier = pipeline("sentiment-analysis")
result = classifier("I love coding!")
\`\`\`

**Average salary:** ₹8-30 LPA

## 3. Rust — Fastest Growing

Memory-safe, blazingly fast. Most loved language 8 years running.

## 4. Go — Cloud and Backend

Google's language. Used by Uber, Docker, Dropbox.

\`\`\`go
package main
import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
\`\`\`

## 5. SQL — Essential for Everyone

Every application uses a database. SQL is not optional.

\`\`\`sql
SELECT name, email FROM users
WHERE created_at > '2026-01-01'
ORDER BY name ASC;
\`\`\`

## Which Should YOU Learn?

| Goal | Language |
|------|----------|
| Web development | JavaScript |
| AI/Data Science | Python |
| High performance | Rust/Go |
| Get a job fast | JavaScript |

## Conclusion

If you are a beginner, start with JavaScript or Python. Both have massive job markets and tons of free resources.
    `,
    category: 'Web Dev',
    tags: ['Programming', 'JavaScript', 'Python', 'Career', '2026'],
    author: { name: 'CodeWander Team', avatar: '', bio: 'Practical guides for modern developers.' },
    publishedAt: '2026-03-19',
    readTime: 7,
    featured: false,
  },
  {
    slug: 'create-blog-website-nextjs',
    title: 'How to Create a Blog Website Using Next.js',
    excerpt: 'Build a complete blog website from scratch using Next.js 14, Tailwind CSS, and Markdown. Then deploy it free on Vercel.',
    content: `
## Why Next.js for a Blog?

Static generation for speed, dynamic routing for posts, SEO out of the box.

## Project Setup

\`\`\`bash
npx create-next-app@latest my-blog
cd my-blog
npm install tailwindcss gray-matter react-markdown
\`\`\`

## Creating Posts in Markdown

\`\`\`markdown
---
title: "My First Post"
date: "2026-03-01"
excerpt: "My first blog post!"
---

## Introduction

Welcome to my blog!

\\\`\\\`\\\`javascript
console.log("Hello World!");
\\\`\\\`\\\`
\`\`\`

## Reading Markdown Files

\`\`\`typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getAllPosts() {
  const postsDir = path.join(process.cwd(), 'src/posts');
  const files = fs.readdirSync(postsDir);

  return files.map(filename => {
    const content = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
    const { data, content: body } = matter(content);
    return { slug: filename.replace('.md', ''), ...data, content: body };
  });
}
\`\`\`

## Dynamic Routes

\`\`\`typescript
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default function PostPage({ params }) {
  const posts = getAllPosts();
  const post = posts.find(p => p.slug === params.slug);
  return (
    <article className="prose max-w-3xl mx-auto py-10">
      <h1>{post.title}</h1>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}
\`\`\`

## Deploy to Vercel

\`\`\`bash
git add .
git commit -m "my blog"
git push
\`\`\`

Connect to Vercel — deployed in minutes, free forever.

## Conclusion

Next.js + Markdown + Vercel is the perfect modern blog stack.
    `,
    category: 'Web Dev',
    tags: ['Next.js', 'Blog', 'Markdown', 'Tutorial', 'Beginner'],
    author: { name: 'CodeWander Team', avatar: '', bio: 'Practical guides for modern developers.' },
    publishedAt: '2026-03-17',
    readTime: 10,
    featured: false,
  },
  {
    slug: 'beginner-coding-projects-source-code',
    title: 'Top 5 Beginner Coding Projects with Source Code',
    excerpt: 'The best way to learn coding is by building real projects. Here are 5 beginner-friendly projects with complete source code you can build and learn from today.',
    content: `
## Why Projects Beat Tutorials

Projects force you to solve real problems. That is where actual learning happens.

## Project 1: To-Do List App

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; max-width: 500px; margin: 40px auto; padding: 20px; }
    .todo-item { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #eee; }
    .completed { text-decoration: line-through; color: #999; }
  </style>
</head>
<body>
  <h1>To-Do List</h1>
  <input id="input" type="text" placeholder="Add a task..." />
  <button onclick="addTodo()">Add</button>
  <ul id="list"></ul>
  <script>
    function addTodo() {
      const input = document.getElementById('input');
      const list = document.getElementById('list');
      if (!input.value.trim()) return;
      const li = document.createElement('li');
      li.className = 'todo-item';
      li.innerHTML = \`
        <span onclick="this.classList.toggle('completed')">\${input.value}</span>
        <button onclick="this.parentElement.remove()">Delete</button>
      \`;
      list.appendChild(li);
      input.value = '';
    }
  </script>
</body>
</html>
\`\`\`

**What you learn:** DOM manipulation, event handling

## Project 2: Weather App

\`\`\`javascript
const API_KEY = 'your_key'; // Free from openweathermap.org

async function getWeather(city) {
  const response = await fetch(
    \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${API_KEY}&units=metric\`
  );
  const data = await response.json();
  document.getElementById('result').innerHTML = \`
    <h2>\${data.name}</h2>
    <p>Temperature: \${data.main.temp}°C</p>
    <p>Condition: \${data.weather[0].description}</p>
  \`;
}
\`\`\`

**What you learn:** Fetch API, async/await, external APIs

## Project 3: Calculator

\`\`\`javascript
let display = '';

function press(value) {
  if (value === '=') {
    try { display = eval(display).toString(); }
    catch { display = 'Error'; }
  } else if (value === 'C') {
    display = '';
  } else {
    display += value;
  }
  document.getElementById('display').value = display;
}
\`\`\`

**What you learn:** Functions, conditionals, string manipulation

## Project 4: Quiz App

\`\`\`javascript
const questions = [
  { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language"], correct: 0 },
  { question: "Which runs in the browser?", options: ["Python", "JavaScript"], correct: 1 }
];
let current = 0, score = 0;

function answer(index) {
  if (index === questions[current].correct) score++;
  current++;
  if (current < questions.length) showQuestion();
  else alert(\`Score: \${score}/\${questions.length}\`);
}
\`\`\`

**What you learn:** Arrays, objects, game logic

## Project 5: Portfolio Website

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    .hero { height: 100vh; display: flex; align-items: center; justify-content: center; background: #1a1a2e; color: white; text-align: center; }
    h1 { font-size: 3rem; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <section class="hero">
    <div>
      <h1>Hi, I'm [Your Name]</h1>
      <p>I build things for the web</p>
    </div>
  </section>
</body>
</html>
\`\`\`

**What you learn:** HTML structure, CSS layouts, design basics

## Which Should You Start With?

| Level | Project |
|-------|---------|
| Complete beginner | To-Do List |
| Know basic HTML/CSS | Calculator |
| Comfortable with JS | Weather App |
| Want a portfolio | Portfolio Website |

## Conclusion

Pick ONE project and build it completely. Each completed project teaches more than 10 tutorials.
    `,
    category: 'Web Dev',
    tags: ['Projects', 'Beginner', 'Source Code', 'JavaScript', 'HTML'],
    author: { name: 'CodeWander Team', avatar: '', bio: 'Practical guides for modern developers.' },
    publishedAt: '2026-03-16',
    readTime: 11,
    featured: false,
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