// app/blog-posts/action/getBlogPosts.ts
'use server'
import { BlogPost } from "@/types/blog";
import { STRAPI_API_URL } from '@/config/link_storage';


export async function getBlogPosts(sortOrder: "asc" | "desc" = "desc"): Promise<BlogPost[]> {
    try {
        console.log('Fetching blog posts...');
        
        // Build the URL with sort order
        const url = `${STRAPI_API_URL}/api/Articles?fields[0]=id&fields[1]=title&fields[2]=slug&fields[3]=description&fields[4]=date&populate=cover&sort=date:${sortOrder}`;
        console.log('Fetching from URL:', url);
        
        const res = await fetch(url, {
            next: { revalidate: 60 }, // optional: revalidate after 60s (ISR)
        });
    
        if (!res.ok) {
            throw new Error("Failed to fetch articles");
        }
    
        const json = await res.json();
        
        if (json.data && json.data.length > 0) {
            console.log('First post structure:', JSON.stringify(json.data[0], null, 2));
        }
        
        if (!json.data || !Array.isArray(json.data)) {
            console.log('No data or invalid data format received');
            return [];
        }

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
        }) as BlogPost[];

        console.log('Valid posts found:', validPosts.length);
        return validPosts;
    } catch (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
}







