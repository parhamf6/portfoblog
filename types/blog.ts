// types/blogPost.ts
export interface BlogPost {
    id: number;
    documentId: string;
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    date: string;
    cover?: {
        id: number;
        documentId: string;
        name: string;
        alternativeText: string;
        caption: string;
        width: number;
        height: number;
        formats: {
            thumbnail: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                path: null;
                width: number;
                height: number;
                size: number;
                sizeInBytes: number;
                url: string;
            };
        };
    };
}