import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostBySlug, posts } from '@/data/posts';
import BlogPostClient from './BlogPostClient';

interface Props {
  params: { slug: string };
  searchParams: { ai?: string };
}

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'AI Generated Blog',
      description: 'AI-generated content by CodeWander',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default function BlogPostPage({ params, searchParams }: Props) {
  const post = getPostBySlug(params.slug);

  // If post not found but ai=true, client will load from sessionStorage
  if (!post && searchParams.ai !== 'true') {
    notFound();
  }

  const related = post
    ? posts.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 3)
    : [];

  return (
    <BlogPostClient
      post={post ?? null}
      related={related}
      isAIGenerated={!post && searchParams.ai === 'true'}
      slug={params.slug}
    />
  );
}