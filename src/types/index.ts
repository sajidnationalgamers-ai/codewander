export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  tags: string[];
  author: Author;
  publishedAt: string;
  readTime: number;
  featured: boolean;
  coverImage?: string;
}

export interface Author {
  name: string;
  avatar: string;
  bio: string;
}

export type Category = 'AI' | 'Web Dev' | 'Apps' | 'Cybersecurity' | 'DevOps';

export interface BlogIdea {
  title: string;
  outline: string[];
  category: Category;
  tags: string[];
}
