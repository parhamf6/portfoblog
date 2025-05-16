'use client';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types/blog';
// import { AnimatedBorder } from './animated-border';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Construct the full image URL
  const imageUrl = post.cover?.formats?.thumbnail?.url 
    ? `http://localhost:1337${post.cover.formats.thumbnail.url}`
    : 'images/blog-placeholder.jpg';

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'tween', stiffness: 300 }}
      className="group h-full w-full rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700 shadow-md hover:shadow-xl transition-shadow duration-300 bg-background-light dark:bg-background-dark"
    >
      <div className="relative h-48 w-full">
        <img
          src={imageUrl}
          alt={post.cover?.alternativeText || post.title}
          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
        />
      </div>
      <div className="p-5 flex flex-col h-[calc(100%-12rem)]">
        <h3 className="text-2xl font-semibold mb-2 text-foreground-light dark:text-foreground-dark">{post.title}</h3>
        <p className="text-textc-light dark:text-textc-dark mb-4 flex-grow opacity-[75%]">{post.description}</p>
        <div className="flex items-center justify-between gap-4 mt-auto">
            <a
                href={`/blog/${post.slug}`}
                className="text-sm font-medium px-4 py-2 rounded-md bg-primary border hover:bg-[#eab308] transition"
            >
                Read More
            </a>
            <div>
              <div>
                By ParhamF
              </div>
              <div>
                {new Date(post.publishedAt).toLocaleDateString()}
              </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
