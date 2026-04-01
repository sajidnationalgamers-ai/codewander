import { NextRequest, NextResponse } from 'next/server';

const IDEA_PROMPT = (topic: string) => `Generate a tech blog post idea about: "${topic}".

Return ONLY a raw JSON object. No markdown. No backticks. No explanation. Just JSON starting with { and ending with }.

{
  "title": "compelling, specific blog post title (not generic)",
  "category": "one of: AI | Web Dev | Apps | Cybersecurity | DevOps",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "outline": [
    "Introduction — why this matters in 2026",
    "Section 2 title",
    "Section 3 title",
    "Section 4 title",
    "Section 5 title",
    "Key takeaways for developers"
  ]
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
        contents: [{ parts: [{ text: IDEA_PROMPT(topic) }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    }
  );

  const data = await response.json();
  console.log('Gemini status:', response.status);

  if (!response.ok) {
    throw new Error(`Gemini error: ${data?.error?.code} — ${data?.error?.message}`);
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  console.log('Gemini raw response:', text.substring(0, 200));
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
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: IDEA_PROMPT(topic),
        },
      ],
    }),
  });

  const data = await response.json();
  console.log('Anthropic status:', response.status);

  if (!response.ok) {
    throw new Error(`Anthropic error: ${data?.error?.type} — ${data?.error?.message}`);
  }

  const text = data.content?.[0]?.text ?? '';
  console.log('Anthropic raw response:', text.substring(0, 200));
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

// ─── Main Route ─────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    // 1️⃣ Try Gemini first
    try {
      console.log('Trying Gemini for idea...');
      const idea = await generateWithGemini(topic);
      console.log('✅ Gemini idea succeeded');
      return NextResponse.json(idea);
    } catch (geminiErr) {
      console.warn('⚠️ Gemini idea failed:', geminiErr);
    }

    // 2️⃣ Fallback to Anthropic
    try {
      console.log('Trying Anthropic for idea...');
      const idea = await generateWithAnthropic(topic);
      console.log('✅ Anthropic idea succeeded');
      return NextResponse.json(idea);
    } catch (anthropicErr) {
      console.warn('⚠️ Anthropic idea failed:', anthropicErr);
    }

    // 3️⃣ Last resort — mock
    console.warn('⚠️ Both APIs failed — returning mock idea');
    return NextResponse.json(getMockIdea(topic));

  } catch (err) {
    console.error('generate-idea error:', err);
    return NextResponse.json(getMockIdea('general topic'));
  }
}

function getMockIdea(topic: string) {
  return {
    title: `The Complete Developer's Guide to ${topic.charAt(0).toUpperCase() + topic.slice(1)}`,
    category: 'Web Dev',
    tags: [topic.split(' ')[0], 'tutorial', 'beginner', 'guide'],
    outline: [
      'Introduction — why this topic matters in 2026',
      `Core concepts of ${topic} explained simply`,
      'Step-by-step implementation walkthrough',
      'Common pitfalls and how to avoid them',
      'Real-world examples and use cases',
      'Key takeaways for developers',
    ],
  };
}