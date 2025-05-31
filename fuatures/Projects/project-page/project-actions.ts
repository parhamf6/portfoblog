import { Project } from './types';
import { STRAPI_API_URL } from '@/config/link_storage';

const API_URL = STRAPI_API_URL;

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    console.log('Fetching project with slug:', slug);
    const url = `${API_URL}/api/projects?filters[slug][$eq]=${slug}&populate=*`;
    console.log('Fetching from URL:', url);
    
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      throw new Error(`Failed to fetch project: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Received data:', JSON.stringify(data, null, 2));
    
    if (!data.data || data.data.length === 0) {
      console.log('No data found for slug:', slug);
      return null;
    }
    
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