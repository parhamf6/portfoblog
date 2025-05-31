"use client"

import { motion } from 'framer-motion';
import BlogCard from '../../Blog/blogs-page/ui/blog-card';
// import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { InteractiveHoverButton } from '../../../app/components/ui/21stdev/cool-hover-btm';
import { useEffect, useState } from 'react';
import { BlogPost } from '@/types/blog';
import { getBlogPosts } from '@/actions/blog-actions';

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getBlogPosts();
        // Get only the first 3 posts
        setPosts(fetchedPosts.slice(0, 3));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 md:px-8 border p-4 m-4 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 border p-4 m-4 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <div className='flex items-center justify-between ml-4 mr-4'>
          <div className=" mb-12">
            <h2 className="text-4xl font-bold mb-2 dark:text-foreground-dark">Blog</h2>
            <p className="text-textc-light dark:text-textc-dark text-lg">
              Here are my top blog Posts.
            </p>
          </div>
          <div className='relative items-center mb-12 justify-center'>
            <Link href={"/blog"}>
              <InteractiveHoverButton></InteractiveHoverButton>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="w-[350px] h-[500px]"
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
