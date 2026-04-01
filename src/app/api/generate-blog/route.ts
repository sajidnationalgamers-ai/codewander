import { NextRequest, NextResponse } from 'next/server';

const BLOG_PROMPT = (topic: string) => `You are a senior developer and technical writer for "CodeWander" — a developer-focused tech blog.

Write a HIGH-QUALITY, LONG-FORM blog post about: "${topic}"

WRITING RULES:
- Write like an experienced developer sharing real knowledge — NOT like an AI
- Vary sentence lengths — mix short punchy sentences with longer explanations  
- Use natural expressions like "Here's the thing...", "In real projects...", "Most beginners make this mistake..."
- Add opinionated insights
- Do NOT use "In conclusion" or generic filler phrases
- Minimum 1200 words

STRUCTURE:
- Engaging intro (hook the reader)
- 5-8 sections with natural headings
- Pro tips / common mistakes section
- FAQ section (3-4 questions)
- Strong natural ending

IF TOPIC IS CODING/TECHNICAL:
- ALWAYS use fenced code blocks with language: \`\`\`python \`\`\`typescript \`\`\`bash
- Add ASCII diagrams where helpful, like:
  \`\`\`
  Request → Middleware → Controller → Database
  \`\`\`
- Add callout boxes using blockquotes:
  > 💡 **Pro Tip:** explanation here
  > ⚠️ **Warning:** important warning here
  > 📦 **Install:** npm install package-name
- Number installation/setup steps clearly
- NEVER write code as plain text

IF TOPIC IS NON-TECHNICAL:
- Rich descriptive paragraphs
- Use bullet points and numbered lists naturally
- Add tips and warnings as blockquotes

Return ONLY a raw JSON object. No markdown. No backticks. No explanation.

{
  "title": "specific compelling title",
  "excerpt": "2 sentence hook",
  "category": "one of: AI | Web Dev | Apps | Cybersecurity | DevOps",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "readTime": 8,
  "content": "## Heading\\n\\nContent...\\n\\n\`\`\`typescript\\n// code\\n\`\`\`\\n\\n> 💡 **Pro Tip:** tip here\\n\\n"
}`;

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

// ─── 1. Gemini ──────────────────────────────────────────────────────
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
        generationConfig: { temperature: 0.8, maxOutputTokens: 4096 },
      }),
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(`Gemini error: ${data?.error?.code} — ${data?.error?.message}`);

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  return parseJSON(text);
}

// ─── 2. Groq ────────────────────────────────────────────────────────
async function generateWithGroq(topic: string) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY not set');

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: BLOG_PROMPT(topic) }],
      temperature: 0.8,
      max_tokens: 4096,
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(`Groq error: ${data?.error?.code} — ${data?.error?.message}`);

  const text = data.choices?.[0]?.message?.content ?? '';
  return parseJSON(text);
}

// ─── 3. Cohere ──────────────────────────────────────────────────────
async function generateWithCohere(topic: string) {
  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) throw new Error('COHERE_API_KEY not set');

  const response = await fetch('https://api.cohere.com/v2/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'command-r-plus-08-2024',
      messages: [{ role: 'user', content: BLOG_PROMPT(topic) }],
      temperature: 0.8,
      max_tokens: 4096,
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(`Cohere error: ${data?.message}`);

  const text = data.message?.content?.[0]?.text ?? '';
  return parseJSON(text);
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
    } catch (err) {
      console.warn('⚠️ Gemini failed:', err);
    }

    // 2️⃣ Fallback to Groq
    try {
      console.log('Trying Groq...');
      const blog = await generateWithGroq(topic);
      console.log('✅ Groq succeeded');
      return NextResponse.json(addMeta(blog, topic, 'groq'));
    } catch (err) {
      console.warn('⚠️ Groq failed:', err);
    }

    // 3️⃣ Fallback to Cohere
    try {
      console.log('Trying Cohere...');
      const blog = await generateWithCohere(topic);
      console.log('✅ Cohere succeeded');
      return NextResponse.json(addMeta(blog, topic, 'cohere'));
    } catch (err) {
      console.warn('⚠️ Cohere failed:', err);
    }

    // 4️⃣ All failed
    console.error('❌ All APIs failed');
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