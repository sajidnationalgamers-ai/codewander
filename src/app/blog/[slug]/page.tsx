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
    keywords: [...post.tags, post.category],
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      url: `https://codewander.vercel.app/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function BlogPostPage({ params, searchParams }: Props) {
  const post = getPostBySlug(params.slug);
  const isAI = searchParams?.ai === 'true';

  if (!post && !isAI) notFound();

  const related = post
    ? posts.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 3)
    : [];

  // JSON-LD Schema for BlogPosting
  const jsonLd = post ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `https://codewander.vercel.app/og-image.png`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: 'https://codewander.vercel.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CodeWander',
      logo: {
        '@type': 'ImageObject',
        url: 'https://codewander.vercel.app/logo.png',
        width: 250,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://codewander.vercel.app/blog/${post.slug}`,
    },
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogPostClient
        post={post ?? null}
        related={related}
        isAIGenerated={isAI}
        slug={params.slug}
      />
    </>
  );
}