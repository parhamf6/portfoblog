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

// Remove custom interface completely - rely on Next.js's internal types

// Helper to get correct image URL
function getImageUrl(cover: any) {
    if (!cover) return '/images/blog-placeholder.jpg';
    const url = cover.url || cover.formats?.large?.url || cover.formats?.medium?.url || cover.formats?.small?.url || cover.formats?.thumbnail?.url;
    if (!url) return '/images/blog-placeholder.jpg';
    if (url.startsWith('http')) return url;
    return `${STRAPI_API_URL}${url}`;
}

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

    return (
        <div>
            <Navbar></Navbar>
            <article className="flex flex-col items-center w-full px-2 py-8">
            {/* Cover Image */}
            <div
                className="relative w-full max-w-4xl mb-8 rounded-lg overflow-hidden"
                style={{ aspectRatio: '16/9', minHeight: 200, maxHeight: 600 }}
            >
                <img
                src={imageUrl}
                alt={project.cover.alternativeText || project.title}
                className="object-cover w-full h-full"
                />
            </div>

            {/* Content Container */}
            <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-2xl xl:max-w-2xl 2xl:max-w-2xl mx-auto" style={{ width: '100%', maxWidth: '50vw' }}>
                {/* Project Header */}
                <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                <div className="flex items-center gap-4 text-gray-600">
                    <span>By {project.author.name}</span>
                    <span>•</span>
                    <span>{formatDate(project.date)}</span>
                    <span>•</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {project.categories.name}
                    </span>
                </div>
                </div>

            {/* Project Description */}
            <div className="prose prose-lg max-w-none mb-8">
                <p className="text-xl text-gray-700">{project.description}</p>
            </div>

            {/* Project Content */}
            <div className="prose prose-lg max-w-none">
                {project.blocks.map((block) => (
                    <div key={block.id} className="mb-6">
                        {block.__component === 'shared.rich-text' && (
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw, rehypeHighlight]}
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










































































































































































// import { notFound } from 'next/navigation';
// import Image from 'next/image';
// import { getPostBySlug } from '@/fuatures/Blog/blog-actions';
// import { formatDate } from '@/lib/utils';
// import Navbar from '@/app/components/ui/global/navbar';
// import ReactMarkdown from 'react-markdown';
// import rehypeRaw from 'rehype-raw';
// import rehypeHighlight from 'rehype-highlight';
// import remarkGfm from 'remark-gfm';
// import 'highlight.js/styles/github-dark.css';
// import { STRAPI_API_URL } from '@/config/link_storage';

// interface BlogPageProps {
//   params:Awaited<{ slug: string }>;
//   searchParams: { [key: string]: string | string[] | undefined };
// }

// // Helper to get correct image URL
// function getImageUrl(cover: any) {
//     if (!cover) return '/images/blog-placeholder.jpg';
//     const url = cover.url || cover.formats?.large?.url || cover.formats?.medium?.url || cover.formats?.small?.url || cover.formats?.thumbnail?.url;
//     if (!url) return '/images/blog-placeholder.jpg';
//     if (url.startsWith('http')) return url;
//     return `${STRAPI_API_URL}${url}`;
// }

// const PostSlugPage = async  ({ params }: BlogPageProps) => {
//     // const { slug } = params;
//     if (!params?.slug) {
//         notFound();
//     }

//     const project = await getPostBySlug(params.slug);

//     if (!project) {
//         notFound();
//     }

//   // Use original image if available, otherwise fallback to large/medium
//     const imageUrl = getImageUrl(project.cover);

//     return (
//         <div>
//             <Navbar></Navbar>
//             <article className="flex flex-col items-center w-full px-2 py-8">
//             {/* Cover Image */}
//             <div
//                 className="relative w-full max-w-4xl mb-8 rounded-lg overflow-hidden"
//                 style={{ aspectRatio: '16/9', minHeight: 200, maxHeight: 600 }}
//             >
//                 <img
//                 src={imageUrl}
//                 alt={project.cover.alternativeText || project.title}
//                 fill
//                 className="object-cover"
//                 priority
//                 sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 50vw"
//                 quality={95}
//                 />
//             </div>

//             {/* Content Container */}
//             <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-2xl xl:max-w-2xl 2xl:max-w-2xl mx-auto" style={{ width: '100%', maxWidth: '50vw' }}>
//                 {/* Project Header */}
//                 <div className="mb-8">
//                 <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
//                 <div className="flex items-center gap-4 text-gray-600">
//                     <span>By {project.author.name}</span>
//                     <span>•</span>
//                     <span>{formatDate(project.date)}</span>
//                     <span>•</span>
//                     <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
//                     {project.categories.name}
//                     </span>
//                 </div>
//                 </div>

//             {/* Project Description */}
//             <div className="prose prose-lg max-w-none mb-8">
//                 <p className="text-xl text-gray-700">{project.description}</p>
//             </div>

//             {/* Project Content */}
//             <div className="prose prose-lg max-w-none">
//                 {project.blocks.map((block) => (
//                     <div key={block.id} className="mb-6">
//                         {block.__component === 'shared.rich-text' && (
//                             <ReactMarkdown
//                                 remarkPlugins={[remarkGfm]}
//                                 rehypePlugins={[rehypeRaw, rehypeHighlight]}
//                             >
//                                 {block.body}
//                             </ReactMarkdown>
//                         )}
//                     </div>
//                 ))}
//             </div>
//             </div>
//             </article>
//         </div>
//     );
// };

// export default PostSlugPage;