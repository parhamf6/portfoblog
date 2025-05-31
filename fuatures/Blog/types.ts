export interface ImageFormat {
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
  }
  
  export interface CoverImage {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string;
    caption: null;
    width: number;
    height: number;
    formats: {
      thumbnail: ImageFormat;
      small: ImageFormat;
      large: ImageFormat;
      medium: ImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null;
    provider: string;
    provider_metadata: null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
  export interface RichTextBlock {
    __component: "shared.rich-text";
    id: number;
    body: string;
  }
  
  export interface Author {
    id: number;
    documentId: string;
    name: string;
    email: null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
  export interface Category {
    id: number;
    documentId: string;
    name: string;
    slug: null;
    description: null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
  export interface Project {
    id: number;
    documentId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    slug: string;
    description: string;
    date: string;
    cover: CoverImage;
    blocks: RichTextBlock[];
    author: Author;
    categories: Category;
  } 