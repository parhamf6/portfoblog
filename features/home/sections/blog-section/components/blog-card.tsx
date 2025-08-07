import React from 'react';
import { ChevronRight, Clock, Calendar, User, ArrowUpRight, Eye } from 'lucide-react';
import Link from 'next/link';
// TechTag component with enhanced styling for your theme
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

// Blog Card Component
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

  const getPrimaryTechBorder = (tech?: string) => {
    if (!tech) return '';
    const techColors = {
      typescript: 'border-t-[oklch(0.55_0.18_240)]',
      javascript: 'border-t-[oklch(0.85_0.19_100)]',
      react: 'border-t-[oklch(0.65_0.18_200)]',
      nextjs: 'border-t-[oklch(0.95_0_0)]',
      tailwind: 'border-t-[oklch(0.8_0.15_200)]',
      python: 'border-t-[oklch(0.55_0.18_240)]',
      vue: 'border-t-[oklch(0.6_0.15_120)]',
      node: 'border-t-[oklch(0.55_0.15_140)]'
    };
    return techColors[tech.toLowerCase() as keyof typeof techColors] || 'border-t-[oklch(0.3_0.01_260)]';
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Only trigger if not clicking on the read more button
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
        ${featured ? 'ring-2 ring-[oklch(0.85_0.19_100_/_0.4)] shadow-[0_0_30px_oklch(0.85_0.19_100_/_0.2)]' : ''}
        ${isHorizontal ? 'flex gap-6 p-5' : 'flex flex-col p-6'}
        ${className}
      `}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick(e as any)}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.85_0.19_100_/_0.02)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Cover Image */}
      {coverImage && (
        <div className={`
          relative overflow-hidden rounded-xl bg-[oklch(0.25_0.01_260)]
          ${isHorizontal ? 'w-32 md:w-40 flex-shrink-0 h-24 md:h-28' : 'w-full h-48 mb-5'}
        `}>
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Content */}
      <div className="relative flex-1 min-w-0 z-10">
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

          {meta.views && (
            <>
              <span className="text-[oklch(0.45_0.01_260)]">•</span>
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>{meta.views.toLocaleString()}</span>
              </div>
            </>
          )}
          
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

        {/* Tech Tags */}
        {/* <div className="flex flex-wrap gap-2 mb-6">
          {techTags.slice(0, 4).map((tech, index) => (
            <TechTag key={index} tech={tech} />
          ))}
          {techTags.length > 4 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium 
              bg-[oklch(0.25_0.01_260)] text-[oklch(0.65_0.01_260)] border border-[oklch(0.3_0.01_260)]">
              +{techTags.length - 4} more
            </span>
          )}
        </div> */}

        {/* Enhanced Read More CTA */}
        <div className="flex items-center justify-between">
          <Link href={`/blog/${slug}`}>
            <button
              onClick={handleReadMoreClick}
              className="read-more-btn group/btn inline-flex items-center gap-2 px-4 py-2.5 
                bg-[oklch(0.85_0.19_100)] hover:bg-[oklch(0.9_0.19_100)] 
                text-[oklch(0.12_0.01_270)] font-semibold text-sm rounded-lg
                transform hover:scale-105 active:scale-95
                transition-all duration-200 ease-out
                shadow-lg hover:shadow-xl hover:shadow-[oklch(0.85_0.19_100_/_0.3)]
                focus:outline-none focus:ring-2 focus:ring-[oklch(0.85_0.19_100)] focus:ring-offset-2 
                focus:ring-offset-[oklch(0.2_0.02_260)]"
              aria-label={`Read full article: ${title}`}
            >
              <span>Read Article</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </Link>
          
          <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-200">
            <ChevronRight className="w-5 h-5 text-[oklch(0.65_0.01_260)] group-hover:text-[oklch(0.85_0.19_100)] 
              transition-all duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      {/* Subtle animation indicator */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r 
        from-[oklch(0.85_0.19_100)] via-[oklch(0.65_0.23_27)] to-[oklch(0.7_0.2_300)] 
        transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </article>
  );
};


// Main Demo Component with your theme
// export default function BlogCardDemo() {
  // const handleBlogClick = (slug: string) => {
  //   console.log(`Navigate to: /blog/${slug}`);
  //   // In a real app: router.push(`/blog/${slug}`)
  // };

//   return (
//     <div 
//       className="min-h-screen"
//       style={{
//         background: 'oklch(0.15 0.02 260)',
//         color: 'oklch(0.95 0.005 260)',
//         fontFamily: 'Lora, ui-sans-serif, sans-serif'
//       }}
//     >
//       <div className="max-w-7xl mx-auto p-8 space-y-12">
//         {/* Header */}
//         <header className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-[oklch(0.95_0.005_260)] mb-4">
//             Tech <span className="text-[oklch(0.85_0.19_100)]">Blog</span>
//           </h1>
//           <p className="text-lg text-[oklch(0.75_0.01_260)] max-w-2xl mx-auto">
//             Deep dives into modern web development, cutting-edge technologies, and best practices from the trenches.
//           </p>
//           <div className="w-24 h-1 bg-gradient-to-r from-[oklch(0.85_0.19_100)] to-[oklch(0.65_0.23_27)] mx-auto mt-6 rounded-full" />
//         </header>

//         {/* Featured Article */}
//         <section>
//           <h2 className="text-2xl font-bold mb-6 text-[oklch(0.95_0.005_260)] flex items-center gap-2">
//             <span className="text-[oklch(0.85_0.19_100)]">⭐</span> Featured Article
//           </h2>
//           <BlogCard
//             {...exampleBlogPosts[0]}
//             onClick={handleBlogClick}
//             className="max-w-4xl"
//           />
//         </section>

//         {/* Article Grid */}
//         <section>
//           <h2 className="text-2xl font-bold mb-8 text-[oklch(0.95_0.005_260)]">Latest Articles</h2>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {exampleBlogPosts.slice(1).map(post => (
//               <BlogCard
//                 key={post.id}
//                 {...post}
//                 layout="vertical"
//                 onClick={handleBlogClick}
//               />
//             ))}
//           </div>
//         </section>

//         {/* Horizontal Layout Example */}
//         <section>
//           <h2 className="text-2xl font-bold mb-8 text-[oklch(0.95_0.005_260)]">Recent Posts</h2>
//           <div className="space-y-6">
//             {exampleBlogPosts.slice(0, 2).map(post => (
//               <BlogCard
//                 key={`horizontal-${post.id}`}
//                 {...post}
//                 layout="horizontal"
//                 onClick={handleBlogClick}
//                 className="max-w-3xl"
//               />
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }








// import React from 'react';
// import { ChevronRight, Clock, Calendar, User } from 'lucide-react';

// // TechTag component (simplified version for this example)
// interface TechTagProps {
//   tech: string;
//   className?: string;
// }

// const TechTag: React.FC<TechTagProps> = ({ tech, className = "" }) => {
//   const getTechStyles = (tech: string) => {
//     const techKey = tech.toLowerCase();
//     const techConfig = {
//       typescript: "hover:shadow-[0_0_20px_rgba(49,120,198,0.4)] hover:ring-2 hover:ring-blue-500/30",
//       javascript: "hover:shadow-[0_0_20px_rgba(247,223,30,0.4)] hover:ring-2 hover:ring-yellow-400/30",
//       react: "hover:shadow-[0_0_20px_rgba(97,218,251,0.4)] hover:ring-2 hover:ring-cyan-400/30",
//       nextjs: "hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:ring-2 hover:ring-gray-800/30",
//       tailwind: "hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:ring-2 hover:ring-sky-400/30",
//       python: "hover:shadow-[0_0_20px_rgba(55,118,171,0.4)] hover:ring-2 hover:ring-blue-600/30",
//     };
//     return techConfig[techKey as keyof typeof techConfig] || "hover:shadow-[0_0_20px_rgba(107,114,128,0.4)] hover:ring-2 hover:ring-gray-500/30";
//   };

//   return (
//     <span
//       className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-muted/60 text-foreground transition-all duration-300 ${getTechStyles(tech)} ${className}`}
//     >
//       {tech}
//     </span>
//   );
// };

