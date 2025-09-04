import type { BlogCardProps } from "@/types/blogs"
export const BlogPosts: BlogCardProps[] = [
  {
    id: "1",
    title: "Portfoblog: the story behind it",
    description:
      "the story behind of building a portfolio+blog web app that has every need of devlopers in it, chllenges and the idea.",
    // coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&q=80',
    coverImage: "/thumbnails/portfoblog.png",
    techTags: ["React", "TypeScript", "NextJS", "Tailwind", "MarkDown"],
    meta: {
      author: { name: "Parham Forati" },
      publishedDate: "2025-08-01",
      readingTime: 8,
      views: 2847,
    },
    slug: "portfoblog-the-story-behind-it",
    category: "Full-stack",
    featured: false,
    primaryTech: "react",
  },
  {
    id: "2",
    title: "Devhub: the story behind it",
    description:
      "my longest project , a project with over 30k lines of code that has many tools in it and start with a simple question what if?",
    // coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop&q=80',
    coverImage: "/thumbnails/devhub.png",
    techTags: ["React", "TypeScript", "NextJS", "Tailwind"],
    meta: {
      author: { name: "Parham Forati" },
      publishedDate: "2025-07-25",
      readingTime: 12,
      views: 3204,
    },
    slug: "devhub-the-story-behind-it",
    category: "Back-end",
    primaryTech: "python",
  },
  {
    id: "3",
    title: "Gitfather: the story behind it",
    description:
      "my journy to try play and trick the system , false and useless attempt that teached me many good lessons, my first big project.",
    // coverImage: 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=800&h=400&fit=crop&q=80',
    coverImage: "/thumbnails/gitfather.png",
    techTags: ["Python", "Automation", "Github"],
    meta: {
      author: { name: "Parham Forati" },
      publishedDate: "2025-07-28",
      readingTime: 6,
      views: 1592,
    },
    slug: "gitfather-the-story-behind-it",
    category: "Front-end",
    primaryTech: "tailwind",
  },

  {
    id: "4",
    title: "Retrieval-Augmented Generation: The Key to Smarter AI Responses",
    description:
      "Learn how RAG enhances AI models by combining retrieval and generation. Discover implementation tips, benefits, and best practices for building efficient RAG systems.",
    // coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&q=80',
    coverImage: "/thumbnails/test-image.jpg",
    techTags: ["Python", "TypeScript", "OpenAI", "Pinecone", "FAISS", "Langchain"],
    meta: {
      author: { name: "Parham Forati" },
      publishedDate: "2025-06-20",
      readingTime: 12,
      views: 1542,
    },
    slug: "retrieval-augmented-generation-key-to-smarter-ai",
    category: "AI",
    featured: false,
    primaryTech: "python",
  },
  {
    id: "5",
    title: "Understanding DNS: How the Internet's Phone Book Really Works (+ Security Basics)",
    description:
      "Learn how DNS really works! Complete guide to domain name resolution with visual diagrams, practical examples, and essential security basics for developers.",
    // coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&q=80',
    coverImage: "/thumbnails/dns-guide-visual.jpg",
    techTags: ["DNS", "Network Security", "OWASP", "Web Development", "Cybersecurity", "DevOps"],
    meta: {
      author: { name: "Parham Forati" },
      publishedDate: "2025-09-02",
      readingTime: 15,
      views: 1287,
    },
    slug: "understanding-dns-complete-guide",
    category: "Security",
    featured: false,
    primaryTech: "networking",
  },
]
