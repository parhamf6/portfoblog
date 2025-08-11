// Server Component - blog/[slug]/page.tsx
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BlogPosts } from "@/lib/data/blogs/blogs-list";
import { calculateReadingTime } from "@/lib/blog-utils";
import BlogPostClient from "@/features/blog/blog-client";

interface BlogPageProps {
  params: { slug: string };
}

// Generate metadata for the page
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = params;
  const post = BlogPosts.find(post => post.slug === slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.coverImage || ''],
      type: 'article',
      publishedTime: post.meta.publishedDate,
      authors: [post.meta.author.name],
      tags: post.techTags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.coverImage || ''],
    },
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  const { slug } = params;
  
  // Find the post in our data
  const post = BlogPosts.find(post => post.slug === slug);
  
  // Path to the markdown file
  const filePath = path.join(process.cwd(), "public", "content", "blogs", `${slug}.md`);
  
  // If file doesn't exist → 404
  if (!fs.existsSync(filePath) || !post) {
    notFound();
  }
  
  // Read file content
  const fileContent = fs.readFileSync(filePath, "utf-8");
  
  // Calculate reading time
  const readingTime = calculateReadingTime(fileContent);
  
  // Find related posts (same category or similar tags)
  const relatedPosts = BlogPosts
    .filter(p => p.id !== post.id && (p.category === post.category || 
          p.techTags.some(tag => post.techTags.includes(tag))))
    .slice(0, 3);

  // Pass all data to client component
  return (
    <BlogPostClient 
      post={post}
      fileContent={fileContent}
      readingTime={readingTime}
      relatedPosts={relatedPosts}
    />
  );
}