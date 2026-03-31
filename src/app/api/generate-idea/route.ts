import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    console.log('Gemini Key loaded:', apiKey ? 'YES' : 'NO');

    if (!apiKey) {
      return NextResponse.json(getMockIdea(topic));
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate a tech blog post idea about: "${topic}".

Return ONLY valid JSON (no markdown, no backticks) in this exact format:
{
  "title": "compelling blog post title",
  "category": "one of: AI | Web Dev | Apps | Cybersecurity | DevOps",
  "tags": ["tag1", "tag2", "tag3"],
  "outline": [
    "Introduction — why this matters",
    "Section 2 title",
    "Section 3 title",
    "Section 4 title",
    "Conclusion — key takeaways"
  ]
}`
            }]
          }]
        }),
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    const cleaned = text.replace(/```json|```/g, '').trim();
    const idea = JSON.parse(cleaned);

    return NextResponse.json(idea);

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
      'Conclusion — next steps and resources',
    ],
  };
}