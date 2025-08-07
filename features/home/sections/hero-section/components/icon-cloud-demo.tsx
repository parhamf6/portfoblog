"use client"
import { IconCloud } from "@/features/home/components/icon-cloud";
import { motion } from "framer-motion";

const slugs = [
  "typescript",
  "javascript",
  "python",
  "react",
  "fastapi",
  "django",
  "html5",
  "css3",
  "nodedotjs",
  "nextdotjs",
  "postgresql",
  "linux",
  "tailwindcss",
  "docker",
  "git",
  "github",
];

export function IconCloudDemo() {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );

  return (
    <motion.div 
      className="relative w-full max-w-md h-64 sm:h-80 md:h-96 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.4 }}
    >
      <IconCloud images={images} />
    </motion.div>
  );
}