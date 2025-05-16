import { Project } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export async function getPostBySlug(slug: string): Promise<Project | null> {
  try {
    const response = await fetch(
      `${API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch project');
    }

    const data = await response.json();
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const response = await fetch(
      `${API_URL}/api/projects?populate=*`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
} 