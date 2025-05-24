'use client';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types/blog';
import { STRAPI_MEDIA_URL } from '@/config/link_storage';
// import { AnimatedBorder } from './animated-border';
import Image from 'next/image';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const getImageUrl = (cover: any): string => {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || '';

    const imageFormats = cover?.formats;

    const imageUrl =
      imageFormats?.large?.url ||
      imageFormats?.medium?.url ||
      imageFormats?.small?.url ||
      cover?.url;

    return imageUrl?.startsWith('http')
      ? imageUrl
      : `${baseUrl}${imageUrl || '/images/blog-placeholder.jpg'}`;
  };

  // Construct the full image URL
  const imageUrl = getImageUrl(post.cover);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'tween', stiffness: 300 }}
      className="group h-full w-full rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700 shadow-md hover:shadow-xl transition-shadow duration-300 bg-background-light dark:bg-background-dark"
    >
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={post.cover?.alternativeText || post.title}
          fill
          className="object-cover group-hover:opacity-90 transition-opacity rounded-t-lg"
          sizes="(max-width: 768px) 100vw, 600px"
          quality={90}
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
                {new Date(post.date).toLocaleDateString()}
              </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
