import { BlogCardProps } from "@/types/blogs";
export const BlogPosts: BlogCardProps[] = [
    {
        id: '1',
        title: 'Building Scalable React Applications with TypeScript and Next.js',
        description: 'Discover advanced patterns for architecting large-scale React applications. Learn type-safe development with TypeScript, performance optimization with Next.js, and modern state management techniques that scale.',
        // coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&q=80',
        coverImage: '/thumbnails/test-image.jpg',
        techTags: ['React', 'TypeScript', 'NextJS', 'Tailwind', 'Node'],
        meta: {
        author: { name: 'Parham Forati' },
        publishedDate: '2025-08-01',
        readingTime: 8,
        views: 2847
        },
        slug: 'scalable-react-typescript-nextjs',
        category:"Full-stack",
        featured: false,
        primaryTech: 'react'
    },
    {
        id: '2', 
        title: 'Advanced Tailwind CSS: Creating Custom Design Systems',
        description: 'Master the art of building consistent, scalable design systems with Tailwind CSS. Explore custom configurations, component patterns, and design tokens that power modern web applications.',
        // coverImage: 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=800&h=400&fit=crop&q=80',
        coverImage: '/thumbnails/test-image.jpg',
        techTags: ['Tailwind', 'CSS', 'Design', 'Frontend'],
        meta: {
        author: { name: 'Parham Forati' },
        publishedDate: '2025-07-28',
        readingTime: 6,
        views: 1592
        },
        slug: 'advanced-tailwind-design-systems',
        category:"Front-end",
        primaryTech: 'tailwind'
    },
    {
        id: '3',
        title: 'Full-Stack Development: Python FastAPI with React Frontend',
        description: 'Build production-ready full-stack applications from scratch. Learn to create robust APIs with FastAPI, implement authentication, connect to databases, and build responsive React frontends.',
        // coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop&q=80',
        coverImage: '/thumbnails/test-image.jpg',
        techTags: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Docker'],
        meta: {
        author: { name: 'Parham Forati' },
        publishedDate: '2025-07-25',
        readingTime: 12,
        views: 3204
        },
        slug: 'fastapi-react-fullstack',
        category:"Back-end",
        primaryTech: 'python'
    },
    {
    id: '4',
    title: 'Retrieval-Augmented Generation: The Key to Smarter AI Responses',
    description: 'Learn how RAG enhances AI models by combining retrieval and generation. Discover implementation tips, benefits, and best practices for building efficient RAG systems.',
    // coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&q=80',
    coverImage: '/thumbnails/test-image.jpg',
    techTags: ['Python', 'TypeScript', 'OpenAI', 'Pinecone', 'FAISS', 'Langchain'],
    meta: {
        author: { name: 'Parham Forati' },
        publishedDate: '2023-06-20',
        readingTime: 12,
        views: 1542
    },
    slug: 'retrieval-augmented-generation-key-to-smarter-ai',
    category: "AI",
    featured: false,
    primaryTech: 'python'
    }
];