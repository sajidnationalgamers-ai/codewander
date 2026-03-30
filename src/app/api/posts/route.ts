import { NextRequest, NextResponse } from 'next/server';
import { posts, getPostsByCategory, searchPosts } from '@/data/posts';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') ?? 'All';
  const query = searchParams.get('q') ?? '';

  let result = query ? searchPosts(query) : getPostsByCategory(category);

  return NextResponse.json({
    posts: result,
    total: result.length,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const required = ['title', 'excerpt', 'content', 'category'];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }

    // In a real app this would write to MongoDB
    const newPost = {
      slug: body.title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-'),
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category,
      tags: body.tags ?? [],
      author: {
        name: 'CodeWander Author',
        avatar: '',
        bio: '',
      },
      publishedAt: new Date().toISOString().split('T')[0],
      readTime: Math.max(1, Math.ceil(body.content.split(' ').length / 200)),
      featured: body.featured ?? false,
    };

    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
