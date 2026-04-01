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
      console.error('GEMINI_API_KEY is missing from .env.local');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const prompt = `You are a senior developer and technical writer for "CodeWander" — a developer-focused tech blog.

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
- 5-8 sections with natural headings (not generic like "Section 1")
- Each section: 2-4 paragraphs + code where relevant
- Pro tips or common mistakes section
- FAQ section (3-4 real questions developers ask)
- Strong ending (no "conclusion" heading — end naturally)

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
  "content": "## Hook Heading\\n\\nEngaging intro paragraph...\\n\\n## Section 1\\n\\nDetailed content with real insights...\\n\\n\`\`\`typescript\\n// working code example\\n\`\`\`\\n\\n## Section 2\\n\\n..."
}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 4096,
          },
        }),
      }
    );

    const data = await response.json();
    console.log('Gemini status:', response.status);

    if (!response.ok) {
      console.error('Gemini API error:', data);
      return NextResponse.json(
        { error: 'Gemini API failed', details: data },
        { status: 500 }
      );
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    console.log('Gemini raw response (first 300 chars):', text.substring(0, 300));

    // Clean and extract JSON
    const cleaned = text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');

    const blog = JSON.parse(jsonMatch[0]);

    // Add required fields
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

    return NextResponse.json(blog);

  } catch (err) {
    console.error('generate-blog error:', err);
    return NextResponse.json(
      { error: 'Failed to generate blog post', details: String(err) },
      { status: 500 }
    );
  }
}