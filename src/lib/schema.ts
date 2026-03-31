// src/lib/schema.ts - Reusable schema generators

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CodeWander',
  url: 'https://codewander.vercel.app',
  logo: 'https://codewander.vercel.app/logo.png',
  description: 'A free tech blog and developer resource for AI, web development, cybersecurity, DevOps, and more.',
  sameAs: [
    'https://github.com/codewander',
    'https://twitter.com/codewander',
  ],
  contact: {
    '@type': 'ContactPoint',
    url: 'https://codewander.vercel.app/about',
    contactType: 'Customer Support',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is CodeWander free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, CodeWander is 100% free. All content is completely free with no paywalls or hidden fees.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who writes the articles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Articles are written by experienced developers and technical writers with expertise in various technologies.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often is new content published?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'New articles are published weekly, covering the latest trends in web development, AI, cybersecurity, and DevOps.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I contribute to CodeWander?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Contributions are welcome! Visit our GitHub repository or contact us for guidelines on submitting articles.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need an account to read articles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No account is required. All content is accessible without registration.',
      },
    },
  ],
};

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const blogListingSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'CodeWander Blog',
  description: 'A collection of in-depth articles about web development, AI, cybersecurity, and DevOps.',
  url: 'https://codewander.vercel.app/blog',
  isPartOf: {
    '@type': 'WebSite',
    name: 'CodeWander',
    url: 'https://codewander.vercel.app',
  },
};

// Usage in pages:
// In your RootLayout or specific pages:
// <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

export const createPostSchema = (post: any) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.excerpt,
  image: post.coverImage || 'https://codewander.vercel.app/default-image.png',
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
});