import { connectDB } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Post from '@/models/Post';

import { getPostsByCategory, searchPosts } from '@/data/posts';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') ?? 'All';
  const query = searchParams.get('q') ?? '';

  try {
    await connectDB();

    // 🔥 TypeScript fix
    const PostModel = Post as any;

    let mongoPosts: any[] = [];

    if (query) {
      mongoPosts = await PostModel.find({
        title: { $regex: query, $options: 'i' },
      }).lean();
    } else if (category !== 'All') {
      mongoPosts = await PostModel.find({
        category: category,
      }).lean();
    } else {
      mongoPosts = await PostModel.find({}).lean();
    }

    // 🔥 Local posts
    const localPosts = query
      ? searchPosts(query)
      : getPostsByCategory(category);

    // 🔥 Merge both
    const allPosts = [...localPosts, ...mongoPosts];

    return NextResponse.json({
      posts: allPosts,
      total: allPosts.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const PostModel = Post as any;

    const body = await req.json();

    const newPost = await PostModel.create({
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
      readTime: Math.max(
        1,
        Math.ceil(body.content.split(' ').length / 200)
      ),
      featured: body.featured ?? false,
    });

    return NextResponse.json(
      { success: true, post: newPost },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
} 