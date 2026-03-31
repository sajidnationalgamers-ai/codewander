import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    console.log('Gemini Key loaded:', apiKey ? 'YES' : 'NO');

    if (!apiKey) {
      return NextResponse.json(getMockBlog(topic));
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Write a detailed tech blog post about: "${topic}"

Return ONLY valid JSON (no markdown, no backticks) in this exact format:
{
  "title": "compelling blog title",
  "excerpt": "2 sentence summary",
  "category": "one of: AI | Web Dev | Apps | Cybersecurity | DevOps",
  "tags": ["tag1", "tag2", "tag3"],
  "readTime": 5,
  "content": "## Introduction\\n\\nWrite full markdown content here with multiple sections, code examples where relevant, and practical tips. Minimum 600 words."
}`
            }]
          }]
        }),
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    const cleaned = text.replace(/```json|```/g, '').trim();
    const blog = JSON.parse(cleaned);

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
    return NextResponse.json(getMockBlog('general topic'));
  }
}

function getMockBlog(topic: string) {
  return {
    slug: topic.toLowerCase().replace(/\s+/g, '-'),
    title: `Complete Guide to ${topic}`,
    excerpt: `Everything you need to know about ${topic}.`,
    category: 'Web Dev',
    tags: [topic.split(' ')[0], 'tutorial', 'guide'],
    readTime: 5,
    aiGenerated: true,
    author: { name: 'CodeWander AI', avatar: '', bio: 'AI-generated content.' },
    publishedAt: new Date().toISOString().split('T')[0],
    content: `## Introduction\n\n${topic} is an important concept every developer should understand.\n\n## Conclusion\n\nKeep learning and building!`,
  };
}