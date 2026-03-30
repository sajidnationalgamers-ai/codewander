import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic required' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(getMockBlog(topic));
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: `Write a detailed tech blog post about: "${topic}"

Return ONLY valid JSON (no markdown, no backticks) in this exact format:
{
  "title": "compelling blog title",
  "excerpt": "2 sentence summary",
  "category": "one of: AI | Web Dev | Apps | Cybersecurity | DevOps",
  "tags": ["tag1", "tag2", "tag3"],
  "readTime": 5,
  "content": "## Introduction\\n\\nFull markdown content here with multiple sections, code examples, and practical tips. Make it at least 600 words."
}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json(getMockBlog(topic));
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? '';
    const cleaned = text.replace(/```json|```/g, '').trim();
    const blog = JSON.parse(cleaned);

    // Add slug and author
    blog.slug = topic.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
    blog.author = {
      name: 'CodeWander AI',
      avatar: '',
      bio: 'AI-generated content by CodeWander.',
    };
    blog.publishedAt = new Date().toISOString().split('T')[0];
    blog.featured = false;
    blog.aiGenerated = true;

    return NextResponse.json(blog);

  } catch (err) {
    console.error('generate-blog error:', err);
    return NextResponse.json({ error: 'Failed to generate blog' }, { status: 500 });
  }
}

function getMockBlog(topic: string) {
  return {
    slug: topic.toLowerCase().replace(/\s+/g, '-'),
    title: `Complete Guide to ${topic}`,
    excerpt: `Everything you need to know about ${topic}. A comprehensive guide for developers.`,
    category: 'Web Dev',
    tags: [topic.split(' ')[0], 'tutorial', 'guide'],
    readTime: 5,
    aiGenerated: true,
    author: { name: 'CodeWander AI', avatar: '', bio: 'AI-generated content.' },
    publishedAt: new Date().toISOString().split('T')[0],
    content: `
## Introduction

${topic} is an important concept every developer should understand.

## What is ${topic}?

${topic} refers to a set of tools, techniques, and practices used in modern development.

## Why Does it Matter?

Understanding ${topic} helps you build better, faster, and more reliable applications.

## Getting Started

Here are the key steps to get started with ${topic}:

1. Learn the basics
2. Practice with small projects
3. Build something real
4. Share your work

## Conclusion

${topic} is a valuable skill that will serve you well throughout your development career. Start small, be consistent, and keep building!
    `,
  };
}