// // Blog Card Interfaces
// interface BlogAuthor {
//   name: string;
//   avatar?: string;
//   bio?: string;
// }

// interface BlogMeta {
//   author: BlogAuthor;
//   publishedDate: string;
//   readingTime?: number;
//   views?: number;
//   category?: string;
// }

// interface BlogCardProps {
//   id: string;
//   title: string;
//   description: string;
//   coverImage?: string;
//   techTags: string[];
//   meta: BlogMeta;
//   slug: string;
//   featured?: boolean;
//   primaryTech?: string; // For colored border
//   className?: string;
//   layout?: 'vertical' | 'horizontal';
//   onClick?: (slug: string) => void;
// }

// // Blog Card Component
// export const BlogCard: React.FC<BlogCardProps> = ({
//   id,
//   title,
//   description,
//   coverImage,
//   techTags,
//   meta,
//   slug,
//   featured = false,
//   primaryTech,
//   className = "",
//   layout = 'vertical',
//   onClick
// }) => {
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   const getPrimaryTechBorder = (tech?: string) => {
//     if (!tech) return '';
//     const techColors = {
//       typescript: 'border-t-blue-500',
//       javascript: 'border-t-yellow-400',
//       react: 'border-t-cyan-400',
//       nextjs: 'border-t-gray-800',
//       tailwind: 'border-t-sky-400',
//       python: 'border-t-blue-600',
//     };
//     return techColors[tech.toLowerCase() as keyof typeof techColors] || 'border-t-gray-500';
//   };

//   const handleCardClick = () => {
//     if (onClick) {
//       onClick(slug);
//     }
//   };

//   const isHorizontal = layout === 'horizontal';

//   return (
//     <article
//       className={`
//         group cursor-pointer bg-muted/40 backdrop-blur-sm rounded-2xl p-4 md:p-6
//         shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out
//         hover:scale-[1.02] hover:ring-1 hover:ring-muted-foreground/10
//         border-t-4 ${getPrimaryTechBorder(primaryTech)}
//         ${featured ? 'ring-2 ring-primary/20' : ''}
//         ${isHorizontal ? 'flex gap-4 md:gap-6' : 'flex flex-col'}
//         ${className}
//       `}
//       onClick={handleCardClick}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
//     >
//       {/* Cover Image */}
//       {coverImage && (
//         <div className={`
//           ${isHorizontal ? 'w-24 md:w-32 flex-shrink-0' : 'w-full mb-4'}
//           ${isHorizontal ? 'h-20 md:h-24' : 'h-48'}
//           rounded-xl overflow-hidden bg-muted/60
//         `}>
//           <img
//             src={coverImage}
//             alt={title}
//             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//             loading="lazy"
//           />
//         </div>
//       )}

//       {/* Content */}
//       <div className="flex-1 min-w-0">
//         {/* Header with meta */}
//         <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
//           <div className="flex items-center gap-1">
//             <User className="w-3 h-3" />
//             <span>by {meta.author.name}</span>
//           </div>
//           <span>·</span>
//           <div className="flex items-center gap-1">
//             <Calendar className="w-3 h-3" />
//             <span>{formatDate(meta.publishedDate)}</span>
//           </div>
//           {meta.readingTime && (
//             <>
//               <span>·</span>
//               <div className="flex items-center gap-1">
//                 <Clock className="w-3 h-3" />
//                 <span>{meta.readingTime} min read</span>
//               </div>
//             </>
//           )}
//           {featured && (
//             <span className="ml-auto bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
//               Featured
//             </span>
//           )}
//         </div>

//         {/* Title */}
//         <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
//           {title}
//         </h3>

//         {/* Description */}
//         <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
//           {description}
//         </p>

//         {/* Tech Tags */}
//         <div className="flex flex-wrap gap-2 mb-4">
//           {techTags.slice(0, 4).map((tech, index) => (
//             <TechTag key={index} tech={tech} />
//           ))}
//           {techTags.length > 4 && (
//             <span className="text-xs text-muted-foreground px-2 py-1">
//               +{techTags.length - 4} more
//             </span>
//           )}
//         </div>

//         {/* Read More CTA */}
//         <div className="flex items-center justify-between">
//           <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//             <span className="text-sm font-medium text-primary flex items-center gap-1">
//               Read More
//               <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//             </span>
//           </div>
          
//           {meta.views && (
//             <span className="text-xs text-muted-foreground">
//               {meta.views.toLocaleString()} views
//             </span>
//           )}
//         </div>
//       </div>
//     </article>
//   );
// };

