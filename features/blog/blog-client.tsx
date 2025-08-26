"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MarkdownRenderer from "@/features/blog/components/mdrender";
import { formatDate } from "@/lib/blog-utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ShareButtons } from "@/features/blog/components/share-buttons";
import { RelatedPosts } from "@/features/blog/components/related-posts";
import { QuoteShareProvider } from "@/components/quote-share/QuoteShareProvider";
import {
  ArrowLeft,
  Clock,
  Eye,
  Calendar,
  Share2,
  Bookmark,
  ChevronUp,
  Menu,
  X
} from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
  children?: TocItem[];
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  coverImage?: string;
  techTags: string[];
  meta: {
    publishedDate: string;
    author: {
      name: string;
      avatar?: string;
    };
    views?: number;
  };
}

interface BlogPostClientProps {
  post: BlogPost;
  fileContent: string;
  readingTime: number;
  relatedPosts: BlogPost[];
}

// Table of Contents Component
function TableOfContents({ content }: { content: string }) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  // Build TOC from rendered headings (h1 and h2)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const headings = Array.from(document.querySelectorAll('h1[id],h2[id]')) as HTMLHeadingElement[];
      const toc: TocItem[] = [];
      let lastH1: TocItem | null = null;

      headings.forEach(h => {
        const item: TocItem = {
          id: h.id,
          text: h.textContent || '',
          level: h.tagName === 'H1' ? 1 : 2,
        };
        if (item.level === 1) {
          lastH1 = { ...item, children: [] };
          toc.push(lastH1);
        } else if (item.level === 2 && lastH1) {
          lastH1.children!.push(item);
        }
      });
      setTocItems(toc);
    }, 100);

    return () => clearTimeout(timeout);
  }, [content]);

  // Observe headings for active state
  useEffect(() => {
    if (tocItems.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    // Observe all h1 and h2
    tocItems.forEach(h1 => {
      const el1 = document.getElementById(h1.id);
      if (el1) observer.observe(el1);
      h1.children?.forEach(h2 => {
        const el2 = document.getElementById(h2.id);
        if (el2) observer.observe(el2);
      });
    });

    return () => observer.disconnect();
  }, [tocItems]);

  if (tocItems.length === 0) return null;

  // Render TOC recursively
  const renderToc = (items: TocItem[]) => (
    <ul className="space-y-1">
      {items.map(item => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={`block py-1 px-2 text-sm rounded-md transition-all duration-200 hover:bg-muted/50 ${
              activeId === item.id
                ? 'bg-primary/10 text-primary border-l-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setIsOpen(false)}
            style={{ marginLeft: item.level === 2 ? 20 : 0 }}
          >
            {item.text}
          </a>
          {item.children && item.children.length > 0 && (
            <ul className="ml-4 border-l border-border/30 pl-2 space-y-1">
              {renderToc(item.children)}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile TOC Toggle */}
      <div className="lg:hidden fixed top-20 right-4 z-40">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          <span className="ml-2 text-xs">Contents</span>
        </Button>
      </div>

      {/* Desktop TOC - Sticky in Content Section */}
      <div className="hidden lg:block">
        <div className="sticky top-32">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 max-h-[70vh] overflow-y-auto">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold mb-3 text-foreground">Table of Contents</h3>
              <nav className="space-y-1">{renderToc(tocItems)}</nav>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile TOC Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-background/80 backdrop-blur-sm">
          <Card className="absolute top-20 right-4 left-4 max-w-sm ml-auto bg-card border-border max-h-[70vh] overflow-y-auto">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold mb-3 text-foreground">Table of Contents</h3>
              <nav className="space-y-1">{renderToc(tocItems)}</nav>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

// Back to Top Component
function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      size="sm"
      variant="secondary"
      className="fixed bottom-8 right-8 z-40 rounded-full shadow-lg hover:scale-105 text-primary-foreground"
    >
      <ChevronUp className="h-4 w-4" />
    </Button>
  );
}

export default function BlogPostClient({
  post,
  fileContent,
  readingTime,
  relatedPosts
}: BlogPostClientProps) {
  return (
    <QuoteShareProvider
      author={post.meta.author.name}
      source="parhamf.com"
      blogTitle={post.title}
      watermark="yourblog.com"
    >
      <div className="min-h-screen bg-background">
      {/* Header with gradient overlay */}
      <div className="relative">
        {post.coverImage && (
          <div className="absolute inset-0 h-96 md:h-[500px] opacity-50">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
        )}

        <div className="relative z-10">
          {/* Navigation */}
          <div className="container mx-auto px-4 pt-8 pb-4">
            <Button variant="ghost" asChild className="mb-6 hover:bg-card/50">
              <Link href="/blogs" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Blogs
              </Link>
            </Button>
          </div>

          {/* Hero Section */}
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-6 border-secondary/30">
                {post.category}
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {post.title}
              </h1>

              <p className="text-xl md:text-2xl text mb-8 leading-relaxed max-w-3xl">
                {post.description}
              </p>

              {/* Author and Meta */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                    <AvatarImage src={post.meta.author.avatar} alt={post.meta.author.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {post.meta.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-foreground">{post.meta.author.name}</div>
                    <div className="text-sm text-muted-foreground">Author</div>
                  </div>
                </div>

                <Separator orientation="vertical" className="h-12 hidden sm:block" />

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.meta.publishedDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{readingTime} min read</span>
                  </div>
                  {post.meta.views && (
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>{post.meta.views} views</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.techTags.map(tag => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-muted/50 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-2 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Table of Contents - Desktop */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <TableOfContents content={fileContent} />
            </div>

            {/* Article Content */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              <Card className="bg-card/30 backdrop-blur-sm border-border/50 overflow-hidden">
                <CardContent className="p-3 md:p-12">
                  {/* Content */}
                  <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-li:text-foreground/90 prose-strong:text-foreground prose-code:text-primary prose-pre:bg-muted prose-pre:border prose-pre:border-border/50">
                    <MarkdownRenderer content={fileContent} />
                  </div>

                  {/* Article Footer */}
                  <div className="mt-12 pt-8 border-t border-border/50">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      {/* <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" className="bg-background/50">
                          <Bookmark className="h-4 w-4 mr-2" />
                          Save Article
                        </Button>
                        <Button variant="outline" size="sm" className="bg-background/50">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div> */}
                      <ShareButtons title={post.title} url={`/blogs/${post.slug}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="lg:col-start-4 lg:col-span-9">
              <Card className="bg-card/30 backdrop-blur-sm border-border/50">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-foreground">Related Articles</h2>
                  <RelatedPosts posts={relatedPosts} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      <BackToTop />
    </div>
    </QuoteShareProvider>
  );
}