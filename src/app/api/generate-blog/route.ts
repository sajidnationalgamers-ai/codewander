import { NextRequest, NextResponse } from 'next/server';

const BLOG_PROMPT = (topic: string) => `You are a senior developer and technical writer for "CodeWander" — a developer-focused tech blog.

Write a HIGH-QUALITY, LONG-FORM blog post about: "${topic}"

WRITING RULES (very important):
- Write like an experienced developer sharing real knowledge — NOT like an AI
- Vary sentence lengths — mix short punchy sentences with longer explanations
- Use natural developer expressions like "Here's the thing...", "In real projects...", "Most beginners make this mistake..."
- Add opinionated insights — share what actually works in production
- Do NOT use "In conclusion" or generic filler phrases
- Minimum 1200 words of actual content

STRUCTURE:
- Engaging intro (1-2 paragraphs, hook the reader — no "In this article we will...")
- 5-8 sections with natural headings
- Each section: 2-4 paragraphs + code where relevant
- Pro tips or common mistakes section
- FAQ section (3-4 real questions developers ask)
- Strong ending (no "Conclusion" heading — end naturally)

CODE SNIPPETS:
- Include 3-5 real, working code examples
- Use TypeScript where possible
- Add comments explaining WHY, not just WHAT

Return ONLY a raw JSON object. No markdown. No backticks. No explanation. Just JSON starting with { and ending with }.

{
  "title": "specific, compelling title (not generic)",
  "excerpt": "2 sentence hook that makes developers want to read",
  "category": "one of: AI | Web Dev | Apps | Cybersecurity | DevOps",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "readTime": 8,
  "content": "## Hook Heading\\n\\nEngaging intro paragraph...\\n\\n## Section 1\\n\\nDetailed content...\\n\\n\`\`\`typescript\\n// code\\n\`\`\`\\n\\n## Section 2\\n\\n..."
}`;

// ─── Gemini Generator ───────────────────────────────────────────────
async function generateWithGemini(topic: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not set');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: BLOG_PROMPT(topic) }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 4096,
        },
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Gemini error: ${data?.error?.code} — ${data?.error?.message}`);
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  return parseJSON(text);
}

// ─── Anthropic Generator ────────────────────────────────────────────
async function generateWithAnthropic(topic: string) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: BLOG_PROMPT(topic),
        },
      ],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Anthropic error: ${data?.error?.type} — ${data?.error?.message}`);
  }

  const text = data.content?.[0]?.text ?? '';
  return parseJSON(text);
}

// ─── JSON Parser ────────────────────────────────────────────────────
function parseJSON(text: string) {
  const cleaned = text
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON found in response');

  return JSON.parse(jsonMatch[0]);
}

// ─── Add Required Fields ────────────────────────────────────────────
function addMeta(blog: Record<string, unknown>, topic: string, source: string) {
  blog.slug = topic
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 60);
  blog.author = {
    name: 'CodeWander AI',
    avatar: '',
    bio: 'AI-generated content by CodeWander.',
  };
  blog.publishedAt = new Date().toISOString().split('T')[0];
  blog.featured = false;
  blog.aiGenerated = true;
  blog.generatedBy = source;
  return blog;
}

// ─── Main Route ─────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic required' }, { status: 400 });
    }

    // 1️⃣ Try Gemini first
    try {
      console.log('Trying Gemini...');
      const blog = await generateWithGemini(topic);
      console.log('✅ Gemini succeeded');
      return NextResponse.json(addMeta(blog, topic, 'gemini'));
    } catch (geminiErr) {
      console.warn('⚠️ Gemini failed:', geminiErr);
    }

    // 2️⃣ Fallback to Anthropic
    try {
      console.log('Trying Anthropic...');
      const blog = await generateWithAnthropic(topic);
      console.log('✅ Anthropic succeeded');
      return NextResponse.json(addMeta(blog, topic, 'anthropic'));
    } catch (anthropicErr) {
      console.warn('⚠️ Anthropic failed:', anthropicErr);
    }

    // 3️⃣ Both failed
    console.error('❌ Both APIs failed');
    return NextResponse.json(
      { error: 'AI services temporarily unavailable. Please try again later.' },
      { status: 503 }
    );

  } catch (err) {
    console.error('generate-blog fatal error:', err);
    return NextResponse.json(
      { error: 'Something went wrong', details: String(err) },
      { status: 500 }
    );
  }
}