// Blog Card Interfaces
interface BlogAuthor {
  name: string;
  avatar?: string;
  bio?: string;
}

export interface BlogMeta {
  author: BlogAuthor;
  publishedDate: string;
  readingTime?: number;
  views?: number;
  category?: string;
}

export interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  techTags: string[];
  meta: BlogMeta;
  slug: string;
  category:string;
  featured?: boolean;
  primaryTech?: string;
  className?: string;
  layout?: 'vertical' | 'horizontal';
  onClick?: (slug: string) => void;
}