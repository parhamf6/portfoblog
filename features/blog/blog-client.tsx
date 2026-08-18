"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import MarkdownRenderer from "@/features/blog/components/mdrender";
import { formatDate } from "@/lib/blog-utils";
import { ShareButtons } from "@/features/blog/components/share-buttons";
import { QuoteShareProvider } from "@/components/quote-share/QuoteShareProvider";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  techTags: string[];
  meta: {
    publishedDate: string;
    author: { name: string };
    views?: number;
  };
}

interface BlogPostClientProps {
  post: BlogPost;
  fileContent: string;
  readingTime: number;
  relatedPosts: BlogPost[];
}

export default function BlogPostClient({
  post,
  fileContent,
  readingTime,
  relatedPosts,
}: BlogPostClientProps) {
  return (
    <QuoteShareProvider
      author={post.meta.author.name}
      source="parhamf.com"
      blogTitle={post.title}
      watermark="parhamf.com"
    >
      <div className="min-h-screen pb-24">
        <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
          {/* Back */}
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            all notes
          </Link>

          {/* Header */}
          <header className="mt-10">
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-primary">$</span> cat notes/{post.slug}.md
            </p>
            <h1 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 font-mono text-[15px] leading-relaxed text-muted-foreground">
              {post.description}
            </p>

            {/* Meta */}
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border py-4 font-mono text-xs text-muted-foreground">
              <span className="text-primary">{post.category}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.meta.publishedDate}>{formatDate(post.meta.publishedDate)}</time>
              <span aria-hidden>·</span>
              <span>{readingTime} min read</span>
              <span className="ml-auto">
                <ShareButtons title={post.title} url={`parhamf.com/blogs/${post.slug}`} />
              </span>
            </div>

            {/* Tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {post.techTags.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </header>

          {/* Article */}
          <article className="mt-12">
            <div className="prose prose-lg max-w-none">
              <MarkdownRenderer content={fileContent} />
            </div>
          </article>

          {/* Footer */}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 font-mono text-sm">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              more notes
            </Link>
            <ShareButtons title={post.title} url={`parhamf.com/blogs/${post.slug}`} />
          </div>

          {/* Related */}
          {relatedPosts.length > 0 && (
            <section className="mt-20">
              <p className="font-mono text-sm text-muted-foreground">
                <span className="text-primary">$</span> grep -l related notes/
              </p>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">
                Keep reading
              </h2>
              <div className="mt-8">
                {relatedPosts.map((p, i) => (
                  <Link
                    key={p.id}
                    href={`/blogs/${p.slug}`}
                    className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 border-t border-border py-6 transition-colors hover:bg-muted/40 sm:px-4"
                  >
                    <span className="font-mono text-sm tabular-nums text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                        {p.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 font-mono text-sm text-muted-foreground">
                        {p.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ))}
                <div className="border-t border-border" aria-hidden />
              </div>
            </section>
          )}
        </div>
      </div>
    </QuoteShareProvider>
  );
}