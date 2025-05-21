"use server"
import { ProjectPosts } from "@/types/projects";
import { STRAPI_API_URL } from '@/config/link_storage';

export async function getProjectPosts(): Promise<ProjectPosts[]> {
    try {
        console.log('Fetching blog posts...');
        const url = `${STRAPI_API_URL}/api/projects?populate=*`;
        console.log('Fetching from URL:', url);
        
        const res = await fetch(`${STRAPI_API_URL}/api/projects?populate=*`, {
            next: { revalidate: 60 }, // optional: revalidate after 60s (ISR)
        });
    
        if (!res.ok) {
            throw new Error("Failed to fetch articles");
        }
    
        const json = await res.json();
        
        // Log the structure of the first post if available
        if (json.data && json.data.length > 0) {
            console.log('First post structure:', JSON.stringify(json.data[0], null, 2));
        }
        
        // Ensure we have data and it's an array
        if (!json.data || !Array.isArray(json.data)) {
            console.log('No data or invalid data format received');
            return [];
        }

        // Validate each post has required fields
        const validPosts = json.data.filter((post: any) => {
            const isValid = post && 
                post.id && 
                post.title && 
                post.description && 
                post.slug;
            
            if (!isValid) {
                console.log('Invalid post structure:', JSON.stringify(post, null, 2));
            }
            
            return isValid;
        }) as ProjectPosts[];

        console.log('Valid posts found:', validPosts.length);
        return validPosts;
    } catch (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
}

