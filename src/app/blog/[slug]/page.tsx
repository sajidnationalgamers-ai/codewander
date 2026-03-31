import { Metadata } from 'next';
import { getPostBySlug, posts } from '@/data/posts';
import BlogPostClient from './BlogPostClient';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Blog Post' };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params, searchParams }: Props) {
  const post = getPostBySlug(params.slug);
  const isAI = searchParams?.ai === 'true';

  if (!post && !isAI) notFound();

  const related = post
    ? posts.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 3)
    : [];

  return (
    <BlogPostClient
      post={post ?? null}
      related={related}
      isAIGenerated={isAI}
      slug={params.slug}
    />
  );
}