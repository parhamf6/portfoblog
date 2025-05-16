// lib/content/articlesContent.ts
import { getBlogPosts } from "@/actions/blog-actions";

export async function getbBlogContent() {
  const articles = await getBlogPosts();

  // Optional transformation
  const processed = articles.map((article: any) => ({
    id: article.id,
    title: article.title,
    excerpt: article.description,
    date: article.date,
  }));

  return processed;
}
