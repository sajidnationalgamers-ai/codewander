import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostBySlug, posts } from '@/data/posts';
import BlogPostClient from './BlogPostClient';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };

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
      authors: [post.author.name],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  // Related posts: same category, excluding current
  const related = posts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return <BlogPostClient post={post} related={related} />;
}
