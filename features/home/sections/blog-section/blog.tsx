// components/project-section.tsx
"use client"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BlogCard } from "./components/blog-card";
import { BlogPosts as Allposts } from "@/lib/data/blogs/blogs-list";
import Link from "next/link";
// import { useRouter } from "next/router";
import { fadeInUp , slideUpBlur, slideInRight , simple } from "@/components/global/framer-varients";
import { useAnimateInView } from "@/hooks/useAnimateInView";
import { ShimmerButton } from "@/components/shimmer-btn";
import { BookOpen } from "lucide-react";
export default function BlogSection() {
    const { ref, inView } = useAnimateInView();
    // const router = useRouter()
    // const handleBlogClick = (slug: string) => {
    // console.log(`Navigate to: /blog/${slug}`);
    // router.push(`/blog/${slug}`)
    // };
    const BlogPosts = Allposts.slice(-3)
    return (
        <motion.section 
        ref={ref}
        variants={simple}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="py-16 md:py-24 px-4 md:px-8">
        <div className="mx-auto">
            <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4 px-1 md:px-16 lg:px-32"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            >
            <div>
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-2">Blogs</h2>
                <p className="text-muted-foreground max-w-2xl">
                Explore my latest blogs. Each blog represents a stroy of solving unique challenge.
                </p>
            </div>
            
            <Button asChild variant="outline" className="mt-4 md:mt-0">
                <Link href="/blogs">
                View All Blogs
                </Link>
            </Button>
          {/* <button className="animated-button blog-button">
            <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
            <span className="text">Read My Blog</span>
            <span className="circle"></span>
            <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
          </button> */}
            
            
            </motion.div>
            <div className="flex flex-wrap items-center justify-center gap-6">
            {BlogPosts.map((blog, index) => (
                <div
                key={blog.id}
                >
                <BlogCard {...blog} layout="vertical" />
                </div>
            ))}
            </div>
        </div>
        </motion.section>
    );
}