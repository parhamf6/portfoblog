"use client"
import type React from "react"
import { useState } from "react"
import { ChevronRight, Clock, Calendar, User, ArrowUpRight, Bookmark, BookmarkCheck, Eye, Sparkles, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useBookmarks } from "@/hooks/useBookmark"

// Enhanced Bookmark Button Component
const ModernBookmarkButton = ({ 
  isBookmarked = false, 
  onToggle, 
  className = "",
}) => {
  const [showParticles, setShowParticles] = useState(false);
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    e.stopPropagation();
    
    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const newRipple = {
      id: Date.now(),
      x: centerX,
      y: centerY
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 800);

    // Show particles for bookmark action
    if (!isBookmarked) {
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 1200);
    }

    onToggle?.();
  };

  // Particle animation variants
  const particleVariants = {
    hidden: { 
      scale: 0, 
      opacity: 0,
      rotate: 0
    },
    visible: (i) => ({
      scale: [0, 1, 0.8, 0],
      opacity: [0, 1, 0.8, 0],
      rotate: [0, 180 + (i * 60), 360 + (i * 60)],
      x: [0, Math.cos(i * Math.PI / 3) * (25 + i * 8)],
      y: [0, Math.sin(i * Math.PI / 3) * (25 + i * 8)],
      transition: {
        duration: 1.2,
        delay: i * 0.08,
        ease: [0.23, 1, 0.32, 1]
      }
    })
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`
        p-2 rounded-full relative overflow-hidden
        bg-white/10 backdrop-blur-md hover:bg-white/40 
        border border-secondary/50 hover:border-secondary/70
        transition-all duration-300 group/bookmark
        focus:outline-none focus:ring-2 focus:ring-white/30
        ${className}
      `}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 8px 32px rgba(255, 255, 255, 0.1)"
      }}
      whileTap={{ scale: 0.9 }}
      animate={{
        rotate: isBookmarked ? [0, -5, 5, 0] : 0,
      }}
      transition={{ 
        rotate: { duration: 0.6, ease: "easeInOut" },
        scale: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
      {/* Ripple Effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full border-2 border-orange-400/50"
            style={{
              left: ripple.x - 15,
              top: ripple.y - 15,
              width: 30,
              height: 30,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: 2.5, 
              opacity: 0,
              borderWidth: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Floating Particles */}
      <AnimatePresence>
        {showParticles && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  marginLeft: -2,
                  marginTop: -2,
                }}
                variants={particleVariants}
                custom={i}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {i % 3 === 0 ? (
                  <Sparkles className="w-3 h-3 text-orange-400" />
                ) : i % 3 === 1 ? (
                  <Heart className="w-3 h-3 text-pink-400" />
                ) : (
                  <div className="w-1 h-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full" />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={isBookmarked ? {
          boxShadow: [
            "0 0 0 0 rgba(251, 146, 60, 0)",
            "0 0 0 10px rgba(251, 146, 60, 0.1)",
            "0 0 0 0 rgba(251, 146, 60, 0)"
          ]
        } : {}}
        transition={{ duration: 1, repeat: isBookmarked ? Infinity : 0, repeatDelay: 2 }}
      />

      {/* Main Icon with Morphing Animation */}
      <motion.div
        className="relative z-10"
        animate={{
          rotateY: isBookmarked ? [0, 180, 360] : 0,
          scale: isBookmarked ? [1, 1.2, 1] : 1
        }}
        transition={{ 
          rotateY: { duration: 0.8, ease: "backOut" },
          scale: { duration: 0.4, ease: "backOut" }
        }}
      >
        <AnimatePresence mode="wait">
          {isBookmarked ? (
            <motion.div
              key="bookmarked"
              initial={{ scale: 0, opacity: 0, rotateZ: -180 }}
              animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
              exit={{ scale: 0, opacity: 0, rotateZ: 180 }}
              transition={{ duration: 0.5, ease: "backOut" }}
              className="relative"
            >
              <BookmarkCheck className="w-5 h-5 text-orange-400 drop-shadow-lg" />
              
              {/* Pulsing glow for bookmarked state */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <BookmarkCheck className="w-5 h-5 text-orange-400/30" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="unbookmarked"
              initial={{ scale: 0, opacity: 0, rotateZ: -180 }}
              animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
              exit={{ scale: 0, opacity: 0, rotateZ: 180 }}
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              <motion.div
                whileHover={{
                  rotateZ: 12,
                  y: -2
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Bookmark className="w-5 h-5 text-white/80 group-hover/bookmark:text-orange-400 transition-colors duration-300" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Magnetic field effect */}
      <motion.div
        className="absolute inset-0 rounded-full border border-orange-400/20"
        animate={isBookmarked ? {
          scale: [1, 1.3, 1],
          opacity: [0, 0.3, 0]
        } : {}}
        transition={{ 
          duration: 1.5, 
          repeat: isBookmarked ? Infinity : 0, 
          repeatDelay: 1 
        }}
      />
    </motion.button>
  );
};

// TechTag component with enhanced styling using semantic tokens
interface TechTagProps {
  tech: string
  className?: string
}

const TechTag: React.FC<TechTagProps> = ({ tech, className = "" }) => {
  const getTechStyles = (tech: string) => {
    const techKey = tech.toLowerCase()
    const techConfig = {
      typescript: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
      javascript: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" },
      react: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30" },
      nextjs: { bg: "bg-gray-500/20", text: "text-gray-300", border: "border-gray-500/30" },
      tailwind: { bg: "bg-teal-500/20", text: "text-teal-400", border: "border-teal-500/30" },
      python: { bg: "bg-blue-600/20", text: "text-blue-400", border: "border-blue-600/30" },
      "network security": { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
      node: { bg: "bg-green-600/20", text: "text-green-400", border: "border-green-600/30" },
      "dev ops": { bg: "bg-emerald-600/20", text: "text-emerald-400", border: "border-emerald-600/30" },
      rag: { bg: "bg-indigo-600/20", text: "text-indigo-400", border: "border-indigo-600/30" },
      dns: { bg: "bg-orange-600/20", text: "text-orange-400", border: "border-orange-600/30" },
      owasp: { bg: "bg-red-600/20", text: "text-red-400", border: "border-red-600/30" },
      markdown: { bg: "bg-gray-600/20", text: "text-gray-400", border: "border-gray-600/30" },
      automation: { bg: "bg-violet-600/20", text: "text-violet-400", border: "border-violet-600/30" },
      github: { bg: "bg-gray-800/20", text: "text-gray-300", border: "border-gray-800/30" },
    }
    return (
      techConfig[techKey as keyof typeof techConfig] || {
        bg: "bg-muted/20",
        text: "text-muted-foreground",
        border: "border-muted/30",
      }
    )
  }

  const styles = getTechStyles(tech)
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium 
        border transition-all duration-300 hover:scale-105
        ${styles.bg} ${styles.text} ${styles.border} ${className}`}
    >
      {tech}
    </span>
  )
}

// BlogCardProps interface
interface BlogCardProps {
  id: string
  title: string
  description: string
  coverImage?: string
  techTags: string[]
  meta: {
    author: { name: string }
    publishedDate: string
    readingTime?: number
    views?: number
  }
  slug: string
  category: string
  featured?: boolean
  primaryTech?: string
  className?: string
  layout?: "vertical" | "horizontal"
  onClick?: (slug: string) => void
}

export const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  description,
  coverImage,
  techTags,
  meta,
  slug,
  category,
  featured = false,
  primaryTech,
  className = "",
  layout = "vertical",
  onClick,
}) => {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const bookmarked = isBookmarked(id)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const handleCardClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest(".bookmark-btn") && !(e.target as HTMLElement).closest(".read-more-btn")) {
      if (onClick) {
        onClick(slug)
      }
    }
  }

  const handleBookmarkClick = () => {
    console.log("[v0] Toggling bookmark for:", id)
    toggleBookmark(id)
  }

  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onClick) {
      onClick(slug)
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        group relative overflow-hidden cursor-pointer 
        bg-card backdrop-blur-sm rounded-2xl 
        shadow-lg hover:shadow-2xl transition-all duration-500 ease-out
        hover:scale-[1.02] hover:ring-2 hover:ring-primary/30
        border border-border hover:border-primary/50
        h-[520px] max-w-[420px]
        flex flex-col
        ${featured ? "ring-2 ring-primary/40 shadow-primary/20" : ""}
        ${className}
      `}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleCardClick(e as any)}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative overflow-hidden rounded-t-2xl bg-muted/20 w-full h-64">
        {coverImage && (
          <Image
            src={coverImage || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75 group-hover:hue-rotate-15"
            priority={featured}
            quality={90}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40 opacity-60 group-hover:opacity-90 transition-all duration-300" />

        <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-70 group-hover:opacity-100 transition-all  ease-in-out">
          {/* Top row - category and bookmark */}
          <div className="flex items-start justify-between">
            <span className="px-3 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/20">
              {category}
            </span>

            <ModernBookmarkButton
              isBookmarked={bookmarked}
              onToggle={handleBookmarkClick}
              className="bookmark-btn"
            />
          </div>

          {/* Bottom row - stats */}
          <div className="flex items-center justify-between text-white/90">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5" />
                <span>{meta.readingTime || 5} min</span>
              </div>

              {meta.views && (
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{meta.views}</span>
                </div>
              )}
            </div>

            {featured && (
              <span className="px-2.5 py-1 bg-orange-500/20 backdrop-blur-md text-orange-300 text-xs font-semibold rounded-full border border-orange-400/30">
                ⭐ Featured
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="relative flex flex-col flex-1 min-w-0 z-10 p-4">
        {/* Meta information */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span className="font-medium">{meta.author.name}</span>
          </div>

          <span className="text-border">•</span>

          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={meta.publishedDate}>{formatDate(meta.publishedDate)}</time>
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight
          group-hover:text-primary font-serif transition-colors duration-300 line-clamp-1"
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-3 leading-relaxed flex-1">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {techTags.slice(0, 3).map((tech, index) => (
            <TechTag key={index} tech={tech} />
          ))}
          {techTags.length > 3 && (
            <span className="text-xs text-muted-foreground px-2.5 py-1 bg-muted/20 border border-muted/30 rounded-md">
              +{techTags.length - 3}
            </span>
          )}
        </div>

        {/* CTA Section */}
        <div className="flex items-center justify-between mt-auto">
          <Link href={`/blogs/${slug}`} className="block">
            <motion.button
              onClick={handleReadMoreClick}
              className="read-more-btn group/btn inline-flex items-center gap-2 px-5 py-3
                bg-gradient-to-r from-primary to-accent
                hover:from-primary/90 hover:to-accent/90
                text-primary-foreground font-semibold text-sm rounded-xl
                transition-all duration-300 ease-out
                shadow-lg hover:shadow-xl hover:shadow-primary/25
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 
                focus:ring-offset-card
                relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Read full article: ${title}`}
            >
              <span className="relative z-10">Read Article</span>
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-200 
                group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 relative z-10"
              />
            </motion.button>
          </Link>

          <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            <ChevronRight
              className="w-5 h-5 text-muted-foreground group-hover:text-primary 
              transition-all duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r 
        from-primary via-accent to-primary 
        transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left
        shadow-lg opacity-80"
      />
    </motion.article>
  )
}