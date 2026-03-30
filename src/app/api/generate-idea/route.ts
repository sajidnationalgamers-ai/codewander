import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    
    // Debug: check if key is loading
    console.log('API Key loaded:', apiKey ? 'YES - ' + apiKey.substring(0, 15) + '...' : 'NO - KEY MISSING');

    if (!apiKey) {
      return NextResponse.json(getMockIdea(topic));
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
        max_tokens: 600,
        messages: [
          {
            role: 'user',
            content: `Generate a tech blog post idea about: "${topic}".

Return ONLY valid JSON (no markdown, no backticks) in this exact format:
{
  "title": "compelling blog post title",
  "category": "Web Dev",
  "tags": ["tag1", "tag2", "tag3"],
  "outline": [
    "Introduction",
    "Section 2",
    "Section 3",
    "Conclusion"
  ]
}`,
          },
        ],
      }),
    });

    console.log('Anthropic response status:', response.status);

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', errText);
      return NextResponse.json(getMockIdea(topic));
    }

    const data = await response.json();
    console.log('Response data:', JSON.stringify(data).substring(0, 100));

    const text = data.content?.[0]?.text ?? '';
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
    title: `The Complete Guide to ${topic.charAt(0).toUpperCase() + topic.slice(1)}`,
    category: 'Web Dev',
    tags: [topic.split(' ')[0], 'tutorial', 'guide'],
    outline: [
      'Introduction — why this matters',
      `Core concepts of ${topic}`,
      'Step-by-step implementation',
      'Common mistakes to avoid',
      'Conclusion and next steps',
    ],
  };
}