import React from 'react';
import { ChevronRight, Clock, Calendar, User, ArrowUpRight, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// TechTag component with enhanced styling
interface TechTagProps {
  tech: string;
  className?: string;
}

const TechTag: React.FC<TechTagProps> = ({ tech, className = "" }) => {
  const getTechStyles = (tech: string) => {
    const techKey = tech.toLowerCase();
    const techConfig = {
      typescript: {
        bg: "bg-[oklch(0.55_0.18_240)]",
        hover: "hover:shadow-[0_0_20px_oklch(0.55_0.18_240_/_0.4)] hover:ring-2 hover:ring-[oklch(0.55_0.18_240_/_0.3)]"
      },
      javascript: {
        bg: "bg-[oklch(0.85_0.19_100)]",
        hover: "hover:shadow-[0_0_20px_oklch(0.85_0.19_100_/_0.4)] hover:ring-2 hover:ring-[oklch(0.85_0.19_100_/_0.3)]"
      },
      react: {
        bg: "bg-[oklch(0.65_0.18_200)]",
        hover: "hover:shadow-[0_0_20px_oklch(0.65_0.18_200_/_0.4)] hover:ring-2 hover:ring-[oklch(0.65_0.18_200_/_0.3)]"
      },
      nextjs: {
        bg: "bg-[oklch(0.95_0_0)] text-[oklch(0.12_0.01_270)]",
        hover: "hover:shadow-[0_0_20px_oklch(0.95_0_0_/_0.4)] hover:ring-2 hover:ring-[oklch(0.95_0_0_/_0.3)]"
      },
      tailwind: {
        bg: "bg-[oklch(0.8_0.15_200)]",
        hover: "hover:shadow-[0_0_20px_oklch(0.8_0.15_200_/_0.4)] hover:ring-2 hover:ring-[oklch(0.8_0.15_200_/_0.3)]"
      },
      python: {
        bg: "bg-[oklch(0.55_0.18_240)]",
        hover: "hover:shadow-[0_0_20px_oklch(0.55_0.18_240_/_0.4)] hover:ring-2 hover:ring-[oklch(0.55_0.18_240_/_0.3)]"
      },
      vue: {
        bg: "bg-[oklch(0.6_0.15_120)]",
        hover: "hover:shadow-[0_0_20px_oklch(0.6_0.15_120_/_0.4)] hover:ring-2 hover:ring-[oklch(0.6_0.15_120_/_0.3)]"
      },
      node: {
        bg: "bg-[oklch(0.55_0.15_140)]",
        hover: "hover:shadow-[0_0_20px_oklch(0.55_0.15_140_/_0.4)] hover:ring-2 hover:ring-[oklch(0.55_0.15_140_/_0.3)]"
      }
    };
    return techConfig[techKey as keyof typeof techConfig] || {
      bg: "bg-[oklch(0.25_0.01_260)]",
      hover: "hover:shadow-[0_0_20px_oklch(0.25_0.01_260_/_0.4)] hover:ring-2 hover:ring-[oklch(0.25_0.01_260_/_0.3)]"
    };
  };
  
  const styles = getTechStyles(tech);
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium 
        text-white transition-all duration-300 ${styles.bg} ${styles.hover} ${className}`}
    >
      {tech}
    </span>
  );
};

// BlogCardProps interface
interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  techTags: string[];
  meta: {
    author: { name: string };
    publishedDate: string;
    readingTime?: number;
    views?: number;
  };
  slug: string;
  featured?: boolean;
  primaryTech?: string;
  className?: string;
  layout?: 'vertical' | 'horizontal';
  onClick?: (slug: string) => void;
}

// Blog Card Component - Version 1 with Next.js Image optimization
export const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  description,
  coverImage,
  techTags,
  meta,
  slug,
  featured = false,
  primaryTech,
  className = "",
  layout = 'vertical',
  onClick
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.read-more-btn')) {
      if (onClick) {
        onClick(slug);
      }
    }
  };

  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick(slug);
    }
  };

  const isHorizontal = layout === 'horizontal';

  return (
    <article
      className={`
        group relative overflow-hidden cursor-pointer 
        bg-[oklch(0.2_0.02_260)] backdrop-blur-sm rounded-2xl 
        shadow-lg hover:shadow-2xl transition-all duration-500 ease-out
        hover:scale-[1.02] hover:ring-2 hover:ring-[oklch(0.85_0.19_100_/_0.3)]
        border border-[oklch(0.3_0.01_260)] hover:border-[oklch(0.85_0.19_100_/_0.5)]
        h-[480px] w-[420px]
        ${featured ? 'ring-2 ring-[oklch(0.85_0.19_100_/_0.4)] shadow-[0_0_30px_oklch(0.85_0.19_100_/_0.2)]' : ''}
        ${isHorizontal ? 'flex gap-6 p-3' : 'flex flex-col p-3'}
        ${className}
      `}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick(e as any)}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.85_0.19_100_/_0.02)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Cover Image with Next.js Image optimization */}
      {coverImage && (
        <div className={`
          relative overflow-hidden rounded-xl bg-[oklch(0.25_0.01_260)]
          ${isHorizontal ? 'w-32 md:w-40 flex-shrink-0 h-24 md:h-28' : 'w-full h-64 mb-5'}
        `}>
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-500 group-hover:scale-110"
            priority={featured}
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Content */}
      <div className="relative flex flex-col flex-1 min-w-0 z-10">
        {/* Header with meta */}
        <div className="flex items-center flex-wrap gap-2 text-xs text-[oklch(0.65_0.01_260)] mb-4">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span className="font-medium">{meta.author.name}</span>
          </div>
          
          <span className="text-[oklch(0.45_0.01_260)]">•</span>
          
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={meta.publishedDate}>{formatDate(meta.publishedDate)}</time>
          </div>
          
          {meta.readingTime && (
            <>
              <span className="text-[oklch(0.45_0.01_260)]">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{meta.readingTime} min</span>
              </div>
            </>
          )}
          
          {/* {meta.views && (
            <>
              <span className="text-[oklch(0.45_0.01_260)]">•</span>
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>{meta.views.toLocaleString()}</span>
              </div>
            </>
          )} */}
          
          {featured && (
            <span className="ml-auto bg-[oklch(0.85_0.19_100_/_0.15)] text-[oklch(0.85_0.19_100)] 
              px-2.5 py-1 rounded-full text-xs font-semibold border border-[oklch(0.85_0.19_100_/_0.3)]">
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-[oklch(0.95_0.005_260)] mb-3 leading-tight
          group-hover:text-[oklch(0.85_0.19_100)] font-serif transition-colors duration-300 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base text-[oklch(0.75_0.01_260)] mb-5 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* CTA Section */}
        <div className="flex items-center justify-between mt-auto">
          <Link href={`/blogs/${slug}`} className="block">
            <button
              onClick={handleReadMoreClick}
              className="read-more-btn group/btn inline-flex items-center gap-2 px-5 py-3
                bg-gradient-to-r from-[oklch(0.85_0.19_100)] to-[oklch(0.9_0.19_100)]
                hover:from-[oklch(0.9_0.19_100)] hover:to-[oklch(0.95_0.19_100)]
                text-[oklch(0.12_0.01_270)] font-semibold text-sm rounded-xl
                transform hover:scale-105 active:scale-95
                transition-all duration-300 ease-out
                shadow-lg hover:shadow-xl hover:shadow-[oklch(0.85_0.19_100_/_0.4)]
                focus:outline-none focus:ring-2 focus:ring-[oklch(0.85_0.19_100)] focus:ring-offset-2 
                focus:ring-offset-[oklch(0.2_0.02_260)]
                relative overflow-hidden"
              aria-label={`Read full article: ${title}`}
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              <span className="relative z-10">Read Article</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 
                group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 relative z-10" />
            </button>
          </Link>
          
          <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            <ChevronRight className="w-5 h-5 text-[oklch(0.65_0.01_260)] group-hover:text-[oklch(0.85_0.19_100)] 
              transition-all duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      {/* Subtle animation indicator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r 
        from-[oklch(0.85_0.19_100)] via-[oklch(0.65_0.23_27)] to-[oklch(0.7_0.2_300)] 
        transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left
        shadow-[0_0_10px_currentColor] opacity-80" />
    </article>
  );
};