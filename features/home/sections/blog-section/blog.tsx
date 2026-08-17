"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogPosts } from "@/lib/data/blogs/blogs-list";
import { SectionHeading } from "@/features/home/components/section-heading";

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function BlogSection() {
  const posts = [...BlogPosts]
    .sort(
      (a, b) =>
        new Date(b.meta.publishedDate).getTime() - new Date(a.meta.publishedDate).getTime(),
    )
    .slice(0, 2);

  return (
    <section id="blog" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            cmd="tail -2 notes/"
            title="Latest notes."
            right={
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                all notes <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />

          <div className="mt-12">
            {posts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 border-t border-border py-7 transition-colors hover:bg-muted/40 sm:grid-cols-[3rem_1fr_auto] sm:px-4"
              >
                <span className="flex items-center gap-2 font-mono text-sm tabular-nums text-muted-foreground">
                  <span className="hidden text-primary opacity-0 transition-opacity group-hover:opacity-100 sm:inline">
                    ▍
                  </span>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold tracking-tight transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary sm:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 font-mono text-sm text-muted-foreground">
                    {post.description}
                  </p>
                </div>
                <div className="text-right font-mono text-sm text-muted-foreground">
                  <time dateTime={post.meta.publishedDate}>
                    {formatDate(post.meta.publishedDate)}
                  </time>
                  <div className="text-xs opacity-70">{post.meta.readingTime} min read</div>
                </div>
              </Link>
            ))}
            <div className="border-t border-border" aria-hidden />
          </div>
        </motion.div>
      </div>
    </section>
  );
}