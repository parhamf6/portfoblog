// types/project.ts
export type ProjectType = "webapp" | "other";

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    type: ProjectType;
    demoUrl?: string;
    githubUrl?: string;
    slug: string;
    color: string;
    status:boolean;
}