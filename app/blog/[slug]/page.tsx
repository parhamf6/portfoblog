import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/fuatures/Blog/blog-actions';
import { formatDate } from '@/lib/utils';
import Navbar from '@/app/components/ui/global/navbar';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github-dark.css';
import { STRAPI_API_URL } from '@/config/link_storage';
import Image from 'next/image';
import ShareButton from '@/components/share-button/share-btn';
import TableOfContents from '@/components/table-of-content/toc';

// Helper to get correct image URL
function getImageUrl(cover: any) {
    if (!cover) return '/images/blog-placeholder.jpg';
    const url = cover.url || cover.formats?.large?.url || cover.formats?.medium?.url || cover.formats?.small?.url || cover.formats?.thumbnail?.url;
    if (!url) return '/images/blog-placeholder.jpg';
    if (url.startsWith('http')) return url;
    return `${STRAPI_API_URL}${url}`;
}

// Helper to generate slug from heading text
function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .trim();
}

// Helper to extract headings from markdown content
function extractHeadings(blocks: any[]): Array<{ id: string; text: string; level: number }> {
    const headings: Array<{ id: string; text: string; level: number }> = [];
    
    blocks.forEach((block) => {
        if (block.__component === 'shared.rich-text' && block.body) {
            const lines = block.body.split('\n');
            lines.forEach((line: string) => {
                const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
                if (headingMatch) {
                    const level = headingMatch[1].length;
                    const text = headingMatch[2].trim();
                    const id = generateSlug(text);
                    headings.push({ id, text, level });
                }
            });
        }
    });
    
    return headings;
}

// Table of Contents Component
// function TableOfContents({ headings }: { headings: Array<{ id: string; text: string; level: number }> }) {
//     if (headings.length === 0) return null;

//     return (
//         <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
//             <h2 className="text-xl font-bold mb-4 text-gray-800">Table of Contents</h2>
//             <nav>
//                 <ul className="space-y-2">
//                     {headings.map((heading, index) => (
//                         <li key={index} style={{ marginLeft: `${(heading.level - 1) * 1}rem` }}>
//                             <a
//                                 href={`#${heading.id}`}
//                                 className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 text-sm"
//                             >
//                                 {heading.text}
//                             </a>
//                         </li>
//                     ))}
//                 </ul>
//             </nav>
//         </div>
//     );
// }

type Params = {
  slug: string;
}

const PostSlugPage = async ({ params }: { params: Params }) => {
    if (!params?.slug) {
        notFound();
    }

    const project = await getPostBySlug(params.slug);

    if (!project) {
        notFound();
    }

    // Use original image if available, otherwise fallback to large/medium
    const imageUrl = getImageUrl(project.cover);
    
    // Extract headings for table of contents
    const headings = extractHeadings(project.blocks);

    return (
        <div>
            <Navbar></Navbar>
            <article className="flex flex-col items-center w-full px-2 py-8">
            {/* Cover Image */}
                <div
                    className="relative w-full max-w-4xl  mb-8 rounded-lg overflow-hidden"
                    style={{ aspectRatio: '16/9', minHeight: 200, maxHeight: 600 }}
                >
                    <Image
                    src={imageUrl}
                    alt={project.cover.alternativeText || project.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 50vw"
                    quality={95}
                        />
                </div>

            {/* Content Container */}
                <div className="w-full p-4 max-w-2xl md:max-w-3xl lg:max-w-2xl xl:max-w-2xl 2xl:max-w-2xl mx-auto">
                    {/* Project Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                        <div className="flex items-center gap-4 text-gray-600">
                            <span>By {project.author.name}</span>
                            <span>•</span>
                            <span>{formatDate(project.date)}</span>
                            <span>•</span>
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                {project.categories[0]?.name}
                            </span>
                        </div>
                        <div>
                            <ShareButton />
                        </div>
                    </div>

                {/* Project Description */}
                    <div className="prose prose-lg max-w-none mb-8">
                        <p className="text-xl text-gray-700">{project.description}</p>
                    </div>

                    {/* Table of Contents */}
                    <TableOfContents headings={headings} />

                {/* Project Content */}
                    <div className="prose prose-lg leading-8 max-w-none">
                        {project.blocks.map((block) => (
                            <div key={block.id} className="mb-6">
                                {block.__component === 'shared.rich-text' && (
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw, rehypeHighlight]}
                                        components={{
                                            h1: ({children, ...props}) => {
                                                const text = children?.toString() || '';
                                                const id = generateSlug(text);
                                                return <h1 id={id} className="text-4xl font-bold mt-4 mb-4 scroll-mt-8" {...props}>{children}</h1>;
                                            },
                                            h2: ({children, ...props}) => {
                                                const text = children?.toString() || '';
                                                const id = generateSlug(text);
                                                return <h2 id={id} className="text-3xl font-bold mt-4 mb-3 scroll-mt-8" {...props}>{children}</h2>;
                                            },
                                            h3: ({children, ...props}) => {
                                                const text = children?.toString() || '';
                                                const id = generateSlug(text);
                                                return <h3 id={id} className="text-2xl font-bold mt-4 mb-2 scroll-mt-8" {...props}>{children}</h3>;
                                            },
                                            h4: ({children, ...props}) => {
                                                const text = children?.toString() || '';
                                                const id = generateSlug(text);
                                                return <h4 id={id} className="text-xl font-bold mt-4 mb-2 scroll-mt-8" {...props}>{children}</h4>;
                                            },
                                            h5: ({children, ...props}) => {
                                                const text = children?.toString() || '';
                                                const id = generateSlug(text);
                                                return <h5 id={id} className="text-lg font-bold mt-4 mb-2 scroll-mt-8" {...props}>{children}</h5>;
                                            },
                                            h6: ({children, ...props}) => {
                                                const text = children?.toString() || '';
                                                const id = generateSlug(text);
                                                return <h6 id={id} className="text-base font-bold mt-4 mb-2 scroll-mt-8" {...props}>{children}</h6>;
                                            },
                                            ul: ({...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
                                            ol: ({...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                                            li: ({...props}) => <li className="mb-2" {...props} />,
                                            p: ({...props}) => <p className="mb-4" {...props} />,
                                            em: ({...props}) => <em className="italic" {...props} />,
                                            strong: ({...props}) => <strong className="font-bold" {...props} />
                                        }}
                                    >
                                        {block.body}
                                    </ReactMarkdown>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </article>
        </div>
    );
};

export default PostSlugPage;