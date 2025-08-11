// features/blog/components/related-posts.tsx
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogCardProps } from "@/types/blogs";
import { formatDate } from "@/lib/blog-utils";

interface RelatedPostsProps {
  posts: BlogCardProps[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;
  
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
        <div className="space-y-4">
          {posts.map(post => (
            <Link key={post.id} href={`/blogs/${post.slug}`} className="block">
              <div className="flex gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                  <Image 
                    src={post.coverImage || ''} 
                    alt={post.title} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium line-clamp-2 mb-1">{post.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                    <span>{formatDate(post.meta.publishedDate)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
}