import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProjectBySlug } from '@/fuatures/Projects/project-page/project-actions';
import { formatDate } from '@/lib/utils';
import Navbar from '@/app/components/ui/global/navbar';
import { STRAPI_API_URL } from '@/config/link_storage';


interface ProjectPageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Helper to get correct image URL
function getImageUrl(cover: any) {
    if (!cover) return '/images/blog-placeholder.jpg';
    const url = cover.url || cover.formats?.large?.url || cover.formats?.medium?.url || cover.formats?.small?.url || cover.formats?.thumbnail?.url;
    if (!url) return '/images/blog-placeholder.jpg';
    if (url.startsWith('http')) return url;
    return `${STRAPI_API_URL}${url}`;
}

const ProjectSlugPage = async ({ params, searchParams }: ProjectPageProps) => {
    if (!params?.slug) {
        notFound();
    }

    const project = await getProjectBySlug(params.slug);

    if (!project) {
        notFound();
    }

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
            <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-2xl xl:max-w-2xl 2xl:max-w-2xl mx-auto" >
                {/* Project Header */}
                <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                <div className="flex items-center gap-4 text-gray-600">
                    <span>By {project.author.name}</span>
                    <span>•</span>
                    <span>{formatDate(project.date)}</span>
                    <span>•</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {project.category.name}
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
                            <div dangerouslySetInnerHTML={{ __html: block.body }} />
                        )}
                        </div>
                ))}
                    </div>
            </div>
            </article>
        </div>
    );
};

export default ProjectSlugPage;