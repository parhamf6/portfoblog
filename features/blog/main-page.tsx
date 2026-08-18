"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookmarkSimple, MagnifyingGlass, X } from "@phosphor-icons/react";
import { BlogPosts } from "@/lib/data/blogs/blogs-list";
import { useBookmarks } from "@/hooks/useBookmark";
import BlogBackground from "./components/blog-background";

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function BlogIndex() {
  const [query, setQuery] = useState("");
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const { bookmarkedBlogs, isBookmarked, toggleBookmark } = useBookmarks();

  const posts = [...BlogPosts]
    .sort(
      (a, b) =>
        new Date(b.meta.publishedDate).getTime() - new Date(a.meta.publishedDate).getTime(),
    )
    .filter((post) => {
      const q = query.toLowerCase();
      const matches =
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.techTags.some((tag) => tag.toLowerCase().includes(q));
      const matchesBookmark = !bookmarkedOnly || isBookmarked(post.id);
      return matches && matchesBookmark;
    });

  return (
    <div className="relative mb-32 pt-20">
      <BlogBackground />
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
        <header>
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">$</span> cat notes.md
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            The lab notebook
          </h1>
          <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground">
            Notes, tutorials and the stories behind the projects.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="relative w-full max-w-md">
              <MagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search notes..."
                aria-label="Search notes"
                className="w-full rounded-md border border-border bg-background py-2 pl-10 pr-9 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setBookmarkedOnly((v) => !v)}
              className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 font-mono text-xs transition-colors ${
                bookmarkedOnly
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {bookmarkedOnly ? (
                <BookmarkSimple weight="fill" className="h-3.5 w-3.5" />
              ) : (
                <BookmarkSimple className="h-3.5 w-3.5" />
              )}
              bookmarks ({bookmarkedBlogs.length})
            </button>
          </div>
        </header>

        <div className="mt-12">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div
                key={post.id}
                className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 border-t border-border py-7 transition-colors hover:bg-muted/30 sm:grid-cols-[3rem_1fr_auto] sm:px-4"
              >
                <span className="font-mono text-sm tabular-nums text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <Link href={`/blogs/${post.slug}`}>
                    <h2 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="mt-1 line-clamp-2 max-w-2xl font-mono text-sm text-muted-foreground">
                    {post.description}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground">
                    <span>{post.category}</span>
                    <time dateTime={post.meta.publishedDate}>
                      {formatDate(post.meta.publishedDate)}
                    </time>
                    <span>{post.meta.readingTime} min read</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleBookmark(post.id)}
                    aria-label={isBookmarked(post.id) ? "Remove bookmark" : "Bookmark"}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {isBookmarked(post.id) ? (
                      <BookmarkSimple weight="fill" className="h-4 w-4 text-primary" />
                    ) : (
                      <BookmarkSimple className="h-4 w-4" />
                    )}
                  </button>
                  <Link href={`/blogs/${post.slug}`} aria-label={`Read ${post.title}`}>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="border-t border-border py-16 text-center font-mono text-sm text-muted-foreground">
              {bookmarkedOnly
                ? "no bookmarked notes yet."
                : `no notes match "${query}".`}
            </p>
          )}
          <div className="border-t border-border" aria-hidden />
        </div>
      </div>
    </div>
  );
}